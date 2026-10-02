// 9-31 §7 — le rendu du CORPS d'un `content/<lang>/<slug>.md`.
//
// ⛔ PAS DE MDX, et ce n'est pas un choix d'outillage. MDX rouvrirait la porte au
// JSX — donc à `"use client"`, donc au refus de `tools-strip-runtime.mjs` — et
// surtout il détruirait l'argument même du porteur pour le Markdown : « un fichier
// Markdown s'envoie tel quel à un traducteur, sans outil ni code à installer ».
//
// LA PROSE EST DU MARKDOWN ; LE MOBILIER EST DE LA DONNÉE D'EN-TÊTE. Ce qui n'est
// pas de la prose — image héros, figures de captures, `alt`, entrées de `FAQPage`,
// `featureList` — vit en clés structurées de l'en-tête, jamais en balisage dans le
// corps. Le traducteur reçoit de la prose plus une poignée de chaînes étiquetées.
//
// ⚠️ PÉRIMÈTRE RÉEL DE CETTE PASSE, dit franchement : ce rendu couvre les titres,
// les paragraphes, les listes et l'emphase — ce qu'un corps traduit contient. Le
// mobilier (`<picture>` à art direction, JSON-LD par page) n'est PAS rendu ici,
// parce que la prose anglaise n'a pas migré et que rien ne l'exerce encore. Le
// jour où une page anglaise migre, c'est `tools-compare-with-main.py` qui juge le
// résultat, page par page — pas ce commentaire.
//
// Volontairement sans dépendance : un rendu de 60 lignes qu'on lit en entier vaut
// mieux, ici, qu'un paquet de 300 Ko dont on ne connaît pas la surface.

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const inline = (s: string) =>
  esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')

/** Markdown → HTML. Retourne une chaîne parce que l'appelant l'injecte dans un
 *  composant SERVEUR : rien de tout ceci n'atteint le navigateur sous forme de code. */
export function renderMarkdown(body: string): string {
  const out: string[] = []
  let list: string[] | null = null
  const flush = () => {
    if (list) { out.push(`<ul>${list.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>`); list = null }
  }
  for (const block of body.trim().split(/\r?\n\s*\r?\n/)) {
    const lines = block.split(/\r?\n/).map((l) => l.trimEnd())
    if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
      list = lines.map((l) => l.replace(/^\s*[-*]\s+/, ''))
      flush()
      continue
    }
    flush()
    const h = /^(#{1,4})\s+(.*)$/.exec(lines[0])
    if (h && lines.length === 1) {
      const n = h[1].length
      out.push(`<h${n}>${inline(h[2])}</h${n}>`)
      continue
    }
    if (lines.join('').trim()) out.push(`<p>${inline(lines.join(' '))}</p>`)
  }
  flush()
  return out.join('\n')
}
