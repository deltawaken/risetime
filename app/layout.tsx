import type { Metadata, Viewport } from 'next'
import './globals.css'

// 9-31 — la coquille commune. Portée depuis le <head> des pages HTML de main
// (commit 967c17d). Deux écarts volontaires, tous deux documentés dans la story :
//
//  1. Le CSS n'est plus chargé en différé (media="print" + onload + body.not-ready
//     + setTimeout de repli). Ce montage rendait l'AFFICHAGE dépendant de
//     JavaScript : si le JS échouait, tout restait à opacity 0. Pour 16 Ko sur la
//     même origine, le différé ne gagnait rien et coûtait une classe de panne.
//  2. themeColor n'est plus une balise <meta> écrite à la main : depuis Next 14
//     c'est l'export `viewport` ci-dessous, qui produit exactement les deux mêmes
//     balises avec leurs media queries.

export const metadata: Metadata = {
  metadataBase: new URL('https://risetime.app'),
  icons: {
    icon: [
      { url: '/assets/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/favicon.ico', sizes: '32x32' },
    ],
    apple: '/assets/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f5' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1117' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Évite le flash blanc avant que la feuille de style ne s'applique.
            C'est la seule partie du <style> inline d'origine qui subsiste :
            la règle `body.not-ready > * { opacity: 0 }` disparaît avec le
            chargement différé. */}
        <style
          dangerouslySetInnerHTML={{
            __html:
              'html{background:var(--bg,#faf8f5)}' +
              '@media (prefers-color-scheme:dark){html{--bg:#0f1117}}',
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
