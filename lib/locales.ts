// 9-31 (2026-09-25) — tout ce qui se déduit de `LOCALES`, et rien qui ne s'en déduise.
//
// LA PROPRIÉTÉ CENTRALE, écrite une fois ici pour n'être réécrite nulle part :
// aucune liste de langues n'existe à la main. Le sélecteur, les `hreflang`, le
// sitemap et les routes `/xx/` sortent TOUS des fonctions de ce fichier, qui ne
// lisent que `LOCALES` (lib/pages.ts) et `content/`.
// (Le bloc JSON du bandeau figurait dans cette liste ; le bandeau est supprimé
// depuis le 2026-09-25 — voir plus bas, là où `bannerData()` se trouvait.)
//
// ⚠️ TROIS ensembles différents, qu'il ne faut jamais confondre — c'est la
// confusion qui produirait un `hreflang` vers une page inexistante :
//
//   1. `LOCALES`            — ce qui est PUBLIÉ. Seul point d'entrée en production.
//   2. `contentLocales()`   — ce qui est TRADUIT. Peut contenir du non relu ; ne
//                             publie rien par soi-même.
//   3. `alternatesFor(page)`— ce qui existe POUR CETTE PAGE-LÀ. C'est la seule
//                             source des `hreflang`, et sa granularité est la page.
//
// Le sélecteur suit (1) : une langue de `LOCALES` y figure toujours, même sur une
// page qu'elle n'a pas encore — l'entrée mène alors à son accueil et LE DIT
// (`lang_home_suffix`). Les `hreflang` suivent (3). Le §2 de la story tranche
// explicitement que les deux règles diffèrent, et pourquoi.

import { LOCALES, SITE_URL, STATIC_LOCALES, navGroup } from './pages'
import type { NavEntry } from './pages'
import { allContent, contentFor, contentLocales, urlFor } from './content'

/** Au-delà de ce nombre d'entrées, la liste passe sous `<details>`. **0 = toujours
 *  repliée, donc toujours un déclencheur.**
 *
 *  ⚠️ VALEUR CHANGÉE le 2026-09-25 (3 → 0), et c'est une conséquence directe des
 *  deux décisions du porteur du jour, pas une préférence :
 *
 *   · le bandeau est SUPPRIMÉ. Le §1 justifiait le pied de page en disant que « la
 *     découverte passe par le bandeau, le sélecteur est le chemin délibéré ». Ce
 *     chemin-là n'existe plus : le sélecteur est désormais le SEUL. Un lien nu
 *     « Français » perdu au milieu des six liens du pied n'est pas découvrable ;
 *   · le déclencheur est « globe + endonyme de la langue COURANTE ». À plat il n'y
 *     a pas de `<summary>`, donc ni globe ni endonyme courant — la décision du
 *     porteur ne serait tenue qu'à partir de quatre langues, c'est-à-dire pas à la
 *     première.
 *
 *  🔸 À SIGNALER, PAS À MASQUER : 9-31 §1 et AC11 décrivent TROIS états (0 / 1-3 à
 *  plat / 4+ replié). Il n'en reste que deux : 0 ⇒ rien, 1+ ⇒ replié. Aucun AC
 *  n'est modifié ici ; l'écart est porté au rapport et à PORTAGE.md. Les décisions
 *  du 2026-09-25 sont postérieures au §1.
 *
 *  ⛔ Ce que ça NE change PAS : `LOCALES = []` ⇒ zéro entrée ⇒ `DisclosureNav`
 *  retourne `null` ⇒ rien du tout. 0 entrée n'est pas « repliée », c'est absente. */
export const SELECTOR_INLINE_MAX = 0

/** ⚠️ Le défaut est la PRODUCTION. Une preview se demande explicitement ; l'oubli
 *  ne peut donc produire qu'un site trop pauvre, jamais un site qui publie du non
 *  relu. C'est le sens d'erreur qu'on veut (§9). */
export const isPreview = (): boolean => process.env.BUILD_TARGET === 'preview'

/** Une page traduite est CONSTRUCTIBLE en production ssi elle porte un `reviewed`.
 *  La granularité est la page, pas la langue : un relecteur finit `/fr/alarmes/`
 *  un soir et `/fr/minuteurs/` la semaine suivante. */
export const isReviewed = (lang: string, page: string): boolean =>
  Boolean(contentFor(lang, page)?.data.reviewed)

/** Les pages construites pour une langue. En production, une page sans `reviewed`
 *  n'est PAS construite — il vaut un site trop pauvre qu'une page non relue en ligne. */
export const builtPages = (lang: string): string[] =>
  allContent()
    .filter((c) => c.lang === lang && c.page)
    .filter((c) => isPreview() || Boolean(c.data.reviewed))
    .map((c) => c.page)

/** Les langues effectivement CONSTRUITES par ce build (routes `/xx/`).
 *  Production : `LOCALES` seule. Preview : plus tout ce que `content/` porte.
 *
 *  ⚠️ FILTRÉE SUR LES PAGES RÉELLEMENT CONSTRUITES, et ce n'est pas cosmétique :
 *  sans ce filtre, une langue de `LOCALES` dont AUCUNE page n'est relue obtenait
 *  quand même sa route `/xx/`, donc un accueil exporté sans contenu relu — soit
 *  exactement ce que le §9 interdit. Le défaut a été trouvé en construisant le cas,
 *  pas en relisant le code. */
export const builtLocales = (): string[] =>
  readableLocales()
    // ⛔ Une langue à pages statiques est exclue de la route DYNAMIQUE : ses URL
    //    existent déjà en dur, et Next refuserait de produire deux fois la même.
    //    Elle reste LISIBLE — c'est `readableLocales()` qui la porte.
    .filter((l) => !STATIC_LOCALES.includes(l))

/** LE QUATRIÈME ENSEMBLE, et il fallait le nommer : les langues qu'on peut LIRE
 *  dans ce build, quelle que soit la route qui les produit — dynamique `/xx/` ou
 *  pages statiques écrites à la main.
 *
 *  ⛔ RÉGRESSION DU 2026-09-27, réparée ici, et la lire avant de toucher à ce
 *  fichier : `selectorEntries()` lisait `builtLocales()`. Le français est entré
 *  dans `STATIC_LOCALES`, donc il en est sorti — et avec `LOCALES = []`, le
 *  sélecteur n'avait plus AUCUNE entrée : **le menu des langues a disparu de
 *  toutes les pages de la preview**, alors que les sept pages françaises étaient
 *  bien là. Personne ne pouvait plus les atteindre autrement qu'en tapant l'URL.
 *
 *  La faute est exactement celle que l'avertissement en tête de ce fichier décrit :
 *  avoir confondu deux ensembles. « Ce que la route dynamique produit » et « ce
 *  qu'un lecteur peut atteindre » ne sont pas la même chose, et la seconde est
 *  toujours la plus large. Le sélecteur suit celle-ci, jamais l'autre. */
export const readableLocales = (): string[] =>
  (isPreview()
    ? [...new Set([...LOCALES, ...contentLocales()])]
    : [...LOCALES]
  )
    .filter((l) => builtPages(l).length > 0)
    .sort()

/** L'endonyme d'une langue, dans son écriture, tel que son traducteur l'a écrit.
 *  ⛔ Jamais un drapeau (un drapeau est un pays, pas une langue — décisif pour
 *  `ar` et `ms`), jamais le nom traduit en anglais. */
export const endonym = (lang: string): string =>
  contentFor(lang, '/')?.data.lang_endonym ?? lang

export const dirOf = (lang: string): 'ltr' | 'rtl' =>
  contentFor(lang, '/')?.data.lang_dir === 'rtl' ? 'rtl' : 'ltr'

/** Les `hreflang` d'UNE page : les langues où CETTE page existe, relue, et publiée.
 *  ⛔ `LOCALES` est la seule porte, dans les deux builds : une langue construite en
 *  preview mais absente de `LOCALES` n'entre ni au sitemap ni aux alternates (L5).
 *  Retourne une liste vide s'il n'y a que l'anglais — auquel cas la page n'émet
 *  AUCUN `hreflang`, pas même son auto-référence (L2 ne s'arme qu'à partir d'un
 *  alternate, et un `x-default` seul ne dirait rien à personne). */
export function alternatesFor(page: string): { lang: string; url: string }[] {
  const others = LOCALES.filter((l) => urlFor(l, page) && isReviewed(l, page))
  if (others.length === 0) return []
  return [
    { lang: 'en', url: SITE_URL + page },
    ...others.map((l) => ({ lang: l, url: SITE_URL + urlFor(l, page)! })),
  ]
}

export type SelectorEntry = {
  href: string
  label: string
  hrefLang: string
  lang: string
  dir: 'ltr' | 'rtl'
}

/** 9-31 §1 : « le sélecteur rend la liste des langues disponibles AUTRES que celle
 *  de la page. Si cette liste est vide, il ne rend rien. »
 *
 *      entrées = (['en'] ∪ LOCALES) \ { langue de la page courante }
 *
 *  `LOCALES` vide ⇒ sur une page anglaise la liste est vide ⇒ `DisclosureNav`
 *  retourne `null`. Ce n'est pas un cas particulier à retirer le jour où une langue
 *  arrive : c'est le comportement normal du code sur une entrée vide.
 *
 *  ⚠️ AC13 — un lien qui ne ment pas. Si la page n'existe pas dans la langue visée,
 *  l'entrée mène à l'ACCUEIL de cette langue et son libellé porte le suffixe écrit
 *  DANS cette langue (`lang_home_suffix`). ⛔ Jamais vers une page anglaise.
 *
 *  Ordre : `Intl.Collator` au build (Node a l'ICU complet). Aucune liste d'ordre
 *  écrite à la main nulle part. */
export function selectorEntries(currentLang: string, currentPage: string): SelectorEntry[] {
  // ⚠️ EN PREVIEW, LE SÉLECTEUR SUIT LES LANGUES CONSTRUITES, pas `LOCALES`.
  //    Ajouté le 2026-09-27 : sans ça, `LOCALES` étant vide, aucune page anglaise
  //    de la preview ne portait de sélecteur — et **on ne pouvait atteindre une
  //    page traduite qu'en tapant son URL à la main**. Or la preview existe
  //    précisément pour qu'un relecteur lise les vraies pages.
  // ⛔ CE QUE ÇA NE TOUCHE PAS : `alternatesFor()`, donc les `hreflang` et le
  //    sitemap, qui restent sur `LOCALES` SEULE dans les deux builds (règle L5).
  //    Le sélecteur est un chemin de lecture ; le `hreflang` est une déclaration
  //    au moteur de recherche. Les élargir ensemble serait la faute.
  // ⛔ `readableLocales()`, PAS `builtLocales()` : voir la régression consignée
  //    sur `readableLocales`. Une langue à pages statiques est lisible, donc elle
  //    est dans le sélecteur, même si la route dynamique ne la produit pas.
  const disponibles = isPreview() ? readableLocales() : LOCALES
  const entries = ['en', ...disponibles]
    .filter((l) => l !== currentLang)
    .map((l) => {
      const here = urlFor(l, currentPage)
      const home = urlFor(l, '/')
      const suffix = contentFor(l, '/')?.data.lang_home_suffix ?? ''
      const label = here ? endonym(l) : `${endonym(l)} ${suffix}`.trim()
      return { href: here ?? home ?? '/', label, hrefLang: l, lang: l, dir: dirOf(l) }
    })
  return entries.sort((a, b) =>
    new Intl.Collator('en', { sensitivity: 'base' }).compare(a.label, b.label),
  )
}

/* ⛔ `bannerData()` A ÉTÉ SUPPRIMÉE le 2026-09-25 avec le bandeau lui-même
 *    (décision du porteur). Elle produisait le bloc JSON `#rt-langs`, que SEUL le
 *    script du bandeau lisait. Le sélecteur n'en a jamais eu besoin : ses entrées
 *    sortent de `selectorEntries()` AU BUILD et sont dans le HTML. Il ne reste donc
 *    aucune donnée de langue inerte dans les pages — plus un seul bloc JSON hors
 *    JSON-LD. ⛔ Ne pas la ressusciter « au cas où » : avec une seule langue elle
 *    affirmait une disponibilité qui n'existe pas. */


/** LA NAVIGATION, TRADUITE — libellés ET adresses (2026-09-27, porteur : « le menu
 *  header devra être traduit lui aussi, avec les bonnes pages, bien sûr »).
 *
 *  Les deux moitiés viennent du CONTENU, jamais d'une table écrite à la main :
 *    · l'adresse, de `urlFor(lang, page)` — donc du `slug:` de la langue ;
 *    · le libellé, de la clé `nav_label` de l'en-tête de cette page.
 *
 *  ⚠️ LE REPLI EST DÉLIBÉRÉ ET IL SE VOIT. Tant qu'une page n'est pas traduite,
 *  `urlFor` retourne `undefined` : l'entrée pointe alors la page ANGLAISE et garde
 *  le libellé anglais du registre. ⛔ Pas d'entrée masquée, pas de lien mort : un
 *  menu amputé cacherait l'état réel de la traduction, et un lien vers une page
 *  inexistante serait pire. Le mélange de langues dans le menu EST l'information —
 *  il disparaît à mesure que les pages arrivent.
 */
export const navEntriesFor = (group: NavEntry['group'], lang: string) =>
  navGroup(group).map((e) => ({
    href: urlFor(lang, e.href) ?? e.href,
    label: contentFor(lang, e.href)?.data.nav_label ?? e.label,
    /** ⚠️ LA CLÉ ANGLAISE DE LA PAGE, conservée à côté de l'adresse traduite.
     *  `aria-current` se déduit d'ELLE et jamais de `href` : sur une page
     *  française, l'adresse est `/fr/confidentialite/` alors que l'identité de la
     *  page reste `/privacy/`. Comparer les adresses ferait perdre `aria-current`
     *  dans toutes les langues d'un coup, sans rien casser d'autre — donc sans
     *  qu'on le remarque. */
    page: e.href,
  }))

/** L'adresse de l'accueil dans une langue — pour le logotype, qui ramenait
 *  toujours à l'accueil ANGLAIS depuis une page traduite. */
export const homeFor = (lang: string) => urlFor(lang, '/') ?? '/'
