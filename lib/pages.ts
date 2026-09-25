// 9-31 — le registre des pages. Une seule source de vérité pour le sitemap,
// et plus tard pour les hreflang et le contrôle de retard entre langues.
//
// ⚠️ `updated` A DÉMÉNAGÉ, 9-31 (2026-09-25) : il vit désormais dans l'en-tête de
// `content/en/<slug>.md`, et non plus ici. La raison est celle de toute cette
// story — DEUX SOURCES DIVERGENT EN SILENCE : une date de traduction se compare à
// la date anglaise (§6), et si la date anglaise vit ici pendant que celle du
// français vit dans son en-tête, le contrôle de retard compare deux registres que
// rien ne tient en phase. Elle reste saisie à la main, pour la raison d'origine :
// ni `mtime` (en CI c'est l'heure du checkout, identique partout) ni `git log`
// (clones superficiels) ne donnent la bonne valeur. Le 2026-09-22, le sitemap
// écrit à la main annonçait encore mars pour trois pages réécrites la veille.

// 9-31 (2026-09-25) — CHAMP AJOUTÉ, et il n'est pas cosmétique : signalé au porteur.
//
// Avant ce jour, `Page` ne portait QUE ce qu'il faut au sitemap. Rien n'y disait
// si une page est une page de fonction (`/alarms/`, `/timers/`), une page d'usage
// (`/golden-hour-alarm/`…) ou une page légale. La navigation ne pouvait donc pas
// se dériver du registre : elle était recopiée à la main dans les huit fichiers de
// page, et elle y avait divergé (quatre en-têtes distincts, dont un avec un lien
// « Alarms » pointant l'accueil).
//
// `nav` comble exactement ce manque, et rien de plus :
//   - `group: 'main'` → entrée à plat dans l'en-tête, avant le menu « Uses » ;
//   - `group: 'uses'` → entrée du menu déroulant « Uses » ;
//   - `group: 'legal'` → entrée à plat, APRÈS le menu. Ce troisième groupe n'est
//     pas une coquetterie : sans lui, la place du menu dans la barre se calculerait
//     par un `slice(-1)` qui suppose en silence que « Privacy est la dernière ».
//     Le groupe le DIT, et rien ne se casse le jour où une autre page légale entre ;
//   - `group` absent  → la page n'est dans aucune navigation (l'accueil, porté par
//     le logotype, n'a pas besoin d'y figurer deux fois).
// L'ORDRE des entrées est celui de `PAGES` — il n'y a pas de champ d'ordre, parce
// qu'une seconde source d'ordre est une source de divergence.
//
// ⚠️ `label` est le libellé COURT de navigation, distinct du `title` de la page et
// des phrases de la section « What more you can do » de l'accueil. Ce sont trois
// registres d'écriture différents pour le même lien, et c'est voulu.
export type NavEntry = {
  group: 'main' | 'uses' | 'legal'
  label: string
}

export type Page = {
  path: string
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
  priority: number
  nav?: NavEntry
}

// Valeurs reprises telles quelles du sitemap.xml de main (commit 967c17d),
// conservé à côté sous public/sitemap.xml.orig-967c17d pour comparaison.
export const PAGES: Page[] = [
  { path: '/', changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/alarms/', changeFrequency: 'monthly', priority: 0.8,
    nav: { group: 'main', label: 'Alarms' } },
  { path: '/golden-hour-alarm/', changeFrequency: 'monthly', priority: 0.7,
    nav: { group: 'uses', label: 'Golden hour and night sky' } },
  { path: '/circadian-rhythm-alarm/', changeFrequency: 'monthly', priority: 0.7,
    nav: { group: 'uses', label: 'Circadian rhythm' } },
  { path: '/sunrise-meditation-alarm/', changeFrequency: 'monthly', priority: 0.7,
    nav: { group: 'uses', label: 'Meditation and yoga' } },
  { path: '/timers/', changeFrequency: 'monthly', priority: 0.7,
    nav: { group: 'main', label: 'Timers' } },
  { path: '/privacy/', changeFrequency: 'yearly',  priority: 0.3,
    nav: { group: 'legal', label: 'Privacy' } },
]

// Les entrées de navigation, dérivées du registre — jamais écrites à la main.
// Ajouter une page d'usage à `PAGES` avec `nav.group === 'uses'` la fait
// apparaître dans le menu « Uses » de TOUTES les pages sans toucher à un composant.
export const navGroup = (group: NavEntry['group']) =>
  PAGES.filter((p): p is Page & { nav: NavEntry } => p.nav?.group === group)
       .map((p) => ({ href: p.path, label: p.nav.label }))

export const SITE_URL = 'https://risetime.app'

// Les langues effectivement construites. L'anglais vit à la racine (app/(en)/) ;
// une langue ajoutée ici apparaît dans les pages, le sitemap et les hreflang
// SANS autre modification de code. Aucune pour l'instant : les traductions
// arrivent une par une, par PR relue sur la preview.
export const LOCALES: string[] = []
