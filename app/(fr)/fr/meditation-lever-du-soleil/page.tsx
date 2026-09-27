import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import SiteFooter from '../../../../components/SiteFooter'

// LA PAGE FRANÇAISE, ÉCRITE À LA MAIN — décision du porteur du 2026-09-27 :
// « on ne fait plus de markdown […] tu vas juste bien gentiment tout traduire
// toi-même ». Une page traduite porte donc TOUT ce que porte l'anglaise, son
// mobilier compris, du même côté qu'elle : le JSX.
//
// ⚠️ SES CHAÎNES D'EN-TÊTE VIVENT DANS content/fr/sunrise-meditation-alarm.md, en
// UN exemplaire, exactement comme l'anglaise les prend dans content/en/.
// `langMetadata` y lit titre, description et og, y ajoute le canonical FRANÇAIS et
// les hreflang, et pose `noindex` en build de preview.
//
// ⛔ LA CLÉ RESTE LE CHEMIN ANGLAIS `/sunrise-meditation-alarm/` : c'est l'identité
// de la page, commune à toutes les langues. Le slug français est dans l'en-tête.
//
// ⛔ Page séculière : aucune tradition n'est nommée (décision du porteur du
// 2026-09-24 au soir). Les libellés de l'application restent astronomiques.
export const metadata: Metadata = langMetadata('fr', '/sunrise-meditation-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "inLanguage": "fr",
  "headline": "Une pratique du matin qui commence avec la lumière",
  "description": "Comment régler une alarme Android pour la méditation ou le yoga sur le lever du soleil, sur l'aube civile ou nautique par l'angle solaire, ou sur une fraction de la nuit, avec l'application d'alarmes Risetime. Calculé sur l'appareil, hors ligne.",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/fr/meditation-lever-du-soleil/"
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
      "name": "Réveil pour la méditation et le yoga",
      "item": "https://risetime.app/fr/meditation-lever-du-soleil/"
    }
  ]
}
]

export default function MeditationLeverDuSoleilPage() {
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

        <SiteHeader current="/sunrise-meditation-alarm/" lang="fr" />

        <div className="page-header">
          <h1>Une pratique qui commence avec la lumière, pas avec un chiffre</h1>
          <p className="subtitle">Réglez le décalage une fois ; c&rsquo;est la lumière qui bouge.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="s-why">
            <h2 id="s-why" className="sr-only">Pourquoi la première lumière n&rsquo;est pas une heure d&rsquo;horloge</h2>
            <p>Une pratique qui commence avec la lumière ne commence pas à un chiffre. La première lumière se déplace au fil de l&rsquo;année, et à l&rsquo;intérieur d&rsquo;un même fuseau horaire aussi : le 21 juin, le soleil se lève à <strong>06:01 à Mumbai</strong> et à <strong>05:08 à Varanasi</strong> : cinquante-trois minutes d&rsquo;écart, à la même horloge.</p>
            <p>Risetime règle une alarme sur un moment du soleil au lieu d&rsquo;une heure d&rsquo;horloge. Ce moment est une <strong>ancre</strong>, la distance que vous gardez avec lui un <strong>décalage</strong>.</p>
          </section>

          <section aria-labelledby="s-names">
            <h2 id="s-names">Quatre façons de nommer la première lumière</h2>
            <table className="timing-table" aria-label="Quatre façons de nommer la première lumière, et ce que vous créez dans Risetime">
              <thead><tr><th>Ce que vous visez</th><th>Où est le soleil</th><th>Dans Risetime</th></tr></thead>
              <tbody>
                <tr><td>Le lever du soleil</td><td>le disque dégage l&rsquo;horizon</td><td>l&rsquo;ancre intégrée <strong>Lever du soleil</strong></td></tr>
                <tr><td>L&rsquo;aube civile</td><td><strong>6° sous</strong> l&rsquo;horizon</td><td>une ancre par angle solaire, <strong>−6° le matin</strong></td></tr>
                <tr><td>L&rsquo;aube nautique</td><td><strong>12° sous</strong></td><td><strong>−12° le matin</strong></td></tr>
                <tr><td>Un point à l&rsquo;intérieur de la nuit</td><td>une part du chemin du coucher au lever</td><td>une ancre <strong>Division</strong> : Nuit, en <em>N</em> parties</td></tr>
              </tbody>
            </table>
            <p>Les définitions varient ; voici les plus courantes. L&rsquo;application tient celle que vous réglez à toutes les latitudes et à toutes les saisons — ce qu&rsquo;un « quarante-cinq minutes avant le lever » fixe ne peut pas faire, la durée de l&rsquo;aube changeant avec l&rsquo;une et avec l&rsquo;autre.</p>
                        <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/practice-list--dark.webp 1x, /assets/screenshots/practice-list--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/practice-list.webp 1x, /assets/screenshots/practice-list@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/practice-list--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/practice-list.png" alt="Liste d'alarmes de Risetime avec quatre alarmes, toutes répétées chaque jour : 05:29 sur Dernière partie de la nuit, 05:50 sur Aube nautique, 06:29 sur Aube civile, et 07:02 au Lever du soleil." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>Les quatre lignes du tableau, chacune en alarme.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-sunrise">
            <h2 id="s-sunrise">Régler la pratique sur le lever du soleil</h2>
            <ol>
              <li>Dans l&rsquo;onglet <strong>Alarmes</strong>, appuyez sur <strong>+</strong>.</li>
              <li>Dans le menu du haut, choisissez <strong>Lever du soleil</strong>.</li>
              <li>Laissez le cadran au centre pour sonner au lever, ou tournez-le jusqu&rsquo;à l&rsquo;écart que vous voulez, jusqu&rsquo;à <strong>11 h 59 min</strong> d&rsquo;un côté comme de l&rsquo;autre.</li>
              <li>Appuyez sur <strong>OK</strong>, puis ouvrez l&rsquo;alarme dans la liste et réglez la <strong>Répétition</strong>.</li>
            </ol>
            <p>Et l&rsquo;alarme que les lève-tôt réclament, c&rsquo;est l&rsquo;autre : <strong>une alarme pour aller se coucher</strong>, pas une pour se réveiller. Mettez-la sur l&rsquo;ancre <strong>Coucher</strong> avec un décalage, en répétition — les quatre mêmes étapes. <a href="/fr/alarmes/" className="content-link">Régler une alarme au lever ou au coucher du soleil</a></p>
          </section>

          <section aria-labelledby="s-angle">
            <h2 id="s-angle">Avant le soleil : l&rsquo;aube par son angle</h2>
            <ol>
              <li>Ouvrez <strong>Paramètres → Ancres</strong> et appuyez sur <strong>+</strong> (il apparaît dès que la section est dépliée).</li>
              <li>Laissez le type sur <strong>Un angle solaire</strong>. Saisissez <strong>−6°</strong> pour l&rsquo;aube civile ou <strong>−12°</strong> pour l&rsquo;aube nautique, direction <strong>matin</strong>. Ça se déplace d&rsquo;un dixième de degré à la fois, entre −30° et +30°.</li>
              <li>Nommez-la, <strong>choisissez une couleur</strong> — sans couleur, elle ne s&rsquo;enregistrera pas — et enregistrez.</li>
              <li>Dans l&rsquo;onglet <strong>Alarmes</strong>, posez une alarme dessus.</li>
            </ol>
            <p>Loin vers le nord ou vers le sud, le soleil ne descend jamais aussi bas pendant une partie de l&rsquo;année. L&rsquo;éditeur le dit au moment où vous créez l&rsquo;ancre — <em>« Le soleil n&rsquo;atteint pas cet angle ici, du X au Y »</em>, avec vos dates à vous — et ces jours-là l&rsquo;alarme reste silencieuse plutôt que de sonner à un moment que le ciel n&rsquo;a jamais produit. Rien n&rsquo;est inventé.</p>
                        <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/practice-angle-editor--dark.webp 1x, /assets/screenshots/practice-angle-editor--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/practice-angle-editor.webp 1x, /assets/screenshots/practice-angle-editor@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/practice-angle-editor--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/practice-angle-editor.png" alt="L'éditeur d'ancre sur Un angle solaire, réglé sur −6,0° le matin, nommé Aube civile, avec l'aperçu : Prochain : 06:29." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>L&rsquo;aube civile comme un angle : six degrés sous l&rsquo;horizon, le matin.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-night">
            <h2 id="s-night">Une fraction de la nuit</h2>
            <p>Vous pouvez caler le matin sur la nuit plutôt que sur l&rsquo;aube : un point situé à une part donnée de l&rsquo;obscurité.</p>
            <ol>
              <li><strong>Paramètres → Ancres → +</strong>, et basculez la forme sur <strong>Une fraction du jour ou de la nuit</strong>.</li>
              <li>Portée <strong>Nuit</strong>, puis le <strong>Nombre de parts</strong> et la <strong>position</strong> — de 2 à 48 parties, n&rsquo;importe quelle limite à l&rsquo;intérieur.</li>
              <li>Nommez-la, choisissez une couleur, enregistrez. Un brouillon neuf s&rsquo;intitule <strong>Nuit · 1/15</strong> ; il suit ce que vous réglez.</li>
              <li>Posez une alarme dessus.</li>
            </ol>
            <p>La nuit, ici, est exactement une chose : <strong>d&rsquo;un coucher du soleil au lever suivant</strong>, découpée en parts égales. À l&rsquo;intérieur des cercles polaires, une telle nuit peut ne pas exister ; l&rsquo;ancre n&rsquo;a alors rien à diviser, et l&rsquo;application le dit — sans la plage de dates que donne la forme par angle, que cette forme-ci n&rsquo;a pas. Vous calez sur un horaire publié ? <strong>Avancé → Décaler de N minutes</strong> déplace une ancre que vous avez faite, jusqu&rsquo;à trente minutes d&rsquo;un côté comme de l&rsquo;autre.</p>
                        <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/practice-division-editor--dark.webp 1x, /assets/screenshots/practice-division-editor--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/practice-division-editor.webp 1x, /assets/screenshots/practice-division-editor@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/practice-division-editor--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/practice-division-editor.png" alt="L'éditeur d'ancre sur Une fraction du jour ou de la nuit, avec Nuit sélectionné, Nombre de parts réglé sur 8 et Position sur 7/8, nommé Dernière partie de la nuit, avec l'aperçu : Prochain : 05:29." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>La nuit découpée en huit parties, l&rsquo;alarme sur la dernière.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-not">
            <h2 id="s-not">Ce que Risetime ne fait pas</h2>
            <p>Ses propres libellés restent astronomiques — <em>Lever du soleil</em>, <em>un angle solaire</em>, <em>Nuit · 1/15</em> — tandis que le nom que vous saisissez est le vôtre. C&rsquo;est un réveil, rien de plus :</p>
            <ul>
              <li><strong>Aucun signal au milieu d&rsquo;une séance</strong> — aucun écran ne fabrique un minuteur à partir de plusieurs, donc une assise de trente minutes ne peut pas sonner à dix et à vingt.</li>
              <li><strong>Aucun son de méditation, rien de guidé.</strong> Elle sonne ; vous l&rsquo;arrêtez.</li>
              <li><strong>Rien de lunaire</strong> — Risetime ne calcule pas la Lune : ni phase, ni date lunaire.</li>
              <li><strong>Aucun suivi du sommeil, aucun compte, pas de cloud, aucune permission Internet</strong> — votre position ne quitte jamais le téléphone. <a href="/fr/confidentialite/" className="content-link">Politique de confidentialité</a></li>
            </ul>
            <p><a href="/fr/alarmes/#section-custom" className="content-link">Comment fonctionnent les ancres et les décalages</a></p>
          </section>

          <section aria-labelledby="s-price">
            <h2 id="s-price" className="sr-only">Ce que ça coûte</h2>
            <p>Risetime est gratuite jusqu&rsquo;à trois alarmes et trois minuteurs — pour toujours. Il vous en faut plus ? Servez-vous d&rsquo;abord de ces trois-là, et voyez si ça vaut votre soutien : les soutiens ont les alarmes et les minuteurs sans limite, à l&rsquo;année ou une fois pour toutes. Sinon, je serai heureux de <a href="mailto:contact@risetime.app">vous lire</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Commencez avec la lumière.</h2>
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

        <SiteFooter page="/sunrise-meditation-alarm/" lang="fr" />
    </div>
  )
}
