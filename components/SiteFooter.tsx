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

      {/* 9-31 §1 — LE SÉLECTEUR DE LANGUE, ici et pas en en-tête. Trois raisons,
          toutes écrites dans la story : le CLAVIER (30 entrées avant le contenu si
          on le met en haut ; fermé, un <details> ne coûte qu'un arrêt de
          tabulation, son contenu replié n'étant pas focusable), la POUSSÉE (un
          <details> ouvert est dans le flux — en pied il n'y a rien après), et la
          DÉCOUVERTE, qui passe par le bandeau et non par le pied : le sélecteur est
          le chemin délibéré, le bandeau le chemin subi.

          Avec `LOCALES = []` il ne rend RIEN — pas une balise, pas une mention — et
          sans qu'aucune condition ne le masque ici : `DisclosureNav` retourne
          `null` sur liste vide. Il n'y a donc aucun cas particulier à penser à
          retirer le jour où une langue arrive. */}
      <LanguageSelector lang={lang} page={page} />
    </footer>
  )
}
