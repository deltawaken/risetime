import BodyPrelude from '../components/BodyPrelude'
import type { Metadata, Viewport } from 'next'

// 9-31 §3 — ce que les layouts racines partagent. Ils sont SEPT depuis le
// 2026-09-27 (un par langue à pages statiques) et ne peuvent pas partager un
// layout : un layout au-dessus d'eux redeviendrait LE layout racine unique, et
// `<html lang>` repasserait en dur. Ils partagent donc des valeurs — et, depuis
// `makeRootLayout` plus bas, leur corps entier.
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

/** LE CORPS D'UN LAYOUT RACINE, ÉCRIT UNE FOIS.
 *
 *  ⛔ Next impose un FICHIER de layout par groupe de routes racine : `app/(fr)/`,
 *  `app/(de)/`… en ont chacun un, et aucun layout ne peut les surplomber — celui-là
 *  redeviendrait le layout racine unique, et `<html lang>` repasserait en dur.
 *  C'est une contrainte du framework, pas un choix.
 *
 *  ⚠️ Mais la contrainte porte sur le FICHIER, pas sur son contenu. Sept copies
 *  d'un même corps qui ne différaient que par `lang="xx"` ont existé une soirée :
 *  chaque fichier fait désormais quatre lignes et appelle ceci. Une correction du
 *  `<head>` ou du `<body>` se fait une fois, au lieu de sept fois dont six oubliées.
 *
 *  `dir` reste un paramètre : l'arabe et l'hébreu sont au programme, et c'est
 *  l'autre attribut de `<html>` qu'un layout imbriqué ne saurait pas poser. */
export function makeRootLayout(lang: string, dir: 'ltr' | 'rtl' = 'ltr') {
  return function RootLayout({ children }: { children: React.ReactNode }) {
  /* ⛔ `suppressHydrationWarning` ne masque pas un bug : il décrit une intention.
     Notre bloc inline pose `data-js` et `data-theme` sur <html> AVANT toute
     hydratation — c'est tout l'intérêt, l'anti-flash dépend de ce qu'il s'exécute
     en premier. React compare alors un HTML serveur sans ces attributs à un DOM
     client qui les porte, et crie.
     ⚠️ Il ne crie QU'EN DEV : l'export ne contient aucun React côté client
        (tools-strip-runtime), donc il n'y a pas d'hydratation en production.
        L'avertissement était du bruit pur sur le seul serveur qu'un relecteur
        regarde.
     ⭐ L'attribut ne porte QUE sur <html> et ses attributs : il ne couvre pas les
        enfants, donc il ne peut pas cacher un vrai écart de rendu dans les pages. */
    return (
      <html lang={lang} dir={dir} suppressHydrationWarning>
        <head><AntiFlash /></head>
        <body>
          <BodyPrelude />
          {children}
        </body>
      </html>
    )
  }
}
