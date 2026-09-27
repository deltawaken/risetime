import DisclosureNav from './DisclosureNav'
import LanguageSelector from './LanguageSelector'
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
        {/* LE SÉLECTEUR DE LANGUE — ici, EN PREMIER, et dans le DOM autant qu'à
            l'écran. Déménagé du pied le 2026-09-27 (porteur : « mettons le menu
            dans le menu du haut »), puis placé avant les pages le même jour.

            ⛔ LE PORTEUR PROPOSAIT `order` EN FLEX pour l'afficher en premier tout
               en le laissant en dernier dans le DOM, « pour l'a11y ». C'est
               l'inverse qui se produit, et MDN le dit de la propriété elle-même :
               « order is only meant to affect the visual order […] not their
               logical or tab order — it must not be used on non-visual media such
               as speech », et « using the order property will create a DISCONNECT
               between the visual presentation of content and DOM order ».
               Un utilisateur au clavier verrait le focus sauter par-dessus le
               sélecteur puis y revenir en dernier, sans rien pour l'expliquer.
            → Le choix est binaire : premier pour TOUT LE MONDE, ou dernier pour
               tout le monde. Il est premier. Son prix, assumé : il prend le premier
               arrêt de tabulation après le logotype.

            Les trois raisons de 9-31 §1 qui le plaçaient en PIED, une par une :
            · DÉCOUVERTE — argument déjà affaibli par la suppression du bandeau le
              2026-09-25 ; le haut de page la sert mieux. La raison du déménagement.
            · CLAVIER — « 30 entrées avant le contenu ». ⛔ Faux dans l'état actuel,
              et le commentaire d'origine le disait : replié, un <details> ne coûte
              QU'UN arrêt de tabulation, son contenu n'étant pas focusable.
              `SELECTOR_INLINE_MAX = 0` le garde replié quel que soit le nombre de
              langues. ⚠️ Cet argument redeviendrait vrai si quelqu'un remontait
              cette constante — et il serait alors décisif, le sélecteur étant
              désormais EN TÊTE de la navigation.
            · POUSSÉE — un <details> ouvert pousse le contenu. Vrai, et déjà le cas
              du menu « Uses » à côté, accepté. */}
        <LanguageSelector lang={lang} page={current} />
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
