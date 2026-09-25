import { builtLocales, builtPages } from '@/lib/locales'
import TranslatedPage, { translatedMetadata } from '@/components/TranslatedPage'

// L'accueil d'une langue : `/fr/`, pas `/fr/<slug>/`. Il lui faut sa propre route,
// le segment `[slug]` ne pouvant pas être vide.
export const dynamicParams = false

// ⚠️ FILTRÉ SUR `builtPages`, et ce n'est pas une redondance avec `builtLocales`.
// Trouvé en revue : `builtLocales()` ne dit que « cette langue a AU MOINS une page
// construite » ; rendre son accueil sur cette seule foi construisait `/xx/` même quand
// c'est précisément l'accueil qui n'est pas relu. Le §9 dit « page sans `reviewed` :
// JAMAIS construite » — la granularité est la page, donc la condition doit l'être aussi.
// Le build finissait rouge, mais par les contrôles EN AVAL et non par la construction ;
// c'est le même défaut que celui déjà corrigé un cran plus haut, qui subsistait ici.
export const generateStaticParams = async () =>
  builtLocales()
    .filter((lang) => builtPages(lang).includes('/'))
    .map((lang) => ({ lang }))

export const generateMetadata = async ({ params }: { params: Promise<{ lang: string }> }) =>
  translatedMetadata((await params).lang, '/')

export default async function LangHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return <TranslatedPage lang={lang} page="/" />
}
