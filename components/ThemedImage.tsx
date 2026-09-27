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
// LA FORME RETENUE — deux <picture>, et le CSS en masque un (porteur, 2026-09-27).
//
// ⚠️ ELLE REMPLACE UNE PREMIÈRE VERSION QUI PASSAIT PAR `content: url()` sur
//    l'<img>. Celle-là marchait, mais elle portait deux risques que celle-ci n'a
//    pas du tout — et c'est la raison du changement, pas le goût :
//      · ACCESSIBILITÉ. MDN avertit que le contenu généré par CSS n'entre pas dans
//        l'arbre d'accessibilité. Nos `alt` portent du contenu réel : celui du
//        héros décrit cinq alarmes ligne par ligne. Remplacer l'image par du CSS,
//        c'était risquer de casser la page pour un lecteur d'écran afin de
//        corriger une nuance de gris. Ici l'`alt` est un attribut d'un vrai <img>
//        dans le DOM, et `display: none` retire proprement l'autre de l'arbre.
//      · SUPPORT. `content` sur un élément remplacé demandait Safari 9 / Firefox
//        63, et `image-set()` dedans aurait daté la technique de 2023 (Safari 17).
//        `display: none` n'a pas de plancher.
//    On y gagne en plus le `srcset` 1x/2x DANS LES DEUX THÈMES ; l'ancienne forme
//    perdait le @2x dès que l'utilisateur forçait son thème.
//
// ⚠️ LE SEUL COÛT, ET IL EST RÉEL : deux <picture> dans le DOM, donc deux images
//    potentiellement téléchargées là où il en faut une. C'est ce que
//    `loading="lazy"` neutralise : une image sans boîte de rendu n'entre jamais
//    dans le viewport, donc n'est jamais chargée — et elle l'est au basculement,
//    quand le CSS lui rend sa boîte. 🔸 À VÉRIFIER DANS L'ONGLET RÉSEAU d'un vrai
//    navigateur, je n'en ai pas ici : si les deux partaient quand même, le site
//    doublerait le poids de ses 30 captures et il faudrait revenir en arrière.
//
// ⛔ `priority` EST DONC LE CAS QUI RESTE OUVERT : le héros ne peut pas être
//    `lazy` sans abîmer le LCP, et deux images `eager` font un fichier de trop sur
//    l'image la plus lourde de la page. Une seule par page ; à trancher en la
//    mesurant, pas en la raisonnant.

export default function ThemedImage({
  base,
  alt,
  width,
  height,
  priority = false,
}: {
  /** Le chemin SANS extension ni suffixe — « /assets/screenshots/alarm-list ».
   *  Les six fichiers s'en déduisent : `.webp`, `@2x.webp`, `.png`, et les trois
   *  mêmes en `--dark`. ⛔ C'est la seule chaîne à écrire : une convention de nom
   *  qu'on dérive ne peut pas se désynchroniser d'un thème à l'autre. */
  base: string
  alt: string
  width: number
  height: number
  /** L'image au-dessus de la ligne de flottaison. Une seule par page. */
  priority?: boolean
}) {
  /** ⚠️ Le MÊMES `alt` sur les deux. Ce n'est pas un doublon pour un lecteur
   *  d'écran : `display: none` retire l'élément de l'arbre d'accessibilité, donc
   *  il n'en est annoncé qu'un — celui qu'on voit. Et si le CSS ne s'appliquait
   *  pas du tout, la page resterait lisible avec deux images au lieu d'une, ce qui
   *  est le bon sens d'échec. */
  const img = (suffix: string) => (
    <img
      src={`${base}${suffix}.png`}
      alt={alt}
      width={width}
      height={height}
      {...(priority
        ? { loading: 'eager' as const, fetchPriority: 'high' as const }
        : { loading: 'lazy' as const, decoding: 'async' as const })}
    />
  )

  return (
    <>
      <picture className="themed-img themed-img--light">
        <source srcSet={`${base}.webp 1x, ${base}@2x.webp 2x`} type="image/webp" />
        {img('')}
      </picture>
      <picture className="themed-img themed-img--dark">
        <source
          srcSet={`${base}--dark.webp 1x, ${base}--dark@2x.webp 2x`}
          type="image/webp"
        />
        {img('--dark')}
      </picture>
    </>
  )
}
