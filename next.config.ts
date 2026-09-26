import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 9-31 : sortie statique. PAS de rendu par requête — le site n'a aucune donnée
  // par visiteur. Cloudflare Pages sert les fichiers ; les redirections et en-têtes
  // vivent dans _redirects / _headers (9-30).
  output: 'export',

  // ⚠️ SANS CECI TOUTES LES URL INDEXÉES BOUGENT. /alarms/ doit rester /alarms/.
  trailingSlash: true,

  // Les captures sont déjà produites aux bonnes dimensions, en clair et sombre,
  // en png + webp. next/image ne sait pas faire d'art direction sur le thème.
  images: { unoptimized: true },

  // Le monorepo a son propre package-lock.json : sans ceci, Next croit que la
  // racine de l'espace de travail est /home/lazuli/Projects/@deltawaken.
  outputFileTracingRoot: __dirname,

  // 9-31 §3 — le 404 de l'export. Sans ce drapeau, `app/global-not-found.tsx` est
  // ignoré et Next exporte son stub par défaut, SANS bruit. Le drapeau existe dans la
  // version installée (15.5.26) : node_modules/next/dist/server/config-schema.js:494.
  // Le contrôle `tools-check-langs.py` (§404) vérifie le RÉSULTAT et pas le drapeau.
  experimental: { globalNotFound: true },

  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
