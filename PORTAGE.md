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

⚠️ Le jour où le **bandeau de langue** arrivera, il s'écrira en **script inline de
quelques lignes** dans le layout — pas en composant React, sinon on réimporte les 138 Ko
pour afficher une phrase.

## Ce qui reste à faire (et n'est pas fait)

- Le **bandeau de langue**, le **sélecteur** tenant à 30 langues, les **hreflang**, le
  contenu en **Markdown par langue** et le **contrôle de retard** : rien de tout ça n'est
  commencé.
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
