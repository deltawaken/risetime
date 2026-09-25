import type { Metadata } from 'next'
import SiteHeader from '../../../components/SiteHeader'
import SiteFooter from '../../../components/SiteFooter'

// Porté depuis circadian-rhythm-alarm/index.html (commit 967c17d) — recopie, pas réécriture.
// Voir le rapport de portage : references/nextjs-port-report.md

export const metadata: Metadata = {
  title: "Circadian Rhythm Alarm Clock App for Android | Risetime",
  description: "Set an Android alarm on sunrise, and the rest of your day around the sun. It shifts with the seasons by itself. Offline, no tracking, no ads.",
  alternates: { canonical: "/circadian-rhythm-alarm/" },
  openGraph: { title: "Circadian Rhythm Alarm for Android — Anchored to Sunrise", description: "An alarm tied to the sun rather than to the clock: it shifts with the seasons by itself. Offline, no tracking, no ads.", type: "article", url: "/circadian-rhythm-alarm/" },
}

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Circadian rhythm alarm for Android: an alarm anchored to sunrise",
  "description": "How to set an Android alarm on sunrise, and a day built around the sun, with the Risetime alarm app. The alarm shifts with the seasons by itself; times are computed on the device, with no internet permission.",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/circadian-rhythm-alarm/"
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
      "name": "Circadian Rhythm Alarm",
      "item": "https://risetime.app/circadian-rhythm-alarm/"
    }
  ]
}
]

export default function CircadianRhythmAlarmPage() {
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

        <SiteHeader current="/circadian-rhythm-alarm/" />

        <div className="page-header">
          <h1>Circadian rhythm alarm for Android: an alarm anchored to sunrise</h1>
          <p className="subtitle">It moves with the seasons by itself.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-what">
            <h2 id="section-what" className="sr-only">What a circadian rhythm alarm is</h2>
            <p>"Circadian rhythm alarm" is what people call an alarm tied to the sun rather than to the clock. The word comes from the body's roughly 24-hour cycle; in an app store it simply means the alarm follows sunrise instead of staying at a fixed time.</p>
            <p>In Risetime, the moment of the sun you choose is called an <strong>anchor</strong> — sunrise, solar noon, sunset — and the distance you keep from it is the <strong>offset</strong>.</p>
          </section>

          <section aria-labelledby="section-swing">
            <h2 id="section-swing">How much sunrise moves through the year</h2>
            <table className="timing-table" aria-label="How far sunrise moves between June and December, by city">
              <thead>
                <tr><th>City</th><th>Earliest sunrise</th><th>Latest sunrise</th><th>Swing</th></tr>
              </thead>
              <tbody>
                <tr><td>London</td><td>04:43 (21 June)</td><td>08:03 (21 Dec)</td><td>3 h 20</td></tr>
                <tr><td>Paris</td><td>05:46 (21 June)</td><td>08:41 (21 Dec)</td><td>2 h 55</td></tr>
                <tr><td>Tokyo</td><td>04:25 (21 June)</td><td>06:47 (21 Dec)</td><td>2 h 20</td></tr>
                <tr><td>Chicago</td><td>05:15 (21 June)</td><td>07:14 (21 Dec)</td><td>2 h 00</td></tr>
                <tr><td>Sydney</td><td>05:41 (21 Dec)</td><td>06:00 (21 June)</td><td>1 h 20</td></tr>
              </tbody>
            </table>
            <p>Local time, 2027, computed with the same astronomical library the app uses.</p>
            <p>A fixed alarm at 06:30 in London therefore rings <strong>1 h 47 after sunrise in June</strong>, and <strong>1 h 33 before it in December</strong>. Same alarm, two different mornings.</p>
          </section>

          <section aria-labelledby="section-how">
            <h2 id="section-how">How to set a circadian rhythm alarm</h2>
            <ol>
              <li>On the <strong>Alarms</strong> tab, press <strong>+</strong>.</li>
              <li>In the menu at the top, pick <strong>Sunrise</strong>.</li>
              <li>Leave the dial where it is to wake at sunrise, or turn it to the distance you want — 30 minutes before, an hour before.</li>
              <li>Press <strong>OK</strong>. Then open the alarm in the list and tick <strong>Repeat</strong> to choose your days.</li>
            </ol>
            <p>The distance you set never changes. Sunrise does, and the alarm goes with it — through the equinoxes, the solstices and the daylight-saving switch. <a href="/alarms/" className="content-link">How to set a sunrise or sunset alarm on Android</a></p>

            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/circadian-list--dark.webp 1x, /assets/screenshots/circadian-list--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/circadian-list.webp 1x, /assets/screenshots/circadian-list@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/circadian-list--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/circadian-list.png" alt="Risetime alarm list with three alarms, all repeating every day: 07:02 at Sunrise, 20:38 two hours after Sunset, and 23:02 eight hours before Sunrise." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>Alarms anchored to sunrise and sunset, each repeating every day.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-day">
            <h2 id="section-day">A day that follows the sun — and a clock</h2>
            <p>Here is the day I actually run, on my own phone:</p>
            <table className="timing-table" aria-label="A day built from sun-anchored alarms and clock alarms">
              <thead>
                <tr><th>Moment</th><th>Alarm</th><th>Days</th></tr>
              </thead>
              <tbody>
                <tr><td>Wake up</td><td>Sunrise</td><td>Mon–Fri</td></tr>
                <tr><td>Start of work, or the weekend wake-up</td><td>09:00</td><td>every day</td></tr>
                <tr><td>Lunch</td><td>1 h before Noon — solar noon, rarely 12:00</td><td>every day</td></tr>
                <tr><td>Back to it</td><td>1 h after Noon</td><td>Mon–Fri</td></tr>
                <tr><td>Stop</td><td>18:00</td><td>Mon–Fri</td></tr>
              </tbody>
            </table>
            <p>There is a sixth, eight hours before sunrise, to start winding down. It is switched off at the moment — the middle position of the switch keeps an alarm without letting it ring.</p>
            <p>That's six alarms, one of them off — more than the free three.</p>
            <p>The sun-anchored ones follow the light; the clock ones hold the things other people expect of you. Both live in the same list, and each card says which is which.</p>
            <p>How far this goes depends on where you live. In Sydney, sunrise moves by about an hour across the year and a sun-anchored day barely drifts. In London it moves by more than three, so the morning follows the sun while the working hours stay on the clock.</p>
          </section>

          <section aria-labelledby="section-late">
            <h2 id="section-late">When sunrise comes too late</h2>
            <p>In midwinter, sunrise arrives after the working day has begun — 08:03 in London on 21 December. Two ways round it:</p>
            <ul>
              <li><strong>Wake at first light instead.</strong> Light comes well before the sun does. In Settings → Anchors, make your own anchor at <strong>civil dawn</strong> — the point where there is enough light to see outdoors without a lamp — and set your alarm on that. <a href="/alarms/#section-custom" className="content-link">Custom sun angles and twilight anchors</a></li>
              <li><strong>Keep both kinds of alarm</strong>, as above: the clock for the days that start at a fixed hour, the sun for the rest.</li>
            </ul>

            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/circadian-offset--dark.webp 1x, /assets/screenshots/circadian-offset--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/circadian-offset.webp 1x, /assets/screenshots/circadian-offset@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/circadian-offset--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/circadian-offset.png" alt="The new-alarm dialog set on Sunrise with an offset of eight hours before, showing the line Today: 23:02." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>Any distance from the anchor, before or after, up to 11 h 59 min.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-privacy">
            <h2 id="section-privacy">An alarm, not a sleep tracker</h2>
            <p>Risetime does not track your sleep. It does not record when you dismiss an alarm, it has no account, no cloud and no analytics. It has <strong>no internet permission at all</strong>, so the operating system itself stops it from connecting: sunrise times are computed on your phone, and your location never leaves it. That is also why it works in airplane mode, in a valley, on a boat. <a href="/privacy/" className="content-link">Privacy policy</a></p>
            <p>Risetime is free for up to three alarms and three timers — for good. Need more? Use those three first, and see if it's worth your support: supporters get unlimited alarms and timers, yearly or once. If not, I'll be happy to <a href="mailto:contact@risetime.app">hear you out</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Wake with the sun. Keep the clock for the rest.</h2>
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

        <SiteFooter />
    </div>
  )
}
