import type { Metadata } from 'next'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

// Porté depuis 404.html (commit 967c17d) — recopie, pas réécriture.
// Comme 404.html, cette page ne doit pas être indexée.
export const metadata: Metadata = {
  title: 'Page not found — Risetime',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
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
  )
}
