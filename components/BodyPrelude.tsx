import { INLINE_SCRIPT } from '../lib/inlineScript'

// 9-31 §4 — le premier enfant de <body>, identique dans les deux layouts racines.
//
// ⚠️ IL N'EN RESTE QU'UN. Le porteur a supprimé le bandeau de langue le
// 2026-09-25 ; les deux autres nœuds que ce composant émettait sont partis avec :
//
//  · `#rt-banner`, le conteneur vide où le bandeau se construisait ;
//  · `#rt-langs`, le bloc JSON qui lui donnait ses phrases et ses adresses. Il
//    ne servait QU'À LUI — le sélecteur, lui, est rendu au build, ses entrées
//    sont dans le HTML et aucun script ne les lit. Avec une seule langue, ce
//    bloc annonçait en plus une disponibilité inexistante.
//
// Reste le script inline, placé tôt pour être en place avant toute interaction.
export default function BodyPrelude() {
  return <script dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT }} />
}
