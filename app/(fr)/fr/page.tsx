import type { Metadata } from 'next'
import { langMetadata } from '../../../lib/metadata'
import SiteHeader from '../../../components/SiteHeader'
import ThemedPicture from '../../../components/ThemedPicture'
import SiteFooter from '../../../components/SiteFooter'

// L'ACCUEIL FRANÇAIS, écrit à la main comme l'anglais (porteur, 2026-09-27).
// ⚠️ Les chaînes d'en-tête vivent dans content/fr/home.md, en un exemplaire.
export const metadata: Metadata = langMetadata('fr', '/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Risetime",
  "alternateName": "Risetime Réveil au lever du soleil",
  "operatingSystem": "Android",
  "applicationCategory": "UtilitiesApplication",
  "inLanguage": "fr",
  "url": "https://risetime.app/fr/",
  "description": "Réveil au lever du soleil pour Android. Réglez votre alarme sur le lever, le coucher ou le midi solaire : elle se décale toute seule, chaque jour. Hors ligne, sans publicité.",
  /* ⛔ Les quatre mêmes captures que l’anglaise, et ce sont celles que cette
     page AFFICHE déjà dans son corps. Elles montrent l’app en anglais : le banc de
     captures ne sait pas encore produire une série par langue. Le jour où il
     saura, ces quatre URL changent ici ET dans le corps. */
  "screenshot": [
    "https://risetime.app/assets/screenshots/alarm-list.png",
    "https://risetime.app/assets/screenshots/alarm-picker.png",
    "https://risetime.app/assets/screenshots/dismiss-screen.png",
    "https://risetime.app/assets/screenshots/settings-screen.png"
  ],
  /* Les neuf entrées de l’anglaise, dans le même ordre. ⛔ Les noms de réglages
     viennent du .po et de nulle part ailleurs — « Un angle solaire », « Une
     longueur d’ombre », « Une fraction du jour ou de la nuit », « Midi solaire »,
     « Nadir », « Calibrage » — et « boucle » pour la répétition d’un minuteur.
     ⚠️ Jamais « répétition » ici : dans l’app, c’est le report d’une alarme. */
  "featureList": [
    "Des alarmes ancrées au lever du soleil, au coucher, au midi solaire ou au nadir",
    "Des ancres sur mesure : un angle solaire, une longueur d’ombre, une fraction du jour ou de la nuit",
    "Le calibrage d’une ancre, pour coller à un horaire publié",
    "Un recalcul automatique chaque jour, à mesure que les heures du soleil se décalent",
    "Fonctionne entièrement hors ligne — aucune permission Internet",
    "Aucune mesure d’audience, aucun pistage, aucune collecte de données",
    "Les alarmes célestes et les alarmes à heure fixe, prises en charge ensemble",
    "L’API d’alarme du système — elle survit au mode Doze et aux redémarrages",
    "Des minuteurs à rebours dont les boucles restent en phase"
  ],
  /* ⛔ « Deltawaken », mot pour mot comme l’anglaise, et l’URL avec : deux noms
     pour une seule organisation cassent la réconciliation d’entité.
     ⚠️ Le pied de page garde « A. Deltawaken » — c’est une signature humaine,
     pas un identifiant d’éditeur. */
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
  "inLanguage": "fr",
  "mainEntity": [
    { "@type": "Question", "name": "Que fait Risetime, exactement ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Risetime est un réveil qui peut attacher une alarme à un moment du soleil. Réglez « 30 minutes avant le lever » une fois, et l’alarme se recalcule chaque jour pour votre lieu : elle suit le soleil toute l’année. Elle fait aussi les alarmes ordinaires à heure fixe, et les minuteurs." } },
    { "@type": "Question", "name": "Risetime a-t-elle besoin d’une connexion Internet ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Non. Risetime n’a aucune permission Internet — elle ne peut pas se connecter, même si elle le voulait. Les heures de lever et de coucher sont calculées sur votre appareil. Elle marche en mode avion, sur le terrain, n’importe où." } },
    { "@type": "Question", "name": "Fait-elle aussi les alarmes normales, à heure fixe ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Oui. Les alarmes d’horloge et les alarmes ancrées sur le soleil vivent dans la même liste, et les minuteurs ont leur propre onglet, avec leur son et leur volume." } },
    { "@type": "Question", "name": "Puis-je régler une alarme sur l’aube, l’heure dorée ou la nuit noire ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Oui, par l’angle solaire. Créez une ancre à −6° pour l’aube civile, +6° le soir pour l’heure dorée, −18° pour la nuit astronomique, puis réglez vos alarmes dessus. Là où un angle n’est jamais atteint pendant une partie de l’année, l’application le dit, et l’alarme saute ces jours-là au lieu de sonner à une heure inventée." } },
    { "@type": "Question", "name": "L’alarme sonne-t-elle quand même en mode Doze ou en économie de batterie ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Oui. Risetime utilise l’API setAlarmClock d’Android — le même mécanisme système que l’horloge livrée avec votre téléphone — et un écran de fiabilité vérifie les autorisations dont votre téléphone a besoin. Les alarmes sonnent même avant le premier déverrouillage après un redémarrage." } },
    { "@type": "Question", "name": "Risetime est-elle gratuite ?",
      "acceptedAnswer": { "@type": "Answer", "text": "Gratuite jusqu’à trois alarmes et trois minuteurs, pour toujours. Il vous en faut plus ? Servez-vous d’abord de ces trois-là, et voyez si ça vaut votre soutien : les soutiens ont les alarmes et les minuteurs sans limite, à l’année ou une fois pour toutes." } }
  ]
}
]

const PLAY = "https://play.google.com/apps/testing/com.deltawaken.risetime"
const PlayBadge = () => (
  <a className="play-badge" href={PLAY} target="_blank" rel="noopener" aria-label="Rejoindre le test ouvert de Risetime sur Google Play">
    <span className="badge-main">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
      Google Play
    </span>
    <span className="badge-sub">Test ouvert</span>
  </a>
)

export default function AccueilPage() {
  return (
    <div className="landing">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <a href="#main-content" className="skip-link">Aller au contenu principal</a>

        <SiteHeader current="/" lang="fr" />

        <main id="main-content">

          <section className="hero" aria-labelledby="hero-heading">
            <h1 id="hero-heading"><span className="hero-brand">Risetime</span> <span className="hero-sep" aria-hidden="true">&mdash;</span> l&rsquo;application d&rsquo;alarmes solaires pour Android.</h1>
            <p className="hero-celestial">Votre réveil céleste.</p>
            <p className="hero-sub">Réglez votre alarme sur le soleil. Elle se décale chaque jour, pour que vous n&rsquo;ayez pas à le faire.</p>
            <div className="hero-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/fr/alarm-list"
                darkBase="/assets/screenshots/fr/alarm-list--dark"
                alt="Liste d'alarmes de Risetime avec cinq alarmes : 05:10 le samedi sur Aube astronomique, une ancre personnalisée ; 07:00 du lundi au vendredi sur Absolu, une heure fixe ; 07:02 demain au Lever du soleil ; 17:38 du lundi au vendredi, 1 h avant le Coucher du soleil ; et 23:02 aujourd'hui, 8 h avant le Lever du soleil, éteinte."
                width={360}
                height={706}
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="cta-group">
              <PlayBadge />
              <p className="cta-note">Risetime est en test ouvert : vous rejoignez d&rsquo;abord le test, puis vous installez depuis Play. Sans cette étape, Play peut vous dire que l&rsquo;application n&rsquo;est pas disponible dans votre pays.</p>
            </div>
          </section>

          <section className="how-it-works" aria-labelledby="how-heading">
            <h2 id="how-heading">Comment fonctionne l&rsquo;alarme au lever du soleil</h2>
            <ol className="steps" role="list">
              <li><strong>Choisissez votre ancre</strong><span>Un événement céleste : lever, midi solaire, coucher ou nadir. C&rsquo;est le point de référence que votre alarme va suivre.</span></li>
              <li><strong>Réglez votre décalage</strong><span>Combien de temps avant, ou après. Trente minutes avant le lever. Une heure après le coucher. Et les jours où elle se répète.</span></li>
              <li><strong>C&rsquo;est tout</strong><span>Risetime recalcule l&rsquo;heure exacte chaque jour. Le lever glisse avec les saisons — votre alarme suit. Vous n&rsquo;y touchez plus jamais.</span></li>
            </ol>
          </section>

          <section className="features" aria-labelledby="features-heading">
            <h2 id="features-heading">Ce que fait l&rsquo;application Risetime</h2>
            <div className="feature-grid">
              <article className="feature-card">
                <h3>Ancrée sur la journée</h3>
                <p>Réglez vos alarmes par rapport au lever, au midi solaire, au coucher ou au nadir, avec le décalage que vous voulez. L&rsquo;heure se recalcule chaque jour pour rester en phase avec le ciel réel. Réglée une fois, juste toute l&rsquo;année.</p>
              </article>
              <article className="feature-card">
                <h3>Hors ligne, et privée par construction</h3>
                <p>Risetime n&rsquo;a pas la permission Internet. Pas désactivée : absente. Les heures de lever sont calculées sur votre appareil, par des algorithmes astronomiques embarqués. Aucun serveur, aucun compte, aucune donnée qui quitte votre téléphone.</p>
              </article>
              <article className="feature-card">
                <h3>Réglez-la, puis oubliez-la</h3>
                <p>L&rsquo;application recalcule vos heures en arrière-plan, tous les jours. La plupart du temps, vous ne l&rsquo;ouvrez même pas. C&rsquo;est voulu : Risetime est à son meilleur quand vous oubliez qu&rsquo;elle existe.</p>
              </article>
              <article className="feature-card">
                <h3>De vraies alarmes, pas des notifications</h3>
                <p>Risetime utilise la même API système que l&rsquo;horloge livrée avec Android. Votre alarme survit au mode Doze, à l&rsquo;optimisation de la batterie et aux redémarrages. À l&rsquo;heure dite, le téléphone sonne.</p>
              </article>
              <article className="feature-card">
                <h3>Des minuteurs, dans la même application</h3>
                <p>Un clavier, une liste triée par durée, et une répétition dont les cycles restent en phase — pour des intervalles, des séances, des blocs de révision. <a href="/fr/minuteurs/">Le guide des minuteurs</a></p>
              </article>
            </div>
          </section>

          <section className="use-cases" id="uses" aria-labelledby="use-cases-heading">
            <h2 id="use-cases-heading">Ce que vous pouvez en faire</h2>
            <p>Qui se sert d&rsquo;un réveil solaire, et ce qu&rsquo;il règle :</p>
            <ul className="use-case-list">
              <li><strong>Une journée qui suit le soleil</strong> — se lever au lever, ralentir avant le coucher, et garder des alarmes à heure fixe pour les heures que les autres attendent de vous. <a href="/fr/reveil-rythme-circadien/">Réveil sur le rythme circadien</a></li>
              <li><strong>Photographes et astronomes</strong> — l&rsquo;heure dorée, l&rsquo;heure bleue et la nuit astronomique sont des angles du soleil, pas des heures fixes. Réglez l&rsquo;angle une fois : il tient à toutes les latitudes et à toutes les saisons, hors ligne, sur le terrain. <a href="/fr/heure-doree/">Heure dorée, heure bleue et ciel nocturne</a></li>
              <li><strong>Méditation, yoga, une pratique à la première lumière</strong> — la salutation au soleil quand la lumière arrive, ou une assise avant elle. Ancrez sur le lever, sur l&rsquo;aube civile par son angle, ou sur une fraction de la nuit. <a href="/fr/meditation-lever-du-soleil/">Réveil pour la méditation et le yoga</a></li>
              <li><strong>Sortir avant la lumière</strong> — à l&rsquo;eau avant le jour, sur une alarme qui bouge avec la première lumière au lieu d&rsquo;une heure qu&rsquo;on réajuste toutes les quelques semaines.</li>
              <li><strong>Se lever avant l&rsquo;aube</strong> — réglez une fois votre décalage avant le lever : il suit le lever chaque jour. Pour le moment exact, reportez-vous à votre propre calendrier ; l&rsquo;alarme, elle, ne dérive jamais.</li>
              <li><strong>Travail dehors, promenades, élevage</strong> — si votre journée commence avec le jour, votre alarme aussi.</li>
              <li><strong>Intervalles, séances, blocs de révision</strong> — des minuteurs qui repartent tout seuls, dans la même application. <a href="/fr/minuteurs/">Minuteurs répétables</a></li>
              <li><strong>Quiconque en a assez de rajuster toute l&rsquo;année</strong> — réglez une fois, ça reste juste. <a href="/fr/alarmes/">Régler une alarme au lever ou au coucher du soleil</a></li>
            </ul>
          </section>

          <section className="screenshots" aria-labelledby="screenshots-heading">
            <h2 id="screenshots-heading">Captures d&rsquo;écran — l&rsquo;application d&rsquo;alarmes solaires pour Android</h2>
            <div className="screenshot-row">
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/fr/alarm-picker"
                  darkBase="/assets/screenshots/fr/alarm-picker--dark"
                  alt="La boîte de création d'alarme de Risetime, ouverte par-dessus la liste : la pastille d'ancre Midi, un décalage de moins 1 heure et 00 minute avec le champ des heures sélectionné, et la ligne Demain : 11:49. Un cadran d'heures circulaire avec 1 sélectionné occupe la moitié basse, avec Annuler et OK en dessous."
                  width={360}
                  height={706}
                />
                <figcaption>Choisissez l&rsquo;ancre et le décalage</figcaption>
              </figure>
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/fr/dismiss-screen"
                  darkBase="/assets/screenshots/fr/dismiss-screen--dark"
                  alt="L'écran d'arrêt de Risetime pour une alarme qui sonne, rempli d'un bord à l'autre d'un vieux rose tiré de la position du soleil : l'heure 17:30, la date jeudi 1er octobre, le mot Alarme, un grand bouton circulaire REPORTER, et IGNORER en dessous."
                  width={360}
                  height={706}
                />
                <figcaption>Un réveil en douceur</figcaption>
              </figure>
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/fr/settings-screen"
                  darkBase="/assets/screenshots/fr/settings-screen--dark"
                  alt="L'écran des paramètres de Risetime, avec les lignes Alarmes, Ancres, Minuteurs, Paramètres du téléphone, et Lieu des événements célestes réglé sur Londres, Royaume-Uni. La ligne Fiabilité indique 8 vérifications sur 8 au vert et est ouverte sur Contrôles sans objet sur ce téléphone et Tout va bien (8). Soutenir Risetime figure en dessous, et le pied de page indique Risetime."
                  width={360}
                  height={706}
                />
                <figcaption>Une fiabilité que vous pouvez vérifier</figcaption>
              </figure>
            </div>
          </section>

          <section className="privacy-callout" aria-labelledby="privacy-heading">
            <h2 id="privacy-heading">Hors ligne, sans Internet, sans pistage</h2>
            <div className="callout-box">
              <p>Risetime ne demande pas la permission Internet. Il n&rsquo;y a pas de serveur. Il n&rsquo;y a pas de compte à créer. Il n&rsquo;y a aucun outil de mesure qui regarde comment vous vous servez de l&rsquo;application.</p>
              <ul>
                <li>Pas de permission <code>INTERNET</code> — l&rsquo;application ne peut pas se connecter</li>
                <li>Aucune statistique d&rsquo;usage, aucun rapport de plantage, aucune télémétrie</li>
                <li>Aucun compte, aucune synchronisation, aucune connexion</li>
                <li>Le lieu reste sur votre appareil — il ne sert qu&rsquo;au calcul solaire</li>
                <li>Aucune publicité, aucun pistage, aucune donnée partagée avec qui que ce soit</li>
              </ul>
              <a href="/fr/confidentialite/" className="privacy-link">Lire la politique de confidentialité</a>
            </div>
          </section>

          <section className="support" aria-labelledby="support-heading">
            <h2 id="support-heading">Gratuite jusqu&rsquo;à trois alarmes. Illimitée en soutenant.</h2>
            <div className="callout-box" style={{"borderInlineStartColor": "var(--muted)"}}>
              <p>Risetime est gratuite jusqu&rsquo;à trois alarmes et trois minuteurs — pour toujours. <br />Il vous en faut plus ? Servez-vous d&rsquo;abord de ces trois-là, et voyez si ça vaut votre soutien : les soutiens ont les alarmes et les minuteurs sans limite, à l&rsquo;année ou une fois pour toutes. Sinon, je serai heureux de <a href="mailto:contact@risetime.app">vous lire</a>. Ça se trouve dans les Paramètres.</p>
              <p style={{"marginBottom": "0"}}>Aucun écran de relance, aucun compte à rebours, aucun « passez à la version supérieure ». Juste une proposition honnête, quand vous serez prêt.</p>
            </div>
          </section>

          <section className="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading">Questions fréquentes</h2>
            <dl className="faq-list">
              <dt>Que fait Risetime, exactement ?</dt>
              <dd>Risetime est un réveil qui peut attacher une alarme à un moment du soleil. Réglez « 30 minutes avant le lever » une fois, et l&rsquo;alarme se recalcule chaque jour pour votre lieu : elle suit le soleil toute l&rsquo;année. Elle fait aussi les alarmes ordinaires à heure fixe, et les minuteurs.</dd>
              <dt>Risetime a-t-elle besoin d&rsquo;une connexion Internet ?</dt>
              <dd>Non. Risetime n&rsquo;a aucune permission Internet — elle ne peut pas se connecter, même si elle le voulait. Les heures de lever et de coucher sont calculées sur votre appareil. Elle marche en mode avion, sur le terrain, n&rsquo;importe où.</dd>
              <dt>Fait-elle aussi les alarmes normales, à heure fixe ?</dt>
              <dd>Oui. Les alarmes d&rsquo;horloge et les alarmes ancrées sur le soleil vivent dans la même liste, et les minuteurs ont leur propre onglet, avec leur son et leur volume.</dd>
              <dt>Puis-je régler une alarme sur l&rsquo;aube, l&rsquo;heure dorée ou la nuit noire ?</dt>
              <dd>Oui, par l&rsquo;angle solaire. Créez une ancre à −6° pour l&rsquo;aube civile, +6° le soir pour l&rsquo;heure dorée, −18° pour la nuit astronomique, puis réglez vos alarmes dessus. Là où un angle n&rsquo;est jamais atteint pendant une partie de l&rsquo;année, l&rsquo;application le dit, et l&rsquo;alarme saute ces jours-là au lieu de sonner à une heure inventée.</dd>
              <dt>L&rsquo;alarme sonne-t-elle quand même en mode Doze ou en économie de batterie ?</dt>
              <dd>Oui. Risetime utilise l&rsquo;API <code>setAlarmClock</code> d&rsquo;Android — le même mécanisme système que l&rsquo;horloge livrée avec votre téléphone — et un écran de fiabilité vérifie les autorisations dont votre téléphone a besoin. Les alarmes sonnent même avant le premier déverrouillage après un redémarrage.</dd>
              <dt>Risetime est-elle gratuite ?</dt>
              <dd>Gratuite jusqu&rsquo;à trois alarmes et trois minuteurs, pour toujours. Il vous en faut plus ? Servez-vous d&rsquo;abord de ces trois-là, et voyez si ça vaut votre soutien : les soutiens ont les alarmes et les minuteurs sans limite, à l&rsquo;année ou une fois pour toutes.</dd>
            </dl>
          </section>

          <section className="final-cta" aria-labelledby="cta-heading">
            <h2 id="cta-heading">Prêt à vous lever avec le soleil ?</h2>
            <PlayBadge />
            <p className="cta-note">Risetime est en test ouvert : vous rejoignez d&rsquo;abord le test, puis vous installez depuis Play. Sans cette étape, Play peut vous dire que l&rsquo;application n&rsquo;est pas disponible dans votre pays.</p>
          </section>

        </main>

        <SiteFooter page="/" lang="fr" />
    </div>
  )
}
