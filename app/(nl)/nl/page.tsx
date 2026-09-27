import type { Metadata } from 'next'
import { langMetadata } from '../../../lib/metadata'
import SiteHeader from '../../../components/SiteHeader'
import ThemedPicture from '../../../components/ThemedPicture'
import SiteFooter from '../../../components/SiteFooter'

// DE NEDERLANDSE STARTPAGINA, met de hand vertaald — porteursbesluit van
// 2026-09-27: elke vertaalde pagina draagt ALLES wat de Engelse draagt, inclusief
// haar opmaak, aan dezelfde kant: de JSX.
// ⚠️ De kopteksten leven in content/nl/home.md, in één exemplaar.
export const metadata: Metadata = langMetadata('nl', '/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Risetime",
  "alternateName": "Risetime Wekker bij zonsopkomst",
  "operatingSystem": "Android",
  "applicationCategory": "UtilitiesApplication",
  "inLanguage": "nl",
  "url": "https://risetime.app/nl/",
  "description": "Wekker bij zonsopkomst voor Android. Stel uw alarm in op zonsopkomst, zonsondergang of zonnemiddag: het schuift dagelijks vanzelf mee. Offline, zonder advertenties.",
  /* ⛔ Dezelfde vier screenshots als de Engelse, en dat zijn precies die welke deze
     pagina al toont in haar inhoud. Ze tonen de app in het Engels: de bank voor
     screenshots kan nog geen reeks per taal produceren. Zodra dat wel kan,
     veranderen deze vier URL's hier ÉN in de inhoud. */
  "screenshot": [
    "https://risetime.app/assets/screenshots/alarm-list.png",
    "https://risetime.app/assets/screenshots/alarm-picker.png",
    "https://risetime.app/assets/screenshots/dismiss-screen.png",
    "https://risetime.app/assets/screenshots/settings-screen.png"
  ],
  /* De negen items van de Engelse, in dezelfde volgorde. ⛔ De namen van
     instellingen komen uit de .po en nergens anders vandaan — "Een zonshoek",
     "Een schaduwlengte", "Een fractie van de dag of de nacht", "Zonnemiddag",
     "Nadir", "Kalibratie" — en "lus" voor de herhaling van een timer.
     ⚠️ Nooit "herhaling" hier: in de app is dat het uitstellen van een alarm. */
  "featureList": [
    "Alarmen verankerd aan zonsopkomst, zonsondergang, zonnemiddag of nadir",
    "Ankers op maat: een zonshoek, een schaduwlengte, een fractie van de dag of de nacht",
    "De kalibratie van een anker, om aan te sluiten bij een gepubliceerd tijdschema",
    "Een automatische herberekening elke dag, naarmate de zontijden verschuiven",
    "Werkt volledig offline — geen internetrechten",
    "Geen bezoekersstatistieken, geen tracking, geen gegevensverzameling",
    "Hemelse alarmen en alarmen op een vaste tijd, samen ondersteund",
    "De alarm-API van het systeem — hij overleeft de Doze-modus en herstarts",
    "Aftel-timers waarvan de lussen in de pas blijven"
  ],
  /* ⛔ "Deltawaken", woord voor woord als de Engelse, en de URL erbij: twee namen
     voor één organisatie breken de reconciliatie van de entiteit.
     ⚠️ De voettekst behoudt "A. Deltawaken" — dat is een menselijke handtekening,
     geen uitgeversnaam. */
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
  "inLanguage": "nl",
  "mainEntity": [
    { "@type": "Question", "name": "Wat doet Risetime precies?",
      "acceptedAnswer": { "@type": "Answer", "text": "Risetime is een wekker die een alarm kan koppelen aan een moment van de zon. Stel eenmalig ‘30 minuten voor zonsopkomst’ in, en het alarm wordt elke dag opnieuw berekend voor uw locatie: het volgt de zon het hele jaar. Risetime doet ook gewone alarmen op een vaste tijd, en timers." } },
    { "@type": "Question", "name": "Heeft Risetime een internetverbinding nodig?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nee. Risetime heeft geen enkel internetrecht — de app kan geen verbinding maken, zelfs als ze dat zou willen. De tijden van zonsopkomst en zonsondergang worden op uw toestel berekend. Risetime werkt in vliegtuigmodus, op locatie, waar dan ook." } },
    { "@type": "Question", "name": "Doet Risetime ook gewone alarmen op een vaste tijd?",
      "acceptedAnswer": { "@type": "Answer", "text": "Ja. Klokalarmen en alarmen verankerd aan de zon staan in dezelfde lijst, en timers hebben hun eigen tabblad, met hun eigen geluid en volume." } },
    { "@type": "Question", "name": "Kan ik een alarm instellen op de dageraad, het gouden uur of de diepe nacht?",
      "acceptedAnswer": { "@type": "Answer", "text": "Ja, via de zonshoek. Maak een anker op −6° voor de burgerlijke dageraad, +6° ’s avonds voor het gouden uur, −18° voor de astronomische nacht, en stel uw alarmen daarop in. Waar een hoek gedurende een deel van het jaar nooit wordt bereikt, zegt de app dat, en het alarm slaat die dagen over in plaats van op een verzonnen tijdstip af te gaan." } },
    { "@type": "Question", "name": "Gaat het alarm ook af in de Doze-modus of bij batterijbesparing?",
      "acceptedAnswer": { "@type": "Answer", "text": "Ja. Risetime gebruikt de API setAlarmClock van Android — hetzelfde systeemmechanisme als de klok die met uw telefoon is meegeleverd — en een betrouwbaarheidsscherm controleert welke rechten uw telefoon nodig heeft. De alarmen gaan zelfs af vóór de eerste ontgrendeling na een herstart." } },
    { "@type": "Question", "name": "Is Risetime gratis?",
      "acceptedAnswer": { "@type": "Answer", "text": "Gratis tot drie alarmen en drie timers, voor altijd. Heeft u er meer nodig? Gebruik eerst deze drie, en kijk of het uw steun waard is: wie steunt krijgt onbeperkt alarmen en timers, per jaar of eenmalig voor altijd." } }
  ]
}
]

const PLAY = "https://play.google.com/apps/testing/com.deltawaken.risetime"
const PlayBadge = () => (
  <a className="play-badge" href={PLAY} target="_blank" rel="noopener" aria-label="Meedoen aan de open test van Risetime op Google Play">
    <span className="badge-main">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
      Google Play
    </span>
    <span className="badge-sub">Open test</span>
  </a>
)

export default function HomePage() {
  return (
    <div className="landing">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <a href="#main-content" className="skip-link">Naar de hoofdinhoud</a>

        <SiteHeader current="/" lang="nl" />

        <main id="main-content">

          <section className="hero" aria-labelledby="hero-heading">
            <h1 id="hero-heading"><span className="hero-brand">Risetime</span> <span className="hero-sep" aria-hidden="true">&mdash;</span> de app met zonnealarmen voor Android.</h1>
            <p className="hero-celestial">Uw hemelse wekker.</p>
            <p className="hero-sub">Stel uw alarm in op de zon. Het schuift elke dag mee, zodat u dat niet zelf hoeft te doen.</p>
            <div className="hero-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/nl/alarm-list"
                darkBase="/assets/screenshots/nl/alarm-list--dark"
                alt="Alarmenlijst van Risetime met vijf alarmen: 05:10 op zaterdag bij Astronomische dageraad, een aangepast anker; 07:00 van maandag tot en met vrijdag bij Absoluut, een vaste tijd; 07:02 morgen bij Zonsopkomst; 17:38 van maandag tot en met vrijdag, 1 uur voor Zonsondergang; en 23:02 vandaag, 8 uur voor Zonsopkomst, uitgeschakeld."
                width={360}
                height={706}
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="cta-group">
              <PlayBadge />
              <p className="cta-note">Risetime is in open test: u meldt zich eerst aan voor de test en installeert daarna vanuit Play. Zonder die stap kan Play zeggen dat de app niet beschikbaar is in uw land.</p>
            </div>
          </section>

          <section className="how-it-works" aria-labelledby="how-heading">
            <h2 id="how-heading">Hoe het alarm bij zonsopkomst werkt</h2>
            <ol className="steps" role="list">
              <li><strong>Kies uw anker</strong><span>Een hemelgebeurtenis: zonsopkomst, zonnemiddag, zonsondergang of nadir. Dat is het referentiepunt dat uw alarm gaat volgen.</span></li>
              <li><strong>Stel uw tijdsverschil in</strong><span>Hoeveel tijd ervoor, of erna. Dertig minuten voor zonsopkomst. Een uur na zonsondergang. En de dagen waarop het herhaalt.</span></li>
              <li><strong>Dat is alles</strong><span>Risetime berekent elke dag de exacte tijd opnieuw. De zonsopkomst schuift mee met de seizoenen — uw alarm volgt. U hoeft er nooit meer naar om te kijken.</span></li>
            </ol>
          </section>

          <section className="features" aria-labelledby="features-heading">
            <h2 id="features-heading">Wat de app Risetime doet</h2>
            <div className="feature-grid">
              <article className="feature-card">
                <h3>Verankerd aan de dag</h3>
                <p>Stel uw alarmen in ten opzichte van zonsopkomst, zonnemiddag, zonsondergang of nadir, met het tijdsverschil dat u wilt. De tijd wordt elke dag opnieuw berekend om in de pas te blijven met de echte hemel. Eenmalig ingesteld, het hele jaar juist.</p>
              </article>
              <article className="feature-card">
                <h3>Offline, en privé door ontwerp</h3>
                <p>Risetime heeft geen internetrecht. Niet uitgeschakeld: afwezig. De tijden van zonsopkomst worden op uw toestel berekend, met ingebouwde astronomische algoritmes. Geen server, geen account, geen gegevens die uw telefoon verlaten.</p>
              </article>
              <article className="feature-card">
                <h3>Stel hem in, en vergeet hem</h3>
                <p>De app berekent uw tijden elke dag opnieuw, op de achtergrond. Meestal opent u de app niet eens. Dat is de bedoeling: Risetime is op zijn best wanneer u vergeet dat hij bestaat.</p>
              </article>
              <article className="feature-card">
                <h3>Echte alarmen, geen meldingen</h3>
                <p>Risetime gebruikt dezelfde systeem-API als de klok die met Android wordt meegeleverd. Uw alarm overleeft de Doze-modus, batterijoptimalisatie en herstarts. Op het afgesproken moment gaat de telefoon af.</p>
              </article>
              <article className="feature-card">
                <h3>Timers, in dezelfde app</h3>
                <p>Een toetsenbord, een lijst gesorteerd op duur, en een herhaling waarvan de cycli in de pas blijven — voor intervallen, sessies, studieblokken. <a href="/nl/timers/">De gids voor timers</a></p>
              </article>
            </div>
          </section>

          <section className="use-cases" id="uses" aria-labelledby="use-cases-heading">
            <h2 id="use-cases-heading">Wat u ermee kunt doen</h2>
            <p>Wie een zonnewekker gebruikt, en wat diegene instelt:</p>
            <ul className="use-case-list">
              <li><strong>Een dag die de zon volgt</strong> — opstaan bij zonsopkomst, vertragen voor zonsondergang, en vaste alarmen behouden voor de uren die anderen van u verwachten. <a href="/nl/circadiaans-ritme-wekker/">Wekker op circadiaans ritme</a></li>
              <li><strong>Fotografen en sterrenkundigen</strong> — het gouden uur, het blauwe uur en de astronomische nacht zijn hoeken van de zon, geen vaste tijden. Stel de hoek eenmalig in: hij klopt op elke breedtegraad en in elk seizoen, offline, op locatie. <a href="/nl/gouden-uur-wekker/">Gouden uur, blauw uur en nachthemel</a></li>
              <li><strong>Meditatie, yoga, een praktijk bij het eerste licht</strong> — de zonnegroet wanneer het licht komt, of een zitting ervoor. Anker op zonsopkomst, op de burgerlijke dageraad via haar hoek, of op een fractie van de nacht. <a href="/nl/meditatie-wekker-zonsopkomst/">Wekker voor meditatie en yoga</a></li>
              <li><strong>Erop uit vóór het licht</strong> — het water op voor de dag begint, met een alarm dat meebeweegt met het eerste licht in plaats van een tijd die u om de paar weken moet bijstellen.</li>
              <li><strong>Opstaan vóór de dageraad</strong> — stel uw tijdsverschil vóór zonsopkomst eenmalig in: het volgt de zonsopkomst elke dag. Voor het precieze moment raadpleegt u uw eigen kalender; het alarm zelf loopt nooit uit de pas.</li>
              <li><strong>Werk buiten, wandelingen, veehouderij</strong> — als uw dag begint met de dag, doet uw alarm dat ook.</li>
              <li><strong>Intervallen, sessies, studieblokken</strong> — timers die vanzelf opnieuw beginnen, in dezelfde app. <a href="/nl/timers/">Herhalende timers</a></li>
              <li><strong>Iedereen die het beu is om het hele jaar bij te stellen</strong> — eenmalig instellen, en het blijft juist. <a href="/nl/alarmen/">Een wekker instellen op zonsopkomst of zonsondergang</a></li>
            </ul>
          </section>

          <section className="screenshots" aria-labelledby="screenshots-heading">
            <h2 id="screenshots-heading">Schermafbeeldingen — de app met zonnealarmen voor Android</h2>
            <div className="screenshot-row">
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/nl/alarm-picker"
                  darkBase="/assets/screenshots/nl/alarm-picker--dark"
                  alt="Het dialoogvenster voor een nieuw alarm van Risetime, geopend boven de lijst: het ankerbadge Middag, een tijdsverschil van min 1 uur en 00 minuten met het urenveld geselecteerd, en de regel Morgen: 11:49. Een rond urenwijzerplaat met 1 geselecteerd vult de onderste helft, met Annuleren en OK eronder."
                  width={360}
                  height={706}
                />
                <figcaption>Kies het anker en het tijdsverschil</figcaption>
              </figure>
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/nl/dismiss-screen"
                  darkBase="/assets/screenshots/nl/dismiss-screen--dark"
                  alt="Het stopscherm van Risetime voor een afgaand alarm, van rand tot rand gevuld met een oudroze kleur ontleend aan de stand van de zon: de tijd 17:30, de datum donderdag 1 oktober, het woord Alarm, een grote ronde knop SLUIMEREN, en STOPPEN eronder."
                  width={360}
                  height={706}
                />
                <figcaption>Een zachte wekker</figcaption>
              </figure>
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/nl/settings-screen"
                  darkBase="/assets/screenshots/nl/settings-screen--dark"
                  alt="Het instellingenscherm van Risetime, met de regels Alarmen, Ankers, Timers, Telefooninstellingen, en Locatie voor hemelgebeurtenissen ingesteld op Londen, Verenigd Koninkrijk. De regel Betrouwbaarheid toont 8 van de 8 controles groen en is opengeklapt op Controles zonder betekenis voor deze telefoon en Alles in orde (8). Risetime steunen staat eronder, en de voettekst toont Risetime."
                  width={360}
                  height={706}
                />
                <figcaption>Een betrouwbaarheid die u kunt controleren</figcaption>
              </figure>
            </div>
          </section>

          <section className="privacy-callout" aria-labelledby="privacy-heading">
            <h2 id="privacy-heading">Offline, zonder internet, zonder tracking</h2>
            <div className="callout-box">
              <p>Risetime vraagt geen internetrecht. Er is geen server. Er is geen account om aan te maken. Er is geen enkel meetinstrument dat bijhoudt hoe u de app gebruikt.</p>
              <ul>
                <li>Geen <code>INTERNET</code>-recht — de app kan geen verbinding maken</li>
                <li>Geen gebruiksstatistieken, geen crashrapporten, geen telemetrie</li>
                <li>Geen account, geen synchronisatie, geen verbinding</li>
                <li>De locatie blijft op uw toestel — ze dient alleen voor de zonberekening</li>
                <li>Geen advertenties, geen tracking, geen gegevens gedeeld met wie dan ook</li>
              </ul>
              <a href="/nl/privacybeleid/" className="privacy-link">Het privacybeleid lezen</a>
            </div>
          </section>

          <section className="support" aria-labelledby="support-heading">
            <h2 id="support-heading">Gratis tot drie alarmen. Onbeperkt door te steunen.</h2>
            <div className="callout-box" style={{"borderInlineStartColor": "var(--muted)"}}>
              <p>Risetime is gratis tot drie alarmen en drie timers — voor altijd. <br />Heeft u er meer nodig? Gebruik eerst deze drie, en kijk of het uw steun waard is: wie steunt krijgt onbeperkt alarmen en timers, per jaar of eenmalig voor altijd. Anders hoor ik graag <a href="mailto:contact@risetime.app">van u</a>. Dat vindt u terug bij Instellingen.</p>
              <p style={{"marginBottom": "0"}}>Geen herinneringsscherm, geen aftelklok, geen "upgrade nu". Gewoon een eerlijk aanbod, wanneer u er klaar voor bent.</p>
            </div>
          </section>

          <section className="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading">Veelgestelde vragen</h2>
            <dl className="faq-list">
              <dt>Wat doet Risetime precies?</dt>
              <dd>Risetime is een wekker die een alarm kan koppelen aan een moment van de zon. Stel eenmalig &lsquo;30 minuten voor zonsopkomst&rsquo; in, en het alarm wordt elke dag opnieuw berekend voor uw locatie: het volgt de zon het hele jaar. Risetime doet ook gewone alarmen op een vaste tijd, en timers.</dd>
              <dt>Heeft Risetime een internetverbinding nodig?</dt>
              <dd>Nee. Risetime heeft geen enkel internetrecht — de app kan geen verbinding maken, zelfs als ze dat zou willen. De tijden van zonsopkomst en zonsondergang worden op uw toestel berekend. Risetime werkt in vliegtuigmodus, op locatie, waar dan ook.</dd>
              <dt>Doet Risetime ook gewone alarmen op een vaste tijd?</dt>
              <dd>Ja. Klokalarmen en alarmen verankerd aan de zon staan in dezelfde lijst, en timers hebben hun eigen tabblad, met hun eigen geluid en volume.</dd>
              <dt>Kan ik een alarm instellen op de dageraad, het gouden uur of de diepe nacht?</dt>
              <dd>Ja, via de zonshoek. Maak een anker op &minus;6&deg; voor de burgerlijke dageraad, +6&deg; &rsquo;s avonds voor het gouden uur, &minus;18&deg; voor de astronomische nacht, en stel uw alarmen daarop in. Waar een hoek gedurende een deel van het jaar nooit wordt bereikt, zegt de app dat, en het alarm slaat die dagen over in plaats van op een verzonnen tijdstip af te gaan.</dd>
              <dt>Gaat het alarm ook af in de Doze-modus of bij batterijbesparing?</dt>
              <dd>Ja. Risetime gebruikt de API <code>setAlarmClock</code> van Android — hetzelfde systeemmechanisme als de klok die met uw telefoon is meegeleverd — en een betrouwbaarheidsscherm controleert welke rechten uw telefoon nodig heeft. De alarmen gaan zelfs af vóór de eerste ontgrendeling na een herstart.</dd>
              <dt>Is Risetime gratis?</dt>
              <dd>Gratis tot drie alarmen en drie timers, voor altijd. Heeft u er meer nodig? Gebruik eerst deze drie, en kijk of het uw steun waard is: wie steunt krijgt onbeperkt alarmen en timers, per jaar of eenmalig voor altijd.</dd>
            </dl>
          </section>

          <section className="final-cta" aria-labelledby="cta-heading">
            <h2 id="cta-heading">Klaar om op te staan met de zon?</h2>
            <PlayBadge />
            <p className="cta-note">Risetime is in open test: u meldt zich eerst aan voor de test en installeert daarna vanuit Play. Zonder die stap kan Play zeggen dat de app niet beschikbaar is in uw land.</p>
          </section>

        </main>

        <SiteFooter page="/" lang="nl" />
    </div>
  )
}
