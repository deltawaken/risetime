import type { MetadataRoute } from 'next'
import { PAGES, SITE_URL } from '@/lib/pages'

// Généré, jamais écrit à la main : quand une langue entre dans LOCALES, ses
// entrées et les hreflang de toutes les pages suivent d'eux-mêmes.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({
    url: SITE_URL + p.path,
    lastModified: p.updated,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))
}
