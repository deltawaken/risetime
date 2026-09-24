import type { Metadata } from 'next'

// Porté depuis index.html (commit 967c17d) — recopie, pas réécriture.
// Voir le rapport de portage : references/nextjs-port-report.md

export const metadata: Metadata = {
  title: "Risetime — Sunrise Alarm App for Android · Celestial Alarm Clock",
  description: "Sunrise alarm clock app for Android. Set your alarm relative to sunrise, sunset, or solar noon — it shifts automatically every day. No wifi, no internet, no data collection.",
  alternates: { canonical: "/" },
  openGraph: { title: "Risetime — Sunrise Alarm App for Android", description: "Set your alarm to sunrise. Once. It shifts every day automatically. No wifi required.", type: "website", url: "/", images: [{ url: "https://risetime.app/assets/screenshots/landscape-alarm-list.webp", width: 854, height: 480 }] },
  twitter: { card: "summary_large_image", title: "Risetime — Sunrise Alarm App for Android", description: "Set your alarm to sunrise. Once. It shifts every day automatically. No wifi required.", images: ["https://risetime.app/assets/screenshots/landscape-alarm-list.webp"] },
}

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Risetime",
  "alternateName": "Risetime Sunrise Alarm Clock",
  "description": "Sunrise alarm clock app for Android. Set your alarm relative to sunrise, sunset, or solar noon — it shifts automatically every day. Works fully offline with no internet permission.",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://risetime.app/",
  "screenshot": [
    "https://risetime.app/assets/screenshots/alarm-list.png",
    "https://risetime.app/assets/screenshots/alarm-picker.png",
    "https://risetime.app/assets/screenshots/dismiss-screen.png",
    "https://risetime.app/assets/screenshots/settings-screen.png"
  ],
  "featureList": [
    "Alarms anchored to sunrise, sunset, solar noon or nadir",
    "Custom anchors: a solar angle, a shadow length, a fraction of the day or night",
    "Anchor calibration, to match a published timetable",
    "Automatic daily recalculation as sun times shift",
    "Works fully offline — no internet permission",
    "No analytics, no tracking, no data collection",
    "Supports both celestial and fixed-time alarms",
    "OS-level alarm API — survives Doze mode and restarts",
    "Countdown timers with repeat cycles that stay in phase"
  ],
  "author": {
    "@type": "Organization",
    "name": "Deltawaken",
    "url": "https://risetime.app/"
  }
},
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does Risetime actually do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risetime is an alarm clock that can tie an alarm to a moment of the sun. Set “30 minutes before sunrise” once and the alarm recalculates every day for your location, so it follows the sun through the year. It also does ordinary fixed-time alarms and countdown timers."
      }
    },
    {
      "@type": "Question",
      "name": "Does Risetime need an internet connection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Risetime has no internet permission at all — it cannot connect, even if it wanted to. Sunrise and sunset times are computed on your device. It works in airplane mode, in the field, anywhere."
      }
    },
    {
      "@type": "Question",
      "name": "Does Risetime also handle normal fixed-time alarms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Ordinary clock alarms and sun-anchored alarms live in the same list, and countdown timers have their own tab, with their own sound and volume settings."
      }
    },
    {
      "@type": "Question",
      "name": "Can I set an alarm for dawn, golden hour or the dark of night?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, by the angle of the sun. Create an anchor at −6° for civil dawn, +6° in the evening for golden hour, −18° for astronomical night, and set alarms on them. Where an angle is never reached for part of the year, the app says so and the alarm skips those days rather than ring at an invented time."
      }
    },
    {
      "@type": "Question",
      "name": "Does the alarm still go off in Doze mode or Battery Saver?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Risetime uses Android’s setAlarmClock API — the same system-level mechanism as your built-in clock app — and a Reliability screen checks the permissions your phone needs. Alarms ring even before the first unlock after a restart."
      }
    },
    {
      "@type": "Question",
      "name": "Is Risetime free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Free for up to three alarms and three timers, for good. Need more? Use those three first, and see if it’s worth your support: supporters get unlimited alarms and timers, yearly or once."
      }
    }
  ]
}
]

export default function HomePage() {
  return (
    <div className="landing">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <a href="#main-content" className="skip-link">Skip to main content</a>

        <header className="site-header" role="banner">
          <nav aria-label="Main navigation">
            <a href="/" className="wordmark">Risetime</a>
            <a href="/alarms/">Alarms</a>
            <a href="/timers/">Timers</a>
            <a href="/#uses">Uses</a>
            <a href="/privacy/">Privacy</a>
          </nav>
        </header>

        <main id="main-content">

          {/* HERO */}
          <section className="hero" aria-labelledby="hero-heading">
            <h1 id="hero-heading"><span className="hero-brand">Risetime</span> <span className="hero-sep" aria-hidden="true">&mdash;</span> Sunrise alarm app for Android.</h1>
            <p className="hero-celestial">Your celestial alarm clock.</p>
            <p className="hero-sub">Set your alarm to the sun. It shifts every day so you don't have to.</p>
            <div className="hero-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/alarm-list--dark.webp" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/alarm-list.webp" type="image/webp" />
                <source srcSet="/assets/screenshots/alarm-list--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/alarm-list.png" alt="Risetime alarm list showing five alarms: a sunrise alarm at 07:04, an absolute alarm at 09:00, two noon-relative alarms, and a sunset alarm at 18:00. Each alarm has a coloured anchor chip and a toggle switch." width="480" height="854" loading="eager" fetchPriority="high" />
              </picture>
            </div>
            <div className="cta-group">
              <a className="play-badge" href="https://play.google.com/apps/testing/com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Join the Risetime open test on Google Play">
                <span className="badge-main">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                  Google Play
                </span>
                <span className="badge-sub">Open testing</span>
              </a>
              <p className="cta-note">Risetime is in open testing, so you join the test first and install from Play afterwards. Without that step Play may tell you the app isn't available in your country.</p>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="how-it-works" aria-labelledby="how-heading">
            <h2 id="how-heading">How the sunrise alarm works</h2>
            <ol className="steps" role="list">
              <li>
                <strong>Pick your anchor</strong>
                <span>Choose a celestial event: sunrise, noon, sunset, or nadir. This is the reference point your alarm tracks.</span>
              </li>
              <li>
                <strong>Set your offset</strong>
                <span>Decide how far before or after. Thirty minutes before sunrise. One hour after sunset. Pick which days it repeats.</span>
              </li>
              <li>
                <strong>That's it</strong>
                <span>Risetime recalculates the exact alarm time every day. Sunrise drifts with the seasons — your alarm follows. You never adjust it.</span>
              </li>
            </ol>
          </section>

          {/* FEATURES */}
          <section className="features" aria-labelledby="features-heading">
            <h2 id="features-heading">Features of the Risetime sunrise alarm app</h2>
            <div className="feature-grid">
              <article className="feature-card">
                <h3>Anchored to the day</h3>
                <p>Set alarms relative to sunrise, noon, sunset, or nadir. Choose an offset — the alarm recalculates daily to stay in sync with the real sky. Define it once. It stays right all year.</p>
              </article>
              <article className="feature-card">
                <h3>Offline and private by design</h3>
                <p>Risetime has no internet permission. Not disabled — absent. Sunrise times are calculated on your device using astronomical math. No servers. No accounts. No data leaves your phone.</p>
              </article>
              <article className="feature-card">
                <h3>Set it, then forget it</h3>
                <p>The app recalculates your alarm times in the background every day. Most days you never open it. That is by design — Risetime works best when you forget it exists.</p>
              </article>
              <article className="feature-card">
                <h3>Real alarms, not notifications</h3>
                <p>Risetime uses the same OS-level alarm API as your built-in Android clock. Your alarm survives Doze mode, battery optimization, and device restarts. When it is time to wake up, your phone rings.</p>
              </article>
              <article className="feature-card">
                <h3>Countdown timers, in the same app</h3>
                <p>A keypad, a list sorted by duration, and a repeat mode whose cycles stay in phase — for intervals, workouts and study blocks. <a href="/timers/">Timers guide</a></p>
              </article>
            </div>
          </section>

          {/* WHO IT'S FOR */}
          <section className="use-cases" id="uses" aria-labelledby="use-cases-heading">
            <h2 id="use-cases-heading">What more you can do with Risetime</h2>
            <p>Who uses a sunrise alarm app, and what they set:</p>
            <ul className="use-case-list">
              <li><strong>A day that follows the sun</strong> — wake at sunrise, wind down before it, and keep clock alarms for the hours other people expect of you. <a href="/circadian-rhythm-alarm/">Circadian rhythm alarm for Android</a></li>
              <li><strong>Photographers and astronomers</strong> — golden hour, blue hour and astronomical night are angles of the sun, not fixed times. Set the angle once; it holds at every latitude and season, offline in the field. <a href="/golden-hour-alarm/">Golden hour, blue hour and night sky alarms</a></li>
              <li><strong>Meditation, yoga and a practice at first light</strong> — the sun salutation as the light arrives, or a sit before it. Anchor on sunrise, on civil dawn by its angle, or on a fraction of the night. <a href="/sunrise-meditation-alarm/">Sunrise meditation and yoga alarm</a></li>
              <li><strong>Dawn patrol</strong> — out in the water before the light, on an alarm that moves with first light instead of a time you reset every few weeks.</li>
              <li><strong>Pre-dawn risers</strong> — set your offset before sunrise once and it tracks sunrise every day. Check your own timetable for the exact moment; the alarm is the part that never drifts.</li>
              <li><strong>Outdoor workers, dog walkers, farmers</strong> — if your day starts with daylight, your alarm should too.</li>
              <li><strong>Intervals, workouts, study blocks</strong> — countdown timers that restart themselves, in the same app. <a href="/timers/">Repeating countdown timers</a></li>
              <li><strong>Anyone tired of adjusting throughout the year</strong> — set it once. It stays right. <a href="/alarms/">How to set a sunrise or sunset alarm on Android</a></li>
            </ul>
          </section>

          {/* SCREENSHOT SHOWCASE */}
          <section className="screenshots" aria-labelledby="screenshots-heading">
            <h2 id="screenshots-heading">Screenshots — sunrise alarm app for Android</h2>
            <div className="screenshot-row">
              <figure>
                <picture>
                  <source srcSet="/assets/screenshots/alarm-picker--dark.webp" media="(prefers-color-scheme: dark)" type="image/webp" />
                  <source srcSet="/assets/screenshots/alarm-picker.webp" type="image/webp" />
                  <source srcSet="/assets/screenshots/alarm-picker--dark.png" media="(prefers-color-scheme: dark)" />
                  <img src="/assets/screenshots/alarm-picker.png" alt="Risetime alarm picker dialog showing the five anchor chips (clock, sunrise, noon, sunset, nadir) with Noon selected. An offset of minus 1 hour is set, resolving to 12:07. A circular hour dial is visible below." width="480" height="854" loading="lazy" />
                </picture>
                <figcaption>Pick your anchor and offset</figcaption>
              </figure>
              <figure>
                <picture>
                  <source srcSet="/assets/screenshots/dismiss-screen--dark.webp" media="(prefers-color-scheme: dark)" type="image/webp" />
                  <source srcSet="/assets/screenshots/dismiss-screen.webp" type="image/webp" />
                  <source srcSet="/assets/screenshots/dismiss-screen--dark.png" media="(prefers-color-scheme: dark)" />
                  <img src="/assets/screenshots/dismiss-screen.png" alt="Risetime alarm dismiss screen with a sunset-toned background showing the time 18:00, the date Wednesday March 18, a large circular Snooze button, and a Dismiss text below." width="480" height="854" loading="lazy" />
                </picture>
                <figcaption>Wake gently</figcaption>
              </figure>
              <figure>
                <picture>
                  <source srcSet="/assets/screenshots/settings-screen--dark.webp" media="(prefers-color-scheme: dark)" type="image/webp" />
                  <source srcSet="/assets/screenshots/settings-screen.webp" type="image/webp" />
                  <source srcSet="/assets/screenshots/settings-screen--dark.png" media="(prefers-color-scheme: dark)" />
                  <img src="/assets/screenshots/settings-screen.png" alt="Risetime settings screen showing Alarm Behaviour, Celestial events location, and Alarm reliability section with five green checkmarks for all permissions. A Supporting Risetime section is visible at the bottom." width="480" height="854" loading="lazy" />
                </picture>
                <figcaption>Reliability you can check</figcaption>
              </figure>
            </div>
          </section>

          {/* PRIVACY COMMITMENT */}
          <section className="privacy-callout" aria-labelledby="privacy-heading">
            <h2 id="privacy-heading">Offline sunrise alarm — no internet, no tracking</h2>
            <div className="callout-box">
              <p>Risetime does not request internet permission. There is no server. There is no account to create. There is no analytics SDK measuring how you use the app.</p>
              <ul>
                <li>No <code>INTERNET</code> permission — the app cannot connect to the internet</li>
                <li>No analytics, crash reporting, or telemetry of any kind</li>
                <li>No accounts, no cloud sync, no sign-in</li>
                <li>Location stays on your device — used only for sunrise math</li>
                <li>No ads, no tracking, no data shared with anyone</li>
              </ul>
              <a href="/privacy/" className="privacy-link">Read the full privacy policy</a>
            </div>
          </section>

          {/* SUPPORT */}
          <section className="support" aria-labelledby="support-heading">
            <h2 id="support-heading">Free for up to three alarms. Unlimited as a supporter.</h2>
            <div className="callout-box" style={{"borderInlineStartColor": "var(--muted)"}}>
              <p>Risetime is free for up to three alarms and three timers — for good. <br />Need more? Use those three first, and see if it's worth your support: supporters get unlimited alarms and timers, yearly or once. If not, I'll be happy to <a href="mailto:contact@risetime.app">hear you out</a>. You'll find it in Settings.</p>
              <p style={{"marginBottom": "0"}}>No nag screens, no countdowns, no "upgrade to continue" prompts. Just an honest option when you're ready.</p>
            </div>
          </section>

          {/* FAQ */}
          <section className="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading">Frequently asked questions</h2>
            <dl className="faq-list">
              <dt>What does Risetime actually do?</dt>
              <dd>Risetime is an alarm clock that can tie an alarm to a moment of the sun. Set “30 minutes before sunrise” once and the alarm recalculates every day for your location, so it follows the sun through the year. It also does ordinary fixed-time alarms and countdown timers.</dd>
              <dt>Does Risetime need an internet connection?</dt>
              <dd>No. Risetime has no internet permission at all — it cannot connect, even if it wanted to. Sunrise and sunset times are computed on your device. It works in airplane mode, in the field, anywhere.</dd>
              <dt>Does Risetime also handle normal fixed-time alarms?</dt>
              <dd>Yes. Ordinary clock alarms and sun-anchored alarms live in the same list, and countdown timers have their own tab, with their own sound and volume settings.</dd>
              <dt>Can I set an alarm for dawn, golden hour or the dark of night?</dt>
              <dd>Yes, by the angle of the sun. Create an anchor at −6° for civil dawn, +6° in the evening for golden hour, −18° for astronomical night, and set alarms on them. Where an angle is never reached for part of the year, the app says so and the alarm skips those days rather than ring at an invented time.</dd>
              <dt>Does the alarm still go off in Doze mode or Battery Saver?</dt>
              <dd>Yes. Risetime uses Android’s setAlarmClock API — the same system-level mechanism as your built-in clock app — and a Reliability screen checks the permissions your phone needs. Alarms ring even before the first unlock after a restart.</dd>
              <dt>Is Risetime free?</dt>
              <dd>Free for up to three alarms and three timers, for good. Need more? Use those three first, and see if it’s worth your support: supporters get unlimited alarms and timers, yearly or once.</dd>
            </dl>
          </section>

          {/* FINAL CTA */}
          <section className="final-cta" aria-labelledby="cta-heading">
            <h2 id="cta-heading">Ready to rise with the sun?</h2>
            <a className="play-badge" href="https://play.google.com/apps/testing/com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Join the Risetime open test on Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Open testing</span>
            </a>
            <p className="cta-note">Risetime is in open testing, so you join the test first and install from Play afterwards. Without that step Play may tell you the app isn't available in your country.</p>
          </section>

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
            &middot;
            <a href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener">Google Play</a>
          </nav>
        </footer>
    </div>
  )
}
