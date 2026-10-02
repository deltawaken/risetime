import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import SiteFooter from '../../../../components/SiteFooter'

// LA PAGE FRANÇAISE, ÉCRITE À LA MAIN — décision du porteur du 2026-09-27 :
// « on ne fait plus de markdown […] tu vas juste bien gentiment tout traduire
// toi-même ». Une page traduite porte donc TOUT ce que porte l'anglaise, son
// mobilier compris, du même côté qu'elle : le JSX.
//
// ⚠️ SES CHAÎNES D'EN-TÊTE VIVENT DANS content/fr/privacy.md, en UN exemplaire,
// exactement comme l'anglaise les prend dans content/en/. `langMetadata` y lit
// titre, description et og, y ajoute le canonical FRANÇAIS et les hreflang, et
// pose `noindex` en build de preview.
//
// ⛔ `fr` est dans `STATIC_LOCALES` (lib/pages.ts) : la route dynamique
// `app/[lang]/` ne produit donc PAS ces URL, sans quoi Next en fabriquerait deux
// exemplaires.
export const metadata: Metadata = langMetadata('fr', '/privacy/')

export default function ConfidentialitePage() {
  return (
    <div className="layout-narrow">
      <a href="#main-content" className="skip-link">Aller au contenu principal</a>

        <SiteHeader current="/privacy/" lang="fr" />

        <div className="page-header">
          <h1>Politique de confidentialité</h1>
          <p className="meta">Date d&rsquo;entrée en vigueur : 2026-09-13 &middot; Éditeur : A. Deltawaken</p>
        </div>

        <main id="main-content" className="content-main">

          <div className="highlight-box">
            <p>Risetime ne collecte, ne transmet et ne partage aucune donnée personnelle. Vos informations ne quittent jamais votre appareil.</p>
          </div>

          <section aria-labelledby="section-not-do">
            <h2 id="section-not-do">Ce que Risetime ne fait pas</h2>
            <ul>
              <li>Ne collecte aucune donnée personnelle</li>
              <li>Ne se connecte pas à Internet</li>
              <li>Ne transmet votre position à aucun serveur</li>
              <li>N&rsquo;utilise ni statistiques d&rsquo;usage, ni rapports de plantage, ni télémétrie</li>
              <li>Ne contient aucune publicité</li>
              <li>Ne vous suit ni d&rsquo;une application à l&rsquo;autre, ni d&rsquo;un site à l&rsquo;autre</li>
              <li>Ne partage aucune donnée avec des tiers</li>
            </ul>
          </section>

          <section aria-labelledby="section-local-data">
            <h2 id="section-local-data">Les données conservées sur votre appareil</h2>
            <p>Risetime conserve les données suivantes <strong>exclusivement sur votre appareil</strong>, sans jamais les transmettre :</p>
            <ul>
              <li><strong>La configuration de vos alarmes</strong> — heures, libellés, récurrence et type d&rsquo;ancre (lever du soleil, coucher, etc.). Conservée dans une base de données Room locale.</li>
              <li><strong>Le lieu</strong> — la ville ou les coordonnées GPS que vous choisissez pour les calculs célestes (heures de lever et de coucher du soleil). Utilisé pour le seul calcul local. Jamais transmis.</li>
              <li><strong>Les préférences de l&rsquo;application</strong> — réglages, dont l&rsquo;état de votre abonnement. Conservés dans un DataStore local.</li>
            </ul>
            <p>Toutes ces données disparaissent lorsque vous désinstallez l&rsquo;application.</p>
          </section>

          <section aria-labelledby="section-location">
            <h2 id="section-location">L&rsquo;autorisation de localisation</h2>
            <p>Risetime demande l&rsquo;autorisation de <strong>localisation approximative</strong> (<code>ACCESS_COARSE_LOCATION</code>) dans le seul but de calculer les heures locales de lever et de coucher du soleil. Votre position est traitée sur l&rsquo;appareil par un moteur d&rsquo;éphémérides, et n&rsquo;est jamais envoyée à un service ou à un serveur extérieur.</p>
            <p>Vous pouvez aussi saisir votre ville à la main dans les Paramètres : le GPS n&rsquo;est alors pas utilisé.</p>
          </section>

          <section aria-labelledby="section-internet">
            <h2 id="section-internet">L&rsquo;autorisation Internet</h2>
            <p>Risetime <strong>ne déclare pas</strong> l&rsquo;autorisation <code>INTERNET</code> et n&rsquo;effectue aucune requête réseau. L&rsquo;application fonctionne entièrement hors ligne.</p>
            <p>L&rsquo;abonnement facultatif passe par Google Play Billing, qui communique avec les services Google Play par un échange entre processus sur votre appareil — et non par un appel réseau émis par Risetime. Cet échange relève de la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">politique de confidentialité de Google</a>.</p>
          </section>

          <section aria-labelledby="section-subscriptions">
            <h2 id="section-subscriptions">Les abonnements</h2>
            <p>Risetime propose un abonnement facultatif, « Risetime Supporter ». Les achats sont traités entièrement par Google Play. Risetime ne reçoit, ne conserve et ne traite aucune information de paiement. L&rsquo;état de l&rsquo;abonnement est conservé sur votre seul appareil.</p>
          </section>

          <section aria-labelledby="section-children">
            <h2 id="section-children">La confidentialité des enfants</h2>
            <p>Risetime ne collecte sciemment aucune information de personne, y compris des enfants de moins de treize ans. Aucune donnée n&rsquo;étant collectée, Risetime respecte le COPPA et les réglementations comparables par construction.</p>
          </section>

          <section aria-labelledby="section-changes">
            <h2 id="section-changes">Les évolutions de cette politique</h2>
            <p>Si cette politique de confidentialité change, la version à jour sera publiée à cette adresse, avec une nouvelle date d&rsquo;entrée en vigueur. Aucune donnée n&rsquo;étant collectée, un changement a peu de chances d&rsquo;affecter votre vie privée en pratique.</p>
          </section>

          <section aria-labelledby="section-contact">
            <h2 id="section-contact">Nous joindre</h2>
            <p>Toute question sur cette politique de confidentialité peut être adressée à l&rsquo;éditeur, à <a href="mailto:contact@risetime.app">contact@risetime.app</a>, ou via la fiche Google Play de Risetime.</p>
          </section>

        </main>

        <SiteFooter page="/privacy/" lang="fr" />
    </div>
  )
}
