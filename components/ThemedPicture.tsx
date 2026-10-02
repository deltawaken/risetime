import type { ImgHTMLAttributes } from 'react'

// UNE IMAGE QUI SUIT LE THÈME — y compris quand l'utilisateur l'a FORCÉ.
// 2026-09-27, porteur : « le thème ne change pas avec le menu theme ».
//
// ⛔ LE DÉFAUT, ET POURQUOI IL N'EST PAS RÉPARABLE DANS UN SEUL <picture>.
// `<source media="(prefers-color-scheme: dark)">` est du HTML : le navigateur
// l'évalue contre LE SYSTÈME. Notre sélecteur de thème, lui, pose `data-theme`
// sur `<html>`. Aucune règle CSS — ni `@media`, ni `@container style()` — ne peut
// atteindre un attribut de média HTML, et `var()` est interdit dans la condition
// d'une `@media` (elle est évaluée avant que la cascade existe). Le basculement
// changeait donc les couleurs de la page, et jamais les captures.
//
// LA FORME — deux <picture>, et le CSS en masque un (porteur, 2026-09-27).
// Elle remplace une première version qui passait par `content: url()` sur l'<img>,
// et le changement porte sur deux risques réels, pas sur le goût :
//   · ACCESSIBILITÉ. MDN avertit que le contenu généré par CSS n'entre pas dans
//     l'arbre d'accessibilité. Nos `alt` portent du contenu réel — celui du héros
//     décrit cinq alarmes. Ici l'`alt` est l'attribut d'un vrai <img> du DOM, et
//     `display: none` retire proprement l'autre de l'arbre : deux `alt` dans la
//     page, un seul annoncé.
//   · SUPPORT. `content` sur un élément remplacé exigeait Safari 9 / Firefox 63,
//     et `image-set()` dedans aurait daté la technique de 2023 (Safari 17).
//     `display: none` n'a pas de plancher. On y gagne en plus le srcset 1x/2x DANS
//     LES DEUX THÈMES, que l'ancienne forme perdait dès qu'on forçait le thème.
//
// ⚠️ LE COÛT, ET IL RESTE À MESURER : deux <picture> dans le DOM, donc deux images
//    potentiellement téléchargées là où il en faut une. `loading="lazy"` devrait le
//    neutraliser — une image sans boîte de rendu n'entre jamais dans le viewport,
//    donc n'est jamais chargée, et elle part au basculement quand le CSS lui rend
//    sa boîte. 🔸 À LIRE DANS L'ONGLET RÉSEAU : si les deux partent, le site double
//    le poids de ses 30 captures et il faut revenir en arrière.
// ⛔ Le cas `loading="eager"` (le héros, un par page) part forcément avec DEUX
//    images : il ne peut pas être lazy sans abîmer le LCP. À trancher en mesurant.

/** ⭐ L'API est celle d'un `<img>` ORDINAIRE (porteur, 2026-09-27) — `alt`,
 *  `width`, `height`, `loading`, `className`, tout passe tel quel. Seules les deux
 *  propriétés qui désignent un FICHIER sont dédoublées, puisque c'est exactement
 *  ce qui dépend du thème :
 *
 *      src     →  lightSrc     +  darkSrc
 *      srcSet  →  lightSrcSet  +  darkSrcSet
 *
 *  ⛔ Aucune convention de nom n'est dérivée ici. Une version antérieure prenait un
 *     `base` et fabriquait les six chemins en y collant `--dark`, `@2x` et `.webp` :
 *     c'était plus court à écrire, et ça n'acceptait QUE nos captures. Un schéma,
 *     une icône ou une bannière dont les fichiers ne s'appellent pas ainsi n'avaient
 *     aucun moyen d'entrer. Le composant est agnostique, donc les chemins s'écrivent. */
type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  /** Le chemin du fichier SANS extension ni suffixe de densité — les trois
   *  variantes s'en déduisent : `.png`, `.webp`, `@2x.webp`.
   *  ⛔ DEUX bases, et pas une seule dont on dériverait la sombre : une version
   *     antérieure collait `--dark` à la base claire, et n'acceptait donc QUE nos
   *     captures. Une bannière ou un schéma nommés autrement n'avaient aucun moyen
   *     d'entrer. Les deux thèmes s'écrivent, la convention de nom ne se devine pas. */
  lightBase: string
  darkBase: string
  alt: string
}

/** Les trois fichiers d'une base. ⚠️ Cette convention d'extensions est la SEULE
 *  que le composant suppose encore, et elle est vérifiée au build : `tools-check-
 *  assets.py` refuse une image référencée dont un fichier manque. Sans ce
 *  contrôle, un `@2x.webp` absent ne casserait rien de visible — le navigateur
 *  retomberait en silence sur une autre densité, et personne ne le saurait. */
const srcSetOf = (base: string) => `${base}.webp 1x, ${base}@2x.webp 2x`

export default function ThemedPicture({
  lightBase,
  darkBase,
  ...imgProps
}: Props) {
  /** ⚠️ Le MÊME `alt` sur les deux, et ce n'est pas un doublon pour un lecteur
   *  d'écran : `display: none` retire l'élément de l'arbre d'accessibilité, donc il
   *  n'en est annoncé qu'un — celui qu'on voit. Et si le CSS ne s'appliquait pas du
   *  tout, la page resterait lisible avec deux images au lieu d'une : c'est le bon
   *  sens d'échec. */
  const one = (theme: 'light' | 'dark', base: string) => (
    <picture className={`themed-img themed-img--${theme}`}>
      <source srcSet={srcSetOf(base)} type="image/webp" />
      {/* ⭐ `lazy` PAR DÉFAUT (porteur, 2026-09-27), et c'est ce qui rend la forme
          à deux <picture> gratuite : l'image masquée n'a pas de boîte de rendu,
          n'entre donc jamais dans le viewport, et n'est pas chargée — puis elle
          part au basculement, quand le CSS lui rend sa boîte.
          ⚠️ AVANT le spread, jamais après : un appelant qui écrit `loading="eager"`
             doit gagner. C'est le cas du seul héros de chaque page, qui ne peut pas
             être lazy sans abîmer le LCP — et qui part donc avec DEUX images. */}
      <img src={`${base}.png`} loading="lazy" decoding="async" {...imgProps} />
    </picture>
  )

  return (
    <>
      {one('light', lightBase)}
      {one('dark', darkBase)}
    </>
  )
}
