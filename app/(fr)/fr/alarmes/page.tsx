import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import SiteFooter from '../../../../components/SiteFooter'

// LA PAGE FRANÇAISE, ÉCRITE À LA MAIN — décision du porteur du 2026-09-27 :
// « on ne fait plus de markdown […] tu vas juste bien gentiment tout traduire
// toi-même ». Une page traduite porte donc TOUT ce que porte l'anglaise, son
// mobilier compris, du même côté qu'elle : le JSX.
//
// ⚠️ SES CHAÎNES D'EN-TÊTE VIVENT DANS content/fr/alarms.md, en UN exemplaire,
// exactement comme l'anglaise les prend dans content/en/. `langMetadata` y lit
// titre, description et og, y ajoute le canonical FRANÇAIS et les hreflang, et
// pose `noindex` en build de preview.
//
// ⛔ LA CLÉ DE PAGE RESTE L'ANGLAISE, `/alarms/` — c'est l'identifiant de la page
// dans le registre (lib/pages.ts), pas une URL. Le slug français `alarmes` vit
// dans l'en-tête de content/fr/alarms.md, et c'est lui qui fait l'URL.
//
// ⛔ `fr` est dans `STATIC_LOCALES` (lib/pages.ts) : la route dynamique
// `app/[lang]/` ne produit donc PAS ces URL, sans quoi Next en fabriquerait deux
// exemplaires.
//
// ⚠️ Les liens vers /timers/, /circadian-rhythm-alarm/, /golden-hour-alarm/ et
// /sunrise-meditation-alarm/ restent ANGLAIS : ces pages ne sont pas encore
// traduites, et un lien vers /fr/… serait un lien mort.
export const metadata: Metadata = langMetadata('fr', '/alarms/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Régler une alarme au lever ou au coucher du soleil sur Android",
  "description": "Comment régler une alarme Android sur le lever, le coucher, le midi solaire ou un angle solaire que vous choisissez, avec un décalage comme « 1 heure avant le coucher », grâce à Risetime. L’alarme suit le soleil chaque jour, hors ligne.",
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
  "mainEntityOfPage": "https://risetime.app/fr/alarmes/"
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
      "name": "Alarmes",
      "item": "https://risetime.app/fr/alarmes/"
    }
  ]
}
]

export default function AlarmesPage() {
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

        <SiteHeader current="/alarms/" lang="fr" />

        <div className="page-header">
          <h1>Comment régler une alarme au lever ou au coucher du soleil sur Android</h1>
          <p className="subtitle">Une alarme Risetime se règle comme n&rsquo;importe quelle autre, en quelques secondes. Ce qui change, c&rsquo;est ce sur quoi vous pouvez la régler.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-intro">
            <h2 id="section-intro" className="sr-only">Des alarmes qui suivent le soleil</h2>
            <p>Au lieu d&rsquo;une heure d&rsquo;horloge, vous pouvez régler une alarme sur un moment du soleil — le lever, le coucher, le midi solaire. L&rsquo;alarme suit ensuite ce moment chaque jour, à mesure que les saisons le déplacent.</p>

            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/alarms-list--dark.webp 1x, /assets/screenshots/alarms-list--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-list.webp 1x, /assets/screenshots/alarms-list@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-list--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/alarms-list.png" alt="Liste d'alarmes de Risetime avec cinq alarmes : 05:10 le samedi sur Aube astronomique, une ancre personnalisée ; 07:00 du lundi au vendredi sur Absolu, une heure fixe ; 07:02 demain au Lever du soleil ; 17:38 du lundi au vendredi, 1 h avant le Coucher du soleil ; et 23:02 aujourd'hui, 8 h avant le Lever du soleil, éteinte." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>Alarmes ordinaires et alarmes solaires, dans une seule liste.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-regular">
            <h2 id="section-regular">Régler une alarme ordinaire</h2>
            <ol>
              <li>Dans l&rsquo;onglet <strong>Alarmes</strong>, appuyez sur <strong>+</strong>.</li>
              <li>Réglez l&rsquo;heure sur le cadran, ou saisissez-la.</li>
              <li>Appuyez sur <strong>OK</strong>.</li>
            </ol>
            <p>Voilà une alarme ordinaire, et elle n&rsquo;a besoin de rien d&rsquo;autre.</p>
          </section>

          <section aria-labelledby="section-sun">
            <h2 id="section-sun">Régler une alarme sur le lever ou le coucher du soleil</h2>
            <p>Risetime connaît d&rsquo;emblée quatre moments du soleil : le <strong>Lever du soleil</strong>, le <strong>Coucher du soleil</strong>, <strong>Midi</strong> — le midi solaire, quand le soleil est au plus haut, ce qui n&rsquo;est presque jamais 12:00 — et le <strong>Nadir</strong>, le milieu de la nuit, quand le soleil est au plus bas.</p>
            <ol>
              <li>
                <strong>La première fois, indiquez votre lieu.</strong> Les heures solaires dépendent de l&rsquo;endroit où vous êtes. Sans lieu, la boîte de l&rsquo;alarme affiche simplement <em>Définis le lieu dans Paramètres</em>.
                <details>
                  <summary>Trois façons de l&rsquo;indiquer</summary>
                  <p>Dans <strong>Paramètres → Lieu des événements célestes</strong> : choisissez votre ville dans la liste ; ou utilisez le GPS du téléphone, une fois ; ou activez la <strong>Mise à jour automatique du lieu</strong>, et il vous suit en voyage. Votre position reste sur votre téléphone : Risetime n&rsquo;a aucune permission Internet, il n&rsquo;y a donc nulle part où l&rsquo;envoyer.</p>
                  <figure className="content-screenshot">
                    <picture>
                      <source srcSet="/assets/screenshots/alarms-location--dark.webp 1x, /assets/screenshots/alarms-location--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                      <source srcSet="/assets/screenshots/alarms-location.webp 1x, /assets/screenshots/alarms-location@2x.webp 2x" type="image/webp" />
                      <source srcSet="/assets/screenshots/alarms-location--dark.png" media="(prefers-color-scheme: dark)" />
                      <img src="/assets/screenshots/alarms-location.png" alt="Les paramètres de Risetime, section Lieu des événements célestes ouverte : Londres, Royaume-Uni sélectionné, un bouton GPS, et une case Mise à jour automatique du lieu décochée." width="360" height="706" loading="lazy" />
                    </picture>
                    <figcaption>Le réglage du lieu, avec son bouton GPS et sa case de mise à jour automatique.</figcaption>
                  </figure>
                </details>
              </li>
              <li>Dans l&rsquo;onglet <strong>Alarmes</strong>, appuyez sur <strong>+</strong>.</li>
              <li>Dans le menu du haut, choisissez <strong>Lever du soleil</strong>, <strong>Coucher du soleil</strong>, <strong>Midi</strong> ou <strong>Nadir</strong>.</li>
              <li>Sur le cadran, réglez combien de temps avant ou après l&rsquo;alarme doit sonner — ou laissez <em>Aucun décalage</em>.</li>
              <li>Appuyez sur <strong>OK</strong>.</li>
            </ol>

            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/alarms-anchor-menu--dark.webp 1x, /assets/screenshots/alarms-anchor-menu--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-anchor-menu.webp 1x, /assets/screenshots/alarms-anchor-menu@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-anchor-menu--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/alarms-anchor-menu.png" alt="La boîte de création d'alarme, son menu d'ancres ouvert : Absolu, Aube astronomique, Lever du soleil, Midi, Heure dorée, Coucher du soleil et Nadir." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>Le menu en haut de la boîte de l&rsquo;alarme : une heure d&rsquo;horloge, ou un moment du soleil.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-offset">
            <h2 id="section-offset">Le décalage : « 1 heure avant le coucher du soleil »</h2>
            <p><strong>Une ancre est un moment du soleil que Risetime recalcule chaque jour ; votre alarme se tient à distance fixe de lui.</strong> Cette distance, c&rsquo;est le décalage, jusqu&rsquo;à 11 h 59 min avant ou après. Le moment solaire bouge un peu chaque jour ; le décalage que vous avez choisi, jamais.</p>
            <ul>
              <li><strong>Lever du soleil</strong>, sans décalage — avec la première lumière.</li>
              <li><strong>30 min avant le Lever du soleil</strong> — debout avant le jour.</li>
              <li><strong>1 h avant le Coucher du soleil</strong> — une alarme de fin de journée qui vous laisse le temps de sortir tant qu&rsquo;il fait encore jour.</li>
              <li><strong>8 h avant le Lever du soleil</strong> — <a href="/fr/reveil-rythme-circadien/" className="content-link">un rappel de coucher qui suit le soleil</a>.</li>
            </ul>
            <p>Une ligne sous le cadran annonce la prochaine sonnerie, par exemple <em>Demain : 18:03</em>.</p>

            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/alarms-offset--dark.webp 1x, /assets/screenshots/alarms-offset--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-offset.webp 1x, /assets/screenshots/alarms-offset@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-offset--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/alarms-offset.png" alt="La boîte de création d'alarme réglée sur le Coucher du soleil avec un décalage d'une heure avant, le cadran des heures sur 1 et celui des minutes sur 00, et la ligne Aujourd'hui : 17:38." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>Une heure avant le coucher du soleil. La ligne sous le décalage dit quand elle sonnera.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-days">
            <h2 id="section-days">Jours de répétition, son et répétition de sonnerie</h2>
            <p>Ouvrez la carte de l&rsquo;alarme dans la liste. Cochez <strong>Répéter</strong> et choisissez vos jours : la carte se lit alors comme vous le diriez — <em>Lundi–vendredi, 1 h avant le Coucher du soleil</em>. La même carte porte le libellé, le son, la vibration, la durée de répétition et l&rsquo;image affichée pendant la sonnerie. L&rsquo;interrupteur a trois positions : celle du milieu ignore la seule prochaine sonnerie — pour un jour de congé — et laisse l&rsquo;alarme active.</p>

            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/alarms-card--dark.webp 1x, /assets/screenshots/alarms-card--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-card.webp 1x, /assets/screenshots/alarms-card@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-card--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/alarms-card.png" alt="Une carte d'alarme ouverte pour 17:38, du lundi au vendredi, 1 h avant le Coucher du soleil : un champ Libellé vide, Répéter avec du lundi au vendredi sélectionné, Son réglé sur Défaut du téléphone, et Vibration activée. La carte se poursuit sous le bord de l'image." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>Une carte d&rsquo;alarme ouverte : les jours de répétition, et tout le reste de l&rsquo;alarme.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-custom">
            <h2 id="section-custom">Ancres personnalisées : crépuscules, angles du soleil, ombres</h2>
            <p>Le soleil marque bien plus que quatre moments. Vous pouvez créer les vôtres, de trois sortes :</p>
            <ul>
              <li><strong>Un angle solaire</strong> — le moment où le soleil atteint une hauteur donnée au-dessus ou au-dessous de l&rsquo;horizon, le matin ou le soir. −6°, c&rsquo;est l&rsquo;aube ou le crépuscule civils ; −12°, nautiques ; −18°, astronomiques : la nuit pleine. +6° le soir, c&rsquo;est une lumière basse et chaude.</li>
              <li><strong>Une longueur d&rsquo;ombre</strong> — le moment où l&rsquo;ombre d&rsquo;un objet atteint un multiple donné de sa hauteur, avant ou après midi.</li>
              <li><strong>Une fraction du jour ou de la nuit</strong> — la nuit (du coucher au lever) ou le jour, découpés en parts égales ; vous choisissez combien, et quelle limite. Le dernier sixième de la nuit, par exemple, commence au même point de la nuit quelle que soit sa longueur à cette saison.</li>
            </ul>
            <p>Pour en créer une :</p>
            <ol>
              <li>Ouvrez <strong>Paramètres → Ancres</strong>, puis appuyez sur <strong>+</strong>.</li>
              <li>Choisissez la sorte, et réglez sa valeur.</li>
              <li>Donnez-lui un nom, ou gardez celui qui est proposé.</li>
              <li>Choisissez une couleur — <strong>Enregistrer</strong> en attend une.</li>
              <li>Appuyez sur <strong>Enregistrer</strong>.</li>
            </ol>
            <p>Elle figure désormais dans la boîte de l&rsquo;alarme, à côté du lever et du coucher, et prend un décalage comme n&rsquo;importe quelle autre. Un interrupteur dans la liste des ancres retire de ce menu celles dont vous ne vous servez pas.</p>

            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/alarms-anchors--dark.webp 1x, /assets/screenshots/alarms-anchors--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-anchors.webp 1x, /assets/screenshots/alarms-anchors@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-anchors--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/alarms-anchors.png" alt="Les paramètres, section Ancres : deux ancres personnalisées, Aube astronomique et Heure dorée, chacune avec un bouton de modification et un bouton de suppression, parmi les ancres d'usine Lever du soleil, Midi, Coucher du soleil et Nadir. Chaque ligne porte un interrupteur de visibilité, tous activés." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>Une ancre personnalisée prend sa place parmi les autres, dans l&rsquo;ordre de la journée.</figcaption>
            </figure>

            <p>Une ancre peut aussi être <strong>calibrée</strong> — décalée de 30 minutes au plus, pour coller à un horaire que vous suivez, comme un calendrier local.</p>
            <p>Loin de l&rsquo;équateur, certains angles ne sont jamais atteints pendant une partie de l&rsquo;année. L&rsquo;éditeur vous en donne les dates — à Londres, le soleil ne descend pas à −18° de fin mai à fin juillet — et ces jours-là, l&rsquo;alarme reste silencieuse plutôt que de sonner à une heure inventée.</p>

            <figure className="content-screenshot">
              <picture>
                <source srcSet="/assets/screenshots/alarms-anchor-editor--dark.webp 1x, /assets/screenshots/alarms-anchor-editor--dark@2x.webp 2x" media="(prefers-color-scheme: dark)" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-anchor-editor.webp 1x, /assets/screenshots/alarms-anchor-editor@2x.webp 2x" type="image/webp" />
                <source srcSet="/assets/screenshots/alarms-anchor-editor--dark.png" media="(prefers-color-scheme: dark)" />
                <img src="/assets/screenshots/alarms-anchor-editor.png" alt="L'éditeur d'ancre sur Un angle solaire, réglé à −18,0° le matin, nommé Aube astronomique, avec l'aperçu Suivant : 05:10. Le soleil n'atteint pas cet angle ici du 23 mai 2027 au 21 juillet 2027." width="360" height="706" loading="lazy" />
              </picture>
              <figcaption>−18° le matin, réglé pour Londres : l&rsquo;éditeur nomme les semaines où cela n&rsquo;arrive jamais.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-calculation">
            <h2 id="section-calculation">Comment les heures de lever et de coucher sont calculées, hors ligne</h2>
            <p>Chaque heure de lever et de coucher est calculée sur l&rsquo;appareil par une bibliothèque astronomique, <a href="https://shredzone.org/maven/commons-suncalc/" className="content-link">commons-suncalc</a>, fondée sur les <em>Astronomical Algorithms</em> de Jean Meeus. Le lever et le coucher sont mesurés pour le bord supérieur du soleil, réfraction atmosphérique comprise — ce que vos yeux voient ; les angles solaires, pour le centre du soleil, la convention des tables de crépuscule. Aucune requête sur le web, aucun serveur : cela fonctionne en mode avion, en mer, ou dans une vallée sans réseau.</p>
            <p>Risetime ne tourne pas en permanence. Elle recalcule après une sonnerie, lors d&rsquo;une courte vérification toutes les quelques heures, ou quand le téléphone redémarre, change d&rsquo;heure ou de fuseau ; le réveil système d&rsquo;Android — celui dont se sert l&rsquo;horloge livrée avec votre téléphone — fait le reste.</p>
          </section>

          <section aria-labelledby="section-reliability">
            <h2 id="section-reliability">S&rsquo;assurer qu&rsquo;elle sonne</h2>
            <p>Certains téléphones arrêtent les applications en arrière-plan pour économiser la batterie, et cela peut faire taire n&rsquo;importe quelle alarme. <strong>Paramètres → Fiabilité</strong> vérifie ce dont votre téléphone a besoin et donne un bouton <strong>Corriger</strong> à chaque élément manquant. Après un redémarrage, les alarmes sonnent même avant que vous ayez déverrouillé le téléphone une première fois.</p>
          </section>

          <section aria-labelledby="section-timers">
            <h2 id="section-timers">Des minuteurs aussi</h2>
            <p>L&rsquo;onglet <strong>Minuteurs</strong> réunit les comptes à rebours, y compris ceux qui repartent tout seuls pour des intervalles et des blocs de révision : <a href="/fr/minuteurs/" className="content-link">comment fonctionnent les minuteurs répétables</a>.</p>
            <p>Risetime est gratuite jusqu&rsquo;à trois alarmes et trois minuteurs — pour toujours. Il vous en faut plus ? Servez-vous d&rsquo;abord de ces trois-là, et voyez si ça vaut votre soutien : les soutiens ont les alarmes et les minuteurs sans limite, à l&rsquo;année ou une fois pour toutes. Sinon, je serai heureux de <a href="mailto:contact@risetime.app">vous lire</a>.</p>
          </section>

          <section aria-labelledby="section-guides">
            <h2 id="section-guides">Des guides par usage</h2>
            <ul>
              <li><a href="/fr/reveil-rythme-circadien/" className="content-link">Un rythme de lever et de coucher qui suit le lever du soleil</a></li>
              <li><a href="/fr/heure-doree/" className="content-link">Heure dorée, heure bleue et ciel nocturne, pour les photographes et les astronomes</a></li>
              {/* Add the Muslim prayer times and morning practice guides here once those pages are published. */}
            </ul>
          </section>

          <div className="cta-section">
            <h2>Réglez-la une fois. Elle suit le soleil.</h2>
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

        <SiteFooter page="/alarms/" lang="fr" />
    </div>
  )
}
