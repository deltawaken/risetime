import type { Metadata } from 'next'
import SiteHeader from '../../../components/SiteHeader'
import SiteFooter from '../../../components/SiteFooter'

// Porté depuis alarms/index.html (commit 967c17d) — recopie, pas réécriture.
// Voir le rapport de portage : references/nextjs-port-report.md

export const metadata: Metadata = {
  title: "How to Set a Sunrise or Sunset Alarm on Android | Risetime",
  description: "Set an Android alarm for sunrise, sunset or solar noon — or 1 hour before sunset. It shifts with the sun every day, by itself. Works offline, no ads.",
  alternates: { canonical: "/alarms/" },
  openGraph: { title: "How to Set a Sunrise or Sunset Alarm on Android", description: "Set an alarm on sunrise, sunset or any moment of the sun, with an offset like \"1 hour before sunset\". It follows the sun every day, offline.", type: "article", url: "/alarms/" },
}

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to set a sunrise or sunset alarm on Android",
  "description": "How to set an Android alarm on sunrise, sunset, solar noon or a sun angle you choose, with an offset such as 1 hour before sunset, using Risetime. The alarm follows the sun every day, offline.",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/alarms/"
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
      "name": "Alarms",
      "item": "https://risetime.app/alarms/"
    }
  ]
}
]

export default function AlarmsPage() {
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

        <SiteHeader current="/alarms/" />

        <div className="page-header">
          <h1>How to set a sunrise or sunset alarm on Android</h1>
          <p className="subtitle">A Risetime alarm is set like any other alarm, in a few seconds. The difference is what you can set it on.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-intro">
            <h2 id="section-intro" className="sr-only">Alarms that follow the sun</h2>
            <p>Instead of a clock time, you can set an alarm on a moment of the sun — sunrise, sunset, solar noon. The alarm then follows that moment every day, as the seasons move it.</p>

            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/alarms-list--dark.webp 1x, /assets/screenshots/alarms-list--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-list.webp 1x, /assets/screenshots/alarms-list@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-list--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/alarms-list.png" alt="Risetime alarm list with five alarms: 05:10 on Saturday on Astronomical dawn, a custom anchor; 07:00 Monday to Friday on Absolute, a fixed time; 07:02 Tomorrow at Sunrise; 17:38 Monday to Friday, 1 hr before Sunset; and 23:02 Today, 8 hr before Sunrise, switched off." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>Regular alarms and sun alarms, in one list.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-regular">
            <h2 id="section-regular">Set a regular alarm</h2>
            <ol>
              <li>On the <strong>Alarms</strong> tab, press <strong>+</strong>.</li>
              <li>Set the time on the dial, or type it.</li>
              <li>Press <strong>OK</strong>.</li>
            </ol>
            <p>That's a regular alarm, and it doesn't need anything else.</p>
          </section>

          <section aria-labelledby="section-sun">
            <h2 id="section-sun">Set an alarm for sunrise or sunset</h2>
            <p>Risetime knows four moments of the sun out of the box: <strong>Sunrise</strong>, <strong>Sunset</strong>, <strong>Noon</strong> — solar noon, when the sun is at its highest, which is rarely 12:00 — and <strong>Nadir</strong>, the middle of the night, when the sun is at its lowest.</p>
            <ol>
              <li>
                <strong>The first time, set your location.</strong> Sun times depend on where you are. Without a location, the alarm dialog simply says <em>Set location in Settings</em>.
                <details>
                  <summary>Three ways to set it</summary>
                  <p>In <strong>Settings → Celestial events location</strong>: pick your city from the list; or use your phone's GPS, once; or turn on <strong>Auto-update location</strong>, and it follows you when you travel. Your position stays on your phone: Risetime has no internet permission, so there is nowhere to send it.</p>
                  <figure className="content-screenshot">
                    <picture>
                      <source srcSet="/assets/screenshots/alarms-location--dark.webp 1x, /assets/screenshots/alarms-location--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                      <source srcSet="/assets/screenshots/alarms-location.webp 1x, /assets/screenshots/alarms-location@2x.webp 2x" type="image/webp" />
                      <source srcSet="/assets/screenshots/alarms-location--dark.png" media="(prefers-color-scheme: dark)" />
                      <img src="/assets/screenshots/alarms-location.png" alt="Risetime settings with the Celestial events location section open: London, United Kingdom selected, a GPS button, and an unticked Auto-update location box." width="360" height="706" loading="lazy" />
                    </picture>
                    <figcaption>The location setting, with its GPS button and auto-update box.</figcaption>
                  </figure>
                </details>
              </li>
              <li>On the <strong>Alarms</strong> tab, press <strong>+</strong>.</li>
              <li>In the menu at the top, pick <strong>Sunrise</strong>, <strong>Sunset</strong>, <strong>Noon</strong> or <strong>Nadir</strong>.</li>
              <li>On the dial, set how long before or after it the alarm rings — or leave it at <em>No offset</em>.</li>
              <li>Press <strong>OK</strong>.</li>
            </ol>

            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/alarms-anchor-menu--dark.webp 1x, /assets/screenshots/alarms-anchor-menu--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-anchor-menu.webp 1x, /assets/screenshots/alarms-anchor-menu@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-anchor-menu--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/alarms-anchor-menu.png" alt="The new-alarm dialog with its anchor menu open: Absolute, Astronomical dawn, Sunrise, Noon, Golden hour, Sunset and Nadir." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>The menu at the top of the alarm dialog: a clock time, or a moment of the sun.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-offset">
            <h2 id="section-offset">The offset: "1 hour before sunset"</h2>
            <p><strong>An anchor is a moment of the sun that Risetime recomputes every day; your alarm stays at a fixed distance from it.</strong> That distance is the offset, up to 11 h 59 min before or after. The sun moment moves a little every day; the offset you chose does not.</p>
            <ul>
              <li><strong>Sunrise</strong>, no offset — with the first light of the sun.</li>
              <li><strong>30 min before Sunrise</strong> — up before the light.</li>
              <li><strong>1 h before Sunset</strong> — a sunset alarm that leaves you time to head out while there is still daylight.</li>
              <li><strong>8 h before Sunrise</strong> — <a href="/circadian-rhythm-alarm/" className="content-link">a bedtime reminder that follows the sun</a>.</li>
            </ul>
            <p>A line under the dial shows the next ring, for example <em>Tomorrow: 18:03</em>.</p>

            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/alarms-offset--dark.webp 1x, /assets/screenshots/alarms-offset--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-offset.webp 1x, /assets/screenshots/alarms-offset@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-offset--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/alarms-offset.png" alt="The new-alarm dialog set on Sunset with an offset of one hour before, the hours dial on 1 and the minutes on 00, and the line Today: 17:38." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>One hour before sunset. The line under the offset says when it rings next.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-days">
            <h2 id="section-days">Repeat days, sound and snooze</h2>
            <p>Open the alarm's card in the list. Tick <strong>Repeat</strong> and choose your days, and the card reads the way you would say it: <em>Monday–Friday, 1h before Sunset</em>. The same card holds the label, the sound, vibration, snooze length and the image shown while it rings. The switch has three positions: the middle one skips only the next ring — for a day off — and keeps the alarm on.</p>

            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/alarms-card--dark.webp 1x, /assets/screenshots/alarms-card--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-card.webp 1x, /assets/screenshots/alarms-card@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-card--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/alarms-card.png" alt="An open alarm card for 17:38, Monday to Friday, 1 hr before Sunset: an empty Label field, Repeat with Monday to Friday selected, Sound set to Phone default, and Vibrate on. The card carries on below the edge of the image." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>An open alarm card: repeat days and everything else about the alarm.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-custom">
            <h2 id="section-custom">Custom anchors: twilight, sun angles, shadows</h2>
            <p>The sun marks more moments than four. You can make your own, of three kinds:</p>
            <ul>
              <li><strong>A solar angle</strong> — the moment the sun reaches a given height above or below the horizon, in the morning or the evening. −6° is civil dawn or dusk, −12° nautical, −18° astronomical: full night. +6° in the evening is low, warm light.</li>
              <li><strong>A shadow length</strong> — the moment an object's shadow reaches a given multiple of its height, before or after noon.</li>
              <li><strong>A fraction of the day or night</strong> — the night (sunset to sunrise) or the day, cut into equal parts; you choose how many, and which boundary. The last sixth of the night, for example, starts at the same point of the night whatever its length that season.</li>
            </ul>
            <p>To create one:</p>
            <ol>
              <li>Open <strong>Settings → Anchors</strong>, then press <strong>+</strong>.</li>
              <li>Choose the kind, and set its value.</li>
              <li>Give it a name, or keep the automatic one.</li>
              <li>Pick a colour — <strong>Save</strong> waits for one.</li>
              <li>Press <strong>Save</strong>.</li>
            </ol>
            <p>It now appears in the alarm dialog next to Sunrise and Sunset, and takes an offset like any other. A switch in the anchor list hides the ones you don't use from that menu.</p>

            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/alarms-anchors--dark.webp 1x, /assets/screenshots/alarms-anchors--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-anchors.webp 1x, /assets/screenshots/alarms-anchors@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-anchors--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/alarms-anchors.png" alt="Settings, Anchors section: two custom anchors, Astronomical dawn and Golden hour, each with an edit and a delete button, among the factory anchors Sunrise, Noon, Sunset and Nadir. Every row carries a visibility switch, all of them on." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>A custom anchor takes its place among the others, in the order of the day.</figcaption>
            </figure>

            <p>An anchor can also be <strong>calibrated</strong> — shifted by up to 30 minutes so it matches a timetable you follow, such as a local calendar.</p>
            <p>Far from the equator, some angles are never reached for part of the year. The editor tells you the dates — in London, the sun does not sink to −18° from late May to late July — and on those days the alarm stays silent rather than ring at an invented time.</p>

            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/alarms-anchor-editor--dark.webp 1x, /assets/screenshots/alarms-anchor-editor--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-anchor-editor.webp 1x, /assets/screenshots/alarms-anchor-editor@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-anchor-editor--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/alarms-anchor-editor.png" alt="The anchor editor on A solar angle, set to −18.0° in the morning, named Astronomical dawn, with the preview: Next: 05:10. The sun does not reach this angle here from May 23, 2027 to July 21, 2027." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>−18° in the morning, set for London: the editor names the weeks it never happens.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-calculation">
            <h2 id="section-calculation">How sunrise and sunset times are calculated, offline</h2>
            <p>Every sunrise and sunset time is computed on the device by an astronomical library, <a href="https://shredzone.org/maven/commons-suncalc/" className="content-link">commons-suncalc</a>, based on Jean Meeus' <em>Astronomical Algorithms</em>. Sunrise and sunset are measured for the sun's upper edge, with atmospheric refraction — what your eyes see; solar angles for the sun's centre, the convention twilight tables use. No web lookup, no server: it works in airplane mode, at sea, or in a valley without signal.</p>
            <p>Risetime doesn't run all the time. It recalculates after an alarm rings, during a short check every few hours, or when the phone restarts or its clock or time zone changes; Android's own alarm clock — the one your built-in clock app uses — does the rest.</p>
          </section>

          <section aria-labelledby="section-reliability">
            <h2 id="section-reliability">Make sure it rings</h2>
            <p>Some phones stop apps in the background to save battery, and that can silence any alarm. <strong>Settings → Reliability</strong> checks what your phone needs and gives each missing item a <strong>Fix</strong> button. After a restart, alarms ring even before you first unlock the phone.</p>
          </section>

          <section aria-labelledby="section-timers">
            <h2 id="section-timers">Timers, too</h2>
            <p>The <strong>Timers</strong> tab holds countdown timers, including ones that restart themselves for intervals and study blocks: <a href="/timers/" className="content-link">how the repeating timers work</a>.</p>
            <p>Risetime is free for up to three alarms and three timers — for good. Need more? Use those three first, and see if it's worth your support: supporters get unlimited alarms and timers, yearly or once. If not, I'll be happy to <a href="mailto:contact@risetime.app">hear you out</a>.</p>
          </section>

          <section aria-labelledby="section-guides">
            <h2 id="section-guides">Guides for specific uses</h2>
            <ul>
              <li><a href="/circadian-rhythm-alarm/" className="content-link">A wake-up and bedtime rhythm that follows sunrise</a></li>
              <li><a href="/golden-hour-alarm/" className="content-link">Golden hour, blue hour and the night sky, for photographers and astronomers</a></li>
              {/* Add the Muslim prayer times and morning practice guides here once those pages are published. */}
            </ul>
          </section>

          <div className="cta-section">
            <h2>Set it once. It follows the sun.</h2>
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
