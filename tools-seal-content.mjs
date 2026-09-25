#!/usr/bin/env node
// 9-31 §6 — le CLIQUET D'EMPREINTES. `npm run content:seal`.
//
// LE PIÈGE QUE LA STORY NOMME SANS LE RÉSOUDRE : « un test CI qui échoue si le
// corps change sans que `updated` bouge » ne peut s'appuyer ni sur `mtime` (en CI
// c'est l'heure du checkout, donc identique pour TOUS les fichiers) ni sur
// `git log` (les clones de CI sont superficiels).
//
// D'où ce fichier versionné `content/.digests.json` : pour chaque fichier, le
// sha256 de son CORPS (en-tête exclu) et l'`updated` qui allait avec. Le contrôle
// recalcule ; si le corps a changé et que `updated` n'a pas bougé, il ÉCHOUE en
// nommant le fichier et les deux dates. Aucune dépendance à git, aucune à
// l'horloge — exactement le rôle que joue la table d'exemptions de
// tools-check-metadata.py.
//
// ⚠️ Resceller est une DÉCISION, pas une formalité : on déclare que l'`updated`
// courant décrit bien le corps courant. C'est pour ça que c'est une commande
// séparée et jamais une étape du build.

import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const CONTENT = path.join(process.cwd(), 'content')
if (!fs.existsSync(CONTENT)) {
  console.error('⛔ content/ absent — rien à sceller.')
  process.exit(1)
}

export function bodyOf(raw) {
  const m = /^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  return m ? m[1] : raw
}
export function updatedOf(raw) {
  const m = /^updated:[ \t]*(.+)$/m.exec(raw.split(/\r?\n---/)[0] ?? '')
  return m ? m[1].trim() : ''
}

const out = {}
for (const lang of fs.readdirSync(CONTENT).sort()) {
  const dir = path.join(CONTENT, lang)
  if (!fs.statSync(dir).isDirectory()) continue
  for (const f of fs.readdirSync(dir).sort()) {
    if (!f.endsWith('.md')) continue
    const raw = fs.readFileSync(path.join(dir, f), 'utf8')
    out[`${lang}/${f}`] = {
      body: createHash('sha256').update(bodyOf(raw), 'utf8').digest('hex'),
      updated: updatedOf(raw),
    }
  }
}
fs.writeFileSync(path.join(CONTENT, '.digests.json'), JSON.stringify(out, null, 2) + '\n')
console.log(`content/.digests.json : ${Object.keys(out).length} fichier(s) scellé(s).`)
