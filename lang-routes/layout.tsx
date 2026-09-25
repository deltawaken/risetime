import '@/app/globals.css'
import { rootMetadata, rootViewport, AntiFlash } from '@/lib/rootMeta'
import BodyPrelude from '@/components/BodyPrelude'
import { dirOf } from '@/lib/locales'

// 9-31 §3 — SECOND layout racine. Voir app/(en)/layout.tsx pour la contrainte qui
// impose qu'ils soient deux : aucune API ne permet à un layout imbriqué de changer
// `lang` et `dir` sur <html>.
//
// Ici `lang` et `dir` sont LUS DANS LA TABLE DES LOCALES (`content/<lang>/home.md`,
// clés `lang_endonym` / `lang_dir`), jamais écrits en dur. C'est ce qui rend le RTL
// gratuit le jour où l'arabe entre : une ligne dans `LOCALES`, un dossier, rien ici.
export const metadata = rootMetadata
export const viewport = rootViewport

export default async function LangRootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return (
    <html lang={lang} dir={dirOf(lang)}>
      <head><AntiFlash /></head>
      <body>
        <BodyPrelude />
        {children}
      </body>
    </html>
  )
}
