import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// LA PAGE FRANÇAISE, ÉCRITE À LA MAIN — décision du porteur du 2026-09-27 :
// « on ne fait plus de markdown […] tu vas juste bien gentiment tout traduire
// toi-même ». Traduction de app/(en)/circadian-rhythm-alarm/page.tsx, trait pour
// trait : mêmes sections, mêmes `id`, mêmes captures, mêmes données structurées.
//
// ⚠️ SES CHAÎNES D'EN-TÊTE VIVENT DANS content/fr/circadian-rhythm-alarm.md, en UN
// exemplaire. La clé passée à `langMetadata` reste la page ANGLAISE : c'est
// l'identité de la page, pas son adresse.
//
// ⛔ AUCUNE ALLÉGATION DE SANTÉ. La page anglaise a déjà été réécrite une fois pour
// en retirer. Le rythme circadien se DÉCRIT — ce que le soleil fait, ce que
// l'application calcule — il ne se soigne pas.
export const metadata: Metadata = langMetadata('fr', '/circadian-rhythm-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Réveil rythme circadien pour Android : une alarme ancrée au lever du soleil",
  "description": "Comment régler une alarme Android sur le lever du soleil, et une journée bâtie autour du soleil, avec l’application de réveil Risetime. L’alarme se décale toute seule avec les saisons ; les heures sont calculées sur l’appareil, sans aucune permission Internet.",
  "inLanguage": "fr",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/fr/reveil-rythme-circadien/"
},
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "inLanguage": "fr",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Risetime",
      "item": "https://risetime.app/fr/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Alarme de rythme circadien",
      "item": "https://risetime.app/fr/reveil-rythme-circadien/"
    }
  ]
}
]

export default function ReveilRythmeCircadienPage() {
  return (
    <div className="layout-narrow">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <a href="#main-content" className="skip-link">Aller au contenu principal</a>

        <SiteHeader current="/circadian-rhythm-alarm/" lang="fr" />

        <div className="page-header">
          <h1>Réveil rythme circadien pour Android : une alarme ancrée au lever du soleil</h1>
          <p className="subtitle">Elle se décale toute seule avec les saisons.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-what">
            <h2 id="section-what" className="sr-only">Ce qu&rsquo;est une alarme de rythme circadien</h2>
            <p>« Alarme de rythme circadien », c&rsquo;est ainsi qu&rsquo;on appelle une alarme attachée au soleil plutôt qu&rsquo;à l&rsquo;horloge. Le mot vient du cycle d&rsquo;environ 24 heures du corps ; dans une boutique d&rsquo;applications, il veut simplement dire que l&rsquo;alarme suit le lever du soleil au lieu de rester à une heure fixe.</p>
            <p>Dans Risetime, le moment du soleil que vous choisissez s&rsquo;appelle une <strong>ancre</strong> — le lever, le midi solaire, le coucher — et la distance que vous gardez par rapport à elle est le <strong>décalage</strong>.</p>
          </section>

          <section aria-labelledby="section-swing">
            <h2 id="section-swing">De combien le lever du soleil se déplace au fil de l&rsquo;année</h2>
            <table className="timing-table" aria-label="De combien le lever du soleil se déplace entre juin et décembre, par ville">
              <thead>
                <tr><th>Ville</th><th>Lever le plus tôt</th><th>Lever le plus tard</th><th>Amplitude</th></tr>
              </thead>
              <tbody>
                <tr><td>Londres</td><td>04:43 (21 juin)</td><td>08:03 (21 déc.)</td><td>3 h 20</td></tr>
                <tr><td>Paris</td><td>05:46 (21 juin)</td><td>08:41 (21 déc.)</td><td>2 h 55</td></tr>
                <tr><td>Tokyo</td><td>04:25 (21 juin)</td><td>06:47 (21 déc.)</td><td>2 h 20</td></tr>
                <tr><td>Chicago</td><td>05:15 (21 juin)</td><td>07:14 (21 déc.)</td><td>2 h 00</td></tr>
                <tr><td>Sydney</td><td>05:41 (21 déc.)</td><td>06:00 (21 juin)</td><td>1 h 20</td></tr>
              </tbody>
            </table>
            <p>Heure locale, 2027, calculée avec la bibliothèque astronomique dont se sert l&rsquo;application.</p>
            <p>Une alarme fixe à 06:30 à Londres sonne donc <strong>1 h 47 après le lever du soleil en juin</strong>, et <strong>1 h 33 avant lui en décembre</strong>. La même alarme, deux matins différents.</p>
          </section>

          <section aria-labelledby="section-how">
            <h2 id="section-how">Comment régler une alarme sur le rythme circadien</h2>
            <ol>
              <li>Dans l&rsquo;onglet <strong>Alarmes</strong>, appuyez sur <strong>+</strong>.</li>
              <li>Dans le menu du haut, choisissez <strong>Lever du soleil</strong>.</li>
              <li>Laissez le cadran où il est pour vous lever au lever du soleil, ou tournez-le sur la distance que vous voulez — 30 minutes avant, une heure avant.</li>
              <li>Appuyez sur <strong>OK</strong>. Ouvrez ensuite l&rsquo;alarme dans la liste et cochez <strong>Répéter</strong> pour choisir vos jours.</li>
            </ol>
            <p>La distance que vous réglez ne change jamais. Le lever du soleil, lui, change, et l&rsquo;alarme va avec — à travers les équinoxes, les solstices et le passage à l&rsquo;heure d&rsquo;été. <a href="/fr/alarmes/" className="content-link">Régler une alarme au lever ou au coucher du soleil</a></p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/fr/circadian-list"
                darkBase="/assets/screenshots/fr/circadian-list--dark"
                alt="Liste d'alarmes de Risetime avec trois alarmes, toutes répétées chaque jour : 07:02 au lever du soleil, 20:38 deux heures après le coucher du soleil, et 23:02 huit heures avant le lever du soleil."
                width={360}
                height={706}
              />
              <figcaption>Des alarmes ancrées au lever et au coucher du soleil, répétées chaque jour.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-day">
            <h2 id="section-day">Une journée qui suit le soleil — et une horloge</h2>
            <p>Voici la journée que je vis vraiment, sur mon propre téléphone :</p>
            <table className="timing-table" aria-label="Une journée faite d'alarmes ancrées au soleil et d'alarmes d'horloge">
              <thead>
                <tr><th>Moment</th><th>Alarme</th><th>Jours</th></tr>
              </thead>
              <tbody>
                <tr><td>Le lever</td><td>Lever du soleil</td><td>lun.–ven.</td></tr>
                <tr><td>Le début du travail, ou le lever du week-end</td><td>09:00</td><td>chaque jour</td></tr>
                <tr><td>Le déjeuner</td><td>1 h avant Midi — le midi solaire, rarement 12:00</td><td>chaque jour</td></tr>
                <tr><td>On reprend</td><td>1 h après Midi</td><td>lun.–ven.</td></tr>
                <tr><td>On arrête</td><td>18:00</td><td>lun.–ven.</td></tr>
              </tbody>
            </table>
            <p>Il y en a une sixième, huit heures avant le lever du soleil, pour commencer à ralentir. Elle est éteinte pour le moment — la position du milieu de l&rsquo;interrupteur garde une alarme sans la laisser sonner.</p>
            <p>Cela fait six alarmes, dont une éteinte — plus que les trois gratuites.</p>
            <p>Celles qui sont ancrées au soleil suivent la lumière ; celles d&rsquo;horloge tiennent ce que les autres attendent de vous. Les deux vivent dans la même liste, et chaque carte dit laquelle est laquelle.</p>
            <p>Jusqu&rsquo;où cela va dépend de là où vous vivez. À Sydney, le lever du soleil se déplace d&rsquo;environ une heure sur l&rsquo;année, et une journée ancrée au soleil y dérive à peine. À Londres, il se déplace de plus de trois heures : le matin suit alors le soleil, tandis que les heures de travail restent sur l&rsquo;horloge.</p>
          </section>

          <section aria-labelledby="section-late">
            <h2 id="section-late">Quand le lever du soleil arrive trop tard</h2>
            <p>Au cœur de l&rsquo;hiver, le lever du soleil arrive après le début de la journée de travail — 08:03 à Londres le 21 décembre. Deux façons de s&rsquo;en sortir :</p>
            <ul>
              <li><strong>Se lever aux premières lueurs, plutôt.</strong> La lumière arrive bien avant le soleil. Dans Paramètres → Ancres, fabriquez votre propre ancre à l&rsquo;<strong>aube civile</strong> — le moment où il y a assez de lumière pour voir dehors sans lampe — et réglez votre alarme dessus. <a href="/fr/alarmes/#section-custom" className="content-link">Ancres par angle solaire et par crépuscule</a></li>
              <li><strong>Gardez les deux sortes d&rsquo;alarme</strong>, comme ci-dessus : l&rsquo;horloge pour les jours qui commencent à heure fixe, le soleil pour le reste.</li>
            </ul>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/fr/circadian-offset"
                darkBase="/assets/screenshots/fr/circadian-offset--dark"
                alt="La boîte de dialogue de nouvelle alarme réglée sur le lever du soleil avec un décalage de huit heures avant, le cadran des heures sur 8 et celui des minutes sur 00, et la ligne Aujourd'hui : 23:02."
                width={360}
                height={706}
              />
              <figcaption>N&rsquo;importe quelle distance par rapport à l&rsquo;ancre, avant ou après, jusqu&rsquo;à 11 h 59 min.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-privacy">
            <h2 id="section-privacy">Une alarme, pas un suivi du sommeil</h2>
            <p>Risetime ne suit pas votre sommeil. Elle n&rsquo;enregistre pas le moment où vous arrêtez une alarme, elle n&rsquo;a pas de compte, pas de cloud et aucun outil de mesure. Elle n&rsquo;a <strong>aucune permission Internet</strong> : le système d&rsquo;exploitation lui-même l&rsquo;empêche donc de se connecter. Les heures de lever du soleil sont calculées sur votre téléphone, et votre position ne le quitte jamais. C&rsquo;est aussi pourquoi elle marche en mode avion, dans une vallée, sur un bateau. <a href="/fr/confidentialite/" className="content-link">Politique de confidentialité</a></p>
            <p>Risetime est gratuite jusqu&rsquo;à trois alarmes et trois minuteurs — pour toujours. Il vous en faut plus ? Servez-vous d&rsquo;abord de ces trois-là, et voyez si ça vaut votre soutien : les soutiens ont les alarmes et les minuteurs sans limite, à l&rsquo;année ou une fois pour toutes. Sinon, je serai heureux de <a href="mailto:contact@risetime.app">vous lire</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Levez-vous avec le soleil. Gardez l&rsquo;horloge pour le reste.</h2>
            <a className="play-badge" href="https://play.google.com/apps/testing/com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Rejoindre le test ouvert de Risetime sur Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Test ouvert</span>
            </a>
            <p className="cta-note">Risetime est en test ouvert : vous rejoignez d&rsquo;abord le test, puis vous installez depuis Play. Sans cette étape, Play peut vous dire que l&rsquo;application n&rsquo;est pas disponible dans votre pays.</p>
          </div>

        </main>

        <SiteFooter page="/circadian-rhythm-alarm/" lang="fr" />
    </div>
  )
}
