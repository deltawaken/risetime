import type { Metadata } from 'next'
import SiteHeader from '../../../components/SiteHeader'
import SiteFooter from '../../../components/SiteFooter'

// Porté depuis privacy/index.html (commit 967c17d) — recopie, pas réécriture.
// Voir le rapport de portage : references/nextjs-port-report.md

export const metadata: Metadata = {
  title: "Privacy Policy — Risetime Sunrise Alarm Clock",
  description: "Privacy Policy for Risetime, the sunrise alarm clock app for Android. Risetime does not collect, transmit, or share any personal data.",
  alternates: { canonical: "/privacy/" },
}

export default function PrivacyPage() {
  return (
    <div className="layout-narrow">
      <a href="#main-content" className="skip-link">Skip to main content</a>

        <SiteHeader current="/privacy/" />

        <div className="page-header">
          <h1>Privacy Policy</h1>
          <p className="meta">Effective date: 2026-09-13 &middot; Publisher: A. Deltawaken</p>
        </div>

        <main id="main-content" className="content-main">

          <div className="highlight-box">
            <p>Risetime does not collect, transmit, or share any personal data. Your information never leaves your device.</p>
          </div>

          <section aria-labelledby="section-not-do">
            <h2 id="section-not-do">What Risetime Does Not Do</h2>
            <ul>
              <li>Does not collect any personal data</li>
              <li>Does not connect to the internet</li>
              <li>Does not transmit your location to any server</li>
              <li>Does not use analytics, crash reporting, or telemetry</li>
              <li>Does not contain advertisements</li>
              <li>Does not track you across apps or websites</li>
              <li>Does not share any data with third parties</li>
            </ul>
          </section>

          <section aria-labelledby="section-local-data">
            <h2 id="section-local-data">Data Stored Locally on Your Device</h2>
            <p>Risetime stores the following data <strong>exclusively on your device</strong>, never transmitted:</p>
            <ul>
              <li><strong>Alarm configuration</strong> — your alarm times, labels, recurrence settings, and anchor types (e.g. sunrise, sunset). Stored in a local Room database.</li>
              <li><strong>Location</strong> — the city or GPS coordinates you set for celestial calculations (sunrise and sunset times). Used only for local computation. Never transmitted.</li>
              <li><strong>App preferences</strong> — settings such as your subscription status and app configuration. Stored in local DataStore.</li>
            </ul>
            <p>All data is removed when you uninstall the app.</p>
          </section>

          <section aria-labelledby="section-location">
            <h2 id="section-location">Location Permission</h2>
            <p>Risetime requests <strong>coarse location permission</strong> (<code>ACCESS_COARSE_LOCATION</code>) solely to calculate local sunrise and sunset times. Your location is processed on-device by an ephemeris engine and is never sent to any external service or server.</p>
            <p>You may also manually set your city in Settings, in which case GPS is not used.</p>
          </section>

          <section aria-labelledby="section-internet">
            <h2 id="section-internet">Internet Permission</h2>
            <p>Risetime does <strong>not</strong> declare the <code>INTERNET</code> permission and makes no network requests. The app operates fully offline.</p>
            <p>The optional in-app subscription uses Google Play Billing, which communicates with Google Play Services via interprocess communication (IPC) on your device — not via a network call made by Risetime. This IPC call is governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google's Privacy Policy</a>.</p>
          </section>

          <section aria-labelledby="section-subscriptions">
            <h2 id="section-subscriptions">In-App Subscriptions</h2>
            <p>Risetime offers an optional "Risetime Supporter" subscription. Subscription purchases are processed entirely by Google Play. Risetime does not receive, store, or process any payment information. Subscription status is stored locally on your device only.</p>
          </section>

          <section aria-labelledby="section-children">
            <h2 id="section-children">Children's Privacy</h2>
            <p>Risetime does not knowingly collect any information from anyone, including children under the age of 13. Because no data is collected at all, Risetime is compliant with COPPA and similar regulations by design.</p>
          </section>

          <section aria-labelledby="section-changes">
            <h2 id="section-changes">Changes to This Policy</h2>
            <p>If this privacy policy changes, the updated version will be published at this URL with a revised effective date. Because no data is collected, changes are unlikely to affect your privacy in practice.</p>
          </section>

          <section aria-labelledby="section-contact">
            <h2 id="section-contact">Contact</h2>
            <p>Questions about this privacy policy can be directed to the publisher at <a href="mailto:contact@risetime.app">contact@risetime.app</a>, or via the Google Play Store listing for Risetime.</p>
          </section>

        </main>

        <SiteFooter />
    </div>
  )
}
