import { bannerData } from '../lib/locales'
import { INLINE_SCRIPT } from '../lib/inlineScript'

// 9-31 §4 — les deux premiers enfants de <body>, dans CET ordre, identiques dans
// les deux layouts racines.
//
//  1. `#rt-banner`, conteneur VIDE et `hidden` — donc SANS HAUTEUR RÉSERVÉE. C'est
//     ce qui fait que l'AC6 reste vraie : JavaScript absent, la page s'affiche
//     entièrement et ce conteneur ne coûte pas un pixel.
//  2. le bloc JSON des langues, puis le script inline, immédiatement après, pour
//     qu'il s'exécute avant que le reste du corps soit analysé et ne provoque pas
//     de saut visible.
//
// Le bloc JSON est de la DONNÉE INERTE, pas du code : `tools-strip-runtime.mjs`
// retire les scripts `/_next/` et la charge utile RSC, il conserve les blocs JSON
// (il conserve déjà les JSON-LD). Les phrases ne sont pas dans le script — elles
// sont écrites par les traducteurs dans `content/<lang>/home.md`.
export default function BodyPrelude() {
  const langs = bannerData()
  return (
    <>
      <div id="rt-banner" hidden />
      <script
        id="rt-langs"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(langs) }}
      />
      <script dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT }} />
    </>
  )
}
