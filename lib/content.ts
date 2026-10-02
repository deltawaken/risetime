// 9-31 (2026-09-25) — la lecture de `content/<lang>/<slug>.md`.
//
// POURQUOI UNE SEULE SOURCE. `scripts/check-alt-contract.py` lit le répertoire des
// pages pour en extraire les `<picture>` et leurs `alt`. Le jour où le français vit
// en Markdown et l'anglais en JSX, ce contrôle cesse de voir les pages traduites —
// sans erreur, sans ligne de log : il imprimerait un vert sur le seul anglais.
// C'est le mode de panne de ce dépôt ([[credible-false-zeros]]).
//
// CE QUI A MIGRÉ DANS CETTE PASSE, ET CE QUI N'A PAS MIGRÉ — dit ici plutôt que
// laissé à deviner :
//   · ONT migré, et sont désormais lus ICI et nulle part ailleurs : `title`,
//     `description`, `og_title`, `og_description`, `updated`, `slug`, et les quatre
//     clés de langue. Ce sont exactement les chaînes qu'un traducteur touche dans
//     l'en-tête d'une page, plus la date qui pilote le sitemap et le contrôle de
//     retard. `app/(en)/**/page.tsx` ne les écrit plus : il les demande à
//     `pageMeta()`. Il n'y a donc AUCUNE de ces valeurs en double.
//   · N'A PAS migré : la PROSE des sept pages (1 392 lignes de JSX) et son mobilier
//     (`<picture>` à art direction, entrées de `FAQPage`, `featureList`). La story
//     l'exclut explicitement de son périmètre — « Ce n'est pas la migration complète
//     de l'anglais vers le Markdown […] la migration se fait page par page et peut
//     déborder sur des PR suivantes ». Le corps de ces fichiers est donc vide, et
//     `bodyDigest()` ci-dessous le scelle tel quel : le cliquet du §6 fonctionne
//     dès la première ligne de prose versée.
//
// ⛔ La barrière du §7 reste entière, et c'est elle qui rend l'état intermédiaire
// sûr : `tools-check-langs.py` échoue si un `content/<lang>/` référence un `page:`
// sans `content/en/` correspondant. Une PR de langue ne peut pas ouvrir une page
// dont l'anglais n'a pas migré.

import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

export type ContentFile = {
  lang: string
  /** Nom du fichier sans extension — `home`, `alarms`… Identifie le fichier, pas l'URL. */
  name: string
  /** Chemin ANGLAIS de la page : l'identité de la page, commune à toutes les langues. */
  page: string
  /** Slug traduit, définitif. Vide pour l'accueil. */
  slug: string
  data: Record<string, string>
  body: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content')

/** En-tête `--- … ---` puis corps. Format volontairement pauvre : une clé par
 *  ligne, tout ce qui suit le premier `: ` est la valeur. Pas de YAML, donc pas de
 *  dépendance, et un traducteur ne peut pas casser la page avec une indentation. */
export function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!m) return { data: {}, body: raw }
  const data: Record<string, string> = {}
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue
    const i = line.indexOf(':')
    if (i < 0) continue
    let v = line.slice(i + 1).trim()
    if ((v.startsWith('"') && v.endsWith('"') && v.length > 1) ||
        (v.startsWith("'") && v.endsWith("'") && v.length > 1)) v = v.slice(1, -1)
    data[line.slice(0, i).trim()] = v
  }
  return { data, body: m[2] ?? '' }
}

let cache: ContentFile[] | null = null

/** Tous les fichiers de `content/`, toutes langues confondues. Lu une fois par build. */
export function allContent(): ContentFile[] {
  if (cache) return cache
  const out: ContentFile[] = []
  if (fs.existsSync(CONTENT_DIR)) {
    for (const lang of fs.readdirSync(CONTENT_DIR).sort()) {
      const dir = path.join(CONTENT_DIR, lang)
      if (!fs.statSync(dir).isDirectory()) continue
      for (const file of fs.readdirSync(dir).sort()) {
        if (!file.endsWith('.md')) continue
        const { data, body } = parseFrontmatter(fs.readFileSync(path.join(dir, file), 'utf8'))
        out.push({
          lang,
          name: file.replace(/\.md$/, ''),
          page: data.page ?? '',
          slug: data.slug ?? '',
          data,
          body,
        })
      }
    }
  }
  cache = out
  return out
}

/** Le sha256 du CORPS seul, en-tête exclu — la moitié « mesure » du cliquet du §6. */
export function bodyDigest(body: string): string {
  return createHash('sha256').update(body, 'utf8').digest('hex')
}

export const contentFor = (lang: string, page: string): ContentFile | undefined =>
  allContent().find((c) => c.lang === lang && c.page === page)

/** L'en-tête d'une page anglaise. Les `page.tsx` de `app/(en)/` l'appellent au lieu
 *  d'écrire leurs chaînes : c'est ce qui garantit qu'il n'y en a qu'un exemplaire. */
export function pageMeta(page: string): Record<string, string> {
  const c = contentFor('en', page)
  if (!c) throw new Error(`content/en : aucun fichier ne porte page: ${page}`)
  return c.data
}

/** Les langues qui ont au moins un fichier dans `content/`, `en` exclu.
 *  ⚠️ Ce n'est PAS la liste des langues publiées — c'est la liste de ce qui a été
 *  TRADUIT. Seule `LOCALES` publie. Voir lib/locales.ts. */
export const contentLocales = (): string[] =>
  [...new Set(allContent().map((c) => c.lang))].filter((l) => l !== 'en').sort()

/** L'URL d'une page dans une langue, ou `undefined` si cette page n'existe pas dans
 *  cette langue. Dérivée de `page:`/`slug:`, JAMAIS d'une table écrite à la main —
 *  deux sources qui divergent en silence sont le mode de panne de ce dépôt. */
export function urlFor(lang: string, page: string): string | undefined {
  if (lang === 'en') return contentFor('en', page) ? page : undefined
  const c = contentFor(lang, page)
  if (!c) return undefined
  return c.slug ? `/${lang}/${c.slug}/` : `/${lang}/`
}
