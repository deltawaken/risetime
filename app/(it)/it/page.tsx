import type { Metadata } from 'next'
import { langMetadata } from '../../../lib/metadata'
import SiteHeader from '../../../components/SiteHeader'
import ThemedPicture from '../../../components/ThemedPicture'
import SiteFooter from '../../../components/SiteFooter'

// L'ACCUEIL ITALIEN, écrit à la main comme le français et l'anglais (porteur,
// 2026-09-27). Traduction trait pour trait de app/(fr)/fr/page.tsx.
// ⚠️ Les chaînes d'en-tête vivent dans content/it/home.md, en un exemplaire.
export const metadata: Metadata = langMetadata('it', '/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Risetime",
  "alternateName": "Risetime Sveglia all'alba",
  "operatingSystem": "Android",
  "applicationCategory": "UtilitiesApplication",
  "inLanguage": "it",
  "url": "https://risetime.app/it/",
  "description": "Sveglia all'alba per Android. Imposti la sveglia sull'alba, sul tramonto o sul mezzogiorno solare: si sposta da sola, ogni giorno. Offline, senza pubblicità.",
  /* ⭐ Les captures italiennes existent : quatre URL /it/, celles que cette page
     AFFICHE déjà dans son corps. */
  "screenshot": [
    "https://risetime.app/assets/screenshots/it/alarm-list.png",
    "https://risetime.app/assets/screenshots/it/alarm-picker.png",
    "https://risetime.app/assets/screenshots/it/dismiss-screen.png",
    "https://risetime.app/assets/screenshots/it/settings-screen.png"
  ],
  /* Les neuf entrées de l'anglaise/française, dans le même ordre. ⛔ Les noms de
     réglages viennent du .po it et de nulle part ailleurs — « Un angolo solare »,
     « Una lunghezza d'ombra », « Una frazione del giorno o della notte »,
     « Mezzogiorno solare », « Nadir », « Calibrazione » — et « ciclo » pour la
     répétition d'un minuteur. ⚠️ Jamais « ripetizione » ici pour ce sens : dans
     l'app, c'est le report d'une alarme (« Posticipa ») ou les jours d'une alarme
     (« Ripeti ») qui portent d'autres mots. */
  "featureList": [
    "Sveglie ancorate all'alba, al tramonto, al mezzogiorno solare o al nadir",
    "Ancore su misura: un angolo solare, una lunghezza d'ombra, una frazione del giorno o della notte",
    "La calibrazione di un'ancora, per allinearsi a un orario pubblicato",
    "Un ricalcolo automatico ogni giorno, mentre gli orari del sole si spostano",
    "Funziona interamente offline — nessun permesso Internet",
    "Nessuna misurazione d'uso, nessun tracciamento, nessuna raccolta dati",
    "Sveglie celesti e sveglie a orario fisso, supportate insieme",
    "L'API di sveglia del sistema — sopravvive alla modalità Doze e ai riavvii",
    "Timer con conto alla rovescia i cui cicli restano in fase"
  ],
  /* ⛔ « Deltawaken », mot pour mot comme les autres langues, et l'URL avec : deux
     noms pour une seule organisation cassent la réconciliation d'entité.
     ⚠️ Le pied de page garde « A. Deltawaken » — c'est une signature humaine,
     pas un identifiant d'éditeur. */
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken",
    "url": "https://risetime.app/"
  },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
},
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "it",
  "mainEntity": [
    { "@type": "Question", "name": "Che cosa fa Risetime, esattamente?",
      "acceptedAnswer": { "@type": "Answer", "text": "Risetime è una sveglia che può agganciare un allarme a un momento del sole. Imposti «30 minuti prima dell'alba» una volta, e la sveglia si ricalcola ogni giorno per la sua posizione: segue il sole tutto l'anno. Fa anche le sveglie normali a orario fisso, e i timer." } },
    { "@type": "Question", "name": "Risetime ha bisogno di una connessione Internet?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Risetime non ha alcun permesso Internet — non può connettersi, anche se lo volesse. Gli orari di alba e tramonto sono calcolati sul suo dispositivo. Funziona in modalità aereo, sul campo, ovunque." } },
    { "@type": "Question", "name": "Fa anche le sveglie normali, a orario fisso?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sì. Le sveglie a orologio e le sveglie ancorate al sole vivono nello stesso elenco, e i timer hanno una scheda propria, con il loro suono e il loro volume." } },
    { "@type": "Question", "name": "Posso impostare una sveglia sull'alba, sull'ora dorata o sulla notte fonda?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sì, tramite l'angolo solare. Crei un'ancora a −6° per l'alba civile, +6° la sera per l'ora dorata, −18° per la notte astronomica, poi imposti le sue sveglie su di essa. Dove un angolo non viene mai raggiunto per una parte dell'anno, l'app lo segnala, e la sveglia salta quei giorni invece di suonare a un orario inventato." } },
    { "@type": "Question", "name": "La sveglia suona comunque in modalità Doze o risparmio energetico?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sì. Risetime usa l'API setAlarmClock di Android — lo stesso meccanismo di sistema dell'orologio integrato nel suo telefono — e una schermata di affidabilità verifica i permessi di cui il suo telefono ha bisogno. Le sveglie suonano anche prima del primo sblocco dopo un riavvio." } },
    { "@type": "Question", "name": "Risetime è gratuita?",
      "acceptedAnswer": { "@type": "Answer", "text": "Gratuita fino a tre sveglie e tre timer, per sempre. Gliene servono di più? Provi prima queste tre, e veda se vale il suo sostegno: i sostenitori hanno sveglie e timer illimitati, all'anno o una volta per sempre." } }
  ]
}
]

const PLAY = "https://play.google.com/apps/testing/com.deltawaken.risetime"
const PlayBadge = () => (
  <a className="play-badge" href={PLAY} target="_blank" rel="noopener" aria-label="Unisciti al test aperto di Risetime su Google Play">
    <span className="badge-main">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
      Google Play
    </span>
    <span className="badge-sub">Test aperto</span>
  </a>
)

export default function HomePage() {
  return (
    <div className="landing">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <a href="#main-content" className="skip-link">Vai al contenuto principale</a>

        <SiteHeader current="/" lang="it" />

        <main id="main-content">

          <section className="hero" aria-labelledby="hero-heading">
            <h1 id="hero-heading"><span className="hero-brand">Risetime</span> <span className="hero-sep" aria-hidden="true">&mdash;</span> l&rsquo;app di sveglie solari per Android.</h1>
            <p className="hero-celestial">La sua sveglia celeste.</p>
            <p className="hero-sub">Imposti la sveglia sul sole. Si sposta ogni giorno, così non deve farlo lei.</p>
            <div className="hero-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/it/alarm-list"
                darkBase="/assets/screenshots/it/alarm-list--dark"
                alt="Elenco delle sveglie di Risetime con cinque sveglie: 05:10 di sabato su Alba astronomica, un'ancora personalizzata; 07:00 dal lunedì al venerdì su Esatto, un orario fisso; 07:02 domani all'Alba; 17:38 dal lunedì al venerdì, 1 h prima del Tramonto; e 23:02 oggi, 8 h prima dell'Alba, spenta."
                width={360}
                height={706}
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="cta-group">
              <PlayBadge />
              <p className="cta-note">Risetime è in fase di test aperto: si iscriva prima al test, poi installi da Play. Senza questo passaggio, Play potrebbe dirle che l&rsquo;app non è disponibile nel suo paese.</p>
            </div>
          </section>

          <section className="how-it-works" aria-labelledby="how-heading">
            <h2 id="how-heading">Come funziona la sveglia all&rsquo;alba</h2>
            <ol className="steps" role="list">
              <li><strong>Scelga la sua ancora</strong><span>Un evento celeste: alba, mezzogiorno solare, tramonto o nadir. È il punto di riferimento che la sua sveglia seguirà.</span></li>
              <li><strong>Imposti lo scostamento</strong><span>Quanto tempo prima, o dopo. Trenta minuti prima dell&rsquo;alba. Un&rsquo;ora dopo il tramonto. E i giorni in cui si ripete.</span></li>
              <li><strong>Tutto qui</strong><span>Risetime ricalcola l&rsquo;orario esatto ogni giorno. L&rsquo;alba scivola con le stagioni — la sua sveglia segue. Non deve più toccarla.</span></li>
            </ol>
          </section>

          <section className="features" aria-labelledby="features-heading">
            <h2 id="features-heading">Che cosa fa l&rsquo;app Risetime</h2>
            <div className="feature-grid">
              <article className="feature-card">
                <h3>Ancorata alla giornata</h3>
                <p>Imposti le sue sveglie rispetto all&rsquo;alba, al mezzogiorno solare, al tramonto o al nadir, con lo scostamento che preferisce. L&rsquo;orario si ricalcola ogni giorno per restare in fase con il cielo reale. Impostata una volta, resta giusta tutto l&rsquo;anno.</p>
              </article>
              <article className="feature-card">
                <h3>Offline, e privata per costruzione</h3>
                <p>Risetime non ha il permesso Internet. Non disattivato: assente. Gli orari dell&rsquo;alba sono calcolati sul dispositivo, con algoritmi astronomici integrati. Nessun server, nessun account, nessun dato che lascia il telefono.</p>
              </article>
              <article className="feature-card">
                <h3>La imposti, poi se ne dimentichi</h3>
                <p>L&rsquo;app ricalcola i suoi orari in background, ogni giorno. Nella maggior parte dei casi, non la apre nemmeno. È voluto: Risetime dà il meglio di sé quando dimentica che esiste.</p>
              </article>
              <article className="feature-card">
                <h3>Vere sveglie, non notifiche</h3>
                <p>Risetime usa la stessa API di sistema dell&rsquo;orologio integrato in Android. La sua sveglia sopravvive alla modalità Doze, all&rsquo;ottimizzazione della batteria e ai riavvii. All&rsquo;ora stabilita, il telefono suona.</p>
              </article>
              <article className="feature-card">
                <h3>Timer, nella stessa app</h3>
                <p>Una tastiera, un elenco ordinato per durata, e una ripetizione i cui cicli restano in fase — per intervalli, sessioni, blocchi di studio. <a href="/it/timer/">La guida ai timer</a></p>
              </article>
            </div>
          </section>

          <section className="use-cases" id="uses" aria-labelledby="use-cases-heading">
            <h2 id="use-cases-heading">Che cosa può farci</h2>
            <p>Chi usa una sveglia solare, e che cosa imposta:</p>
            <ul className="use-case-list">
              <li><strong>Una giornata che segue il sole</strong> — alzarsi all&rsquo;alba, rallentare prima del tramonto, e mantenere sveglie a orario fisso per gli orari che gli altri si aspettano da lei. <a href="/it/sveglia-ritmo-circadiano/">Sveglia sul ritmo circadiano</a></li>
              <li><strong>Fotografi e astronomi</strong> — l&rsquo;ora dorata, l&rsquo;ora blu e la notte astronomica sono angoli del sole, non orari fissi. Imposti l&rsquo;angolo una volta: resta valido a ogni latitudine e in ogni stagione, offline, sul campo. <a href="/it/ora-dorata/">Ora dorata, ora blu e cielo notturno</a></li>
              <li><strong>Meditazione, yoga, una pratica alla prima luce</strong> — il saluto al sole quando arriva la luce, o una seduta prima di essa. Àncori all&rsquo;alba, all&rsquo;alba civile per angolo, o a una frazione della notte. <a href="/it/meditazione-alba/">Sveglia per meditazione e yoga</a></li>
              <li><strong>Uscire prima della luce</strong> — in acqua prima del giorno, con una sveglia che si muove con la prima luce invece di un orario che si riaggiusta ogni poche settimane.</li>
              <li><strong>Alzarsi prima dell&rsquo;alba</strong> — imposti una volta il suo scostamento prima dell&rsquo;alba: segue l&rsquo;alba ogni giorno. Per l&rsquo;orario esatto, faccia riferimento al proprio calendario; la sveglia, invece, non va mai alla deriva.</li>
              <li><strong>Lavoro all&rsquo;aperto, passeggiate, allevamento</strong> — se la sua giornata inizia con il giorno, anche la sua sveglia.</li>
              <li><strong>Intervalli, sessioni, blocchi di studio</strong> — timer che ripartono da soli, nella stessa app. <a href="/it/timer/">Timer ripetibili</a></li>
              <li><strong>Chiunque sia stanco di riaggiustare tutto l&rsquo;anno</strong> — imposti una volta, resta giusto. <a href="/it/sveglie/">Impostare una sveglia all&rsquo;alba o al tramonto</a></li>
            </ul>
          </section>

          <section className="screenshots" aria-labelledby="screenshots-heading">
            <h2 id="screenshots-heading">Schermate — l&rsquo;app di sveglie solari per Android</h2>
            <div className="screenshot-row">
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/it/alarm-picker"
                  darkBase="/assets/screenshots/it/alarm-picker--dark"
                  alt="La finestra di creazione sveglia di Risetime, aperta sopra l'elenco: il pallino ancora Mezzogiorno, uno scostamento di meno 1 ora e 00 minuti con il campo delle ore selezionato, e la riga Domani: 11:49. Un quadrante orario circolare con 1 selezionato occupa la metà inferiore, con Annulla e OK sotto."
                  width={360}
                  height={706}
                />
                <figcaption>Scelga l&rsquo;ancora e lo scostamento</figcaption>
              </figure>
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/it/dismiss-screen"
                  darkBase="/assets/screenshots/it/dismiss-screen--dark"
                  alt="La schermata di arresto di Risetime per una sveglia che suona, riempita da un bordo all'altro di un vecchio rosa tratto dalla posizione del sole: l'orario 17:30, la data giovedì 1 ottobre, la parola Sveglia, un grande pulsante circolare POSTICIPA, e CHIUDI sotto."
                  width={360}
                  height={706}
                />
                <figcaption>Un risveglio dolce</figcaption>
              </figure>
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/it/settings-screen"
                  darkBase="/assets/screenshots/it/settings-screen--dark"
                  alt="La schermata delle impostazioni di Risetime, con le righe Sveglie, Ancore, Timer, Impostazioni del telefono, e Posizione eventi celesti impostata su London, Regno Unito. La riga Affidabilità indica 8 verifiche su 8 in verde ed è aperta su Controlli senza effetto su questo telefono e Tutto a posto (8). Supportando Risetime compare sotto, e il piè di pagina indica Risetime."
                  width={360}
                  height={706}
                />
                <figcaption>Un&rsquo;affidabilità che può verificare</figcaption>
              </figure>
            </div>
          </section>

          <section className="privacy-callout" aria-labelledby="privacy-heading">
            <h2 id="privacy-heading">Offline, senza Internet, senza tracciamento</h2>
            <div className="callout-box">
              <p>Risetime non richiede il permesso Internet. Non c&rsquo;è un server. Non c&rsquo;è un account da creare. Non c&rsquo;è alcuno strumento di misurazione che osservi come usa l&rsquo;app.</p>
              <ul>
                <li>Nessun permesso <code>INTERNET</code> — l&rsquo;app non può connettersi</li>
                <li>Nessuna statistica d&rsquo;uso, nessun rapporto di arresto anomalo, nessuna telemetria</li>
                <li>Nessun account, nessuna sincronizzazione, nessuna connessione</li>
                <li>La posizione resta sul suo dispositivo — serve solo al calcolo solare</li>
                <li>Nessuna pubblicità, nessun tracciamento, nessun dato condiviso con chicchessia</li>
              </ul>
              <a href="/it/privacy/" className="privacy-link">Legga l&rsquo;informativa sulla privacy</a>
            </div>
          </section>

          <section className="support" aria-labelledby="support-heading">
            <h2 id="support-heading">Gratuita fino a tre sveglie. Illimitata sostenendo.</h2>
            <div className="callout-box" style={{"borderInlineStartColor": "var(--muted)"}}>
              <p>Risetime è gratuita fino a tre sveglie e tre timer — per sempre. <br />Gliene servono di più? Provi prima queste tre, e veda se vale il suo sostegno: i sostenitori hanno sveglie e timer illimitati, all&rsquo;anno o una volta per sempre. In caso contrario, sarò felice di <a href="mailto:contact@risetime.app">leggerla</a>. Si trova nelle Impostazioni.</p>
              <p style={{"marginBottom": "0"}}>Nessuna schermata di sollecito, nessun conto alla rovescia, nessun «passi alla versione superiore». Solo una proposta onesta, quando sarà pronto.</p>
            </div>
          </section>

          <section className="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading">Domande frequenti</h2>
            <dl className="faq-list">
              <dt>Che cosa fa Risetime, esattamente?</dt>
              <dd>Risetime è una sveglia che può agganciare un allarme a un momento del sole. Imposti «30 minuti prima dell&rsquo;alba» una volta, e la sveglia si ricalcola ogni giorno per la sua posizione: segue il sole tutto l&rsquo;anno. Fa anche le sveglie normali a orario fisso, e i timer.</dd>
              <dt>Risetime ha bisogno di una connessione Internet?</dt>
              <dd>No. Risetime non ha alcun permesso Internet — non può connettersi, anche se lo volesse. Gli orari di alba e tramonto sono calcolati sul suo dispositivo. Funziona in modalità aereo, sul campo, ovunque.</dd>
              <dt>Fa anche le sveglie normali, a orario fisso?</dt>
              <dd>Sì. Le sveglie a orologio e le sveglie ancorate al sole vivono nello stesso elenco, e i timer hanno una scheda propria, con il loro suono e il loro volume.</dd>
              <dt>Posso impostare una sveglia sull&rsquo;alba, sull&rsquo;ora dorata o sulla notte fonda?</dt>
              <dd>Sì, tramite l&rsquo;angolo solare. Crei un&rsquo;ancora a −6° per l&rsquo;alba civile, +6° la sera per l&rsquo;ora dorata, −18° per la notte astronomica, poi imposti le sue sveglie su di essa. Dove un angolo non viene mai raggiunto per una parte dell&rsquo;anno, l&rsquo;app lo segnala, e la sveglia salta quei giorni invece di suonare a un orario inventato.</dd>
              <dt>La sveglia suona comunque in modalità Doze o risparmio energetico?</dt>
              <dd>Sì. Risetime usa l&rsquo;API <code>setAlarmClock</code> di Android — lo stesso meccanismo di sistema dell&rsquo;orologio integrato nel suo telefono — e una schermata di affidabilità verifica i permessi di cui il suo telefono ha bisogno. Le sveglie suonano anche prima del primo sblocco dopo un riavvio.</dd>
              <dt>Risetime è gratuita?</dt>
              <dd>Gratuita fino a tre sveglie e tre timer, per sempre. Gliene servono di più? Provi prima queste tre, e veda se vale il suo sostegno: i sostenitori hanno sveglie e timer illimitati, all&rsquo;anno o una volta per sempre.</dd>
            </dl>
          </section>

          <section className="final-cta" aria-labelledby="cta-heading">
            <h2 id="cta-heading">Pronto ad alzarsi con il sole?</h2>
            <PlayBadge />
            <p className="cta-note">Risetime è in fase di test aperto: si iscriva prima al test, poi installi da Play. Senza questo passaggio, Play potrebbe dirle che l&rsquo;app non è disponibile nel suo paese.</p>
          </section>

        </main>

        <SiteFooter page="/" lang="it" />
    </div>
  )
}
