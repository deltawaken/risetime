import DisclosureNav from './DisclosureNav'
import { selectorEntries, endonym, SELECTOR_INLINE_MAX } from '../lib/locales'

// 9-31 §1 — le sélecteur de langue. ⛔ IL N'Y A PAS DE SECONDE IMPLÉMENTATION : la
// <ul>, ses <li><a> et l'enveloppe <details> sont celles de `DisclosureNav`, déjà
// écrites pour le menu « Uses ». Ce fichier ne fait que lui donner ses entrées.
//
// LES DEUX ÉTATS, tous deux DÉDUITS de LOCALES, aucun écrit à la main :
//   0 entrée   → rien du tout : `DisclosureNav` retourne `null` sur liste vide.
//                C'est l'état d'aujourd'hui, et c'est la bonne réponse — un
//                <details> qui s'ouvre sur une entrée déjà active coûte un geste
//                pour n'apprendre rien, et un contrôle affiché qui ne fait rien est
//                un mensonge. L'absence de sélecteur est une information juste :
//                ce site n'a qu'une langue.
//   1 et plus  → la <ul>, enveloppée dans <details>, déclenchée par « globe +
//                endonyme de la langue COURANTE ». (`SELECTOR_INLINE_MAX = 0` ;
//                l'état « 1 à 3 à plat » du §1 n'existe plus — la raison est écrite
//                sur la constante, dans lib/locales.ts.)
//
// ⛔⛔ PAS DE DRAPEAU. JAMAIS. Le porteur en a proposé un le 2026-09-25 et a tranché
// pour le globe après argumentation ; la raison est écrite ici pour que personne ne
// le repropose : **un drapeau désigne un PAYS, pas une LANGUE.** Quel drapeau pour
// l'anglais — Royaume-Uni ou États-Unis ? Pour le français — France, Belgique,
// Québec, Sénégal ? L'arabe en aurait vingt-deux, et un Indonésien ne se reconnaît
// pas dans le drapeau malaisien. À trente entrées, trente rectangles colorés sont
// illisibles là où trente noms se lisent et se trient.
//
// LE GLOBE : un SVG INLINE, et c'est un choix mesuré, pas une habitude.
//   · ⛔ Pas de fichier image (une requête de plus, et un `img-src` à ouvrir), ⛔ pas
//     de police d'icônes (un téléchargement de police pour un glyphe).
//   · ⛔ Pas de CARACTÈRE non plus : les pictogrammes de globe d'Unicode (🌐 U+1F310,
//     🌍 U+1F30D…) ont une présentation EMOJI par défaut — ils tombent en pictogramme
//     coloré, de taille et de ligne de base incontrôlables, et n'héritent pas de
//     `currentColor`. Un SVG rend identiquement partout parce qu'il ne dépend
//     d'AUCUNE police.
//   · ⛔ Aucun arc (`A`) : ses drapeaux `large-arc`/`sweep` choisissent un arc parmi
//     quatre et un drapeau inversé donne un fichier VALIDE et une forme fausse
//     ([[no-svg-rasterizer-in-this-env]]). Ici : un `<circle>`, une `<ellipse>` et
//     deux `<line>` — aucune géométrie ambiguë à se tromper.
//   · `aria-hidden` + `focusable="false"` : elle DÉCORE, c'est le texte qui informe.
//     (`focusable` vise IE/Edge hérité, où un <svg> prenait le focus au clavier.)
//   · Le dessin est SYMÉTRIQUE en miroir : rien à retourner en RTL. Son côté est
//     donné par le flux inline (`direction`), jamais par une marge physique — voir
//     `.lang-selector__globe` dans globals.css, en `margin-inline-end`.
export default function LanguageSelector({ lang, page }: { lang: string; page: string }) {
  const entries = selectorEntries(lang, page)
  return (
    <DisclosureNav
      label={
        <>
          <svg
            className="lang-selector__globe"
            viewBox="0 0 16 16"
            width="1em"
            height="1em"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="8" cy="8" r="6.4" />
            <ellipse cx="8" cy="8" rx="2.9" ry="6.4" />
            <line x1="2.4" y1="5.6" x2="13.6" y2="5.6" />
            <line x1="2.4" y1="10.4" x2="13.6" y2="10.4" />
          </svg>
          {endonym(lang)}
        </>
      }
      /* Un <summary> qui ne lit que « English » se présente comme une étiquette.
         Le complément masqué nomme le CONTRÔLE. Le globe étant `aria-hidden`, ce
         que le lecteur d'écran annonce est exactement : repère « Language », puis
         « English — choose a language », plus l'état ouvert/fermé que le navigateur
         expose nativement pour un <summary>. */
      hint=" — choose a language"
      entries={entries}
      /* Aucune entrée n'est la page courante : la langue courante est exclue de la
         liste. `current` n'a donc rien à désigner. */
      current=""
      inlineMax={SELECTOR_INLINE_MAX}
      ariaLabel="Language"
      navProps={{ 'data-rt-langs': '' }}
      className="lang-selector"
    />
  )
}
