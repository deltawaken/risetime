import type { Metadata } from 'next'

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

      <header className="site-header" role="banner">
        <nav aria-label="Main navigation">
          <a href="/" className="wordmark">Risetime</a>
          <a href="/alarms/">Alarms</a>
          <a href="/timers/">Timers</a>
          <a href="/privacy/">Privacy</a>
        </nav>
      </header>

      <main id="main-content">
        <div className="page-header">
          <h1>Page not found</h1>
          <p className="subtitle">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        </div>
        <div className="content-main">
          <p><a href="/">Back to Risetime homepage</a></p>
        </div>
      </main>

      <footer className="site-footer" role="contentinfo">
        <p>Risetime &middot; A. Deltawaken</p>
        <nav aria-label="Footer navigation">
          <a href="/">Home</a>
          &middot;
          <a href="/alarms/">Alarms</a>
          &middot;
          <a href="/timers/">Timers</a>
          &middot;
          <a href="/privacy/">Privacy</a>
        </nav>
      </footer>
    </div>
  )
}
