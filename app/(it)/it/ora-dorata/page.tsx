import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// LA PAGE ITALIENNE, ÉCRITE À LA MAIN — une page traduite porte TOUT ce que porte
// l'anglaise, son mobilier compris, du même côté qu'elle : le JSX — captures à
// direction artistique et données structurées comprises.
//
// ⚠️ SES CHAÎNES D'EN-TÊTE VIVENT DANS content/it/golden-hour-alarm.md, en UN
// exemplaire, exactement comme les autres langues les prennent dans leur
// content/<lang>/. `langMetadata` y lit titre, description et og, y ajoute le
// canonical ITALIEN et les hreflang, et pose `noindex` en build de preview.
//
// ⛔ LA CLÉ RESTE CELLE DE LA PAGE ANGLAISE (`/golden-hour-alarm/`) : c'est le
// registre `PAGES` (lib/pages.ts) qui la nomme, et l'URL italienne en est DÉRIVÉE
// par le `slug:` de l'en-tête.
//
// ⭐ Les noms d'ancres viennent de references/play-screenshots/dataset.json,
// clé `names` : « Ora dorata », « Ora blu », « Cielo notturno » — ceux affichés
// dans les captures italiennes elles-mêmes, vérifiés à l'écran.
export const metadata: Metadata = langMetadata('it', '/golden-hour-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "L'ora dorata, l'ora blu e il cielo notturno, su una sveglia",
  "description": "Come impostare sveglie sull'ora dorata, sull'ora blu e sulla notte astronomica su Android, tramite l'angolo solare invece di un orario fisso, con l'app di sveglie Risetime. Calcolato sul dispositivo, offline.",
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
  "mainEntityOfPage": "https://risetime.app/it/ora-dorata/"
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
      "name": "Sveglia ora dorata",
      "item": "https://risetime.app/it/ora-dorata/"
    }
  ]
}
]

export default function OraDorataPage() {
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

        <SiteHeader current="/golden-hour-alarm/" lang="it" />

        <div className="page-header">
          <h1>L&rsquo;ora dorata, l&rsquo;ora blu e il cielo notturno, su una sveglia</h1>
          <p className="subtitle">Imposti l&rsquo;angolo una volta. La sveglia segue la luce tutto l&rsquo;anno.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="s-why">
            <h2 id="s-why" className="sr-only">Perché una sveglia a orario fisso manca la luce</h2>
            <p>Lei sa quando la luce è bella. Il problema è che si muove: a New York, il tramonto va da <strong>16:31 il 21 dicembre</strong> a <strong>20:30 il 21 giugno</strong>. Una sveglia a orario fisso per l&rsquo;ora dorata è sbagliata dopo due settimane, e inutile dopo un mese.</p>
            <p>Risetime imposta una sveglia sull&rsquo;<strong>angolo solare</strong> invece che su un orario fisso — ed è l&rsquo;angolo a definire davvero queste finestre.</p>
          </section>

          <section aria-labelledby="s-angles">
            <h2 id="s-angles">La luce, per angolo</h2>
            <table className="timing-table" aria-label="L'ora dorata, l'ora blu e la notte astronomica, per angolo solare">
              <thead><tr><th>Che cosa cerca</th><th>Il sole è…</th><th>In Risetime</th></tr></thead>
              <tbody>
                <tr><td>Ora dorata, la sera</td><td>sotto circa <strong>6° sopra</strong> l&rsquo;orizzonte</td><td>un&rsquo;ancora di angolo solare, <strong>+6° la sera</strong></td></tr>
                <tr><td>Ora blu, la sera</td><td>tra circa <strong>4° e 6° sotto l&rsquo;orizzonte</strong></td><td><strong>−4° la sera</strong>, la finestra che continua fino a −6°</td></tr>
                <tr><td>Ora dorata, il mattino</td><td>lo stesso, al contrario</td><td><strong>+6° al mattino</strong></td></tr>
                <tr><td>Notte astronomica</td><td><strong>18° sotto l&rsquo;orizzonte</strong></td><td><strong>−18° la sera</strong>, e −18° al mattino per sapere quando finisce</td></tr>
              </tbody>
            </table>
            <p>Le definizioni variano da un fotografo all&rsquo;altro; ecco le più comuni. Imposti l&rsquo;angolo con cui lavora, e l&rsquo;app lo mantiene a ogni latitudine e in ogni stagione — cosa che una regola prestabilita, «30 minuti prima del tramonto», non sa fare, perché la durata del crepuscolo cambia con entrambi. A Londra il 21 giugno, +6° cade alle 20:27 e il tramonto alle 21:21: quasi un&rsquo;ora di differenza. A New York la stessa sera, 19:49 e 20:30: quaranta minuti.</p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/it/sky-menu"
                darkBase="/assets/screenshots/it/sky-menu--dark"
                alt="La finestra di creazione sveglia, il suo menu di ancore aperto, che elenca Esatto, Alba, Mezzogiorno, Ora dorata, Tramonto, Ora blu, Cielo notturno e Nadir."
                width={360}
                height={706}
              />
              <figcaption>Le sue ancore prendono posto accanto all&rsquo;alba e al tramonto, nell&rsquo;ordine della giornata.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-make">
            <h2 id="s-make">L&rsquo;ancora, una volta per tutte</h2>
            <ol>
              <li>Apra <strong>Impostazioni → Ancore</strong> e tocchi <strong>+</strong>.</li>
              <li>Mantenga il tipo su <strong>Un angolo solare</strong> e imposti il suo angolo — un tocco sul valore per digitarlo, e scelga <strong>mattino</strong> o <strong>sera</strong>.</li>
              <li>Le dia un nome — <em>Ora dorata</em>, <em>Ora blu</em>, <em>Cielo notturno</em> —, scelga un colore e salvi.</li>
              <li>Nella scheda <strong>Sveglie</strong>, imposti una sveglia su di essa: all&rsquo;ancora, o trenta minuti prima per arrivare sul posto.</li>
            </ol>
            <p><a href="/it/sveglie/#section-custom" className="content-link">Come funzionano le ancore e gli scostamenti</a></p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/it/sky-list"
                darkBase="/assets/screenshots/it/sky-list--dark"
                alt="L'elenco delle sveglie di Risetime con cinque sveglie: 06:45 e 08:10 dal lunedì al venerdì su Esatto; 17:21 il sabato e la domenica, 30 min prima di Ora dorata; 18:58 il sabato e la domenica a Ora blu; e 20:30 il venerdì e il sabato a Cielo notturno."
                width={360}
                height={706}
              />
              <figcaption>Sveglie a orologio per la settimana, sveglie solari per la luce.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-week">
            <h2 id="s-week">Una settimana di lavoro, e la luce nel weekend</h2>
            <p>La maggior parte di noi non vive di fotografia:</p>
            <table className="timing-table" aria-label="Una settimana di sveglie a orologio, e sveglie del weekend ancorate alla luce">
              <thead><tr><th>Momento</th><th>Sveglia</th><th>Giorni</th></tr></thead>
              <tbody>
                <tr><td>Sveglia</td><td>06:45</td><td>Lun–ven</td></tr>
                <tr><td>Uscita per la scuola</td><td>08:10</td><td>Lun–ven</td></tr>
                <tr><td>Preparare lo zaino</td><td>30 min prima di Ora dorata</td><td>Sab e dom</td></tr>
                <tr><td>Ora blu</td><td>Ora blu</td><td>Sab e dom</td></tr>
                <tr><td>Le stelle</td><td>Cielo notturno</td><td>Ven e sab</td></tr>
              </tbody>
            </table>
            <p>Sveglie a orologio per la settimana, sveglie solari per la luce — lo stesso elenco, la stessa app.</p>
          </section>

          <section aria-labelledby="s-road">
            <h2 id="s-road">In viaggio, e lontano da ogni rete</h2>
            <ul>
              <li><strong>In viaggio?</strong> Attivi l&rsquo;<strong>Aggiornamento automatico posizione</strong> nelle Impostazioni, e le sue sveglie la seguono — uno spostamento, una nuova città, una costa.</li>
              <li><strong>Nessuna rete sul posto?</strong> Risetime calcola la posizione del sole sul telefono, con una libreria astronomica. Non ha <strong>alcun permesso Internet</strong>, quindi non può dipendere da una connessione: modalità aereo, un canyon, una barca — la sveglia sa sempre quando arriva la luce.</li>
              <li><strong>Nessun tracciamento, nessun account, nessuna pubblicità.</strong> La sua posizione non lascia mai il telefono. <a href="/it/privacy/" className="content-link">Informativa sulla privacy</a></li>
            </ul>
          </section>

          <section aria-labelledby="s-night">
            <h2 id="s-night">Per il cielo notturno</h2>
            <p>La notte astronomica è la finestra tra il momento serale e quello mattutino in cui il sole si trova a 18° sotto l&rsquo;orizzonte. Ponga un&rsquo;ancora su ciascuno dei due, e tiene entrambi i capi dell&rsquo;oscurità.</p>
            <p>Molto a nord o molto a sud, questa finestra si chiude per una parte dell&rsquo;anno: a Londra, il sole non raggiunge −18° <strong>dal 23 maggio al 21 luglio</strong>. Risetime lo indica nel momento in cui crea l&rsquo;ancora, con le date del suo stesso luogo, e in quelle notti la sveglia resta silenziosa invece di suonare a un orario che il cielo non produce mai.</p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/it/sky-night-editor"
                darkBase="/assets/screenshots/it/sky-night-editor--dark"
                alt="L'editor di ancora su Un angolo solare, impostato a −18,0° la sera, chiamato Cielo notturno, con l'anteprima: Prossimo: 20:30. Il sole non raggiunge questo angolo qui dal 23 maggio 2027 al 21 luglio 2027."
                width={360}
                height={706}
              />
              <figcaption>Un angolo di −18° la sera, e le settimane in cui non arriva mai.</figcaption>
            </figure>
            <p><strong>Ciò che Risetime non fa: la Luna.</strong> Nessun sorgere della luna, nessuna fase, nessun calendario lunare — l&rsquo;app non le dirà quando una luna piena cancella la Via Lattea. Fa il sole, e lo fa offline.</p>
          </section>

          <section aria-labelledby="s-price">
            <h2 id="s-price" className="sr-only">Quanto costa</h2>
            <p>Risetime è gratuita fino a tre sveglie e tre timer — per sempre. Gliene servono di più? Provi prima queste tre, e veda se vale il suo sostegno: i sostenitori hanno sveglie e timer illimitati, all&rsquo;anno o una volta per sempre. In caso contrario, sarò felice di <a href="mailto:contact@risetime.app">leggerla</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Non perda mai più la luce.</h2>
            <a className="play-badge" href="https://play.google.com/apps/testing/com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Unisciti al test aperto di Risetime su Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Test aperto</span>
            </a>
            <p className="cta-note">Risetime è in fase di test aperto: si iscriva prima al test, poi installi da Play. Senza questo passaggio, Play potrebbe dirle che l&rsquo;app non è disponibile nel suo paese.</p>
          </div>

        </main>

        <SiteFooter page="/golden-hour-alarm/" lang="it" />
    </div>
  )
}
