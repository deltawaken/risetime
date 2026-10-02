# Budget des métadonnées du site — en pixels, pas en caractères

> Story 9-21. Ce fichier vit avec le site parce qu'il survit à la migration :
> il ne dit rien de Next, de GitHub Pages ni de Cloudflare.
> L'instrument qui l'applique est `tools-check-metadata.py`.

## La règle des 60 caractères est fausse, et on l'a mesurée

Google ne tronque pas à un nombre de caractères : il tronque à la **largeur** du conteneur de
résultat, ~600 px. Appliquée à ce site, la règle des 60 caractères s'est trompée **dans les deux
sens** — un faux positif sur la page la plus visible (`/`, 64 caractères mais 582 px : il passe),
et elle a désigné la mauvaise page. La règle des 155 caractères pour les descriptions a produit
**cinq faux positifs sur six**, confirmés une seconde fois le 2026-09-24 sur des textes réécrits
depuis.

**Ne réintroduire aucun seuil en caractères, nulle part, même « en garde-fou ».**

## Les deux budgets

| | Titre | Description |
|---|---|---|
| **Dur — toutes langues** | **600 px** à 20 px | **2 lignes** à 14 px dans 600 px |
| **Anglais — cible d'écriture** | **520 px** | **1,74 ligne** |

- Le **budget dur** est une contrainte *physique de rendu*. Il est identique pour les sept
  langues parce que c'est la même colonne qui tronque — pas parce qu'une règle administrative
  le dit. (C'est l'inverse exact du budget ASO de la fiche Play, qui est une limite
  administrative **en caractères**, dure, refusée au collage par la Console. Voir 9-20.
  **Ce fichier ne s'applique pas à `docs/play-store-listing.*.txt`**, et réciproquement.)
- Le **budget anglais** est plus serré parce que l'anglais est la langue *source* : ce qui est
  écrit ici sera traduit, et traduire allonge.

### Unité : la « ligne fractionnaire »

La description est mesurée en lignes **fractionnaires** : les lignes pleines après retour à la
ligne simulé, plus la fraction de colonne qu'occupe la dernière. Un compte entier ne
distinguerait pas une description qui remplit 1,05 ligne d'une qui en remplit 1,98 — or c'est
exactement la marge qu'on veut surveiller. `/` est aujourd'hui à **0,01 ligne** de son budget.

## D'où vient le ×1,146 — la mesure, pas une estimation

**Corpus.** Les six langues livrées de l'app ont leurs `.po` dans
`android-app/app/src/main/assets/i18n#lang_*/` (de, es, fr, it, nl, pl). Chaque `msgid` y est la
chaîne **anglaise** et chaque `msgstr` sa traduction : un corpus aligné. Largeur de chaque
membre mesurée à **20 px en Liberation Sans**, rapport traduit/anglais, découpé par longueur de
la chaîne anglaise.

| Longueur de la chaîne anglaise | n | médiane | p75 | p90 | p95 | max |
|---|---|---|---|---|---|---|
| 20–39 caractères | 660 | 1,173 | 1,340 | 1,536 | 1,665 | 2,045 |
| 40–59 caractères | 192 | 1,170 | 1,280 | 1,388 | 1,501 | 1,725 |
| **60 caractères et plus** | **426** | **1,146** | **1,233** | **1,296** | 1,356 | 1,753 |

Par langue, sur les chaînes anglaises de 40 caractères et plus (n = 103 chacune) :
**de 1,222** (la plus haute), fr 1,181, it 1,143, es 1,124, pl 1,122, **nl 1,101** (la plus
basse). L'allemand est bien le pire — **mesuré**, pas supposé.

Un `<title>` fait 45 à 72 caractères : la bande utile est celle des chaînes longues, facteur
médian **×1,146**.

- Titre : 600 / 1,146 = 523,6 → **520 px**, arrondi vers le bas.
- Description : 2 / 1,146 = 1,745 → **1,74 ligne** (soit un déroulé d'au plus 1 044 px sur les
  1 200 px qu'offrent deux lignes).

### Ce que ce budget promet, et ce qu'il ne promet pas

Il promet qu'**une traduction sur deux** d'un titre anglais conforme tiendra encore dans les
600 px. **Il ne promet rien au-delà** : à p90 (×1,296) un titre anglais de 520 px ressort à
674 px et se fait tronquer.

**Le budget anglais est bloquant — et il ne prédit pourtant rien.** L'outil sort en code ≠ 0
dessus, au même titre que le budget dur : une cible qu'on peut manquer sans conséquence n'est
pas une cible, et 520 px est le seul moment où l'on peut encore agir, puisque la traduction
n'existe pas au moment où le titre anglais s'écrit. Mais ce que ce dépassement *signifie* est
plus faible qu'un dépassement dur : le dur dit « cette page est tronquée aujourd'hui », l'anglais
dit « une traduction sur deux de cette page sera tronquée demain ». Le rapport les distingue
donc toujours (`dur` / `anglais`), et **le verdict définitif reste la mesure des 600 px,
appliquée à chaque langue** quand les traductions existeront.

### Rejet motivé d'un budget à 486 px — écrit pour ne pas être refait

Caler le budget anglais sur p75 (×1,233 → 486 px) **recalerait cinq des six titres actuels**.
Un budget que presque rien ne respecte ne fait pas écrire mieux : il apprend à ignorer l'outil.
**Écarté.** Ne pas rouvrir sans un corpus neuf.

### Le piège allemand : les composés insécables

Un mot composé allemand long **ne se coupe pas**. Il peut donc faire déborder une ligne alors
même que le compte total tient dans le budget. Le simulateur de retour à la ligne de
`tools-check-metadata.py` reproduit ce comportement : un mot plus large que la colonne occupe
sa ligne entière.

## Réserves — ce que cette mesure ne vaut pas

- **Liberation Sans est métriquement compatible Arial** (mêmes chasses) : les largeurs sont les
  bonnes. Si une autre police était chargée, tous les chiffres seraient faux *en silence* —
  d'où le témoin de police de l'outil (« The quick brown fox… » = 395,8 px ± 0,5).
- **600 px / 20 px / 14 px / clamp 2 est la convention _desktop_.** Le mobile est plus étroit et
  rend parfois trois lignes. Le contrôle mesure le cas desktop, le plus contraint sur le titre.
- **Google réécrit** titres et descriptions de sa propre initiative, souvent, quelle que soit
  leur longueur. **Aucun contrôle ne peut promettre l'absence de troncature** ; celui-ci prouve
  seulement qu'on tient dans le conteneur standard.

## Le relevé — daté, et sa source nommée

**Source : l'export `out/` produit par `npm run build`, branche `site/nextjs`, commit `165b019`
(plus les modifications de 9-21 en cours d'arbre). Mesuré le 2026-09-24.**

> Un tableau **non daté** est précisément ce qui a laissé le « 609 px » de
> `/golden-hour-alarm/` survivre neuf jours après être devenu faux — la page avait entretemps
> gagné 60 px, à 669 px, sans que personne ne le voie. **Tout tableau ajouté ici porte sa date
> et son commit, ou il ne sert à rien.**

| Page | Titre car. | Titre px | vs 600 (dur) | vs 520 (anglais) | Desc. car. | Desc. lignes | vs 2 / 1,74 |
|---|---|---|---|---|---|---|---|
| `/` | 64 | 582,4 | ✅ | ❌ +62,4 | 173 | 1,73 | ✅ (0,01 de marge) |
| `/alarms/` | 58 | 531,1 | ✅ | ❌ +11,1 | 149 | 1,51 | ✅ |
| `/golden-hour-alarm/` | 72 | **668,9** | ❌ **+68,9** | ❌ +148,9 | 135 | 1,32 | ✅ |
| `/circadian-rhythm-alarm/` | 55 | 507,6 | ✅ | ✅ | 141 | 1,47 | ✅ |
| `/sunrise-meditation-alarm/` | 54 | 487,7 | ✅ | ✅ | 155 | 1,51 | ✅ |
| `/timers/` | 55 | 525,5 | ✅ | ❌ +5,5 | 155 | 1,52 | ✅ |
| `/privacy/` | 45 | 419,0 | ✅ | ✅ | 134 | 1,38 | ✅ |

**Un dépassement dur, quatre du budget anglais, zéro description en dépassement.**

`/timers/` complète le relevé de la story : sa réécriture (9-24) a été posée après la rédaction
de 9-21, et elle passe le contrôle **comme les autres, sans régime particulier**.

**Aucun de ces libellés n'est réécrit par 9-21.** Ces titres portent le positionnement —
substitution à l'app Horloge, usages nommés à égalité, aucun nom religieux. Leur réécriture est
un arbitrage de marque, page par page, avec le porteur. Les quatre dépassements sont **gelés**
dans la table `WAIVED` de `tools-check-metadata.py` : visibles à chaque build, non bloquants,
mais **ils ne peuvent plus empirer** — c'est ce qui manquait quand 609 px est devenu 669 px.
Le gel **se resserre aussi** : si une valeur dispensée s'améliore sans repasser sous le budget,
l'outil échoue en demandant d'abaisser `frozen`, pour que le terrain gagné ne se reperde pas en
silence. La table ne peut que rétrécir, et toujours par une main humaine.

> **Un dépassement dispensé reste un dépassement.** La ligne de verdict le compte comme tel,
> avec sa part dispensée entre parenthèses, et ne dit jamais « dans les budgets » tant qu'il en
> reste un : elle dit « aucune régression ». Elle a menti une fois, en imprimant
> « ✓ métadonnées dans les budgets » alors que `/golden-hour-alarm/` était à +68,9 px du budget
> dur. Un faux positif se voit ; un faux zéro se croit.

## Le schéma d'URL des langues : `/fr/…`, tranché

**Décision : sous-répertoire par langue sur le domaine unique — `risetime.app/fr/alarms/`.**
Aucune URL n'est créée par 9-21 ; c'est la décision, écrite, pour ne pas la refaire.

- **Identique en statique et sur le routage i18n de Next.** Un sous-répertoire est un chemin :
  il sort d'un export statique comme d'un serveur, sans configuration d'hébergeur. **Un
  sous-domaine ne fait pas ça** — il demande un enregistrement DNS, un certificat et une
  configuration par langue, chez chaque hébergeur, à chaque migration.
- **Domaine unique pour l'autorité.** Les liens entrants de toutes les langues créditent le même
  domaine. Un sous-domaine repart à zéro.
- **L'anglais reste à la racine** (`/alarms/`), pas `/en/alarms/` : les URL publiées ne bougent
  pas, donc aucune redirection à écrire, donc aucune à oublier.
- Le registre `lib/pages.ts` porte déjà `LOCALES`, vide : **ajouter une langue y est additif**.

**Ce qui reste ouvert** : rien dans le choix d'URL. Ce qui bloque la traduction, c'est l'étape
de build et la relecture par langue (une langue = une PR relue sur preview), pas le schéma.

## L'instrument

`tools-check-metadata.py` — lancé seul par `npm run check:metadata` (ou `npm run site:check`
depuis le dépôt parent), et **automatiquement à chaque `npm run build`**, après
`tools-strip-runtime.mjs`.

**Dépendances réelles** : python3, Pillow, et une police métriquement compatible Arial — rien
d'autre n'est requis. `fc-match` (fontconfig) sert à trouver la police s'il est présent, et une
liste de chemins connus prend le relais sinon ; `git` sert à vérifier les `since` des exemptions
et son absence dégrade en **avertissement**, pas en refus. Aucun fichier de configuration Next,
GitHub Pages ou Cloudflare n'est lu.

`--no-waivers` (alias `--strict`) rejoue le contrôle **en ignorant la table d'exemptions** :
c'est ainsi qu'on reproduit le relevé de référence ci-dessus sans éditer le code. Une preuve
qu'on ne peut rejouer qu'en modifiant l'outil n'est pas une preuve.

Il **refuse de s'exécuter** plutôt que d'imprimer des chiffres faux : Pillow absent, police non
compatible Arial, témoin de police faux, `out/` ou `out/sitemap.xml` absent, page sans `<title>`
ou sans `description`, désaccord entre le sitemap et les fichiers exportés (**dans les deux
sens**).

Sa liste de pages vient de `out/sitemap.xml`, généré depuis `PAGES` de `lib/pages.ts` : **une
page ajoutée au registre est contrôlée sans qu'on touche à l'outil.**
