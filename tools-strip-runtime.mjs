#!/usr/bin/env node
// 9-31 — retire le runtime React de l'export statique.
//
// POURQUOI. Mesuré le 2026-09-24 sur l'accueil : 9 Ko de HTML, 3 Ko de CSS, et
// 138 Ko de JavaScript gzippé. Le script pesait ONZE FOIS le contenu, sur un site
// qui n'a aucune interactivité — pas un formulaire, pas un état, pas une donnée
// par visiteur. Next n'offre aucun réglage officiel pour ne rien servir avec
// l'App Router (`unstable_runtimeJS` n'existait que pour l'ancien routeur ; la
// demande est ouverte : vercel/next.js discussions/49544). D'où cette étape.
//
// CE N'EST PAS UN BRICOLAGE SILENCIEUX. Elle REFUSE de s'exécuter dès qu'un
// composant client apparaît dans l'arbre : à ce moment-là le JavaScript devient
// nécessaire, et c'est une décision à prendre, pas à subir. Le jour où le bandeau
// de langue arrivera, il s'écrira en script inline de quelques lignes dans le
// layout — pas en composant React.

import { readdir, readFile, writeFile, stat, rm } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { join, extname } from 'node:path'

const OUT = 'out'
const SOURCES = ['app', 'components', 'lib']

async function walk(dir, filter) {
  const found = []
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return found
  }
  for (const e of entries) {
    const p = join(dir, e.name)
    if (e.isDirectory()) found.push(...(await walk(p, filter)))
    else if (filter(p)) found.push(p)
  }
  return found
}

// ---- Garde-fou : aucun composant client ----------------------------------
const sourceFiles = (
  await Promise.all(
    SOURCES.map((d) => walk(d, (p) => ['.tsx', '.ts', '.jsx', '.js'].includes(extname(p)))),
  )
).flat()

const clientFiles = []
for (const f of sourceFiles) {
  const head = (await readFile(f, 'utf8')).slice(0, 400)
  if (/^\s*['"]use client['"]/m.test(head)) clientFiles.push(f)
}

if (clientFiles.length) {
  console.error('\n⛔ Des composants client existent — le runtime NE PEUT PAS être retiré :')
  for (const f of clientFiles) console.error('   ' + f)
  console.error(
    "\nCes composants ont besoin de JavaScript pour fonctionner. Retirer le runtime\n" +
      "les casserait en silence. Deux issues : réécrire le besoin en script inline\n" +
      "(voir le bandeau de langue), ou assumer le poids et retirer cette étape du build.\n",
  )
  process.exit(1)
}

// ---- REFUS n°2 : une page non relue en production (9-31 §9, AC22) ------------
//
// ⚠️ CE REFUS MANQUAIT, relevé en revue : `grep reviewed tools-strip-runtime.mjs` ne
// rendait rien alors qu'AC22 l'exige. Le raisonnement est celui du refus `"use client"` :
// une page sans `reviewed` n'aurait PAS DÛ être construite ; si elle apparaît quand même
// dans l'export, c'est que la sélection des langues a un défaut — et il vaut mieux un
// build ROUGE qu'une page non relue en ligne.
//
// ⛔ Il porte sur l'EXPORT et pas sur les sources : c'est le seul endroit où l'on voit ce
// qui est réellement servi. En preview, il ne s'applique pas — construire du non relu, en
// noindex et hors sitemap, est précisément le but d'une preview.
if (process.env.BUILD_TARGET !== 'preview') {
  const cdir = join('content')
  const heads = []
  for (const lang of await readdir(cdir).catch(() => [])) {
    if (lang === 'en') continue
    if (!(await stat(join(cdir, lang)).catch(() => null))?.isDirectory()) continue
    for (const f of await readdir(join(cdir, lang))) {
      if (!f.endsWith('.md')) continue
      const head = (await readFile(join(cdir, lang, f), 'utf8')).split(/\r?\n---/)[0]
      const get = (k) => (new RegExp(`^${k}:[ \\t]*(.*)$`, 'm').exec(head) || [, ''])[1].trim()
      heads.push({ lang, slug: get('slug'), reviewed: get('reviewed') })
    }
  }
  for (const h of heads) {
    if (h.reviewed) continue
    const page = h.slug ? `${OUT}/${h.lang}/${h.slug}/index.html` : `${OUT}/${h.lang}/index.html`
    if (await stat(page).catch(() => null)) {
      console.error(`⛔ ${page} : page exportée en PRODUCTION sans \`reviewed\`.`)
      console.error(
        "\nElle n'aurait pas dû être construite. Deux issues : la faire relire (ajouter\n" +
          "`reviewed:` à son en-tête), ou retirer sa langue de LOCALES. ⛔ Pas de troisième.\n",
      )
      process.exit(1)
    }
  }
}

// ---- Retrait ---------------------------------------------------------------
const pages = await walk(OUT, (p) => p.endsWith('.html'))
if (!pages.length) {
  console.error('⛔ Aucun HTML dans ' + OUT + '/ — le build a-t-il tourné ?')
  process.exit(1)
}

let before = 0
let after = 0
const report = []

for (const page of pages) {
  const src = await readFile(page, 'utf8')
  before += Buffer.byteLength(src)

  let out = src
    // les scripts du runtime, servis depuis /_next/
    .replace(/<script[^>]+src="\/_next\/[^"]*"[^>]*><\/script>/g, '')
    // la charge utile RSC, poussée en ligne
    .replace(/<script>\s*\(self\.__next_f\s*=\s*self\.__next_f\s*\|\|\s*\[\]\)[\s\S]*?<\/script>/g, '')
    .replace(/<script>\s*self\.__next_f\.push\([\s\S]*?\)<\/script>/g, '')
    // les préchargements qui les annoncent
    .replace(/<link[^>]+rel="preload"[^>]+as="script"[^>]*\/?>/g, '')

  // Contrôles : on ne publie pas une page qu'on vient d'abîmer.
  const kept = (out.match(/<script\b/g) || []).length
  // On compte les BALISES, pas les occurrences du texte : la charge RSC qu'on
  // retire contenait une copie sérialisée du JSON-LD, ce qui faussait le compte.
  const LD = /<script[^>]+type="application\/ld\+json"/g
  const ld = (out.match(LD) || []).length
  const ldBefore = (src.match(LD) || []).length
  const bodyLen = (out.match(/<body[^>]*>([\s\S]*)<\/body>/) || [, ''])[1].length

  if (ld !== ldBefore) {
    console.error(`⛔ ${page} : le JSON-LD a été touché (${ldBefore} → ${ld})`)
    process.exit(1)
  }
  if (bodyLen < 200) {
    console.error(`⛔ ${page} : le corps est vide après retrait (${bodyLen} caractères)`)
    process.exit(1)
  }
  if (/\/_next\/static\/[^"]*\.js/.test(out)) {
    console.error(`⛔ ${page} : il reste une référence à un script /_next/`)
    process.exit(1)
  }

  // ---- REFUS PAR LISTE BLANCHE (9-31 §10, constats 1 et 3 — L12 / AC24) ------
  //
  // ⚠️ AVANT CE JOUR, CET OUTIL NE REFUSAIT RIEN D'INCONNU. Son seul contrôle de
  // script résiduel était la regex `/_next/…\.js` ci-dessus : un `<script src>`
  // tiers, ou l'outil de relecture en page de 9-33, serait passé SANS UN MOT.
  // Et le garde-fou `"use client"` ne lit que SOURCES = ['app','components','lib'] :
  // un `.js` déposé dans `public/` est recopié dans `out/` et servi sans aucun
  // contrôle. La liste blanche porte donc sur l'EXPORT — le seul endroit où l'on
  // voit ce qui est réellement servi — et pas sur les sources.
  //
  // Formulation par liste BLANCHE et non par interdits : un script inconnu échoue
  // par défaut, au lieu de passer parce qu'on n'a pas pensé à l'interdire.
  // Les trois seules sortes admises : le JSON-LD, le bloc JSON des langues, et
  // l'UNIQUE bloc inline du bandeau et du sélecteur.
  for (const tag of out.match(/<script\b[^>]*>/g) || []) {
    const ok =
      /type="application\/ld\+json"/.test(tag) ||
      /id="rt-langs"/.test(tag) ||
      /^<script>$/.test(tag)
    if (!ok) {
      console.error(`⛔ ${page} : <script> hors liste blanche — ${tag.slice(0, 120)}`)
      process.exit(1)
    }
  }
  if (/\son[a-z]+="/.test(out)) {
    // ⛔ AC27 : aucun attribut `on*=` nulle part dans l'export. La raison est la
    // CSP : un gestionnaire en attribut exigerait `script-src 'unsafe-hashes'`,
    // qui affaiblit la directive pour TOUT le site et pour toujours.
    console.error(`⛔ ${page} : attribut de gestionnaire d'événement (on*=) dans l'export`)
    process.exit(1)
  }

  await writeFile(page, out)
  after += Buffer.byteLength(out)
  report.push([page, kept])
}

const kb = (n) => (n / 1024).toFixed(0) + ' Ko'
console.log(
  `\n✓ runtime retiré de ${pages.length} pages : ${kb(before)} → ${kb(after)} de HTML`,
)

// Les chunks orphelins : plus aucune page ne les référence (les contrôles
// ci-dessus l'établissent page par page), mais ils resteraient déposés dans
// out/_next/ et accessibles par URL. « Zéro fichier JavaScript servi » ne peut
// pas se dire tant qu'ils sont là — un fichier atteignable est un fichier servi.
const orphans = await walk(join(OUT, '_next'), (p) => p.endsWith('.js'))
for (const f of orphans) await rm(f)

// Les charges utiles RSC `*/index.txt` : MÊME CLASSE que les chunks orphelins, relevée en
// revue. 184 Ko, référencés par personne (le runtime qui les réclamait vient d'être retiré),
// mais ATTEINGNABLES PAR URL — et ils contiennent l'arbre de composants ET une copie du
// script inline. « La charge utile RSC est retirée » n'était vrai que du HTML.
const payloads = await walk(OUT, (p) => p.endsWith('index.txt'))
for (const f of payloads) await rm(f)

// Le 404 sous forme de RÉPERTOIRE (`out/404/index.html`) est une URL NEUVE, absente de
// main, née de `trailingSlash: true`. L'hébergeur sert `404.html` comme document d'erreur ;
// `/404/` n'a jamais été une adresse du site et n'a pas à le devenir. On la retire, et
// `/404/` redevient ce qu'elle doit être : une 404.
await rm(join(OUT, '404'), { recursive: true, force: true })

const withScripts = report.filter(([, k]) => k > 0)
// ⚠️ LIBELLÉ CORRIGÉ (9-31 §10, constat 2). L'ancienne ligne affirmait « le
// JSON-LD est un <script> et doit rester » alors qu'il y a désormais TROIS sortes
// de <script> légitimes. Un verdict qui nomme mal ce qu'il compte est exactement
// le défaut que la ligne finale de tools-check-metadata.py documente déjà.
console.log(
  `  scripts restants : ${withScripts.length ? withScripts.map(([p, k]) => `${p} (${k})`).join(', ') : 'aucun'}` +
    ' — trois sortes admises : JSON-LD, bloc JSON des langues (#rt-langs),' +
    ' et l’unique bloc inline du bandeau et du sélecteur.',
)
console.log(`  ${orphans.length} .js orphelin(s) et ${payloads.length} charge(s) RSC index.txt supprimé(s) ; out/404/ retiré.`)

// ---- L'EMPREINTE CSP, GÉNÉRÉE — jamais recopiée à la main (9-31 §10, AC27) ----
//
// Les `_headers` de 9-30 porteront `script-src 'self' 'sha256-<empreinte>'`, SANS
// `unsafe-inline` ni `unsafe-hashes`. ⚠️ Une empreinte figée casserait le script en
// silence au premier caractère changé : elle est donc calculée ICI, sur le contenu
// RÉELLEMENT ÉMIS, et réécrite à chaque build.
//
// ⚠️ Et elle doit être UNIQUE sur tout l'export : un second bloc, c'est une seconde
// ligne de CSP et un second endroit où chercher. On le vérifie plutôt que d'y croire.
// ⚠️ On RE-PARCOURT l'export : `pages` a été collecté AVANT les suppressions ci-dessus
// (out/404/, charges RSC), et le réutiliser ferait lire un fichier qui n'existe plus.
const hashes = new Set()
for (const page of await walk(OUT, (f) => f.endsWith('.html'))) {
  const html = await readFile(page, 'utf8')
  for (const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    hashes.add(createHash('sha256').update(m[1], 'utf8').digest('base64'))
  }
}
if (hashes.size > 1) {
  console.error(`⛔ ${hashes.size} blocs inline DISTINCTS dans l'export — il n'en faut qu'un.`)
  process.exit(1)
}
const csp = [...hashes].map((h) => `'sha256-${h}'`).join(' ')
await writeFile(
  join(OUT, 'csp-script-src.txt'),
  `# Généré par tools-strip-runtime.mjs — NE PAS RECOPIER À LA MAIN.\n` +
    `# À reporter dans les _headers de 9-30 :\n` +
    `script-src 'self' ${csp}\n`,
)
console.log(`  empreinte CSP du bloc inline : ${csp || 'aucun bloc inline'}`)
