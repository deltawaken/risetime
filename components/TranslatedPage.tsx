import { contentFor } from '../lib/content'
import { renderMarkdown } from '../lib/markdown'
import { langMetadata } from '../lib/metadata'
import SiteFooter from './SiteFooter'

// La coquille d'une page traduite. Elle rend le MÊME mobilier que les pages
// anglaises — le pied factorisé, sélecteur de langue compris — et son corps vient
// du Markdown. ⛔ Aucun `"use client"` : c'est un composant serveur, et le HTML
// produit ne s'accompagne d'aucun JavaScript.
export const translatedMetadata = langMetadata

export default function TranslatedPage({ lang, page }: { lang: string; page: string }) {
  const c = contentFor(lang, page)
  if (!c) return null
  return (
    <div className="layout-narrow">
      <a href="#main-content" className="skip-link">{c.data.skip_link ?? 'Skip to main content'}</a>
      <div className="page-header"><h1>{c.data.h1 ?? c.data.title}</h1></div>
      <main
        id="main-content"
        className="content-main"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(c.body) }}
      />
      <SiteFooter lang={lang} page={page} />
    </div>
  )
}
