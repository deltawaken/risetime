import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// DIE DEUTSCHE SEITE, VON HAND GESCHRIEBEN — Entscheidung des Auftraggebers vom
// 2026-09-27. Eine übersetzte Seite trägt ALLES, was die englische trägt, ihr
// Mobiliar eingeschlossen, auf derselben Seite: dem JSX — art-direktierte
// Screenshots und strukturierte Daten eingeschlossen.
//
// ⚠️ IHRE KOPFZEILEN-STRINGS LEBEN IN content/de/golden-hour-alarm.md, in EINEM
// Exemplar, genau wie bei der englischen Seite. `langMetadata` liest dort Titel,
// Beschreibung und og, fügt das DEUTSCHE canonical und die hreflang hinzu, und
// setzt `noindex` im Preview-Build.
//
// ⛔ DER SCHLÜSSEL BLEIBT DER DER ENGLISCHEN SEITE (`/golden-hour-alarm/`): das
// Register `PAGES` (lib/pages.ts) benennt ihn, und die deutsche URL wird vom
// `slug:` der Kopfzeile ABGELEITET.
//
// ⛔ `de` steht in `STATIC_LOCALES` (lib/pages.ts): die dynamische Route
// `app/[lang]/` erzeugt diese URL daher NICHT.
export const metadata: Metadata = langMetadata('de', '/golden-hour-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Goldene Stunde, blaue Stunde und der Nachthimmel, auf einem Wecker",
  "description": "Wie Sie unter Android Wecker für die goldene Stunde, die blaue Stunde und die astronomische Nacht stellen, über den Sonnenwinkel statt über eine Uhrzeit, mit der Wecker-App Risetime. Auf dem Gerät berechnet, offline.",
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
  "mainEntityOfPage": "https://risetime.app/de/goldene-stunde/"
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
      "name": "Wecker für die goldene Stunde",
      "item": "https://risetime.app/de/goldene-stunde/"
    }
  ]
}
]

export default function GoldeneStundePage() {
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

        <SiteHeader current="/golden-hour-alarm/" lang="de" />

        <div className="page-header">
          <h1>Goldene Stunde, blaue Stunde und der Nachthimmel, auf einem Wecker</h1>
          <p className="subtitle">Stellen Sie den Winkel einmal ein. Der Wecker folgt dem Licht das ganze Jahr.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="s-why">
            <h2 id="s-why" className="sr-only">Warum ein fester Wecker das Licht verpasst</h2>
            <p>Sie wissen, wann das Licht schön ist. Das Problem ist, es bewegt sich: In New York reicht der Sonnenuntergang von <strong>16:31 am 21. Dezember</strong> bis <strong>20:30 am 21. Juni</strong>. Ein fester Wecker für die goldene Stunde liegt nach zwei Wochen schon falsch, und ist nach einem Monat nutzlos.</p>
            <p>Risetime stellt einen Wecker auf den <strong>Sonnenwinkel</strong> statt auf eine Uhrzeit — und es ist der Winkel, der diese Fenster wirklich bestimmt.</p>
          </section>

          <section aria-labelledby="s-angles">
            <h2 id="s-angles">Das Licht, über den Winkel</h2>
            <table className="timing-table" aria-label="Goldene Stunde, blaue Stunde und astronomische Nacht, über den Sonnenwinkel">
              <thead><tr><th>Was Sie suchen</th><th>Die Sonne steht…</th><th>In Risetime</th></tr></thead>
              <tbody>
                <tr><td>Goldene Stunde, abends</td><td>unter etwa <strong>6° über</strong> dem Horizont</td><td>ein Sonnenwinkel-Anker, <strong>+6° abends</strong></td></tr>
                <tr><td>Blaue Stunde, abends</td><td>zwischen etwa <strong>4° und 6° unter</strong> dem Horizont</td><td><strong>−4° abends</strong>, das Fenster reicht bis −6°</td></tr>
                <tr><td>Goldene Stunde, morgens</td><td>dasselbe, umgekehrt</td><td><strong>+6° morgens</strong></td></tr>
                <tr><td>Astronomische Nacht</td><td><strong>18° unter</strong> dem Horizont</td><td><strong>−18° abends</strong>, und −18° morgens, um zu wissen, wann sie endet</td></tr>
              </tbody>
            </table>
            <p>Die Definitionen unterscheiden sich von Fotograf zu Fotograf; hier die gängigsten. Stellen Sie den Winkel ein, mit dem Sie arbeiten, und die App hält ihn auf allen Breiten und in allen Jahreszeiten — was eine feste Regel wie „30 Minuten vor Sonnenuntergang“ nicht kann, weil sich die Dauer der Dämmerung mit beidem ändert. In London am 21. Juni fällt +6° auf 20:27 und der Sonnenuntergang auf 21:21: fast eine Stunde Unterschied. In New York am selben Abend, 19:49 und 20:30: vierzig Minuten.</p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/de/sky-menu"
                darkBase="/assets/screenshots/de/sky-menu--dark"
                alt="Das Dialogfeld zum Erstellen eines Weckers, sein Anker-Menü geöffnet, mit Genau, Sonnenaufgang, Mittag, Goldene Stunde, Sonnenuntergang, Blaue Stunde, Nachthimmel und Nadir."
                width={360}
                height={706}
              />
              <figcaption>Ihre eigenen Anker nehmen ihren Platz neben Sonnenaufgang und Sonnenuntergang ein, in der Reihenfolge des Tages.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-make">
            <h2 id="s-make">Der Anker, ein für alle Mal</h2>
            <ol>
              <li>Öffnen Sie <strong>Einstellungen → Anker</strong> und tippen Sie auf <strong>+</strong>.</li>
              <li>Belassen Sie den Typ bei <strong>Ein Sonnenwinkel</strong> und stellen Sie Ihren Winkel ein — ein Tipp auf den Wert, um ihn einzugeben, und wählen Sie <strong>morgens</strong> oder <strong>abends</strong>.</li>
              <li>Benennen Sie ihn — <em>Goldene Stunde</em>, <em>Blaue Stunde</em>, <em>Nachthimmel</em> —, wählen Sie eine Farbe und speichern Sie.</li>
              <li>Stellen Sie im Tab <strong>Wecker</strong> einen Wecker darauf: auf den Anker selbst, oder dreißig Minuten vorher, um rechtzeitig vor Ort zu sein.</li>
            </ol>
            <p><a href="/de/wecker/#section-custom" className="content-link">Wie Anker und Versatz funktionieren</a></p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/de/sky-list"
                darkBase="/assets/screenshots/de/sky-list--dark"
                alt="Die Weckerliste von Risetime mit fünf Weckern: 06:45 und 08:10 von Montag bis Freitag bei Genau; 17:21 am Samstag und Sonntag, 30 Min. vor Goldene Stunde; 18:58 am Samstag und Sonntag bei Blaue Stunde; und 20:30 am Freitag und Samstag bei Nachthimmel."
                width={360}
                height={706}
              />
              <figcaption>Uhrzeit-Wecker für die Woche, Solarwecker für das Licht.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-week">
            <h2 id="s-week">Eine Arbeitswoche, und das Licht am Wochenende</h2>
            <p>Die meisten von uns leben nicht von der Fotografie:</p>
            <table className="timing-table" aria-label="Eine Woche aus Uhrzeit-Weckern, und Wochenend-Wecker, die am Licht verankert sind">
              <thead><tr><th>Zeitpunkt</th><th>Wecker</th><th>Tage</th></tr></thead>
              <tbody>
                <tr><td>Aufwachen</td><td>06:45</td><td>Mo–Fr</td></tr>
                <tr><td>Aufbruch zur Schule</td><td>08:10</td><td>Mo–Fr</td></tr>
                <tr><td>Tasche packen</td><td>30 Min. vor Goldene Stunde</td><td>Sa und So</td></tr>
                <tr><td>Blaue Stunde</td><td>Blaue Stunde</td><td>Sa und So</td></tr>
                <tr><td>Die Sterne</td><td>Nachthimmel</td><td>Fr und Sa</td></tr>
              </tbody>
            </table>
            <p>Uhrzeit-Wecker für die Woche, Solarwecker für das Licht — dieselbe Liste, dieselbe App.</p>
          </section>

          <section aria-labelledby="s-road">
            <h2 id="s-road">Unterwegs, und fern jedes Netzes</h2>
            <ul>
              <li><strong>Auf Reisen?</strong> Aktivieren Sie <strong>Standort automatisch aktualisieren</strong> in den Einstellungen, und Ihre Wecker folgen Ihnen — eine Fahrt, eine neue Stadt, eine Küste.</li>
              <li><strong>Kein Netz vor Ort?</strong> Risetime berechnet die Sonnenposition auf dem Telefon, mit einer astronomischen Bibliothek. Sie hat <strong>keine Internetberechtigung</strong>, kann also nicht von einer Verbindung abhängen: Flugmodus, ein Canyon, ein Schiff — der Wecker weiß immer, wann das Licht kommt.</li>
              <li><strong>Kein Tracking, kein Konto, keine Werbung.</strong> Ihr Standort verlässt das Telefon nie. <a href="/de/datenschutz/" className="content-link">Datenschutzerklärung</a></li>
            </ul>
          </section>

          <section aria-labelledby="s-night">
            <h2 id="s-night">Für den Nachthimmel</h2>
            <p>Die astronomische Nacht ist das Fenster zwischen dem abendlichen und dem morgendlichen Zeitpunkt, an denen die Sonne 18° unter dem Horizont steht. Setzen Sie auf beide je einen Anker, und Sie halten beide Enden der Dunkelheit.</p>
            <p>Weit im Norden oder Süden schließt sich dieses Fenster während eines Teils des Jahres: In London erreicht die Sonne −18° <strong>vom 23. Mai bis zum 21. Juli</strong> nicht. Risetime sagt das in dem Moment, in dem Sie den Anker erstellen, mit den Daten Ihres eigenen Standorts, und in diesen Nächten bleibt der Wecker still, statt zu einer Uhrzeit zu klingeln, die der Himmel nie hervorbringt.</p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/de/sky-night-editor"
                darkBase="/assets/screenshots/de/sky-night-editor--dark"
                alt="Der Anker-Editor bei Ein Sonnenwinkel, eingestellt auf −18,0° am Abend, benannt Nachthimmel, mit der Vorschau: Nächstes Mal: 20:30. Die Sonne erreicht diesen Winkel hier vom 23. Mai 2027 bis zum 21. Juli 2027 nicht."
                width={360}
                height={706}
              />
              <figcaption>Ein Winkel von −18° am Abend, und die Wochen, in denen er nie eintritt.</figcaption>
            </figure>
            <p><strong>Was Risetime nicht kann: den Mond.</strong> Kein Mondaufgang, keine Phase, kein Mondkalender — die App wird Ihnen nicht sagen, wann ein Vollmond die Milchstraße auslöscht. Sie kann die Sonne, und das offline.</p>
          </section>

          <section aria-labelledby="s-price">
            <h2 id="s-price" className="sr-only">Was es kostet</h2>
            <p>Risetime ist kostenlos bis zu drei Weckern und drei Timern — für immer. Brauchen Sie mehr? Nutzen Sie zuerst diese drei, und sehen Sie, ob es Ihre Unterstützung wert ist: Unterstützer haben unbegrenzt Wecker und Timer, im Jahresabo oder als Einmalkauf. Andernfalls lese ich Sie gerne <a href="mailto:contact@risetime.app">direkt</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Verpassen Sie nie wieder das Licht.</h2>
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

        <SiteFooter page="/golden-hour-alarm/" lang="de" />
    </div>
  )
}
