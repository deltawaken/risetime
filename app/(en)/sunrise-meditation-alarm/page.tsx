import type { Metadata } from 'next'

// 9-17, page 4 — written for site/nextjs directly (not ported from main).
// Secular page: no tradition is named (owner's ruling, 2026-09-24 evening).
// Three screenshot slots are marked by a comment; no image ships until the owner
// has reviewed the text.

export const metadata: Metadata = {
  title: "Sunrise Meditation & Yoga Alarm for Android | Risetime",
  description: "Start your meditation or yoga practice with first light: an Android alarm anchored to sunrise, or to a fraction of the night. Offline, no tracking, no ads.",
  alternates: { canonical: "/sunrise-meditation-alarm/" },
  openGraph: { title: "Sunrise Meditation and Yoga Alarm for Android", description: "Anchor the alarm to sunrise, to civil dawn by its angle, or to a fraction of the night. It follows the light all year, offline.", type: "article", url: "/sunrise-meditation-alarm/" },
}

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "A morning practice that starts with the light",
  "description": "How to set an Android alarm for meditation or yoga on sunrise, on civil or nautical dawn by the sun's angle, or on a fraction of the night, with the Risetime alarm app. Computed on the device, offline.",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/sunrise-meditation-alarm/"
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
      "name": "Sunrise Meditation Alarm",
      "item": "https://risetime.app/sunrise-meditation-alarm/"
    }
  ]
}
]

export default function SunriseMeditationAlarmPage() {
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
            <a href="/timers/">Timers</a>
            <a href="/privacy/">Privacy</a>
          </nav>
        </header>

        <div className="page-header">
          <h1>A practice that starts with the light, not with a number</h1>
          <p className="subtitle">Set the offset once; the light does the moving.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="s-why">
            <h2 id="s-why" className="sr-only">Why first light is not a clock time</h2>
            <p>A practice that begins with the light does not begin at a number. First light moves through the year, and across a single time zone too: on 21 June the sun rises at <strong>06:01 in Mumbai</strong> and <strong>05:08 in Varanasi</strong>: fifty-three minutes apart, on the same clock.</p>
            <p>Risetime sets an alarm on a moment of the sun instead of a clock time. That moment is an <strong>anchor</strong>, the distance you keep from it an <strong>offset</strong>.</p>
          </section>

          <section aria-labelledby="s-names">
            <h2 id="s-names">Four ways to name first light</h2>
            <table className="timing-table" aria-label="Four ways to name first light, and what you create in Risetime">
              <thead><tr><th>What you're after</th><th>Where the sun is</th><th>In Risetime</th></tr></thead>
              <tbody>
                <tr><td>Sunrise</td><td>the disc clears the horizon</td><td>the built-in <strong>Sunrise</strong> anchor</td></tr>
                <tr><td>Civil dawn</td><td><strong>6° below</strong> the horizon</td><td>a solar angle anchor, <strong>−6° morning</strong></td></tr>
                <tr><td>Nautical dawn</td><td><strong>12° below</strong></td><td><strong>−12° morning</strong></td></tr>
                <tr><td>A point inside the night</td><td>part of the way from sunset to sunrise</td><td>a <strong>Division</strong> anchor: Night, in <em>N</em> parts</td></tr>
              </tbody>
            </table>
            <p>Definitions vary; these are the common ones. The app holds the one you set at every latitude and season — which a fixed &ldquo;forty-five minutes before sunrise&rdquo; cannot, the length of twilight changing with both.</p>
            {/* Screenshot slot 1 — the alarm list. No image until the text has been reviewed. */}
          </section>

          <section aria-labelledby="s-sunrise">
            <h2 id="s-sunrise">Set the practice on sunrise</h2>
            <ol>
              <li>On the <strong>Alarms</strong> tab, press <strong>+</strong>.</li>
              <li>In the top menu, choose <strong>Sunrise</strong>.</li>
              <li>Leave the dial centred to ring at sunrise, or turn it to the gap you want, up to <strong>11 h 59 min</strong> either way.</li>
              <li>Press <strong>OK</strong>, then open the alarm in the list and set <strong>Repeat</strong>.</li>
            </ol>
            <p>And the alarm early risers keep asking for is the other one: <strong>an alarm to go to bed</strong>, not one to wake up. Put it on the <strong>Sunset</strong> anchor with an offset, repeating — the same four steps. <a href="/alarms/" className="content-link">How to set a sunrise or sunset alarm</a></p>
          </section>

          <section aria-labelledby="s-angle">
            <h2 id="s-angle">Before the sun: dawn by angle</h2>
            <ol>
              <li>Open <strong>Settings → Anchors</strong> and press <strong>+</strong> (it appears once the section is unfolded).</li>
              <li>Keep the type on <strong>A solar angle</strong>. Enter <strong>−6°</strong> for civil dawn or <strong>−12°</strong> for nautical dawn, direction <strong>morning</strong>. It moves a tenth of a degree at a time, between −30° and +30°.</li>
              <li>Name it, <strong>pick a colour</strong> — it will not save without one — and save.</li>
              <li>On the <strong>Alarms</strong> tab, put an alarm on it.</li>
            </ol>
            <p>Far north or south, the sun never gets that low for part of the year. The editor says so as you create the anchor — <em>&ldquo;The sun does not reach this angle here from X to Y&rdquo;</em>, with your own dates — and on those days the alarm stays silent rather than ring at a moment the sky never produced. Nothing is invented.</p>
            {/* Screenshot slot 2 — the anchor editor on −6° morning. */}
          </section>

          <section aria-labelledby="s-night">
            <h2 id="s-night">A fraction of the night</h2>
            <p>You can time the morning by the night rather than the dawn: a point a given way through the dark.</p>
            <ol>
              <li><strong>Settings → Anchors → +</strong>, and switch the shape to <strong>Division</strong>.</li>
              <li>Scope <strong>Night</strong>, then the <strong>number of parts</strong> and the <strong>position</strong> — 2 to 48 parts, any boundary inside them.</li>
              <li>Name it, pick a colour, save. A fresh draft's title reads <strong>Night · 1/15</strong>; it follows whatever you set.</li>
              <li>Put an alarm on it.</li>
            </ol>
            <p>The night here is exactly one thing: <strong>from a sunset to the following sunrise</strong>, split evenly. Inside the polar circles such a night may not exist; the anchor then has nothing to divide, and the app says so — without the dated range the angle form gives, which this shape has not. Matching a published timetable? <strong>Advanced → Shift by N minutes</strong> moves an anchor you made by up to thirty minutes either way.</p>
            {/* Screenshot slot 3 — the anchor editor on the Division shape, Night scope. */}
          </section>

          <section aria-labelledby="s-not">
            <h2 id="s-not">What Risetime does not do</h2>
            <p>Its own labels stay astronomical — <em>Sunrise</em>, <em>a solar angle</em>, <em>Night · 1/15</em> — while the name you type is yours. It is an alarm clock, nothing more:</p>
            <ul>
              <li><strong>No chime partway through a session</strong> — no screen builds one timer out of several, so a thirty-minute sit cannot sound at ten and twenty.</li>
              <li><strong>No meditation sounds, nothing guided.</strong> It rings; you stop it.</li>
              <li><strong>Nothing lunar</strong> — Risetime does not compute the Moon: no phase, no lunar date.</li>
              <li><strong>No sleep tracking, no account, no cloud, no internet permission at all</strong> — your location never leaves the phone. <a href="/privacy/" className="content-link">Privacy policy</a></li>
            </ul>
            <p><a href="/alarms/#section-custom" className="content-link">How anchors and offsets work</a></p>
          </section>

          <section aria-labelledby="s-price">
            <h2 id="s-price" className="sr-only">What it costs</h2>
            <p>Risetime is free for up to three alarms and three timers — for good. Need more? Use those three first, and see if it's worth your support: supporters get unlimited alarms and timers, yearly or once. If not, I'll be happy to <a href="mailto:contact@risetime.app">hear you out</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Begin with the light.</h2>
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
