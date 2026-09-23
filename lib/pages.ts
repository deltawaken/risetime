// 9-31 — le registre des pages. Une seule source de vérité pour le sitemap,
// et plus tard pour les hreflang et le contrôle de retard entre langues.
//
// ⚠️ `updated` est saisi À LA MAIN, volontairement. Ni la date de modification
// du fichier (en CI c'est l'heure du checkout, identique partout), ni `git log`
// (les clones de CI sont superficiels) ne donnent la bonne valeur. Le
// 2026-09-22, le sitemap écrit à la main annonçait encore mars pour trois pages
// réécrites la veille : c'est ce défaut que ce champ corrige.

export type Page = {
  path: string
  updated: string
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
  priority: number
}

// Valeurs reprises telles quelles du sitemap.xml de main (commit 967c17d),
// conservé à côté sous public/sitemap.xml.orig-967c17d pour comparaison.
export const PAGES: Page[] = [
  { path: '/',                        updated: '2026-09-20', changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/alarms/',                 updated: '2026-09-19', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/golden-hour-alarm/',      updated: '2026-09-20', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/circadian-rhythm-alarm/', updated: '2026-09-20', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/timers/',                 updated: '2026-09-19', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy/',                updated: '2026-09-19', changeFrequency: 'yearly',  priority: 0.3 },
]

export const SITE_URL = 'https://risetime.app'

// Les langues effectivement construites. L'anglais vit à la racine (app/(en)/) ;
// une langue ajoutée ici apparaît dans les pages, le sitemap et les hreflang
// SANS autre modification de code. Aucune pour l'instant : les traductions
// arrivent une par une, par PR relue sur la preview.
export const LOCALES: string[] = []
