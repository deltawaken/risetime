# Portage Next.js — rapport (branche `site/nextjs`)

Story `9-31`. Porté le 2026-09-24 depuis le commit **`967c17d`** de `main`.

**Principe tenu : recopier, pas réécrire.** Le corps de chaque page a été converti
mécaniquement en JSX par `tools-port-from-html.py`, pas retapé. Le résultat est vérifié
par `tools-compare-with-main.py`, qui compare l'export statique aux fichiers HTML de
`main` — pas à l'œil.

## Voir le site

```sh
cd projects/risetime/website
npm install          # une seule fois
npm run dev          # http://localhost:3000
```

Et pour voir exactement ce qui serait publié :

```sh
npm run build        # produit out/
npm run serve        # sert out/ tel quel
```

## La preuve

```sh
npm run build && python3 tools-compare-with-main.py
```

Compare, pour les six pages, l'export `out/` aux fichiers de `main` sur : le **texte**
visible, les **images** (src et srcset), les **liens**, le `title`, la `description`, le
`canonical`, les `og:*` et le **JSON-LD**. Sort non nul au moindre écart.

État au 2026-09-24 : **conforme sur les six pages.** Le `sitemap.xml` généré est lui
aussi identique à celui écrit à la main (`public/sitemap.xml.orig-967c17d`, conservé
pour cette comparaison).

## Les écarts volontaires, et pourquoi

1. **Les URL relatives deviennent absolues.** `../alarms/` → `/alarms/`, `assets/…` →
   `/assets/…`. La destination ne change pas ; c'est ce que le routeur impose, et c'est
   ce qui permettra à un en-tête partagé d'exister.
2. **Le montage du CSS différé disparaît** : `media="print"` + `onload=` + `<noscript>`
   + `body.not-ready` + `setTimeout(…, 2000)`. Ce dispositif rendait **l'affichage
   dépendant de JavaScript** — si le JS échouait, tout restait à `opacity: 0`. Pour 16 Ko
   sur la même origine, différer le CSS ne gagnait rien et coûtait une classe de panne.
   Le petit `<style>` inline qui évite le flash blanc est conservé dans le layout.
3. **La classe du body passe sur un `<div>` englobant.** Vérifié avant de le faire : les
   quatre règles qui utilisent `.landing` et `.layout-narrow` sont des **sélecteurs
   descendants**, et aucune règle ne cible `body > *`. Le rendu est donc identique, sans
   composant client ni clignotement.
4. **`themeColor` devient l'export `viewport`** (obligatoire depuis Next 14) : il produit
   exactement les deux mêmes balises avec leurs media queries.
5. **En-têtes et pieds de page ne sont PAS factorisés.** Ils diffèrent d'une page à
   l'autre dans `main` — les factoriser aurait changé le rendu. À faire plus tard, en
   voyant les diffs un par un.

## Ce qui est déjà en place

- `output: 'export'` + `trailingSlash: true` — **sans le second, toutes les URL indexées
  bougeraient.** Toutes les routes sortent prérendues (`○ Static`).
- `/alarms` sans barre finale → **308** vers `/alarms/`. GitHub Pages sert aujourd'hui un
  **301** : sémantiquement équivalent pour Google, mais la redirection existe, ce qui est
  l'essentiel — sans elle, tout lien externe écrit sans barre mourrait en 404.
- `app/(en)/` : l'arborescence de fichiers anglaise est le **miroir exact** de celle de
  `main`. Un `ls` le prouve.
- `lib/pages.ts` : registre des pages avec un champ `updated` **saisi à la main**, et
  `LOCALES` **vide**. Ajouter une langue là fera apparaître ses pages, ses entrées de
  sitemap et les hreflang **sans autre modification de code**.
- `app/not-found.tsx` porté depuis `404.html`, en `noindex` comme lui.

## Le CSS est passé aux propriétés logiques

Fait le 2026-09-24, en anglais seul, avant toute langue RTL — c'est le moment où ça ne
coûte rien. Converti : `border-left` → `border-inline-start`, `padding-left` →
`padding-inline-start`, `left: 0` → `inset-inline-start: 0`, `text-align: left` →
`text-align: start`, les paires `margin-left/right: auto` → `margin-inline: auto`, et les
trois raccourcis à quatre valeurs (`padding: a 0 a b`) → `padding-block` + `padding-inline`.

**Une déclaration `left` subsiste volontairement** : `.steps li::before { left: 50%;
transform: translateX(-50%) }` est un **centrage**, pas une direction. Il centre
identiquement en LTR et en RTL ; le passer en `inset-inline-start` le casserait, la
translation restant physique. Un commentaire le dit dans le fichier — ne pas le
« corriger ».

Comptabilité vérifiée : 429 déclarations avant, 430 après, l'écart s'expliquant
entièrement par les deux paires fusionnées (−2) et les trois raccourcis éclatés (+3).

## Le runtime React ne part plus chez le visiteur

Mesuré avant : 9 Ko de HTML, 3 Ko de CSS, **138 Ko de JavaScript gzippé** — le script
pesait onze fois le contenu, sur un site sans la moindre interactivité.

Next n'offre **aucun réglage officiel** pour ne rien servir avec l'App Router
(`unstable_runtimeJS` n'existait que pour l'ancien routeur ; la demande est ouverte :
`vercel/next.js` discussions/49544). D'où `tools-strip-runtime.mjs`, branché sur
`npm run build`, qui retire du HTML exporté les scripts `/_next/`, la charge utile RSC et
les préchargements associés.

**Ce n'est pas un bricolage silencieux.** L'étape refuse de s'exécuter si un composant
client (`"use client"`) apparaît dans l'arbre — à ce moment-là le JavaScript devient
nécessaire, et c'est une décision à prendre, pas à subir. Elle vérifie aussi, page par
page, que le JSON-LD est intact, que le corps n'est pas vide et qu'aucune référence à un
script `/_next/` ne subsiste ; elle échoue au moindre doute.

Résultat : **8 Ko transférés** (5 de HTML + 3 de CSS) contre 150, et **zéro fichier
JavaScript**. Les seuls `<script>` restants sont les JSON-LD, qui doivent rester.

`npm run build:raw` conserve le build Next sans cette étape, pour comparer.

⚠️ Le peu de JavaScript de ce site — les trois améliorations du sélecteur de langue —
s'écrit en **script inline de quelques lignes** dans le layout, pas en composant React :
sinon on réimporte les 138 Ko. (Cette ligne parlait du *bandeau de langue* ; il est
supprimé, voir plus bas.)

## Ce qui reste à faire (et n'est pas fait)

- ⛔ Le **bandeau de langue** n'arrivera pas : il est SUPPRIMÉ (décision du porteur,
  2026-09-25 — voir plus bas). Le **sélecteur** tenant à 30 langues, les **hreflang**, le
  contenu en **Markdown par langue** et le **contrôle de retard** sont livrés.
- `_redirects` et `_headers` appartiennent à `9-30`, pas à cette branche.

## Les outils

- `tools-port-from-html.py` — rejoue le portage depuis les HTML de `main`. Utile tant que
  `main` peut recevoir des correctifs d'urgence : on rejoue, on recompare.
- `tools-compare-with-main.py` — la preuve. À lancer après chaque build.
- `tools-strip-runtime.mjs` — le retrait du runtime, lancé par `npm run build`.

## Note

`public/assets/risetime.css` a été **supprimé** : le CSS vit désormais dans
`app/globals.css`, et garder une copie figée à l'ancienne adresse aurait créé un
doublon qui diverge en silence. Rien dans le site n'y faisait référence.

## Le mécanisme multilingue (9-31, seconde moitié — 2026-09-25)

### ⟶ Deux décisions du porteur, 2026-09-25, appliquées le jour même

**1. Le bandeau de langue est SUPPRIMÉ.** Mot pour mot : *« This site is also available in
English → ça sert probablement à rien. Pour lecteur d'écran pourquoi pas. Pour les voyants.
Un menu avec un drapeau suffit. »* Il proposait sa langue à qui arrivait dans une autre ;
le sélecteur suffit. Et avec **une seule langue** il produisait une absurdité : chaque page
portait un bloc JSON annonçant « This site is also available in English → » alors qu'il n'y
avait **rien à proposer**.

Ce qui part avec lui : la phrase (`lang_banner` dans `content/en/home.md`), sa donnée (le
bloc JSON `#rt-langs`, que **seul** le script du bandeau lisait), le conteneur
`#rt-banner`, le drapeau `localStorage` qui retenait le rejet, la fonction `bannerData()`,
la règle **L10** et son cas faux, et la dispense `id="rt-langs"` des deux listes blanches.
⚠️ Le **script inline reste** : il porte `Échap`, le clic extérieur et le retour arrière,
et AC27 en exige **exactement un** par page (`L11` rougit sur zéro autant que sur deux).

**Le budget du bloc inline tombe de 1 187 à 412 octets** — mesuré par
`tools-check-langs.py`, pas estimé — et le **cliquet est regelé à 412** : geler sur le
plafond déclaré de 1 200 laisserait 788 octets se reprendre en silence. ⛔ Règle générale :
un cliquet se regèle chaque fois qu'il **descend**.

**Il ne reste AUCUNE donnée de langue inerte dans les pages.** Le sélecteur n'a jamais lu
le bloc JSON : ses entrées sortent de `selectorEntries()` **au build** et sont dans le
HTML. Les seuls `<script>` de l'export sont donc les JSON-LD et l'unique bloc inline.

**2. Le déclencheur du menu : un globe suivi de l'endonyme de la langue COURANTE**
(`◍ English ▾`, le chevron restant le marqueur natif du `<summary>`, sur l'axe de bloc).

⛔⛔ **PAS DE DRAPEAUX — et la raison est écrite pour que personne ne les repropose.** Le
porteur les proposait, le dev a argumenté, le porteur a tranché pour le globe : **un
drapeau désigne un pays, pas une langue.** Quel drapeau pour l'anglais — Royaume-Uni ou
États-Unis ? Pour le français — France, Belgique, Québec, Sénégal ? L'arabe en aurait
vingt-deux, et un Indonésien ne se reconnaît pas dans le drapeau malaisien. À trente
entrées, trente rectangles colorés sont illisibles là où trente noms se lisent et se
trient.

L'icône est un **SVG inline de 367 octets** (octetage du balisage réellement émis par le
build à une langue — et il ne coûte rien aujourd'hui, puisque sans langue il n'y a pas de
déclencheur) : ⛔ pas de fichier image, ⛔ pas de police
d'icônes, et ⛔ **pas un caractère** — les globes d'Unicode (U+1F310, U+1F30D…) ont une
présentation **emoji** par défaut, donc tombent en pictogramme coloré qui n'hérite ni de
`currentColor` ni de la taille du texte. ⛔ Aucun arc (`A`) non plus : un `<circle>`, une
`<ellipse>` et deux `<line>`, c'est-à-dire aucun drapeau `large-arc`/`sweep` à inverser
([[no-svg-rasterizer-in-this-env]] : un SVG faux s'affiche sans erreur). Vérifié en
reparsant le SVG **réellement émis** et en le rastérisant avec PIL. `aria-hidden` +
`focusable="false"` : elle décore, c'est le texte qui informe. Le dessin est symétrique en
miroir et son côté vient du flux inline ; la seule règle CSS ajoutée est
`margin-inline-end` — **aucune déclaration directionnelle physique**.

**Conséquence assumée, et signalée : `SELECTOR_INLINE_MAX` passe de 3 à 0.** Il n'y a plus
que **deux** états (`0 ⇒ rien` · `1+ ⇒ replié`) là où 9-31 §1 et **AC11** en décrivent
trois. Deux raisons : le §1 justifiait la liste à plat en disant que « la découverte passe
par le bandeau » — ce chemin n'existe plus ; et à plat il n'y a pas de `<summary>`, donc ni
globe ni endonyme courant, c'est-à-dire que la décision du porteur ne serait tenue qu'à
partir de la quatrième langue. ⚠️ Aucun AC n'a été modifié : l'écart est **signalé**, ici
et dans le rapport.

⛔ **Ce qui ne bouge pas** : `LOCALES = []` ⇒ **rien du tout**. Zéro entrée ⇒
`DisclosureNav` retourne `null` ⇒ pas de globe, pas de déclencheur, pas une balise — sans
aucune condition écrite à la main.

`LOCALES` sort de cette passe **toujours vide**, et c'est la propriété livrée : avec une
table vide, l'export ne contient **aucun sélecteur de langue, aucun `hreflang`, aucune
entrée de sitemap en langue** — non pas parce qu'une condition les masque, mais parce
qu'il n'y a rien à rendre (`DisclosureNav` retourne `null` sur liste vide).

**Chiffres RÉELS, imprimés par les outils, pas estimés :**

| Mesure | Valeur | Qui l'imprime |
|---|---|---|
| Bloc `<script>` inline, par page | **412 o** — et c'est le **cliquet**, pas les 1 200 déclarés. (1 187 o jusqu'au retrait du bandeau, le 2026-09-25 : les deux tiers du bloc étaient à lui.) | `tools-check-langs.py` (L11) |
| Blocs inline non-JSON-LD par page | **1** | idem |
| Fichiers JavaScript servis | **0** — 22 chunks orphelins supprimés | `tools-strip-runtime.mjs` |
| Charges utiles RSC `*/index.txt` | **0** — 7 fichiers, 184 Ko, supprimés | idem |
| Empreinte CSP du bloc | générée à chaque build → `out/csp-script-src.txt` | idem |

⚠️ Le coût du sélecteur à 30 entrées **n'est pas mesuré** : aucune langue n'existe. Le
chiffre entrera ici quand il y en aura une, depuis l'octetage réel — pas depuis une
arithmétique de dos d'enveloppe.

### Deux contraintes de Next découvertes en construisant le cas, pas en relisant

`node_modules/next/dist/build/index.js:1243` : en `output: 'export'`, une route dynamique
qui produit **zéro** page fait échouer le build, et Next ne distingue pas « pas de
`generateStaticParams` » de « la fonction a rendu une liste vide ». Conséquences :

1. `app/[lang]/` ne peut pas exister tant que `LOCALES` est vide. Elle est donc un
   **artefact de build**, matérialisé par `tools-lang-routes.mjs` depuis `lang-routes/`
   (versionné) et gitignorée. Une langue qui entre ne demande toujours qu'une ligne dans
   la table.
2. Même chose un cran plus bas : une langue qui n'a **que son accueil** ne produit aucun
   couple `(langue, slug)`, donc la sous-route `[slug]` n'est créée que s'il y a au moins
   une page à slug.

### L'export n'est pas reproductible au bit près, et ce n'est pas nous

Next insère dans chaque HTML un commentaire `<!--<buildId>-->` **tiré au hasard à chaque
build**. Deux builds du même source diffèrent donc toujours. Toute comparaison d'arbres
doit neutraliser ce seul jeton — constaté en comparant deux builds consécutifs, pas supposé.

### Trois régressions trouvées en revue, et ce qu'elles ont appris

1. **`out/404.html` était le stub par défaut de Next** — `<html>` sans `lang`, sans marque,
   sans lien de retour — et le build était **vert**. L'option que le §3 préférait (un
   `not-found.tsx` par groupe racine) **ne produit pas le 404 de l'export** : un `not-found`
   dans un groupe ne sert que les `notFound()` de son segment. La seconde issue du §3 est
   donc la bonne : `app/global-not-found.tsx` + `experimental.globalNotFound`. Le 404 est
   désormais **contrôlé** (`tools-check-langs.py`, §404 : `lang`, `noindex`, pied de page),
   et `out/404/` — une **URL neuve** née de `trailingSlash`, absente de `main` — est retirée.

2. **Deux faux verts de même nature** : le bloc inline retiré de *toutes* les pages, et le
   conteneur du sélecteur retiré de *toutes* les pages, laissaient L1–L13 **vertes**. Les
   règles s'accrochaient au marqueur qu'elles cherchaient.
   ⚠️ **La leçon de `L7`, poussée d'un cran, et elle vaut pour tout contrôle de ce dépôt :
   une règle qui vérifie « tous ceux qui existent sont corrects » ne dit rien quand il n'en
   existe plus aucun.** Le test à passer à chaque règle : *que verrait-elle si son objet
   avait entièrement disparu ?* L'effectif **attendu** se dérive désormais de la vérité
   (`lib/pages.ts` + `content/`), jamais de l'export.

3. **Une page sans `reviewed` était construite en production.** Le build finissait rouge,
   mais **par les contrôles en aval, pas par la construction**. Corrigé aux trois niveaux :
   `generateStaticParams` filtre sur `builtPages`, `tools-lang-routes.mjs` **refuse** une
   langue publiée dont l'accueil n'est pas relu (avec le bon message, au lieu de l'erreur
   opaque de Next), et `tools-strip-runtime.mjs` porte le **refus n°2** qu'AC22 exigeait.

## ⟶ 2026-09-26 — `tools-compare-with-main.py` est RETIRÉ

Porteur, le jour de la mise en ligne : **« on vire ce tool. »**

Il comparait chaque page exportée à sa version sur `main`, et c'est lui qui a **prouvé** que le
portage Next était une recopie et non une réécriture — conforme sur les six pages, sitemap compris.
Ce travail est fait, et il ne se refera pas.

**Ce qui le condamne :** le site n'est plus servi depuis `main`. L'outil comparerait donc à un site
fantôme — une référence que plus personne ne sert et que plus personne ne corrige. Il continuerait
à rendre du vert sans que ce vert ne veuille dire quoi que ce soit, et c'est précisément la sorte
d'outil qu'on finit par ne plus lire.

Il portait d'ailleurs déjà **18 champs dispensés** : à mesure que les pages divergeaient de `main`,
ce qu'il comparait encore se réduisait.

⚠️ **Ce qu'on perd, et il faut le savoir :** plus aucun garde ne compare la **prose** du site à une
référence. Restent `tools-check-metadata.py` (les largeurs), `tools-check-langs.py` (les règles de
langue) et `scripts/check-alt-contract.py` (les textes alternatifs contre les captures) — trois
outils qui vérifient des **propriétés**, aucun qui vérifie qu'un paragraphe n'a pas changé par
accident. C'est désormais la relecture de PR qui en tient lieu.

`public/sitemap.xml.orig-967c17d`, qui n'existait que pour cette comparaison, part avec lui.
