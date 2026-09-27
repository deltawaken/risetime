import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// DE NEDERLANDSE PAGINA, met de hand vertaald — porteursbesluit van 2026-09-27:
// een vertaalde pagina draagt ALLES wat de Engelse draagt, aan dezelfde kant: de
// JSX — screenshots met art direction en gestructureerde gegevens inbegrepen.
//
// ⚠️ DE KOPTEKSTEN LEVEN IN content/nl/golden-hour-alarm.md, in ÉÉN exemplaar,
// precies zoals de Engelse ze in content/en/ neemt. `langMetadata` leest daar
// titel, beschrijving en og, voegt er de NEDERLANDSE canonical en de hreflang aan
// toe, en zet `noindex` in een preview-build.
//
// ⛔ DE SLEUTEL BLIJFT DIE VAN DE ENGELSE PAGINA (`/golden-hour-alarm/`): het
// register `PAGES` (lib/pages.ts) noemt haar zo, en de Nederlandse URL wordt
// AFGELEID van de `slug:` van de kop.
//
// ⛔ `nl` staat in `STATIC_LOCALES` (lib/pages.ts): de dynamische route
// `app/[lang]/` produceert deze URL dus NIET.
export const metadata: Metadata = langMetadata('nl', '/golden-hour-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Het gouden uur, het blauwe uur en de nachthemel, op een wekker",
  "description": "Hoe u alarmen instelt op het gouden uur, het blauwe uur en de astronomische nacht op Android, via de zonshoek in plaats van een klokuur, met de wekker-app Risetime. Berekend op het toestel, offline.",
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
  "mainEntityOfPage": "https://risetime.app/nl/gouden-uur-wekker/"
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
      "name": "Wekker gouden uur",
      "item": "https://risetime.app/nl/gouden-uur-wekker/"
    }
  ]
}
]

export default function GoudenUurWekkerPage() {
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

        <SiteHeader current="/golden-hour-alarm/" lang="nl" />

        <div className="page-header">
          <h1>Het gouden uur, het blauwe uur en de nachthemel, op een wekker</h1>
          <p className="subtitle">Stel de hoek eenmalig in. Het alarm volgt het licht het hele jaar.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="s-why">
            <h2 id="s-why" className="sr-only">Waarom een vast alarm het licht mist</h2>
            <p>U weet wanneer het licht mooi is. Het probleem is dat het beweegt: in New York loopt de zonsondergang van <strong>16:31 op 21 december</strong> tot <strong>20:30 op 21 juni</strong>. Een vast alarm voor het gouden uur klopt niet meer na twee weken, en is nutteloos na een maand.</p>
            <p>Risetime stelt een alarm in op <strong>de zonshoek</strong> in plaats van op een klokuur — en het is de hoek die deze vensters werkelijk bepaalt.</p>
          </section>

          <section aria-labelledby="s-angles">
            <h2 id="s-angles">Het licht, via de hoek</h2>
            <table className="timing-table" aria-label="Het gouden uur, het blauwe uur en de astronomische nacht, via de zonshoek">
              <thead><tr><th>Wat u zoekt</th><th>De zon staat&hellip;</th><th>In Risetime</th></tr></thead>
              <tbody>
                <tr><td>Gouden uur, &rsquo;s avonds</td><td>op ongeveer <strong>6° boven</strong> de horizon</td><td>een zonshoek-anker, <strong>+6° &rsquo;s avonds</strong></td></tr>
                <tr><td>Blauw uur, &rsquo;s avonds</td><td>tussen ongeveer <strong>4° en 6° onder de horizon</strong></td><td><strong>&minus;4° &rsquo;s avonds</strong>, het venster loopt door tot &minus;6°</td></tr>
                <tr><td>Gouden uur, &rsquo;s ochtends</td><td>hetzelfde, omgekeerd</td><td><strong>+6° &rsquo;s ochtends</strong></td></tr>
                <tr><td>Astronomische nacht</td><td><strong>18° onder de horizon</strong></td><td><strong>&minus;18° &rsquo;s avonds</strong>, en &minus;18° &rsquo;s ochtends om te weten wanneer ze eindigt</td></tr>
              </tbody>
            </table>
            <p>De definities verschillen van fotograaf tot fotograaf; dit zijn de gangbaarste. Stel de hoek in waarmee u werkt, en de app houdt hem aan op elke breedtegraad en in elk seizoen — iets wat een kant-en-klare regel, "30 minuten voor zonsondergang", niet kan, omdat de duur van de schemering met beide verandert. In Londen op 21 juni valt +6° op 20:27 en de zonsondergang op 21:21: bijna een uur verschil. In New York dezelfde avond, 19:49 en 20:30: veertig minuten.</p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/nl/sky-menu"
                darkBase="/assets/screenshots/nl/sky-menu--dark"
                alt="Het dialoogvenster voor een nieuw alarm, met het geopende ankermenu, met Absoluut, Zonsopkomst, Middag, Gouden uur, Zonsondergang, Blauw uur, Nachthemel en Nadir."
                width={360}
                height={706}
              />
              <figcaption>Uw eigen ankers krijgen een plaats naast zonsopkomst en zonsondergang, in de volgorde van de dag.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-make">
            <h2 id="s-make">Het anker, eens en voorgoed</h2>
            <ol>
              <li>Open <strong>Instellingen → Ankers</strong> en tik op <strong>+</strong>.</li>
              <li>Laat het type op <strong>Een zonshoek</strong> staan en stel uw hoek in — tik op de waarde om hem in te voeren, en kies <strong>ochtend</strong> of <strong>avond</strong>.</li>
              <li>Geef het een naam — <em>Gouden uur</em>, <em>Blauw uur</em>, <em>Nachthemel</em> —, kies een kleur en sla op.</li>
              <li>Stel in het tabblad <strong>Alarmen</strong> een alarm in op dit anker: op het anker zelf, of dertig minuten ervoor om er op tijd te zijn.</li>
            </ol>
            <p><a href="/nl/alarmen/#section-custom" className="content-link">Hoe ankers en tijdsverschillen werken</a></p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/nl/sky-list"
                darkBase="/assets/screenshots/nl/sky-list--dark"
                alt="De alarmenlijst van Risetime met vijf alarmen: 06:45 en 08:10 van maandag tot en met vrijdag bij Absoluut; 17:21 op zaterdag en zondag, 30 min voor Gouden uur; 18:58 op zaterdag en zondag bij Blauw uur; en 20:30 op vrijdag en zaterdag bij Nachthemel."
                width={360}
                height={706}
              />
              <figcaption>Klokalarmen voor de week, zonnealarmen voor het licht.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-week">
            <h2 id="s-week">Een werkweek, en het licht in het weekend</h2>
            <p>De meesten van ons leven niet van de fotografie:</p>
            <table className="timing-table" aria-label="Een week van klokalarmen, en weekendalarmen verankerd aan het licht">
              <thead><tr><th>Moment</th><th>Alarm</th><th>Dagen</th></tr></thead>
              <tbody>
                <tr><td>Wakker worden</td><td>06:45</td><td>Ma&ndash;vr</td></tr>
                <tr><td>Vertrek naar school</td><td>08:10</td><td>Ma&ndash;vr</td></tr>
                <tr><td>Tas inpakken</td><td>30 min voor Gouden uur</td><td>Za en zo</td></tr>
                <tr><td>Blauw uur</td><td>Blauw uur</td><td>Za en zo</td></tr>
                <tr><td>De sterren</td><td>Nachthemel</td><td>Vr en za</td></tr>
              </tbody>
            </table>
            <p>Klokalarmen voor de week, zonnealarmen voor het licht — dezelfde lijst, dezelfde app.</p>
          </section>

          <section aria-labelledby="s-road">
            <h2 id="s-road">Onderweg, en ver van elk netwerk</h2>
            <ul>
              <li><strong>Op reis?</strong> Zet <strong>Locatie automatisch bijwerken</strong> aan bij Instellingen, en uw alarmen volgen u — een verplaatsing, een nieuwe stad, een kustlijn.</li>
              <li><strong>Geen netwerk ter plaatse?</strong> Risetime berekent de positie van de zon op de telefoon, met een astronomische bibliotheek. Ze heeft <strong>geen enkel internetrecht</strong>, ze kan dus niet van een verbinding afhangen: vliegtuigmodus, een canyon, een boot — het alarm weet altijd wanneer het licht komt.</li>
              <li><strong>Geen tracking, geen account, geen advertenties.</strong> Uw positie verlaat de telefoon nooit. <a href="/nl/privacybeleid/" className="content-link">Privacybeleid</a></li>
            </ul>
          </section>

          <section aria-labelledby="s-night">
            <h2 id="s-night">Voor de nachthemel</h2>
            <p>De astronomische nacht is het venster tussen het avond- en het ochtendmoment waarop de zon 18° onder de horizon staat. Zet een anker op elk van beide, en u houdt beide uiteinden van de duisternis vast.</p>
            <p>Ver in het noorden of ver in het zuiden sluit dit venster gedurende een deel van het jaar: in Londen bereikt de zon &minus;18° niet <strong>van 23 mei tot en met 21 juli</strong>. Risetime zegt dit op het moment dat u het anker aanmaakt, met de data van uw eigen locatie, en op die nachten blijft het alarm stil in plaats van af te gaan op een tijdstip dat de hemel nooit voortbrengt.</p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/nl/sky-night-editor"
                darkBase="/assets/screenshots/nl/sky-night-editor--dark"
                alt="De ankereditor op Een zonshoek, ingesteld op −18,0° &rsquo;s avonds, genoemd Nachthemel, met de voorbeeldregel: Volgende: 20:30. De zon bereikt deze hoek hier niet van 23 mei 2027 tot en met 21 juli 2027."
                width={360}
                height={706}
              />
              <figcaption>Een hoek van &minus;18° &rsquo;s avonds, en de weken waarin dit nooit gebeurt.</figcaption>
            </figure>
            <p><strong>Wat Risetime niet doet: de maan.</strong> Geen maanopkomst, geen maanfase, geen maankalender — de app zal u niet vertellen wanneer een volle maan de Melkweg uitwist. Ze doet de zon, en ze doet dat offline.</p>
          </section>

          <section aria-labelledby="s-price">
            <h2 id="s-price" className="sr-only">Wat het kost</h2>
            <p>Risetime is gratis tot drie alarmen en drie timers — voor altijd. Heeft u er meer nodig? Gebruik eerst deze drie, en kijk of het uw steun waard is: wie steunt krijgt onbeperkt alarmen en timers, per jaar of eenmalig voor altijd. Anders hoor ik graag <a href="mailto:contact@risetime.app">van u</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Mis het licht nooit meer.</h2>
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

        <SiteFooter page="/golden-hour-alarm/" lang="nl" />
    </div>
  )
}
