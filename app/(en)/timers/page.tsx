import type { Metadata } from 'next'
import { enMetadata } from '../../../lib/metadata'
import SiteHeader from '../../../components/SiteHeader'
import SiteFooter from '../../../components/SiteFooter'

// 9-24 — la page minuteurs ouvre sur la répétition. Réécriture sur site/nextjs
// (main est gelée). L'URL /timers/ ne bouge pas : elle est indexée.
//
// Vocabulaire tranché par la story, et vérifiable au grep (AC 4, 5, 6) :
//  - « loop timer » : OUI, c'est le nom de la chose.
//  - « interval » : OUI, en nom commun seulement. La LOCUTION avec « timer »
//    accolé est INTERDITE partout dans ce fichier — elle désigne dans l'usage
//    courant deux phases alternées, que l'app ne sait pas faire.
//  - « Repeat » : le nom exact de la case. « Stop loop » : celui du bouton.
//  - Deux autres mots sont proscrits par l'AC 5 (la tomate italienne du
//    découpage travail/pause, et le terme interne pour la cloche brève). Ils
//    ne sont pas écrits ici non plus : l'AC grepe le fichier entier, commentaire
//    compris.

// 9-31 — les chaînes de cette page vivent dans content/en/timers.md, en UN seul
// exemplaire. `enMetadata` y lit title/description/og et y ajoute les
// `hreflang` dérivés de LOCALES : une langue qui entre change le jeu
// d'alternates de CETTE page sans que ce fichier soit rouvert.
export const metadata: Metadata = enMetadata('/timers/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "A Timer That Starts Itself Again",
  "description": "The loop timer in Risetime: one duration, restarted at a fixed interval whose cycles stay in phase, with a Stop loop button to end it — plus the ordinary countdowns every clock app has.",
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

        <SiteHeader current="/timers/" />

        <div className="page-header">
          <h1>A Timer That Starts Itself Again</h1>
          <p className="subtitle">Set the interval once and it keeps going — plus everything a clock app's timer already does.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-loop">
            <h2 id="section-loop">It starts itself again</h2>
            <p>This is the part your phone's clock app probably does not do. Open a timer's row with the chevron and tick <strong>Repeat</strong>, and it becomes a <strong>loop timer</strong>: it reaches zero, rings briefly, then starts again for the same duration, until you stop the loop. What you set once is the <strong>interval</strong>.</p>
            <p>The cycles are anchored to when each one was <em>due</em>, not to when you silenced it: thirty minutes repeated twice is sixty minutes, not sixty-one. Otherwise every bell you let run would stretch the rest of the day.</p>

            <div className="highlight-box">
              <p>By default a cycle rings for <strong>five seconds</strong>, with your system's notification sound rather than an alarm sound. Both are yours to change. There is no &ldquo;never&rdquo; option for that window — a bell with no end would stall the loop at its first cycle.</p>
            </div>

            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/timer-list--dark.webp 1x, /assets/screenshots/timer-list--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/timer-list.webp 1x, /assets/screenshots/timer-list@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/timer-list--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/timer-list.png" alt="Risetime timers list with three countdowns: 3:00 and 10:00 both stopped, each with a play button and a reset button, and a longer one still running with a pink repeat badge, a pause button and a +1:00 button. The Alarms, Timers and Settings tabs run along the bottom." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>Three timers, sorted by duration. The pink badge marks the one set to repeat.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-ending">
            <h2 id="section-ending">Ending the loop</h2>
            <p>A loop ends on a button called <strong>Stop loop</strong>: on the ringing screen, and on the ringing notification too, beside <strong>Continue</strong> and the button that adds time.</p>
            <p>Unticking <strong>Repeat</strong> while a timer is ringing gives you one more cycle before it stops: the setting is read once per cycle, at the moment the bell starts.</p>
            <p>The ringing screen comes up at every cycle and goes away by itself when the five seconds are over — nothing to tap, nothing to dismiss between cycles.</p>
          </section>

          <section aria-labelledby="section-ordinary">
            <h2 id="section-ordinary">And the ordinary countdowns</h2>
            <p>The rest is what a clock app's timer already does. Tap the plus and you get a full-screen keypad rather than a dial: type the digits and they fill from the right, the way a microwave does. Four, zero, zero gives you four minutes, and six digits take you up to <strong>ninety-nine hours</strong>.</p>
            <p>Timers sit in a list sorted by how long they were set for, shortest first, rather than by the order you made them. They run in parallel — several independent countdowns at once, looping or not.</p>
            <p>Each row carries pause, and a <strong>+1:00</strong> button that adds time to whatever is left — a minute unless you change it in Settings. Pause a timer and that button becomes a reset. The chevron opens the row for <strong>Repeat</strong> and delete.</p>
          </section>

          <section aria-labelledby="section-notification">
            <h2 id="section-notification">The notification counts on its own</h2>
            <p>The countdown in your notification shade is drawn by Android itself rather than repainted by the app. It keeps ticking with no Risetime process alive at all.</p>
            <p>There is one card for whatever is running or paused, and one for whatever is ringing — exactly two, never one per timer stacking up in the shade.</p>
            <p>Swiping that card away stops nothing: it comes straight back from live state, and a ringing timer keeps ringing. Stopping is always a deliberate button.</p>
          </section>

          <section aria-labelledby="section-settings">
            <h2 id="section-settings">Its own sound, its own volume</h2>
            <p>Timers do not borrow your alarm's settings, and a looping timer does not borrow the one-shot one either: two profiles, picked on whether Repeat is on. Each carries its own sound, volume, ring length and optional fade-in.</p>
            <p>The two ring lengths are on deliberately different scales. In a loop: <strong>5, 10, 15, 30, 60 or 120 seconds</strong>. For a one-shot timer: <strong>1, 5, 10, 15, 20 or 25 minutes, or never</strong>.</p>
            <p>No audio ships with the app: the sounds are your system's, or a file of your own. Two settings stay shared rather than doubled — whether timers vibrate, and what the volume keys do while a timer is ringing.</p>
          </section>

          <section aria-labelledby="section-not">
            <h2 id="section-not">What it will not do</h2>
            <p>It is a countdown timer and a loop, nothing more:</p>
            <ul>
              <li><strong>No work/rest alternation.</strong> A loop has one duration; thirty seconds on and thirty seconds off is two, and no screen builds a timer out of several.</li>
              <li><strong>No chime partway through a session</strong> — a thirty-minute sit cannot sound at ten and at twenty.</li>
              <li><strong>No time window, no quiet hours.</strong> A loop runs until you stop it.</li>
              <li><strong>No chime on the hour.</strong> The interval runs from the moment you started it.</li>
            </ul>
          </section>

          <section aria-labelledby="section-setup">
            <h2 id="section-setup">Setting one up</h2>
            <p>Open the Timers tab, tap the plus, type the duration. It starts on its own — there is nothing to name and nothing to file. To make it loop, tick <strong>Repeat</strong> behind the chevron.</p>
            <p>The <a href="/alarms/" className="content-link">alarms guide</a> covers the alarms, which share the same reliability settings.</p>
          </section>

          <section aria-labelledby="section-price">
            <h2 id="section-price" className="sr-only">What it costs</h2>
            <p>Risetime is free for up to three timers, the same count as its alarms — for good. Reach it and the add button is simply absent: no dialog, no padlock, no banner naming what you are missing. If your support lapses nothing is deleted: every timer you made keeps working, you just cannot add another. Need more than three? See if it's worth your support — if not, I'll be happy to <a href="mailto:contact@risetime.app">hear you out</a>.</p>
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

        <SiteFooter page="/timers/" />
    </div>
  )
}
