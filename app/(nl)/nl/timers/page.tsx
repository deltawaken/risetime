import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// DE NEDERLANDSE TIMERSPAGINA, met de hand vertaald — porteursbesluit van
// 2026-09-27: een vertaalde pagina draagt ALLES wat de Engelse draagt, haar
// screenshots en gestructureerde gegevens inbegrepen, aan dezelfde kant: de JSX.
//
// ⚠️ DE KOPTEKSTEN LEVEN IN content/nl/timers.md, in ÉÉN exemplaar. `langMetadata`
// leest daar titel, beschrijving en og, voegt er de NEDERLANDSE canonical
// (/nl/timers/, afgeleid van `slug:`) en de hreflang aan toe. ⛔ De SLEUTEL die
// hier wordt doorgegeven blijft die van de ENGELSE pagina, `/timers/`: dat is de
// identiteit van de pagina, niet haar URL.
//
// ⛔ `nl` staat in `STATIC_LOCALES` (lib/pages.ts): de dynamische route
// `app/[lang]/` produceert deze URL dus NIET.
//
// Vastgelegd vocabulaire, en het staat niet ter discussie: het ding heet een
// "timer in een lus", wat het doet is "in een lus lopen", en zijn rondes zijn "cycli".
// Voor de LUS zelf — het feit dat een cyclus vanzelf een nieuwe cyclus start —
// gebruikt de proza hieronder "lus", het woord van het vakje "lus" en van de knop
// "Lus stoppen" in de app. "Herhalen" is in de app de weekdagen van een alarm, en
// "Sluimeren" het uitstellen: nooit door elkaar halen.
export const metadata: Metadata = langMetadata('nl', '/timers/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Een timer die vanzelf opnieuw begint",
  "description": "De timer in een lus van Risetime: een duur, opnieuw gestart met een vaste tussenpoos, waarvan de cycli in de pas blijven, met een knop Lus stoppen om ermee op te houden — plus de gewone timers die elke klok kan.",
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
  "mainEntityOfPage": "https://risetime.app/nl/timers/"
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
      "name": "Timers",
      "item": "https://risetime.app/nl/timers/"
    }
  ]
}
]

export default function TimersPage() {
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

        <SiteHeader current="/timers/" lang="nl" />

        <div className="page-header">
          <h1>Een timer die vanzelf opnieuw begint</h1>
          <p className="subtitle">Stel de duur eenmalig in, en het gaat door — plus alles wat de timer van een klok al kan.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-loop">
            <h2 id="section-loop">Hij begint vanzelf opnieuw</h2>
            <p>Dat is het deel dat de klok van uw telefoon waarschijnlijk niet kan. Open de regel van een timer met het chevronnetje en vink <strong>lus</strong> aan: hij wordt een <strong>timer in een lus</strong>. Hij telt af naar nul, gaat kort af, en begint dan opnieuw voor dezelfde duur, tot u de lus stopt. Wat u eenmalig instelt, is de tussenpoos tussen twee keer afgaan.</p>
            <p>Elke cyclus is verankerd aan het moment waarop de vorige <em>verviel</em>, niet aan het moment waarop u hem liet verstommen: twee cycli van dertig minuten maken zestig minuten, geen eenenzestig. Anders zou elk keer afgaan dat u laat doorlopen de rest van de dag verschuiven.</p>

            <div className="highlight-box">
              <p>Standaard gaat een cyclus <strong>vijf seconden</strong> af, met het meldingsgeluid van uw systeem in plaats van een alarmgeluid. Beide zijn aanpasbaar. Er is geen optie "nooit" voor deze duur: een eindeloos geluid zou de lus al bij de eerste cyclus blokkeren.</p>
            </div>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/nl/timer-list"
                darkBase="/assets/screenshots/nl/timer-list--dark"
                alt="Timerlijst van Risetime met drie timers: 3:00 en 10:00, allebei gestopt met een afspeelknop en een resetknop, en 24:45, die loopt, met een roze lus-pictogram, een pauzeknop en een knop +1:00. Onderaan de tabbladen Wekkers, Timers (geselecteerd) en Instellingen."
                width={360}
                height={706}
              />
              <figcaption>Drie timers, gesorteerd op duur. Het roze lus-pictogram geeft aan welke in een lus staat.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-ending">
            <h2 id="section-ending">De lus stoppen</h2>
            <p>Een lus stopt via een knop genaamd <strong>Lus stoppen</strong>: op het afgaanscherm, en ook op de melding van het afgaan, naast <strong>Doorgaan</strong> en de knop die tijd toevoegt.</p>
            <p><strong>lus</strong> uitvinken terwijl een timer afgaat, geeft u nog één cyclus voordat hij stopt: de instelling wordt eenmaal per cyclus gelezen, op het moment waarop het geluid begint.</p>
            <p>Het afgaanscherm verschijnt bij elke cyclus en verdwijnt vanzelf na de vijf seconden — niets om aan te raken, niets om weg te vegen tussen twee cycli.</p>
          </section>

          <section aria-labelledby="section-ordinary">
            <h2 id="section-ordinary">En de gewone timers</h2>
            <p>De rest is wat de timer van een klok al kan. Tik op de plus en u krijgt een schermvullend toetsenbord in plaats van een wijzerplaat: typ de cijfers, ze vullen zich van rechts, zoals bij een magnetron. Vier, nul, nul geeft vier minuten, en zes cijfers brengen u tot <strong>negenennegentig uur</strong>.</p>
            <p>De timers krijgen een plaats in een lijst gesorteerd op de duur waarvoor ze zijn ingesteld, de kortste eerst, niet in de volgorde waarin u ze hebt aangemaakt. Ze lopen parallel — meerdere onafhankelijke aftellingen tegelijk, in een lus of niet.</p>
            <p>Elke regel heeft een pauzeknop, en een knop <strong>+1:00</strong> die tijd toevoegt aan wat er nog rest — één minuut, tenzij u dat wijzigt bij Instellingen. Zet u een timer op pauze, dan wordt die knop een reset. Het chevronnetje opent de regel op <strong>lus</strong> en op verwijderen.</p>
          </section>

          <section aria-labelledby="section-notification">
            <h2 id="section-notification">De melding telt zelfstandig af</h2>
            <p>De aftelling in uw meldingenvenster wordt door Android zelf getekend, en niet opnieuw geschilderd door de app. Ze blijft doorlopen zonder dat er een proces van Risetime in leven is.</p>
            <p>Er is één kaart voor wat loopt of gepauzeerd is, en één voor wat afgaat — precies twee, nooit één per timer die zich opstapelen in het venster.</p>
            <p>Deze kaart wegvegen stopt niets: ze komt meteen terug, opnieuw opgebouwd vanuit de werkelijke toestand, en een timer die afgaat blijft afgaan. Het stoppen gaat altijd via een knop, met opzet.</p>
          </section>

          <section aria-labelledby="section-settings">
            <h2 id="section-settings">Eigen geluid, eigen volume</h2>
            <p>Timers lenen niet de instellingen van uw alarmen, en een timer in een lus leent ook niet die van de eenmalige timer: twee profielen, gekozen naargelang lus is aangevinkt of niet. Elk heeft zijn eigen geluid, volume, geluidsduur en facultatieve volumeopbouw.</p>
            <p>De twee geluidsduren staan op bewust verschillende schalen. Bij een lus: <strong>5, 10, 15, 30, 60 of 120 seconden</strong>. Voor een eenmalige timer: <strong>1, 5, 10, 15, 20 of 25 minuten, of nooit</strong>.</p>
            <p>Er wordt geen geluid met de app meegeleverd: de geluiden zijn die van uw systeem, of een eigen bestand. Twee instellingen blijven gemeenschappelijk in plaats van verdubbeld — of timers trillen, en wat de volumeknoppen doen terwijl een timer afgaat.</p>
          </section>

          <section aria-labelledby="section-not">
            <h2 id="section-not">Wat hij niet zal doen</h2>
            <p>Het is een aftelling en een lus, niet meer:</p>
            <ul>
              <li><strong>Geen afwisseling tussen werk en rust.</strong> Een lus heeft maar één duur; dertig seconden inspanning gevolgd door dertig herstel maakt er twee, en geen enkel scherm stelt een timer samen uit meerdere.</li>
              <li><strong>Geen herinnering halverwege een sessie</strong> — een zitting van dertig minuten kan niet op tien en op twintig afgaan.</li>
              <li><strong>Geen tijdvenster, geen stille uren.</strong> Een lus loopt door tot u ze stopt.</li>
              <li><strong>Geen afgaan op het hele uur.</strong> De telling begint op het moment waarop u de timer start.</li>
            </ul>
          </section>

          <section aria-labelledby="section-setup">
            <h2 id="section-setup">Er een instellen</h2>
            <p>Open het tabblad Timers, tik op de plus, typ de duur. Hij start vanzelf — niets om te noemen, niets om te ordenen. Om hem in een lus te zetten, vinkt u <strong>lus</strong> achter het chevronnetje aan.</p>
            <p>De <a href="/nl/alarmen/" className="content-link">gids voor alarmen</a> behandelt de alarmen, die dezelfde betrouwbaarheidsinstellingen delen.</p>
          </section>

          <section aria-labelledby="section-price">
            <h2 id="section-price" className="sr-only">Wat het kost</h2>
            <p>Risetime is gratis tot drie timers, dezelfde teller als haar alarmen — voor altijd. Eenmaal bereikt, is de knop om toe te voegen simpelweg afwezig: geen dialoogvenster, geen slotje, geen banier om te noemen wat u mist. Stopt uw steun, dan wordt niets verwijderd: elke timer die u hebt aangemaakt blijft werken, u kunt er alleen geen nieuwe meer toevoegen. Heeft u er meer dan drie nodig? Kijk of het uw steun waard is — anders hoor ik graag <a href="mailto:contact@risetime.app">van u</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Stel de duur eenmalig in. Hij houdt het ritme vast.</h2>
            <a className="play-badge" href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Download Risetime in Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Nu beschikbaar</span>
            </a>
          </div>

        </main>

        <SiteFooter page="/timers/" lang="nl" />
    </div>
  )
}
