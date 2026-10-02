import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// LA PÁGINA ESPAÑOLA, ESCRITA A MANO — decisión del porteur del 2026-09-27:
// « on ne fait plus de markdown […] tu vas juste bien gentiment tout traduire
// toi-même ». Traducción de app/(en)/circadian-rhythm-alarm/page.tsx, línea a
// línea: mismas secciones, mismos `id`, mismas capturas, mismos datos
// estructurados.
//
// ⚠️ SUS CADENAS DE CABECERA VIVEN EN content/es/circadian-rhythm-alarm.md, en
// UN solo ejemplar. La clave pasada a `langMetadata` sigue siendo la página
// INGLESA: es la identidad de la página, no su dirección.
//
// ⛔ NINGUNA ALEGACIÓN DE SALUD. La página inglesa ya fue reescrita una vez
// para quitarlas. El ritmo circadiano se DESCRIBE — lo que hace el sol, lo que
// calcula la aplicación — no se cura.
export const metadata: Metadata = langMetadata('es', '/circadian-rhythm-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Alarma de ritmo circadiano para Android: una alarma anclada al amanecer",
  "description": "Cómo poner una alarma de Android con el amanecer, y el resto de tu día en torno al sol, con la aplicación de alarma Risetime. La alarma se desplaza sola con las estaciones; las horas se calculan en el dispositivo, sin ningún permiso de Internet.",
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
  "mainEntityOfPage": "https://risetime.app/es/alarma-ritmo-circadiano/"
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
      "name": "Alarma de ritmo circadiano",
      "item": "https://risetime.app/es/alarma-ritmo-circadiano/"
    }
  ]
}
]

export default function AlarmaRitmoCircadianoPage() {
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

        <SiteHeader current="/circadian-rhythm-alarm/" lang="es" />

        <div className="page-header">
          <h1>Alarma de ritmo circadiano para Android: una alarma anclada al amanecer</h1>
          <p className="subtitle">Se desplaza sola con las estaciones.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-what">
            <h2 id="section-what" className="sr-only">Qué es una alarma de ritmo circadiano</h2>
            <p>«Alarma de ritmo circadiano» es como se llama a una alarma atada al sol en lugar de al reloj. La palabra viene del ciclo de unas 24 horas del cuerpo; en una tienda de aplicaciones, simplemente significa que la alarma sigue al amanecer en lugar de quedarse en una hora fija.</p>
            <p>En Risetime, el momento del sol que eliges se llama <strong>ancla</strong> — el amanecer, el mediodía solar, el atardecer — y la distancia que mantienes respecto a él es el <strong>desplazamiento</strong>.</p>
          </section>

          <section aria-labelledby="section-swing">
            <h2 id="section-swing">Cuánto se desplaza el amanecer a lo largo del año</h2>
            <table className="timing-table" aria-label="Cuánto se desplaza el amanecer entre junio y diciembre, por ciudad">
              <thead>
                <tr><th>Ciudad</th><th>Amanecer más temprano</th><th>Amanecer más tardío</th><th>Amplitud</th></tr>
              </thead>
              <tbody>
                <tr><td>Londres</td><td>04:43 (21 de junio)</td><td>08:03 (21 de dic.)</td><td>3 h 20</td></tr>
                <tr><td>París</td><td>05:46 (21 de junio)</td><td>08:41 (21 de dic.)</td><td>2 h 55</td></tr>
                <tr><td>Tokio</td><td>04:25 (21 de junio)</td><td>06:47 (21 de dic.)</td><td>2 h 20</td></tr>
                <tr><td>Chicago</td><td>05:15 (21 de junio)</td><td>07:14 (21 de dic.)</td><td>2 h 00</td></tr>
                <tr><td>Sídney</td><td>05:41 (21 de dic.)</td><td>06:00 (21 de junio)</td><td>1 h 20</td></tr>
              </tbody>
            </table>
            <p>Hora local, 2027, calculada con la biblioteca astronómica que usa la aplicación.</p>
            <p>Una alarma fija a las 06:30 en Londres suena entonces <strong>1 h 47 después del amanecer en junio</strong>, y <strong>1 h 33 antes de él en diciembre</strong>. La misma alarma, dos mañanas distintas.</p>
          </section>

          <section aria-labelledby="section-how">
            <h2 id="section-how">Cómo poner una alarma con el ritmo circadiano</h2>
            <ol>
              <li>En la pestaña <strong>Alarmas</strong>, toca <strong>+</strong>.</li>
              <li>En el menú superior, elige <strong>Amanecer</strong>.</li>
              <li>Deja el disco donde está para levantarte con el amanecer, o gíralo hasta la distancia que quieras — 30 minutos antes, una hora antes.</li>
              <li>Toca <strong>OK</strong>. Luego abre la alarma en la lista y marca <strong>Repetir</strong> para elegir tus días.</li>
            </ol>
            <p>La distancia que ajustas no cambia nunca. El amanecer, en cambio, cambia, y la alarma va con él — a través de los equinoccios, los solsticios y el cambio de hora. <a href="/es/alarmas/" className="content-link">Cómo poner una alarma al amanecer o al atardecer</a></p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/es/circadian-list"
                darkBase="/assets/screenshots/es/circadian-list--dark"
                alt="Lista de alarmas de Risetime con tres alarmas, las tres con Todos los días: 7:02 en Amanecer, 20:38 a 2 h después de Atardecer, y 23:02 a 8 h antes de Amanecer."
                width={360}
                height={706}
              />
              <figcaption>Alarmas ancladas al amanecer y al atardecer, repetidas cada día.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-day">
            <h2 id="section-day">Un día que sigue al sol — y un reloj</h2>
            <p>Este es el día que vivo de verdad, en mi propio teléfono:</p>
            <table className="timing-table" aria-label="Un día hecho de alarmas ancladas al sol y alarmas de reloj">
              <thead>
                <tr><th>Momento</th><th>Alarma</th><th>Días</th></tr>
              </thead>
              <tbody>
                <tr><td>El amanecer</td><td>Amanecer</td><td>lun.–vie.</td></tr>
                <tr><td>El inicio del trabajo, o levantarse el fin de semana</td><td>09:00</td><td>todos los días</td></tr>
                <tr><td>El almuerzo</td><td>1 h antes de Mediodía — el mediodía solar, casi nunca las 12:00</td><td>todos los días</td></tr>
                <tr><td>Se retoma</td><td>1 h después de Mediodía</td><td>lun.–vie.</td></tr>
                <tr><td>Se para</td><td>18:00</td><td>lun.–vie.</td></tr>
              </tbody>
            </table>
            <p>Hay una sexta, ocho horas antes del amanecer, para empezar a bajar el ritmo. Está apagada por ahora — la posición del medio del interruptor conserva una alarma sin dejarla sonar.</p>
            <p>Son seis alarmas, una de ellas apagada — más que las tres gratuitas.</p>
            <p>Las ancladas al sol siguen la luz; las de reloj mantienen lo que los demás esperan de ti. Las dos viven en la misma lista, y cada tarjeta dice cuál es cuál.</p>
            <p>Hasta dónde llega esto depende de dónde vivas. En Sídney, el amanecer se desplaza alrededor de una hora a lo largo del año, y un día anclado al sol apenas se desvía allí. En Londres, se desplaza más de tres horas: la mañana sigue entonces al sol, mientras que las horas de trabajo se quedan en el reloj.</p>
          </section>

          <section aria-labelledby="section-late">
            <h2 id="section-late">Cuando el amanecer llega demasiado tarde</h2>
            <p>En pleno invierno, el amanecer llega después de que empiece la jornada de trabajo — 08:03 en Londres el 21 de diciembre. Dos formas de resolverlo:</p>
            <ul>
              <li><strong>Levantarte con las primeras luces, mejor.</strong> La luz llega mucho antes que el sol. En Ajustes → Anclas, crea tu propia ancla al <strong>alba civil</strong> — el momento en que hay luz suficiente para ver fuera sin linterna — y pon tu alarma sobre ella. <a href="/es/alarmas/#section-custom" className="content-link">Anclas por ángulo solar y por crepúsculo</a></li>
              <li><strong>Mantén los dos tipos de alarma</strong>, como arriba: el reloj para los días que empiezan a hora fija, el sol para el resto.</li>
            </ul>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/es/circadian-offset"
                darkBase="/assets/screenshots/es/circadian-offset--dark"
                alt="El cuadro de creación de alarma configurado en Amanecer con un desplazamiento de menos 8 horas y 00 minutos, el disco de las horas en 8, y la línea Hoy: 23:02."
                width={360}
                height={706}
              />
              <figcaption>Cualquier distancia respecto al ancla, antes o después, hasta 11 h 59 min.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-privacy">
            <h2 id="section-privacy">Una alarma, no un seguimiento del sueño</h2>
            <p>Risetime no rastrea tu sueño. No registra el momento en que detienes una alarma, no tiene cuenta, ni nube, ni ninguna herramienta de medición. No tiene <strong>ningún permiso de Internet</strong>: el propio sistema operativo le impide por tanto conectarse. Las horas de amanecer se calculan en tu teléfono, y tu ubicación nunca lo abandona. Por eso también funciona en modo avión, en un valle, en un barco. <a href="/es/privacidad/" className="content-link">Política de privacidad</a></p>
            <p>Risetime es gratis hasta tres alarmas y tres temporizadores — para siempre. ¿Necesitas más? Usa primero esos tres, y comprueba si merece tu apoyo: quienes apoyan tienen alarmas y temporizadores ilimitados, al año o de una vez. Si no, estaré encantado de <a href="mailto:contact@risetime.app">leerte</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Levántate con el sol. Guarda el reloj para el resto.</h2>
            <a className="play-badge" href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Consigue Risetime en Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Disponible ya</span>
            </a>
          </div>

        </main>

        <SiteFooter page="/circadian-rhythm-alarm/" lang="es" />
    </div>
  )
}
