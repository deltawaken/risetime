import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// STRONA PO POLSKU, tłumaczenie strony francuskiej (porteur, 2026-09-27).
// Tłumaczenie app/(en)/circadian-rhythm-alarm/page.tsx, tak jak francuska:
// te same sekcje, te same `id`, te same zrzuty ekranu, te same dane strukturalne.
// ⚠️ ŁAŃCUCHY NAGŁÓWKOWE ŻYJĄ W content/pl/circadian-rhythm-alarm.md.
// ⛔ ŻADNEJ ALEGACJI ZDROWOTNEJ. Rytm dobowy się OPISUJE — to, co robi słońce, to,
// co oblicza aplikacja — nie leczy się nim niczego.
export const metadata: Metadata = langMetadata('pl', '/circadian-rhythm-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Budzik rytmu dobowego na Androida: alarm zakotwiczony we wschodzie słońca",
  "description": "Jak ustawić alarm na Androidzie na wschód słońca, i dzień zbudowany wokół słońca, dzięki aplikacji budzika Risetime. Alarm sam przesuwa się z porami roku; godziny obliczane są na urządzeniu, bez żadnego uprawnienia do internetu.",
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
  "mainEntityOfPage": "https://risetime.app/pl/budzik-rytm-dobowy/"
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
      "name": "Budzik rytmu dobowego",
      "item": "https://risetime.app/pl/budzik-rytm-dobowy/"
    }
  ]
}
]

export default function BudzikRytmDobowyPage() {
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

        <SiteHeader current="/circadian-rhythm-alarm/" lang="pl" />

        <div className="page-header">
          <h1>Budzik rytmu dobowego na Androida: alarm zakotwiczony we wschodzie słońca</h1>
          <p className="subtitle">Sam przesuwa się z porami roku.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-what">
            <h2 id="section-what" className="sr-only">Czym jest budzik rytmu dobowego</h2>
            <p>„Budzik rytmu dobowego” — tak nazywa się alarm przypięty do słońca zamiast do zegara. Nazwa pochodzi od mniej więcej 24-godzinnego cyklu organizmu; w sklepie z aplikacjami oznacza po prostu, że alarm podąża za wschodem słońca zamiast trzymać się stałej godziny.</p>
            <p>W Risetime moment słońca, który się wybiera, nazywa się <strong>kotwicą</strong> — wschód, południe słoneczne, zachód — a odległość, jaka jest od niej zachowywana, to <strong>przesunięcie</strong>.</p>
          </section>

          <section aria-labelledby="section-swing">
            <h2 id="section-swing">O ile przesuwa się wschód słońca w ciągu roku</h2>
            <table className="timing-table" aria-label="O ile przesuwa się wschód słońca między czerwcem a grudniem, według miasta">
              <thead>
                <tr><th>Miasto</th><th>Najwcześniejszy wschód</th><th>Najpóźniejszy wschód</th><th>Rozpiętość</th></tr>
              </thead>
              <tbody>
                <tr><td>Londyn</td><td>04:43 (21 czerwca)</td><td>08:03 (21 grudnia)</td><td>3 godz. 20 min</td></tr>
                <tr><td>Paryż</td><td>05:46 (21 czerwca)</td><td>08:41 (21 grudnia)</td><td>2 godz. 55 min</td></tr>
                <tr><td>Tokio</td><td>04:25 (21 czerwca)</td><td>06:47 (21 grudnia)</td><td>2 godz. 20 min</td></tr>
                <tr><td>Chicago</td><td>05:15 (21 czerwca)</td><td>07:14 (21 grudnia)</td><td>2 godz. 00 min</td></tr>
                <tr><td>Sydney</td><td>05:41 (21 grudnia)</td><td>06:00 (21 czerwca)</td><td>1 godz. 20 min</td></tr>
              </tbody>
            </table>
            <p>Czas lokalny, 2027, obliczony biblioteką astronomiczną, z której korzysta aplikacja.</p>
            <p>Stały alarm o 06:30 w Londynie dzwoni więc <strong>1 godz. 47 min po wschodzie słońca w czerwcu</strong>, a <strong>1 godz. 33 min przed nim w grudniu</strong>. Ten sam alarm, dwa różne poranki.</p>
          </section>

          <section aria-labelledby="section-how">
            <h2 id="section-how">Jak ustawić alarm na rytm dobowy</h2>
            <ol>
              <li>W zakładce <strong>Alarmy</strong> nacisnąć <strong>+</strong>.</li>
              <li>W górnym menu wybrać <strong>Wschód słońca</strong>.</li>
              <li>Zostawić tarczę na miejscu, by wstawać o wschodzie, albo obrócić ją o wybraną odległość — 30 minut przed, godzinę przed.</li>
              <li>Nacisnąć <strong>OK</strong>. Następnie otworzyć alarm na liście i zaznaczyć <strong>Powtarzaj</strong>, by wybrać dni.</li>
            </ol>
            <p>Ustawiona odległość nigdy się nie zmienia. Wschód słońca — owszem, zmienia się, a alarm podąża za nim — przez zrównania dnia z nocą, przesilenia i zmianę czasu na letni. <a href="/pl/alarmy/" className="content-link">Ustawianie alarmu o wschodzie lub zachodzie słońca</a></p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pl/circadian-list"
                darkBase="/assets/screenshots/pl/circadian-list--dark"
                alt="Lista alarmów Risetime z trzema alarmami, wszystkie powtarzane codziennie: 07:02 na kotwicy Wschód słońca, 20:38 dwie godziny po kotwicy Zachód słońca, i 23:02 osiem godzin przed kotwicą Wschód słońca."
                width={360}
                height={706}
              />
              <figcaption>Alarmy zakotwiczone we wschodzie i zachodzie słońca, powtarzane codziennie.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-day">
            <h2 id="section-day">Dzień podążający za słońcem — i za zegarem</h2>
            <p>Oto dzień, jaki naprawdę wygląda na własnym telefonie:</p>
            <table className="timing-table" aria-label="Dzień złożony z alarmów zakotwiczonych w słońcu i alarmów zegarowych">
              <thead>
                <tr><th>Moment</th><th>Alarm</th><th>Dni</th></tr>
              </thead>
              <tbody>
                <tr><td>Wstawanie</td><td>Wschód słońca</td><td>pon.–pt.</td></tr>
                <tr><td>Początek pracy, albo wstawanie w weekend</td><td>09:00</td><td>codziennie</td></tr>
                <tr><td>Obiad</td><td>1 godz. przed Południem — południem słonecznym, rzadko 12:00</td><td>codziennie</td></tr>
                <tr><td>Powrót do pracy</td><td>1 godz. po Południu</td><td>pon.–pt.</td></tr>
                <tr><td>Koniec pracy</td><td>18:00</td><td>pon.–pt.</td></tr>
              </tbody>
            </table>
            <p>Jest jeszcze szósty, osiem godzin przed wschodem słońca, by zacząć zwalniać. Na razie wyłączony — środkowa pozycja przełącznika zachowuje alarm, nie pozwalając mu dzwonić.</p>
            <p>To sześć alarmów, w tym jeden wyłączony — więcej niż trzy darmowe.</p>
            <p>Te zakotwiczone w słońcu podążają za światłem; te zegarowe trzymają to, czego oczekują inni. Oba żyją na tej samej liście, a każda karta mówi, który jest który.</p>
            <p>Skala tego zależy od miejsca zamieszkania. W Sydney wschód słońca przesuwa się w ciągu roku o około godzinę, i dzień zakotwiczony w słońcu ledwie dryfuje. W Londynie przesuwa się o ponad trzy godziny: poranek podąża wtedy za słońcem, a godziny pracy zostają przy zegarze.</p>
          </section>

          <section aria-labelledby="section-late">
            <h2 id="section-late">Gdy wschód słońca przychodzi zbyt późno</h2>
            <p>W środku zimy wschód słońca przychodzi po rozpoczęciu dnia pracy — 08:03 w Londynie 21 grudnia. Dwa sposoby, by sobie z tym poradzić:</p>
            <ul>
              <li><strong>Wstawanie z pierwszym światłem, zamiast tego.</strong> Światło przychodzi na długo przed słońcem. W Ustawienia → Kotwice można utworzyć własną kotwicę na <strong>świt cywilny</strong> — moment, gdy jest już dość światła, by widzieć na zewnątrz bez lampy — i ustawić na niej alarm. <a href="/pl/alarmy/#section-custom" className="content-link">Kotwice według kąta słonecznego i zmierzchu</a></li>
              <li><strong>Zachowanie obu rodzajów alarmu</strong>, jak wyżej: zegar na dni zaczynające się o stałej godzinie, słońce na resztę.</li>
            </ul>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pl/circadian-offset"
                darkBase="/assets/screenshots/pl/circadian-offset--dark"
                alt="Okno nowego alarmu ustawione na kotwicy Wschód słońca z przesunięciem ośmiu godzin przed, tarczą godzin na 8 i tarczą minut na 00, oraz wierszem Dzisiaj: 23:02."
                width={360}
                height={706}
              />
              <figcaption>Dowolna odległość od kotwicy, przed lub po, do 11 godz. 59 min.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-privacy">
            <h2 id="section-privacy">Alarm, nie śledzenie snu</h2>
            <p>Risetime nie śledzi snu. Nie zapisuje momentu wyłączenia alarmu, nie ma konta, chmury ani żadnego narzędzia analitycznego. Nie ma <strong>żadnego uprawnienia do internetu</strong>: sam system operacyjny uniemożliwia jej więc połączenie. Godziny wschodu słońca są obliczane na telefonie, a lokalizacja nigdy go nie opuszcza. To też dlatego działa w trybie samolotowym, w dolinie, na łodzi. <a href="/pl/prywatnosc/" className="content-link">Polityka prywatności</a></p>
            <p>Risetime jest darmowa do trzech alarmów i trzech minutników — na zawsze. Potrzeba więcej? Wystarczy najpierw skorzystać z tych trzech i sprawdzić, czy warto wesprzeć rozwój — wspierający mają nieograniczone alarmy i minutniki, rocznie lub raz na zawsze. W przeciwnym razie każda wiadomość na <a href="mailto:contact@risetime.app">ten adres</a> znajdzie chętnego czytelnika.</p>
          </section>

          <div className="cta-section">
            <h2>Wstać ze słońcem. Zegar zostawić na resztę.</h2>
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

        <SiteFooter page="/circadian-rhythm-alarm/" lang="pl" />
    </div>
  )
}
