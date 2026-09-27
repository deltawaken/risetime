import DisclosureNav from './DisclosureNav'
import LanguageSelector from './LanguageSelector'
import ThemeSelector from './ThemeSelector'
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

export default function SiteHeader(
  { current, lang = 'en' }: { current: string; lang?: string },
) {
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
        {/* LES DEUX CONTRÔLES, À DROITE ET AVANT LES PAGES — porteur, 2026-09-27 :
            « aligne le menu lang à droite, avant les pages ». Le logotype porte
            `margin-inline-end: auto` : tout ce qui le suit est donc déjà collé à
            droite, et l'ordre écrit ici EST l'ordre à l'écran.
            ⛔ Toujours pas d'`order` en flex : MDN l'interdit pour cet usage —
               « order is only meant to affect the visual order […] not their
               logical or tab order », et il « will create a DISCONNECT between the
               visual presentation of content and DOM order ».
            Les deux restent côte à côte parce que ce sont des CONTRÔLES, quand ce
            qui suit sont des PAGES.

            Les trois raisons de 9-31 §1 qui plaçaient le sélecteur de langue en
            PIED, relues : DÉCOUVERTE (affaiblie par la suppression du bandeau le
            25/09 — c'est la raison du déménagement) · CLAVIER (« 30 entrées avant
            le contenu » : ⛔ faux, replié un <details> ne coûte QU'UN arrêt de
            tabulation ; ⚠️ redeviendrait vrai si quelqu'un remontait
            `SELECTOR_INLINE_MAX`) · POUSSÉE (vraie, et déjà le cas du menu
            « Uses » juste à côté, accepté). */}
        <LanguageSelector lang={lang} page={current} />
        <ThemeSelector />

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
