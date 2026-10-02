import type { Metadata } from 'next'
import './globals.css'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { rootMetadata, rootViewport, AntiFlash } from '../lib/rootMeta'
import BodyPrelude from '../components/BodyPrelude'

// 9-31 §3 — LE 404, ET POURQUOI IL EST ICI ET PAS DANS UN GROUPE RACINE.
//
// ⛔ RECTIFICATION, constatée par un build et pas supposée — c'est exactement ce que le
// §3 demandait de vérifier ainsi. La story préférait « un `not-found.tsx` par groupe
// racine », pour ne dépendre d'aucun drapeau expérimental. **Cette option ne produit pas
// le 404 de l'export** : un `not-found.tsx` placé dans `app/(en)/` ne sert que les
// `notFound()` de CE segment ; le fichier exporté en `out/404.html` restait le STUB par
// défaut de Next (« 404: This page could not be found. », `<html>` SANS `lang`, ni
// marque, ni en-tête, ni lien de retour) — une régression franche contre le `404.html`
// de main, et le build était VERT. ⚠️ Un faux zéro se croit ([[credible-false-zeros]]).
//
// La seconde issue que le §3 nommait est donc la bonne : `app/global-not-found.tsx`,
// avec `experimental.globalNotFound` (présent dans la version installée, Next 15.5.26,
// node_modules/next/dist/server/config-schema.js:494). Ce fichier DOIT rendre un
// document HTML complet, `<html>` et `<body>` compris — d'où la coquille ci-dessous,
// identique à celle des deux layouts racines.
//
// ⛔ Il reste `noindex`, comme `404.html` l'était.
export const metadata: Metadata = {
  ...rootMetadata,
  title: 'Page not found — Risetime',
  robots: { index: false, follow: true },
}
export const viewport = rootViewport

export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr">
      <head><AntiFlash /></head>
      <body>
        <BodyPrelude />
        <div className="layout-narrow">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <SiteHeader current="" />

      <main id="main-content">
        <div className="page-header">
          <h1>Page not found</h1>
          <p className="subtitle">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        </div>
        <div className="content-main">
          <p><a href="/">Back to Risetime homepage</a></p>
        </div>
      </main>

          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
