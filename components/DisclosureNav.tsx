// 9-31 — LE composant de liste de liens repliable. Un seul, pour deux usages.
//
// Usage 1 (livré ici) : le menu « Uses » de l'en-tête, qui donne accès aux pages
//   d'usage depuis n'importe quelle page. Avant lui, `/golden-hour-alarm/` et ses
//   sœurs n'étaient atteignables QUE depuis l'accueil : quelqu'un qui y arrivait
//   par Google n'avait aucun chemin vers les autres.
// Usage 2 (LIVRÉ le 2026-09-25) : le sélecteur de langue du pied de page, via
//   `components/LanguageSelector.tsx`, qui appelle ce même composant avec
//   `inlineMax={SELECTOR_INLINE_MAX}`. ⛔ Il n'existe donc AUCUNE seconde
//   implémentation de la <ul>, des <li><a> ni de l'enveloppe <details> : le
//   sélecteur ne peut pas diverger du menu « Uses ».
//
// ⚠️ `inlineMax` vit chez l'APPELANT, pas ici, et les deux usages valent désormais
// 0 (toujours replié) — pour des raisons DIFFÉRENTES, écrites chacune chez son
// appelant. Un seuil unique codé dans le composant les confondrait, et le jour où
// l'un des deux rebouge on ne saurait plus lequel le nombre servait.
//
// ⛔ Aucun `"use client"` : `tools-strip-runtime.mjs` refuse de s'exécuter s'il en
// trouve un, et le JavaScript retiré par le portage reviendrait. `<details>`
// s'ouvre et se ferme nativement ; le script inline que 9-31 §1 prévoit (Échap,
// clic extérieur, retour arrière) AMÉLIORE, il ne conditionne pas.
//
// ⛔ Ni `role="menu"`, ni `menuitem`, ni `aria-haspopup`, ni `aria-expanded` écrits
// à la main : 9-31 § « Clavier et lecteur d'écran » tranche le point. `<details>`
// est un widget de divulgation, les navigateurs exposent son état, et
// `role="menuitem"` retirerait la sémantique de lien aux entrées.

import type { ReactNode } from 'react'

export type DisclosureEntry = {
  href: string
  label: string
  /** Attributs d'internationalisation — utilisés par le sélecteur de langue
   *  (9-31 §1 : « chaque <a> porte hreflang, lang et dir »), inutiles ici. */
  hrefLang?: string
  lang?: string
  dir?: 'ltr' | 'rtl'
}

export type DisclosureNavProps = {
  /** Libellé du <summary>, quand la liste est repliée. `ReactNode` et non `string` :
   *  le sélecteur de langue y met un globe SVG `aria-hidden` SUIVI de l'endonyme de
   *  la langue courante (décision du porteur, 2026-09-25 — ⛔ jamais un drapeau, la
   *  raison est dans `LanguageSelector.tsx`). Le menu « Uses » passe une chaîne ;
   *  les deux cas traversent le même code. */
  label: ReactNode
  /** Complément visuellement masqué : un <summary> qui ne lit que « Uses » se
   *  présente comme une étiquette, pas comme un contrôle qui ouvre quelque chose. */
  hint: string
  entries: DisclosureEntry[]
  /** Chemin de la page courante. `aria-current="page"` en est DÉDUIT, jamais écrit
   *  à la main — c'est ce qui rend les en-têtes identiques d'une page à l'autre. */
  current: string
  /** Au-delà de ce nombre d'entrées, la liste est enveloppée dans <details>.
   *  0 = toujours repliée. */
  inlineMax?: number
  /** Si fourni, la liste est enveloppée dans un <nav> qui la nomme comme repère.
   *  À omettre quand le composant est DÉJÀ dans un <nav> (cas du menu d'en-tête) :
   *  un <nav> imbriqué ajouterait un repère pour rien. */
  ariaLabel?: string
  /** Attributs supplémentaires posés sur le <nav> — l'accroche `data-rt-langs` du
   *  sélecteur de langue, que le script inline et la règle L7 cherchent. Ignoré
   *  quand `ariaLabel` est absent, puisqu'il n'y a alors pas de <nav>. */
  navProps?: Record<string, string>
  className?: string
}

export default function DisclosureNav({
  label,
  hint,
  entries,
  current,
  inlineMax = 0,
  ariaLabel,
  navProps,
  className,
}: DisclosureNavProps) {
  // 9-31 §1 : « Si cette liste est vide, il ne rend rien. » Ce n'est pas un cas
  // particulier à retirer un jour : c'est le comportement normal sur une entrée
  // vide, et c'est ce qui fera que `LOCALES = []` ne produit aucun sélecteur.
  if (entries.length === 0) return null

  const list = (
    <ul className="disclosure-nav__list">
      {entries.map((e) => (
        <li key={e.href}>
          <a
            href={e.href}
            hrefLang={e.hrefLang}
            lang={e.lang}
            dir={e.dir}
            {...(e.href === current ? { 'aria-current': 'page' as const } : {})}
          >
            {e.label}
          </a>
        </li>
      ))}
    </ul>
  )

  const body =
    entries.length <= inlineMax ? (
      list
    ) : (
      <details className="disclosure-nav">
        <summary>
          {label}
          {/* `hint` porte son espace initial : deux nœuds de texte voisins dans
              un même élément feraient émettre à React un séparateur `<!-- -->`
              dans le HTML statique. */}
          <span className="sr-only">{hint}</span>
        </summary>
        {list}
      </details>
    )

  const wrapped = className ? <div className={className}>{body}</div> : body

  return ariaLabel ? (
    <nav aria-label={ariaLabel} {...navProps}>
      {wrapped}
    </nav>
  ) : (
    wrapped
  )
}
