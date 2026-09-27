import type { CSSProperties } from 'react'

// UNE IMAGE QUI SUIT LE THÈME — y compris quand l'utilisateur l'a FORCÉ.
// 2026-09-27, porteur : « le thème ne change pas avec le menu theme ».
//
// ⛔ LE DÉFAUT, ET POURQUOI IL N'EST PAS RÉPARABLE DANS LE <picture>.
// `<source media="(prefers-color-scheme: dark)">` est du HTML : le navigateur
// l'évalue contre LE SYSTÈME. Notre sélecteur de thème, lui, pose `data-theme`
// sur `<html>`. Aucune règle CSS — ni `@media`, ni `@container style()` — ne peut
// atteindre un attribut de média HTML, et `var()` est interdit dans la condition
// d'une `@media` (elle est évaluée avant que la cascade existe). Le basculement
// changeait donc les couleurs de la page et jamais les captures.
//
// LA RÉPARATION, en deux moitiés qui ne se marchent pas dessus :
//   1. le <picture> reste EXACTEMENT celui d'avant. Tant que l'utilisateur n'a
//      rien forcé, c'est lui qui décide, il choisit le WebP et la densité, et il
//      ne télécharge qu'un fichier. Le cas courant ne coûte donc rien.
//   2. les deux URL sont posées en variables sur l'<img>, et globals.css ne
//      reprend la main QUE dans les deux cas de désaccord (forcé clair sur
//      système sombre, et l'inverse). Un seul fichier de plus, et seulement pour
//      qui a touché au sélecteur.
//
// ⚠️ `url()` ET PAS `image-set()`, et c'est un arbitrage de support vérifié sur
// les données de compatibilité de MDN le 2026-09-27, pas une préférence :
//   · `content` sur un élément remplacé — Chrome 28 · Firefox 63 · Safari 9
//   · `image-set()` dans `content`       — Chrome 113 · Firefox 89 · Safari 17
// Le second daterait la technique de 2023. Ce qu'on perd avec `url()` est le @2x
// DANS LE SEUL CAS DE DÉSACCORD : une capture en 1× pour qui force son thème
// contre son système. Un défaut visible et réparable, contre un `content` ignoré
// qui afficherait l'image du MAUVAIS thème sans que personne le signale.
//
// ⚠️ RESTE À PROUVER, ET C'EST CE QUI DÉCIDE SI ON GÉNÉRALISE : MDN avertit que
// le contenu généré n'entre pas dans l'arbre d'accessibilité. Nos `alt` sont
// longs et portent du contenu réel. Si remplacer l'image fait tomber l'`alt`, on
// casserait la page pour un lecteur d'écran afin de corriger une nuance de gris —
// et la technique serait morte. ⛔ NE PAS convertir les 29 autres <picture> avant
// d'avoir lu CELUI-CI au lecteur d'écran.

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
  return (
    <picture>
      <source
        srcSet={`${base}--dark.webp 1x, ${base}--dark@2x.webp 2x`}
        media="(prefers-color-scheme: dark)"
        type="image/webp"
      />
      <source srcSet={`${base}.webp 1x, ${base}@2x.webp 2x`} type="image/webp" />
      <source srcSet={`${base}--dark.png`} media="(prefers-color-scheme: dark)" />
      <img
        src={`${base}.png`}
        alt={alt}
        width={width}
        height={height}
        className="themed-img"
        /* Les deux URL que le CSS relira. En WebP : `content` ne sert que dans le
           cas de désaccord, et rien n'oblige à y retomber sur le PNG. */
        style={
          {
            '--img-light': `url(${base}.webp)`,
            '--img-dark': `url(${base}--dark.webp)`,
          } as CSSProperties
        }
        {...(priority
          ? { loading: 'eager' as const, fetchPriority: 'high' as const }
          : { loading: 'lazy' as const, decoding: 'async' as const })}
      />
    </picture>
  )
}
