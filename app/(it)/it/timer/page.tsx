import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// LA PAGE TIMER ITALIENNE, ÉCRITE À LA MAIN — même décision du porteur : une page
// traduite porte TOUT ce que porte l'anglaise, captures et données structurées
// comprises, du même côté qu'elle : le JSX.
//
// ⚠️ SES CHAÎNES D'EN-TÊTE VIVENT DANS content/it/timers.md, en UN exemplaire.
// `langMetadata` y lit titre, description et og, y ajoute le canonical ITALIEN
// (/it/timer/, dérivé de `slug:`) et les hreflang. ⛔ La CLÉ passée ici reste
// celle de la page ANGLAISE, `/timers/` : c'est l'identité de la page, pas son URL.
//
// ⛔ `it` est dans `STATIC_LOCALES` (lib/pages.ts) : la route dynamique
// `app/[lang]/` ne produit donc PAS cette URL.
//
// Vocabulaire tranché, et il n'est pas négociable : la chose s'appelle un
// « timer ripetibile », ce qu'elle fait est une « ripetizione », et ses tours
// sont des « cicli ». ⛔ Trois notions distinctes dans l'app italienne : le report
// d'une alarme est « Posticipa » (Snooze), les jours d'une alarme sont « Ripeti »
// (même mot que la case à cocher du minuteur, qui réutilise la même clé « Repeat »
// dans le .po — ce n'est PAS une erreur de traduction, c'est la même case dans
// l'app), et la boucle du minuteur se ferme par « Ferma il ciclo » (Stop loop).
export const metadata: Metadata = langMetadata('it', '/timers/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Un timer che riparte da solo",
  "description": "Il timer ripetibile di Risetime: una durata, rilanciata a intervallo fisso, i cui cicli restano in fase, con un pulsante Ferma il ciclo per interromperla — e i timer ordinari che qualsiasi orologio sa fare.",
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
  "mainEntityOfPage": "https://risetime.app/it/timer/"
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
      "name": "Timer",
      "item": "https://risetime.app/it/timer/"
    }
  ]
}
]

export default function TimerPage() {
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

        <SiteHeader current="/timers/" lang="it" />

        <div className="page-header">
          <h1>Un timer che riparte da solo</h1>
          <p className="subtitle">Imposti la durata una volta, e continua — più tutto ciò che il timer di un orologio sa già fare.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-loop">
            <h2 id="section-loop">Riparte da solo</h2>
            <p>È la parte che l&rsquo;orologio del suo telefono probabilmente non sa fare. Apra la riga di un timer tramite la freccia e spunti <strong>Ripeti</strong>: diventa un <strong>timer ripetibile</strong>. Arriva a zero, suona brevemente, poi riparte per la stessa durata, finché non ferma la ripetizione. Ciò che imposta una volta è l&rsquo;intervallo tra due suonerie.</p>
            <p>Ogni ciclo è ancorato al momento in cui il precedente <em>è arrivato a scadenza</em>, e non al momento in cui l&rsquo;ha fatto tacere: trenta minuti ripetuti due volte fanno sessanta minuti, non sessantuno. Altrimenti, ogni suoneria lasciata suonare sposterebbe tutto il resto della giornata.</p>

            <div className="highlight-box">
              <p>Per impostazione predefinita, un ciclo suona <strong>cinque secondi</strong>, con il suono di notifica del suo sistema invece di un suono di sveglia. Entrambi sono suoi. Non c&rsquo;è un&rsquo;opzione «mai» per questa durata: una suoneria senza fine bloccherebbe la ripetizione fin dal suo primo ciclo.</p>
            </div>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/it/timer-list"
                darkBase="/assets/screenshots/it/timer-list--dark"
                alt="Elenco dei timer di Risetime con tre conti alla rovescia: 3:00 e 10:00 entrambi fermi, ciascuno con un pulsante di avvio e un pulsante di azzeramento, e uno più lungo ancora in corso, con un pallino rosa di ripetizione, un pulsante pausa e un pulsante +1:00. Le schede Sveglie, Timer e Impostazioni corrono in fondo allo schermo."
                width={360}
                height={706}
              />
              <figcaption>Tre timer, ordinati per durata. Il pallino rosa segnala quello impostato per ripetersi.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-ending">
            <h2 id="section-ending">Fermare il ciclo</h2>
            <p>Una ripetizione si ferma con un pulsante chiamato <strong>Ferma il ciclo</strong>: sulla schermata di suoneria, e anche sulla notifica di suoneria, accanto a <strong>Continua</strong> e al pulsante che aggiunge tempo.</p>
            <p>Deselezionare <strong>Ripeti</strong> mentre un timer sta suonando le lascia un ciclo in più prima dell&rsquo;arresto: l&rsquo;impostazione viene letta una volta per ciclo, nel momento in cui la suoneria inizia.</p>
            <p>La schermata di suoneria appare a ogni ciclo e se ne va da sola dopo i cinque secondi — niente da toccare, niente da chiudere tra un ciclo e l&rsquo;altro.</p>
          </section>

          <section aria-labelledby="section-ordinary">
            <h2 id="section-ordinary">E i timer ordinari</h2>
            <p>Il resto è ciò che il timer di un orologio sa già fare. Tocchi il più e ottiene una tastiera a schermo intero invece di un quadrante: digiti le cifre, si riempiono da destra, come su un forno a microonde. Quattro, zero, zero dà quattro minuti, e sei cifre la portano fino a <strong>novantanove ore</strong>.</p>
            <p>I timer prendono posto in un elenco ordinato per la durata per cui sono stati impostati, il più breve per primo, e non nell&rsquo;ordine in cui li ha creati. Girano in parallelo — più conti alla rovescia indipendenti alla volta, ripetibili o no.</p>
            <p>Ogni riga porta la pausa, e un pulsante <strong>+1:00</strong> che aggiunge tempo a ciò che resta — un minuto, salvo lo cambi nelle Impostazioni. Metta in pausa un timer e questo pulsante diventa un azzeramento. La freccia apre la riga su <strong>Ripeti</strong> e sull&rsquo;eliminazione.</p>
          </section>

          <section aria-labelledby="section-notification">
            <h2 id="section-notification">La notifica conta da sola</h2>
            <p>Il conto alla rovescia nel suo pannello delle notifiche è disegnato da Android stesso, e non ridipinto dall&rsquo;app. Continua ad avanzare senza alcun processo di Risetime attivo.</p>
            <p>C&rsquo;è una scheda per ciò che è in corso o in pausa, e una per ciò che suona — esattamente due, mai una per ogni timer che si accumulano nel pannello.</p>
            <p>Scorrere via questa scheda non ferma nulla: torna subito, ricostruita dallo stato reale, e un timer che suona continua a suonare. L&rsquo;arresto passa sempre da un pulsante, deliberatamente.</p>
          </section>

          <section aria-labelledby="section-settings">
            <h2 id="section-settings">Un suono proprio, un volume proprio</h2>
            <p>I timer non prendono in prestito le impostazioni delle sue sveglie, e un timer ripetibile non prende in prestito nemmeno quelle del timer a un solo colpo: due profili, scelti a seconda che Ripeti sia spuntato o no. Ciascuno porta il suo suono, il suo volume, la sua durata di suoneria e il suo aumento di volume facoltativo.</p>
            <p>Le due durate di suoneria sono su scale volutamente diverse. In ripetizione: <strong>5, 10, 15, 30, 60 o 120 secondi</strong>. Per un timer a un solo colpo: <strong>1, 5, 10, 15, 20 o 25 minuti, o mai</strong>.</p>
            <p>Nessun suono è incluso con l&rsquo;app: i suoni sono quelli del suo sistema, o un file suo. Due impostazioni restano comuni invece che sdoppiate — se i timer vibrano, e che cosa fanno i tasti del volume mentre un timer suona.</p>
          </section>

          <section aria-labelledby="section-not">
            <h2 id="section-not">Che cosa non farà</h2>
            <p>È un conto alla rovescia e una ripetizione, nient&rsquo;altro:</p>
            <ul>
              <li><strong>Nessuna alternanza lavoro/riposo.</strong> Una ripetizione ha una sola durata; trenta secondi di sforzo poi trenta di recupero ne fanno due, e nessuna schermata compone un timer a partire da più di uno.</li>
              <li><strong>Nessun promemoria a metà di una sessione</strong> — una seduta di trenta minuti non può suonare a dieci e poi a venti.</li>
              <li><strong>Nessuna fascia oraria, nessun orario di silenzio.</strong> Una ripetizione corre finché non la ferma.</li>
              <li><strong>Nessuna suoneria all&rsquo;ora esatta.</strong> Il conteggio parte dal momento in cui l&rsquo;ha avviato.</li>
            </ul>
          </section>

          <section aria-labelledby="section-setup">
            <h2 id="section-setup">Impostarne uno</h2>
            <p>Apra la scheda Timer, tocchi il più, digiti la durata. Parte da solo — niente da nominare, niente da classificare. Perché si ripeta, spunti <strong>Ripeti</strong> dietro la freccia.</p>
            <p>La <a href="/it/sveglie/" className="content-link">guida alle sveglie</a> tratta delle sveglie, che condividono le stesse impostazioni di affidabilità.</p>
          </section>

          <section aria-labelledby="section-price">
            <h2 id="section-price" className="sr-only">Quanto costa</h2>
            <p>Risetime è gratuita fino a tre timer, lo stesso conteggio delle sue sveglie — per sempre. Una volta raggiunto, il pulsante di aggiunta è semplicemente assente: nessuna finestra di dialogo, nessun lucchetto, nessun banner per nominare ciò che le manca. Se il suo sostegno si ferma, nulla viene eliminato: ogni timer che ha creato continua a funzionare, semplicemente non può più aggiungerne. Gliene servono più di tre? Veda se vale il suo sostegno — in caso contrario, sarò felice di <a href="mailto:contact@risetime.app">leggerla</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Imposti la durata una volta. Tiene il ritmo.</h2>
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

        <SiteFooter page="/timers/" lang="it" />
    </div>
  )
}
