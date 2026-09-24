import type { Metadata } from 'next'

// Porté depuis golden-hour-alarm/index.html (commit 967c17d) — recopie, pas réécriture.
// Voir le rapport de portage : references/nextjs-port-report.md

export const metadata: Metadata = {
  title: "Golden Hour & Blue Hour Alarm for Android — and the Night Sky | Risetime",
  description: "Alarms for golden hour, blue hour and astronomical night, set by the sun's angle. They follow the light all year, offline in the field.",
  alternates: { canonical: "/golden-hour-alarm/" },
  openGraph: { title: "Golden Hour, Blue Hour and Night Sky Alarms for Android", description: "Set the sun's angle once; the alarm tracks the light through the year. Works offline in the field, with no internet permission.", type: "article", url: "/golden-hour-alarm/" },
}

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Golden hour, blue hour and the night sky, on an alarm",
  "description": "How to set alarms for golden hour, blue hour and astronomical night on Android, by the sun's angle rather than a clock time, with the Risetime alarm app. Computed on the device, offline.",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/golden-hour-alarm/"
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
      "name": "Golden Hour Alarm",
      "item": "https://risetime.app/golden-hour-alarm/"
    }
  ]
}
]

export default function GoldenHourAlarmPage() {
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
          <h1>Golden hour, blue hour and the night sky, on an alarm</h1>
          <p className="subtitle">Set the angle once. The alarm tracks the light through the year.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="s-why">
            <h2 id="s-why" className="sr-only">Why a fixed alarm misses the light</h2>
            <p>You know when the light is good. The problem is that it moves: sunset in New York runs from <strong>16:31 on 21 December</strong> to <strong>20:30 on 21 June</strong>. A fixed alarm for golden hour is wrong within two weeks and useless within a month.</p>
            <p>Risetime sets an alarm on <strong>the sun's angle</strong> rather than on a clock time — and the angle is what actually defines those windows.</p>
          </section>

          <section aria-labelledby="s-angles">
            <h2 id="s-angles">The light, by angle</h2>
            <table className="timing-table" aria-label="Golden hour, blue hour and astronomical night, by the sun's angle">
              <thead><tr><th>What you're after</th><th>The sun is…</th><th>In Risetime</th></tr></thead>
              <tbody>
                <tr><td>Golden hour, evening</td><td>below about <strong>6° above</strong> the horizon</td><td>a solar angle anchor, <strong>+6° evening</strong></td></tr>
                <tr><td>Blue hour, evening</td><td>between about <strong>4° and 6° below</strong></td><td><strong>−4° evening</strong>, the window running on to −6°</td></tr>
                <tr><td>Golden hour, morning</td><td>the same, in reverse</td><td><strong>+6° morning</strong></td></tr>
                <tr><td>Astronomical night</td><td><strong>18° below</strong></td><td><strong>−18° evening</strong>, and −18° morning for when it ends</td></tr>
              </tbody>
            </table>
            <p>Definitions vary between photographers; these are the common ones. Set the angle you work with and the app holds it at every latitude and season — which a "30 minutes before sunset" rule of thumb cannot do, because the length of twilight changes with both. In London on 21 June, +6° falls at 20:27 and sunset at 21:21: nearly an hour apart. In New York the same evening, 19:49 and 20:30: forty minutes.</p>
            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/sky-menu--dark.webp 1x, /assets/screenshots/sky-menu--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/sky-menu.webp 1x, /assets/screenshots/sky-menu@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/sky-menu--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/sky-menu.png" alt="The new-alarm dialog with its anchor menu open, listing Absolute, Sunrise, Noon, Golden hour, Sunset, Blue hour, Night sky and Nadir." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>Your own anchors sit beside sunrise and sunset, in the order of the day.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-make">
            <h2 id="s-make">Make the anchor once</h2>
            <ol>
              <li>Open <strong>Settings → Anchors</strong> and press <strong>+</strong>.</li>
              <li>Keep the type on <strong>A solar angle</strong>, and set your angle — tap the value to type it, and choose <strong>morning</strong> or <strong>evening</strong>.</li>
              <li>Name it — <em>Golden hour</em>, <em>Blue hour</em>, <em>Night sky</em> — pick a colour, and save.</li>
              <li>On the <strong>Alarms</strong> tab, set an alarm on it: at the anchor, or thirty minutes before to reach the spot.</li>
            </ol>
            <p><a href="/alarms/#section-custom" className="content-link">How anchors and offsets work</a></p>
            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/sky-list--dark.webp 1x, /assets/screenshots/sky-list--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/sky-list.webp 1x, /assets/screenshots/sky-list@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/sky-list--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/sky-list.png" alt="The Risetime alarm list with five alarms: 06:45 and 08:10 Monday to Friday on Absolute; 17:24 on Sunday and Saturday, 30 min before Golden hour; 18:58 on Sunday and Saturday at Blue hour; and 20:30 on Friday and Saturday at Night sky." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>Clock alarms for the week, sun alarms for the light.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-week">
            <h2 id="s-week">A working week, and the light at the weekend</h2>
            <p>Most of us are not shooting for a living:</p>
            <table className="timing-table" aria-label="A week of clock alarms and weekend alarms anchored to the light">
              <thead><tr><th>Moment</th><th>Alarm</th><th>Days</th></tr></thead>
              <tbody>
                <tr><td>Wake-up</td><td>06:45</td><td>Mon–Fri</td></tr>
                <tr><td>School run</td><td>08:10</td><td>Mon–Fri</td></tr>
                <tr><td>Pack the bag</td><td>30 min before Golden hour</td><td>Sat &amp; Sun</td></tr>
                <tr><td>Blue hour</td><td>Blue hour</td><td>Sat &amp; Sun</td></tr>
                <tr><td>Stars</td><td>Night sky</td><td>Fri &amp; Sat</td></tr>
              </tbody>
            </table>
            <p>Clock alarms for the week, sun alarms for the light — the same list, the same app.</p>
          </section>

          <section aria-labelledby="s-road">
            <h2 id="s-road">On the road, and off the grid</h2>
            <ul>
              <li><strong>Travelling?</strong> Turn on <strong>Auto-update location</strong> in Settings and your alarms follow you — a trip, a new city, a coastline.</li>
              <li><strong>No signal at the spot?</strong> Risetime computes the sun's position on the phone, with an astronomical library. It has <strong>no internet permission at all</strong>, so it cannot depend on a connection: airplane mode, a canyon, a boat — the alarm still knows when the light comes.</li>
              <li><strong>No tracking, no account, no ads.</strong> Your location never leaves the phone. <a href="/privacy/" className="content-link">Privacy policy</a></li>
            </ul>
          </section>

          <section aria-labelledby="s-night">
            <h2 id="s-night">For the night sky</h2>
            <p>Astronomical night is the window between the evening and the morning moments when the sun is 18° below the horizon. Set an anchor at each and you hold both ends of the dark.</p>
            <p>Far north or far south, that window closes for part of the year: in London the sun does not reach −18° <strong>from 23 May to 21 July</strong>. Risetime says so when you create the anchor, with the dates for your own location, and on those nights the alarm stays silent rather than ring at a time the sky never produces.</p>
            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/sky-night-editor--dark.webp 1x, /assets/screenshots/sky-night-editor--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/sky-night-editor.webp 1x, /assets/screenshots/sky-night-editor@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/sky-night-editor--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/sky-night-editor.png" alt="The anchor editor on A solar angle, set to −18.0° in the evening, named Night sky, with the preview: Next: 20:30. The sun does not reach this angle here from May 23, 2027 to July 21, 2027." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>An angle of −18° in the evening, and the weeks it never happens.</figcaption>
            </figure>
            <p><strong>What Risetime does not do: the Moon.</strong> No moonrise, no phase, no lunar calendar — the app will not tell you when a full Moon washes out the Milky Way. It does the sun, and it does it offline.</p>
          </section>

          <section aria-labelledby="s-price">
            <h2 id="s-price" className="sr-only">What it costs</h2>
            <p>Risetime is free for up to three alarms and three timers — for good. Need more? Use those three first, and see if it's worth your support: supporters get unlimited alarms and timers, yearly or once. If not, I'll be happy to <a href="mailto:contact@risetime.app">hear you out</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Never miss the light again.</h2>
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
