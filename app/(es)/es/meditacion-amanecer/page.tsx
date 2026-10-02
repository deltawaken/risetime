import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// LA PÁGINA ESPAÑOLA, ESCRITA A MANO — decisión del porteur del 2026-09-27:
// una página traducida lleva TODO lo que lleva la inglesa, su mobiliario
// incluido, en el mismo lado que ella: el JSX.
//
// ⚠️ SUS CADENAS DE CABECERA VIVEN EN content/es/sunrise-meditation-alarm.md,
// en UN solo ejemplar, igual que la francesa las toma de content/fr/.
// `langMetadata` lee ahí título, descripción y og, añade el canonical
// ESPAÑOL y los hreflang, y pone `noindex` en el build de preview.
//
// ⛔ LA CLAVE SIGUE SIENDO LA RUTA INGLESA `/sunrise-meditation-alarm/`: es la
// identidad de la página, común a todos los idiomas. El slug español vive en
// la cabecera.
//
// ⛔ Página secular: no se nombra ninguna tradición (decisión del porteur del
// 2026-09-24 por la noche). Las etiquetas de la aplicación siguen siendo
// astronómicas.
export const metadata: Metadata = langMetadata('es', '/sunrise-meditation-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "inLanguage": "es",
  "headline": "Una práctica matutina que empieza con la luz",
  "description": "Cómo poner una alarma de Android para meditación o yoga con el amanecer, con el alba civil o náutica por su ángulo solar, o con una fracción de la noche, con la aplicación de alarmas Risetime. Calculado en el dispositivo, sin conexión.",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/es/meditacion-amanecer/"
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
      "name": "Alarma de meditación y yoga",
      "item": "https://risetime.app/es/meditacion-amanecer/"
    }
  ]
}
]

export default function MeditacionAmanecerPage() {
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

        <SiteHeader current="/sunrise-meditation-alarm/" lang="es" />

        <div className="page-header">
          <h1>Una práctica que empieza con la luz, no con un número</h1>
          <p className="subtitle">Ajusta el desplazamiento una vez; es la luz la que se mueve.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="s-why">
            <h2 id="s-why" className="sr-only">Por qué la primera luz no es una hora de reloj</h2>
            <p>Una práctica que empieza con la luz no empieza con un número. La primera luz se desplaza a lo largo del año, y también dentro de un mismo huso horario: el 21 de junio, el sol sale a las <strong>06:01 en Mumbai</strong> y a las <strong>05:08 en Varanasi</strong>: cincuenta y tres minutos de diferencia, en el mismo reloj.</p>
            <p>Risetime pone una alarma en un momento del sol en lugar de en una hora de reloj. Ese momento es un <strong>ancla</strong>, la distancia que mantienes con él, un <strong>desplazamiento</strong>.</p>
          </section>

          <section aria-labelledby="s-names">
            <h2 id="s-names">Cuatro formas de nombrar la primera luz</h2>
            <table className="timing-table" aria-label="Cuatro formas de nombrar la primera luz, y qué creas en Risetime">
              <thead><tr><th>Lo que buscas</th><th>Dónde está el sol</th><th>En Risetime</th></tr></thead>
              <tbody>
                <tr><td>El amanecer</td><td>el disco despega del horizonte</td><td>el ancla integrada <strong>Amanecer</strong></td></tr>
                <tr><td>El alba civil</td><td><strong>6° por debajo</strong> del horizonte</td><td>un ancla por ángulo solar, <strong>−6° por la mañana</strong></td></tr>
                <tr><td>El alba náutica</td><td><strong>12° por debajo</strong></td><td><strong>−12° por la mañana</strong></td></tr>
                <tr><td>Un punto dentro de la noche</td><td>una parte del camino del atardecer al amanecer</td><td>un ancla <strong>División</strong>: Noche, en <em>N</em> partes</td></tr>
              </tbody>
            </table>
            <p>Las definiciones varían; estas son las más habituales. La aplicación mantiene la que fijas en cualquier latitud y en cualquier estación — algo que un «cuarenta y cinco minutos antes del amanecer» fijo no puede hacer, ya que la duración del alba cambia con una y con otra.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/es/practice-list"
                darkBase="/assets/screenshots/es/practice-list--dark"
                alt="Lista de alarmas de Risetime con cuatro alarmas, todas con Todos los días: 5:29 en Última parte de la noche, 5:50 en Alba náutica, 6:29 en Alba civil, y 7:02 en Amanecer."
                width={360}
                height={706}
              />
              <figcaption>Las cuatro filas de la tabla, cada una convertida en alarma.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-sunrise">
            <h2 id="s-sunrise">Poner la práctica con el amanecer</h2>
            <ol>
              <li>En la pestaña <strong>Alarmas</strong>, toca <strong>+</strong>.</li>
              <li>En el menú superior, elige <strong>Amanecer</strong>.</li>
              <li>Deja el disco en el centro para sonar con el amanecer, o gíralo hasta la distancia que quieras, hasta <strong>11 h 59 min</strong> en un sentido u otro.</li>
              <li>Toca <strong>OK</strong>, y luego abre la alarma en la lista y marca <strong>Repetir</strong>.</li>
            </ol>
            <p>Y la alarma que piden los madrugadores es la otra: <strong>una alarma para irse a dormir</strong>, no para despertar. Ponla sobre el ancla <strong>Atardecer</strong> con un desplazamiento, en repetición — los mismos cuatro pasos. <a href="/es/alarmas/" className="content-link">Cómo poner una alarma al amanecer o al atardecer</a></p>
          </section>

          <section aria-labelledby="s-angle">
            <h2 id="s-angle">Antes del sol: el alba por su ángulo</h2>
            <ol>
              <li>Abre <strong>Ajustes → Anclas</strong> y toca <strong>+</strong> (aparece en cuanto se despliega la sección).</li>
              <li>Deja el tipo en <strong>Un ángulo solar</strong>. Escribe <strong>−6°</strong> para el alba civil o <strong>−12°</strong> para el alba náutica, dirección <strong>mañana</strong>. Se mueve de una décima de grado en una décima, entre −30° y +30°.</li>
              <li>Ponle un nombre, <strong>elige un color</strong> — sin color, no se guardará — y guarda.</li>
              <li>En la pestaña <strong>Alarmas</strong>, pon una alarma sobre ella.</li>
            </ol>
            <p>Muy al norte o muy al sur, el sol nunca baja tanto durante parte del año. El editor lo indica en el momento en que creas el ancla — <em>«El sol no alcanza este ángulo aquí, del X al Y»</em>, con tus propias fechas — y esos días la alarma permanece en silencio en lugar de sonar en un momento que el cielo nunca produjo. Nada se inventa.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/es/practice-angle-editor"
                darkBase="/assets/screenshots/es/practice-angle-editor--dark"
                alt="El editor Editar ancla en Un ángulo solar, con 6,0° y el icono de la mañana, llamado Alba civil, con la vista previa Próximo: 6:29. Avanzado está plegado y Guardar arriba a la derecha."
                width={360}
                height={706}
              />
              <figcaption>El alba civil como un ángulo: seis grados por debajo del horizonte, por la mañana.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-night">
            <h2 id="s-night">Una fracción de la noche</h2>
            <p>Puedes fijar la mañana sobre la noche en lugar de sobre el alba: un punto situado en una parte determinada de la oscuridad.</p>
            <ol>
              <li><strong>Ajustes → Anclas → +</strong>, y cambia la forma a <strong>Una fracción del día o de la noche</strong>.</li>
              <li>Ámbito <strong>Noche</strong>, luego el <strong>Número de partes</strong> y la <strong>posición</strong> — de 2 a 48 partes, cualquier límite dentro.</li>
              <li>Ponle un nombre, elige un color, guarda. Un borrador nuevo se titula <strong>Noche · 1/15</strong>; sigue lo que ajustes.</li>
              <li>Pon una alarma sobre ella.</li>
            </ol>
            <p>La noche, aquí, es exactamente una cosa: <strong>de un atardecer al amanecer siguiente</strong>, dividida en partes iguales. Dentro de los círculos polares, esa noche puede no existir; el ancla no tiene entonces nada que dividir, y la aplicación lo indica — sin el rango de fechas que da la forma por ángulo, que esta forma no tiene. ¿Te ajustas a un horario publicado? <strong>Avanzado → Desplazar N minutos</strong> mueve un ancla que hayas creado, hasta treinta minutos en un sentido u otro.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/es/practice-division-editor"
                darkBase="/assets/screenshots/es/practice-division-editor--dark"
                alt="El editor Editar ancla en Una fracción del día o de la noche, con Noche seleccionado, Número de partes en 8 y Posición en 7/8, llamado Última parte de la noche, con la vista previa Próximo: 5:29."
                width={360}
                height={706}
              />
              <figcaption>La noche dividida en ocho partes, la alarma en la última.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-not">
            <h2 id="s-not">Lo que Risetime no hace</h2>
            <p>Sus propias etiquetas siguen siendo astronómicas — <em>Amanecer</em>, <em>un ángulo solar</em>, <em>Noche · 1/15</em> — mientras que el nombre que escribes es el tuyo. Es un despertador, nada más:</p>
            <ul>
              <li><strong>Ninguna señal a mitad de una sesión</strong> — ninguna pantalla fabrica un temporizador a partir de varios, así que una meditación de treinta minutos no puede sonar a los diez y a los veinte.</li>
              <li><strong>Ningún sonido de meditación, nada guiado.</strong> Suena; tú la detienes.</li>
              <li><strong>Nada lunar</strong> — Risetime no calcula la Luna: ni fase, ni fecha lunar.</li>
              <li><strong>Ningún seguimiento del sueño, ninguna cuenta, sin nube, ningún permiso de Internet</strong> — tu ubicación nunca sale del teléfono. <a href="/es/privacidad/" className="content-link">Política de privacidad</a></li>
            </ul>
            <p><a href="/es/alarmas/#section-custom" className="content-link">Cómo funcionan las anclas y los desplazamientos</a></p>
          </section>

          <section aria-labelledby="s-price">
            <h2 id="s-price" className="sr-only">Lo que cuesta</h2>
            <p>Risetime es gratis hasta tres alarmas y tres temporizadores — para siempre. ¿Necesitas más? Usa primero esos tres, y comprueba si merece tu apoyo: quienes apoyan tienen alarmas y temporizadores ilimitados, al año o de una vez. Si no, estaré encantado de <a href="mailto:contact@risetime.app">leerte</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Empieza con la luz.</h2>
            <a className="play-badge" href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Consigue Risetime en Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Disponible ya</span>
            </a>
          </div>

        </main>

        <SiteFooter page="/sunrise-meditation-alarm/" lang="es" />
    </div>
  )
}
