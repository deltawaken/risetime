import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// LA PÁGINA ESPAÑOLA, ESCRITA A MANO — decisión del porteur del 2026-09-27:
// « on ne fait plus de markdown […] tu vas juste bien gentiment tout traduire
// toi-même ». Una página traducida lleva TODO lo que lleva la inglesa, su
// mobiliario incluido, en el mismo lado que ella: el JSX.
//
// ⚠️ SUS CADENAS DE CABECERA VIVEN EN content/es/alarms.md, en UN solo
// ejemplar, igual que la francesa las toma de content/fr/. `langMetadata` lee
// ahí título, descripción y og, añade el canonical ESPAÑOL y los hreflang, y
// pone `noindex` en el build de preview.
//
// ⛔ LA CLAVE DE PÁGINA SIGUE SIENDO LA INGLESA, `/alarms/` — es el
// identificador de la página en el registro (lib/pages.ts), no una URL. El
// slug español `alarmas` vive en la cabecera de content/es/alarms.md, y es él
// quien construye la URL.
//
// ⛔ `es` está en `STATIC_LOCALES` (lib/pages.ts): la ruta dinámica
// `app/[lang]/` NO produce por tanto estas URL.
export const metadata: Metadata = langMetadata('es', '/alarms/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Cómo poner una alarma al amanecer o al atardecer en Android",
  "description": "Cómo poner una alarma de Android en el amanecer, el atardecer, el mediodía solar o un ángulo solar que elijas, con un desplazamiento como «1 hora antes del atardecer», con Risetime. La alarma sigue al sol cada día, sin conexión.",
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
  "mainEntityOfPage": "https://risetime.app/es/alarmas/"
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
      "name": "Alarmas",
      "item": "https://risetime.app/es/alarmas/"
    }
  ]
}
]

export default function AlarmasPage() {
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

        <SiteHeader current="/alarms/" lang="es" />

        <div className="page-header">
          <h1>Cómo poner una alarma al amanecer o al atardecer en Android</h1>
          <p className="subtitle">Una alarma de Risetime se configura como cualquier otra, en unos segundos. Lo que cambia es aquello sobre lo que puedes configurarla.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-intro">
            <h2 id="section-intro" className="sr-only">Alarmas que siguen al sol</h2>
            <p>En lugar de una hora de reloj, puedes configurar una alarma con un momento del sol — el amanecer, el atardecer, el mediodía solar. La alarma sigue después ese momento cada día, a medida que las estaciones lo desplazan.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/es/alarms-list"
                darkBase="/assets/screenshots/es/alarms-list--dark"
                alt="Lista de alarmas de Risetime con cinco alarmas: 5:10 el sábado en Alba astronómica, un ancla personalizada; 7:00 de lunes a viernes, una hora fija; 7:02 mañana en Amanecer; 17:38 de lunes a viernes, 1 h antes de Atardecer; y 23:02 hoy, 8 h antes de Amanecer, apagada."
                width={360}
                height={706}
              />
              <figcaption>Alarmas normales y alarmas solares, en una sola lista.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-regular">
            <h2 id="section-regular">Poner una alarma normal</h2>
            <ol>
              <li>En la pestaña <strong>Alarmas</strong>, toca <strong>+</strong>.</li>
              <li>Ajusta la hora en el disco, o escríbela.</li>
              <li>Toca <strong>OK</strong>.</li>
            </ol>
            <p>Ya tienes una alarma normal, y no necesita nada más.</p>
          </section>

          <section aria-labelledby="section-sun">
            <h2 id="section-sun">Poner una alarma al amanecer o al atardecer</h2>
            <p>Risetime conoce de entrada cuatro momentos del sol: el <strong>Amanecer</strong>, el <strong>Atardecer</strong>, <strong>Mediodía</strong> — el mediodía solar, cuando el sol está más alto, lo que casi nunca son las 12:00 — y el <strong>Nadir</strong>, la mitad de la noche, cuando el sol está más bajo.</p>
            <ol>
              <li>
                <strong>La primera vez, indica tu ubicación.</strong> Las horas solares dependen del lugar en el que estás. Sin ubicación, el cuadro de la alarma muestra simplemente <em>Configurar ubicación en Ajustes</em>.
                <details>
                  <summary>Tres formas de indicarla</summary>
                  <p>En <strong>Ajustes → Ubicación de eventos celestiales</strong>: elige tu ciudad en la lista; o usa el GPS del teléfono, una vez; o activa la <strong>Actualización automática de ubicación</strong>, y te sigue de viaje. Tu ubicación permanece en tu teléfono: Risetime no tiene ningún permiso de Internet, así que no hay ningún sitio al que enviarla.</p>
                  <figure className="content-screenshot">
                    <ThemedPicture
                      lightBase="/assets/screenshots/es/alarms-location"
                      darkBase="/assets/screenshots/es/alarms-location--dark"
                      alt="Los ajustes de Risetime, con la sección Ubicación de eventos celestiales abierta: London, Reino Unido seleccionado, un botón de localización, y una casilla Actualización automática de ubicación sin marcar."
                      width={360}
                      height={706}
                    />
                    <figcaption>El ajuste de ubicación, con su botón de GPS y su casilla de actualización automática.</figcaption>
                  </figure>
                </details>
              </li>
              <li>En la pestaña <strong>Alarmas</strong>, toca <strong>+</strong>.</li>
              <li>En el menú superior, elige <strong>Amanecer</strong>, <strong>Atardecer</strong>, <strong>Mediodía</strong> o <strong>Nadir</strong>.</li>
              <li>En el disco, ajusta cuánto tiempo antes o después debe sonar la alarma — o deja <em>Sin desplazamiento</em>.</li>
              <li>Toca <strong>OK</strong>.</li>
            </ol>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/es/alarms-anchor-menu"
                darkBase="/assets/screenshots/es/alarms-anchor-menu--dark"
                alt="El cuadro de creación de alarma, con su menú de anclas abierto: Exacta (marcada), Alba astronómica, Amanecer, Mediodía, Hora dorada, Atardecer y Nadir."
                width={360}
                height={706}
              />
              <figcaption>El menú en lo alto del cuadro de la alarma: una hora de reloj, o un momento del sol.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-offset">
            <h2 id="section-offset">El desplazamiento: «1 hora antes del atardecer»</h2>
            <p><strong>Un ancla es un momento del sol que Risetime recalcula cada día; tu alarma se mantiene a una distancia fija de él.</strong> Esa distancia es el desplazamiento, hasta 11 h 59 min antes o después. El momento solar se mueve un poco cada día; el desplazamiento que elegiste, nunca.</p>
            <ul>
              <li><strong>Amanecer</strong>, sin desplazamiento — con la primera luz.</li>
              <li><strong>30 min antes del Amanecer</strong> — de pie antes de que salga el sol.</li>
              <li><strong>1 h antes del Atardecer</strong> — una alarma de fin de día que te deja tiempo para salir mientras aún hay luz.</li>
              <li><strong>8 h antes del Amanecer</strong> — <a href="/es/alarma-ritmo-circadiano/" className="content-link">un recordatorio para acostarte que sigue al sol</a>.</li>
            </ul>
            <p>Una línea bajo el disco anuncia la próxima sonería, por ejemplo <em>Mañana: 18:03</em>.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/es/alarms-offset"
                darkBase="/assets/screenshots/es/alarms-offset--dark"
                alt="El cuadro de creación de alarma configurado en Atardecer con un desplazamiento de menos 1 hora y 00 minutos, el disco de las horas en 1, y la línea Hoy: 17:38."
                width={360}
                height={706}
              />
              <figcaption>Una hora antes del atardecer. La línea bajo el desplazamiento indica cuándo sonará.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-days">
            <h2 id="section-days">Días de repetición, sonido y duración de posposición</h2>
            <p>Abre la tarjeta de la alarma en la lista. Marca <strong>Repetir</strong> y elige tus días: la tarjeta se lee entonces como la dirías tú — <em>De lunes a viernes, 1 h antes de Atardecer</em>. La misma tarjeta lleva la etiqueta, el sonido, la vibración, la duración de posposición y la imagen mostrada mientras suena. El interruptor tiene tres posiciones: la del medio omite solo la próxima sonería — para un día libre — y deja la alarma activa.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/es/alarms-card"
                darkBase="/assets/screenshots/es/alarms-card--dark"
                alt="Una tarjeta de alarma abierta para las 17:38, de lunes a viernes, 1 h antes de Atardecer: un campo Nombre vacío, Repetir marcado con los días L, M, X, J y V seleccionados y S y D sin marcar, y Sonido en Predeterminado del teléfono. La tarjeta continúa bajo el borde de la imagen."
                width={360}
                height={706}
              />
              <figcaption>Una tarjeta de alarma abierta: los días de repetición, y todo lo demás de la alarma.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-custom">
            <h2 id="section-custom">Anclas personalizadas: crepúsculos, ángulos solares, sombras</h2>
            <p>El sol marca muchos más momentos de los que puede haber cuatro. Puedes crear los tuyos, de tres tipos:</p>
            <ul>
              <li><strong>Un ángulo solar</strong> — el momento en que el sol alcanza una altura determinada por encima o por debajo del horizonte, por la mañana o por la tarde. −6° es el alba o el crepúsculo civil; −12°, náutico; −18°, astronómico: la noche plena. +6° por la tarde es una luz baja y cálida.</li>
              <li><strong>Una longitud de sombra</strong> — el momento en que la sombra de un objeto alcanza un múltiplo determinado de su altura, antes o después del mediodía.</li>
              <li><strong>Una fracción del día o de la noche</strong> — la noche (del atardecer al amanecer) o el día, divididos en partes iguales; eliges cuántas, y qué límite. El último sexto de la noche, por ejemplo, empieza en el mismo punto de la noche sea cual sea su duración en esa estación.</li>
            </ul>
            <p>Para crear una:</p>
            <ol>
              <li>Abre <strong>Ajustes → Anclas</strong>, y toca <strong>+</strong>.</li>
              <li>Elige el tipo, y ajusta su valor.</li>
              <li>Ponle un nombre, o conserva el que se propone.</li>
              <li>Elige un color — <strong>Guardar</strong> espera uno.</li>
              <li>Toca <strong>Guardar</strong>.</li>
            </ol>
            <p>A partir de ahora aparece en el cuadro de la alarma, junto al amanecer y al atardecer, y admite un desplazamiento como cualquier otra. Un interruptor en la lista de anclas retira de este menú las que no uses.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/es/alarms-anchors"
                darkBase="/assets/screenshots/es/alarms-anchors--dark"
                alt="Los ajustes, sección Anclas desplegada, con un botón + : Alba astronómica, Amanecer, Mediodía, Hora dorada, Atardecer y Nadir. Solo Alba astronómica y Hora dorada, las anclas personalizadas, tienen activos los botones de edición y de eliminación; cada fila lleva un interruptor de visibilidad, todos activados."
                width={360}
                height={706}
              />
              <figcaption>Un ancla personalizada ocupa su lugar entre las demás, en el orden del día.</figcaption>
            </figure>

            <p>Un ancla también puede <strong>calibrarse</strong> — desplazada hasta 30 minutos, para ajustarse a un horario que sigas, como un calendario local.</p>
            <p>Lejos del ecuador, algunos ángulos nunca se alcanzan durante parte del año. El editor te da las fechas — en Londres, el sol no baja a −18° desde finales de mayo hasta finales de julio — y esos días, la alarma permanece en silencio en lugar de sonar a una hora inventada.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/es/alarms-anchor-editor"
                darkBase="/assets/screenshots/es/alarms-anchor-editor--dark"
                alt="El editor Editar ancla en Un ángulo solar, con 18,0° y el icono de la mañana, llamado Alba astronómica, con la vista previa Próximo: 5:10. El sol no alcanza este ángulo aquí del 23 de mayo de 2027 al 21 de julio de 2027, y un aviso en rojo dice No se alcanza todos los días en esta latitud."
                width={360}
                height={706}
              />
              <figcaption>−18° por la mañana, configurado para Londres: el editor nombra las semanas en las que eso nunca ocurre.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-calculation">
            <h2 id="section-calculation">Cómo se calculan las horas de amanecer y atardecer, sin conexión</h2>
            <p>Cada hora de amanecer y atardecer se calcula en el dispositivo mediante una biblioteca astronómica, <a href="https://shredzone.org/maven/commons-suncalc/" className="content-link">commons-suncalc</a>, basada en las <em>Astronomical Algorithms</em> de Jean Meeus. El amanecer y el atardecer se miden por el borde superior del sol, refracción atmosférica incluida — lo que ven tus ojos; los ángulos solares, por el centro del sol, la convención de las tablas de crepúsculo. Ninguna solicitud en la web, ningún servidor: esto funciona en modo avión, en el mar, o en un valle sin cobertura.</p>
            <p>Risetime no se ejecuta todo el tiempo. Recalcula tras una sonería, en una breve comprobación cada pocas horas, o cuando el teléfono se reinicia, cambia de hora o de zona horaria; la alarma del sistema de Android — la misma que usa el reloj integrado en tu teléfono — hace el resto.</p>
          </section>

          <section aria-labelledby="section-reliability">
            <h2 id="section-reliability">Asegurarte de que suena</h2>
            <p>Algunos teléfonos detienen las aplicaciones en segundo plano para ahorrar batería, y eso puede silenciar cualquier alarma. <strong>Ajustes → Fiabilidad</strong> comprueba lo que tu teléfono necesita y ofrece un botón <strong>Arreglar</strong> para cada elemento que falte. Tras un reinicio, las alarmas suenan incluso antes de que hayas desbloqueado el teléfono por primera vez.</p>
          </section>

          <section aria-labelledby="section-timers">
            <h2 id="section-timers">También hay temporizadores</h2>
            <p>La pestaña <strong>Temporizadores</strong> reúne las cuentas atrás, incluidas las que se reinician solas para intervalos y bloques de estudio: <a href="/es/temporizadores/" className="content-link">cómo funcionan los temporizadores repetibles</a>.</p>
            <p>Risetime es gratis hasta tres alarmas y tres temporizadores — para siempre. ¿Necesitas más? Usa primero esos tres, y comprueba si merece tu apoyo: quienes apoyan tienen alarmas y temporizadores ilimitados, al año o de una vez. Si no, estaré encantado de <a href="mailto:contact@risetime.app">leerte</a>.</p>
          </section>

          <section aria-labelledby="section-guides">
            <h2 id="section-guides">Guías por uso</h2>
            <ul>
              <li><a href="/es/alarma-ritmo-circadiano/" className="content-link">Un ritmo de despertar y de acostarse que sigue al amanecer</a></li>
              <li><a href="/es/hora-dorada/" className="content-link">Hora dorada, hora azul y cielo nocturno, para fotógrafos y astrónomos</a></li>
              {/* Add the Muslim prayer times and morning practice guides here once those pages are published. */}
            </ul>
          </section>

          <div className="cta-section">
            <h2>Configúrala una vez. Sigue al sol.</h2>
            <a className="play-badge" href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Consigue Risetime en Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Disponible ya</span>
            </a>
          </div>

        </main>

        <SiteFooter page="/alarms/" lang="es" />
    </div>
  )
}
