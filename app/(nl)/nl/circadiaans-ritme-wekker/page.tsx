import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// DE NEDERLANDSE PAGINA, met de hand vertaald — porteursbesluit van 2026-09-27.
// Vertaling van app/(en)/circadian-rhythm-alarm/page.tsx, punt voor punt: dezelfde
// secties, dezelfde `id`'s, dezelfde screenshots, dezelfde gestructureerde gegevens.
//
// ⚠️ DE KOPTEKSTEN LEVEN IN content/nl/circadian-rhythm-alarm.md, in ÉÉN
// exemplaar. De sleutel die aan `langMetadata` wordt doorgegeven blijft de
// ENGELSE pagina: dat is de identiteit van de pagina, niet haar adres.
//
// ⛔ GEEN ENKELE GEZONDHEIDSBEWERING. De Engelse pagina is al eens herschreven om
// die te verwijderen. Het circadiaans ritme wordt BESCHREVEN — wat de zon doet,
// wat de app berekent — het wordt niet behandeld.
export const metadata: Metadata = langMetadata('nl', '/circadian-rhythm-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Wekker voor circadiaans ritme op Android: een alarm verankerd aan zonsopkomst",
  "description": "Hoe u een Android-wekker instelt op zonsopkomst, en een dag opgebouwd rond de zon, met de wekker-app Risetime. Het alarm schuift vanzelf mee met de seizoenen; de tijden worden op het toestel berekend, zonder enig internetrecht.",
  "inLanguage": "nl",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/nl/circadiaans-ritme-wekker/"
},
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "inLanguage": "nl",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Risetime",
      "item": "https://risetime.app/nl/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Wekker circadiaans ritme",
      "item": "https://risetime.app/nl/circadiaans-ritme-wekker/"
    }
  ]
}
]

export default function CircadiaansRitmeWekkerPage() {
  return (
    <div className="layout-narrow">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <a href="#main-content" className="skip-link">Naar de hoofdinhoud</a>

        <SiteHeader current="/circadian-rhythm-alarm/" lang="nl" />

        <div className="page-header">
          <h1>Wekker voor circadiaans ritme op Android: een alarm verankerd aan zonsopkomst</h1>
          <p className="subtitle">Het schuift vanzelf mee met de seizoenen.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-what">
            <h2 id="section-what" className="sr-only">Wat een alarm voor circadiaans ritme is</h2>
            <p>"Wekker voor circadiaans ritme" is de naam voor een alarm dat aan de zon hangt in plaats van aan de klok. Het woord komt van de cyclus van ongeveer 24 uur van het lichaam; in een app-winkel betekent het gewoon dat het alarm de zonsopkomst volgt in plaats van op een vaste tijd te blijven.</p>
            <p>In Risetime heet het moment van de zon dat u kiest een <strong>anker</strong> — zonsopkomst, zonnemiddag, zonsondergang — en de afstand die u ertoe aanhoudt is het <strong>tijdsverschil</strong>.</p>
          </section>

          <section aria-labelledby="section-swing">
            <h2 id="section-swing">Hoeveel de zonsopkomst verschuift in de loop van het jaar</h2>
            <table className="timing-table" aria-label="Hoeveel de zonsopkomst verschuift tussen juni en december, per stad">
              <thead>
                <tr><th>Stad</th><th>Vroegste zonsopkomst</th><th>Laatste zonsopkomst</th><th>Verschil</th></tr>
              </thead>
              <tbody>
                <tr><td>Londen</td><td>04:43 (21 juni)</td><td>08:03 (21 dec.)</td><td>3 u 20</td></tr>
                <tr><td>Parijs</td><td>05:46 (21 juni)</td><td>08:41 (21 dec.)</td><td>2 u 55</td></tr>
                <tr><td>Tokio</td><td>04:25 (21 juni)</td><td>06:47 (21 dec.)</td><td>2 u 20</td></tr>
                <tr><td>Chicago</td><td>05:15 (21 juni)</td><td>07:14 (21 dec.)</td><td>2 u 00</td></tr>
                <tr><td>Sydney</td><td>05:41 (21 dec.)</td><td>06:00 (21 juni)</td><td>1 u 20</td></tr>
              </tbody>
            </table>
            <p>Lokale tijd, 2027, berekend met de astronomische bibliotheek die de app gebruikt.</p>
            <p>Een vast alarm om 06:30 in Londen gaat dus <strong>1 u 47 na de zonsopkomst af in juni</strong>, en <strong>1 u 33 ervoor in december</strong>. Hetzelfde alarm, twee verschillende ochtenden.</p>
          </section>

          <section aria-labelledby="section-how">
            <h2 id="section-how">Hoe u een alarm instelt op het circadiaans ritme</h2>
            <ol>
              <li>Tik in het tabblad <strong>Wekkers</strong> op <strong>+</strong>.</li>
              <li>Kies in het bovenste menu <strong>Zonsopkomst</strong>.</li>
              <li>Laat de wijzerplaat staan om op te staan bij zonsopkomst, of draai hem naar de afstand die u wilt — 30 minuten ervoor, een uur ervoor.</li>
              <li>Tik op <strong>OK</strong>. Open vervolgens het alarm in de lijst en vink <strong>Herhalen</strong> aan om uw dagen te kiezen.</li>
            </ol>
            <p>De afstand die u instelt, verandert nooit. De zonsopkomst zelf wel, en het alarm gaat mee — door de equinoxen, de zonnewendes en de overgang naar zomertijd. <a href="/nl/alarmen/" className="content-link">Een wekker instellen op zonsopkomst of zonsondergang</a></p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/nl/circadian-list"
                darkBase="/assets/screenshots/nl/circadian-list--dark"
                alt="Wekkerlijst van Risetime met drie wekkers, alle drie elke dag: 07:02 bij Zonsopkomst, 20:38 2 uur na Zonsondergang, en 23:02 8 uur voor Zonsopkomst."
                width={360}
                height={706}
              />
              <figcaption>Alarmen verankerd aan zonsopkomst en zonsondergang, elke dag herhaald.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-day">
            <h2 id="section-day">Een dag die de zon volgt — en een klok</h2>
            <p>Dit is de dag die ik werkelijk leef, op mijn eigen telefoon:</p>
            <table className="timing-table" aria-label="Een dag opgebouwd uit alarmen verankerd aan de zon en klokalarmen">
              <thead>
                <tr><th>Moment</th><th>Alarm</th><th>Dagen</th></tr>
              </thead>
              <tbody>
                <tr><td>Opstaan</td><td>Zonsopkomst</td><td>ma.–vr.</td></tr>
                <tr><td>Begin van het werk, of opstaan in het weekend</td><td>09:00</td><td>elke dag</td></tr>
                <tr><td>De lunch</td><td>1 u voor Middag — de zonnemiddag, zelden 12:00</td><td>elke dag</td></tr>
                <tr><td>Weer aan de slag</td><td>1 u na Middag</td><td>ma.–vr.</td></tr>
                <tr><td>Stoppen met werken</td><td>18:00</td><td>ma.–vr.</td></tr>
              </tbody>
            </table>
            <p>Er is een zesde, acht uur voor zonsopkomst, om te beginnen vertragen. Die staat op dit moment uit — de middelste stand van de schakelaar behoudt een alarm zonder het te laten afgaan.</p>
            <p>Dat maakt zes alarmen, waarvan één uit — meer dan de drie gratis.</p>
            <p>Degene die verankerd zijn aan de zon volgen het licht; de klokalarmen houden vast aan wat anderen van u verwachten. Beide staan in dezelfde lijst, en elke kaart zegt welke welke is.</p>
            <p>Hoe ver dit gaat, hangt af van waar u woont. In Sydney verschuift de zonsopkomst ongeveer een uur over het jaar, en een dag verankerd aan de zon wijkt daar nauwelijks af. In Londen verschuift ze meer dan drie uur: de ochtend volgt dan de zon, terwijl de werkuren op de klok blijven.</p>
          </section>

          <section aria-labelledby="section-late">
            <h2 id="section-late">Wanneer de zonsopkomst te laat komt</h2>
            <p>Midden in de winter komt de zonsopkomst na het begin van de werkdag — 08:03 in Londen op 21 december. Twee manieren om hiermee om te gaan:</p>
            <ul>
              <li><strong>Liever opstaan bij het eerste licht.</strong> Het licht komt ruim voor de zon. Maak bij Instellingen → Ankers uw eigen anker op de <strong>burgerlijke dageraad</strong> — het moment waarop er genoeg licht is om buiten te zien zonder lamp — en stel uw alarm daarop in. <a href="/nl/alarmen/#section-custom" className="content-link">Ankers via zonshoek en schemering</a></li>
              <li><strong>Houd beide soorten alarm aan</strong>, zoals hierboven: de klok voor dagen die op een vaste tijd beginnen, de zon voor de rest.</li>
            </ul>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/nl/circadian-offset"
                darkBase="/assets/screenshots/nl/circadian-offset--dark"
                alt="Het dialoogvenster voor een nieuwe wekker, ingesteld op het anker Zonsopkomst met een tijdsverschil van −8:00, de wijzerplaat voor uren op 8, en de regel Vandaag: 23:02."
                width={360}
                height={706}
              />
              <figcaption>Elke afstand ten opzichte van het anker, ervoor of erna, tot 11 uur en 59 minuten.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-privacy">
            <h2 id="section-privacy">Een alarm, geen slaaptracking</h2>
            <p>Risetime volgt uw slaap niet. Ze registreert niet het moment waarop u een alarm stopt, ze heeft geen account, geen cloud en geen enkel meetinstrument. Ze heeft <strong>geen enkel internetrecht</strong>: het besturingssysteem zelf verhindert haar dus om verbinding te maken. De tijden van zonsopkomst worden op uw telefoon berekend, en uw positie verlaat hem nooit. Dat is ook waarom ze werkt in vliegtuigmodus, in een vallei, op een boot. <a href="/nl/privacybeleid/" className="content-link">Privacybeleid</a></p>
            <p>Risetime is gratis tot drie alarmen en drie timers — voor altijd. Heeft u er meer nodig? Gebruik eerst deze drie, en kijk of het uw steun waard is: wie steunt krijgt onbeperkt alarmen en timers, per jaar of eenmalig voor altijd. Anders hoor ik graag <a href="mailto:contact@risetime.app">van u</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Sta op met de zon. Houd de klok voor de rest.</h2>
            <a className="play-badge" href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Download Risetime in Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Nu beschikbaar</span>
            </a>
          </div>

        </main>

        <SiteFooter page="/circadian-rhythm-alarm/" lang="nl" />
    </div>
  )
}
