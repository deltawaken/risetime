import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// LA PAGE ITALIENNE, ÉCRITE À LA MAIN — traduction de
// app/(en)/circadian-rhythm-alarm/page.tsx, trait pour trait : mêmes sections,
// mêmes `id`, mêmes captures, mêmes données structurées.
//
// ⚠️ SES CHAÎNES D'EN-TÊTE VIVENT DANS content/it/circadian-rhythm-alarm.md, en UN
// exemplaire. La clé passée à `langMetadata` reste la page ANGLAISE : c'est
// l'identité de la page, pas son adresse.
//
// ⛔ AUCUNE ALLÉGATION DE SANTÉ. Le rythme circadien se DÉCRIT — ce que le soleil
// fait, ce que l'application calcule — il ne se soigne pas.
export const metadata: Metadata = langMetadata('it', '/circadian-rhythm-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Sveglia ritmo circadiano per Android: una sveglia ancorata all'alba",
  "description": "Come impostare una sveglia Android sull'alba, e una giornata costruita attorno al sole, con l'app di sveglia Risetime. La sveglia si sposta da sola con le stagioni; gli orari sono calcolati sul dispositivo, senza alcun permesso Internet.",
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
  "mainEntityOfPage": "https://risetime.app/it/sveglia-ritmo-circadiano/"
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
      "name": "Sveglia ritmo circadiano",
      "item": "https://risetime.app/it/sveglia-ritmo-circadiano/"
    }
  ]
}
]

export default function SvegliaRitmoCircadianoPage() {
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

        <SiteHeader current="/circadian-rhythm-alarm/" lang="it" />

        <div className="page-header">
          <h1>Sveglia ritmo circadiano per Android: una sveglia ancorata all&rsquo;alba</h1>
          <p className="subtitle">Si sposta da sola con le stagioni.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-what">
            <h2 id="section-what" className="sr-only">Che cos&rsquo;è una sveglia di ritmo circadiano</h2>
            <p>«Sveglia di ritmo circadiano» è così che viene chiamata una sveglia legata al sole invece che all&rsquo;orologio. La parola viene dal ciclo di circa 24 ore del corpo; in uno store di app, significa semplicemente che la sveglia segue l&rsquo;alba invece di restare a un orario fisso.</p>
            <p>In Risetime, il momento del sole che sceglie si chiama un&rsquo;<strong>ancora</strong> — l&rsquo;alba, il mezzogiorno solare, il tramonto — e la distanza che mantiene da esso è lo <strong>scostamento</strong>.</p>
          </section>

          <section aria-labelledby="section-swing">
            <h2 id="section-swing">Di quanto si sposta l&rsquo;alba nel corso dell&rsquo;anno</h2>
            <table className="timing-table" aria-label="Di quanto si sposta l'alba tra giugno e dicembre, per città">
              <thead>
                <tr><th>Città</th><th>Alba più presto</th><th>Alba più tardi</th><th>Ampiezza</th></tr>
              </thead>
              <tbody>
                <tr><td>Londra</td><td>04:43 (21 giu.)</td><td>08:03 (21 dic.)</td><td>3 h 20</td></tr>
                <tr><td>Parigi</td><td>05:46 (21 giu.)</td><td>08:41 (21 dic.)</td><td>2 h 55</td></tr>
                <tr><td>Tokyo</td><td>04:25 (21 giu.)</td><td>06:47 (21 dic.)</td><td>2 h 20</td></tr>
                <tr><td>Chicago</td><td>05:15 (21 giu.)</td><td>07:14 (21 dic.)</td><td>2 h 00</td></tr>
                <tr><td>Sydney</td><td>05:41 (21 dic.)</td><td>06:00 (21 giu.)</td><td>1 h 20</td></tr>
              </tbody>
            </table>
            <p>Ora locale, 2027, calcolata con la libreria astronomica usata dall&rsquo;app.</p>
            <p>Una sveglia fissa alle 06:30 a Londra suona quindi <strong>1 h 47 dopo l&rsquo;alba a giugno</strong>, e <strong>1 h 33 prima di essa a dicembre</strong>. La stessa sveglia, due mattine diverse.</p>
          </section>

          <section aria-labelledby="section-how">
            <h2 id="section-how">Come impostare una sveglia sul ritmo circadiano</h2>
            <ol>
              <li>Nella scheda <strong>Sveglie</strong>, tocchi <strong>+</strong>.</li>
              <li>Nel menu in alto, scelga <strong>Alba</strong>.</li>
              <li>Lasci il quadrante dov&rsquo;è per alzarsi all&rsquo;alba, o lo giri sulla distanza che vuole — 30 minuti prima, un&rsquo;ora prima.</li>
              <li>Tocchi <strong>OK</strong>. Apra poi la sveglia nell&rsquo;elenco e spunti <strong>Ripeti</strong> per scegliere i suoi giorni.</li>
            </ol>
            <p>La distanza che imposta non cambia mai. L&rsquo;alba, invece, cambia, e la sveglia la segue — attraverso gli equinozi, i solstizi e il cambio dell&rsquo;ora legale. <a href="/it/sveglie/" className="content-link">Impostare una sveglia all&rsquo;alba o al tramonto</a></p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/it/circadian-list"
                darkBase="/assets/screenshots/it/circadian-list--dark"
                alt="Elenco delle sveglie di Risetime con tre sveglie, tutte ripetute ogni giorno: 07:02 all'Alba, 20:38 due ore dopo il Tramonto, e 23:02 otto ore prima dell'Alba."
                width={360}
                height={706}
              />
              <figcaption>Sveglie ancorate all&rsquo;alba e al tramonto, ripetute ogni giorno.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-day">
            <h2 id="section-day">Una giornata che segue il sole — e un orologio</h2>
            <p>Ecco la giornata che vivo davvero, sul mio stesso telefono:</p>
            <table className="timing-table" aria-label="Una giornata fatta di sveglie ancorate al sole e sveglie a orologio">
              <thead>
                <tr><th>Momento</th><th>Sveglia</th><th>Giorni</th></tr>
              </thead>
              <tbody>
                <tr><td>La sveglia</td><td>Alba</td><td>lun.–ven.</td></tr>
                <tr><td>L&rsquo;inizio del lavoro, o la sveglia del weekend</td><td>09:00</td><td>ogni giorno</td></tr>
                <tr><td>Il pranzo</td><td>1 h prima di Mezzogiorno — il mezzogiorno solare, raramente le 12:00</td><td>ogni giorno</td></tr>
                <tr><td>Si riprende</td><td>1 h dopo Mezzogiorno</td><td>lun.–ven.</td></tr>
                <tr><td>Si smette</td><td>18:00</td><td>lun.–ven.</td></tr>
              </tbody>
            </table>
            <p>Ce n&rsquo;è una sesta, otto ore prima dell&rsquo;alba, per iniziare a rallentare. È spenta per il momento — la posizione centrale dell&rsquo;interruttore mantiene una sveglia senza farla suonare.</p>
            <p>Questo fa sei sveglie, una delle quali spenta — più delle tre gratuite.</p>
            <p>Quelle ancorate al sole seguono la luce; quelle a orologio tengono ciò che gli altri si aspettano da lei. Entrambe vivono nello stesso elenco, e ogni scheda dice quale è quale.</p>
            <p>Fin dove questo arriva dipende da dove vive. A Sydney, l&rsquo;alba si sposta di circa un&rsquo;ora nell&rsquo;anno, e una giornata ancorata al sole vi deriva appena. A Londra, si sposta di oltre tre ore: il mattino segue allora il sole, mentre gli orari di lavoro restano sull&rsquo;orologio.</p>
          </section>

          <section aria-labelledby="section-late">
            <h2 id="section-late">Quando l&rsquo;alba arriva troppo tardi</h2>
            <p>Nel pieno dell&rsquo;inverno, l&rsquo;alba arriva dopo l&rsquo;inizio della giornata di lavoro — 08:03 a Londra il 21 dicembre. Due modi per cavarsela:</p>
            <ul>
              <li><strong>Si alzi alla prima luce, piuttosto.</strong> La luce arriva ben prima del sole. In Impostazioni → Ancore, si costruisca una propria ancora all&rsquo;<strong>alba civile</strong> — il momento in cui c&rsquo;è abbastanza luce per vedere fuori senza lampada — e imposti la sua sveglia su di essa. <a href="/it/sveglie/#section-custom" className="content-link">Ancore per angolo solare e crepuscolo</a></li>
              <li><strong>Mantenga entrambi i tipi di sveglia</strong>, come sopra: l&rsquo;orologio per i giorni che iniziano a orario fisso, il sole per il resto.</li>
            </ul>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/it/circadian-offset"
                darkBase="/assets/screenshots/it/circadian-offset--dark"
                alt="La finestra di nuova sveglia impostata sull'alba con uno scostamento di otto ore prima, il quadrante delle ore su 8 e quello dei minuti su 00, e la riga Oggi: 23:02."
                width={360}
                height={706}
              />
              <figcaption>Qualsiasi distanza rispetto all&rsquo;ancora, prima o dopo, fino a 11 h 59 min.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-privacy">
            <h2 id="section-privacy">Una sveglia, non un monitoraggio del sonno</h2>
            <p>Risetime non monitora il suo sonno. Non registra il momento in cui ferma una sveglia, non ha un account, non ha un cloud e nessuno strumento di misurazione. Non ha <strong>alcun permesso Internet</strong>: è il sistema operativo stesso a impedirle quindi di connettersi. Gli orari dell&rsquo;alba sono calcolati sul suo telefono, e la sua posizione non lo lascia mai. È anche per questo che funziona in modalità aereo, in una valle, su una barca. <a href="/it/privacy/" className="content-link">Informativa sulla privacy</a></p>
            <p>Risetime è gratuita fino a tre sveglie e tre timer — per sempre. Gliene servono di più? Provi prima queste tre, e veda se vale il suo sostegno: i sostenitori hanno sveglie e timer illimitati, all&rsquo;anno o una volta per sempre. In caso contrario, sarò felice di <a href="mailto:contact@risetime.app">leggerla</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Si alzi con il sole. Tenga l&rsquo;orologio per il resto.</h2>
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

        <SiteFooter page="/circadian-rhythm-alarm/" lang="it" />
    </div>
  )
}
