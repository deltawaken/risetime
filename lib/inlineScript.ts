// 9-31 §10 — L'UNIQUE bloc `<script>` inline du site. Un seul, pas deux.
//
// ⚠️ « pas de bundle » n'est pas « pas de JavaScript ». Ce que le portage a retiré,
// ce sont 138 Ko de React et d'hydratation pour un site sans interactivité — pas
// « du JavaScript ». Ce bloc pèse moins de 1 % de ce qui a été retiré, et il a un
// budget déclaré (≤ 1 200 octets, cliquet, L11) que `tools-check-langs.py` imprime.
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
// deuxième enfant de `<body>`, donc il s'exécute AVANT que le pied de page — où vit
// le sélecteur — soit analysé. Chercher l'élément à l'exécution ne trouverait rien.
// Les trois écouteurs interrogent le DOM au moment de l'ÉVÉNEMENT, jamais au
// moment du chargement ; aucun `DOMContentLoaded` n'est donc nécessaire, et le
// bandeau reste affiché avant que le reste du corps ne provoque un saut visible.
//
// ⛔ Rien n'est envoyé, rien n'est mesuré, aucun cookie n'est posé. `localStorage`
// et non un cookie : il n'y a pas de serveur pour le lire, et un cookie ouvrirait
// une question de consentement pour rien. Tout accès est sous `try/catch` — en
// navigation privée la lecture peut lever.
//
// ⚠️ La flèche appartient à la PHRASE (`lang_banner`), jamais au script : en arabe
// un `→` concaténé ici pointerait du mauvais côté. Rien n'est concaténé.

const SEL = "nav[data-rt-langs] details[open]"

export const INLINE_SCRIPT = `(function(){var D=function(){return document.querySelector('${SEL}')};
addEventListener('keydown',function(e){if(e.key!='Escape')return;var d=D();if(d){d.open=false;d.querySelector('summary').focus()}});
addEventListener('click',function(e){var d=D();if(d&&!d.contains(e.target))d.open=false});
addEventListener('pageshow',function(e){if(e.persisted){var d=D();if(d)d.open=false}});
var b=document.getElementById('rt-banner'),s=document.getElementById('rt-langs');
if(!b||!s||b.firstChild)return;
try{if(localStorage.getItem('rt-lang-hint'))return}catch(e){}
var m=JSON.parse(s.textContent),c=document.documentElement.lang,L=navigator.languages||[navigator.language],o,k;
for(var i=0;i<L.length;i++){k=L[i].split('-')[0];if(m[k]&&k!=c){o=m[k];break}}
if(!o)return;
var seen=function(){try{localStorage.setItem('rt-lang-hint','1')}catch(e){}};
var a=document.createElement('a');a.href=o.href;a.textContent=o.label;a.lang=k;a.dir=o.dir;a.onclick=seen;
var x=document.createElement('button');x.type='button';x.textContent='×';x.setAttribute('aria-label','Dismiss');
x.onclick=function(){seen();b.hidden=true};
b.appendChild(a);b.appendChild(x);b.hidden=false})();`
