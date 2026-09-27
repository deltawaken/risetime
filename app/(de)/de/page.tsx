import type { Metadata } from 'next'
import { langMetadata } from '../../../lib/metadata'
import SiteHeader from '../../../components/SiteHeader'
import ThemedPicture from '../../../components/ThemedPicture'
import SiteFooter from '../../../components/SiteFooter'

// DIE DEUTSCHE STARTSEITE, VON HAND GESCHRIEBEN — Entscheidung des Auftraggebers
// vom 2026-09-27: „on ne fait plus de markdown […] tu vas juste bien gentiment
// tout traduire toi-même“. Übersetzung von app/(fr)/fr/page.tsx, Zeile für Zeile:
// gleiche Abschnitte, gleiche `id`, gleiche Bilder, gleiche strukturierten Daten.
//
// ⚠️ Die Kopfzeilen-Strings leben in content/de/home.md, in EINEM Exemplar.
//
// ⚠️ REGISTER: Diese Seite SIEZT durchgehend (Entscheidung des Auftraggebers),
// auch wenn die App selbst duzt. Niemals „du“ in der Website-Prosa.
export const metadata: Metadata = langMetadata('de', '/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Risetime",
  "alternateName": "Risetime Sonnenaufgangswecker",
  "operatingSystem": "Android",
  "applicationCategory": "UtilitiesApplication",
  "inLanguage": "de",
  "url": "https://risetime.app/de/",
  "description": "Sonnenaufgangswecker-App für Android. Stellen Sie Ihren Wecker auf Sonnenaufgang, Sonnenuntergang oder Sonnenmittag — er verschiebt sich jeden Tag von selbst. Offline, ohne Werbung.",
  /* ⛔ Dieselben vier Screenshots wie die englische Seite, und genau die zeigt
     diese Seite bereits in ihrem Textkörper. Sie zeigen die App auf Englisch: die
     Aufnahmebank kann noch keine Serie pro Sprache erzeugen. Sobald das geht,
     ändern sich diese vier URL hier UND im Textkörper. */
  "screenshot": [
    "https://risetime.app/assets/screenshots/alarm-list.png",
    "https://risetime.app/assets/screenshots/alarm-picker.png",
    "https://risetime.app/assets/screenshots/dismiss-screen.png",
    "https://risetime.app/assets/screenshots/settings-screen.png"
  ],
  /* Die neun Einträge der englischen Seite, in derselben Reihenfolge. ⛔ Die
     Namen der Einstellungen stammen aus der .po und aus nichts anderem — „Ein
     Sonnenwinkel“, „Eine Schattenlänge“, „Ein Bruchteil des Tages oder der
     Nacht“, „Sonnenmittag“, „Nadir“, „Kalibrierung“ — und „Schleife“ für die
     Wiederholung eines Timers. ⚠️ Niemals „Wiederholung“ hier: in der App ist
     das der Aufschub eines Weckers (Schlummern). */
  "featureList": [
    "Wecker verankert am Sonnenaufgang, am Sonnenuntergang, am Sonnenmittag oder am Nadir",
    "Eigene Anker: ein Sonnenwinkel, eine Schattenlänge, ein Bruchteil des Tages oder der Nacht",
    "Die Kalibrierung eines Ankers, um sich an einen veröffentlichten Zeitplan anzupassen",
    "Eine automatische Neuberechnung jeden Tag, sobald sich die Sonnenzeiten verschieben",
    "Funktioniert vollständig offline — keine Internetberechtigung",
    "Keine Nutzungsstatistik, kein Tracking, keine Datenerfassung",
    "Himmlische Wecker und Wecker zu fester Uhrzeit, gemeinsam unterstützt",
    "Die Wecker-API des Systems — sie übersteht den Doze-Modus und Neustarts",
    "Countdown-Timer, deren Schleifen in Phase bleiben"
  ],
  /* ⛔ „Deltawaken“, Wort für Wort wie die englische Seite, und die URL dazu:
     zwei Namen für eine Organisation brechen den Abgleich der Entität.
     ⚠️ Die Fußzeile behält „A. Deltawaken“ — das ist eine menschliche Signatur,
     kein Herausgeber-Kennzeichen. */
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken",
    "url": "https://risetime.app/"
  },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
},
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "de",
  "mainEntity": [
    { "@type": "Question", "name": "Was genau macht Risetime?",
      "acceptedAnswer": { "@type": "Answer", "text": "Risetime ist ein Wecker, der einen Alarm an einen Sonnenstand binden kann. Stellen Sie einmal „30 Minuten vor Sonnenaufgang“ ein, und der Alarm wird für Ihren Standort jeden Tag neu berechnet: Er folgt der Sonne das ganze Jahr über. Er kann auch gewöhnliche Wecker zu fester Uhrzeit und Timer." } },
    { "@type": "Question", "name": "Braucht Risetime eine Internetverbindung?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nein. Risetime hat keine Internetberechtigung — sie kann sich nicht verbinden, selbst wenn sie wollte. Die Zeiten für Sonnenaufgang und Sonnenuntergang werden auf Ihrem Gerät berechnet. Sie funktioniert im Flugmodus, im Gelände, überall." } },
    { "@type": "Question", "name": "Macht sie auch gewöhnliche Wecker zu fester Uhrzeit?",
      "acceptedAnswer": { "@type": "Answer", "text": "Ja. Uhrzeit-Wecker und an die Sonne verankerte Wecker leben in derselben Liste, und die Timer haben ihren eigenen Tab, mit eigenem Ton und eigener Lautstärke." } },
    { "@type": "Question", "name": "Kann ich einen Wecker auf die Morgendämmerung, die goldene Stunde oder die tiefe Nacht stellen?",
      "acceptedAnswer": { "@type": "Answer", "text": "Ja, über den Sonnenwinkel. Erstellen Sie einen Anker bei −6° für die bürgerliche Morgendämmerung, +6° am Abend für die goldene Stunde, −18° für die astronomische Nacht, und stellen Sie Ihre Wecker darauf. Wird ein Winkel während eines Teils des Jahres nie erreicht, sagt die App das, und der Wecker lässt diese Tage aus, statt zu einer erfundenen Uhrzeit zu klingeln." } },
    { "@type": "Question", "name": "Klingelt der Wecker auch im Doze-Modus oder im Energiesparmodus?",
      "acceptedAnswer": { "@type": "Answer", "text": "Ja. Risetime nutzt die setAlarmClock-API von Android — denselben Systemmechanismus wie die mit Ihrem Telefon gelieferte Uhr —, und eine Zuverlässigkeitsübersicht prüft, welche Berechtigungen Ihr Telefon braucht. Die Wecker klingeln sogar vor dem ersten Entsperren nach einem Neustart." } },
    { "@type": "Question", "name": "Ist Risetime kostenlos?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kostenlos bis zu drei Weckern und drei Timern, für immer. Brauchen Sie mehr? Nutzen Sie zuerst diese drei, und sehen Sie, ob es Ihre Unterstützung wert ist: Unterstützer haben unbegrenzt Wecker und Timer, im Jahresabo oder als Einmalkauf." } }
  ]
}
]

const PLAY = "https://play.google.com/apps/testing/com.deltawaken.risetime"
const PlayBadge = () => (
  <a className="play-badge" href={PLAY} target="_blank" rel="noopener" aria-label="Am offenen Test von Risetime auf Google Play teilnehmen">
    <span className="badge-main">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
      Google Play
    </span>
    <span className="badge-sub">Offener Test</span>
  </a>
)

export default function StartseitePage() {
  return (
    <div className="landing">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <a href="#main-content" className="skip-link">Zum Hauptinhalt springen</a>

        <SiteHeader current="/" lang="de" />

        <main id="main-content">

          <section className="hero" aria-labelledby="hero-heading">
            <h1 id="hero-heading"><span className="hero-brand">Risetime</span> <span className="hero-sep" aria-hidden="true">&mdash;</span> die Solarwecker-App für Android.</h1>
            <p className="hero-celestial">Ihr himmlischer Wecker.</p>
            <p className="hero-sub">Stellen Sie Ihren Wecker nach der Sonne. Er verschiebt sich jeden Tag, damit Sie es nicht tun müssen.</p>
            <div className="hero-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/de/alarm-list"
                darkBase="/assets/screenshots/de/alarm-list--dark"
                alt="Weckerliste von Risetime mit fünf Weckern: 05:10 am Samstag bei Astronomische Morgendämmerung, ein eigener Anker; 07:00 von Montag bis Freitag bei Genau, zu fester Uhrzeit; 07:02 morgen bei Sonnenaufgang; 17:38 von Montag bis Freitag, 1 Std. vor Sonnenuntergang; und 23:02 heute, 8 Std. vor Sonnenaufgang, ausgeschaltet."
                width={360}
                height={706}
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="cta-group">
              <PlayBadge />
              <p className="cta-note">Risetime befindet sich im offenen Test: Sie treten zuerst dem Test bei und installieren dann über Play. Ohne diesen Schritt teilt Play Ihnen unter Umständen mit, dass die App in Ihrem Land nicht verfügbar ist.</p>
            </div>
          </section>

          <section className="how-it-works" aria-labelledby="how-heading">
            <h2 id="how-heading">Wie der Sonnenaufgangswecker funktioniert</h2>
            <ol className="steps" role="list">
              <li><strong>Wählen Sie Ihren Anker</strong><span>Ein Himmelsereignis: Sonnenaufgang, Sonnenmittag, Sonnenuntergang oder Nadir. Das ist der Bezugspunkt, dem Ihr Wecker folgt.</span></li>
              <li><strong>Stellen Sie Ihren Versatz ein</strong><span>Wie lange vorher oder nachher. Dreißig Minuten vor dem Sonnenaufgang. Eine Stunde nach dem Sonnenuntergang. Und die Tage, an denen er sich wiederholt.</span></li>
              <li><strong>Das war's</strong><span>Risetime berechnet die genaue Uhrzeit jeden Tag neu. Der Sonnenaufgang wandert mit den Jahreszeiten — Ihr Wecker folgt. Sie fassen ihn nie wieder an.</span></li>
            </ol>
          </section>

          <section className="features" aria-labelledby="features-heading">
            <h2 id="features-heading">Was die App Risetime kann</h2>
            <div className="feature-grid">
              <article className="feature-card">
                <h3>Verankert am Tageslauf</h3>
                <p>Stellen Sie Ihre Wecker relativ zu Sonnenaufgang, Sonnenmittag, Sonnenuntergang oder Nadir, mit dem Versatz, den Sie möchten. Die Uhrzeit wird jeden Tag neu berechnet, um mit dem echten Himmel in Phase zu bleiben. Einmal eingestellt, das ganze Jahr richtig.</p>
              </article>
              <article className="feature-card">
                <h3>Offline, und privat von Grund auf</h3>
                <p>Risetime hat keine Internetberechtigung. Nicht deaktiviert: abwesend. Die Sonnenaufgangszeiten werden auf Ihrem Gerät berechnet, mit eingebauten astronomischen Algorithmen. Kein Server, kein Konto, keine Daten, die Ihr Telefon verlassen.</p>
              </article>
              <article className="feature-card">
                <h3>Einmal einstellen, dann vergessen</h3>
                <p>Die App berechnet Ihre Zeiten im Hintergrund neu, jeden Tag. Meistens öffnen Sie sie nicht einmal. Das ist Absicht: Risetime ist am besten, wenn Sie vergessen, dass es sie gibt.</p>
              </article>
              <article className="feature-card">
                <h3>Echte Wecker, keine Benachrichtigungen</h3>
                <p>Risetime nutzt dieselbe System-API wie die mit Android gelieferte Uhr. Ihr Wecker übersteht den Doze-Modus, die Akku-Optimierung und Neustarts. Zur eingestellten Zeit klingelt das Telefon.</p>
              </article>
              <article className="feature-card">
                <h3>Timer, in derselben App</h3>
                <p>Eine Tastatur, eine nach Dauer sortierte Liste, und eine Wiederholung, deren Zyklen in Phase bleiben — für Intervalle, Sitzungen, Lernblöcke. <a href="/de/timer/">Der Timer-Leitfaden</a></p>
              </article>
            </div>
          </section>

          <section className="use-cases" id="uses" aria-labelledby="use-cases-heading">
            <h2 id="use-cases-heading">Was Sie damit machen können</h2>
            <p>Wer sich eines Sonnenweckers bedient, und was er einstellt:</p>
            <ul className="use-case-list">
              <li><strong>Ein Tag, der der Sonne folgt</strong> — beim Sonnenaufgang aufstehen, vor dem Sonnenuntergang langsamer werden, und Wecker zu fester Uhrzeit für die Zeiten behalten, die andere von Ihnen erwarten. <a href="/de/zirkadianer-rhythmus-wecker/">Wecker für den zirkadianen Rhythmus</a></li>
              <li><strong>Fotografen und Astronomen</strong> — die goldene Stunde, die blaue Stunde und die astronomische Nacht sind Sonnenwinkel, keine festen Uhrzeiten. Stellen Sie den Winkel einmal ein: Er hält auf allen Breiten und in allen Jahreszeiten, offline, im Gelände. <a href="/de/goldene-stunde/">Goldene Stunde, blaue Stunde und Nachthimmel</a></li>
              <li><strong>Meditation, Yoga, eine Praxis beim ersten Licht</strong> — der Sonnengruß, wenn das Licht kommt, oder eine Sitzung davor. Verankern Sie am Sonnenaufgang, an der bürgerlichen Morgendämmerung über ihren Winkel, oder an einem Bruchteil der Nacht. <a href="/de/meditation-sonnenaufgang/">Wecker für Meditation und Yoga</a></li>
              <li><strong>Vor dem Licht aufbrechen</strong> — ans Wasser vor dem Tag, mit einem Wecker, der sich mit dem ersten Licht mitbewegt, statt mit einer Uhrzeit, die man alle paar Wochen nachjustiert.</li>
              <li><strong>Vor der Morgendämmerung aufstehen</strong> — stellen Sie Ihren Versatz vor dem Sonnenaufgang einmal ein: Er folgt dem Sonnenaufgang jeden Tag. Für den genauen Zeitpunkt halten Sie sich an Ihren eigenen Kalender; der Wecker selbst driftet nie.</li>
              <li><strong>Arbeit im Freien, Spaziergänge, Tierhaltung</strong> — wenn Ihr Tag mit dem Tageslicht beginnt, Ihr Wecker auch.</li>
              <li><strong>Intervalle, Sitzungen, Lernblöcke</strong> — Timer, die von selbst neu starten, in derselben App. <a href="/de/timer/">Wiederholende Timer</a></li>
              <li><strong>Wer es satt hat, das ganze Jahr nachzujustieren</strong> — einmal einstellen, es bleibt richtig. <a href="/de/wecker/">Einen Wecker zum Sonnenaufgang oder Sonnenuntergang stellen</a></li>
            </ul>
          </section>

          <section className="screenshots" aria-labelledby="screenshots-heading">
            <h2 id="screenshots-heading">Screenshots — die App für Solarwecker unter Android</h2>
            <div className="screenshot-row">
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/de/alarm-picker"
                  darkBase="/assets/screenshots/de/alarm-picker--dark"
                  alt="Das Dialogfeld zum Erstellen eines Weckers von Risetime, über der Liste geöffnet: das Anker-Symbol Mittag, ein Versatz von minus 1 Stunde und 00 Minuten mit ausgewähltem Stundenfeld, und die Zeile Morgen: 11:49. Ein runder Stundenwähler mit ausgewählter 1 füllt die untere Hälfte, mit Abbrechen und OK darunter."
                  width={360}
                  height={706}
                />
                <figcaption>Anker und Versatz wählen</figcaption>
              </figure>
              <figure>
                {/* ⛔ UN <picture> ORDINAIRE, PAS <ThemedPicture> — et c'est la vérité du
                                  produit, pas une simplification : DANS L'APP, L'ÉCRAN D'ARRÊT NE SUIT
                                  PAS LE THÈME (porteur, 2026-09-28). Son fond est calculé depuis la
                                  couleur solaire de l'instant, en clair comme en sombre.
                                  ⚠️ Il a porté une fausse variante `--dark` jusqu'au 2026-09-28 : les
                                     deux fichiers différaient, mais la SEULE différence était l'encart
                                     système « Viewing full screen » qui polluait les captures — donc le
                                     bug lui-même. Sans lui, ils sont identiques, comme ils le sont
                                     déjà en anglais. */}
                <picture>
                  <source srcSet={`/assets/screenshots/de/dismiss-screen.webp 1x, /assets/screenshots/de/dismiss-screen@2x.webp 2x`} type="image/webp" />
                  <img src="/assets/screenshots/de/dismiss-screen.png" alt="Der Abweisbildschirm von Risetime für einen klingelnden Wecker, randlos gefüllt mit einem verstaubten Rosa aus der Sonnenposition: die Uhrzeit 17:30, das Datum Donnerstag, 1. Oktober, das Wort Wecker, eine große runde Taste SCHLUMMERN, und SCHLIESSEN darunter." width={360} height={706} loading="lazy" decoding="async" />
                </picture>
                <figcaption>Ein sanftes Aufwecken</figcaption>
              </figure>
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/de/settings-screen"
                  darkBase="/assets/screenshots/de/settings-screen--dark"
                  alt="Der Einstellungsbildschirm von Risetime, mit den Zeilen Wecker, Anker, Timer, Telefoneinstellungen, und Standort für Himmelsereignisse eingestellt auf London, Vereinigtes Königreich. Die Zeile Zuverlässigkeit zeigt 8 von 8 Prüfungen grün an und ist geöffnet auf Alles in Ordnung (8) und Prüfungen ohne Bedeutung für dieses Telefon. Risetime unterstützen steht darunter, und die Fußzeile zeigt Risetime."
                  width={360}
                  height={706}
                />
                <figcaption>Eine Zuverlässigkeit, die Sie überprüfen können</figcaption>
              </figure>
            </div>
          </section>

          <section className="privacy-callout" aria-labelledby="privacy-heading">
            <h2 id="privacy-heading">Offline, ohne Internet, ohne Tracking</h2>
            <div className="callout-box">
              <p>Risetime verlangt nicht die Internetberechtigung. Es gibt keinen Server. Es gibt kein Konto, das Sie anlegen müssten. Es gibt kein Messwerkzeug, das beobachtet, wie Sie die App nutzen.</p>
              <ul>
                <li>Keine <code>INTERNET</code>-Berechtigung — die App kann sich nicht verbinden</li>
                <li>Keine Nutzungsstatistik, kein Absturzbericht, keine Telemetrie</li>
                <li>Kein Konto, keine Synchronisierung, keine Verbindung</li>
                <li>Der Standort bleibt auf Ihrem Gerät — er dient nur der Sonnenberechnung</li>
                <li>Keine Werbung, kein Tracking, keine Daten, die mit irgendjemandem geteilt werden</li>
              </ul>
              <a href="/de/datenschutz/" className="privacy-link">Datenschutzerklärung lesen</a>
            </div>
          </section>

          <section className="support" aria-labelledby="support-heading">
            <h2 id="support-heading">Kostenlos bis zu drei Weckern. Unbegrenzt mit Ihrer Unterstützung.</h2>
            <div className="callout-box" style={{"borderInlineStartColor": "var(--muted)"}}>
              <p>Risetime ist kostenlos bis zu drei Weckern und drei Timern — für immer. <br />Brauchen Sie mehr? Nutzen Sie zuerst diese drei, und sehen Sie, ob es Ihre Unterstützung wert ist: Unterstützer haben unbegrenzt Wecker und Timer, im Jahresabo oder als Einmalkauf. Andernfalls lese ich Sie gerne <a href="mailto:contact@risetime.app">direkt</a>. Das findet sich in den Einstellungen.</p>
              <p style={{"marginBottom": "0"}}>Kein Erinnerungsbildschirm, kein Countdown, kein „jetzt upgraden“. Nur ein ehrliches Angebot, wenn Sie bereit sind.</p>
            </div>
          </section>

          <section className="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading">Häufig gestellte Fragen</h2>
            <dl className="faq-list">
              <dt>Was genau macht Risetime?</dt>
              <dd>Risetime ist ein Wecker, der einen Alarm an einen Sonnenstand binden kann. Stellen Sie einmal „30 Minuten vor Sonnenaufgang“ ein, und der Alarm wird für Ihren Standort jeden Tag neu berechnet: Er folgt der Sonne das ganze Jahr über. Er kann auch gewöhnliche Wecker zu fester Uhrzeit und Timer.</dd>
              <dt>Braucht Risetime eine Internetverbindung?</dt>
              <dd>Nein. Risetime hat keine Internetberechtigung — sie kann sich nicht verbinden, selbst wenn sie wollte. Die Zeiten für Sonnenaufgang und Sonnenuntergang werden auf Ihrem Gerät berechnet. Sie funktioniert im Flugmodus, im Gelände, überall.</dd>
              <dt>Macht sie auch gewöhnliche Wecker zu fester Uhrzeit?</dt>
              <dd>Ja. Uhrzeit-Wecker und an die Sonne verankerte Wecker leben in derselben Liste, und die Timer haben ihren eigenen Tab, mit eigenem Ton und eigener Lautstärke.</dd>
              <dt>Kann ich einen Wecker auf die Morgendämmerung, die goldene Stunde oder die tiefe Nacht stellen?</dt>
              <dd>Ja, über den Sonnenwinkel. Erstellen Sie einen Anker bei −6° für die bürgerliche Morgendämmerung, +6° am Abend für die goldene Stunde, −18° für die astronomische Nacht, und stellen Sie Ihre Wecker darauf. Wird ein Winkel während eines Teils des Jahres nie erreicht, sagt die App das, und der Wecker lässt diese Tage aus, statt zu einer erfundenen Uhrzeit zu klingeln.</dd>
              <dt>Klingelt der Wecker auch im Doze-Modus oder im Energiesparmodus?</dt>
              <dd>Ja. Risetime nutzt die <code>setAlarmClock</code>-API von Android — denselben Systemmechanismus wie die mit Ihrem Telefon gelieferte Uhr —, und eine Zuverlässigkeitsübersicht prüft, welche Berechtigungen Ihr Telefon braucht. Die Wecker klingeln sogar vor dem ersten Entsperren nach einem Neustart.</dd>
              <dt>Ist Risetime kostenlos?</dt>
              <dd>Kostenlos bis zu drei Weckern und drei Timern, für immer. Brauchen Sie mehr? Nutzen Sie zuerst diese drei, und sehen Sie, ob es Ihre Unterstützung wert ist: Unterstützer haben unbegrenzt Wecker und Timer, im Jahresabo oder als Einmalkauf.</dd>
            </dl>
          </section>

          <section className="final-cta" aria-labelledby="cta-heading">
            <h2 id="cta-heading">Bereit, mit der Sonne aufzustehen?</h2>
            <PlayBadge />
            <p className="cta-note">Risetime befindet sich im offenen Test: Sie treten zuerst dem Test bei und installieren dann über Play. Ohne diesen Schritt teilt Play Ihnen unter Umständen mit, dass die App in Ihrem Land nicht verfügbar ist.</p>
          </section>

        </main>

        <SiteFooter page="/" lang="de" />
    </div>
  )
}
