import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import SiteFooter from '../../../../components/SiteFooter'

// LA PAGE ITALIENNE, ÉCRITE À LA MAIN — même décision du porteur que pour le
// français : une page traduite porte TOUT ce que porte l'anglaise, du même côté
// qu'elle, le JSX.
//
// ⚠️ SES CHAÎNES D'EN-TÊTE VIVENT DANS content/it/privacy.md, en UN exemplaire.
// `langMetadata` y lit titre, description et og, y ajoute le canonical ITALIEN et
// les hreflang, et pose `noindex` en build de preview.
//
// ⛔ `it` est dans `STATIC_LOCALES` (lib/pages.ts) : la route dynamique
// `app/[lang]/` ne produit donc PAS cette URL.
export const metadata: Metadata = langMetadata('it', '/privacy/')

export default function PrivacyPage() {
  return (
    <div className="layout-narrow">
      <a href="#main-content" className="skip-link">Vai al contenuto principale</a>

        <SiteHeader current="/privacy/" lang="it" />

        <div className="page-header">
          <h1>Informativa sulla privacy</h1>
          <p className="meta">Data di entrata in vigore: 2026-09-13 &middot; Editore: A. Deltawaken</p>
        </div>

        <main id="main-content" className="content-main">

          <div className="highlight-box">
            <p>Risetime non raccoglie, non trasmette e non condivide alcun dato personale. Le sue informazioni non lasciano mai il suo dispositivo.</p>
          </div>

          <section aria-labelledby="section-not-do">
            <h2 id="section-not-do">Che cosa Risetime non fa</h2>
            <ul>
              <li>Non raccoglie alcun dato personale</li>
              <li>Non si connette a Internet</li>
              <li>Non trasmette la sua posizione ad alcun server</li>
              <li>Non usa né statistiche d&rsquo;uso, né rapporti di arresto anomalo, né telemetria</li>
              <li>Non contiene alcuna pubblicità</li>
              <li>Non la traccia né da un&rsquo;app all&rsquo;altra, né da un sito all&rsquo;altro</li>
              <li>Non condivide alcun dato con terze parti</li>
            </ul>
          </section>

          <section aria-labelledby="section-local-data">
            <h2 id="section-local-data">I dati conservati sul suo dispositivo</h2>
            <p>Risetime conserva i seguenti dati <strong>esclusivamente sul suo dispositivo</strong>, senza mai trasmetterli:</p>
            <ul>
              <li><strong>La configurazione delle sue sveglie</strong> — orari, etichette, ricorrenza e tipo di ancora (alba, tramonto, ecc.). Conservata in un database Room locale.</li>
              <li><strong>La posizione</strong> — la città o le coordinate GPS che sceglie per i calcoli celesti (orari di alba e tramonto). Usata per il solo calcolo locale. Mai trasmessa.</li>
              <li><strong>Le preferenze dell&rsquo;app</strong> — impostazioni, compreso lo stato del suo abbonamento. Conservate in un DataStore locale.</li>
            </ul>
            <p>Tutti questi dati scompaiono quando disinstalla l&rsquo;app.</p>
          </section>

          <section aria-labelledby="section-location">
            <h2 id="section-location">Il permesso di localizzazione</h2>
            <p>Risetime richiede il permesso di <strong>localizzazione approssimativa</strong> (<code>ACCESS_COARSE_LOCATION</code>) al solo scopo di calcolare gli orari locali di alba e tramonto. La sua posizione viene elaborata sul dispositivo da un motore di effemeridi, e non viene mai inviata a un servizio o a un server esterno.</p>
            <p>Può anche inserire la sua città a mano nelle Impostazioni: il GPS non viene allora utilizzato.</p>
          </section>

          <section aria-labelledby="section-internet">
            <h2 id="section-internet">Il permesso Internet</h2>
            <p>Risetime <strong>non dichiara</strong> il permesso <code>INTERNET</code> e non effettua alcuna richiesta di rete. L&rsquo;app funziona interamente offline.</p>
            <p>L&rsquo;abbonamento facoltativo passa da Google Play Billing, che comunica con i servizi Google Play tramite uno scambio tra processi sul suo dispositivo — e non tramite una chiamata di rete emessa da Risetime. Questo scambio rientra nell&rsquo;<a href="https://policies.google.com/privacy" target="_blank" rel="noopener">informativa sulla privacy di Google</a>.</p>
          </section>

          <section aria-labelledby="section-subscriptions">
            <h2 id="section-subscriptions">Gli abbonamenti</h2>
            <p>Risetime offre un abbonamento facoltativo, «Risetime Supporter». Gli acquisti sono gestiti interamente da Google Play. Risetime non riceve, non conserva e non elabora alcuna informazione di pagamento. Lo stato dell&rsquo;abbonamento è conservato solo sul suo dispositivo.</p>
          </section>

          <section aria-labelledby="section-children">
            <h2 id="section-children">La privacy dei minori</h2>
            <p>Risetime non raccoglie scientemente alcuna informazione da nessuno, bambini di età inferiore a tredici anni compresi. Poiché non viene raccolto alcun dato, Risetime rispetta il COPPA e le normative comparabili per costruzione.</p>
          </section>

          <section aria-labelledby="section-changes">
            <h2 id="section-changes">Le modifiche a questa informativa</h2>
            <p>Se questa informativa sulla privacy cambia, la versione aggiornata sarà pubblicata a questo indirizzo, con una nuova data di entrata in vigore. Poiché non viene raccolto alcun dato, un cambiamento ha poche probabilità di incidere in pratica sulla sua privacy.</p>
          </section>

          <section aria-labelledby="section-contact">
            <h2 id="section-contact">Contattarci</h2>
            <p>Qualsiasi domanda su questa informativa sulla privacy può essere indirizzata all&rsquo;editore, a <a href="mailto:contact@risetime.app">contact@risetime.app</a>, oppure tramite la scheda Google Play di Risetime.</p>
          </section>

        </main>

        <SiteFooter page="/privacy/" lang="it" />
    </div>
  )
}
