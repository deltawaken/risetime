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
/* ⛔ REMIS À VIDE le 2026-09-28. Rempli quelques heures plus tôt à la demande du
 *    porteur pour voir les sept langues, il FAIT ÉCHOUER LE BUILD : le §9 exige
 *    qu'une langue publiée ait toutes ses pages relues, et aucune ne l'est encore.
 *    Un build rouge = aucun déploiement Cloudflare = pas de preview à relire.
 * ⭐ Et ce n'était pas nécessaire : en preview, le sélecteur suit `readableLocales()`,
 *    qui lit `content/`. Les sept langues s'affichent avec cette liste vide.
 *    Elle se remplit langue par langue, quand leurs pages portent `reviewed`. */
/* Rempli le 2026-09-27 à la demande du porteur, pour voir les sept langues.
 * ⚠️ Une langue listée ici sans page relue ne produit toujours rien : `builtPages`
 *    la vide en production et `alternatesFor` n'émet un hreflang que pour une page
 *    qui porte `reviewed`. La branche de production reste `main`. */

/** LES LANGUES DONT LES PAGES SONT ÉCRITES À LA MAIN, comme l'anglais.
 *
 *  ⚠️ AJOUTÉ le 2026-09-27, sur décision du porteur : « on ne fait plus de
 *  markdown […] tu vas juste bien gentiment tout traduire toi-même ». Une page
 *  traduite doit porter TOUT ce que porte l'anglaise — ses captures à direction
 *  artistique et ses données structurées comprises — or le rendu Markdown des
 *  pages traduites ne sait faire que titres, paragraphes, listes et emphase.
 *
 *  Une langue listée ici :
 *    · garde son `content/<lang>/*.md` pour son EN-TÊTE seul (titre, description,
 *      og, `nav_label`, clés de langue) — exactement comme `content/en/` le fait
 *      pour les pages anglaises ;
 *    · est donc dans le sélecteur, les `hreflang` et la navigation traduite ;
 *    · ⛔ mais est RETIRÉE de la route dynamique `app/[lang]/`, sans quoi Next
 *      produirait DEUX fois la même URL — une fois en statique, une fois en
 *      dynamique.
 *
 *  Le corps de ses `.md` est donc vide, et c'est normal : la prose vit dans le
 *  JSX, du même côté que l'anglaise. */
export const STATIC_LOCALES: string[] = ['fr', 'de', 'es', 'it', 'nl', 'pl']
/* ⚠️ Une langue n'entre ici QUE quand ses pages existent. Y figurer sans pages la
 *    retire de la route dynamique sans rien mettre à la place : elle DISPARAÎTRAIT
 *    du sélecteur au lieu d'y apparaître. `readableLocales()` la filtre sur
 *    `builtPages(l).length > 0`, donc le défaut serait silencieux — raison de plus
 *    pour tenir cette liste alignée sur `content/`. */
