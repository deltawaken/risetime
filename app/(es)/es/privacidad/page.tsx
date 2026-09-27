import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import SiteFooter from '../../../../components/SiteFooter'

// LA PÁGINA ESPAÑOLA, ESCRITA A MANO — decisión del porteur del 2026-09-27:
// « on ne fait plus de markdown […] tu vas juste bien gentiment tout traduire
// toi-même ». Una página traducida lleva TODO lo que lleva la inglesa, su
// mobiliario incluido, en el mismo lado que ella: el JSX.
//
// ⚠️ SUS CADENAS DE CABECERA VIVEN EN content/es/privacy.md, en UN solo
// ejemplar, igual que la francesa las toma de content/fr/. `langMetadata` lee
// ahí título, descripción y og, añade el canonical ESPAÑOL y los hreflang, y
// pone `noindex` en el build de preview.
//
// ⛔ `es` está en `STATIC_LOCALES` (lib/pages.ts): la ruta dinámica
// `app/[lang]/` NO produce por tanto estas URL.
export const metadata: Metadata = langMetadata('es', '/privacy/')

export default function PrivacidadPage() {
  return (
    <div className="layout-narrow">
      <a href="#main-content" className="skip-link">Ir al contenido principal</a>

        <SiteHeader current="/privacy/" lang="es" />

        <div className="page-header">
          <h1>Política de privacidad</h1>
          <p className="meta">Fecha de entrada en vigor: 2026-09-13 &middot; Editor: A. Deltawaken</p>
        </div>

        <main id="main-content" className="content-main">

          <div className="highlight-box">
            <p>Risetime no recopila, transmite ni comparte ningún dato personal. Tu información nunca sale de tu dispositivo.</p>
          </div>

          <section aria-labelledby="section-not-do">
            <h2 id="section-not-do">Lo que Risetime no hace</h2>
            <ul>
              <li>No recopila ningún dato personal</li>
              <li>No se conecta a Internet</li>
              <li>No transmite tu ubicación a ningún servidor</li>
              <li>No usa estadísticas de uso, ni informes de fallos, ni telemetría</li>
              <li>No contiene ninguna publicidad</li>
              <li>No te rastrea de una aplicación a otra, ni de un sitio a otro</li>
              <li>No comparte ningún dato con terceros</li>
            </ul>
          </section>

          <section aria-labelledby="section-local-data">
            <h2 id="section-local-data">Los datos guardados en tu dispositivo</h2>
            <p>Risetime guarda los siguientes datos <strong>exclusivamente en tu dispositivo</strong>, sin transmitirlos nunca:</p>
            <ul>
              <li><strong>La configuración de tus alarmas</strong> — horas, etiquetas, recurrencia y tipo de ancla (amanecer, atardecer, etc.). Guardada en una base de datos Room local.</li>
              <li><strong>La ubicación</strong> — la ciudad o las coordenadas GPS que eliges para los cálculos celestes (horas de amanecer y atardecer). Se usa solo para el cálculo local. Nunca se transmite.</li>
              <li><strong>Las preferencias de la aplicación</strong> — ajustes, incluido el estado de tu suscripción. Guardadas en un DataStore local.</li>
            </ul>
            <p>Todos estos datos desaparecen cuando desinstalas la aplicación.</p>
          </section>

          <section aria-labelledby="section-location">
            <h2 id="section-location">El permiso de ubicación</h2>
            <p>Risetime solicita el permiso de <strong>ubicación aproximada</strong> (<code>ACCESS_COARSE_LOCATION</code>) con el único fin de calcular las horas locales de amanecer y atardecer. Tu ubicación se procesa en el dispositivo mediante un motor de efemérides, y nunca se envía a un servicio o a un servidor externo.</p>
            <p>También puedes escribir tu ciudad a mano en Ajustes: en ese caso el GPS no se usa.</p>
          </section>

          <section aria-labelledby="section-internet">
            <h2 id="section-internet">El permiso de Internet</h2>
            <p>Risetime <strong>no declara</strong> el permiso <code>INTERNET</code> y no realiza ninguna solicitud de red. La aplicación funciona completamente sin conexión.</p>
            <p>La suscripción opcional pasa por Google Play Billing, que se comunica con los servicios de Google Play mediante un intercambio entre procesos en tu dispositivo — y no mediante una llamada de red realizada por Risetime. Ese intercambio se rige por la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">política de privacidad de Google</a>.</p>
          </section>

          <section aria-labelledby="section-subscriptions">
            <h2 id="section-subscriptions">Las suscripciones</h2>
            <p>Risetime ofrece una suscripción opcional, «Risetime Supporter». Las compras se procesan íntegramente a través de Google Play. Risetime no recibe, no guarda ni procesa ninguna información de pago. El estado de la suscripción se guarda solo en tu dispositivo.</p>
          </section>

          <section aria-labelledby="section-children">
            <h2 id="section-children">La privacidad de los menores</h2>
            <p>Risetime no recopila a sabiendas ninguna información de nadie, incluidos los menores de trece años. Al no recopilarse ningún dato, Risetime cumple con COPPA y normativas comparables por construcción.</p>
          </section>

          <section aria-labelledby="section-changes">
            <h2 id="section-changes">Los cambios en esta política</h2>
            <p>Si esta política de privacidad cambia, la versión actualizada se publicará en esta misma dirección, con una nueva fecha de entrada en vigor. Al no recopilarse ningún dato, es poco probable que un cambio afecte a tu privacidad en la práctica.</p>
          </section>

          <section aria-labelledby="section-contact">
            <h2 id="section-contact">Contáctanos</h2>
            <p>Cualquier pregunta sobre esta política de privacidad puede dirigirse al editor, a <a href="mailto:contact@risetime.app">contact@risetime.app</a>, o a través de la ficha de Google Play de Risetime.</p>
          </section>

        </main>

        <SiteFooter page="/privacy/" lang="es" />
    </div>
  )
}
