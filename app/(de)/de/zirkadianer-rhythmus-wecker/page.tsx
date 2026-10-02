import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// DIE DEUTSCHE SEITE, VON HAND GESCHRIEBEN — Entscheidung des Auftraggebers vom
// 2026-09-27. Übersetzung von app/(en)/circadian-rhythm-alarm/page.tsx, Zeile für
// Zeile: gleiche Abschnitte, gleiche `id`, gleiche Screenshots, gleiche
// strukturierte Daten.
//
// ⚠️ IHRE KOPFZEILEN-STRINGS LEBEN IN content/de/circadian-rhythm-alarm.md, in
// EINEM Exemplar. Der an `langMetadata` übergebene Schlüssel bleibt die
// ENGLISCHE Seite: das ist die Identität der Seite, nicht ihre Adresse.
//
// ⛔ KEINE GESUNDHEITSBEHAUPTUNG. Die englische Seite wurde bereits einmal
// umgeschrieben, um sie zu entfernen. Der zirkadiane Rhythmus wird BESCHRIEBEN —
// was die Sonne tut, was die App berechnet — nicht behandelt.
export const metadata: Metadata = langMetadata('de', '/circadian-rhythm-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Wecker-App für den zirkadianen Rhythmus (Android): ein Alarm, verankert am Sonnenaufgang",
  "description": "Wie Sie einen Android-Wecker auf den Sonnenaufgang stellen, und einen Tag, der um die Sonne herum gebaut ist, mit der Wecker-App Risetime. Der Alarm verschiebt sich mit den Jahreszeiten von selbst; die Zeiten werden auf dem Gerät berechnet, ganz ohne Internetberechtigung.",
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
  "mainEntityOfPage": "https://risetime.app/de/zirkadianer-rhythmus-wecker/"
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
      "name": "Wecker für den zirkadianen Rhythmus",
      "item": "https://risetime.app/de/zirkadianer-rhythmus-wecker/"
    }
  ]
}
]

export default function ZirkadianerRhythmusWeckerPage() {
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

        <SiteHeader current="/circadian-rhythm-alarm/" lang="de" />

        <div className="page-header">
          <h1>Wecker-App für den zirkadianen Rhythmus (Android): ein Alarm, verankert am Sonnenaufgang</h1>
          <p className="subtitle">Er verschiebt sich mit den Jahreszeiten von selbst.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-what">
            <h2 id="section-what" className="sr-only">Was ein Wecker für den zirkadianen Rhythmus ist</h2>
            <p>„Wecker für den zirkadianen Rhythmus“ — so nennt man einen Alarm, der an die Sonne gebunden ist statt an die Uhr. Das Wort stammt vom rund 24-stündigen Zyklus des Körpers; in einem App-Store bedeutet es schlicht, dass der Wecker dem Sonnenaufgang folgt, statt bei einer festen Uhrzeit zu bleiben.</p>
            <p>In Risetime heißt der von Ihnen gewählte Sonnenstand ein <strong>Anker</strong> — Sonnenaufgang, Sonnenmittag, Sonnenuntergang —, und der Abstand, den Sie dazu halten, der <strong>Versatz</strong>.</p>
          </section>

          <section aria-labelledby="section-swing">
            <h2 id="section-swing">Um wie viel sich der Sonnenaufgang im Lauf des Jahres verschiebt</h2>
            <table className="timing-table" aria-label="Um wie viel sich der Sonnenaufgang zwischen Juni und Dezember verschiebt, nach Stadt">
              <thead>
                <tr><th>Stadt</th><th>Frühester Sonnenaufgang</th><th>Spätester Sonnenaufgang</th><th>Spanne</th></tr>
              </thead>
              <tbody>
                <tr><td>London</td><td>04:43 (21. Juni)</td><td>08:03 (21. Dez.)</td><td>3 Std. 20 Min.</td></tr>
                <tr><td>Paris</td><td>05:46 (21. Juni)</td><td>08:41 (21. Dez.)</td><td>2 Std. 55 Min.</td></tr>
                <tr><td>Tokio</td><td>04:25 (21. Juni)</td><td>06:47 (21. Dez.)</td><td>2 Std. 20 Min.</td></tr>
                <tr><td>Chicago</td><td>05:15 (21. Juni)</td><td>07:14 (21. Dez.)</td><td>2 Std. 00 Min.</td></tr>
                <tr><td>Sydney</td><td>05:41 (21. Dez.)</td><td>06:00 (21. Juni)</td><td>1 Std. 20 Min.</td></tr>
              </tbody>
            </table>
            <p>Ortszeit, 2027, berechnet mit der astronomischen Bibliothek, die die App verwendet.</p>
            <p>Ein fester Wecker um 06:30 in London klingelt also <strong>1 Std. 47 Min. nach dem Sonnenaufgang im Juni</strong>, und <strong>1 Std. 33 Min. vor ihm im Dezember</strong>. Derselbe Wecker, zwei verschiedene Morgen.</p>
          </section>

          <section aria-labelledby="section-how">
            <h2 id="section-how">Wie Sie einen Wecker auf den zirkadianen Rhythmus stellen</h2>
            <ol>
              <li>Tippen Sie im Tab <strong>Wecker</strong> auf <strong>+</strong>.</li>
              <li>Wählen Sie im oberen Menü <strong>Sonnenaufgang</strong>.</li>
              <li>Belassen Sie das Ziffernblatt, wo es ist, um beim Sonnenaufgang aufzustehen, oder drehen Sie es auf den gewünschten Abstand — 30 Minuten vorher, eine Stunde vorher.</li>
              <li>Tippen Sie auf <strong>OK</strong>. Öffnen Sie danach den Wecker in der Liste und aktivieren Sie <strong>Wiederholen</strong>, um Ihre Tage zu wählen.</li>
            </ol>
            <p>Der von Ihnen eingestellte Abstand ändert sich nie. Der Sonnenaufgang ändert sich, und der Wecker geht mit — durch Tagundnachtgleichen, Sonnenwenden und die Sommerzeitumstellung. <a href="/de/wecker/" className="content-link">Einen Wecker zum Sonnenaufgang oder Sonnenuntergang stellen</a></p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/de/circadian-list"
                darkBase="/assets/screenshots/de/circadian-list--dark"
                alt="Weckerliste von Risetime mit drei Weckern, alle täglich wiederholt: 07:02 bei Sonnenaufgang, 20:38 zwei Stunden nach Sonnenuntergang, und 23:02 acht Stunden vor Sonnenaufgang."
                width={360}
                height={706}
              />
              <figcaption>Wecker, verankert am Sonnenaufgang und am Sonnenuntergang, täglich wiederholt.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-day">
            <h2 id="section-day">Ein Tag, der der Sonne folgt — und einer Uhr</h2>
            <p>So sieht der Tag aus, den ich wirklich lebe, auf meinem eigenen Telefon:</p>
            <table className="timing-table" aria-label="Ein Tag aus an die Sonne verankerten Weckern und Uhrzeit-Weckern">
              <thead>
                <tr><th>Zeitpunkt</th><th>Wecker</th><th>Tage</th></tr>
              </thead>
              <tbody>
                <tr><td>Aufstehen</td><td>Sonnenaufgang</td><td>Mo.–Fr.</td></tr>
                <tr><td>Arbeitsbeginn, oder Aufstehen am Wochenende</td><td>09:00</td><td>täglich</td></tr>
                <tr><td>Mittagessen</td><td>1 Std. vor Mittag — der Sonnenmittag, selten 12:00</td><td>täglich</td></tr>
                <tr><td>Weiter geht's</td><td>1 Std. nach Mittag</td><td>Mo.–Fr.</td></tr>
                <tr><td>Feierabend</td><td>18:00</td><td>Mo.–Fr.</td></tr>
              </tbody>
            </table>
            <p>Es gibt einen sechsten, acht Stunden vor Sonnenaufgang, um langsam runterzufahren. Er ist derzeit ausgeschaltet — die mittlere Schalterstellung behält einen Wecker, ohne ihn klingeln zu lassen.</p>
            <p>Das macht sechs Wecker, einer davon ausgeschaltet — mehr als die drei kostenlosen.</p>
            <p>Die an die Sonne verankerten folgen dem Licht; die Uhrzeit-Wecker halten fest, was andere von Ihnen erwarten. Beide leben in derselben Liste, und jede Karte sagt, welcher welcher ist.</p>
            <p>Wie weit das geht, hängt davon ab, wo Sie leben. In Sydney verschiebt sich der Sonnenaufgang übers Jahr um etwa eine Stunde, und ein an die Sonne verankerter Tag driftet dort kaum. In London verschiebt er sich um über drei Stunden: Der Morgen folgt dann der Sonne, während die Arbeitszeiten bei der Uhr bleiben.</p>
          </section>

          <section aria-labelledby="section-late">
            <h2 id="section-late">Wenn der Sonnenaufgang zu spät kommt</h2>
            <p>Mitten im Winter kommt der Sonnenaufgang nach Beginn des Arbeitstags — 08:03 in London am 21. Dezember. Zwei Wege, damit umzugehen:</p>
            <ul>
              <li><strong>Beim ersten Licht aufstehen, stattdessen.</strong> Das Licht kommt lange vor der Sonne. Erstellen Sie unter Einstellungen → Anker Ihren eigenen Anker bei der <strong>bürgerlichen Morgendämmerung</strong> — dem Zeitpunkt, ab dem genug Licht ist, um draußen ohne Lampe zu sehen —, und stellen Sie Ihren Wecker darauf. <a href="/de/wecker/#section-custom" className="content-link">Anker über Sonnenwinkel und Dämmerung</a></li>
              <li><strong>Behalten Sie beide Weckerarten</strong>, wie oben: die Uhr für Tage, die zu fester Zeit beginnen, die Sonne für den Rest.</li>
            </ul>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/de/circadian-offset"
                darkBase="/assets/screenshots/de/circadian-offset--dark"
                alt="Das Dialogfeld für einen neuen Wecker, eingestellt auf Sonnenaufgang mit einem Versatz von acht Stunden davor, der Stundenwähler auf 8 und der Minutenwähler auf 00, und die Zeile Heute: 23:02."
                width={360}
                height={706}
              />
              <figcaption>Jeder Abstand zum Anker, davor oder danach, bis zu 11 Std. 59 Min.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-privacy">
            <h2 id="section-privacy">Ein Wecker, kein Schlaf-Tracking</h2>
            <p>Risetime verfolgt Ihren Schlaf nicht. Sie zeichnet nicht auf, wann Sie einen Wecker stoppen, sie hat kein Konto, keine Cloud und kein Messwerkzeug. Sie hat <strong>keine Internetberechtigung</strong>: Das Betriebssystem selbst verhindert also, dass sie sich verbindet. Die Sonnenaufgangszeiten werden auf Ihrem Telefon berechnet, und Ihr Standort verlässt es nie. Deshalb funktioniert sie auch im Flugmodus, in einem Tal, auf einem Schiff. <a href="/de/datenschutz/" className="content-link">Datenschutzerklärung</a></p>
            <p>Risetime ist kostenlos bis zu drei Weckern und drei Timern — für immer. Brauchen Sie mehr? Nutzen Sie zuerst diese drei, und sehen Sie, ob es Ihre Unterstützung wert ist: Unterstützer haben unbegrenzt Wecker und Timer, im Jahresabo oder als Einmalkauf. Andernfalls lese ich Sie gerne <a href="mailto:contact@risetime.app">direkt</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Stehen Sie mit der Sonne auf. Behalten Sie die Uhr für den Rest.</h2>
            <a className="play-badge" href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Risetime bei Google Play laden">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Jetzt verfügbar</span>
            </a>
          </div>

        </main>

        <SiteFooter page="/circadian-rhythm-alarm/" lang="de" />
    </div>
  )
}
