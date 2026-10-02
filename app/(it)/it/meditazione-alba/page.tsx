import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// LA PAGE ITALIENNE, ÉCRITE À LA MAIN — une page traduite porte TOUT ce que porte
// l'anglaise, son mobilier compris, du même côté qu'elle : le JSX.
//
// ⚠️ SES CHAÎNES D'EN-TÊTE VIVENT DANS content/it/sunrise-meditation-alarm.md, en
// UN exemplaire. `langMetadata` y lit titre, description et og, y ajoute le
// canonical ITALIEN et les hreflang, et pose `noindex` en build de preview.
//
// ⛔ LA CLÉ RESTE LE CHEMIN ANGLAIS `/sunrise-meditation-alarm/` : c'est l'identité
// de la page, commune à toutes les langues. Le slug italien est dans l'en-tête.
//
// ⛔ Page séculière : aucune tradition n'est nommée. Les libellés de l'application
// restent astronomiques — « Alba », « Alba civile », « Alba nautica », « Ultima
// parte della notte » (nom donné par l'utilisateur, vérifié dans les captures
// italiennes de references/play-screenshots/dataset.json).
export const metadata: Metadata = langMetadata('it', '/sunrise-meditation-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "inLanguage": "it",
  "headline": "Una pratica del mattino che inizia con la luce",
  "description": "Come impostare una sveglia Android per la meditazione o lo yoga sull'alba, sull'alba civile o nautica per angolo solare, o su una frazione della notte, con l'app di sveglie Risetime. Calcolato sul dispositivo, offline.",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/it/meditazione-alba/"
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
      "name": "Sveglia per meditazione e yoga",
      "item": "https://risetime.app/it/meditazione-alba/"
    }
  ]
}
]

export default function MeditazioneAlbaPage() {
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

        <SiteHeader current="/sunrise-meditation-alarm/" lang="it" />

        <div className="page-header">
          <h1>Una pratica che inizia con la luce, non con un numero</h1>
          <p className="subtitle">Imposti lo scostamento una volta; è la luce a muoversi.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="s-why">
            <h2 id="s-why" className="sr-only">Perché la prima luce non è un orario fisso</h2>
            <p>Una pratica che inizia con la luce non inizia a un numero. La prima luce si sposta nel corso dell&rsquo;anno, e anche all&rsquo;interno dello stesso fuso orario: il 21 giugno, il sole sorge alle <strong>06:01 a Mumbai</strong> e alle <strong>05:08 a Varanasi</strong>: cinquantatré minuti di differenza, sullo stesso orologio.</p>
            <p>Risetime imposta una sveglia su un momento del sole invece che su un orario fisso. Questo momento è un&rsquo;<strong>ancora</strong>, la distanza che mantiene da esso uno <strong>scostamento</strong>.</p>
          </section>

          <section aria-labelledby="s-names">
            <h2 id="s-names">Quattro modi di chiamare la prima luce</h2>
            <table className="timing-table" aria-label="Quattro modi di chiamare la prima luce, e ciò che crea in Risetime">
              <thead><tr><th>Che cosa cerca</th><th>Dove si trova il sole</th><th>In Risetime</th></tr></thead>
              <tbody>
                <tr><td>L&rsquo;alba</td><td>il disco libera l&rsquo;orizzonte</td><td>l&rsquo;ancora integrata <strong>Alba</strong></td></tr>
                <tr><td>L&rsquo;alba civile</td><td><strong>6° sotto</strong> l&rsquo;orizzonte</td><td>un&rsquo;ancora per angolo solare, <strong>−6° al mattino</strong></td></tr>
                <tr><td>L&rsquo;alba nautica</td><td><strong>12° sotto</strong></td><td><strong>−12° al mattino</strong></td></tr>
                <tr><td>Un punto dentro la notte</td><td>una parte del cammino dal tramonto all&rsquo;alba</td><td>un&rsquo;ancora <strong>Divisione</strong>: Notte, in <em>N</em> parti</td></tr>
              </tbody>
            </table>
            <p>Le definizioni variano; ecco le più comuni. L&rsquo;app mantiene quella che imposta a ogni latitudine e in ogni stagione — cosa che un «quarantacinque minuti prima dell&rsquo;alba» fisso non può fare, poiché la durata dell&rsquo;alba cambia con l&rsquo;una e con l&rsquo;altra.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/it/practice-list"
                darkBase="/assets/screenshots/it/practice-list--dark"
                alt="Elenco delle sveglie di Risetime con quattro sveglie, tutte ripetute ogni giorno: 05:29 su Ultima parte della notte, 05:50 su Alba nautica, 06:29 su Alba civile, e 07:02 all'Alba."
                width={360}
                height={706}
              />
              <figcaption>Le quattro righe della tabella, ciascuna in una sveglia.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-sunrise">
            <h2 id="s-sunrise">Impostare la pratica sull&rsquo;alba</h2>
            <ol>
              <li>Nella scheda <strong>Sveglie</strong>, tocchi <strong>+</strong>.</li>
              <li>Nel menu in alto, scelga <strong>Alba</strong>.</li>
              <li>Lasci il quadrante al centro per suonare all&rsquo;alba, o lo giri fino alla distanza che vuole, fino a <strong>11 h 59 min</strong> da un lato come dall&rsquo;altro.</li>
              <li>Tocchi <strong>OK</strong>, poi apra la sveglia nell&rsquo;elenco e imposti <strong>Ripeti</strong>.</li>
            </ol>
            <p>E la sveglia che i mattinieri chiedono è l&rsquo;altra: <strong>una sveglia per andare a dormire</strong>, non una per svegliarsi. La imposti sull&rsquo;ancora <strong>Tramonto</strong> con uno scostamento, in ripetizione — gli stessi quattro passaggi. <a href="/it/sveglie/" className="content-link">Impostare una sveglia all&rsquo;alba o al tramonto</a></p>
          </section>

          <section aria-labelledby="s-angle">
            <h2 id="s-angle">Prima del sole: l&rsquo;alba per angolo</h2>
            <ol>
              <li>Apra <strong>Impostazioni → Ancore</strong> e tocchi <strong>+</strong> (compare non appena la sezione è espansa).</li>
              <li>Mantenga il tipo su <strong>Un angolo solare</strong>. Digiti <strong>−6°</strong> per l&rsquo;alba civile o <strong>−12°</strong> per l&rsquo;alba nautica, direzione <strong>mattino</strong>. Si sposta di un decimo di grado alla volta, tra −30° e +30°.</li>
              <li>Le dia un nome, <strong>scelga un colore</strong> — senza colore, non si salverà — e salvi.</li>
              <li>Nella scheda <strong>Sveglie</strong>, imposti una sveglia su di essa.</li>
            </ol>
            <p>Molto a nord o a sud, il sole non scende mai così in basso per una parte dell&rsquo;anno. L&rsquo;editor lo dice nel momento in cui crea l&rsquo;ancora — <em>«Il sole non raggiunge questo angolo qui, dal X al Y»</em>, con le sue date — e in quei giorni la sveglia resta silenziosa invece di suonare in un momento che il cielo non ha mai prodotto. Nulla viene inventato.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/it/practice-angle-editor"
                darkBase="/assets/screenshots/it/practice-angle-editor--dark"
                alt="L'editor di ancora su Un angolo solare, impostato a −6,0° al mattino, chiamato Alba civile, con l'anteprima: Prossimo: 06:29."
                width={360}
                height={706}
              />
              <figcaption>L&rsquo;alba civile come angolo: sei gradi sotto l&rsquo;orizzonte, al mattino.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-night">
            <h2 id="s-night">Una frazione della notte</h2>
            <p>Può ancorare il mattino alla notte invece che all&rsquo;alba: un punto situato a una data parte dell&rsquo;oscurità.</p>
            <ol>
              <li><strong>Impostazioni → Ancore → +</strong>, e passi la forma a <strong>Una frazione del giorno o della notte</strong>.</li>
              <li>Ambito <strong>Notte</strong>, poi il <strong>Numero di parti</strong> e la <strong>Posizione</strong> — da 2 a 48 parti, qualsiasi limite all&rsquo;interno.</li>
              <li>Le dia un nome, scelga un colore, salvi. Una nuova bozza si intitola <strong>Notte · 1/15</strong>; segue ciò che imposta.</li>
              <li>Imposti una sveglia su di essa.</li>
            </ol>
            <p>La notte, qui, è esattamente una cosa: <strong>da un tramonto all&rsquo;alba successiva</strong>, divisa in parti uguali. All&rsquo;interno dei circoli polari, una tale notte può non esistere; l&rsquo;ancora non ha allora nulla da dividere, e l&rsquo;app lo segnala — senza l&rsquo;intervallo di date che dà la forma per angolo, che questa forma non ha. Si allinea a un orario pubblicato? <strong>Avanzate → Sposta di N minuti</strong> sposta un&rsquo;ancora che ha creato, fino a trenta minuti da un lato come dall&rsquo;altro.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/it/practice-division-editor"
                darkBase="/assets/screenshots/it/practice-division-editor--dark"
                alt="L'editor di ancora su Una frazione del giorno o della notte, con Notte selezionato, Numero di parti impostato su 8 e Posizione su 7/8, chiamato Ultima parte della notte, con l'anteprima: Prossimo: 05:29."
                width={360}
                height={706}
              />
              <figcaption>La notte divisa in otto parti, la sveglia sull&rsquo;ultima.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-not">
            <h2 id="s-not">Ciò che Risetime non fa</h2>
            <p>Le sue stesse etichette restano astronomiche — <em>Alba</em>, <em>un angolo solare</em>, <em>Notte · 1/15</em> — mentre il nome che digita è il suo. È una sveglia, nient&rsquo;altro:</p>
            <ul>
              <li><strong>Nessun segnale a metà di una sessione</strong> — nessuna schermata compone un timer a partire da più di uno, quindi una seduta di trenta minuti non può suonare a dieci e a venti.</li>
              <li><strong>Nessun suono di meditazione, niente di guidato.</strong> Suona; la ferma lei.</li>
              <li><strong>Niente di lunare</strong> — Risetime non calcola la Luna: né fase, né data lunare.</li>
              <li><strong>Nessun monitoraggio del sonno, nessun account, nessun cloud, nessun permesso Internet</strong> — la sua posizione non lascia mai il telefono. <a href="/it/privacy/" className="content-link">Informativa sulla privacy</a></li>
            </ul>
            <p><a href="/it/sveglie/#section-custom" className="content-link">Come funzionano le ancore e gli scostamenti</a></p>
          </section>

          <section aria-labelledby="s-price">
            <h2 id="s-price" className="sr-only">Quanto costa</h2>
            <p>Risetime è gratuita fino a tre sveglie e tre timer — per sempre. Gliene servono di più? Provi prima queste tre, e veda se vale il suo sostegno: i sostenitori hanno sveglie e timer illimitati, all&rsquo;anno o una volta per sempre. In caso contrario, sarò felice di <a href="mailto:contact@risetime.app">leggerla</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Inizi con la luce.</h2>
            <a className="play-badge" href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Scarica Risetime su Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Disponibile ora</span>
            </a>
          </div>

        </main>

        <SiteFooter page="/sunrise-meditation-alarm/" lang="it" />
    </div>
  )
}
