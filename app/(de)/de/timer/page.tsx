import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// DIE DEUTSCHE TIMER-SEITE, VON HAND GESCHRIEBEN — Entscheidung des Auftraggebers
// vom 2026-09-27: eine übersetzte Seite trägt ALLES, was die englische trägt,
// ihre Screenshots und strukturierten Daten eingeschlossen, auf derselben Seite: dem JSX.
//
// ⚠️ IHRE KOPFZEILEN-STRINGS LEBEN IN content/de/timers.md, in EINEM Exemplar.
// `langMetadata` liest dort Titel, Beschreibung und og, fügt das DEUTSCHE
// canonical (/de/timer/, abgeleitet aus `slug:`) und die hreflang hinzu. ⛔ Der
// hier übergebene SCHLÜSSEL bleibt der der ENGLISCHEN Seite, `/timers/`: das ist
// die Identität der Seite, nicht ihre URL.
//
// ⛔ `de` steht in `STATIC_LOCALES` (lib/pages.ts): die dynamische Route
// `app/[lang]/` erzeugt diese URL daher NICHT.
//
// Wortwahl, festgelegt und nicht verhandelbar: die Sache heißt „wiederholender
// Timer“, was sie tut, ist eine „Wiederholung“, und ihre Runden sind „Zyklen“.
// Die gängige Wendung, die „Timer“ mit dem Namen des Zeitschritts zusammenzieht,
// ist hier wie in der englischen Seite AUSGESCHLOSSEN: Sie bezeichnet im Alltag
// zwei sich abwechselnde Phasen, die die App nicht kennt. Das einfache Wort
// allein bleibt richtig — genau das stellt man ja einmal ein.
export const metadata: Metadata = langMetadata('de', '/timers/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Ein Timer, der von selbst neu startet",
  "description": "Der wiederholende Timer von Risetime: eine Dauer, in festem Abstand neu gestartet, deren Zyklen in Phase bleiben, mit einer Schaltfläche Schleife beenden, um sie zu stoppen — und die gewöhnlichen Timer, die jede Uhr kann.",
  "inLanguage": "de",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/de/timer/"
},
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "inLanguage": "de",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Risetime",
      "item": "https://risetime.app/de/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Timer",
      "item": "https://risetime.app/de/timer/"
    }
  ]
}
]

export default function TimerPage() {
  return (
    <div className="layout-narrow">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <a href="#main-content" className="skip-link">Zum Hauptinhalt springen</a>

        <SiteHeader current="/timers/" lang="de" />

        <div className="page-header">
          <h1>Ein Timer, der von selbst neu startet</h1>
          <p className="subtitle">Stellen Sie die Dauer einmal ein, und es geht weiter — plus alles, was der Timer einer Uhr ohnehin schon kann.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-loop">
            <h2 id="section-loop">Er startet von selbst neu</h2>
            <p>Das ist der Teil, den die Uhr Ihres Telefons vermutlich nicht kann. Öffnen Sie die Zeile eines Timers über den Pfeil und aktivieren Sie <strong>Wiederholen</strong>: Er wird zu einem <strong>wiederholenden Timer</strong>. Er läuft auf null, klingelt kurz, und startet dann für dieselbe Dauer neu, bis Sie die Wiederholung stoppen. Was Sie einmal einstellen, ist der Abstand zwischen zwei Klingelzeichen.</p>
            <p>Jeder Zyklus ist an dem Zeitpunkt verankert, an dem der vorherige <em>fällig wurde</em>, nicht an dem, an dem Sie ihn zum Schweigen gebracht haben: dreißig Minuten, zweimal wiederholt, ergeben sechzig Minuten, nicht einundsechzig. Sonst würde jedes durchlaufen gelassene Klingeln den Rest des Tages verschieben.</p>

            <div className="highlight-box">
              <p>Standardmäßig klingelt ein Zyklus <strong>fünf Sekunden</strong>, mit dem Benachrichtigungston Ihres Systems statt einem Weckton. Beides gehört Ihnen. Es gibt keine Option „nie“ für diese Dauer: ein endloses Klingeln würde die Wiederholung schon bei ihrem ersten Zyklus blockieren.</p>
            </div>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/de/timer-list"
                darkBase="/assets/screenshots/de/timer-list--dark"
                alt="Timerliste von Risetime mit drei Countdowns: 3:00 und 10:00 beide gestoppt, jeweils mit einer Start- und einer Zurücksetzen-Schaltfläche, und ein längerer noch laufend, mit einem rosa Wiederholungs-Symbol, einer Pause-Schaltfläche und einer +1:00-Schaltfläche. Die Tabs Wecker, Timer und Einstellungen laufen am unteren Bildschirmrand."
                width={360}
                height={706}
              />
              <figcaption>Drei Timer, nach Dauer sortiert. Das rosa Symbol zeigt den, der auf Wiederholung gestellt ist.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-ending">
            <h2 id="section-ending">Die Schleife beenden</h2>
            <p>Eine Wiederholung wird über eine Schaltfläche namens <strong>Schleife beenden</strong> gestoppt: auf dem Klingelbildschirm, und auch auf der Klingel-Benachrichtigung, neben <strong>Weiter</strong> und der Schaltfläche, die Zeit hinzufügt.</p>
            <p>Wenn Sie <strong>Wiederholen</strong> deaktivieren, während ein Timer klingelt, bleibt Ihnen noch ein Zyklus vor dem Stopp: die Einstellung wird einmal pro Zyklus gelesen, in dem Moment, in dem das Klingeln beginnt.</p>
            <p>Der Klingelbildschirm erscheint bei jedem Zyklus und verschwindet nach den fünf Sekunden von selbst — nichts zu tippen, nichts zwischen zwei Zyklen wegzuwischen.</p>
          </section>

          <section aria-labelledby="section-ordinary">
            <h2 id="section-ordinary">Und die gewöhnlichen Timer</h2>
            <p>Der Rest ist, was der Timer einer Uhr ohnehin schon kann. Tippen Sie auf das Plus, und Sie erhalten eine Vollbild-Tastatur statt eines Ziffernblatts: Tippen Sie die Ziffern, sie füllen sich von rechts, wie bei einer Mikrowelle. Vier, null, null ergibt vier Minuten, und sechs Ziffern führen Sie bis zu <strong>neunundneunzig Stunden</strong>.</p>
            <p>Die Timer ordnen sich in einer Liste, die nach der eingestellten Dauer sortiert ist, der kürzeste zuerst, nicht in der Reihenfolge, in der Sie sie erstellt haben. Sie laufen parallel — mehrere unabhängige Countdowns gleichzeitig, wiederholend oder nicht.</p>
            <p>Jede Zeile trägt die Pause und eine Schaltfläche <strong>+1:00</strong>, die der verbleibenden Zeit etwas hinzufügt — eine Minute, sofern Sie das nicht in den Einstellungen ändern. Setzen Sie einen Timer auf Pause, und diese Schaltfläche wird zu einer Zurücksetzen-Schaltfläche. Der Pfeil öffnet die Zeile auf <strong>Wiederholen</strong> und auf das Löschen.</p>
          </section>

          <section aria-labelledby="section-notification">
            <h2 id="section-notification">Die Benachrichtigung zählt von selbst herunter</h2>
            <p>Der Countdown in Ihrem Benachrichtigungsfeld wird von Android selbst gezeichnet, nicht von der App neu gemalt. Er läuft weiter, ganz ohne einen laufenden Prozess von Risetime.</p>
            <p>Es gibt eine Karte für das, was läuft oder pausiert ist, und eine für das, was klingelt — genau zwei, nie eine pro Timer, die sich im Benachrichtigungsfeld stapeln.</p>
            <p>Diese Karte wegzuwischen stoppt nichts: Sie kehrt sofort zurück, aus dem tatsächlichen Zustand neu aufgebaut, und ein klingelnder Timer klingelt weiter. Der Stopp läuft immer über eine Schaltfläche, ganz bewusst.</p>
          </section>

          <section aria-labelledby="section-settings">
            <h2 id="section-settings">Eigener Ton, eigene Lautstärke</h2>
            <p>Die Timer übernehmen nicht die Einstellungen Ihrer Wecker, und ein wiederholender Timer übernimmt auch nicht die des einmaligen Timers: zwei Profile, gewählt je nachdem, ob Wiederholen aktiviert ist oder nicht. Jedes trägt seinen Ton, seine Lautstärke, seine Klingeldauer und seine optionale Lautstärkesteigerung.</p>
            <p>Die beiden Klingeldauern liegen bewusst auf unterschiedlichen Skalen. Bei Wiederholung: <strong>5, 10, 15, 30, 60 oder 120 Sekunden</strong>. Bei einem einmaligen Timer: <strong>1, 5, 10, 15, 20 oder 25 Minuten, oder nie</strong>.</p>
            <p>Mit der App wird kein Ton mitgeliefert: Die Töne sind die Ihres Systems, oder eine eigene Datei. Zwei Einstellungen bleiben gemeinsam statt verdoppelt — ob die Timer vibrieren, und was die Lautstärketasten tun, während ein Timer klingelt.</p>
          </section>

          <section aria-labelledby="section-not">
            <h2 id="section-not">Was er nicht kann</h2>
            <p>Es ist ein Countdown und eine Wiederholung, nicht mehr:</p>
            <ul>
              <li><strong>Kein Wechsel zwischen Arbeit und Pause.</strong> Eine Wiederholung hat nur eine Dauer; dreißig Sekunden Anstrengung und dann dreißig Erholung ergeben zwei, und kein Bildschirm setzt einen Timer aus mehreren zusammen.</li>
              <li><strong>Keine Erinnerung mitten in einer Sitzung</strong> — eine Sitzung von dreißig Minuten kann nicht bei zehn und dann bei zwanzig klingeln.</li>
              <li><strong>Keine Zeitspanne, keine ruhigen Stunden.</strong> Eine Wiederholung läuft, bis Sie sie stoppen.</li>
              <li><strong>Kein Klingeln zur vollen Stunde.</strong> Die Zählung beginnt in dem Moment, in dem Sie sie gestartet haben.</li>
            </ul>
          </section>

          <section aria-labelledby="section-setup">
            <h2 id="section-setup">Einen einstellen</h2>
            <p>Öffnen Sie den Tab Timer, tippen Sie auf das Plus, geben Sie die Dauer ein. Er startet von selbst — nichts zu benennen, nichts einzusortieren. Damit er sich wiederholt, aktivieren Sie <strong>Wiederholen</strong> hinter dem Pfeil.</p>
            <p>Der <a href="/de/wecker/" className="content-link">Wecker-Leitfaden</a> behandelt die Wecker, die dieselben Zuverlässigkeitseinstellungen teilen.</p>
          </section>

          <section aria-labelledby="section-price">
            <h2 id="section-price" className="sr-only">Was es kostet</h2>
            <p>Risetime ist kostenlos bis zu drei Timern, dasselbe Kontingent wie bei den Weckern — für immer. Ist die Grenze erreicht, fehlt einfach die Hinzufügen-Schaltfläche: kein Dialogfeld, kein Schloss, kein Banner, das benennt, was Ihnen fehlt. Endet Ihre Unterstützung, wird nichts gelöscht: Jeder von Ihnen erstellte Timer läuft weiter, Sie können nur keine neuen mehr hinzufügen. Brauchen Sie mehr als drei? Sehen Sie, ob es Ihre Unterstützung wert ist — andernfalls lese ich Sie gerne <a href="mailto:contact@risetime.app">direkt</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Die Dauer einmal einstellen. Er hält den Takt.</h2>
            <a className="play-badge" href="https://play.google.com/apps/testing/com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Am offenen Test von Risetime auf Google Play teilnehmen">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Offener Test</span>
            </a>
            <p className="cta-note">Risetime befindet sich im offenen Test: Sie treten zuerst dem Test bei und installieren dann über Play. Ohne diesen Schritt teilt Play Ihnen unter Umständen mit, dass die App in Ihrem Land nicht verfügbar ist.</p>
          </div>

        </main>

        <SiteFooter page="/timers/" lang="de" />
    </div>
  )
}
