import '../globals.css'
import { rootMetadata, rootViewport, AntiFlash } from '../../lib/rootMeta'
import BodyPrelude from '../../components/BodyPrelude'

// LE LAYOUT RACINE FRANÇAIS — troisième du site, et pour la raison que le layout
// anglais explique déjà : l'App Router n'offre AUCUNE API permettant à un layout
// imbriqué de modifier les attributs de <html>. Une langue à pages statiques a
// donc besoin du sien, sans quoi ses pages sortiraient en `lang="en"`.
//
// ⛔ Ne pas le factoriser avec `(en)` par un composant partagé qui recevrait la
// langue : ce sont les attributs de <html> qui changent, et c'est précisément ce
// qu'un layout imbriqué ne peut pas faire. La duplication est ici la CONSÉQUENCE
// d'une contrainte du framework, pas un oubli.
export const metadata = rootMetadata
export const viewport = rootViewport

export default function FrRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr">
      <head><AntiFlash /></head>
      <body>
        <BodyPrelude />
        {children}
      </body>
    </html>
  )
}
