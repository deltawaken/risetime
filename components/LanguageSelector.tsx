import DisclosureNav from './DisclosureNav'
import { selectorEntries, endonym, SELECTOR_INLINE_MAX } from '../lib/locales'

// 9-31 §1 — le sélecteur de langue. ⛔ IL N'Y A PAS DE SECONDE IMPLÉMENTATION : la
// <ul>, ses <li><a> et l'enveloppe <details> sont celles de `DisclosureNav`, déjà
// écrites pour le menu « Uses ». Ce fichier ne fait que lui donner ses entrées.
//
// LES TROIS ÉTATS, tous DÉDUITS de LOCALES, aucun écrit à la main :
//   0 entrée   → rien du tout : `DisclosureNav` retourne `null` sur liste vide.
//                C'est l'état d'aujourd'hui, et c'est la bonne réponse — un
//                <details> qui s'ouvre sur une entrée déjà active coûte un geste
//                pour n'apprendre rien, et un contrôle affiché qui ne fait rien est
//                un mensonge. L'absence de sélecteur est une information juste :
//                ce site n'a qu'une langue.
//   1 à 3      → la <ul> à plat, sans <details>.
//   4 et plus  → la MÊME <ul>, enveloppée.
//
// `data-rt-langs` sur le <nav> : c'est l'accroche du script inline (Échap, clic
// extérieur) ET le conteneur que la règle L7 compte. ⚠️ L7 visait d'abord « zéro
// <details> dans l'export » — faux depuis que le menu « Uses » en est un. Une règle
// qui nomme une BALISE plutôt qu'un RÔLE se périme au premier composant qui
// réutilise cette balise.
export default function LanguageSelector({ lang, page }: { lang: string; page: string }) {
  const entries = selectorEntries(lang, page)
  return (
    <DisclosureNav
      label={endonym(lang)}
      /* Un <summary> qui ne lit que « English » se présente comme une étiquette.
         Le complément masqué nomme le CONTRÔLE. */
      hint=" — choose a language"
      entries={entries}
      /* Aucune entrée n'est la page courante : la langue courante est exclue de la
         liste. `current` n'a donc rien à désigner. */
      current=""
      inlineMax={SELECTOR_INLINE_MAX}
      ariaLabel="Language"
      navProps={{ 'data-rt-langs': '' }}
      className="lang-selector"
    />
  )
}
