import '../globals.css'
import { rootMetadata, rootViewport, makeRootLayout } from '../../lib/rootMeta'

// Le corps vit dans `makeRootLayout` — Next impose un fichier par groupe de
// routes racine, pas d'en recopier le contenu sept fois.
export const metadata = rootMetadata
export const viewport = rootViewport

export default makeRootLayout('it')
