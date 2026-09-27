import { Fragment } from 'react'
import { navGroup } from '../lib/pages'
import LanguageSelector from './LanguageSelector'

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

export default function SiteFooter({ lang = 'en', page = '' }: { lang?: string; page?: string }) {
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

      {/* ⛔ PLUS DE SÉLECTEUR DE LANGUE ICI. Déménagé dans l'en-tête le 2026-09-27
          (porteur : « mettons le menu dans le menu du haut »). Les trois raisons de
          9-31 §1 qui le plaçaient en pied sont discutées une par une dans
          components/SiteHeader.tsx, à l'endroit où il vit maintenant.
          ⚠️ `lang` et `page` restent des props de ce composant : le pied n'en a plus
          l'usage aujourd'hui, mais les retirer toucherait les huit appelants pour
          rien, et un pied traduit en aura besoin. */}
    </footer>
  )
}
