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

## Ce qui reste à faire (et n'est pas fait)

- **Le CSS est encore en propriétés physiques** : 24 déclarations `margin-left`, `left:`,
  `border-left`, `text-align: left`… à passer en `margin-inline-start`, `inset-inline`,
  `text-align: start`. À faire **en anglais seul**, avant toute langue RTL.
- **103 Ko de JavaScript** sont servis par Next alors que le site n'en a aucun besoin.
  Les pages s'affichent sans (le contenu est dans le HTML), mais c'est une régression
  face à l'original qui n'en chargeait pas. À réduire.
- Le **bandeau de langue**, le **sélecteur** tenant à 30 langues, les **hreflang**, le
  contenu en **Markdown par langue** et le **contrôle de retard** : rien de tout ça n'est
  commencé.
- `_redirects` et `_headers` appartiennent à `9-30`, pas à cette branche.

## Les outils

- `tools-port-from-html.py` — rejoue le portage depuis les HTML de `main`. Utile tant que
  `main` peut recevoir des correctifs d'urgence : on rejoue, on recompare.
- `tools-compare-with-main.py` — la preuve. À lancer après chaque build.
