import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// STRONA MINUTNIKÓW PO POLSKU, tłumaczenie strony francuskiej (porteur,
// 2026-09-27).
// ⚠️ ŁAŃCUCHY NAGŁÓWKOWE ŻYJĄ W content/pl/timers.md, w JEDNYM egzemplarzu.
// ⛔ KLUCZ przekazywany tu pozostaje angielski, `/timers/`.
//
// Ustalone słownictwo, nienegocjowalne: rzecz nazywa się „minutnikiem z
// powtarzaniem”, to, co robi, to „powtarzanie”, a jego okrążenia to „cykle”.
export const metadata: Metadata = langMetadata('pl', '/timers/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Minutnik, który sam startuje od nowa",
  "description": "Minutnik z powtarzaniem Risetime: czas trwania, uruchamiany ponownie w stałym odstępie, którego cykle nie tracą rytmu, z przyciskiem Zatrzymaj pętlę, by go zakończyć — oraz zwykłe minutniki, które potrafi każdy zegar.",
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
  "mainEntityOfPage": "https://risetime.app/pl/minutniki/"
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
      "name": "Minutniki",
      "item": "https://risetime.app/pl/minutniki/"
    }
  ]
}
]

export default function MinutnikiPage() {
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

        <SiteHeader current="/timers/" lang="pl" />

        <div className="page-header">
          <h1>Minutnik, który sam startuje od nowa</h1>
          <p className="subtitle">Czas ustawiony raz, i trwa dalej — plus wszystko, co potrafi już minutnik zwykłego zegara.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-loop">
            <h2 id="section-loop">Sam startuje od nowa</h2>
            <p>To część, której zegar telefonu prawdopodobnie nie potrafi. Rozwinięcie wiersza minutnika strzałką i zaznaczenie <strong>Powtarzaj</strong> zamienia go w <strong>minutnik z powtarzaniem</strong>. Dochodzi do zera, dzwoni krótko, po czym startuje od nowa na ten sam czas, aż powtarzanie zostanie zatrzymane. To, co ustawia się raz, to odstęp między dwoma dzwonieniami.</p>
            <p>Każdy cykl jest zakotwiczony w momencie, gdy poprzedni <em>osiągał zero</em>, a nie w momencie, gdy został wyciszony: trzydzieści minut powtórzone dwa razy daje sześćdziesiąt minut, nie sześćdziesiąt jeden. W przeciwnym razie każde dzwonienie zostawione samo sobie przesuwałoby resztę dnia.</p>

            <div className="highlight-box">
              <p>Domyślnie cykl dzwoni <strong>pięć sekund</strong>, dźwiękiem powiadomienia systemu, a nie dźwiękiem alarmu. Oba można zmienić. Nie ma opcji „nigdy” dla tego czasu: dzwonienie bez końca zablokowałoby powtarzanie już od pierwszego cyklu.</p>
            </div>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pl/timer-list"
                darkBase="/assets/screenshots/pl/timer-list--dark"
                alt="Lista minutników Risetime z trzema odliczaniami: 3:00 i 10:00, oba zatrzymane, każdy z przyciskiem odtwarzania i przyciskiem resetu, oraz dłuższy jeszcze trwający, z różową plakietką powtarzania, przyciskiem pauzy i przyciskiem +1:00. Zakładki Alarmy, Minutniki i Ustawienia biegną u dołu ekranu."
                width={360}
                height={706}
              />
              <figcaption>Trzy minutniki, posortowane według czasu trwania. Różowa plakietka oznacza ten ustawiony na powtarzanie.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-ending">
            <h2 id="section-ending">Zatrzymanie pętli</h2>
            <p>Powtarzanie zatrzymuje przycisk o nazwie <strong>Zatrzymaj pętlę</strong>: na ekranie dzwonienia, a także na powiadomieniu o dzwonieniu, obok <strong>Kontynuuj</strong> i przycisku, który dodaje czas.</p>
            <p>Odznaczenie <strong>Powtarzaj</strong> podczas dzwonienia minutnika zostawia jeszcze jeden cykl przed zatrzymaniem: ustawienie jest odczytywane raz na cykl, w momencie rozpoczęcia dzwonienia.</p>
            <p>Ekran dzwonienia pojawia się przy każdym cyklu i znika sam po pięciu sekundach — nic do naciśnięcia, nic do odrzucenia między cyklami.</p>
          </section>

          <section aria-labelledby="section-ordinary">
            <h2 id="section-ordinary">A zwykłe minutniki</h2>
            <p>Reszta to to, co potrafi już minutnik zwykłego zegara. Naciśnięcie plusa daje pełnoekranową klawiaturę zamiast tarczy: cyfry wpisują się od prawej, jak w kuchence mikrofalowej. Cztery, zero, zero daje cztery minuty, a sześć cyfr sięga aż <strong>dziewięćdziesięciu dziewięciu godzin</strong>.</p>
            <p>Minutniki trafiają na listę posortowaną według ustawionego czasu trwania, najkrótszy pierwszy, a nie w kolejności tworzenia. Działają równolegle — kilka niezależnych odliczań naraz, z powtarzaniem lub bez.</p>
            <p>Każdy wiersz ma pauzę i przycisk <strong>+1:00</strong>, który dodaje czas do tego, co zostało — minutę, chyba że zmieniona w Ustawieniach. Zatrzymanie minutnika zamienia ten przycisk w reset. Strzałka rozwija wiersz na <strong>Powtarzaj</strong> i na usunięcie.</p>
          </section>

          <section aria-labelledby="section-notification">
            <h2 id="section-notification">Odliczanie samo w powiadomieniu</h2>
            <p>Odliczanie w panelu powiadomień rysuje sam Android, a nie odmalowuje aplikacja. Trwa nawet bez żadnego żywego procesu Risetime.</p>
            <p>Jest jedna karta dla tego, co działa lub jest wstrzymane, i jedna dla tego, co dzwoni — dokładnie dwie, nigdy jedna na minutnik, piętrzące się w panelu.</p>
            <p>Przesunięcie tej karty niczego nie zatrzymuje: wraca natychmiast, odbudowana z rzeczywistego stanu, a dzwoniący minutnik dalej dzwoni. Zatrzymanie zawsze przechodzi przez przycisk, celowo.</p>
          </section>

          <section aria-labelledby="section-settings">
            <h2 id="section-settings">Własny dźwięk, własna głośność</h2>
            <p>Minutniki nie pożyczają ustawień alarmów, a minutnik z powtarzaniem nie pożycza też ustawień minutnika jednorazowego: dwa profile, wybierane w zależności od tego, czy Powtarzaj jest zaznaczone. Każdy niesie swój dźwięk, głośność, czas dzwonienia i opcjonalne stopniowe zwiększanie głośności.</p>
            <p>Oba czasy dzwonienia są na celowo różnych skalach. W powtarzaniu: <strong>5, 10, 15, 30, 60 lub 120 sekund</strong>. Dla minutnika jednorazowego: <strong>1, 5, 10, 15, 20 lub 25 minut, albo nigdy</strong>.</p>
            <p>Żaden dźwięk nie jest dostarczany z aplikacją: dźwięki pochodzą z systemu albo z własnego pliku. Dwa ustawienia pozostają wspólne, a nie zdublowane — czy minutniki wibrują, i co robią przyciski głośności podczas dzwonienia minutnika.</p>
          </section>

          <section aria-labelledby="section-not">
            <h2 id="section-not">Czego nie zrobi</h2>
            <p>To odliczanie i powtarzanie, nic więcej:</p>
            <ul>
              <li><strong>Brak naprzemienności pracy i odpoczynku.</strong> Powtarzanie ma tylko jeden czas trwania; trzydzieści sekund wysiłku i trzydzieści odpoczynku to dwa różne czasy, a żaden ekran nie składa minutnika z kilku.</li>
              <li><strong>Brak przypomnienia w środku sesji</strong> — trzydziestominutowe siedzenie nie może zadzwonić na dziesiątej i dwudziestej minucie.</li>
              <li><strong>Brak przedziału godzinowego, brak godzin ciszy.</strong> Powtarzanie trwa, aż zostanie zatrzymane.</li>
              <li><strong>Brak dzwonienia o równej godzinie.</strong> Odliczanie zaczyna się od momentu uruchomienia.</li>
            </ul>
          </section>

          <section aria-labelledby="section-setup">
            <h2 id="section-setup">Ustawianie minutnika</h2>
            <p>Otwarcie zakładki Minutniki, naciśnięcie plusa, wpisanie czasu. Startuje sam — nic do nazwania, nic do klasyfikowania. Aby się powtarzał, wystarczy zaznaczyć <strong>Powtarzaj</strong> pod strzałką.</p>
            <p><a href="/pl/alarmy/" className="content-link">Przewodnik po alarmach</a> opisuje alarmy, które dzielą te same ustawienia niezawodności.</p>
          </section>

          <section aria-labelledby="section-price">
            <h2 id="section-price" className="sr-only">Ile to kosztuje</h2>
            <p>Risetime jest darmowa do trzech minutników, ten sam limit co alarmy — na zawsze. Po jego osiągnięciu przycisk dodawania po prostu znika: bez okna dialogowego, bez kłódki, bez baneru nazywającego to, czego brakuje. Jeśli wsparcie się zakończy, nic nie zostaje usunięte: każdy utworzony minutnik dalej działa, tylko nie można dodać kolejnego. Potrzeba więcej niż trzech? Warto sprawdzić, czy warto wesprzeć rozwój — w przeciwnym razie każda wiadomość na <a href="mailto:contact@risetime.app">ten adres</a> znajdzie chętnego czytelnika.</p>
          </section>

          <div className="cta-section">
            <h2>Ustawić czas raz. Rytm trzyma się sam.</h2>
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

        <SiteFooter page="/timers/" lang="pl" />
    </div>
  )
}
