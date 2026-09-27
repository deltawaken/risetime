import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// LA PÁGINA ESPAÑOLA, ESCRITA A MANO — decisión del porteur del 2026-09-27:
// una página traducida lleva TODO lo que lleva la inglesa, su mobiliario
// incluido, en el mismo lado que ella: el JSX — capturas con dirección
// artística y datos estructurados incluidos.
//
// ⚠️ SUS CADENAS DE CABECERA VIVEN EN content/es/golden-hour-alarm.md, en UN
// solo ejemplar, igual que la francesa las toma de content/fr/. `langMetadata`
// lee ahí título, descripción y og, añade el canonical ESPAÑOL y los
// hreflang, y pone `noindex` en el build de preview.
//
// ⛔ LA CLAVE SIGUE SIENDO LA DE LA PÁGINA INGLESA (`/golden-hour-alarm/`): es
// el registro `PAGES` (lib/pages.ts) el que la nombra, y la URL española se
// DERIVA del `slug:` de la cabecera.
//
// ⛔ `es` está en `STATIC_LOCALES` (lib/pages.ts): la ruta dinámica
// `app/[lang]/` NO produce por tanto estas URL.
export const metadata: Metadata = langMetadata('es', '/golden-hour-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "La hora dorada, la hora azul y el cielo nocturno, en una alarma",
  "description": "Cómo poner alarmas para la hora dorada, la hora azul y la noche astronómica en Android, por el ángulo solar en lugar de por una hora de reloj, con la aplicación de alarmas Risetime. Calculado en el dispositivo, sin conexión.",
  "inLanguage": "es",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/es/hora-dorada/"
},
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "inLanguage": "es",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Risetime",
      "item": "https://risetime.app/es/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Alarma de hora dorada",
      "item": "https://risetime.app/es/hora-dorada/"
    }
  ]
}
]

export default function HoraDoradaPage() {
  return (
    <div className="layout-narrow">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <a href="#main-content" className="skip-link">Ir al contenido principal</a>

        <SiteHeader current="/golden-hour-alarm/" lang="es" />

        <div className="page-header">
          <h1>La hora dorada, la hora azul y el cielo nocturno, en una alarma</h1>
          <p className="subtitle">Ajusta el ángulo una vez. La alarma sigue la luz todo el año.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="s-why">
            <h2 id="s-why" className="sr-only">Por qué una alarma a hora fija se pierde la luz</h2>
            <p>Sabes cuándo la luz es bonita. El problema es que se mueve: en Nueva York, el atardecer va de <strong>16:31 el 21 de diciembre</strong> a <strong>20:30 el 21 de junio</strong>. Una alarma a hora fija para la hora dorada es falsa al cabo de dos semanas, e inútil al cabo de un mes.</p>
            <p>Risetime pone una alarma en el <strong>ángulo solar</strong> en lugar de en una hora de reloj — y es el ángulo el que de verdad define esas ventanas.</p>
          </section>

          <section aria-labelledby="s-angles">
            <h2 id="s-angles">La luz, por el ángulo</h2>
            <table className="timing-table" aria-label="La hora dorada, la hora azul y la noche astronómica, por el ángulo solar">
              <thead><tr><th>Lo que buscas</th><th>El sol está…</th><th>En Risetime</th></tr></thead>
              <tbody>
                <tr><td>Hora dorada, por la tarde</td><td>a unos <strong>6° por encima</strong> del horizonte</td><td>un ancla de ángulo solar, <strong>+6° por la tarde</strong></td></tr>
                <tr><td>Hora azul, por la tarde</td><td>entre unos <strong>4° y 6° por debajo del horizonte</strong></td><td><strong>−4° por la tarde</strong>, la ventana continuando hasta −6°</td></tr>
                <tr><td>Hora dorada, por la mañana</td><td>lo mismo, al revés</td><td><strong>+6° por la mañana</strong></td></tr>
                <tr><td>Noche astronómica</td><td><strong>18° por debajo del horizonte</strong></td><td><strong>−18° por la tarde</strong>, y −18° por la mañana para saber cuándo termina</td></tr>
              </tbody>
            </table>
            <p>Las definiciones varían de un fotógrafo a otro; estas son las más habituales. Fija el ángulo con el que trabajas, y la aplicación lo mantiene en cualquier latitud y en cualquier estación — algo que una regla fija, «30 minutos antes del atardecer», no puede hacer, porque la duración del crepúsculo cambia con ambas cosas. En Londres el 21 de junio, +6° cae a las 20:27 y el atardecer a las 21:21: casi una hora de diferencia. En Nueva York la misma tarde, 19:49 y 20:30: cuarenta minutos.</p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/es/sky-menu"
                darkBase="/assets/screenshots/es/sky-menu--dark"
                alt="El cuadro de creación de alarma, con su menú de anclas abierto, listando Exacta, Amanecer, Mediodía, Hora dorada, Atardecer, Hora azul, Cielo nocturno y Nadir."
                width={360}
                height={706}
              />
              <figcaption>Tus propias anclas ocupan su lugar junto al amanecer y al atardecer, en el orden del día.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-make">
            <h2 id="s-make">El ancla, de una vez para siempre</h2>
            <ol>
              <li>Abre <strong>Ajustes → Anclas</strong> y toca <strong>+</strong>.</li>
              <li>Deja el tipo en <strong>Un ángulo solar</strong> y ajusta tu ángulo — un toque sobre el valor para escribirlo, y elige <strong>mañana</strong> o <strong>tarde</strong>.</li>
              <li>Ponle un nombre — <em>Hora dorada</em>, <em>Hora azul</em>, <em>Cielo nocturno</em> —, elige un color y guarda.</li>
              <li>En la pestaña <strong>Alarmas</strong>, pon una alarma sobre ella: en el ancla, o treinta minutos antes para llegar al lugar.</li>
            </ol>
            <p><a href="/es/alarmas/#section-custom" className="content-link">Cómo funcionan las anclas y los desplazamientos</a></p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/es/sky-list"
                darkBase="/assets/screenshots/es/sky-list--dark"
                alt="La lista de alarmas de Risetime con cinco alarmas: 06:45 y 08:10 de lunes a viernes en Exacta; 17:21 el sábado y el domingo, 30 min antes de Hora dorada; 18:58 el sábado y el domingo en Hora azul; y 20:30 el viernes y el sábado en Cielo nocturno."
                width={360}
                height={706}
              />
              <figcaption>Alarmas de reloj para la semana, alarmas solares para la luz.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-week">
            <h2 id="s-week">Una semana de trabajo, y la luz el fin de semana</h2>
            <p>La mayoría de nosotros no vivimos de la fotografía:</p>
            <table className="timing-table" aria-label="Una semana de alarmas de reloj, y alarmas de fin de semana ancladas a la luz">
              <thead><tr><th>Momento</th><th>Alarma</th><th>Días</th></tr></thead>
              <tbody>
                <tr><td>Despertar</td><td>06:45</td><td>Lun-vie</td></tr>
                <tr><td>Salida al colegio</td><td>08:10</td><td>Lun-vie</td></tr>
                <tr><td>Preparar la mochila</td><td>30 min antes de Hora dorada</td><td>Sáb y dom</td></tr>
                <tr><td>Hora azul</td><td>Hora azul</td><td>Sáb y dom</td></tr>
                <tr><td>Las estrellas</td><td>Cielo nocturno</td><td>Vie y sáb</td></tr>
              </tbody>
            </table>
            <p>Alarmas de reloj para la semana, alarmas solares para la luz — la misma lista, la misma aplicación.</p>
          </section>

          <section aria-labelledby="s-road">
            <h2 id="s-road">De viaje, y lejos de toda cobertura</h2>
            <ul>
              <li><strong>¿De viaje?</strong> Activa la <strong>Actualización automática de ubicación</strong> en Ajustes, y tus alarmas te siguen — un desplazamiento, una nueva ciudad, una costa.</li>
              <li><strong>¿Sin cobertura allí?</strong> Risetime calcula la posición del sol en el teléfono, con una biblioteca astronómica. No tiene <strong>ningún permiso de Internet</strong>, así que no puede depender de una conexión: modo avión, un cañón, un barco — la alarma siempre sabe cuándo llega la luz.</li>
              <li><strong>Ningún rastreo, ninguna cuenta, ninguna publicidad.</strong> Tu ubicación nunca sale del teléfono. <a href="/es/privacidad/" className="content-link">Política de privacidad</a></li>
            </ul>
          </section>

          <section aria-labelledby="s-night">
            <h2 id="s-night">Para el cielo nocturno</h2>
            <p>La noche astronómica es la ventana entre el momento de la tarde y el de la mañana en que el sol está a 18° por debajo del horizonte. Pon un ancla en cada uno de los dos, y tienes los dos extremos de la oscuridad.</p>
            <p>Muy al norte o muy al sur, esta ventana se cierra durante parte del año: en Londres, el sol no alcanza −18° <strong>del 23 de mayo al 21 de julio</strong>. Risetime lo indica en el momento en que creas el ancla, con las fechas de tu propio lugar, y esas noches la alarma permanece en silencio en lugar de sonar a una hora que el cielo nunca produce.</p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/es/sky-night-editor"
                darkBase="/assets/screenshots/es/sky-night-editor--dark"
                alt="El editor de ancla en Un ángulo solar, configurado a −18,0° por la tarde, llamado Cielo nocturno, con la vista previa: Próximo: 20:30. El sol no alcanza este ángulo aquí del 23 de mayo de 2027 al 21 de julio de 2027."
                width={360}
                height={706}
              />
              <figcaption>Un ángulo de −18° por la tarde, y las semanas en las que nunca ocurre.</figcaption>
            </figure>
            <p><strong>Lo que Risetime no hace: la Luna.</strong> Sin salida de luna, sin fase, sin calendario lunar — la aplicación no te dirá cuándo una luna llena borra la Vía Láctea. Hace el sol, y lo hace sin conexión.</p>
          </section>

          <section aria-labelledby="s-price">
            <h2 id="s-price" className="sr-only">Lo que cuesta</h2>
            <p>Risetime es gratis hasta tres alarmas y tres temporizadores — para siempre. ¿Necesitas más? Usa primero esos tres, y comprueba si merece tu apoyo: quienes apoyan tienen alarmas y temporizadores ilimitados, al año o de una vez. Si no, estaré encantado de <a href="mailto:contact@risetime.app">leerte</a>.</p>
          </section>

          <div className="cta-section">
            <h2>No te pierdas nunca más la luz.</h2>
            <a className="play-badge" href="https://play.google.com/apps/testing/com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Unirse a las pruebas abiertas de Risetime en Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Pruebas abiertas</span>
            </a>
            <p className="cta-note">Risetime está en pruebas abiertas: primero te unes a las pruebas y luego instalas desde Play. Sin ese paso, Play puede decirte que la aplicación no está disponible en tu país.</p>
          </div>

        </main>

        <SiteFooter page="/golden-hour-alarm/" lang="es" />
    </div>
  )
}
