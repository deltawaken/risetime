import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// STRONA PO POLSKU, tłumaczenie strony francuskiej (porteur, 2026-09-27).
// ⚠️ ŁAŃCUCHY NAGŁÓWKOWE ŻYJĄ W content/pl/alarms.md, w JEDNYM egzemplarzu.
// ⛔ KLUCZ STRONY POZOSTAJE ANGIELSKI, `/alarms/` — identyfikator w rejestrze
// (lib/pages.ts), nie adres URL. Polski slug `alarmy` żyje w nagłówku
// content/pl/alarms.md, i to on tworzy adres URL.
// ⚠️ Linki do /timers/, /circadian-rhythm-alarm/, /golden-hour-alarm/ i
// /sunrise-meditation-alarm/ pozostają ANGIELSKIE: te strony nie są jeszcze
// przetłumaczone na polski, a link do /pl/… byłby martwym linkiem.
export const metadata: Metadata = langMetadata('pl', '/alarms/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Ustawianie alarmu o wschodzie lub zachodzie słońca na Androidzie",
  "description": "Jak ustawić alarm na Androidzie na wschód, zachód, południe słoneczne lub dowolny wybrany kąt słoneczny, z przesunięciem takim jak „1 godzina przed zachodem”, dzięki Risetime. Alarm podąża za słońcem każdego dnia, offline.",
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
  "mainEntityOfPage": "https://risetime.app/pl/alarmy/"
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
      "name": "Alarmy",
      "item": "https://risetime.app/pl/alarmy/"
    }
  ]
}
]

export default function AlarmyPage() {
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

        <SiteHeader current="/alarms/" lang="pl" />

        <div className="page-header">
          <h1>Jak ustawić alarm o wschodzie lub zachodzie słońca na Androidzie</h1>
          <p className="subtitle">Alarm Risetime ustawia się jak każdy inny, w kilka sekund. Zmienia się to, na co można go ustawić.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-intro">
            <h2 id="section-intro" className="sr-only">Alarmy podążające za słońcem</h2>
            <p>Zamiast godziny zegarowej, alarm można ustawić na moment słońca — wschód, zachód, południe słoneczne. Alarm podąża potem za tym momentem każdego dnia, w miarę jak pory roku go przesuwają.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pl/alarms-list"
                darkBase="/assets/screenshots/pl/alarms-list--dark"
                alt="Lista alarmów Risetime z pięcioma alarmami: 05:10 w sobotę na kotwicy własnej Świt astronomiczny; 07:00 od poniedziałku do piątku na kotwicy Dokładny, o stałej godzinie; 07:02 jutro na kotwicy Wschód słońca; 17:38 od poniedziałku do piątku, 1 godzinę przed kotwicą Zachód słońca; i 23:02 dzisiaj, 8 godzin przed kotwicą Wschód słońca, wyłączony."
                width={360}
                height={706}
              />
              <figcaption>Zwykłe alarmy i alarmy słoneczne, na jednej liście.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-regular">
            <h2 id="section-regular">Ustawianie zwykłego alarmu</h2>
            <ol>
              <li>W zakładce <strong>Alarmy</strong> nacisnąć <strong>+</strong>.</li>
              <li>Ustawić godzinę na tarczy albo wpisać ją.</li>
              <li>Nacisnąć <strong>OK</strong>.</li>
            </ol>
            <p>Oto zwykły alarm — i nie potrzeba nic więcej.</p>
          </section>

          <section aria-labelledby="section-sun">
            <h2 id="section-sun">Ustawianie alarmu na wschód lub zachód słońca</h2>
            <p>Risetime zna od razu cztery momenty słońca: <strong>Wschód słońca</strong>, <strong>Zachód słońca</strong>, <strong>Południe</strong> — południe słoneczne, gdy słońce jest najwyżej, co niemal nigdy nie wypada o 12:00 — oraz <strong>Nadir</strong>, środek nocy, gdy słońce jest najniżej.</p>
            <ol>
              <li>
                <strong>Za pierwszym razem trzeba wskazać lokalizację.</strong> Godziny słoneczne zależą od miejsca. Bez lokalizacji okno alarmu pokazuje po prostu <em>Ustaw lokalizację w Ustawieniach</em>.
                <details>
                  <summary>Trzy sposoby, by ją wskazać</summary>
                  <p>W <strong>Ustawienia → Lokalizacja zdarzeń astronomicznych</strong>: wybór miasta z listy; albo GPS telefonu, jednorazowo; albo włączenie <strong>Automatycznej aktualizacji lokalizacji</strong>, która śledzi w podróży. Pozycja pozostaje na telefonie: Risetime nie ma żadnego uprawnienia do internetu, więc nie ma dokąd jej wysłać.</p>
                  <figure className="content-screenshot">
                    <ThemedPicture
                      lightBase="/assets/screenshots/pl/alarms-location"
                      darkBase="/assets/screenshots/pl/alarms-location--dark"
                      alt="Ustawienia Risetime, otwarta sekcja Lokalizacja zdarzeń astronomicznych: wybrany Londyn, Wielka Brytania, przycisk GPS i odznaczone pole Automatyczna aktualizacja lokalizacji."
                      width={360}
                      height={706}
                    />
                    <figcaption>Ustawienie lokalizacji, z przyciskiem GPS i polem automatycznej aktualizacji.</figcaption>
                  </figure>
                </details>
              </li>
              <li>W zakładce <strong>Alarmy</strong> nacisnąć <strong>+</strong>.</li>
              <li>W górnym menu wybrać <strong>Wschód słońca</strong>, <strong>Zachód słońca</strong>, <strong>Południe</strong> lub <strong>Nadir</strong>.</li>
              <li>Na tarczy ustawić, ile czasu przed lub po ma zadzwonić alarm — albo zostawić <em>Brak przesunięcia</em>.</li>
              <li>Nacisnąć <strong>OK</strong>.</li>
            </ol>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pl/alarms-anchor-menu"
                darkBase="/assets/screenshots/pl/alarms-anchor-menu--dark"
                alt="Okno tworzenia alarmu z otwartym menu kotwic: Dokładny, Świt astronomiczny, Wschód słońca, Południe, Złota godzina, Zachód słońca i Nadir."
                width={360}
                height={706}
              />
              <figcaption>Menu u góry okna alarmu: godzina zegarowa albo moment słońca.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-offset">
            <h2 id="section-offset">Przesunięcie: „1 godzina przed zachodem słońca”</h2>
            <p><strong>Kotwica to moment słońca, który Risetime przelicza każdego dnia; alarm trzyma się od niej w stałej odległości.</strong> Ta odległość to przesunięcie, do 11 godz. 59 min przed lub po. Moment słoneczny przesuwa się nieco każdego dnia; wybrane przesunięcie — nigdy.</p>
            <ul>
              <li><strong>Wschód słońca</strong>, bez przesunięcia — z pierwszym światłem.</li>
              <li><strong>30 min przed Wschodem słońca</strong> — na nogach przed dniem.</li>
              <li><strong>1 h przed Zachodem słońca</strong> — alarm końca dnia, który zostawia czas na wyjście, póki jeszcze jasno.</li>
              <li><strong>8 h przed Wschodem słońca</strong> — <a href="/pl/budzik-rytm-dobowy/" className="content-link">przypomnienie o zaśnięciu, które podąża za słońcem</a>.</li>
            </ul>
            <p>Wiersz pod tarczą pokazuje najbliższe dzwonienie, na przykład <em>Jutro: 18:03</em>.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pl/alarms-offset"
                darkBase="/assets/screenshots/pl/alarms-offset--dark"
                alt="Okno tworzenia alarmu ustawione na kotwicy Zachód słońca z przesunięciem godziny przed, tarczą godzin na 1 i tarczą minut na 00, oraz wierszem Dzisiaj: 17:38."
                width={360}
                height={706}
              />
              <figcaption>Godzina przed zachodem słońca. Wiersz pod przesunięciem pokazuje, kiedy zadzwoni.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-days">
            <h2 id="section-days">Dni powtarzania, dźwięk i czas dzwonienia</h2>
            <p>Rozwinięcie karty alarmu na liście, zaznaczenie <strong>Powtarzanie</strong> i wybór dni: karta czyta się wtedy tak, jak by się to powiedziało — <em>Pon–pt, 1 h przed Zachodem słońca</em>. Ta sama karta niesie etykietę, dźwięk, wibrację, czas dzwonienia i obraz wyświetlany podczas dzwonienia. Przełącznik ma trzy pozycje: środkowa pomija tylko najbliższe dzwonienie — na wolny dzień — i zostawia alarm aktywny.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pl/alarms-card"
                darkBase="/assets/screenshots/pl/alarms-card--dark"
                alt="Rozwinięta karta alarmu na 17:38, od poniedziałku do piątku, 1 h przed Zachodem słońca: puste pole Etykieta, zaznaczone Powtarzaj z wybranym pon–pt, Dźwięk ustawiony na Domyślny telefonu i włączona Wibracja. Karta ciągnie się poniżej krawędzi obrazu."
                width={360}
                height={706}
              />
              <figcaption>Rozwinięta karta alarmu: dni powtarzania i cała reszta alarmu.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-custom">
            <h2 id="section-custom">Kotwice własne: zmierzchy, kąty słońca, cienie</h2>
            <p>Słońce znaczy znacznie więcej niż cztery momenty. Można utworzyć własne, trzech rodzajów:</p>
            <ul>
              <li><strong>Kąt słoneczny</strong> — moment, gdy słońce osiąga daną wysokość nad lub pod horyzontem, rano lub wieczorem. −6° to świt lub zmierzch cywilny; −12° żeglarski; −18° astronomiczny: pełna noc. +6° wieczorem to niskie, ciepłe światło.</li>
              <li><strong>Długość cienia</strong> — moment, gdy cień przedmiotu osiąga daną wielokrotność jego wysokości, przed lub po południu.</li>
              <li><strong>Część dnia lub nocy</strong> — noc (od zachodu do wschodu) lub dzień, podzielone na równe części; liczba części i granica są dowolne. Ostatnia szósta część nocy zaczyna się na przykład w tym samym punkcie nocy niezależnie od jej długości w danej porze roku.</li>
            </ul>
            <p>Aby ją utworzyć:</p>
            <ol>
              <li>Otwarcie <strong>Ustawienia → Kotwice</strong>, a następnie naciśnięcie <strong>+</strong>.</li>
              <li>Wybór rodzaju i ustawienie wartości.</li>
              <li>Nadanie nazwy albo pozostawienie proponowanej.</li>
              <li>Wybór koloru — <strong>Zapisz</strong> go wymaga.</li>
              <li>Naciśnięcie <strong>Zapisz</strong>.</li>
            </ol>
            <p>Kotwica figuruje odtąd w oknie alarmu, obok wschodu i zachodu, i przyjmuje przesunięcie jak każda inna. Przełącznik na liście kotwic usuwa z tego menu te, z których się nie korzysta.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pl/alarms-anchors"
                darkBase="/assets/screenshots/pl/alarms-anchors--dark"
                alt="Ustawienia, sekcja Kotwice: dwie kotwice własne, Świt astronomiczny i Złota godzina, każda z przyciskiem edycji i przyciskiem usuwania, obok fabrycznych kotwic Wschód słońca, Południe, Zachód słońca i Nadir. Każdy wiersz ma przełącznik widoczności, wszystkie włączone."
                width={360}
                height={706}
              />
              <figcaption>Kotwica własna zajmuje swoje miejsce wśród innych, w porządku dnia.</figcaption>
            </figure>

            <p>Kotwicę można też <strong>skalibrować</strong> — przesunąć o maksymalnie 30 minut, aby dopasować się do rozkładu, którego się przestrzega, jak lokalny kalendarz.</p>
            <p>Daleko od równika niektóre kąty nie są osiągane przez część roku. Edytor podaje te daty — w Londynie słońce nie schodzi do −18° od końca maja do końca lipca — i w te dni alarm milczy, zamiast dzwonić o zmyślonej porze.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pl/alarms-anchor-editor"
                darkBase="/assets/screenshots/pl/alarms-anchor-editor--dark"
                alt="Edytor kotwicy na Kąt słoneczny, ustawiony na −18,0° rano, nazwany Świt astronomiczny, z podglądem Następny: 05:10. Słońce nie osiąga tutaj tego kąta od 23 maja 2027 do 21 lipca 2027."
                width={360}
                height={706}
              />
              <figcaption>−18° rano, ustawione dla Londynu: edytor nazywa tygodnie, w które to się nie zdarza.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-calculation">
            <h2 id="section-calculation">Jak obliczane są godziny wschodu i zachodu, offline</h2>
            <p>Każda godzina wschodu i zachodu jest obliczana na urządzeniu przez bibliotekę astronomiczną, <a href="https://shredzone.org/maven/commons-suncalc/" className="content-link">commons-suncalc</a>, opartą na <em>Astronomical Algorithms</em> Jeana Meeusa. Wschód i zachód mierzone są dla górnej krawędzi tarczy słońca, z uwzględnieniem refrakcji atmosferycznej — tego, co widzą oczy; kąty słoneczne — dla środka tarczy, konwencja tabel zmierzchu. Żadnego zapytania w sieci, żadnego serwera: to działa w trybie samolotowym, na morzu albo w dolinie bez zasięgu.</p>
            <p>Risetime nie działa bez przerwy. Przelicza po zadzwonieniu, przy krótkim sprawdzeniu co kilka godzin, albo gdy telefon się restartuje, zmienia godzinę lub strefę czasową; resztę robi systemowy budzik Androida — ten sam, z którego korzysta domyślny zegar telefonu.</p>
          </section>

          <section aria-labelledby="section-reliability">
            <h2 id="section-reliability">Upewnienie się, że zadzwoni</h2>
            <p>Niektóre telefony zatrzymują aplikacje w tle, by oszczędzać baterię, i to może wyciszyć dowolny alarm. <strong>Ustawienia → Niezawodność</strong> sprawdza, czego wymaga dany telefon, i pokazuje przycisk <strong>Napraw</strong> przy każdym brakującym elemencie. Po restarcie alarmy dzwonią nawet zanim telefon zostanie odblokowany po raz pierwszy.</p>
          </section>

          <section aria-labelledby="section-timers">
            <h2 id="section-timers">Minutniki też</h2>
            <p>Zakładka <strong>Minutniki</strong> zbiera odliczania, w tym te, które same startują od nowa dla interwałów i bloków nauki: <a href="/pl/minutniki/" className="content-link">jak działają minutniki z powtarzaniem</a>.</p>
            <p>Risetime jest darmowa do trzech alarmów i trzech minutników — na zawsze. Potrzeba więcej? Wystarczy najpierw skorzystać z tych trzech i sprawdzić, czy warto wesprzeć rozwój — wspierający mają nieograniczone alarmy i minutniki, rocznie lub raz na zawsze. W przeciwnym razie każda wiadomość na <a href="mailto:contact@risetime.app">ten adres</a> znajdzie chętnego czytelnika.</p>
          </section>

          <section aria-labelledby="section-guides">
            <h2 id="section-guides">Przewodniki według zastosowania</h2>
            <ul>
              <li><a href="/pl/budzik-rytm-dobowy/" className="content-link">Rytm wstawania i zasypiania podążający za wschodem słońca</a></li>
              <li><a href="/pl/zlota-godzina/" className="content-link">Złota godzina, niebieska godzina i nocne niebo, dla fotografów i astronomów</a></li>
              {/* Add the Muslim prayer times and morning practice guides here once those pages are published. */}
            </ul>
          </section>

          <div className="cta-section">
            <h2>Ustawić raz. Podąża za słońcem.</h2>
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

        <SiteFooter page="/alarms/" lang="pl" />
    </div>
  )
}
