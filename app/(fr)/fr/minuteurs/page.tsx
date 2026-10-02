import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// LA PAGE MINUTEURS FRANÇAISE, ÉCRITE À LA MAIN — décision du porteur du
// 2026-09-27 : une page traduite porte TOUT ce que porte l'anglaise, ses captures
// et ses données structurées comprises, du même côté qu'elle : le JSX.
//
// ⚠️ SES CHAÎNES D'EN-TÊTE VIVENT DANS content/fr/timers.md, en UN exemplaire.
// `langMetadata` y lit titre, description et og, y ajoute le canonical FRANÇAIS
// (/fr/minuteurs/, dérivé de `slug:`) et les hreflang. ⛔ La CLÉ passée ici reste
// celle de la page ANGLAISE, `/timers/` : c'est l'identité de la page, pas son URL.
//
// ⛔ `fr` est dans `STATIC_LOCALES` (lib/pages.ts) : la route dynamique
// `app/[lang]/` ne produit donc PAS cette URL.
//
// Vocabulaire tranché, et il n'est pas négociable : la chose s'appelle un
// « minuteur en boucle », ce qu'elle fait est une « boucle » (msgid "Loop" = « boucle »; jamais « répétition » : c'est le report d'une alarme), et ses tours
// sont des « cycles ». La locution courante qui accole « minuteur » et le nom du
// pas de temps est PROSCRITE ici comme dans l'anglaise : elle désigne dans l'usage
// deux phases qui alternent, que l'application ne sait pas faire. Le nom commun
// seul, lui, reste juste — c'est bien ce qu'on règle une fois.
export const metadata: Metadata = langMetadata('fr', '/timers/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Un minuteur qui repart tout seul",
  "description": "Le minuteur en boucle de Risetime : une durée, relancée à intervalle fixe, dont les cycles restent en phase, avec un bouton Arrêter la boucle pour y mettre fin — et les minuteurs ordinaires que toute horloge sait faire.",
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
  "mainEntityOfPage": "https://risetime.app/fr/minuteurs/"
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
      "name": "Minuteurs",
      "item": "https://risetime.app/fr/minuteurs/"
    }
  ]
}
]

export default function MinuteursPage() {
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

        <SiteHeader current="/timers/" lang="fr" />

        <div className="page-header">
          <h1>Un minuteur qui repart tout seul</h1>
          <p className="subtitle">Réglez la durée une fois, et ça continue — plus tout ce que le minuteur d&rsquo;une horloge sait déjà faire.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-loop">
            <h2 id="section-loop">Il repart tout seul</h2>
            <p>C&rsquo;est la partie que l&rsquo;horloge de votre téléphone ne sait probablement pas faire. Ouvrez la ligne d&rsquo;un minuteur par le chevron et cochez <strong>boucle</strong> : il devient un <strong>minuteur en boucle</strong>. Il arrive à zéro, sonne brièvement, puis repart pour la même durée, jusqu&rsquo;à ce que vous arrêtiez la boucle. Ce que vous réglez une fois, c&rsquo;est l&rsquo;intervalle entre deux sonneries.</p>
            <p>Chaque cycle est ancré sur le moment où le précédent <em>arrivait à échéance</em>, et non sur le moment où vous l&rsquo;avez fait taire : trente minutes en boucle, sur deux cycles, font soixante minutes, pas soixante et une. Sinon, chaque sonnerie qu&rsquo;on laisse courir décalerait tout le reste de la journée.</p>

            <div className="highlight-box">
              <p>Par défaut, un cycle sonne <strong>cinq secondes</strong>, avec le son de notification de votre système plutôt qu&rsquo;un son d&rsquo;alarme. Les deux vous appartiennent. Il n&rsquo;y a pas d&rsquo;option « jamais » pour cette durée : une sonnerie sans fin bloquerait la boucle dès son premier cycle.</p>
            </div>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/fr/timer-list"
                darkBase="/assets/screenshots/fr/timer-list--dark"
                alt="Liste des minuteurs de Risetime avec trois décomptes : 3:00 et 10:00 tous deux à l'arrêt, chacun avec un bouton de lecture et un bouton de remise à zéro, puis 24:45 en cours, avec une pastille rose en forme de boucle, un bouton pause et un bouton +1:00. Les onglets Alarmes, Minuteurs et Paramètres courent en bas de l'écran."
                width={360}
                height={706}
              />
              <figcaption>Trois minuteurs, triés par durée. La pastille rose signale celui qui est en boucle.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-ending">
            <h2 id="section-ending">Arrêter la boucle</h2>
            <p>Une boucle s&rsquo;arrête par un bouton nommé <strong>Arrêter la boucle</strong> : sur l&rsquo;écran de sonnerie, et sur la notification de sonnerie aussi, à côté de <strong>Continuer</strong> et du bouton qui ajoute du temps.</p>
            <p>Décocher <strong>boucle</strong> pendant qu&rsquo;un minuteur sonne vous laisse un cycle de plus avant l&rsquo;arrêt : le réglage est lu une fois par cycle, au moment où la sonnerie commence.</p>
            <p>L&rsquo;écran de sonnerie apparaît à chaque cycle et s&rsquo;en va tout seul au bout des cinq secondes — rien à appuyer, rien à écarter entre deux cycles.</p>
          </section>

          <section aria-labelledby="section-ordinary">
            <h2 id="section-ordinary">Et les minuteurs ordinaires</h2>
            <p>Le reste, c&rsquo;est ce que le minuteur d&rsquo;une horloge sait déjà faire. Appuyez sur le plus et vous obtenez un clavier plein écran plutôt qu&rsquo;un cadran : tapez les chiffres, ils se remplissent par la droite, comme sur un four à micro-ondes. Quatre, zéro, zéro donne quatre minutes, et six chiffres vous mènent jusqu&rsquo;à <strong>quatre-vingt-dix-neuf heures</strong>.</p>
            <p>Les minuteurs prennent place dans une liste triée par la durée pour laquelle ils ont été réglés, le plus court d&rsquo;abord, et non dans l&rsquo;ordre où vous les avez créés. Ils tournent en parallèle — plusieurs décomptes indépendants à la fois, en boucle ou non.</p>
            <p>Chaque ligne porte la pause, et un bouton <strong>+1:00</strong> qui ajoute du temps à ce qui reste — une minute, sauf si vous la changez dans les Paramètres. Mettez un minuteur en pause et ce bouton devient une remise à zéro. Le chevron ouvre la ligne sur <strong>boucle</strong> et sur la suppression.</p>
          </section>

          <section aria-labelledby="section-notification">
            <h2 id="section-notification">La notification décompte toute seule</h2>
            <p>Le décompte de votre volet de notifications est dessiné par Android lui-même, et non repeint par l&rsquo;application. Il continue d&rsquo;avancer sans aucun processus de Risetime en vie.</p>
            <p>Il y a une carte pour ce qui tourne ou ce qui est en pause, et une pour ce qui sonne — exactement deux, jamais une par minuteur qui s&rsquo;empilent dans le volet.</p>
            <p>Balayer cette carte n&rsquo;arrête rien : elle revient aussitôt, reconstruite depuis l&rsquo;état réel, et un minuteur qui sonne continue de sonner. L&rsquo;arrêt passe toujours par un bouton, délibérément.</p>
          </section>

          <section aria-labelledby="section-settings">
            <h2 id="section-settings">Son propre son, son propre volume</h2>
            <p>Les minuteurs n&rsquo;empruntent pas les réglages de vos alarmes, et un minuteur en boucle n&rsquo;emprunte pas non plus ceux du minuteur à un seul coup : deux profils, choisis selon que boucle est coché ou non. Chacun porte son son, son volume, sa durée de sonnerie et sa montée en volume facultative.</p>
            <p>Les deux durées de sonnerie sont sur des échelles volontairement différentes. En boucle : <strong>5, 10, 15, 30, 60 ou 120 secondes</strong>. Pour un minuteur à un seul coup : <strong>1, 5, 10, 15, 20 ou 25 minutes, ou jamais</strong>.</p>
            <p>Aucun son n&rsquo;est livré avec l&rsquo;application : les sons sont ceux de votre système, ou un fichier à vous. Deux réglages restent communs plutôt que dédoublés — si les minuteurs vibrent, et ce que font les touches de volume pendant qu&rsquo;un minuteur sonne.</p>
          </section>

          <section aria-labelledby="section-not">
            <h2 id="section-not">Ce qu&rsquo;il ne fera pas</h2>
            <p>C&rsquo;est un décompte et une boucle, rien de plus :</p>
            <ul>
              <li><strong>Pas d&rsquo;alternance travail/repos.</strong> Une boucle n&rsquo;a qu&rsquo;une durée ; trente secondes d&rsquo;effort puis trente de récupération, ça en fait deux, et aucun écran ne compose un minuteur à partir de plusieurs.</li>
              <li><strong>Pas de rappel au milieu d&rsquo;une séance</strong> — une assise de trente minutes ne peut pas sonner à dix puis à vingt.</li>
              <li><strong>Pas de plage horaire, pas d&rsquo;heures de silence.</strong> Une boucle court jusqu&rsquo;à ce que vous l&rsquo;arrêtiez.</li>
              <li><strong>Pas de sonnerie à l&rsquo;heure pile.</strong> Le compte part du moment où vous l&rsquo;avez lancé.</li>
            </ul>
          </section>

          <section aria-labelledby="section-setup">
            <h2 id="section-setup">En régler un</h2>
            <p>Ouvrez l&rsquo;onglet Minuteurs, appuyez sur le plus, tapez la durée. Il part tout seul — rien à nommer, rien à classer. Pour qu&rsquo;il reparte en boucle, cochez <strong>boucle</strong> derrière le chevron.</p>
            <p>Le <a href="/fr/alarmes/" className="content-link">guide des alarmes</a> traite des alarmes, qui partagent les mêmes réglages de fiabilité.</p>
          </section>

          <section aria-labelledby="section-price">
            <h2 id="section-price" className="sr-only">Ce que ça coûte</h2>
            <p>Risetime est gratuite jusqu&rsquo;à trois minuteurs, le même compte que ses alarmes — pour toujours. Une fois atteint, le bouton d&rsquo;ajout est simplement absent : pas de boîte de dialogue, pas de cadenas, pas de bandeau pour nommer ce qui vous manque. Si votre soutien s&rsquo;arrête, rien n&rsquo;est supprimé : chaque minuteur que vous avez créé continue de marcher, vous ne pouvez juste plus en ajouter. Il vous en faut plus de trois ? Voyez si ça vaut votre soutien — sinon, je serai heureux de <a href="mailto:contact@risetime.app">vous lire</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Réglez la durée une fois. Il tient le rythme.</h2>
            <a className="play-badge" href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Télécharger Risetime sur Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Disponible</span>
            </a>
          </div>

        </main>

        <SiteFooter page="/timers/" lang="fr" />
    </div>
  )
}
