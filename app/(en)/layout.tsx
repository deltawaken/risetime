import '../globals.css'
import { rootMetadata, rootViewport, AntiFlash } from '../../lib/rootMeta'
import BodyPrelude from '../../components/BodyPrelude'

// 9-31 §3 — PREMIER des deux layouts racines. `app/layout.tsx` a disparu.
//
// LA CONTRAINTE, vérifiée dans le code et pas supposée : l'App Router n'offre
// AUCUNE API permettant à un layout imbriqué de modifier les attributs de <html>.
// La documentation de `layout` dit que « the root layout must define <html> and
// <body> tags », et rien d'autre ne les touche. Tant que `app/[lang]/` héritait
// d'un layout racine unique écrivant `lang="en" dir="ltr"` EN DUR, il ne pouvait
// pas produire `<html lang="fr">`.
//
// La sortie est documentée : « You can create multiple root layouts. Any layout
// without a layout.js above it is a root layout. » D'où ces deux fichiers — celui-ci
// statique, celui de `app/[lang]/` lisant `lang` et `dir` dans la table des locales.
export const metadata = rootMetadata
export const viewport = rootViewport

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head><AntiFlash /></head>
      <body>
        <BodyPrelude />
        {children}
      </body>
    </html>
  )
}
