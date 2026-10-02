import '../globals.css'
import { rootMetadata, rootViewport, makeRootLayout } from '../../lib/rootMeta'

// O corpo vive em `makeRootLayout` — o Next exige um arquivo por grupo de
// rotas raiz, sem repetir o conteúdo sete vezes.
export const metadata = rootMetadata
export const viewport = rootViewport

export default makeRootLayout('pt')
