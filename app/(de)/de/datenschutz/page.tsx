import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import SiteFooter from '../../../../components/SiteFooter'

// DIE DEUTSCHE SEITE, VON HAND GESCHRIEBEN — Entscheidung des Auftraggebers vom
// 2026-09-27: „on ne fait plus de markdown […] tu vas juste bien gentiment tout
// traduire toi-même“. Eine übersetzte Seite trägt daher ALLES, was die englische
// trägt, ihr Mobiliar eingeschlossen, auf derselben Seite wie sie: dem JSX.
//
// ⚠️ IHRE KOPFZEILEN-STRINGS LEBEN IN content/de/privacy.md, in EINEM Exemplar,
// genau wie bei der englischen Seite in content/en/. `langMetadata` liest dort
// Titel, Beschreibung und og, fügt das DEUTSCHE canonical und die hreflang hinzu,
// und setzt `noindex` im Preview-Build.
//
// ⛔ `de` steht in `STATIC_LOCALES` (lib/pages.ts): die dynamische Route
// `app/[lang]/` erzeugt diese URL daher NICHT — sonst würde Next sie doppelt bauen.
export const metadata: Metadata = langMetadata('de', '/privacy/')

export default function DatenschutzPage() {
  return (
    <div className="layout-narrow">
      <a href="#main-content" className="skip-link">Zum Hauptinhalt springen</a>

        <SiteHeader current="/privacy/" lang="de" />

        <div className="page-header">
          <h1>Datenschutzerklärung</h1>
          <p className="meta">Datum des Inkrafttretens: 2026-09-13 &middot; Herausgeber: A. Deltawaken</p>
        </div>

        <main id="main-content" className="content-main">

          <div className="highlight-box">
            <p>Risetime erhebt, überträgt und teilt keine personenbezogenen Daten. Ihre Informationen verlassen Ihr Gerät niemals.</p>
          </div>

          <section aria-labelledby="section-not-do">
            <h2 id="section-not-do">Was Risetime nicht tut</h2>
            <ul>
              <li>Erhebt keine personenbezogenen Daten</li>
              <li>Verbindet sich nicht mit dem Internet</li>
              <li>Überträgt Ihren Standort an keinen Server</li>
              <li>Nutzt weder Nutzungsstatistiken noch Absturzberichte noch Telemetrie</li>
              <li>Enthält keine Werbung</li>
              <li>Verfolgt Sie weder von App zu App noch von Website zu Website</li>
              <li>Teilt keine Daten mit Dritten</li>
            </ul>
          </section>

          <section aria-labelledby="section-local-data">
            <h2 id="section-local-data">Die auf Ihrem Gerät gespeicherten Daten</h2>
            <p>Risetime speichert die folgenden Daten <strong>ausschließlich auf Ihrem Gerät</strong>, ohne sie jemals zu übertragen:</p>
            <ul>
              <li><strong>Ihre Weckerkonfiguration</strong> — Uhrzeiten, Namen, Wiederholung und Ankertyp (Sonnenaufgang, Sonnenuntergang usw.). Gespeichert in einer lokalen Room-Datenbank.</li>
              <li><strong>Der Standort</strong> — die Stadt oder die GPS-Koordinaten, die Sie für die Himmelsberechnungen wählen (Zeiten für Sonnenaufgang und Sonnenuntergang). Dient ausschließlich der lokalen Berechnung. Wird niemals übertragen.</li>
              <li><strong>Die App-Einstellungen</strong> — Einstellungen, einschließlich des Status Ihres Abonnements. Gespeichert in einem lokalen DataStore.</li>
            </ul>
            <p>Alle diese Daten verschwinden, wenn Sie die App deinstallieren.</p>
          </section>

          <section aria-labelledby="section-location">
            <h2 id="section-location">Die Standortberechtigung</h2>
            <p>Risetime fragt die Berechtigung für den <strong>ungefähren Standort</strong> (<code>ACCESS_COARSE_LOCATION</code>) ausschließlich zum Zweck der Berechnung der lokalen Zeiten für Sonnenaufgang und Sonnenuntergang ab. Ihr Standort wird auf dem Gerät von einer Ephemeriden-Engine verarbeitet und niemals an einen externen Dienst oder Server gesendet.</p>
            <p>Sie können Ihre Stadt auch von Hand in den Einstellungen eingeben: Das GPS wird dann nicht genutzt.</p>
          </section>

          <section aria-labelledby="section-internet">
            <h2 id="section-internet">Die Internetberechtigung</h2>
            <p>Risetime <strong>deklariert nicht</strong> die Berechtigung <code>INTERNET</code> und führt keine Netzwerkanfrage aus. Die App funktioniert vollständig offline.</p>
            <p>Das optionale Abonnement läuft über Google Play Billing, das mit den Google-Play-Diensten über einen Austausch zwischen Prozessen auf Ihrem Gerät kommuniziert — und nicht über einen von Risetime ausgehenden Netzwerkaufruf. Dieser Austausch unterliegt der <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Datenschutzerklärung von Google</a>.</p>
          </section>

          <section aria-labelledby="section-subscriptions">
            <h2 id="section-subscriptions">Die Abonnements</h2>
            <p>Risetime bietet ein optionales Abonnement an, „Risetime Supporter“. Die Käufe werden vollständig über Google Play abgewickelt. Risetime erhält, speichert und verarbeitet keine Zahlungsinformationen. Der Abonnementstatus wird ausschließlich auf Ihrem Gerät gespeichert.</p>
          </section>

          <section aria-labelledby="section-children">
            <h2 id="section-children">Der Schutz der Privatsphäre von Kindern</h2>
            <p>Risetime erhebt wissentlich keine Informationen von niemandem, einschließlich Kindern unter dreizehn Jahren. Da keine Daten erhoben werden, erfüllt Risetime COPPA und vergleichbare Regelungen von Grund auf.</p>
          </section>

          <section aria-labelledby="section-changes">
            <h2 id="section-changes">Änderungen dieser Richtlinie</h2>
            <p>Falls sich diese Datenschutzerklärung ändert, wird die aktualisierte Fassung an dieser Adresse veröffentlicht, mit einem neuen Datum des Inkrafttretens. Da keine Daten erhoben werden, dürfte eine Änderung Ihre Privatsphäre in der Praxis kaum beeinträchtigen.</p>
          </section>

          <section aria-labelledby="section-contact">
            <h2 id="section-contact">Kontakt</h2>
            <p>Fragen zu dieser Datenschutzerklärung können an den Herausgeber gerichtet werden, an <a href="mailto:contact@risetime.app">contact@risetime.app</a>, oder über die Google-Play-Seite von Risetime.</p>
          </section>

        </main>

        <SiteFooter page="/privacy/" lang="de" />
    </div>
  )
}
