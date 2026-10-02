import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import SiteFooter from '../../../../components/SiteFooter'

// DE NEDERLANDSE PAGINA, met de hand vertaald — porteursbesluit van 2026-09-27:
// elke vertaalde pagina draagt ALLES wat de Engelse draagt, inclusief haar
// opmaak, aan dezelfde kant: de JSX.
//
// ⚠️ DE KOPTEKSTEN LEVEN IN content/nl/privacy.md, in ÉÉN exemplaar, precies
// zoals de Engelse ze in content/en/ neemt. `langMetadata` leest daar titel,
// beschrijving en og, voegt er de NEDERLANDSE canonical en de hreflang aan toe, en
// zet `noindex` in een preview-build.
//
// ⛔ `nl` staat in `STATIC_LOCALES` (lib/pages.ts): de dynamische route
// `app/[lang]/` produceert deze URL dus NIET, anders zou Next er twee van maken.
export const metadata: Metadata = langMetadata('nl', '/privacy/')

export default function PrivacybeleidPage() {
  return (
    <div className="layout-narrow">
      <a href="#main-content" className="skip-link">Naar de hoofdinhoud</a>

        <SiteHeader current="/privacy/" lang="nl" />

        <div className="page-header">
          <h1>Privacybeleid</h1>
          <p className="meta">Ingangsdatum: 2026-09-13 &middot; Uitgever: A. Deltawaken</p>
        </div>

        <main id="main-content" className="content-main">

          <div className="highlight-box">
            <p>Risetime verzamelt, verzendt en deelt geen enkel persoonsgegeven. Uw gegevens verlaten nooit uw toestel.</p>
          </div>

          <section aria-labelledby="section-not-do">
            <h2 id="section-not-do">Wat Risetime niet doet</h2>
            <ul>
              <li>Verzamelt geen persoonsgegevens</li>
              <li>Maakt geen verbinding met internet</li>
              <li>Verzendt uw locatie naar geen enkele server</li>
              <li>Gebruikt geen gebruiksstatistieken, geen crashrapporten en geen telemetrie</li>
              <li>Bevat geen advertenties</li>
              <li>Volgt u niet van app naar app, noch van site naar site</li>
              <li>Deelt geen gegevens met derden</li>
            </ul>
          </section>

          <section aria-labelledby="section-local-data">
            <h2 id="section-local-data">De gegevens die op uw toestel blijven</h2>
            <p>Risetime bewaart de volgende gegevens <strong>uitsluitend op uw toestel</strong>, zonder ze ooit te verzenden:</p>
            <ul>
              <li><strong>De instelling van uw alarmen</strong> — tijden, labels, herhaling en ankertype (zonsopkomst, zonsondergang, enz.). Bewaard in een lokale Room-database.</li>
              <li><strong>De locatie</strong> — de plaats of de gps-coördinaten die u kiest voor de hemelberekeningen (tijden van zonsopkomst en zonsondergang). Alleen gebruikt voor de lokale berekening. Nooit verzonden.</li>
              <li><strong>De voorkeuren van de app</strong> — instellingen, waaronder de status van uw abonnement. Bewaard in een lokale DataStore.</li>
            </ul>
            <p>Al deze gegevens verdwijnen zodra u de app verwijdert.</p>
          </section>

          <section aria-labelledby="section-location">
            <h2 id="section-location">De locatiemachtiging</h2>
            <p>Risetime vraagt de machtiging voor <strong>geschatte locatie</strong> (<code>ACCESS_COARSE_LOCATION</code>) met als enig doel de lokale tijden van zonsopkomst en zonsondergang te berekenen. Uw positie wordt op het toestel verwerkt door een efemeriden-engine, en wordt nooit naar een externe dienst of server gestuurd.</p>
            <p>U kunt uw plaats ook handmatig invoeren bij Instellingen: dan wordt de gps niet gebruikt.</p>
          </section>

          <section aria-labelledby="section-internet">
            <h2 id="section-internet">Het internetrecht</h2>
            <p>Risetime <strong>declareert het recht</strong> <code>INTERNET</code> <strong>niet</strong> en doet geen enkel netwerkverzoek. De app werkt volledig offline.</p>
            <p>Het facultatieve abonnement loopt via Google Play Billing, dat met de Google Play-diensten communiceert via een uitwisseling tussen processen op uw toestel — niet via een netwerkverzoek van Risetime zelf. Die uitwisseling valt onder het <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">privacybeleid van Google</a>.</p>
          </section>

          <section aria-labelledby="section-subscriptions">
            <h2 id="section-subscriptions">De abonnementen</h2>
            <p>Risetime biedt een facultatief abonnement aan, "Risetime Supporter". De aankopen worden volledig door Google Play verwerkt. Risetime ontvangt, bewaart en verwerkt geen enkele betalingsinformatie. De status van het abonnement wordt alleen op uw eigen toestel bewaard.</p>
          </section>

          <section aria-labelledby="section-children">
            <h2 id="section-children">De privacy van kinderen</h2>
            <p>Risetime verzamelt bewust geen informatie van wie dan ook, kinderen onder de dertien inbegrepen. Omdat er geen gegevens worden verzameld, voldoet Risetime door haar ontwerp aan COPPA en vergelijkbare regelgeving.</p>
          </section>

          <section aria-labelledby="section-changes">
            <h2 id="section-changes">Wijzigingen in dit beleid</h2>
            <p>Als dit privacybeleid verandert, wordt de bijgewerkte versie op dit adres gepubliceerd, met een nieuwe ingangsdatum. Omdat er geen gegevens worden verzameld, zal een wijziging in de praktijk weinig gevolgen hebben voor uw privacy.</p>
          </section>

          <section aria-labelledby="section-contact">
            <h2 id="section-contact">Contact</h2>
            <p>Vragen over dit privacybeleid kunt u richten aan de uitgever, via <a href="mailto:contact@risetime.app">contact@risetime.app</a>, of via de Google Play-pagina van Risetime.</p>
          </section>

        </main>

        <SiteFooter page="/privacy/" lang="nl" />
    </div>
  )
}
