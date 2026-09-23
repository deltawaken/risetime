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

  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
