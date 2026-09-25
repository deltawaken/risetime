// 9-31 (2026-09-25) — tout ce qui se déduit de `LOCALES`, et rien qui ne s'en déduise.
//
// LA PROPRIÉTÉ CENTRALE, écrite une fois ici pour n'être réécrite nulle part :
// aucune liste de langues n'existe à la main. Le sélecteur, les `hreflang`, le
// sitemap, le bloc JSON du bandeau et les routes `/xx/` sortent TOUS des fonctions
// de ce fichier, qui ne lisent que `LOCALES` (lib/pages.ts) et `content/`.
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

import { LOCALES, SITE_URL } from './pages'
import { allContent, contentFor, contentLocales, urlFor } from './content'

/** 9-31 §1 — jugement, PAS une mesure : le pied porte déjà 5 liens, en ajouter
 *  jusqu'à 3 reste une ligne. ⚠️ Se rejuge à l'œil sur la preview de la PR de la
 *  deuxième langue. Personne ne doit le citer comme mesuré. */
export const SELECTOR_INLINE_MAX = 3

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
  const entries = ['en', ...LOCALES]
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

/** Le bloc JSON inerte que lit le script du bandeau. Ses clés sont `['en'] ∪ LOCALES`
 *  (L10) et ses phrases sont écrites par les traducteurs — ⚠️ la flèche appartient à
 *  la phrase, jamais au script : en arabe un `→` concaténé pointerait à l'envers. */
export function bannerData(): Record<string, { label: string; href: string; dir: string }> {
  const out: Record<string, { label: string; href: string; dir: string }> = {}
  for (const l of ['en', ...LOCALES]) {
    const href = urlFor(l, '/')
    const label = contentFor(l, '/')?.data.lang_banner
    if (href && label) out[l] = { label, href, dir: dirOf(l) }
  }
  return out
}
