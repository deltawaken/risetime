import DisclosureNav from './DisclosureNav'
import { navGroup } from '../lib/pages'

// 9-31 (2026-09-25) — l'en-tête, factorisé. Décision du porteur, qui INVERSE le
// §5 de PORTAGE.md (« En-têtes et pieds de page ne sont PAS factorisés […] À faire
// plus tard, en voyant les diffs un par un »). Les diffs ont été vus :
//
//   4 empreintes distinctes de <header> sur 7 pages exportées, dont
//   — l'accueil, seul à porter <a href="/#uses">Uses</a> ;
//   — /alarms/, dont l'entrée « Alarms » pointait href="/" : elle renvoyait à
//     L'ACCUEIL. C'était un bug, pas une variante.
//
// Ce qui change par rapport à main, et pourquoi :
//   1. `aria-current="page"` est DÉDUIT du chemin courant. C'est ce qui rend les
//      sept en-têtes identiques à cet attribut près — et ce qui répare /alarms/ :
//      chaque entrée pointe désormais sa propre URL.
//   2. « Uses » passe de lien vers /#uses à MENU des pages d'usage, sur toutes les
//      pages. Raison : /golden-hour-alarm/, /circadian-rhythm-alarm/ et
//      /sunrise-meditation-alarm/ n'étaient atteignables QUE depuis l'accueil.
//      Quelqu'un qui arrivait sur l'une d'elles par Google n'avait AUCUN chemin
//      vers les deux autres. Le menu les donne directement, et ce sont des liens
//      internes réels — pas un fragment que Google consolide sur l'accueil.
//
// ⛔ Aucune URL ne bouge : /alarms/, /timers/, /privacy/ et les trois pages d'usage
// existaient déjà, toutes au sitemap. Un href de navigation n'est ni un <loc> ni
// un canonical.

export default function SiteHeader({ current }: { current: string }) {
  const flat = (href: string, label: string, className?: string) => (
    <a
      key={href + label}
      href={href}
      className={className}
      {...(href === current ? { 'aria-current': 'page' as const } : {})}
    >
      {label}
    </a>
  )

  return (
    <header className="site-header" role="banner">
      <nav aria-label="Main navigation">
        {/* Le logotype ramène à l'accueil. Il ne porte pas `aria-current` sur
            l'accueil : dans main il ne l'a jamais porté, et l'entrée courante
            reste signalée par la nav elle-même. */}
        <a href="/" className="wordmark">Risetime</a>
        {navGroup('main').map((e) => flat(e.href, e.label))}
        <DisclosureNav
          label="Uses"
          hint=" — pages for specific uses"
          entries={navGroup('uses')}
          current={current}
          /* 0 : ce menu reste replié même à trois entrées. Le seuil de 3 de
             9-31 §1 est un jugement sur la LARGEUR DU PIED DE PAGE ; il ne vaut
             pas pour une barre d'en-tête. Voir DisclosureNav. */
          inlineMax={0}
          /* Pas d'`ariaLabel` : on est déjà dans <nav aria-label="Main
             navigation">, un repère imbriqué n'apprendrait rien. */
        />
        {navGroup('legal').map((e) => flat(e.href, e.label))}
      </nav>
    </header>
  )
}
