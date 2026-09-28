import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// STRONA PO POLSKU, tłumaczenie strony francuskiej (porteur, 2026-09-27).
// ⚠️ ŁAŃCUCHY NAGŁÓWKOWE ŻYJĄ W content/pl/sunrise-meditation-alarm.md.
// ⛔ KLUCZ pozostaje angielską ścieżką `/sunrise-meditation-alarm/`.
// ⛔ Strona świecka: żadna tradycja nie jest nazwana (decyzja porteur,
// 2026-09-24 wieczorem). Etykiety aplikacji pozostają astronomiczne.
export const metadata: Metadata = langMetadata('pl', '/sunrise-meditation-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "inLanguage": "pl",
  "headline": "Poranna praktyka, która zaczyna się wraz ze światłem",
  "description": "Jak ustawić alarm na Androidzie do medytacji lub jogi na wschód słońca, na świt cywilny lub żeglarski przez kąt słoneczny, albo na część nocy, dzięki aplikacji alarmów Risetime. Obliczane na urządzeniu, offline.",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/pl/medytacja-o-wschodzie-slonca/"
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
      "name": "Budzik do medytacji i jogi",
      "item": "https://risetime.app/pl/medytacja-o-wschodzie-slonca/"
    }
  ]
}
]

export default function MedytacjaOWschodzieSloncaPage() {
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

        <SiteHeader current="/sunrise-meditation-alarm/" lang="pl" />

        <div className="page-header">
          <h1>Praktyka, która zaczyna się od światła, nie od liczby</h1>
          <p className="subtitle">Przesunięcie ustawione raz; to światło się porusza.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="s-why">
            <h2 id="s-why" className="sr-only">Dlaczego pierwsze światło nie jest godziną zegarową</h2>
            <p>Praktyka zaczynająca się wraz ze światłem nie zaczyna się od liczby. Pierwsze światło przesuwa się w ciągu roku, i wewnątrz tej samej strefy czasowej także: 21 czerwca słońce wschodzi o <strong>06:01 w Mumbaju</strong> i o <strong>05:08 w Waranasi</strong> — pięćdziesiąt trzy minuty różnicy, przy tym samym zegarze.</p>
            <p>Risetime ustawia alarm na moment słońca zamiast godziny zegarowej. Ten moment to <strong>kotwica</strong>, a odległość od niej zachowywana to <strong>przesunięcie</strong>.</p>
          </section>

          <section aria-labelledby="s-names">
            <h2 id="s-names">Cztery sposoby nazwania pierwszego światła</h2>
            <table className="timing-table" aria-label="Cztery sposoby nazwania pierwszego światła i to, co się tworzy w Risetime">
              <thead><tr><th>Czego się szuka</th><th>Gdzie jest słońce</th><th>W Risetime</th></tr></thead>
              <tbody>
                <tr><td>Wschód słońca</td><td>tarcza opuszcza horyzont</td><td>wbudowana kotwica <strong>Wschód słońca</strong></td></tr>
                <tr><td>Świt cywilny</td><td><strong>6° pod</strong> horyzontem</td><td>kotwica kąta słonecznego, <strong>−6° rano</strong></td></tr>
                <tr><td>Świt żeglarski</td><td><strong>12° pod</strong></td><td><strong>−12° rano</strong></td></tr>
                <tr><td>Punkt wewnątrz nocy</td><td>część drogi od zachodu do wschodu</td><td>kotwica <strong>Podziału</strong>: Noc, na <em>N</em> części</td></tr>
              </tbody>
            </table>
            <p>Definicje się różnią; oto najczęstsze. Aplikacja trzyma ustawioną wartość na każdej szerokości geograficznej i w każdej porze roku — czego nie potrafi stałe „czterdzieści pięć minut przed wschodem”, bo długość świtu zmienia się wraz z obiema.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pl/practice-list"
                darkBase="/assets/screenshots/pl/practice-list--dark"
                alt="Lista alarmów Risetime z czterema alarmami, wszystkie powtarzane codziennie: 05:29 na kotwicy Ostatnia część nocy, 05:50 na kotwicy Świt żeglarski, 06:29 na kotwicy Świt cywilny, i 07:02 na kotwicy Wschód słońca."
                width={360}
                height={706}
              />
              <figcaption>Cztery wiersze tabeli, każdy jako alarm.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-sunrise">
            <h2 id="s-sunrise">Ustawianie praktyki na wschód słońca</h2>
            <ol>
              <li>W zakładce <strong>Alarmy</strong> nacisnąć <strong>+</strong>.</li>
              <li>W górnym menu wybrać <strong>Wschód słońca</strong>.</li>
              <li>Zostawić tarczę na środku, by dzwoniło o wschodzie, albo obrócić ją o wybraną różnicę, do <strong>11 godz. 59 min</strong> w jedną lub drugą stronę.</li>
              <li>Nacisnąć <strong>OK</strong>, następnie otworzyć alarm na liście i zaznaczyć <strong>Powtarzanie</strong>.</li>
            </ol>
            <p>A alarm, jakiego naprawdę potrzebują ranni ptaszkowie, to ten drugi: <strong>alarm na pójście spać</strong>, nie na obudzenie się. Wystarczy ustawić go na kotwicy <strong>Zachód słońca</strong> z przesunięciem, w powtarzaniu — te same cztery kroki. <a href="/pl/alarmy/" className="content-link">Ustawianie alarmu o wschodzie lub zachodzie słońca</a></p>
          </section>

          <section aria-labelledby="s-angle">
            <h2 id="s-angle">Przed słońcem: świt przez jego kąt</h2>
            <ol>
              <li>Otwarcie <strong>Ustawienia → Kotwice</strong> i naciśnięcie <strong>+</strong> (pojawia się, gdy sekcja jest rozwinięta).</li>
              <li>Pozostawienie typu na <strong>Kąt słoneczny</strong>. Wpisanie <strong>−6°</strong> dla świtu cywilnego albo <strong>−12°</strong> dla świtu żeglarskiego, kierunek <strong>rano</strong>. Wartość przesuwa się o jedną dziesiątą stopnia naraz, między −30° a +30°.</li>
              <li>Nadanie nazwy, <strong>wybór koloru</strong> — bez koloru się nie zapisze — i zapisanie.</li>
              <li>W zakładce <strong>Alarmy</strong> ustawienie na niej alarmu.</li>
            </ol>
            <p>Daleko na północy lub południu słońce nigdy nie schodzi tak nisko przez część roku. Edytor mówi o tym w momencie tworzenia kotwicy — <em>„Słońce nie osiąga tutaj tego kąta od X do Y”</em>, z własnymi datami — a w te dni alarm milczy, zamiast dzwonić w momencie, jakiego niebo nigdy nie wytworzyło. Nic nie jest zmyślone.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pl/practice-angle-editor"
                darkBase="/assets/screenshots/pl/practice-angle-editor--dark"
                alt="Edytor kotwicy na Kąt słoneczny, ustawiony na −6,0° rano, nazwany Świt cywilny, z podglądem: Następny: 06:29."
                width={360}
                height={706}
              />
              <figcaption>Świt cywilny jako kąt: sześć stopni pod horyzontem, rano.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-night">
            <h2 id="s-night">Część nocy</h2>
            <p>Poranek można oprzeć na nocy zamiast na świcie: na punkcie leżącym w danej części ciemności.</p>
            <ol>
              <li><strong>Ustawienia → Kotwice → +</strong>, i przełączenie formy na <strong>Część dnia lub nocy</strong>.</li>
              <li>Zakres <strong>Noc</strong>, następnie <strong>Liczba części</strong> i <strong>pozycja</strong> — od 2 do 48 części, dowolna granica pomiędzy.</li>
              <li>Nadanie nazwy, wybór koloru, zapisanie. Świeży szkic nosi nazwę <strong>Noc · 1/15</strong>; podąża za tym, co się ustawi.</li>
              <li>Ustawienie na niej alarmu.</li>
            </ol>
            <p>Noc to tutaj dokładnie jedno: <strong>od zachodu słońca do następnego wschodu</strong>, podzielone na równe części. Wewnątrz kręgów polarnych taka noc może nie istnieć; kotwica nie ma wtedy czego dzielić, i aplikacja to mówi — bez zakresu dat, jaki daje forma kątowa, a którego ta forma nie ma. Dopasowanie do publikowanego rozkładu? <strong>Zaawansowane → Przesuń o N minut</strong> przesuwa utworzoną kotwicę, do trzydziestu minut w jedną lub drugą stronę.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pl/practice-division-editor"
                darkBase="/assets/screenshots/pl/practice-division-editor--dark"
                alt="Edytor kotwicy na Część dnia lub nocy, z wybraną Nocą, Liczbą części ustawioną na 8 i Pozycją na 7/8, nazwany Ostatnia część nocy, z podglądem: Następny: 05:29."
                width={360}
                height={706}
              />
              <figcaption>Noc podzielona na osiem części, alarm na ostatniej.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-not">
            <h2 id="s-not">Czego Risetime nie robi</h2>
            <p>Jej własne etykiety pozostają astronomiczne — <em>Wschód słońca</em>, <em>kąt słoneczny</em>, <em>Noc · 1/15</em> — podczas gdy wpisana nazwa jest własna. To budzik, nic więcej:</p>
            <ul>
              <li><strong>Żadnego sygnału w środku sesji</strong> — żaden ekran nie składa minutnika z kilku, więc trzydziestominutowe siedzenie nie może zadzwonić na dziesiątej i dwudziestej minucie.</li>
              <li><strong>Żadnego dźwięku medytacyjnego, nic prowadzonego.</strong> Dzwoni, i trzeba go wyłączyć.</li>
              <li><strong>Nic księżycowego</strong> — Risetime nie oblicza Księżyca: ani fazy, ani daty księżycowej.</li>
              <li><strong>Żadnego śledzenia snu, żadnego konta, bez chmury, żadnego uprawnienia do internetu</strong> — lokalizacja nigdy nie opuszcza telefonu. <a href="/pl/prywatnosc/" className="content-link">Polityka prywatności</a></li>
            </ul>
            <p><a href="/pl/alarmy/#section-custom" className="content-link">Jak działają kotwice i przesunięcia</a></p>
          </section>

          <section aria-labelledby="s-price">
            <h2 id="s-price" className="sr-only">Ile to kosztuje</h2>
            <p>Risetime jest darmowa do trzech alarmów i trzech minutników — na zawsze. Potrzeba więcej? Wystarczy najpierw skorzystać z tych trzech i sprawdzić, czy warto wesprzeć rozwój — wspierający mają nieograniczone alarmy i minutniki, rocznie lub raz na zawsze. W przeciwnym razie każda wiadomość na <a href="mailto:contact@risetime.app">ten adres</a> znajdzie chętnego czytelnika.</p>
          </section>

          <div className="cta-section">
            <h2>Zacząć od światła.</h2>
            <a className="play-badge" href="https://play.google.com/apps/testing/com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Dołącz do testów otwartych Risetime w Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Testy otwarte</span>
            </a>
            <p className="cta-note">Risetime jest w fazie testów otwartych: trzeba najpierw dołączyć do testów, a dopiero potem zainstalować z Play. Bez tego kroku Play może wskazywać, że aplikacja nie jest dostępna w danym kraju.</p>
          </div>

        </main>

        <SiteFooter page="/sunrise-meditation-alarm/" lang="pl" />
    </div>
  )
}
