import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// DIE DEUTSCHE SEITE, VON HAND GESCHRIEBEN — Entscheidung des Auftraggebers vom
// 2026-09-27. Eine übersetzte Seite trägt ALLES, was die englische trägt, ihr
// Mobiliar eingeschlossen, auf derselben Seite: dem JSX.
//
// ⚠️ IHRE KOPFZEILEN-STRINGS LEBEN IN content/de/sunrise-meditation-alarm.md, in
// EINEM Exemplar, genau wie bei der englischen Seite in content/en/.
// `langMetadata` liest dort Titel, Beschreibung und og, fügt das DEUTSCHE
// canonical und die hreflang hinzu, und setzt `noindex` im Preview-Build.
//
// ⛔ DER SCHLÜSSEL BLEIBT DER ENGLISCHE PFAD `/sunrise-meditation-alarm/`: das ist
// die Identität der Seite, gemeinsam für alle Sprachen. Der deutsche Slug steht
// in der Kopfzeile.
//
// ⛔ Säkulare Seite: keine Tradition wird benannt (Entscheidung des Auftraggebers
// vom Abend des 2026-09-24). Die App-Bezeichnungen bleiben astronomisch.
export const metadata: Metadata = langMetadata('de', '/sunrise-meditation-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "inLanguage": "de",
  "headline": "Eine Morgenpraxis, die mit dem Licht beginnt",
  "description": "Wie Sie unter Android einen Wecker für Meditation oder Yoga auf den Sonnenaufgang stellen, auf die bürgerliche oder nautische Morgendämmerung über den Sonnenwinkel, oder auf einen Bruchteil der Nacht, mit der Wecker-App Risetime. Auf dem Gerät berechnet, offline.",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/de/meditation-sonnenaufgang/"
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
      "name": "Wecker für Meditation und Yoga",
      "item": "https://risetime.app/de/meditation-sonnenaufgang/"
    }
  ]
}
]

export default function MeditationSonnenaufgangPage() {
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

        <SiteHeader current="/sunrise-meditation-alarm/" lang="de" />

        <div className="page-header">
          <h1>Eine Praxis, die mit dem Licht beginnt, nicht mit einer Zahl</h1>
          <p className="subtitle">Stellen Sie den Versatz einmal ein; es ist das Licht, das sich bewegt.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="s-why">
            <h2 id="s-why" className="sr-only">Warum das erste Licht keine Uhrzeit ist</h2>
            <p>Eine Praxis, die mit dem Licht beginnt, beginnt nicht bei einer Zahl. Das erste Licht verschiebt sich im Lauf des Jahres, und auch innerhalb derselben Zeitzone: Am 21. Juni geht die Sonne um <strong>06:01 in Mumbai</strong> auf und um <strong>05:08 in Varanasi</strong>: dreiundfünfzig Minuten Unterschied, bei derselben Uhr.</p>
            <p>Risetime stellt einen Wecker auf einen Sonnenstand statt auf eine Uhrzeit. Dieser Zeitpunkt ist ein <strong>Anker</strong>, der Abstand, den Sie dazu halten, ein <strong>Versatz</strong>.</p>
          </section>

          <section aria-labelledby="s-names">
            <h2 id="s-names">Vier Arten, das erste Licht zu benennen</h2>
            <table className="timing-table" aria-label="Vier Arten, das erste Licht zu benennen, und was Sie dafür in Risetime erstellen">
              <thead><tr><th>Was Sie anpeilen</th><th>Wo die Sonne steht</th><th>In Risetime</th></tr></thead>
              <tbody>
                <tr><td>Der Sonnenaufgang</td><td>die Scheibe löst sich vom Horizont</td><td>der eingebaute Anker <strong>Sonnenaufgang</strong></td></tr>
                <tr><td>Die bürgerliche Morgendämmerung</td><td><strong>6° unter</strong> dem Horizont</td><td>ein Sonnenwinkel-Anker, <strong>−6° morgens</strong></td></tr>
                <tr><td>Die nautische Morgendämmerung</td><td><strong>12° unter</strong></td><td><strong>−12° morgens</strong></td></tr>
                <tr><td>Ein Punkt innerhalb der Nacht</td><td>ein Teil des Wegs vom Sonnenuntergang zum Sonnenaufgang</td><td>ein <strong>Teilungs</strong>-Anker: Nacht, in <em>N</em> Teilen</td></tr>
              </tbody>
            </table>
            <p>Die Definitionen unterscheiden sich; hier die gängigsten. Die App hält die von Ihnen eingestellte auf allen Breiten und in allen Jahreszeiten — was ein festes „45 Minuten vor Sonnenaufgang“ nicht kann, da sich die Dauer der Morgendämmerung mit beidem ändert.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/de/practice-list"
                darkBase="/assets/screenshots/de/practice-list--dark"
                alt="Weckerliste von Risetime mit vier Weckern, alle täglich wiederholt: 05:29 bei Letzter Teil der Nacht, 05:50 bei Nautische Morgendämmerung, 06:29 bei Bürgerliche Morgendämmerung, und 07:02 bei Sonnenaufgang."
                width={360}
                height={706}
              />
              <figcaption>Die vier Zeilen der Tabelle, jeweils als Wecker.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-sunrise">
            <h2 id="s-sunrise">Die Praxis auf den Sonnenaufgang stellen</h2>
            <ol>
              <li>Tippen Sie im Tab <strong>Wecker</strong> auf <strong>+</strong>.</li>
              <li>Wählen Sie im oberen Menü <strong>Sonnenaufgang</strong>.</li>
              <li>Belassen Sie das Ziffernblatt in der Mitte, um beim Sonnenaufgang zu klingeln, oder drehen Sie es auf den gewünschten Abstand, bis zu <strong>11 Std. 59 Min.</strong> auf jeder Seite.</li>
              <li>Tippen Sie auf <strong>OK</strong>, öffnen Sie dann den Wecker in der Liste und aktivieren Sie <strong>Wiederholen</strong>, um Ihre Tage zu wählen.</li>
            </ol>
            <p>Und der Wecker, den Frühaufsteher verlangen, ist der andere: <strong>ein Wecker fürs Zubettgehen</strong>, keiner zum Aufwachen. Stellen Sie ihn auf den Anker <strong>Sonnenuntergang</strong> mit einem Versatz, wiederholend — dieselben vier Schritte. <a href="/de/wecker/" className="content-link">Einen Wecker zum Sonnenaufgang oder Sonnenuntergang stellen</a></p>
          </section>

          <section aria-labelledby="s-angle">
            <h2 id="s-angle">Vor der Sonne: die Morgendämmerung über ihren Winkel</h2>
            <ol>
              <li>Öffnen Sie <strong>Einstellungen → Anker</strong> und tippen Sie auf <strong>+</strong> (es erscheint, sobald der Abschnitt aufgeklappt ist).</li>
              <li>Belassen Sie den Typ bei <strong>Ein Sonnenwinkel</strong>. Geben Sie <strong>−6°</strong> für die bürgerliche Morgendämmerung ein oder <strong>−12°</strong> für die nautische, Richtung <strong>morgens</strong>. Es bewegt sich in Zehntelgrad-Schritten, zwischen −30° und +30°.</li>
              <li>Benennen Sie ihn, <strong>wählen Sie eine Farbe</strong> — ohne Farbe lässt er sich nicht speichern — und speichern Sie.</li>
              <li>Stellen Sie im Tab <strong>Wecker</strong> einen Wecker darauf.</li>
            </ol>
            <p>Weit im Norden oder Süden steigt die Sonne während eines Teils des Jahres nie so tief. Der Editor sagt das im Moment der Anker-Erstellung — <em>„Die Sonne erreicht diesen Winkel hier vom X bis zum Y nicht“</em>, mit Ihren eigenen Daten — und an diesen Tagen bleibt der Wecker still, statt zu einem Zeitpunkt zu klingeln, den der Himmel nie hervorgebracht hat. Nichts wird erfunden.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/de/practice-angle-editor"
                darkBase="/assets/screenshots/de/practice-angle-editor--dark"
                alt="Der Anker-Editor bei Ein Sonnenwinkel, eingestellt auf −6,0° am Morgen, benannt Bürgerliche Morgendämmerung, mit der Vorschau Nächstes Mal: 06:29."
                width={360}
                height={706}
              />
              <figcaption>Die bürgerliche Morgendämmerung als Winkel: sechs Grad unter dem Horizont, morgens.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-night">
            <h2 id="s-night">Ein Bruchteil der Nacht</h2>
            <p>Sie können den Morgen an der Nacht ausrichten statt an der Dämmerung: an einem Punkt bei einem bestimmten Anteil der Dunkelheit.</p>
            <ol>
              <li><strong>Einstellungen → Anker → +</strong>, und stellen Sie die Form auf <strong>Ein Bruchteil des Tages oder der Nacht</strong> um.</li>
              <li>Bereich <strong>Nacht</strong>, dann die <strong>Anzahl der Teile</strong> und die <strong>Position</strong> — von 2 bis 48 Teile, jede Grenze dazwischen.</li>
              <li>Benennen Sie ihn, wählen Sie eine Farbe, speichern Sie. Ein neuer Entwurf heißt <strong>Nacht · 1/15</strong>; er folgt dem, was Sie einstellen.</li>
              <li>Stellen Sie einen Wecker darauf.</li>
            </ol>
            <p>Die Nacht ist hier genau eine Sache: <strong>von einem Sonnenuntergang bis zum nächsten Sonnenaufgang</strong>, in gleiche Teile geteilt. Innerhalb der Polarkreise kann eine solche Nacht nicht existieren; der Anker hat dann nichts zu teilen, und die App sagt das — ohne den Datumsbereich, den die Winkel-Form angibt, den diese Form nicht hat. Sie richten sich nach einem veröffentlichten Zeitplan? <strong>Erweitert → Um N Minuten verschieben</strong> verschiebt einen von Ihnen erstellten Anker, um bis zu dreißig Minuten in jede Richtung.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/de/practice-division-editor"
                darkBase="/assets/screenshots/de/practice-division-editor--dark"
                alt="Der Anker-Editor bei Ein Bruchteil des Tages oder der Nacht, mit ausgewähltem Nacht, Anzahl der Teile eingestellt auf 8 und Position auf 7/8, benannt Letzter Teil der Nacht, mit der Vorschau: Nächstes Mal: 05:29."
                width={360}
                height={706}
              />
              <figcaption>Die Nacht in acht Teile geteilt, der Wecker auf dem letzten.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-not">
            <h2 id="s-not">Was Risetime nicht kann</h2>
            <p>Ihre eigenen Bezeichnungen bleiben astronomisch — <em>Sonnenaufgang</em>, <em>ein Sonnenwinkel</em>, <em>Nacht · 1/15</em> —, während der von Ihnen eingegebene Name Ihrer ist. Es ist ein Wecker, nicht mehr:</p>
            <ul>
              <li><strong>Kein Signal mitten in einer Sitzung</strong> — kein Bildschirm setzt einen Timer aus mehreren zusammen, also kann eine Sitzung von dreißig Minuten nicht bei zehn und bei zwanzig klingeln.</li>
              <li><strong>Kein Meditationston, nichts Geführtes.</strong> Er klingelt; Sie stoppen ihn.</li>
              <li><strong>Nichts Lunares</strong> — Risetime berechnet den Mond nicht: weder Phase noch Monddatum.</li>
              <li><strong>Kein Schlaf-Tracking, kein Konto, keine Cloud, keine Internetberechtigung</strong> — Ihr Standort verlässt das Telefon nie. <a href="/de/datenschutz/" className="content-link">Datenschutzerklärung</a></li>
            </ul>
            <p><a href="/de/wecker/#section-custom" className="content-link">Wie Anker und Versatz funktionieren</a></p>
          </section>

          <section aria-labelledby="s-price">
            <h2 id="s-price" className="sr-only">Was es kostet</h2>
            <p>Risetime ist kostenlos bis zu drei Weckern und drei Timern — für immer. Brauchen Sie mehr? Nutzen Sie zuerst diese drei, und sehen Sie, ob es Ihre Unterstützung wert ist: Unterstützer haben unbegrenzt Wecker und Timer, im Jahresabo oder als Einmalkauf. Andernfalls lese ich Sie gerne <a href="mailto:contact@risetime.app">direkt</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Beginnen Sie mit dem Licht.</h2>
            <a className="play-badge" href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Risetime bei Google Play laden">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Jetzt verfügbar</span>
            </a>
          </div>

        </main>

        <SiteFooter page="/sunrise-meditation-alarm/" lang="de" />
    </div>
  )
}
