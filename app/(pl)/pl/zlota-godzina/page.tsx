import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// STRONA PO POLSKU, tłumaczenie strony francuskiej (porteur, 2026-09-27).
// ⚠️ ŁAŃCUCHY NAGŁÓWKOWE ŻYJĄ W content/pl/golden-hour-alarm.md.
// ⛔ KLUCZ pozostaje angielski (`/golden-hour-alarm/`) — to rejestr `PAGES`
// (lib/pages.ts), który go nazywa; polski adres URL jest WYPROWADZONY ze
// `slug:` nagłówka.
export const metadata: Metadata = langMetadata('pl', '/golden-hour-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Złota godzina, niebieska godzina i nocne niebo, jako alarm",
  "description": "Jak ustawić alarmy na złotą godzinę, niebieską godzinę i noc astronomiczną na Androidzie, przez kąt słoneczny zamiast godziny zegarowej, dzięki aplikacji alarmów Risetime. Obliczane na urządzeniu, offline.",
  "inLanguage": "pl",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/pl/zlota-godzina/"
},
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "inLanguage": "pl",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Risetime",
      "item": "https://risetime.app/pl/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Alarm na złotą godzinę",
      "item": "https://risetime.app/pl/zlota-godzina/"
    }
  ]
}
]

export default function ZlotaGodzinaPage() {
  return (
    <div className="layout-narrow">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <a href="#main-content" className="skip-link">Przejdź do treści głównej</a>

        <SiteHeader current="/golden-hour-alarm/" lang="pl" />

        <div className="page-header">
          <h1>Złota godzina, niebieska godzina i nocne niebo, jako alarm</h1>
          <p className="subtitle">Kąt ustawiony raz. Alarm podąża za światłem cały rok.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="s-why">
            <h2 id="s-why" className="sr-only">Dlaczego stały alarm nie trafia w światło</h2>
            <p>Wiadomo, kiedy światło jest piękne. Problem w tym, że się przesuwa: w Nowym Jorku zachód słońca sięga od <strong>16:31 21 grudnia</strong> do <strong>20:30 21 czerwca</strong>. Stały alarm na złotą godzinę myli się po dwóch tygodniach, a po miesiącu jest bezużyteczny.</p>
            <p>Risetime ustawia alarm na <strong>kąt słoneczny</strong> zamiast na godzinę zegarową — a to właśnie kąt naprawdę definiuje te okna.</p>
          </section>

          <section aria-labelledby="s-angles">
            <h2 id="s-angles">Światło, przez kąt</h2>
            <table className="timing-table" aria-label="Złota godzina, niebieska godzina i noc astronomiczna, według kąta słonecznego">
              <thead><tr><th>Czego szukamy</th><th>Słońce jest…</th><th>W Risetime</th></tr></thead>
              <tbody>
                <tr><td>Złota godzina, wieczorem</td><td>poniżej około <strong>6° nad</strong> horyzontem</td><td>kotwica kąta słonecznego, <strong>+6° wieczorem</strong></td></tr>
                <tr><td>Niebieska godzina, wieczorem</td><td>między około <strong>4° a 6° pod</strong> horyzontem</td><td><strong>−4° wieczorem</strong>, okno trwające aż do −6°</td></tr>
                <tr><td>Złota godzina, rano</td><td>to samo, na odwrót</td><td><strong>+6° rano</strong></td></tr>
                <tr><td>Noc astronomiczna</td><td><strong>18° pod</strong> horyzontem</td><td><strong>−18° wieczorem</strong>, oraz −18° rano, by wiedzieć, kiedy się kończy</td></tr>
              </tbody>
            </table>
            <p>Definicje różnią się między fotografami; oto najczęstsze. Kąt ustawiony raz aplikacja trzyma na każdej szerokości geograficznej i w każdej porze roku — czego nie potrafi gotowa reguła „30 minut przed zachodem słońca”, bo długość zmierzchu zmienia się wraz z obiema. W Londynie 21 czerwca +6° wypada o 20:27, a zachód słońca o 21:21: niemal godzina różnicy. W Nowym Jorku tego samego wieczoru: 19:49 i 20:30 — czterdzieści minut.</p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pl/sky-menu"
                darkBase="/assets/screenshots/pl/sky-menu--dark"
                alt="Okno tworzenia alarmu z otwartym menu kotwic: Dokładny, Wschód słońca, Południe, Złota godzina, Zachód słońca, Niebieska godzina, Nocne niebo i Nadir."
                width={360}
                height={706}
              />
              <figcaption>Własne kotwice zajmują miejsce obok wschodu i zachodu słońca, w porządku dnia.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-make">
            <h2 id="s-make">Kotwica, raz na zawsze</h2>
            <ol>
              <li>Otwarcie <strong>Ustawienia → Kotwice</strong> i naciśnięcie <strong>+</strong>.</li>
              <li>Pozostawienie typu na <strong>Kąt słoneczny</strong> i ustawienie kąta — dotknięcie wartości, by ją wpisać, oraz wybór <strong>rano</strong> lub <strong>wieczorem</strong>.</li>
              <li>Nadanie nazwy — <em>Złota godzina</em>, <em>Niebieska godzina</em>, <em>Nocne niebo</em> —, wybór koloru i zapisanie.</li>
              <li>W zakładce <strong>Alarmy</strong> ustawienie na niej alarmu: na samej kotwicy, albo trzydzieści minut wcześniej, by zdążyć na miejsce.</li>
            </ol>
            <p><a href="/pl/alarmy/#section-custom" className="content-link">Jak działają kotwice i przesunięcia</a></p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pl/sky-list"
                darkBase="/assets/screenshots/pl/sky-list--dark"
                alt="Lista alarmów Risetime z pięcioma alarmami: 06:45 i 08:10 od poniedziałku do piątku na kotwicy Dokładny; 17:21 w sobotę i niedzielę, 30 min przed kotwicą Złota godzina; 18:58 w sobotę i niedzielę na kotwicy Niebieska godzina; i 20:30 w piątek i sobotę na kotwicy Nocne niebo."
                width={360}
                height={706}
              />
              <figcaption>Alarmy zegarowe na tydzień pracy, alarmy słoneczne na światło.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-week">
            <h2 id="s-week">Tydzień pracy, i światło w weekend</h2>
            <p>Większość z nas nie żyje z fotografii:</p>
            <table className="timing-table" aria-label="Tydzień alarmów zegarowych i alarmów weekendowych zakotwiczonych w świetle">
              <thead><tr><th>Moment</th><th>Alarm</th><th>Dni</th></tr></thead>
              <tbody>
                <tr><td>Pobudka</td><td>06:45</td><td>Pon–pt</td></tr>
                <tr><td>Wyjście do szkoły</td><td>08:10</td><td>Pon–pt</td></tr>
                <tr><td>Przygotowanie sprzętu</td><td>30 min przed Złotą godziną</td><td>Sob i niedz</td></tr>
                <tr><td>Niebieska godzina</td><td>Niebieska godzina</td><td>Sob i niedz</td></tr>
                <tr><td>Gwiazdy</td><td>Nocne niebo</td><td>Pt i sob</td></tr>
              </tbody>
            </table>
            <p>Alarmy zegarowe na tydzień pracy, alarmy słoneczne na światło — ta sama lista, ta sama aplikacja.</p>
          </section>

          <section aria-labelledby="s-road">
            <h2 id="s-road">W podróży, i z dala od sieci</h2>
            <ul>
              <li><strong>W podróży?</strong> Zaznaczenie pola <strong>Automatyczna aktualizacja lokalizacji</strong> w Ustawieniach sprawia, że alarmy podążają — przy przeprowadzce, nowym mieście, wybrzeżu.</li>
              <li><strong>Brak zasięgu na miejscu?</strong> Risetime oblicza pozycję słońca na telefonie, biblioteką astronomiczną. Nie ma <strong>żadnego uprawnienia do internetu</strong>, nie może więc zależeć od połączenia: tryb samolotowy, kanion, łódź — alarm zawsze wie, kiedy przychodzi światło.</li>
              <li><strong>Żadnego śledzenia, żadnego konta, żadnych reklam.</strong> Lokalizacja nigdy nie opuszcza telefonu. <a href="/pl/prywatnosc/" className="content-link">Polityka prywatności</a></li>
            </ul>
          </section>

          <section aria-labelledby="s-night">
            <h2 id="s-night">Dla nocnego nieba</h2>
            <p>Noc astronomiczna to okno między wieczornym a porannym momentem, gdy słońce jest 18° pod horyzontem. Kotwica na każdym z nich obejmuje oba końce ciemności.</p>
            <p>Daleko na północy lub południu to okno zamyka się przez część roku: w Londynie słońce nie osiąga −18° <strong>od 23 maja do 21 lipca</strong>. Risetime informuje o tym w momencie tworzenia kotwicy, z datami dla danego miejsca, a w te noce alarm milczy, zamiast dzwonić o porze, jakiej niebo nigdy nie wytwarza.</p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pl/sky-night-editor"
                darkBase="/assets/screenshots/pl/sky-night-editor--dark"
                alt="Edytor kotwicy na Kąt słoneczny, ustawiony na −18,0° wieczorem, nazwany Nocne niebo, z podglądem: Następny: 20:30. Słońce nie osiąga tutaj tego kąta od 23 maja 2027 do 21 lipca 2027."
                width={360}
                height={706}
              />
              <figcaption>Kąt −18° wieczorem, i tygodnie, w które to się nie zdarza.</figcaption>
            </figure>
            <p><strong>Czego Risetime nie robi: Księżyca.</strong> Bez wschodu Księżyca, bez fazy, bez kalendarza księżycowego — aplikacja nie powie, kiedy pełnia zaciera Drogę Mleczną. Zajmuje się słońcem, i robi to offline.</p>
          </section>

          <section aria-labelledby="s-price">
            <h2 id="s-price" className="sr-only">Ile to kosztuje</h2>
            <p>Risetime jest darmowa do trzech alarmów i trzech minutników — na zawsze. Potrzeba więcej? Wystarczy najpierw skorzystać z tych trzech i sprawdzić, czy warto wesprzeć rozwój — wspierający mają nieograniczone alarmy i minutniki, rocznie lub raz na zawsze. W przeciwnym razie każda wiadomość na <a href="mailto:contact@risetime.app">ten adres</a> znajdzie chętnego czytelnika.</p>
          </section>

          <div className="cta-section">
            <h2>Nie przegapić już światła.</h2>
            <a className="play-badge" href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Pobierz Risetime z Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Dostępne teraz</span>
            </a>
          </div>

        </main>

        <SiteFooter page="/golden-hour-alarm/" lang="pl" />
    </div>
  )
}
