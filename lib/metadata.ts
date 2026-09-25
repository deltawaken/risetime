// 9-31 — la fabrique de métadonnées : canonical + alternates + og, pour les deux
// arborescences (anglais en `app/(en)/`, traductions en `app/[lang]/`).
//
// ⚠️ C'EST LE POINT QUI REND L'AC3 VRAIE. « Quand une langue entre, les jeux
// `hreflang` de TOUTES les pages changent. » Si chaque `page.tsx` écrivait ses
// alternates, une PR de langue devrait rouvrir les sept fichiers — et le jour où
// elle en oublierait un, la faute serait invisible à l'œil. Ici les sept pages
// appellent la même fonction, qui lit `alternatesFor()`, qui lit `LOCALES`.
//
// ⛔ AUCUN `hreflang` tant que `LOCALES` est vide, et pas parce qu'une condition le
// masque : `alternatesFor()` retourne une liste vide, et `languages` reste
// `undefined`. Il n'y a rien à rendre (AC2, AC8).

import type { Metadata } from 'next'
import { pageMeta, urlFor } from './content'
import { alternatesFor, isPreview } from './locales'
import { contentFor } from './content'

/** `{ en: url, fr: url, 'x-default': url anglaise }`, ou `undefined` s'il n'y a que
 *  l'anglais. `x-default` pointe TOUJOURS l'anglais (L3) — un `x-default` qui dérive
 *  vers la dernière langue ajoutée est la faute que la règle attrape. */
function languageAlternates(page: string): Record<string, string> | undefined {
  const alts = alternatesFor(page)
  if (alts.length === 0) return undefined
  const out: Record<string, string> = {}
  for (const a of alts) out[a.lang] = a.url
  out['x-default'] = alts.find((a) => a.lang === 'en')!.url
  return out
}

function build(data: Record<string, string>, canonical: string, page: string): Metadata {
  const meta: Metadata = {
    title: data.title,
    description: data.description,
    alternates: { canonical, languages: languageAlternates(page) },
  }
  if (data.og_title) {
    meta.openGraph = {
      title: data.og_title,
      description: data.og_description,
      type: page === '/' ? 'website' : 'article',
      url: canonical,
      ...(data.og_image
        ? {
            images: [
              {
                url: data.og_image,
                width: Number(data.og_image_width),
                height: Number(data.og_image_height),
              },
            ],
          }
        : {}),
    }
    if (data.og_image) {
      meta.twitter = {
        card: 'summary_large_image',
        title: data.og_title,
        description: data.og_description,
        images: [data.og_image],
      }
    }
  }
  return meta
}

/** Les métadonnées d'une page ANGLAISE. ⚠️ Les `page.tsx` de `app/(en)/` ne portent
 *  plus leurs chaînes : elles sont dans `content/en/<slug>.md`, en un seul exemplaire.
 *  C'est la migration d'en-tête décrite dans lib/content.ts. */
export const enMetadata = (page: string): Metadata => build(pageMeta(page), page, page)

/** Les métadonnées d'une page TRADUITE. ⛔ Une page non relue n'est servie qu'en
 *  preview, et alors en `noindex, nofollow` : rien de non relu n'entre dans un index. */
export function langMetadata(lang: string, page: string): Metadata {
  const c = contentFor(lang, page)
  if (!c) return {}
  const url = urlFor(lang, page)!
  const meta = build(c.data, url, page)
  if (isPreview()) meta.robots = { index: false, follow: false }
  return meta
}
