import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// LA PAGE ITALIENNE, ÉCRITE À LA MAIN — même décision du porteur que pour le
// français : une page traduite porte TOUT ce que porte l'anglaise, du même côté
// qu'elle, le JSX.
//
// ⚠️ SES CHAÎNES D'EN-TÊTE VIVENT DANS content/it/alarms.md, en UN exemplaire.
// `langMetadata` y lit titre, description et og, y ajoute le canonical ITALIEN et
// les hreflang, et pose `noindex` en build de preview.
//
// ⛔ LA CLÉ DE PAGE RESTE L'ANGLAISE, `/alarms/` — c'est l'identifiant de la page
// dans le registre (lib/pages.ts), pas une URL. Le slug italien « sveglie » vit
// dans l'en-tête de content/it/alarms.md, et c'est lui qui fait l'URL.
//
// ⛔ `it` est dans `STATIC_LOCALES` (lib/pages.ts) : la route dynamique
// `app/[lang]/` ne produit donc PAS ces URL.
//
// ⚠️ Les liens vers /timers/, /circadian-rhythm-alarm/, /golden-hour-alarm/ et
// /sunrise-meditation-alarm/ restent ceux du registre italien, désormais
// traduits (toutes les sept pages italiennes sont écrites dans ce même lot).
export const metadata: Metadata = langMetadata('it', '/alarms/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Impostare una sveglia all'alba o al tramonto su Android",
  "description": "Come impostare una sveglia Android sull'alba, sul tramonto, sul mezzogiorno solare o su un angolo solare a sua scelta, con uno scostamento come «1 ora prima del tramonto», grazie a Risetime. La sveglia segue il sole ogni giorno, offline.",
  "inLanguage": "it",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/it/sveglie/"
},
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "inLanguage": "it",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Risetime",
      "item": "https://risetime.app/it/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Sveglie",
      "item": "https://risetime.app/it/sveglie/"
    }
  ]
}
]

export default function SveglieePage() {
  return (
    <div className="layout-narrow">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <a href="#main-content" className="skip-link">Vai al contenuto principale</a>

        <SiteHeader current="/alarms/" lang="it" />

        <div className="page-header">
          <h1>Come impostare una sveglia all&rsquo;alba o al tramonto su Android</h1>
          <p className="subtitle">Una sveglia Risetime si imposta come qualsiasi altra, in pochi secondi. Ciò che cambia è su che cosa può impostarla.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-intro">
            <h2 id="section-intro" className="sr-only">Sveglie che seguono il sole</h2>
            <p>Invece di un orario fisso, può impostare una sveglia su un momento del sole — l&rsquo;alba, il tramonto, il mezzogiorno solare. La sveglia segue poi questo momento ogni giorno, mentre le stagioni lo spostano.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/it/alarms-list"
                darkBase="/assets/screenshots/it/alarms-list--dark"
                alt="Elenco delle sveglie di Risetime con cinque sveglie: 05:10 di sabato su Alba astronomica, un'ancora personalizzata; 07:00 dal lunedì al venerdì, un orario fisso; 07:02 domani all'Alba; 17:38 dal lunedì al venerdì, 1 h prima del Tramonto; e 23:02 oggi, 8 h prima dell'Alba, spenta."
                width={360}
                height={706}
              />
              <figcaption>Sveglie ordinarie e sveglie solari, in un unico elenco.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-regular">
            <h2 id="section-regular">Impostare una sveglia ordinaria</h2>
            <ol>
              <li>Nella scheda <strong>Sveglie</strong>, tocchi <strong>+</strong>.</li>
              <li>Imposti l&rsquo;orario sul quadrante, o lo digiti.</li>
              <li>Tocchi <strong>OK</strong>.</li>
            </ol>
            <p>Ecco una sveglia ordinaria, e non ha bisogno di nient&rsquo;altro.</p>
          </section>

          <section aria-labelledby="section-sun">
            <h2 id="section-sun">Impostare una sveglia sull&rsquo;alba o sul tramonto</h2>
            <p>Risetime conosce fin da subito quattro momenti del sole: l&rsquo;<strong>Alba</strong>, il <strong>Tramonto</strong>, <strong>Mezzogiorno</strong> — il mezzogiorno solare, quando il sole è al punto più alto, che non è quasi mai le 12:00 — e il <strong>Nadir</strong>, il cuore della notte, quando il sole è al punto più basso.</p>
            <ol>
              <li>
                <strong>La prima volta, indichi la sua posizione.</strong> Gli orari solari dipendono da dove si trova. Senza posizione, la finestra della sveglia mostra semplicemente <em>Imposta posizione nelle Impostazioni</em>.
                <details>
                  <summary>Tre modi per indicarla</summary>
                  <p>In <strong>Impostazioni → Posizione eventi celesti</strong>: scelga la sua città dall&rsquo;elenco; oppure usi il GPS del telefono, una volta; oppure attivi l&rsquo;<strong>Aggiornamento automatico posizione</strong>, e la segue in viaggio. La sua posizione resta sul suo telefono: Risetime non ha alcun permesso Internet, quindi non c&rsquo;è alcun posto dove inviarla.</p>
                  <figure className="content-screenshot">
                    <ThemedPicture
                      lightBase="/assets/screenshots/it/alarms-location"
                      darkBase="/assets/screenshots/it/alarms-location--dark"
                      alt="Le impostazioni di Risetime, sezione Posizione eventi celesti aperta: London, Regno Unito selezionato, un pulsante GPS, e una casella Aggiornamento automatico posizione deselezionata."
                      width={360}
                      height={706}
                    />
                    <figcaption>L&rsquo;impostazione della posizione, con il suo pulsante GPS e la sua casella di aggiornamento automatico.</figcaption>
                  </figure>
                </details>
              </li>
              <li>Nella scheda <strong>Sveglie</strong>, tocchi <strong>+</strong>.</li>
              <li>Nel menu in alto, scelga <strong>Alba</strong>, <strong>Tramonto</strong>, <strong>Mezzogiorno</strong> o <strong>Nadir</strong>.</li>
              <li>Sul quadrante, imposti quanto tempo prima o dopo la sveglia deve suonare — oppure lasci <em>Nessuno scostamento</em>.</li>
              <li>Tocchi <strong>OK</strong>.</li>
            </ol>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/it/alarms-anchor-menu"
                darkBase="/assets/screenshots/it/alarms-anchor-menu--dark"
                alt="La finestra di creazione sveglia, il suo menu di ancore aperto: Esatto, Alba astronomica, Alba, Mezzogiorno, Ora dorata, Tramonto e Nadir."
                width={360}
                height={706}
              />
              <figcaption>Il menu in alto nella finestra della sveglia: un orario fisso, o un momento del sole.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-offset">
            <h2 id="section-offset">Lo scostamento: «1 ora prima del tramonto»</h2>
            <p><strong>Un&rsquo;ancora è un momento del sole che Risetime ricalcola ogni giorno; la sua sveglia si tiene a una distanza fissa da esso.</strong> Questa distanza è lo scostamento, fino a 11 h 59 min prima o dopo. Il momento solare si sposta un poco ogni giorno; lo scostamento che ha scelto, mai.</p>
            <ul>
              <li><strong>Alba</strong>, senza scostamento — con la prima luce.</li>
              <li><strong>30 min prima dell&rsquo;Alba</strong> — in piedi prima del giorno.</li>
              <li><strong>1 h prima del Tramonto</strong> — una sveglia di fine giornata che le lascia il tempo di uscire mentre è ancora chiaro.</li>
              <li><strong>8 h prima dell&rsquo;Alba</strong> — <a href="/it/sveglia-ritmo-circadiano/" className="content-link">un promemoria per andare a dormire che segue il sole</a>.</li>
            </ul>
            <p>Una riga sotto il quadrante annuncia la prossima suoneria, per esempio <em>Domani: 18:03</em>.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/it/alarms-offset"
                darkBase="/assets/screenshots/it/alarms-offset--dark"
                alt="La finestra di creazione sveglia impostata sul Tramonto con uno scostamento di un'ora prima, il quadrante delle ore su 1 e quello dei minuti su 00, e la riga Oggi: 17:38."
                width={360}
                height={706}
              />
              <figcaption>Un&rsquo;ora prima del tramonto. La riga sotto lo scostamento dice quando suonerà.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-days">
            <h2 id="section-days">Giorni di ripetizione, suono e durata posticipo</h2>
            <p>Apra la scheda della sveglia nell&rsquo;elenco. Spunti <strong>Ripeti</strong> e scelga i suoi giorni: la scheda si legge allora come lo direbbe lei — <em>Da lunedì a venerdì, 1 h prima del Tramonto</em>. La stessa scheda porta l&rsquo;etichetta, il suono, la vibrazione, la durata posticipo e l&rsquo;immagine mostrata durante la sveglia. L&rsquo;interruttore ha tre posizioni: quella centrale salta solo la prossima suoneria — per un giorno di ferie — e lascia la sveglia attiva.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/it/alarms-card"
                darkBase="/assets/screenshots/it/alarms-card--dark"
                alt="Una scheda sveglia aperta per le 17:38, dal lunedì al venerdì, 1 h prima del Tramonto: un campo Etichetta vuoto, la casella Ripeti spuntata con i giorni da L a V selezionati e S e D no, e Suono impostato su Predefinito del telefono. La scheda continua sotto il bordo dell'immagine."
                width={360}
                height={706}
              />
              <figcaption>Una scheda sveglia aperta: i giorni di ripetizione, e tutto il resto della sveglia.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-custom">
            <h2 id="section-custom">Ancore personalizzate: crepuscoli, angoli solari, ombre</h2>
            <p>Il sole segna molto più di quattro momenti. Può crearne di propri, di tre tipi:</p>
            <ul>
              <li><strong>Un angolo solare</strong> — il momento in cui il sole raggiunge una certa altezza sopra o sotto l&rsquo;orizzonte, al mattino o alla sera. −6° è l&rsquo;alba o il crepuscolo civili; −12°, nautici; −18°, astronomici: la notte piena. +6° la sera è una luce bassa e calda.</li>
              <li><strong>Una lunghezza d&rsquo;ombra</strong> — il momento in cui l&rsquo;ombra di un oggetto raggiunge un dato multiplo della sua altezza, prima o dopo mezzogiorno.</li>
              <li><strong>Una frazione del giorno o della notte</strong> — la notte (dal tramonto all&rsquo;alba) o il giorno, divisi in parti uguali; sceglie lei quante, e quale limite. L&rsquo;ultimo sesto della notte, per esempio, inizia nello stesso punto della notte qualunque sia la sua durata in quella stagione.</li>
            </ul>
            <p>Per crearne una:</p>
            <ol>
              <li>Apra <strong>Impostazioni → Ancore</strong>, poi tocchi <strong>+</strong>.</li>
              <li>Scelga il tipo, e imposti il suo valore.</li>
              <li>Le dia un nome, o mantenga quello proposto.</li>
              <li>Scelga un colore — <strong>Salva</strong> ne richiede uno.</li>
              <li>Tocchi <strong>Salva</strong>.</li>
            </ol>
            <p>Ora compare nella finestra della sveglia, accanto all&rsquo;alba e al tramonto, e prende uno scostamento come qualsiasi altra. Un interruttore nell&rsquo;elenco delle ancore toglie da questo menu quelle che non usa.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/it/alarms-anchors"
                darkBase="/assets/screenshots/it/alarms-anchors--dark"
                alt="Le impostazioni, sezione Ancore aperta, con il pulsante +: Alba astronomica, Alba, Mezzogiorno, Ora dorata, Tramonto e Nadir. Solo Alba astronomica e Ora dorata, le due ancore personalizzate, hanno i pulsanti di modifica e di eliminazione attivi; sulle altre sono spenti. Ogni riga porta un interruttore di visibilità, tutti attivati."
                width={360}
                height={706}
              />
              <figcaption>Un&rsquo;ancora personalizzata prende il suo posto tra le altre, nell&rsquo;ordine della giornata.</figcaption>
            </figure>

            <p>Un&rsquo;ancora può anche essere <strong>calibrata</strong> — scostata di 30 minuti al massimo, per allinearsi a un orario che segue, come un calendario locale.</p>
            <p>Lontano dall&rsquo;equatore, certi angoli non vengono mai raggiunti per una parte dell&rsquo;anno. L&rsquo;editor gliene indica le date — a Londra, il sole non scende a −18° da fine maggio a fine luglio — e in quei giorni la sveglia resta silenziosa invece di suonare a un orario inventato.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/it/alarms-anchor-editor"
                darkBase="/assets/screenshots/it/alarms-anchor-editor--dark"
                alt="L'editor di ancora su Un angolo solare, impostato a −18,0° al mattino, chiamato Alba astronomica, con l'avviso rosso Non raggiunto ogni giorno a questa latitudine e l'anteprima Prossimo: 05:10. Il sole non raggiunge questo angolo qui dal 23 maggio 2027 al 21 luglio 2027."
                width={360}
                height={706}
              />
              <figcaption>−18° al mattino, impostato per Londra: l&rsquo;editor indica le settimane in cui questo non accade mai.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-calculation">
            <h2 id="section-calculation">Come vengono calcolati gli orari di alba e tramonto, offline</h2>
            <p>Ogni orario di alba e tramonto viene calcolato sul dispositivo da una libreria astronomica, <a href="https://shredzone.org/maven/commons-suncalc/" className="content-link">commons-suncalc</a>, basata sugli <em>Astronomical Algorithms</em> di Jean Meeus. L&rsquo;alba e il tramonto sono misurati per il bordo superiore del sole, rifrazione atmosferica compresa — ciò che vedono i suoi occhi; gli angoli solari, per il centro del sole, la convenzione delle tabelle di crepuscolo. Nessuna richiesta sul web, nessun server: funziona in modalità aereo, in mare, o in una valle senza rete.</p>
            <p>Risetime non gira in permanenza. Ricalcola dopo una suoneria, durante una breve verifica ogni poche ore, oppure quando il telefono si riavvia, cambia orario o fuso; la sveglia di sistema di Android — quella che usa l&rsquo;orologio integrato nel suo telefono — fa il resto.</p>
          </section>

          <section aria-labelledby="section-reliability">
            <h2 id="section-reliability">Assicurarsi che suoni</h2>
            <p>Alcuni telefoni fermano le app in background per risparmiare batteria, e questo può far tacere qualsiasi sveglia. <strong>Impostazioni → Affidabilità</strong> verifica ciò di cui il suo telefono ha bisogno e mostra un pulsante <strong>Correggi</strong> per ogni elemento mancante. Dopo un riavvio, le sveglie suonano anche prima che lei abbia sbloccato il telefono una prima volta.</p>
          </section>

          <section aria-labelledby="section-timers">
            <h2 id="section-timers">Anche i timer</h2>
            <p>La scheda <strong>Timer</strong> riunisce i conti alla rovescia, compresi quelli che ripartono da soli per intervalli e blocchi di studio: <a href="/it/timer/" className="content-link">come funzionano i timer in ciclo</a>.</p>
            <p>Risetime è gratuita fino a tre sveglie e tre timer — per sempre. Gliene servono di più? Provi prima queste tre, e veda se vale il suo sostegno: i sostenitori hanno sveglie e timer illimitati, all&rsquo;anno o una volta per sempre. In caso contrario, sarò felice di <a href="mailto:contact@risetime.app">leggerla</a>.</p>
          </section>

          <section aria-labelledby="section-guides">
            <h2 id="section-guides">Guide per uso</h2>
            <ul>
              <li><a href="/it/sveglia-ritmo-circadiano/" className="content-link">Un ritmo di sveglia e sonno che segue l&rsquo;alba</a></li>
              <li><a href="/it/ora-dorata/" className="content-link">Ora dorata, ora blu e cielo notturno, per fotografi e astronomi</a></li>
              {/* Add the Muslim prayer times and morning practice guides here once those pages are published. */}
            </ul>
          </section>

          <div className="cta-section">
            <h2>La imposti una volta. Segue il sole.</h2>
            <a className="play-badge" href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Scarica Risetime su Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Disponibile ora</span>
            </a>
          </div>

        </main>

        <SiteFooter page="/alarms/" lang="it" />
    </div>
  )
}
