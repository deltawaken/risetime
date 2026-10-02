import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// DIE DEUTSCHE SEITE, VON HAND GESCHRIEBEN — Entscheidung des Auftraggebers vom
// 2026-09-27: „on ne fait plus de markdown […] tu vas juste bien gentiment tout
// traduire toi-même“. Eine übersetzte Seite trägt daher ALLES, was die englische
// trägt, ihr Mobiliar eingeschlossen, auf derselben Seite wie sie: dem JSX.
//
// ⚠️ IHRE KOPFZEILEN-STRINGS LEBEN IN content/de/alarms.md, in EINEM Exemplar,
// genau wie bei der englischen Seite in content/en/. `langMetadata` liest dort
// Titel, Beschreibung und og, fügt das DEUTSCHE canonical und die hreflang hinzu,
// und setzt `noindex` im Preview-Build.
//
// ⛔ DER SEITEN-SCHLÜSSEL BLEIBT ENGLISCH, `/alarms/` — das ist die Identität der
// Seite im Register (lib/pages.ts), keine URL. Der deutsche Slug `wecker` lebt in
// der Kopfzeile von content/de/alarms.md, und er bestimmt die URL.
//
// ⛔ `de` steht in `STATIC_LOCALES` (lib/pages.ts): die dynamische Route
// `app/[lang]/` erzeugt diese URL daher NICHT.
export const metadata: Metadata = langMetadata('de', '/alarms/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Einen Wecker zum Sonnenaufgang oder Sonnenuntergang stellen (Android)",
  "description": "Wie Sie einen Android-Wecker auf Sonnenaufgang, Sonnenuntergang, Sonnenmittag oder einen selbst gewählten Sonnenwinkel stellen, mit einem Versatz wie „1 Stunde vor Sonnenuntergang“, mit Risetime. Der Wecker folgt der Sonne jeden Tag, offline.",
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
  "mainEntityOfPage": "https://risetime.app/de/wecker/"
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
      "name": "Wecker",
      "item": "https://risetime.app/de/wecker/"
    }
  ]
}
]

export default function WeckerPage() {
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

        <SiteHeader current="/alarms/" lang="de" />

        <div className="page-header">
          <h1>Wie Sie einen Wecker zum Sonnenaufgang oder Sonnenuntergang stellen (Android)</h1>
          <p className="subtitle">Ein Risetime-Wecker wird wie jeder andere in wenigen Sekunden gestellt. Was sich ändert, ist, worauf Sie ihn stellen können.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-intro">
            <h2 id="section-intro" className="sr-only">Wecker, die der Sonne folgen</h2>
            <p>Statt einer Uhrzeit können Sie einen Wecker auf einen Sonnenstand stellen — den Sonnenaufgang, den Sonnenuntergang, den Sonnenmittag. Der Wecker folgt diesem Zeitpunkt danach jeden Tag, während die Jahreszeiten ihn verschieben.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/de/alarms-list"
                darkBase="/assets/screenshots/de/alarms-list--dark"
                alt="Weckerliste von Risetime mit fünf Weckern: 05:10 am Samstag, Astronomische Morgendämmerung (ein eigener Anker); 07:00 von Montag bis Freitag, zu fester Uhrzeit; 07:02 morgen bei Sonnenaufgang; 17:38 von Montag bis Freitag, 1 Std. vor Sonnenuntergang; und 23:02 heute, 8 Std. vor Sonnenaufgang, ausgeschaltet."
                width={360}
                height={706}
              />
              <figcaption>Gewöhnliche Wecker und Solarwecker, in einer einzigen Liste.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-regular">
            <h2 id="section-regular">Einen gewöhnlichen Wecker stellen</h2>
            <ol>
              <li>Tippen Sie im Tab <strong>Wecker</strong> auf <strong>+</strong>.</li>
              <li>Stellen Sie die Uhrzeit am Ziffernblatt ein, oder geben Sie sie ein.</li>
              <li>Tippen Sie auf <strong>OK</strong>.</li>
            </ol>
            <p>Das ist ein gewöhnlicher Wecker, und er braucht nichts weiter.</p>
          </section>

          <section aria-labelledby="section-sun">
            <h2 id="section-sun">Einen Wecker zum Sonnenaufgang oder Sonnenuntergang stellen</h2>
            <p>Risetime kennt von Haus aus vier Sonnenstände: den <strong>Sonnenaufgang</strong>, den <strong>Sonnenuntergang</strong>, <strong>Mittag</strong> — den Sonnenmittag, wenn die Sonne am höchsten steht, was fast nie 12:00 ist — und den <strong>Nadir</strong>, die Mitte der Nacht, wenn die Sonne am tiefsten steht.</p>
            <ol>
              <li>
                <strong>Geben Sie beim ersten Mal Ihren Standort an.</strong> Die Sonnenzeiten hängen davon ab, wo Sie sich befinden. Ohne Standort zeigt das Weckerdialogfeld einfach <em>Standort in Einstellungen festlegen</em>.
                <details>
                  <summary>Drei Wege, ihn anzugeben</summary>
                  <p>Unter <strong>Einstellungen → Standort für Himmelsereignisse</strong>: Wählen Sie Ihre Stadt aus der Liste; oder nutzen Sie einmalig das GPS des Telefons; oder aktivieren Sie <strong>Standort automatisch aktualisieren</strong>, und er folgt Ihnen auf Reisen. Ihr Standort bleibt auf Ihrem Telefon: Risetime hat keine Internetberechtigung, es gibt also nirgendwohin, ihn zu senden.</p>
                  <figure className="content-screenshot">
                    <ThemedPicture
                      lightBase="/assets/screenshots/de/alarms-location"
                      darkBase="/assets/screenshots/de/alarms-location--dark"
                      alt="Die Einstellungen von Risetime, Abschnitt Standort für Himmelsereignisse geöffnet: London, Vereinigtes Königreich ausgewählt, eine GPS-Schaltfläche, und eine nicht angekreuzte Checkbox Standort automatisch aktualisieren."
                      width={360}
                      height={706}
                    />
                    <figcaption>Die Standorteinstellung, mit ihrer GPS-Schaltfläche und ihrer Checkbox für die automatische Aktualisierung.</figcaption>
                  </figure>
                </details>
              </li>
              <li>Tippen Sie im Tab <strong>Wecker</strong> auf <strong>+</strong>.</li>
              <li>Wählen Sie im oberen Menü <strong>Sonnenaufgang</strong>, <strong>Sonnenuntergang</strong>, <strong>Mittag</strong> oder <strong>Nadir</strong>.</li>
              <li>Stellen Sie am Ziffernblatt ein, wie lange vorher oder nachher der Wecker klingeln soll — oder belassen Sie es bei <em>Kein Versatz</em>.</li>
              <li>Tippen Sie auf <strong>OK</strong>.</li>
            </ol>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/de/alarms-anchor-menu"
                darkBase="/assets/screenshots/de/alarms-anchor-menu--dark"
                alt="Das Dialogfeld zum Erstellen eines Weckers, sein Anker-Menü geöffnet: Genau, Astronomische Morgendämmerung, Sonnenaufgang, Mittag, Goldene Stunde, Sonnenuntergang und Nadir."
                width={360}
                height={706}
              />
              <figcaption>Das Menü oben im Weckerdialogfeld: eine Uhrzeit, oder ein Sonnenstand.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-offset">
            <h2 id="section-offset">Der Versatz: „1 Stunde vor Sonnenuntergang“</h2>
            <p><strong>Ein Anker ist ein Sonnenstand, den Risetime jeden Tag neu berechnet; Ihr Wecker hält einen festen Abstand zu ihm.</strong> Dieser Abstand ist der Versatz, bis zu 11 Std. 59 Min. davor oder danach. Der Sonnenstand verschiebt sich jeden Tag ein wenig; der von Ihnen gewählte Versatz nie.</p>
            <ul>
              <li><strong>Sonnenaufgang</strong>, ohne Versatz — mit dem ersten Licht.</li>
              <li><strong>30 Min. vor Sonnenaufgang</strong> — vor dem Tag auf den Beinen.</li>
              <li><strong>1 Std. vor Sonnenuntergang</strong> — ein Feierabend-Wecker, der Ihnen noch Zeit lässt, bei Tageslicht rauszugehen.</li>
              <li><strong>8 Std. vor Sonnenaufgang</strong> — <a href="/de/zirkadianer-rhythmus-wecker/" className="content-link">eine Erinnerung fürs Zubettgehen, die der Sonne folgt</a>.</li>
            </ul>
            <p>Eine Zeile unter dem Ziffernblatt zeigt das nächste Klingeln an, zum Beispiel <em>Morgen: 18:03</em>.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/de/alarms-offset"
                darkBase="/assets/screenshots/de/alarms-offset--dark"
                alt="Das Dialogfeld zum Erstellen eines Weckers, eingestellt auf Sonnenuntergang mit einem Versatz von einer Stunde davor, der Stundenwähler auf 1 und der Minutenwähler auf 00, und die Zeile Heute: 17:38."
                width={360}
                height={706}
              />
              <figcaption>Eine Stunde vor Sonnenuntergang. Die Zeile unter dem Versatz sagt, wann er klingelt.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-days">
            <h2 id="section-days">Wiederholungstage, Ton und Schlummerdauer</h2>
            <p>Öffnen Sie die Weckerkarte in der Liste. Aktivieren Sie <strong>Wiederholen</strong> und wählen Sie Ihre Tage: Die Karte liest sich dann so, wie Sie es sagen würden — <em>Montag bis Freitag, 1 Std. vor Sonnenuntergang</em>. Dieselbe Karte trägt den Namen, den Ton, die Vibration, die Schlummerdauer und das während des Klingelns angezeigte Bild. Der Schalter hat drei Stellungen: die mittlere lässt nur das nächste Klingeln aus — für einen freien Tag — und lässt den Wecker aktiv.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/de/alarms-card"
                darkBase="/assets/screenshots/de/alarms-card--dark"
                alt="Eine geöffnete Weckerkarte für 17:38, von Montag bis Freitag, 1 Std. vor Sonnenuntergang: ein leeres Feld Name, das Kontrollkästchen Wiederholen angekreuzt mit den Tagen Mo bis Fr ausgewählt (Sa und So nicht), und Ton auf Telefonstandard. Die Karte setzt sich unter dem Bildrand fort."
                width={360}
                height={706}
              />
              <figcaption>Eine geöffnete Weckerkarte: die Wiederholungstage, und alles andere am Wecker.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-custom">
            <h2 id="section-custom">Eigene Anker: Dämmerungen, Sonnenwinkel, Schatten</h2>
            <p>Die Sonne markiert weit mehr als vier Zeitpunkte. Sie können sich Ihre eigenen erstellen, in drei Arten:</p>
            <ul>
              <li><strong>Ein Sonnenwinkel</strong> — der Zeitpunkt, an dem die Sonne eine bestimmte Höhe über oder unter dem Horizont erreicht, morgens oder abends. −6° ist die bürgerliche Morgen- oder Abenddämmerung; −12° die nautische; −18° die astronomische: die tiefe Nacht. +6° am Abend ist ein tiefes, warmes Licht.</li>
              <li><strong>Eine Schattenlänge</strong> — der Zeitpunkt, an dem der Schatten eines Gegenstands ein bestimmtes Vielfaches seiner Höhe erreicht, vor oder nach Mittag.</li>
              <li><strong>Ein Bruchteil des Tages oder der Nacht</strong> — die Nacht (vom Sonnenuntergang bis zum Sonnenaufgang) oder der Tag, in gleiche Teile geteilt; Sie wählen wie viele, und welche Grenze. Das letzte Sechstel der Nacht zum Beispiel beginnt an derselben Stelle der Nacht, egal wie lang sie in dieser Jahreszeit ist.</li>
            </ul>
            <p>Um einen zu erstellen:</p>
            <ol>
              <li>Öffnen Sie <strong>Einstellungen → Anker</strong>, dann tippen Sie auf <strong>+</strong>.</li>
              <li>Wählen Sie die Art, und stellen Sie ihren Wert ein.</li>
              <li>Geben Sie ihm einen Namen, oder behalten Sie den vorgeschlagenen.</li>
              <li>Wählen Sie eine Farbe — <strong>Speichern</strong> erwartet eine.</li>
              <li>Tippen Sie auf <strong>Speichern</strong>.</li>
            </ol>
            <p>Er erscheint nun im Weckerdialogfeld, neben Sonnenaufgang und Sonnenuntergang, und nimmt einen Versatz wie jeder andere. Ein Schalter in der Ankerliste entfernt aus diesem Menü die, die Sie nicht nutzen.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/de/alarms-anchors"
                darkBase="/assets/screenshots/de/alarms-anchors--dark"
                alt="Die Einstellungen, Abschnitt Anker mit sechs Ankern in dieser Reihenfolge: Astronomische Morgendämmerung, Sonnenaufgang, Mittag, Goldene Stunde, Sonnenuntergang und Nadir. Nur die beiden eigenen, Astronomische Morgendämmerung und Goldene Stunde, haben aktive Bearbeiten- und Löschen-Schaltflächen. Jede Zeile trägt einen Sichtbarkeitsschalter, alle aktiviert."
                width={360}
                height={706}
              />
              <figcaption>Ein eigener Anker nimmt seinen Platz unter den anderen ein, in der Reihenfolge des Tages.</figcaption>
            </figure>

            <p>Ein Anker kann auch <strong>kalibriert</strong> werden — um höchstens 30 Minuten verschoben, um sich an einen Zeitplan anzupassen, dem Sie folgen, wie einen lokalen Kalender.</p>
            <p>Fern vom Äquator werden manche Winkel während eines Teils des Jahres nie erreicht. Der Editor gibt Ihnen die Daten dafür — in London erreicht die Sonne von Ende Mai bis Ende Juli keine −18° — und an diesen Tagen bleibt der Wecker still, statt zu einer erfundenen Uhrzeit zu klingeln.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/de/alarms-anchor-editor"
                darkBase="/assets/screenshots/de/alarms-anchor-editor--dark"
                alt="Der Anker-Editor bei Ein Sonnenwinkel, eingestellt auf −18,0° am Morgen, benannt Astronomische Morgendämmerung, mit der Vorschau Nächstes Mal: 05:10 und der Warnung Auf dieser Breite nicht jeden Tag erreicht. Die Sonne erreicht diesen Winkel hier vom 23. Mai 2027 bis zum 21. Juli 2027 nicht."
                width={360}
                height={706}
              />
              <figcaption>−18° am Morgen, eingestellt für London: der Editor nennt die Wochen, in denen das nie eintritt.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-calculation">
            <h2 id="section-calculation">Wie die Zeiten für Sonnenaufgang und Sonnenuntergang offline berechnet werden</h2>
            <p>Jede Zeit für Sonnenaufgang und Sonnenuntergang wird auf dem Gerät von einer astronomischen Bibliothek berechnet, <a href="https://shredzone.org/maven/commons-suncalc/" className="content-link">commons-suncalc</a>, die auf den <em>Astronomical Algorithms</em> von Jean Meeus beruht. Sonnenaufgang und Sonnenuntergang werden für den oberen Rand der Sonne gemessen, einschließlich atmosphärischer Brechung — was Ihre Augen sehen; die Sonnenwinkel für die Mitte der Sonne, die Konvention der Dämmerungstabellen. Keine Webanfrage, kein Server: Das funktioniert im Flugmodus, auf See, oder in einem Tal ohne Netz.</p>
            <p>Risetime läuft nicht ständig. Sie berechnet nach einem Klingeln neu, bei einer kurzen Prüfung alle paar Stunden, oder wenn das Telefon neu startet, die Uhrzeit oder die Zeitzone wechselt; der System-Wecker von Android — derselbe, den die mit Ihrem Telefon gelieferte Uhr nutzt — erledigt den Rest.</p>
          </section>

          <section aria-labelledby="section-reliability">
            <h2 id="section-reliability">Sicherstellen, dass er klingelt</h2>
            <p>Manche Telefone stoppen Apps im Hintergrund, um Akku zu sparen, und das kann jeden Wecker verstummen lassen. <strong>Einstellungen → Zuverlässigkeit</strong> prüft, was Ihr Telefon braucht, und gibt eine Schaltfläche <strong>Beheben</strong> für jedes fehlende Element. Nach einem Neustart klingeln die Wecker sogar, bevor Sie das Telefon zum ersten Mal entsperrt haben.</p>
          </section>

          <section aria-labelledby="section-timers">
            <h2 id="section-timers">Auch Timer</h2>
            <p>Der Tab <strong>Timer</strong> versammelt die Countdowns, einschließlich derer, die von selbst neu starten, für Intervalle und Lernblöcke: <a href="/de/timer/" className="content-link">wie Schleifen-Timer funktionieren</a>.</p>
            <p>Risetime ist kostenlos bis zu drei Weckern und drei Timern — für immer. Brauchen Sie mehr? Nutzen Sie zuerst diese drei, und sehen Sie, ob es Ihre Unterstützung wert ist: Unterstützer haben unbegrenzt Wecker und Timer, im Jahresabo oder als Einmalkauf. Andernfalls lese ich Sie gerne <a href="mailto:contact@risetime.app">direkt</a>.</p>
          </section>

          <section aria-labelledby="section-guides">
            <h2 id="section-guides">Leitfäden nach Anwendungsfall</h2>
            <ul>
              <li><a href="/de/zirkadianer-rhythmus-wecker/" className="content-link">Ein Rhythmus für Aufstehen und Zubettgehen, der dem Sonnenaufgang folgt</a></li>
              <li><a href="/de/goldene-stunde/" className="content-link">Goldene Stunde, blaue Stunde und Nachthimmel, für Fotografen und Astronomen</a></li>
              {/* Add the Muslim prayer times and morning practice guides here once those pages are published. */}
            </ul>
          </section>

          <div className="cta-section">
            <h2>Einmal einstellen. Er folgt der Sonne.</h2>
            <a className="play-badge" href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Risetime bei Google Play laden">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Jetzt verfügbar</span>
            </a>
          </div>

        </main>

        <SiteFooter page="/alarms/" lang="de" />
    </div>
  )
}
