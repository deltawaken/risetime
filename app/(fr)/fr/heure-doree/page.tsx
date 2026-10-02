import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// LA PAGE FRANÇAISE, ÉCRITE À LA MAIN — décision du porteur du 2026-09-27 :
// « on ne fait plus de markdown […] tu vas juste bien gentiment tout traduire
// toi-même ». Une page traduite porte donc TOUT ce que porte l'anglaise, son
// mobilier compris, du même côté qu'elle : le JSX — captures à direction
// artistique et données structurées comprises.
//
// ⚠️ SES CHAÎNES D'EN-TÊTE VIVENT DANS content/fr/golden-hour-alarm.md, en UN
// exemplaire, exactement comme l'anglaise les prend dans content/en/.
// `langMetadata` y lit titre, description et og, y ajoute le canonical FRANÇAIS
// et les hreflang, et pose `noindex` en build de preview.
//
// ⛔ LA CLÉ RESTE CELLE DE LA PAGE ANGLAISE (`/golden-hour-alarm/`) : c'est le
// registre `PAGES` (lib/pages.ts) qui la nomme, et l'URL française en est
// DÉRIVÉE par le `slug:` de l'en-tête. Écrire ici « /heure-doree/ » ferait
// chercher une page qui n'est pas dans le registre.
//
// ⛔ `fr` est dans `STATIC_LOCALES` (lib/pages.ts) : la route dynamique
// `app/[lang]/` ne produit donc PAS ces URL, sans quoi Next en fabriquerait deux
// exemplaires.
export const metadata: Metadata = langMetadata('fr', '/golden-hour-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "L’heure dorée, l’heure bleue et le ciel nocturne, sur une alarme",
  "description": "Comment régler des alarmes sur l’heure dorée, l’heure bleue et la nuit astronomique sous Android, par l’angle solaire plutôt que par une heure d’horloge, avec l’application d’alarmes Risetime. Calculé sur l’appareil, hors ligne.",
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
  "mainEntityOfPage": "https://risetime.app/fr/heure-doree/"
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
      "name": "Alarme heure dorée",
      "item": "https://risetime.app/fr/heure-doree/"
    }
  ]
}
]

export default function HeureDoreePage() {
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

        <SiteHeader current="/golden-hour-alarm/" lang="fr" />

        <div className="page-header">
          <h1>L&rsquo;heure dorée, l&rsquo;heure bleue et le ciel nocturne, sur une alarme</h1>
          <p className="subtitle">Réglez l&rsquo;angle une fois. L&rsquo;alarme suit la lumière toute l&rsquo;année.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="s-why">
            <h2 id="s-why" className="sr-only">Pourquoi une alarme à heure fixe manque la lumière</h2>
            <p>Vous savez quand la lumière est belle. Le problème, c&rsquo;est qu&rsquo;elle bouge : à New York, le coucher du soleil va de <strong>16:31 le 21 décembre</strong> à <strong>20:30 le 21 juin</strong>. Une alarme à heure fixe pour l&rsquo;heure dorée est fausse au bout de deux semaines, et inutile au bout d&rsquo;un mois.</p>
            <p>Risetime règle une alarme sur <strong>l&rsquo;angle solaire</strong> plutôt que sur une heure d&rsquo;horloge — et c&rsquo;est l&rsquo;angle qui définit vraiment ces fenêtres.</p>
          </section>

          <section aria-labelledby="s-angles">
            <h2 id="s-angles">La lumière, par l&rsquo;angle</h2>
            <table className="timing-table" aria-label="L’heure dorée, l’heure bleue et la nuit astronomique, par l’angle solaire">
              <thead><tr><th>Ce que vous cherchez</th><th>Le soleil est…</th><th>Dans Risetime</th></tr></thead>
              <tbody>
                <tr><td>Heure dorée, le soir</td><td>sous environ <strong>6° au-dessus</strong> de l&rsquo;horizon</td><td>une ancre d&rsquo;angle solaire, <strong>+6° le soir</strong></td></tr>
                <tr><td>Heure bleue, le soir</td><td>entre environ <strong>4° et 6° sous l&rsquo;horizon</strong></td><td><strong>−4° le soir</strong>, la fenêtre se poursuivant jusqu&rsquo;à −6°</td></tr>
                <tr><td>Heure dorée, le matin</td><td>la même chose, à l&rsquo;envers</td><td><strong>+6° le matin</strong></td></tr>
                <tr><td>Nuit astronomique</td><td><strong>18° sous l&rsquo;horizon</strong></td><td><strong>−18° le soir</strong>, et −18° le matin pour savoir quand elle s&rsquo;achève</td></tr>
              </tbody>
            </table>
            <p>Les définitions varient d&rsquo;un photographe à l&rsquo;autre ; voici les plus courantes. Réglez l&rsquo;angle avec lequel vous travaillez, et l&rsquo;application le tient à toutes les latitudes et à toutes les saisons — ce qu&rsquo;une règle toute faite, « 30 minutes avant le coucher du soleil », ne sait pas faire, parce que la durée du crépuscule change avec les deux. À Londres le 21 juin, +6° tombe à 20:27 et le coucher du soleil à 21:21 : près d&rsquo;une heure d&rsquo;écart. À New York le même soir, 19:49 et 20:30 : quarante minutes.</p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/fr/sky-menu"
                darkBase="/assets/screenshots/fr/sky-menu--dark"
                alt="La boîte de création d'alarme, son menu d'ancres ouvert, listant Absolu, Lever du soleil, Midi, Heure dorée, Coucher du soleil, Heure bleue, Ciel nocturne et Nadir."
                width={360}
                height={706}
              />
              <figcaption>Vos propres ancres prennent place à côté du lever et du coucher du soleil, dans l&rsquo;ordre de la journée.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-make">
            <h2 id="s-make">L&rsquo;ancre, une fois pour toutes</h2>
            <ol>
              <li>Ouvrez <strong>Paramètres → Ancres</strong> et appuyez sur <strong>+</strong>.</li>
              <li>Gardez le type sur <strong>Un angle solaire</strong> et réglez votre angle — un appui sur la valeur pour la saisir, et choisissez <strong>matin</strong> ou <strong>soir</strong>.</li>
              <li>Nommez-la — <em>Heure dorée</em>, <em>Heure bleue</em>, <em>Ciel nocturne</em> —, choisissez une couleur et enregistrez.</li>
              <li>Dans l&rsquo;onglet <strong>Alarmes</strong>, réglez une alarme dessus : à l&rsquo;ancre, ou trente minutes avant pour arriver sur place.</li>
            </ol>
            <p><a href="/fr/alarmes/#section-custom" className="content-link">Comment marchent les ancres et les décalages</a></p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/fr/sky-list"
                darkBase="/assets/screenshots/fr/sky-list--dark"
                alt="La liste d'alarmes de Risetime avec cinq alarmes : 06:45 et 08:10 du lundi au vendredi sur Absolu ; 17:21 le samedi et le dimanche, 30 min avant Heure dorée ; 18:58 le samedi et le dimanche à Heure bleue ; et 20:30 le vendredi et le samedi à Ciel nocturne."
                width={360}
                height={706}
              />
              <figcaption>Des alarmes d&rsquo;horloge pour la semaine, des alarmes solaires pour la lumière.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-week">
            <h2 id="s-week">Une semaine de travail, et la lumière le week-end</h2>
            <p>La plupart d&rsquo;entre nous ne vivent pas de la photo :</p>
            <table className="timing-table" aria-label="Une semaine d’alarmes d’horloge, et des alarmes de week-end ancrées sur la lumière">
              <thead><tr><th>Moment</th><th>Alarme</th><th>Jours</th></tr></thead>
              <tbody>
                <tr><td>Réveil</td><td>06:45</td><td>Lun–ven</td></tr>
                <tr><td>Départ à l&rsquo;école</td><td>08:10</td><td>Lun–ven</td></tr>
                <tr><td>Préparer le sac</td><td>30 min avant Heure dorée</td><td>Sam et dim</td></tr>
                <tr><td>Heure bleue</td><td>Heure bleue</td><td>Sam et dim</td></tr>
                <tr><td>Les étoiles</td><td>Ciel nocturne</td><td>Ven et sam</td></tr>
              </tbody>
            </table>
            <p>Des alarmes d&rsquo;horloge pour la semaine, des alarmes solaires pour la lumière — la même liste, la même application.</p>
          </section>

          <section aria-labelledby="s-road">
            <h2 id="s-road">En déplacement, et loin de tout réseau</h2>
            <ul>
              <li><strong>En voyage ?</strong> Activez la <strong>Mise à jour automatique du lieu</strong> dans les Paramètres, et vos alarmes vous suivent — un déplacement, une nouvelle ville, un littoral.</li>
              <li><strong>Pas de réseau sur place ?</strong> Risetime calcule la position du soleil sur le téléphone, avec une bibliothèque astronomique. Elle n&rsquo;a <strong>aucune autorisation Internet</strong>, elle ne peut donc pas dépendre d&rsquo;une connexion : mode avion, un canyon, un bateau — l&rsquo;alarme sait toujours quand la lumière arrive.</li>
              <li><strong>Aucun pistage, aucun compte, aucune publicité.</strong> Votre position ne quitte jamais le téléphone. <a href="/fr/confidentialite/" className="content-link">Politique de confidentialité</a></li>
            </ul>
          </section>

          <section aria-labelledby="s-night">
            <h2 id="s-night">Pour le ciel nocturne</h2>
            <p>La nuit astronomique est la fenêtre entre le moment du soir et le moment du matin où le soleil est à 18° sous l&rsquo;horizon. Posez une ancre sur chacun des deux, et vous tenez les deux bouts de l&rsquo;obscurité.</p>
            <p>Très au nord ou très au sud, cette fenêtre se ferme pendant une partie de l&rsquo;année : à Londres, le soleil n&rsquo;atteint pas −18° <strong>du 23 mai au 21 juillet</strong>. Risetime le dit au moment où vous créez l&rsquo;ancre, avec les dates de votre propre lieu, et ces nuits-là l&rsquo;alarme reste silencieuse plutôt que de sonner à une heure que le ciel ne produit jamais.</p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/fr/sky-night-editor"
                darkBase="/assets/screenshots/fr/sky-night-editor--dark"
                alt="L'éditeur d'ancre sur Un angle solaire, réglé à −18,0° le soir, nommé Ciel nocturne, avec l'aperçu : Prochain : 20:30. Le soleil n'atteint pas cet angle ici du 23 mai 2027 au 21 juillet 2027."
                width={360}
                height={706}
              />
              <figcaption>Un angle de −18° le soir, et les semaines où il n&rsquo;arrive jamais.</figcaption>
            </figure>
            <p><strong>Ce que Risetime ne fait pas : la Lune.</strong> Pas de lever de lune, pas de phase, pas de calendrier lunaire — l&rsquo;application ne vous dira pas quand une pleine Lune efface la Voie lactée. Elle fait le soleil, et elle le fait hors ligne.</p>
          </section>

          <section aria-labelledby="s-price">
            <h2 id="s-price" className="sr-only">Ce que ça coûte</h2>
            <p>Risetime est gratuite jusqu&rsquo;à trois alarmes et trois minuteurs — pour toujours. Il vous en faut plus ? Servez-vous d&rsquo;abord de ces trois-là, et voyez si ça vaut votre soutien : les soutiens ont les alarmes et les minuteurs sans limite, à l&rsquo;année ou une fois pour toutes. Sinon, je serai heureux de <a href="mailto:contact@risetime.app">vous lire</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Ne manquez plus jamais la lumière.</h2>
            <a className="play-badge" href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Télécharger Risetime sur Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Disponible</span>
            </a>
          </div>

        </main>

        <SiteFooter page="/golden-hour-alarm/" lang="fr" />
    </div>
  )
}
