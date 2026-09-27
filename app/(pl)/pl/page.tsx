import type { Metadata } from 'next'
import { langMetadata } from '../../../lib/metadata'
import SiteHeader from '../../../components/SiteHeader'
import ThemedPicture from '../../../components/ThemedPicture'
import SiteFooter from '../../../components/SiteFooter'

// STRONA GŁÓWNA PO POLSKU — tłumaczenie strony francuskiej (porteur, 2026-09-27):
// strona przetłumaczona niesie WSZYSTKO, co niesie francuska, po tej samej
// stronie co ona: w JSX.
// ⚠️ ŁAŃCUCHY NAGŁÓWKOWE ŻYJĄ W content/pl/home.md, w JEDNYM egzemplarzu.
export const metadata: Metadata = langMetadata('pl', '/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Risetime",
  "alternateName": "Risetime Budzik o wschodzie słońca",
  "operatingSystem": "Android",
  "applicationCategory": "UtilitiesApplication",
  "inLanguage": "pl",
  "url": "https://risetime.app/pl/",
  "description": "Budzik o wschodzie słońca na Androida. Ustaw alarm na wschód, zachód słońca lub południe słoneczne — przesuwa się sam, każdego dnia. Offline, bez reklam.",
  "screenshot": [
    "https://risetime.app/assets/screenshots/alarm-list.png",
    "https://risetime.app/assets/screenshots/alarm-picker.png",
    "https://risetime.app/assets/screenshots/dismiss-screen.png",
    "https://risetime.app/assets/screenshots/settings-screen.png"
  ],
  "featureList": [
    "Alarmy zakotwiczone we wschodzie słońca, zachodzie, południu słonecznym lub w nadirze",
    "Kotwice na miarę: kąt słoneczny, długość cienia, część dnia lub nocy",
    "Kalibracja kotwicy, aby dopasować się do publikowanego rozkładu",
    "Automatyczne przeliczanie każdego dnia, w miarę jak przesuwają się godziny słońca",
    "Działa całkowicie offline — żadnego uprawnienia do internetu",
    "Żadnej analityki, żadnego śledzenia, żadnego zbierania danych",
    "Alarmy niebiańskie i alarmy o stałej godzinie, obsługiwane razem",
    "Systemowe API alarmu — przetrwa tryb Doze i restarty",
    "Minutniki, których cykle nie tracą rytmu"
  ],
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken",
    "url": "https://risetime.app/"
  },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
},
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "pl",
  "mainEntity": [
    { "@type": "Question", "name": "Co dokładnie robi Risetime?",
      "acceptedAnswer": { "@type": "Answer", "text": "Risetime to budzik, który może przypiąć alarm do momentu słońca. Wystarczy raz ustawić „30 minut przed wschodem”, a alarm przelicza się każdego dnia dla danego miejsca — podąża za słońcem cały rok. Obsługuje też zwykłe alarmy o stałej godzinie oraz minutniki." } },
    { "@type": "Question", "name": "Czy Risetime potrzebuje połączenia z internetem?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nie. Risetime nie ma żadnego uprawnienia do internetu — nie może się połączyć, nawet gdyby chciała. Godziny wschodu i zachodu słońca są obliczane na urządzeniu. Działa w trybie samolotowym, w terenie, wszędzie." } },
    { "@type": "Question", "name": "Czy obsługuje też zwykłe alarmy o stałej godzinie?",
      "acceptedAnswer": { "@type": "Answer", "text": "Tak. Alarmy zegarowe i alarmy zakotwiczone w słońcu żyją na tej samej liście, a minutniki mają własną zakładkę, z własnym dźwiękiem i głośnością." } },
    { "@type": "Question", "name": "Czy można ustawić alarm na świt, złotą godzinę lub głęboką noc?",
      "acceptedAnswer": { "@type": "Answer", "text": "Tak, przez kąt słoneczny. Wystarczy utworzyć kotwicę na −6° dla świtu cywilnego, +6° wieczorem dla złotej godziny, −18° dla nocy astronomicznej, a następnie ustawić na niej alarmy. Tam, gdzie dany kąt nie jest osiągany przez część roku, aplikacja to sygnalizuje, a alarm pomija te dni zamiast dzwonić o zmyślonej porze." } },
    { "@type": "Question", "name": "Czy alarm zadzwoni mimo trybu Doze lub oszczędzania baterii?",
      "acceptedAnswer": { "@type": "Answer", "text": "Tak. Risetime korzysta z API setAlarmClock systemu Android — tego samego mechanizmu co domyślny zegar telefonu — a ekran niezawodności sprawdza uprawnienia, których wymaga dany telefon. Alarmy dzwonią nawet przed pierwszym odblokowaniem po restarcie." } },
    { "@type": "Question", "name": "Czy Risetime jest darmowa?",
      "acceptedAnswer": { "@type": "Answer", "text": "Darmowa do trzech alarmów i trzech minutników, na zawsze. Potrzeba więcej? Wystarczy najpierw skorzystać z tych trzech i sprawdzić, czy warto wesprzeć rozwój — wspierający mają nieograniczone alarmy i minutniki, rocznie lub raz na zawsze." } }
  ]
}
]

const PLAY = "https://play.google.com/apps/testing/com.deltawaken.risetime"
const PlayBadge = () => (
  <a className="play-badge" href={PLAY} target="_blank" rel="noopener" aria-label="Dołącz do testów otwartych Risetime w Google Play">
    <span className="badge-main">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
      Google Play
    </span>
    <span className="badge-sub">Testy otwarte</span>
  </a>
)

export default function StronaGlownaPage() {
  return (
    <div className="landing">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <a href="#main-content" className="skip-link">Przejdź do treści głównej</a>

        <SiteHeader current="/" lang="pl" />

        <main id="main-content">

          <section className="hero" aria-labelledby="hero-heading">
            <h1 id="hero-heading"><span className="hero-brand">Risetime</span> <span className="hero-sep" aria-hidden="true">&mdash;</span> aplikacja alarmów słonecznych na Androida.</h1>
            <p className="hero-celestial">Niebiański budzik.</p>
            <p className="hero-sub">Alarm ustawiony na słońce. Przesuwa się każdego dnia, więc nie trzeba robić tego samemu.</p>
            <div className="hero-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pl/alarm-list"
                darkBase="/assets/screenshots/pl/alarm-list--dark"
                alt="Lista alarmów Risetime z pięcioma alarmami: 05:10 w sobotę na kotwicy własnej Świt astronomiczny; 07:00 od poniedziałku do piątku na kotwicy Dokładny, o stałej godzinie; 07:02 jutro na kotwicy Wschód słońca; 17:38 od poniedziałku do piątku, 1 godzinę przed kotwicą Zachód słońca; i 23:02 dzisiaj, 8 godzin przed kotwicą Wschód słońca, wyłączony."
                width={360}
                height={706}
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="cta-group">
              <PlayBadge />
              <p className="cta-note">Risetime jest w fazie testów otwartych: trzeba najpierw dołączyć do testów, a dopiero potem zainstalować z Play. Bez tego kroku Play może wskazywać, że aplikacja nie jest dostępna w danym kraju.</p>
            </div>
          </section>

          <section className="how-it-works" aria-labelledby="how-heading">
            <h2 id="how-heading">Jak działa budzik o wschodzie słońca</h2>
            <ol className="steps" role="list">
              <li><strong>Wybór kotwicy</strong><span>Zdarzenie niebiańskie: wschód, południe słoneczne, zachód lub nadir. To punkt odniesienia, za którym podąża alarm.</span></li>
              <li><strong>Ustawienie przesunięcia</strong><span>Ile czasu przed, albo po. Trzydzieści minut przed wschodem. Godzinę po zachodzie. I dni, w które alarm się powtarza.</span></li>
              <li><strong>To wszystko</strong><span>Risetime przelicza dokładną godzinę każdego dnia. Wschód przesuwa się z porami roku — alarm podąża za nim. Nic więcej nie trzeba robić.</span></li>
            </ol>
          </section>

          <section className="features" aria-labelledby="features-heading">
            <h2 id="features-heading">Co potrafi aplikacja Risetime</h2>
            <div className="feature-grid">
              <article className="feature-card">
                <h3>Zakotwiczona w dniu</h3>
                <p>Alarmy ustawiane względem wschodu, południa słonecznego, zachodu lub nadiru, z dowolnym przesunięciem. Godzina przelicza się każdego dnia, by trzymać się rzeczywistego nieba. Ustawiona raz, trafna przez cały rok.</p>
              </article>
              <article className="feature-card">
                <h3>Offline, i prywatna z założenia</h3>
                <p>Risetime nie ma uprawnienia do internetu. Nie wyłączonego — nieobecnego. Godziny wschodu obliczane są na urządzeniu, przez wbudowane algorytmy astronomiczne. Żadnego serwera, żadnego konta, żadnych danych opuszczających telefon.</p>
              </article>
              <article className="feature-card">
                <h3>Ustawić raz i zapomnieć</h3>
                <p>Aplikacja przelicza godziny w tle, codziennie. Najczęściej nie trzeba jej nawet otwierać. To celowe: Risetime działa najlepiej, gdy się o niej zapomina.</p>
              </article>
              <article className="feature-card">
                <h3>Prawdziwe alarmy, nie powiadomienia</h3>
                <p>Risetime korzysta z tego samego systemowego API co domyślny zegar Androida. Alarm przetrwa tryb Doze, oszczędzanie baterii i restarty. O wyznaczonej porze telefon dzwoni.</p>
              </article>
              <article className="feature-card">
                <h3>Minutniki, w tej samej aplikacji</h3>
                <p>Klawiatura, lista posortowana według czasu trwania, i powtarzanie, którego cykle nie tracą rytmu — do interwałów, sesji, bloków nauki. <a href="/pl/minutniki/">Przewodnik po minutnikach</a></p>
              </article>
            </div>
          </section>

          <section className="use-cases" id="uses" aria-labelledby="use-cases-heading">
            <h2 id="use-cases-heading">Do czego można jej użyć</h2>
            <p>Kto korzysta z budzika słonecznego i co ustawia:</p>
            <ul className="use-case-list">
              <li><strong>Dzień podążający za słońcem</strong> — wstawanie o wschodzie, zwalnianie przed zachodem, i alarmy o stałej godzinie zachowane dla pór, których oczekują od nas inni. <a href="/pl/budzik-rytm-dobowy/">Budzik rytmu dobowego</a></li>
              <li><strong>Fotografowie i astronomowie</strong> — złota godzina, niebieska godzina i noc astronomiczna to kąty słońca, nie stałe godziny. Kąt ustawiony raz trzyma się na każdej szerokości geograficznej i w każdej porze roku, offline, w terenie. <a href="/pl/zlota-godzina/">Złota godzina, niebieska godzina i nocne niebo</a></li>
              <li><strong>Medytacja, joga, praktyka o pierwszym świetle</strong> — pozdrowienie słońca, gdy nadchodzi światło, albo siedzenie przed nim. Kotwica na wschodzie, na świcie cywilnym przez jego kąt, albo na części nocy. <a href="/pl/medytacja-o-wschodzie-slonca/">Budzik do medytacji i jogi</a></li>
              <li><strong>Wyjście przed świtem</strong> — na wodę przed dniem, z alarmem, który przesuwa się z pierwszym światłem zamiast trzymać godzinę poprawianą co kilka tygodni.</li>
              <li><strong>Wstawanie przed świtem</strong> — przesunięcie przed wschodem ustawione raz podąża za wschodem każdego dnia. Co do dokładnej pory — pozostaje własny kalendarz; alarm zaś nigdy nie dryfuje.</li>
              <li><strong>Praca na dworze, spacery, hodowla</strong> — jeśli dzień zaczyna się ze światłem, alarm też.</li>
              <li><strong>Interwały, sesje, bloki nauki</strong> — minutniki, które same startują od nowa, w tej samej aplikacji. <a href="/pl/minutniki/">Minutniki z powtarzaniem</a></li>
              <li><strong>Dla każdego, kto ma dość poprawiania przez cały rok</strong> — ustawione raz, zostaje trafne. <a href="/pl/alarmy/">Ustawianie alarmu o wschodzie lub zachodzie słońca</a></li>
            </ul>
          </section>

          <section className="screenshots" aria-labelledby="screenshots-heading">
            <h2 id="screenshots-heading">Zrzuty ekranu — aplikacja alarmów słonecznych na Androida</h2>
            <div className="screenshot-row">
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/pl/alarm-picker"
                  darkBase="/assets/screenshots/pl/alarm-picker--dark"
                  alt="Okno tworzenia alarmu Risetime, otwarte nad listą: pigułka kotwicy Południe, przesunięcie minus 1 godzina i 00 minut z zaznaczonym polem godzin, oraz wiersz Jutro: 11:49. Okrągła tarcza godzin z zaznaczoną 1 zajmuje dolną połowę, z Anuluj i OK poniżej."
                  width={360}
                  height={706}
                />
                <figcaption>Wybór kotwicy i przesunięcia</figcaption>
              </figure>
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/pl/dismiss-screen"
                  darkBase="/assets/screenshots/pl/dismiss-screen--dark"
                  alt="Ekran odrzucenia Risetime dla dzwoniącego alarmu, wypełniony od brzegu do brzegu przydymionym różem wziętym z pozycji słońca: godzina 17:30, data czwartek 1 października, słowo Alarm, duży okrągły przycisk DRZEMKA i ODRZUĆ poniżej."
                  width={360}
                  height={706}
                />
                <figcaption>Łagodne budzenie</figcaption>
              </figure>
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/pl/settings-screen"
                  darkBase="/assets/screenshots/pl/settings-screen--dark"
                  alt="Ekran ustawień Risetime, z wierszami Alarmy, Kotwice, Minutniki, Ustawienia telefonu i Lokalizacja zdarzeń astronomicznych ustawioną na Londyn, Wielka Brytania. Wiersz Niezawodność pokazuje 8 z 8 testów na zielono i jest rozwinięty na Kontrole bez zastosowania w tym telefonie oraz Wszystko w porządku (8). Poniżej znajduje się Wsparcie dla Risetime, a stopka pokazuje Risetime."
                  width={360}
                  height={706}
                />
                <figcaption>Niezawodność, którą można sprawdzić</figcaption>
              </figure>
            </div>
          </section>

          <section className="privacy-callout" aria-labelledby="privacy-heading">
            <h2 id="privacy-heading">Offline, bez internetu, bez śledzenia</h2>
            <div className="callout-box">
              <p>Risetime nie prosi o uprawnienie do internetu. Nie ma serwera. Nie trzeba zakładać żadnego konta. Nie ma żadnego narzędzia analitycznego, które obserwowałoby sposób korzystania z aplikacji.</p>
              <ul>
                <li>Bez uprawnienia <code>INTERNET</code> — aplikacja nie może się połączyć</li>
                <li>Żadnych statystyk użycia, żadnych raportów awarii, żadnej telemetrii</li>
                <li>Żadnego konta, żadnej synchronizacji, żadnego połączenia</li>
                <li>Lokalizacja pozostaje na urządzeniu — służy wyłącznie obliczeniom słonecznym</li>
                <li>Żadnych reklam, żadnego śledzenia, żadnych danych udostępnianych komukolwiek</li>
              </ul>
              <a href="/pl/prywatnosc/" className="privacy-link">Polityka prywatności</a>
            </div>
          </section>

          <section className="support" aria-labelledby="support-heading">
            <h2 id="support-heading">Darmowa do trzech alarmów. Bez limitu przy wsparciu.</h2>
            <div className="callout-box" style={{"borderInlineStartColor": "var(--muted)"}}>
              <p>Risetime jest darmowa do trzech alarmów i trzech minutników — na zawsze. <br />Potrzeba więcej? Wystarczy najpierw skorzystać z tych trzech i sprawdzić, czy warto wesprzeć rozwój — wspierający mają nieograniczone alarmy i minutniki, rocznie lub raz na zawsze. W przeciwnym razie każda wiadomość na <a href="mailto:contact@risetime.app">ten adres</a> znajdzie chętnego czytelnika. Adres znajduje się też w Ustawieniach.</p>
              <p style={{"marginBottom": "0"}}>Żadnego ekranu z przypomnieniem, żadnego odliczania, żadnego „przejdź na wyższą wersję”. Tylko uczciwa propozycja, gdy przyjdzie na nią czas.</p>
            </div>
          </section>

          <section className="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading">Najczęstsze pytania</h2>
            <dl className="faq-list">
              <dt>Co dokładnie robi Risetime?</dt>
              <dd>Risetime to budzik, który może przypiąć alarm do momentu słońca. Wystarczy raz ustawić „30 minut przed wschodem”, a alarm przelicza się każdego dnia dla danego miejsca — podąża za słońcem cały rok. Obsługuje też zwykłe alarmy o stałej godzinie oraz minutniki.</dd>
              <dt>Czy Risetime potrzebuje połączenia z internetem?</dt>
              <dd>Nie. Risetime nie ma żadnego uprawnienia do internetu — nie może się połączyć, nawet gdyby chciała. Godziny wschodu i zachodu słońca są obliczane na urządzeniu. Działa w trybie samolotowym, w terenie, wszędzie.</dd>
              <dt>Czy obsługuje też zwykłe alarmy o stałej godzinie?</dt>
              <dd>Tak. Alarmy zegarowe i alarmy zakotwiczone w słońcu żyją na tej samej liście, a minutniki mają własną zakładkę, z własnym dźwiękiem i głośnością.</dd>
              <dt>Czy można ustawić alarm na świt, złotą godzinę lub głęboką noc?</dt>
              <dd>Tak, przez kąt słoneczny. Wystarczy utworzyć kotwicę na −6° dla świtu cywilnego, +6° wieczorem dla złotej godziny, −18° dla nocy astronomicznej, a następnie ustawić na niej alarmy. Tam, gdzie dany kąt nie jest osiągany przez część roku, aplikacja to sygnalizuje, a alarm pomija te dni zamiast dzwonić o zmyślonej porze.</dd>
              <dt>Czy alarm zadzwoni mimo trybu Doze lub oszczędzania baterii?</dt>
              <dd>Tak. Risetime korzysta z API <code>setAlarmClock</code> systemu Android — tego samego mechanizmu co domyślny zegar telefonu — a ekran niezawodności sprawdza uprawnienia, których wymaga dany telefon. Alarmy dzwonią nawet przed pierwszym odblokowaniem po restarcie.</dd>
              <dt>Czy Risetime jest darmowa?</dt>
              <dd>Darmowa do trzech alarmów i trzech minutników, na zawsze. Potrzeba więcej? Wystarczy najpierw skorzystać z tych trzech i sprawdzić, czy warto wesprzeć rozwój — wspierający mają nieograniczone alarmy i minutniki, rocznie lub raz na zawsze.</dd>
            </dl>
          </section>

          <section className="final-cta" aria-labelledby="cta-heading">
            <h2 id="cta-heading">Gotowi wstać ze słońcem?</h2>
            <PlayBadge />
            <p className="cta-note">Risetime jest w fazie testów otwartych: trzeba najpierw dołączyć do testów, a dopiero potem zainstalować z Play. Bez tego kroku Play może wskazywać, że aplikacja nie jest dostępna w danym kraju.</p>
          </section>

        </main>

        <SiteFooter page="/" lang="pl" />
    </div>
  )
}
