import type { MetadataRoute } from 'next'
import { PAGES, LOCALES, SITE_URL } from '@/lib/pages'
import { pageMeta, urlFor, contentFor } from '@/lib/content'
import { isReviewed } from '@/lib/locales'

// Généré, JAMAIS écrit à la main — c'est la propriété que la story demande de
// protéger en revue. Quand une langue entre dans `LOCALES`, ses entrées et les
// `hreflang` de toutes les pages suivent d'eux-mêmes ; un sitemap écrit à la main
// deviendrait faux à chaque PR de langue, exactement comme il l'était le 2026-09-22.
export const dynamic = 'force-static'

/** ⛔ `LOCALES` est la seule porte, dans les DEUX builds. Une langue construite en
 *  preview mais absente de la table n'entre ni ici ni dans un `hreflang` (L5), et
 *  une page non relue n'y entre pas non plus — sa langue peut être publiée sans
 *  qu'elle le soit : la granularité est la page. */
const published = (page: string) =>
  LOCALES.filter((l) => urlFor(l, page) && isReviewed(l, page))

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = []
  for (const p of PAGES) {
    const langs = published(p.path)
    const languages: Record<string, string> | undefined =
      langs.length === 0
        ? undefined
        : Object.fromEntries([
            ['en', SITE_URL + p.path],
            ...langs.map((l) => [l, SITE_URL + urlFor(l, p.path)!]),
            ['x-default', SITE_URL + p.path],
          ])
    out.push({
      url: SITE_URL + p.path,
      lastModified: pageMeta(p.path).updated,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      ...(languages ? { alternates: { languages } } : {}),
    })
    for (const l of langs) {
      out.push({
        url: SITE_URL + urlFor(l, p.path)!,
        lastModified: contentFor(l, p.path)!.data.updated,
        changeFrequency: p.changeFrequency,
        priority: p.priority,
        alternates: { languages: languages! },
      })
    }
  }
  return out
}
