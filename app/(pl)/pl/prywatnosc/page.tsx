import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import SiteFooter from '../../../../components/SiteFooter'

// STRONA PO POLSKU, tłumaczenie strony francuskiej (porteur, 2026-09-27).
// ⚠️ ŁAŃCUCHY NAGŁÓWKOWE ŻYJĄ W content/pl/privacy.md, w JEDNYM egzemplarzu.
export const metadata: Metadata = langMetadata('pl', '/privacy/')

export default function PrywatnoscPage() {
  return (
    <div className="layout-narrow">
      <a href="#main-content" className="skip-link">Przejdź do treści głównej</a>

        <SiteHeader current="/privacy/" lang="pl" />

        <div className="page-header">
          <h1>Polityka prywatności</h1>
          <p className="meta">Data wejścia w życie: 2026-09-13 &middot; Wydawca: A. Deltawaken</p>
        </div>

        <main id="main-content" className="content-main">

          <div className="highlight-box">
            <p>Risetime nie zbiera, nie przesyła ani nie udostępnia żadnych danych osobowych. Informacje nigdy nie opuszczają urządzenia.</p>
          </div>

          <section aria-labelledby="section-not-do">
            <h2 id="section-not-do">Czego Risetime nie robi</h2>
            <ul>
              <li>Nie zbiera żadnych danych osobowych</li>
              <li>Nie łączy się z internetem</li>
              <li>Nie przesyła lokalizacji do żadnego serwera</li>
              <li>Nie używa statystyk użycia, raportów awarii ani telemetrii</li>
              <li>Nie zawiera żadnych reklam</li>
              <li>Nie śledzi ani między aplikacjami, ani między stronami</li>
              <li>Nie udostępnia żadnych danych stronom trzecim</li>
            </ul>
          </section>

          <section aria-labelledby="section-local-data">
            <h2 id="section-local-data">Dane przechowywane na urządzeniu</h2>
            <p>Risetime przechowuje poniższe dane <strong>wyłącznie na urządzeniu</strong>, nigdy ich nie przesyłając:</p>
            <ul>
              <li><strong>Konfigurację alarmów</strong> — godziny, etykiety, powtarzanie i typ kotwicy (wschód słońca, zachód itd.). Przechowywane w lokalnej bazie danych Room.</li>
              <li><strong>Lokalizację</strong> — miasto lub współrzędne GPS wybrane do obliczeń niebiańskich (godzin wschodu i zachodu słońca). Używane wyłącznie do obliczeń lokalnych. Nigdy nie przesyłane.</li>
              <li><strong>Preferencje aplikacji</strong> — ustawienia, w tym stan subskrypcji. Przechowywane w lokalnym DataStore.</li>
            </ul>
            <p>Wszystkie te dane znikają wraz z odinstalowaniem aplikacji.</p>
          </section>

          <section aria-labelledby="section-location">
            <h2 id="section-location">Uprawnienie do lokalizacji</h2>
            <p>Risetime prosi o uprawnienie do <strong>przybliżonej lokalizacji</strong> (<code>ACCESS_COARSE_LOCATION</code>) wyłącznie w celu obliczenia lokalnych godzin wschodu i zachodu słońca. Pozycja jest przetwarzana na urządzeniu przez silnik efemeryd i nigdy nie jest wysyłana do żadnej zewnętrznej usługi ani serwera.</p>
            <p>Miasto można też wpisać ręcznie w Ustawieniach — wtedy GPS nie jest używany.</p>
          </section>

          <section aria-labelledby="section-internet">
            <h2 id="section-internet">Uprawnienie do internetu</h2>
            <p>Risetime <strong>nie deklaruje</strong> uprawnienia <code>INTERNET</code> i nie wykonuje żadnych zapytań sieciowych. Aplikacja działa całkowicie offline.</p>
            <p>Opcjonalna subskrypcja przechodzi przez Google Play Billing, który komunikuje się z usługami Google Play przez wymianę między procesami na urządzeniu — a nie przez zapytanie sieciowe wysyłane przez Risetime. Ta wymiana podlega <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">polityce prywatności Google</a>.</p>
          </section>

          <section aria-labelledby="section-subscriptions">
            <h2 id="section-subscriptions">Subskrypcje</h2>
            <p>Risetime oferuje opcjonalną subskrypcję, „Risetime Supporter”. Zakupy są obsługiwane w całości przez Google Play. Risetime nie otrzymuje, nie przechowuje ani nie przetwarza żadnych informacji płatniczych. Stan subskrypcji jest przechowywany wyłącznie na urządzeniu.</p>
          </section>

          <section aria-labelledby="section-children">
            <h2 id="section-children">Prywatność dzieci</h2>
            <p>Risetime świadomie nie zbiera żadnych informacji od nikogo, w tym od dzieci poniżej trzynastego roku życia. Ponieważ żadne dane nie są zbierane, Risetime z założenia spełnia wymogi COPPA i porównywalnych regulacji.</p>
          </section>

          <section aria-labelledby="section-changes">
            <h2 id="section-changes">Zmiany tej polityki</h2>
            <p>Jeśli ta polityka prywatności ulegnie zmianie, aktualna wersja zostanie opublikowana pod tym adresem, z nową datą wejścia w życie. Ponieważ żadne dane nie są zbierane, zmiana raczej nie wpłynie w praktyce na prywatność.</p>
          </section>

          <section aria-labelledby="section-contact">
            <h2 id="section-contact">Kontakt</h2>
            <p>Wszelkie pytania dotyczące tej polityki prywatności można kierować do wydawcy, na adres <a href="mailto:contact@risetime.app">contact@risetime.app</a>, albo przez kartę aplikacji Risetime w Google Play.</p>
          </section>

        </main>

        <SiteFooter page="/privacy/" lang="pl" />
    </div>
  )
}
