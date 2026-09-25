import type { Metadata, Viewport } from 'next'

// 9-31 §3 — ce que les DEUX layouts racines partagent. Ils ne peuvent pas partager
// un layout (un layout au-dessus d'eux redeviendrait LE layout racine unique, et
// `<html lang>` repasserait en dur) : ils partagent donc des valeurs.
export const rootMetadata: Metadata = {
  metadataBase: new URL('https://risetime.app'),
  icons: {
    icon: [
      { url: '/assets/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/favicon.ico', sizes: '32x32' },
    ],
    apple: '/assets/apple-touch-icon.png',
  },
}

export const rootViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f5' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1117' },
  ],
}

/** Évite le flash blanc avant que la feuille de style ne s'applique. C'est le seul
 *  reste du montage CSS d'origine : la règle `body.not-ready > * { opacity: 0 }`
 *  est partie avec le chargement différé, qui rendait l'AFFICHAGE dépendant de JS. */
export const AntiFlash = () => (
  <style
    dangerouslySetInnerHTML={{
      __html:
        'html{background:var(--bg,#faf8f5)}' +
        '@media (prefers-color-scheme:dark){html{--bg:#0f1117}}',
    }}
  />
)
