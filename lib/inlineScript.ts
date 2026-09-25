// 9-31 §10 — L'UNIQUE bloc `<script>` inline du site. Un seul, pas deux.
//
// ⚠️ DÉCISION DU PORTEUR, 2026-09-25 : **le bandeau de langue est supprimé.**
// « This site is also available in English → ça sert probablement à rien. Pour
// lecteur d'écran pourquoi pas. Pour les voyants. Un menu avec un drapeau suffit. »
// Ce bloc ne porte donc plus QUE les trois améliorations du sélecteur. Ce qui est
// parti avec le bandeau : la lecture de `navigator.languages`, le bloc JSON
// `#rt-langs` qui le nourrissait, le conteneur `#rt-banner`, le drapeau
// `localStorage` qui retenait le rejet, et la phrase `lang_banner` du contenu.
// ⛔ Ne pas le réintroduire sans une décision écrite : avec une seule langue il
// annonçait une disponibilité qui n'existe pas.
//
// ⚠️ « pas de bundle » n'est pas « pas de JavaScript ». Ce que le portage a retiré,
// ce sont 138 Ko de React et d'hydratation pour un site sans interactivité — pas
// « du JavaScript ». Ce bloc a un budget déclaré (≤ 1 200 octets) et un CLIQUET
// constaté, plus bas depuis la suppression du bandeau, que `tools-check-langs.py`
// imprime à chaque build (L11).
//
// ⛔ UN BLOC, PAS UN ATTRIBUT `onkeydown=`. La raison est la CSP, pas le style : un
// gestionnaire en attribut exige `script-src 'unsafe-hashes'`, qui affaiblit la
// directive POUR TOUT LE SITE et pour toujours. Un bloc inline ne coûte qu'une
// empreinte `sha256-…`, qui ne vaut que pour ce bloc exact et change à la moindre
// retouche. (`onkeypress` est en prime déprécié et ne reçoit pas `Échap`.)
//
// ⛔ IL AMÉLIORE, IL NE CONDITIONNE PAS. Le `<details>` s'ouvre et se ferme
// nativement, au clavier comme au pointeur. Ce script ne masque RIEN, ne pose
// aucune classe dont l'affichage dépendrait : c'est exactement le défaut que le
// portage a supprimé, où « si le JS échouait, tout restait à opacity: 0 ».
// Script coupé, le sélecteur marche entièrement ; seuls `Échap` et le clic
// extérieur disparaissent (AC12, AC26).
//
// ⚠️ DÉLÉGATION SUR `document`, et ce n'est pas un détail de style : le bloc est le
// premier enfant de `<body>`, donc il s'exécute AVANT que le pied de page — où vit
// le sélecteur — soit analysé. Chercher l'élément à l'exécution ne trouverait rien.
// Les trois écouteurs interrogent le DOM au moment de l'ÉVÉNEMENT, jamais au
// moment du chargement ; aucun `DOMContentLoaded` n'est donc nécessaire.
//
// ⛔ Rien n'est envoyé, rien n'est mesuré, aucun cookie ni `localStorage` : le seul
// accès au stockage qu'il y ait jamais eu appartenait au bandeau, et il est parti
// avec lui.

const SEL = "nav[data-rt-langs] details[open]"

export const INLINE_SCRIPT = `(function(){var D=function(){return document.querySelector('${SEL}')};
addEventListener('keydown',function(e){if(e.key!='Escape')return;var d=D();if(d){d.open=false;d.querySelector('summary').focus()}});
addEventListener('click',function(e){var d=D();if(d&&!d.contains(e.target))d.open=false});
addEventListener('pageshow',function(e){if(e.persisted){var d=D();if(d)d.open=false}})})();`
