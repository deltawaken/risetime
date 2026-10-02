import { allContent } from '@/lib/content'
import { builtLocales, builtPages } from '@/lib/locales'
import TranslatedPage, { translatedMetadata } from '@/components/TranslatedPage'

// ⚠️ `dynamicParams = false` : aucune adresse `/xx/…` n'existe hors de ce que
// `content/` et `LOCALES` produisent. Une langue absente de la table ne donne
// AUCUNE page — c'est la règle L5, tenue par construction et pas par un contrôle.
export const dynamicParams = false

/** ⛔ Les couples (langue, slug) sortent de `content/`, jamais d'une liste écrite à
 *  la main. En production, `builtPages` retire les pages sans `reviewed`. */
export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  for (const lang of builtLocales()) {
    const pages = new Set(builtPages(lang))
    for (const c of allContent()) {
      if (c.lang === lang && c.slug && pages.has(c.page)) params.push({ lang, slug: c.slug })
    }
  }
  return params
}

const pageOf = (lang: string, slug: string) =>
  allContent().find((c) => c.lang === lang && c.slug === slug)?.page ?? '/'

export const generateMetadata = async (
  { params }: { params: Promise<{ lang: string; slug: string }> },
) => {
  const { lang, slug } = await params
  return translatedMetadata(lang, pageOf(lang, slug))
}

export default async function LangPage(
  { params }: { params: Promise<{ lang: string; slug: string }> },
) {
  const { lang, slug } = await params
  return <TranslatedPage lang={lang} page={pageOf(lang, slug)} />
}
