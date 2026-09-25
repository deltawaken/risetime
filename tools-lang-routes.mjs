#!/usr/bin/env node
// 9-31 — matérialise (ou retire) `app/[lang]/` AVANT `next build`.
//
// POURQUOI CETTE ÉTAPE EXISTE, et ce n'est pas une préférence : c'est une
// contrainte de Next, LUE DANS SON CODE et pas supposée.
//
//   node_modules/next/dist/build/index.js:1243
//     const hasGenerateStaticParams =
//       workerResult.prerenderedRoutes && workerResult.prerenderedRoutes.length > 0
//     if (config.output === 'export' && isDynamic && !hasGenerateStaticParams) throw …
//       `Page "…" is missing "generateStaticParams()" so it cannot be used with
//        "output: export" config.`
//
// Autrement dit : en `output: 'export'`, une route dynamique qui produit ZÉRO page
// fait ÉCHOUER le build — et Next ne distingue pas « pas de fonction » de « la
// fonction a rendu une liste vide ». Or zéro page traduite est précisément l'état
// que cette story livre (`LOCALES = []`). Une route `app/[lang]/` laissée dans
// l'arbre rendrait donc `npm run build` rouge aujourd'hui.
//
// Les trois issues, et pourquoi celle-ci :
//   (a) un paramètre sentinelle (`/_none/`) rendu puis supprimé après coup — une
//       page fantôme existe à un instant du build, et sa disparition dépend d'une
//       seconde étape. C'est la classe de panne que cette story passe son temps à
//       fermer.
//   (b) laisser la première PR de langue APPORTER les fichiers de route — elle
//       toucherait alors quatre fichiers de code, ce que l'AC9 interdit
//       explicitement (« le diff ne contient que lib/pages.ts et content/xx/ »).
//   (c) ✅ la route est une DÉRIVÉE de la table, au même titre que le sitemap ou
//       les `hreflang`. Elle existe si et seulement s'il y a une langue à rendre.
//       Rien à retirer à la main le jour où une langue arrive, rien à ajouter non
//       plus : une ligne dans `LOCALES` suffit, et cette étape le constate.
//
// `app/[lang]/` est donc un ARTEFACT DE BUILD, gitignoré. La source versionnée est
// `lang-routes/`. ⚠️ Corollaire à ne pas oublier : tant qu'aucune langue n'existe,
// ces trois fichiers ne sont NI compilés NI typés. Ils le sont dès la première
// langue — et la preuve en deux temps de cette story les exerce exprès.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const TEMPLATE = path.join(ROOT, 'lang-routes')
const TARGET = path.join(ROOT, 'app', '[lang]')

/** Les fichiers de `content/`, avec le strict nécessaire de leur en-tête. Lu ici sans
 *  TypeScript : cette étape tourne AVANT toute compilation. */
function contentFiles() {
  const dir = path.join(ROOT, 'content')
  if (!fs.existsSync(dir)) return []
  const out = []
  for (const lang of fs.readdirSync(dir)) {
    const d = path.join(dir, lang)
    if (!fs.statSync(d).isDirectory()) continue
    for (const f of fs.readdirSync(d)) {
      if (!f.endsWith('.md')) continue
      const head = fs.readFileSync(path.join(d, f), 'utf8').split(/\r?\n---/)[0]
      const get = (k) => (new RegExp(`^${k}:[ \\t]*(.*)$`, 'm').exec(head) || [, ''])[1].trim()
      out.push({ lang, slug: get('slug'), reviewed: get('reviewed') })
    }
  }
  return out
}

function declaredLocales() {
  const src = fs.readFileSync(path.join(ROOT, 'lib', 'pages.ts'), 'utf8')
  const m = /export const LOCALES: string\[\] = \[([^\]]*)\]/.exec(src)
  if (!m) {
    console.error('tools-lang-routes: REFUS — `LOCALES` introuvable dans lib/pages.ts.')
    process.exit(1)
  }
  return [...m[1].matchAll(/['"]([\w-]+)['"]/g)].map((x) => x[1])
}

const preview = process.env.BUILD_TARGET === 'preview'
const declared = declaredLocales()
// Les MÊMES règles que lib/locales.ts : production = LOCALES seule et pages relues ;
// preview = plus tout ce que content/ porte, relu ou non.
const files = contentFiles().filter(
  (f) => f.lang !== 'en' && (preview || (declared.includes(f.lang) && f.reviewed)),
)
const langs = [...new Set(files.filter((f) => preview || declared.includes(f.lang)).map((f) => f.lang))]
const withSlug = files.filter((f) => f.slug)
const withHome = files.filter((f) => !f.slug)

// ---- REFUS : une langue PUBLIÉE dont l'accueil n'est pas relu (9-31 §9) ------
//
// ⚠️ Ce refus est ici, et pas seulement dans tools-check-langs.py, pour une raison de
// LISIBILITÉ DU MESSAGE. Sans lui, la situation se manifestait par l'erreur de Next
// « Page "/[lang]" is missing "generateStaticParams()" » — vraie, mais qui ne dit rien de
// la cause et envoie chercher un bug de routage là où il y a une langue mal déclarée.
// Un contrôle qui rougit pour la bonne raison mais avec le mauvais mot coûte une heure.
if (!preview) {
  for (const lang of declared) {
    if (!withHome.some((f) => f.lang === lang)) {
      console.error(`⛔ tools-lang-routes: « ${lang} » est dans LOCALES, donc PUBLIÉE, mais son`)
      console.error(`   accueil n'est pas construit — content/${lang}/ n'a pas de page sans slug`)
      console.error(`   portant un \`reviewed\`.`)
      console.error('\n   Une langue est publiable SSI toutes ses pages portent un `reviewed`.')
      console.error('   Deux issues : faire relire son accueil, ou la retirer de LOCALES.')
      console.error('   ⛔ Pas de troisième : une entrée de sélecteur qui mène à une page non')
      console.error('   construite est un lien mort sur TOUT le site.\n')
      process.exit(1)
    }
  }
}

fs.rmSync(TARGET, { recursive: true, force: true })

if (langs.length === 0) {
  console.log('tools-lang-routes: aucune langue — app/[lang]/ n’est PAS créée.')
  console.log('  (Next refuse une route dynamique à zéro page en output: export.)')
} else {
  fs.mkdirSync(TARGET, { recursive: true })
  fs.copyFileSync(path.join(TEMPLATE, 'layout.tsx'), path.join(TARGET, 'layout.tsx'))
  // Même contrainte de zéro-page que pour `[slug]` : en preview, une langue peut n'avoir
  // que des pages à slug et pas d'accueil. La route d'accueil n'existe alors pas.
  if (withHome.length) {
    fs.copyFileSync(path.join(TEMPLATE, 'page.tsx'), path.join(TARGET, 'page.tsx'))
  }
  // ⚠️ MÊME CONTRAINTE, UN CRAN PLUS BAS, trouvée en construisant le cas : une langue
  // qui n'a QUE son accueil ne produit aucun couple (langue, slug), donc `[slug]` rendrait
  // zéro page et Next referait échouer le build. La sous-route n'existe que s'il y a au
  // moins une page à slug à rendre.
  if (withSlug.length) {
    fs.mkdirSync(path.join(TARGET, '[slug]'), { recursive: true })
    fs.copyFileSync(path.join(TEMPLATE, 'slug-page.tsx'), path.join(TARGET, '[slug]', 'page.tsx'))
  }
  console.log(
    `tools-lang-routes: app/[lang]/ créée pour ${langs.join(', ')}` +
      (withSlug.length ? ` (+ [slug], ${withSlug.length} page(s))` : ' (accueil seul, pas de [slug])') +
      '.',
  )
}
