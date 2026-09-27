import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// DE NEDERLANDSE PAGINA, met de hand vertaald — porteursbesluit van 2026-09-27:
// een vertaalde pagina draagt ALLES wat de Engelse draagt, aan dezelfde kant: de
// JSX.
//
// ⚠️ DE KOPTEKSTEN LEVEN IN content/nl/sunrise-meditation-alarm.md, in ÉÉN
// exemplaar, precies zoals de Engelse ze in content/en/ neemt. `langMetadata`
// leest daar titel, beschrijving en og, voegt er de NEDERLANDSE canonical en de
// hreflang aan toe, en zet `noindex` in een preview-build.
//
// ⛔ DE SLEUTEL BLIJFT HET ENGELSE PAD `/sunrise-meditation-alarm/`: dat is de
// identiteit van de pagina, gemeenschappelijk aan alle talen. De Nederlandse slug
// staat in de kop.
//
// ⛔ Seculiere pagina: geen enkele traditie wordt genoemd (porteursbesluit van
// 2026-09-24 's avonds). De labels van de app blijven astronomisch.
export const metadata: Metadata = langMetadata('nl', '/sunrise-meditation-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "inLanguage": "nl",
  "headline": "Een ochtendpraktijk die begint met het licht",
  "description": "Hoe u een Android-wekker instelt voor meditatie of yoga op zonsopkomst, op de burgerlijke of nautische dageraad via haar hoek, of op een fractie van de nacht, met de wekker-app Risetime. Berekend op het toestel, offline.",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/nl/meditatie-wekker-zonsopkomst/"
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
      "name": "Wekker voor meditatie en yoga",
      "item": "https://risetime.app/nl/meditatie-wekker-zonsopkomst/"
    }
  ]
}
]

export default function MeditatieWekkerZonsopkomstPage() {
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

        <SiteHeader current="/sunrise-meditation-alarm/" lang="nl" />

        <div className="page-header">
          <h1>Een praktijk die begint met het licht, niet met een getal</h1>
          <p className="subtitle">Stel het tijdsverschil eenmalig in; het is het licht dat beweegt.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="s-why">
            <h2 id="s-why" className="sr-only">Waarom het eerste licht geen klokuur is</h2>
            <p>Een praktijk die begint met het licht, begint niet op een getal. Het eerste licht verschuift in de loop van het jaar, en ook binnen dezelfde tijdzone: op 21 juni komt de zon op om <strong>06:01 in Mumbai</strong> en om <strong>05:08 in Varanasi</strong>: drieënvijftig minuten verschil, op dezelfde klok.</p>
            <p>Risetime stelt een alarm in op een moment van de zon in plaats van op een klokuur. Dat moment is een <strong>anker</strong>, de afstand die u ertoe aanhoudt een <strong>tijdsverschil</strong>.</p>
          </section>

          <section aria-labelledby="s-names">
            <h2 id="s-names">Vier manieren om het eerste licht te noemen</h2>
            <table className="timing-table" aria-label="Vier manieren om het eerste licht te noemen, en wat u aanmaakt in Risetime">
              <thead><tr><th>Wat u nastreeft</th><th>Waar de zon staat</th><th>In Risetime</th></tr></thead>
              <tbody>
                <tr><td>De zonsopkomst</td><td>de schijf komt los van de horizon</td><td>het ingebouwde anker <strong>Zonsopkomst</strong></td></tr>
                <tr><td>De burgerlijke dageraad</td><td><strong>6° onder</strong> de horizon</td><td>een anker via zonshoek, <strong>&minus;6° &rsquo;s ochtends</strong></td></tr>
                <tr><td>De nautische dageraad</td><td><strong>12° onder</strong></td><td><strong>&minus;12° &rsquo;s ochtends</strong></td></tr>
                <tr><td>Een punt binnen de nacht</td><td>een deel van de weg van zonsondergang naar zonsopkomst</td><td>een anker <strong>Deling</strong>: Nacht, in <em>N</em> delen</td></tr>
              </tbody>
            </table>
            <p>De definities verschillen; dit zijn de gangbaarste. De app houdt de instelling die u kiest aan op elke breedtegraad en in elk seizoen — iets wat een vast "vijfenveertig minuten voor zonsopkomst" niet kan, omdat de duur van de dageraad met beide verandert.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/nl/practice-list"
                darkBase="/assets/screenshots/nl/practice-list--dark"
                alt="Alarmenlijst van Risetime met vier alarmen, allemaal elke dag herhaald: 05:29 bij Laatste deel van de nacht, 05:50 bij Nautische dageraad, 06:29 bij Burgerlijke dageraad, en 07:02 bij Zonsopkomst."
                width={360}
                height={706}
              />
              <figcaption>De vier regels van de tabel, elk als alarm.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-sunrise">
            <h2 id="s-sunrise">De praktijk instellen op zonsopkomst</h2>
            <ol>
              <li>Tik in het tabblad <strong>Alarmen</strong> op <strong>+</strong>.</li>
              <li>Kies in het bovenste menu <strong>Zonsopkomst</strong>.</li>
              <li>Laat de wijzerplaat in het midden staan om bij zonsopkomst af te gaan, of draai hem naar het verschil dat u wilt, tot <strong>11 uur en 59 minuten</strong> aan beide kanten.</li>
              <li>Tik op <strong>OK</strong>, open dan het alarm in de lijst en stel de <strong>Herhaling</strong> in.</li>
            </ol>
            <p>En het alarm dat vroege vogels vragen, is het andere: <strong>een alarm om te gaan slapen</strong>, geen om wakker te worden. Zet het op het anker <strong>Zonsondergang</strong> met een tijdsverschil, met herhaling — dezelfde vier stappen. <a href="/nl/alarmen/" className="content-link">Een wekker instellen op zonsopkomst of zonsondergang</a></p>
          </section>

          <section aria-labelledby="s-angle">
            <h2 id="s-angle">Vóór de zon: de dageraad via haar hoek</h2>
            <ol>
              <li>Open <strong>Instellingen → Ankers</strong> en tik op <strong>+</strong> (die verschijnt zodra de sectie is opengeklapt).</li>
              <li>Laat het type op <strong>Een zonshoek</strong> staan. Voer <strong>&minus;6°</strong> in voor de burgerlijke dageraad of <strong>&minus;12°</strong> voor de nautische dageraad, richting <strong>ochtend</strong>. Dit verschuift telkens een tiende graad, tussen &minus;30° en +30°.</li>
              <li>Geef het een naam, <strong>kies een kleur</strong> — zonder kleur wordt het niet opgeslagen — en sla op.</li>
              <li>Zet in het tabblad <strong>Alarmen</strong> een alarm op dit anker.</li>
            </ol>
            <p>Ver naar het noorden of naar het zuiden daalt de zon gedurende een deel van het jaar nooit zo laag. De editor zegt dit op het moment dat u het anker aanmaakt — <em>&bdquo;De zon bereikt deze hoek hier niet, van X tot Y&rdquo;</em>, met uw eigen data — en op die dagen blijft het alarm stil in plaats van af te gaan op een moment dat de hemel nooit heeft voortgebracht. Er wordt niets verzonnen.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/nl/practice-angle-editor"
                darkBase="/assets/screenshots/nl/practice-angle-editor--dark"
                alt="De ankereditor op Een zonshoek, ingesteld op −6,0° &rsquo;s ochtends, genoemd Burgerlijke dageraad, met de voorbeeldregel: Volgende: 06:29."
                width={360}
                height={706}
              />
              <figcaption>De burgerlijke dageraad als een hoek: zes graden onder de horizon, &rsquo;s ochtends.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-night">
            <h2 id="s-night">Een fractie van de nacht</h2>
            <p>U kunt de ochtend afstemmen op de nacht in plaats van op de dageraad: een punt op een bepaald deel van de duisternis.</p>
            <ol>
              <li><strong>Instellingen → Ankers → +</strong>, en zet de vorm op <strong>Een fractie van de dag of de nacht</strong>.</li>
              <li>Bereik <strong>Nacht</strong>, dan het <strong>Aantal delen</strong> en de <strong>positie</strong> — van 2 tot 48 delen, elke grens ertussen.</li>
              <li>Geef het een naam, kies een kleur, sla op. Een nieuw ontwerp heet <strong>Nacht · 1/15</strong>; het volgt wat u instelt.</li>
              <li>Zet er een alarm op.</li>
            </ol>
            <p>De nacht is hier precies één ding: <strong>van een zonsondergang tot de volgende zonsopkomst</strong>, verdeeld in gelijke delen. Binnen de poolcirkels bestaat zo&rsquo;n nacht mogelijk niet; het anker heeft dan niets te delen, en de app zegt dat — zonder de reeks data die de hoekvorm wel geeft, die deze vorm niet heeft. Stemt u af op een gepubliceerd tijdschema? <strong>Geavanceerd → Verschuiven met N minuten</strong> verplaatst een anker dat u zelf hebt gemaakt, tot dertig minuten aan beide kanten.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/nl/practice-division-editor"
                darkBase="/assets/screenshots/nl/practice-division-editor--dark"
                alt="De ankereditor op Een fractie van de dag of de nacht, met Nacht geselecteerd, Aantal delen ingesteld op 8 en Positie op 7/8, genoemd Laatste deel van de nacht, met de voorbeeldregel: Volgende: 05:29."
                width={360}
                height={706}
              />
              <figcaption>De nacht verdeeld in acht delen, het alarm op het laatste.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-not">
            <h2 id="s-not">Wat Risetime niet doet</h2>
            <p>Haar eigen labels blijven astronomisch — <em>Zonsopkomst</em>, <em>een zonshoek</em>, <em>Nacht · 1/15</em> — terwijl de naam die u invoert de uwe is. Het is een wekker, niet meer:</p>
            <ul>
              <li><strong>Geen signaal halverwege een sessie</strong> — geen enkel scherm stelt een timer samen uit meerdere, dus een zitting van dertig minuten kan niet op tien en op twintig afgaan.</li>
              <li><strong>Geen meditatiegeluid, niets begeleids.</strong> Ze gaat af; u stopt haar.</li>
              <li><strong>Niets met de maan</strong> — Risetime berekent de maan niet: geen fase, geen maankalender.</li>
              <li><strong>Geen slaaptracking, geen account, geen cloud, geen internetrecht</strong> — uw positie verlaat de telefoon nooit. <a href="/nl/privacybeleid/" className="content-link">Privacybeleid</a></li>
            </ul>
            <p><a href="/nl/alarmen/#section-custom" className="content-link">Hoe ankers en tijdsverschillen werken</a></p>
          </section>

          <section aria-labelledby="s-price">
            <h2 id="s-price" className="sr-only">Wat het kost</h2>
            <p>Risetime is gratis tot drie alarmen en drie timers — voor altijd. Heeft u er meer nodig? Gebruik eerst deze drie, en kijk of het uw steun waard is: wie steunt krijgt onbeperkt alarmen en timers, per jaar of eenmalig voor altijd. Anders hoor ik graag <a href="mailto:contact@risetime.app">van u</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Begin met het licht.</h2>
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

        <SiteFooter page="/sunrise-meditation-alarm/" lang="nl" />
    </div>
  )
}
