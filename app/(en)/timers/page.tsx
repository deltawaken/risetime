import type { Metadata } from 'next'

// Porté depuis timers/index.html (commit 967c17d) — recopie, pas réécriture.
// Voir le rapport de portage : references/nextjs-port-report.md

export const metadata: Metadata = {
  title: "Repeating Countdown Timer for Android — Risetime",
  description: "A countdown timer that starts itself again — for intervals, workouts and study blocks — plus everything a clock app timer already does. No ads, no internet.",
  alternates: { canonical: "/timers/" },
  openGraph: { title: "Countdown Timers That Repeat Themselves — Risetime", description: "Set the interval once and it keeps the rhythm. Everything a clock app timer does, and one that repeats.", type: "article", url: "/timers/" },
}

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Countdown Timers That Repeat Themselves",
  "description": "The countdown timers in Risetime: the ordinary ones every clock app has, and a repeat mode whose cycles stay in phase for intervals, workouts and study blocks.",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/timers/"
},
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Risetime",
      "item": "https://risetime.app/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Timers",
      "item": "https://risetime.app/timers/"
    }
  ]
}
]

export default function TimersPage() {
  return (
    <div className="layout-narrow">
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
            <a href="/timers/" aria-current="page">Timers</a>
            <a href="/privacy/">Privacy</a>
          </nav>
        </header>

        <div className="page-header">
          <h1>Countdown Timers That Repeat Themselves</h1>
          <p className="subtitle">For intervals, workouts and study blocks — plus everything a clock app's timer already does.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-what-it-is">
            <h2 id="section-what-it-is">The ordinary part first</h2>
            <p>A clock app needs timers, so Risetime has them, in a tab beside its alarms. Nothing here should surprise you — that is rather the point. Tap the plus and you get a full-screen keypad rather than a dial: type the digits and they fill from the right, the way a microwave does. Four, zero, zero gives you four minutes, and six digits let you dial anything up to a hundred hours.</p>
            <p>Timers sit in a list sorted by how long they were set for, shortest first, rather than by the order you made them. Yours is where it was yesterday, so you stop hunting for it.</p>

            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/timer-list--dark.webp" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/timer-list.webp" type="image/webp" />
                <source srcSet="/assets/screenshots/timer-list--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/timer-list.png" alt="Risetime timers list showing three countdowns: 3:30 running, 9:26 paused with a reset button, and 23:35 running with a pink repeat badge. Each row has a chevron, a play or pause button, and a plus one minute button." width="480" height="854" loading="lazy" />
              </picture>
              <figcaption>Three timers, sorted by duration. The pink badge marks the one set to repeat.</figcaption>
            </figure>

            <p>Each row carries what you need while it counts: pause, and a <strong>+1:00</strong> button that adds time to whatever is left — a minute unless you change it in Settings. Pause a timer and that button becomes a reset. The chevron opens the row for the two things you need less often — the repeat switch, and delete.</p>
          </section>

          <section aria-labelledby="section-repeat">
            <h2 id="section-repeat">Repeat, without the drift</h2>
            <p>This is the part your phone's clock app probably does not do. Turn repeat on and the timer starts itself again every time it finishes — for the round you are on, the set you are doing, the twenty-five minutes you are giving to one chapter. Rest periods, drills, revision blocks, stretches, a reminder to look away from the screen.</p>
            <p>The cycles are anchored to when each one was <em>due</em>, not to when you silenced it. Thirty minutes repeated twice is sixty minutes, not sixty-one. Otherwise every cycle would inherit the length of the last bell you ignored, and by evening the thing would need resetting.</p>

            <div className="highlight-box">
              <p>A repeating timer rings for five seconds by default, with a short notification tone rather than an alarm, then moves to the next cycle. There is no "never" option for that window — a bell with no end would stall the loop it belongs to.</p>
            </div>

            <p>One-shot timers work the other way round: they ring for ten minutes by default, and "never" <em>is</em> available if you want one that waits for you however long that takes.</p>
          </section>


          <section aria-labelledby="section-notification">
            <h2 id="section-notification">The notification counts on its own</h2>
            <p>The countdown in your notification shade is drawn by Android itself rather than repainted by the app. It keeps ticking with no Risetime process alive at all: swipe the app out of recents and the number in your shade carries on.</p>
            <p>There is one card for whatever is running or paused, and one for whatever is ringing — not one card per timer stacking up in the shade.</p>
            <p>Swiping that card away stops nothing. It dismisses a piece of paper: the card comes straight back from live state, and a ringing timer keeps ringing. Stopping is always a deliberate button, so a stray thumb never silences something you needed.</p>
          </section>

          <section aria-labelledby="section-settings">
            <h2 id="section-settings">Its own sound, its own volume</h2>
            <p>Timers do not borrow your alarm's settings, and repeating timers do not borrow the one-shot ones — sensible, given a bell you hear once an hour should rarely be the one that drags you out of sleep. Each of the two carries its own:</p>
            <ul>
              <li>Sound, chosen from your system sounds or a file of your own — Risetime ships no audio of its own</li>
              <li>Volume, either the system level or a level you set for timers alone</li>
              <li>How long it rings before giving up, and an optional gradual fade-in</li>
            </ul>
            <p>Two things are shared rather than doubled: whether timers vibrate, and what the hardware volume keys do while a finished timer's full-screen alert is on your display — change the volume, add time, stop it, or nothing at all.</p>
          </section>

          <section aria-labelledby="section-setup">
            <h2 id="section-setup">Setting one up</h2>
            <p>Open the Timers tab, tap the plus, type the duration, press play. That is the whole thing — there is nothing to name and nothing to file.</p>
            <p>To make it repeat, open the row with the chevron and tick Repeat. One thing to know before you rely on it: the repeat setting is read once per cycle, at the moment the bell starts. Untick it while a timer is ringing and you get one more cycle before it stops. To end the loop at once, press Stop loop on the ringing screen.</p>
            <p>Risetime is free for up to three timers, the same count as its alarms — for good. Reach it and the add button is simply absent — no dialog, no padlock, no banner naming what you are missing. If your support lapses nothing is deleted: every timer you made keeps working, you just cannot add another. Need more than three? See if it's worth your support — if not, I'll be happy to <a href="mailto:contact@risetime.app">hear you out</a>. The <a href="/alarms/" className="content-link">alarms guide</a> covers the alarms, which share the same reliability settings.</p>
          </section>

          <div className="cta-section">
            <h2>Set the interval once. It keeps the rhythm.</h2>
            <a className="play-badge" href="https://play.google.com/apps/testing/com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Join the Risetime open test on Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Open testing</span>
            </a>
            <p className="cta-note">Risetime is in open testing, so you join the test first and install from Play afterwards. Without that step Play may tell you the app isn't available in your country.</p>
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
            &middot;
            <a href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener">Google Play</a>
          </nav>
        </footer>
    </div>
  )
}
