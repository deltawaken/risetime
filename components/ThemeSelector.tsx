// LE SÉLECTEUR DE THÈME — porteur, 2026-09-27 : « menu items - theme-selector -
// lang-selector », après discussion des deux articles de Lea Verou.
//
// LE MODÈLE EST À DEUX ÉTATS, et il exprime quand même les trois du modèle de
// données (« Dark mode toggles: two states are enough », 2026-08-06) :
//
//   état         | ce que le bouton montre        | ce qui est stocké
//   -------------|--------------------------------|------------------
//   système      | le thème RÉSOLU (soleil/lune)  | rien
//   forcé        | le thème RÉSOLU (soleil/lune)  | « light » ou « dark »
//
//   · 1er appui : bascule vers L'INVERSE DE CE QU'ON VOIT, et stocke la valeur
//     LITTÉRALE (`light` ou `dark`) — ⛔ jamais « l'inverse du système », qui
//     retournerait le site quand l'OS bascule le soir.
//   · 2e appui : retour au système, et la valeur stockée est EFFACÉE. C'est ce que
//     la plupart des deux-états ratent : « storing a value that happens to match
//     the system preference silently converts a temporary adjustment into a
//     permanent pin with no way out ».
//   · ⛔ L'ÉVALUATION N'A LIEU QU'AU CLIC. On n'efface JAMAIS la valeur stockée
//     parce que le système a changé : beaucoup d'OS basculent selon l'heure, et
//     « tidier » l'override rendrait impossible d'épingler un thème.
//
// ⚠️ CE CONTRÔLE COÛTE DU JAVASCRIPT, sur un site qui n'en sert presque pas. Le
//    coût est borné et visible : il vit dans l'UNIQUE bloc inline (lib/inlineScript.ts),
//    dont le cliquet a été redéfini dans le même commit. Il réintroduit aussi un
//    accès à `localStorage`, parti avec le bandeau le 2026-09-25 — signalé, assumé.
//
// ⛔ SANS JAVASCRIPT, LE BOUTON N'EXISTE PAS À L'ÉCRAN. `.theme-selector` est en
//    `display: none` tant que le script n'a pas posé `data-js` sur <html>. Un
//    contrôle affiché qui ne fait rien est un mensonge — c'est la règle du projet,
//    et c'est aussi ce que le portage a corrigé quand l'affichage dépendait du JS.
//
// ⛔ PAS D'ARC SVG (`A`) : ses drapeaux `large-arc`/`sweep` produisent un fichier
//    VALIDE et une forme fausse, et rien ici ne rastérise pour vérifier. Le soleil
//    est un cercle et huit traits ; la lune est un cercle MASQUÉ par un second
//    cercle décalé — deux géométries sans ambiguïté.
export default function ThemeSelector() {
  return (
    <button type="button" className="theme-selector" data-rt-theme>
      <svg className="theme-selector__sun" viewBox="0 0 16 16" width="1em" height="1em"
           fill="none" stroke="currentColor" strokeWidth="1.1"
           aria-hidden="true" focusable="false">
        <circle cx="8" cy="8" r="3.2" />
        <line x1="8" y1="0.8" x2="8" y2="2.6" /><line x1="8" y1="13.4" x2="8" y2="15.2" />
        <line x1="0.8" y1="8" x2="2.6" y2="8" /><line x1="13.4" y1="8" x2="15.2" y2="8" />
        <line x1="2.9" y1="2.9" x2="4.2" y2="4.2" /><line x1="11.8" y1="11.8" x2="13.1" y2="13.1" />
        <line x1="13.1" y1="2.9" x2="11.8" y2="4.2" /><line x1="4.2" y1="11.8" x2="2.9" y2="13.1" />
      </svg>
      <svg className="theme-selector__moon" viewBox="0 0 16 16" width="1em" height="1em"
           aria-hidden="true" focusable="false">
        <mask id="rt-moon">
          <rect width="16" height="16" fill="black" />
          <circle cx="8" cy="8" r="6" fill="white" />
          <circle cx="11.6" cy="5.2" r="5.6" fill="black" />
        </mask>
        <rect width="16" height="16" fill="currentColor" mask="url(#rt-moon)" />
      </svg>
      {/* Un nom accessible STATIQUE et vrai dans les deux états. ⛔ Pas « passer en
          sombre » : au second appui le bouton revient au système, pas à l'inverse. */}
      <span className="sr-only">Change theme</span>
    </button>
  )
}
