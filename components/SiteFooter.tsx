import { Fragment } from 'react'
import { navGroup } from '../lib/pages'

// 9-31 (2026-09-25) — le pied de page, factorisé. Deux empreintes distinctes sur
// 7 pages : le commun, et /alarms/ dont l'entrée « Alarms » pointait href="/" —
// le MÊME bug que dans son en-tête, sur le même lien. Il est réparé ici : chaque
// entrée pointe sa propre URL, dérivée du registre.
//
// ⚠️ PAS d'`aria-current` dans le pied — contrairement à l'en-tête, et c'est
// délibéré. La consigne du porteur du 2026-09-25 est « les 7 pieds IDENTIQUES ».
// Un pied identique partout est aussi ce que main rendait déjà sur six pages sur
// sept : la seule différence produite ici est la réparation du href de /alarms/.
// 🔸 À ARBITRER : 9-31 § ⟶ 2026-09-25 §1 écrit l'inverse (« le pied factorisé
// calcule aria-current par href == chemin courant »). Les deux textes se
// contredisent ; le plus récent est suivi, l'écart est signalé, non masqué.
//
// ⛔ Pas de « Uses » ici : le menu d'usages vit dans l'en-tête, et le dupliquer en
// pied ferait deux navigations à tenir en phase.

export default function SiteFooter() {
  return (
    <footer className="site-footer" role="contentinfo">
      <p>Risetime &middot; A. Deltawaken</p>
      <nav aria-label="Footer navigation">
        <a href="/">Home</a>
        {[...navGroup('main'), ...navGroup('legal')].map((e) => (
          /* Fragment et non <span> : il ne faut AUCUNE balise en plus — le HTML
             produit doit être celui de main, séparateurs compris. */
          <Fragment key={e.href}>
            &middot;
            <a href={e.href}>{e.label}</a>
          </Fragment>
        ))}
        &middot;
        <a
          href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime"
          target="_blank"
          rel="noopener"
        >
          Google Play
        </a>
      </nav>

      {/* ⟶ POINT D'INSERTION DU SÉLECTEUR DE LANGUE (9-31 § ⟶ 2026-09-25 §1).
          Il vient ICI : après la nav du pied, dernier élément de la page.
          Les trois raisons y sont écrites — le clavier (30 entrées avant le
          contenu si on le met en en-tête ; fermé, un <details> ne coûte qu'un
          arrêt de tabulation), la poussée (un <details> ouvert est dans le flux,
          et en pied il n'y a rien après), et la découverte (elle passe par le
          bandeau, pas par le pied).

          Il s'écrira :
              <DisclosureNav
                label={endonymeDeLaPageCourante}
                hint="— choose a language"
                entries={…}            // (['en'] ∪ LOCALES) \ { langue courante },
                                       // triées par Intl.Collator AU BUILD, chaque
                                       // entrée portant hrefLang / lang / dir
                current=""             // aucune entrée n'est la page courante :
                                       // la langue courante est exclue de la liste
                inlineMax={SELECTOR_INLINE_MAX}   // 3 : à plat jusqu'à 3 langues
                ariaLabel="Language"   // ici le <nav> est utile : on n'est dans
                                       // aucun autre repère
              />
          `DisclosureNav` retourne déjà `null` sur une liste vide : avec
          `LOCALES = []` il ne rend RIEN, sans cas particulier à retirer.

          ⚠️ RÉSERVE À PORTER AU PORTEUR : la règle L7 que 9-31 §5 prévoit pour
          `tools-check-langs.py` — « LOCALES vide ⇒ zéro <details> […] dans tout
          l'export » — est désormais FAUSSE telle qu'écrite : le menu « Uses » est
          un <details>, et il est sur les sept pages. L7 doit viser le CONTENEUR DU
          SÉLECTEUR (son <nav aria-label="Language">), pas la balise <details>. */}
    </footer>
  )
}
