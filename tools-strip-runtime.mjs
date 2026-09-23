#!/usr/bin/env node
// 9-31 — retire le runtime React de l'export statique.
//
// POURQUOI. Mesuré le 2026-09-24 sur l'accueil : 9 Ko de HTML, 3 Ko de CSS, et
// 138 Ko de JavaScript gzippé. Le script pesait ONZE FOIS le contenu, sur un site
// qui n'a aucune interactivité — pas un formulaire, pas un état, pas une donnée
// par visiteur. Next n'offre aucun réglage officiel pour ne rien servir avec
// l'App Router (`unstable_runtimeJS` n'existait que pour l'ancien routeur ; la
// demande est ouverte : vercel/next.js discussions/49544). D'où cette étape.
//
// CE N'EST PAS UN BRICOLAGE SILENCIEUX. Elle REFUSE de s'exécuter dès qu'un
// composant client apparaît dans l'arbre : à ce moment-là le JavaScript devient
// nécessaire, et c'est une décision à prendre, pas à subir. Le jour où le bandeau
// de langue arrivera, il s'écrira en script inline de quelques lignes dans le
// layout — pas en composant React.

import { readdir, readFile, writeFile, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'

const OUT = 'out'
const SOURCES = ['app', 'components', 'lib']

async function walk(dir, filter) {
  const found = []
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return found
  }
  for (const e of entries) {
    const p = join(dir, e.name)
    if (e.isDirectory()) found.push(...(await walk(p, filter)))
    else if (filter(p)) found.push(p)
  }
  return found
}

// ---- Garde-fou : aucun composant client ----------------------------------
const sourceFiles = (
  await Promise.all(
    SOURCES.map((d) => walk(d, (p) => ['.tsx', '.ts', '.jsx', '.js'].includes(extname(p)))),
  )
).flat()

const clientFiles = []
for (const f of sourceFiles) {
  const head = (await readFile(f, 'utf8')).slice(0, 400)
  if (/^\s*['"]use client['"]/m.test(head)) clientFiles.push(f)
}

if (clientFiles.length) {
  console.error('\n⛔ Des composants client existent — le runtime NE PEUT PAS être retiré :')
  for (const f of clientFiles) console.error('   ' + f)
  console.error(
    "\nCes composants ont besoin de JavaScript pour fonctionner. Retirer le runtime\n" +
      "les casserait en silence. Deux issues : réécrire le besoin en script inline\n" +
      "(voir le bandeau de langue), ou assumer le poids et retirer cette étape du build.\n",
  )
  process.exit(1)
}

// ---- Retrait ---------------------------------------------------------------
const pages = await walk(OUT, (p) => p.endsWith('.html'))
if (!pages.length) {
  console.error('⛔ Aucun HTML dans ' + OUT + '/ — le build a-t-il tourné ?')
  process.exit(1)
}

let before = 0
let after = 0
const report = []

for (const page of pages) {
  const src = await readFile(page, 'utf8')
  before += Buffer.byteLength(src)

  let out = src
    // les scripts du runtime, servis depuis /_next/
    .replace(/<script[^>]+src="\/_next\/[^"]*"[^>]*><\/script>/g, '')
    // la charge utile RSC, poussée en ligne
    .replace(/<script>\s*\(self\.__next_f\s*=\s*self\.__next_f\s*\|\|\s*\[\]\)[\s\S]*?<\/script>/g, '')
    .replace(/<script>\s*self\.__next_f\.push\([\s\S]*?\)<\/script>/g, '')
    // les préchargements qui les annoncent
    .replace(/<link[^>]+rel="preload"[^>]+as="script"[^>]*\/?>/g, '')

  // Contrôles : on ne publie pas une page qu'on vient d'abîmer.
  const kept = (out.match(/<script\b/g) || []).length
  // On compte les BALISES, pas les occurrences du texte : la charge RSC qu'on
  // retire contenait une copie sérialisée du JSON-LD, ce qui faussait le compte.
  const LD = /<script[^>]+type="application\/ld\+json"/g
  const ld = (out.match(LD) || []).length
  const ldBefore = (src.match(LD) || []).length
  const bodyLen = (out.match(/<body[^>]*>([\s\S]*)<\/body>/) || [, ''])[1].length

  if (ld !== ldBefore) {
    console.error(`⛔ ${page} : le JSON-LD a été touché (${ldBefore} → ${ld})`)
    process.exit(1)
  }
  if (bodyLen < 200) {
    console.error(`⛔ ${page} : le corps est vide après retrait (${bodyLen} caractères)`)
    process.exit(1)
  }
  if (/\/_next\/static\/[^"]*\.js/.test(out)) {
    console.error(`⛔ ${page} : il reste une référence à un script /_next/`)
    process.exit(1)
  }

  await writeFile(page, out)
  after += Buffer.byteLength(out)
  report.push([page, kept])
}

const kb = (n) => (n / 1024).toFixed(0) + ' Ko'
console.log(
  `\n✓ runtime retiré de ${pages.length} pages : ${kb(before)} → ${kb(after)} de HTML`,
)
const withScripts = report.filter(([, k]) => k > 0)
console.log(
  `  scripts restants : ${withScripts.length ? withScripts.map(([p, k]) => `${p} (${k})`).join(', ') : 'aucun'}` +
    ' — le JSON-LD est un <script> et doit rester.',
)
