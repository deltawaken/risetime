import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// DE NEDERLANDSE PAGINA, met de hand vertaald — porteursbesluit van 2026-09-27:
// elke vertaalde pagina draagt ALLES wat de Engelse draagt, inclusief haar
// opmaak, aan dezelfde kant: de JSX.
//
// ⚠️ DE KOPTEKSTEN LEVEN IN content/nl/alarms.md, in ÉÉN exemplaar, precies zoals
// de Engelse ze in content/en/ neemt. `langMetadata` leest daar titel, beschrijving
// en og, voegt er de NEDERLANDSE canonical en de hreflang aan toe, en zet
// `noindex` in een preview-build.
//
// ⛔ DE PAGINASLEUTEL BLIJFT DE ENGELSE, `/alarms/` — dat is de identificatie van
// de pagina in het register (lib/pages.ts), geen URL. De Nederlandse slug
// `alarmen` leeft in de kop van content/nl/alarms.md, en die bepaalt de URL.
//
// ⛔ `nl` staat in `STATIC_LOCALES` (lib/pages.ts): de dynamische route
// `app/[lang]/` produceert deze URL dus NIET, anders zou Next er twee van maken.
export const metadata: Metadata = langMetadata('nl', '/alarms/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Een wekker instellen op zonsopkomst of zonsondergang op Android",
  "description": "Hoe u een Android-wekker instelt op zonsopkomst, zonsondergang, zonnemiddag of een zonshoek naar keuze, met een tijdsverschil zoals “1 uur voor zonsondergang”, met Risetime. Het alarm volgt de zon elke dag, offline.",
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
  "mainEntityOfPage": "https://risetime.app/nl/alarmen/"
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
      "name": "Alarmen",
      "item": "https://risetime.app/nl/alarmen/"
    }
  ]
}
]

export default function AlarmenPage() {
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

        <SiteHeader current="/alarms/" lang="nl" />

        <div className="page-header">
          <h1>Hoe u een wekker instelt op zonsopkomst of zonsondergang op Android</h1>
          <p className="subtitle">Een Risetime-alarm stelt u in als elk ander, in enkele seconden. Wat verandert, is waarop u het kunt instellen.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-intro">
            <h2 id="section-intro" className="sr-only">Alarmen die de zon volgen</h2>
            <p>In plaats van een klokuur kunt u een alarm instellen op een moment van de zon — zonsopkomst, zonsondergang, zonnemiddag. Het alarm volgt dat moment vervolgens elke dag, naarmate de seizoenen het verschuiven.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/nl/alarms-list"
                darkBase="/assets/screenshots/nl/alarms-list--dark"
                alt="Alarmenlijst van Risetime met vijf alarmen: 05:10 op zaterdag bij Astronomische dageraad, een aangepast anker; 07:00 van maandag tot en met vrijdag bij Absoluut, een vaste tijd; 07:02 morgen bij Zonsopkomst; 17:38 van maandag tot en met vrijdag, 1 uur voor Zonsondergang; en 23:02 vandaag, 8 uur voor Zonsopkomst, uitgeschakeld."
                width={360}
                height={706}
              />
              <figcaption>Gewone alarmen en zonnealarmen, in één lijst.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-regular">
            <h2 id="section-regular">Een gewoon alarm instellen</h2>
            <ol>
              <li>Tik in het tabblad <strong>Alarmen</strong> op <strong>+</strong>.</li>
              <li>Stel de tijd in op de wijzerplaat, of typ hem in.</li>
              <li>Tik op <strong>OK</strong>.</li>
            </ol>
            <p>Dat is een gewoon alarm, en het heeft verder niets nodig.</p>
          </section>

          <section aria-labelledby="section-sun">
            <h2 id="section-sun">Een alarm instellen op zonsopkomst of zonsondergang</h2>
            <p>Risetime kent van meet af aan vier momenten van de zon: <strong>Zonsopkomst</strong>, <strong>Zonsondergang</strong>, <strong>Middag</strong> — de zonnemiddag, wanneer de zon het hoogst staat, wat bijna nooit 12:00 is — en <strong>Nadir</strong>, het midden van de nacht, wanneer de zon het laagst staat.</p>
            <ol>
              <li>
                <strong>Geef de eerste keer uw locatie op.</strong> De zontijden hangen af van waar u bent. Zonder locatie toont het alarmvenster gewoon <em>Locatie instellen bij Instellingen</em>.
                <details>
                  <summary>Drie manieren om dit te doen</summary>
                  <p>Bij <strong>Instellingen → Locatie voor hemelgebeurtenissen</strong>: kies uw stad uit de lijst; of gebruik eenmalig de gps van de telefoon; of zet <strong>Locatie automatisch bijwerken</strong> aan, en hij volgt u op reis. Uw positie blijft op uw telefoon: Risetime heeft geen enkel internetrecht, er is dus nergens om ze naartoe te sturen.</p>
                  <figure className="content-screenshot">
                    <ThemedPicture
                      lightBase="/assets/screenshots/nl/alarms-location"
                      darkBase="/assets/screenshots/nl/alarms-location--dark"
                      alt="De instellingen van Risetime, sectie Locatie voor hemelgebeurtenissen geopend: Londen, Verenigd Koninkrijk geselecteerd, een gps-knop, en een uitgevinkt vakje Locatie automatisch bijwerken."
                      width={360}
                      height={706}
                    />
                    <figcaption>De locatie-instelling, met haar gps-knop en haar vakje voor automatisch bijwerken.</figcaption>
                  </figure>
                </details>
              </li>
              <li>Tik in het tabblad <strong>Alarmen</strong> op <strong>+</strong>.</li>
              <li>Kies in het bovenste menu <strong>Zonsopkomst</strong>, <strong>Zonsondergang</strong>, <strong>Middag</strong> of <strong>Nadir</strong>.</li>
              <li>Stel op de wijzerplaat in hoeveel tijd ervoor of erna het alarm moet afgaan — of laat het op <em>Geen tijdsverschil</em> staan.</li>
              <li>Tik op <strong>OK</strong>.</li>
            </ol>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/nl/alarms-anchor-menu"
                darkBase="/assets/screenshots/nl/alarms-anchor-menu--dark"
                alt="Het dialoogvenster voor een nieuw alarm, met het geopende ankermenu: Absoluut, Astronomische dageraad, Zonsopkomst, Middag, Gouden uur, Zonsondergang en Nadir."
                width={360}
                height={706}
              />
              <figcaption>Het menu boven in het alarmvenster: een klokuur, of een moment van de zon.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-offset">
            <h2 id="section-offset">Het tijdsverschil: &bdquo;1 uur voor zonsondergang&rdquo;</h2>
            <p><strong>Een anker is een moment van de zon dat Risetime elke dag opnieuw berekent; uw alarm houdt een vaste afstand tot dat moment aan.</strong> Die afstand is het tijdsverschil, tot 11 uur en 59 minuten ervoor of erna. Het zonmoment verschuift elke dag een beetje; het tijdsverschil dat u koos, nooit.</p>
            <ul>
              <li><strong>Zonsopkomst</strong>, zonder tijdsverschil — met het eerste licht.</li>
              <li><strong>30 min voor Zonsopkomst</strong> — op vóór de dag begint.</li>
              <li><strong>1 uur voor Zonsondergang</strong> — een alarm aan het eind van de dag dat u tijd geeft om naar buiten te gaan zolang het nog licht is.</li>
              <li><strong>8 uur voor Zonsopkomst</strong> — <a href="/nl/circadiaans-ritme-wekker/" className="content-link">een herinnering om te gaan slapen die de zon volgt</a>.</li>
            </ul>
            <p>Een regel onder de wijzerplaat toont wanneer het alarm eerstvolgend afgaat, bijvoorbeeld <em>Morgen: 18:03</em>.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/nl/alarms-offset"
                darkBase="/assets/screenshots/nl/alarms-offset--dark"
                alt="Het dialoogvenster voor een nieuw alarm, ingesteld op Zonsondergang met een tijdsverschil van een uur ervoor, de wijzerplaat voor uren op 1 en die voor minuten op 00, en de regel Vandaag: 17:38."
                width={360}
                height={706}
              />
              <figcaption>Een uur voor zonsondergang. De regel onder het tijdsverschil zegt wanneer het afgaat.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-days">
            <h2 id="section-days">Herhalingsdagen, geluid en de duur ervan</h2>
            <p>Open de alarmkaart in de lijst. Vink <strong>Herhalen</strong> aan en kies uw dagen: de kaart leest dan als u het zou zeggen — <em>Maandag–vrijdag, 1 uur voor Zonsondergang</em>. Dezelfde kaart bevat het label, het geluid, de trilling, de duur van het alarmgeluid en de afbeelding die tijdens het afgaan wordt getoond. De schakelaar heeft drie standen: de middelste slaat alleen de eerstvolgende keer over — voor een vrije dag — en laat het alarm actief.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/nl/alarms-card"
                darkBase="/assets/screenshots/nl/alarms-card--dark"
                alt="Een geopende alarmkaart voor 17:38, van maandag tot en met vrijdag, 1 uur voor Zonsondergang: een leeg veld Label, Herhalen met maandag tot en met vrijdag geselecteerd, Geluid ingesteld op Telefoonstandaard, en Trillen ingeschakeld. De kaart loopt door onder de rand van de afbeelding."
                width={360}
                height={706}
              />
              <figcaption>Een geopende alarmkaart: de herhalingsdagen, en de rest van het alarm.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-custom">
            <h2 id="section-custom">Aangepaste ankers: schemeringen, zonshoeken, schaduwen</h2>
            <p>De zon markeert veel meer dan vier momenten. U kunt uw eigen ankers maken, van drie soorten:</p>
            <ul>
              <li><strong>Een zonshoek</strong> — het moment waarop de zon een bepaalde hoogte boven of onder de horizon bereikt, &rsquo;s ochtends of &rsquo;s avonds. &minus;6&deg; is de burgerlijke dageraad of schemering; &minus;12&deg; de nautische; &minus;18&deg; de astronomische: de volledige nacht. +6&deg; &rsquo;s avonds is een laag, warm licht.</li>
              <li><strong>Een schaduwlengte</strong> — het moment waarop de schaduw van een voorwerp een bepaald veelvoud van zijn hoogte bereikt, voor of na de middag.</li>
              <li><strong>Een fractie van de dag of de nacht</strong> — de nacht (van zonsondergang tot zonsopkomst) of de dag, verdeeld in gelijke delen; u kiest hoeveel, en welke grens. Het laatste zesde deel van de nacht bijvoorbeeld begint op hetzelfde punt in de nacht, ongeacht hoe lang die in dat seizoen duurt.</li>
            </ul>
            <p>Om er een aan te maken:</p>
            <ol>
              <li>Open <strong>Instellingen → Ankers</strong>, en tik op <strong>+</strong>.</li>
              <li>Kies het soort, en stel de waarde ervan in.</li>
              <li>Geef het een naam, of behoud de voorgestelde naam.</li>
              <li>Kies een kleur — <strong>Opslaan</strong> wacht erop.</li>
              <li>Tik op <strong>Opslaan</strong>.</li>
            </ol>
            <p>Het staat nu in het alarmvenster, naast zonsopkomst en zonsondergang, en krijgt een tijdsverschil zoals elk ander anker. Een schakelaar in de ankerlijst haalt de ankers die u niet gebruikt uit dat menu.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/nl/alarms-anchors"
                darkBase="/assets/screenshots/nl/alarms-anchors--dark"
                alt="De instellingen, sectie Ankers: twee aangepaste ankers, Astronomische dageraad en Gouden uur, elk met een bewerkknop en een verwijderknop, tussen de standaardankers Zonsopkomst, Middag, Zonsondergang en Nadir. Elke regel heeft een zichtbaarheidsschakelaar, allemaal ingeschakeld."
                width={360}
                height={706}
              />
              <figcaption>Een aangepast anker krijgt zijn plaats tussen de andere, in de volgorde van de dag.</figcaption>
            </figure>

            <p>Een anker kan ook <strong>gekalibreerd</strong> worden — met maximaal 30 minuten verschoven, om aan te sluiten bij een tijdschema dat u volgt, zoals een lokale kalender.</p>
            <p>Ver van de evenaar worden sommige hoeken gedurende een deel van het jaar nooit bereikt. De editor geeft u de data — in Londen daalt de zon van eind mei tot eind juli niet tot &minus;18&deg; — en op die dagen blijft het alarm stil in plaats van op een verzonnen tijdstip af te gaan.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/nl/alarms-anchor-editor"
                darkBase="/assets/screenshots/nl/alarms-anchor-editor--dark"
                alt="De ankereditor op Een zonshoek, ingesteld op −18,0° &rsquo;s ochtends, genoemd Astronomische dageraad, met de voorbeeldregel Volgende: 05:10. De zon bereikt deze hoek hier niet van 23 mei 2027 tot en met 21 juli 2027."
                width={360}
                height={706}
              />
              <figcaption>&minus;18&deg; &rsquo;s ochtends, ingesteld voor Londen: de editor noemt de weken waarin dit nooit gebeurt.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-calculation">
            <h2 id="section-calculation">Hoe de tijden van zonsopkomst en zonsondergang offline worden berekend</h2>
            <p>Elke tijd van zonsopkomst en zonsondergang wordt op het toestel berekend door een astronomische bibliotheek, <a href="https://shredzone.org/maven/commons-suncalc/" className="content-link">commons-suncalc</a>, gebaseerd op de <em>Astronomical Algorithms</em> van Jean Meeus. Zonsopkomst en zonsondergang worden gemeten voor de bovenrand van de zon, atmosferische refractie inbegrepen — wat uw ogen zien; de zonshoeken voor het middelpunt van de zon, de conventie van schemeringstabellen. Geen enkel verzoek op het web, geen server: dit werkt in vliegtuigmodus, op zee, of in een dal zonder netwerk.</p>
            <p>Risetime draait niet voortdurend. Ze berekent opnieuw na een alarm, tijdens een korte controle om de paar uur, of wanneer de telefoon herstart, van tijd of tijdzone verandert; het systeemalarm van Android — hetzelfde dat de klok gebruikt die met uw telefoon is meegeleverd — doet de rest.</p>
          </section>

          <section aria-labelledby="section-reliability">
            <h2 id="section-reliability">Ervoor zorgen dat het afgaat</h2>
            <p>Sommige telefoons stoppen apps op de achtergrond om de batterij te sparen, en dat kan elk willekeurig alarm doen verstommen. <strong>Instellingen → Betrouwbaarheid</strong> controleert wat uw telefoon nodig heeft en geeft een knop <strong>Oplossen</strong> bij elk ontbrekend onderdeel. Na een herstart gaan de alarmen af, zelfs voordat u de telefoon voor het eerst hebt ontgrendeld.</p>
          </section>

          <section aria-labelledby="section-timers">
            <h2 id="section-timers">Ook timers</h2>
            <p>Het tabblad <strong>Timers</strong> verzamelt de aftellingen, inclusief de timers die vanzelf opnieuw beginnen voor intervallen en studieblokken: <a href="/nl/timers/" className="content-link">hoe herhalende timers werken</a>.</p>
            <p>Risetime is gratis tot drie alarmen en drie timers — voor altijd. Heeft u er meer nodig? Gebruik eerst deze drie, en kijk of het uw steun waard is: wie steunt krijgt onbeperkt alarmen en timers, per jaar of eenmalig voor altijd. Anders hoor ik graag <a href="mailto:contact@risetime.app">van u</a>.</p>
          </section>

          <section aria-labelledby="section-guides">
            <h2 id="section-guides">Gidsen per gebruik</h2>
            <ul>
              <li><a href="/nl/circadiaans-ritme-wekker/" className="content-link">Een ritme van opstaan en gaan slapen dat de zonsopkomst volgt</a></li>
              <li><a href="/nl/gouden-uur-wekker/" className="content-link">Gouden uur, blauw uur en nachthemel, voor fotografen en sterrenkundigen</a></li>
              {/* Add the Muslim prayer times and morning practice guides here once those pages are published. */}
            </ul>
          </section>

          <div className="cta-section">
            <h2>Stel het eenmalig in. Het volgt de zon.</h2>
            <a className="play-badge" href="https://play.google.com/apps/testing/com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Meedoen aan de open test van Risetime op Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Open test</span>
            </a>
            <p className="cta-note">Risetime is in open test: u meldt zich eerst aan voor de test en installeert daarna vanuit Play. Zonder die stap kan Play zeggen dat de app niet beschikbaar is in uw land.</p>
          </div>

        </main>

        <SiteFooter page="/alarms/" lang="nl" />
    </div>
  )
}
