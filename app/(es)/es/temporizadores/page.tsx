import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// LA PÁGINA DE TEMPORIZADORES ESPAÑOLA, ESCRITA A MANO — decisión del porteur
// del 2026-09-27: una página traducida lleva TODO lo que lleva la inglesa, sus
// capturas y sus datos estructurados incluidos, en el mismo lado que ella: el JSX.
//
// ⚠️ SUS CADENAS DE CABECERA VIVEN EN content/es/timers.md, en UN solo
// ejemplar. `langMetadata` lee ahí título, descripción y og, añade el
// canonical ESPAÑOL (/es/temporizadores/, derivado del `slug:`) y los
// hreflang. ⛔ LA CLAVE pasada aquí sigue siendo la de la página INGLESA,
// `/timers/`: es la identidad de la página, no su URL.
//
// ⛔ `es` está en `STATIC_LOCALES` (lib/pages.ts): la ruta dinámica
// `app/[lang]/` NO produce por tanto esta URL.
//
// Vocabulario ya decidido, y no es negociable: la cosa se llama un
// «temporizador en bucle», el casillero se llama «bucle» (msgid Loop) y sus
// vueltas son «ciclos». ⛔ Bucle ≠ Repetir: «Repetir» (msgid Repeat) es la
// recurrencia por días de una alarma, no el bucle del temporizador; y
// «Posponer» (el aplazamiento de una alarma que suena) es una tercera noción.
export const metadata: Metadata = langMetadata('es', '/timers/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Un temporizador que vuelve a empezar solo",
  "description": "El temporizador en bucle de Risetime: una duración, reiniciada a intervalo fijo, cuyos ciclos se mantienen en fase, con un botón Detener el bucle para acabar con ella — y los temporizadores normales que cualquier reloj sabe hacer.",
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
  "mainEntityOfPage": "https://risetime.app/es/temporizadores/"
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
      "name": "Temporizadores",
      "item": "https://risetime.app/es/temporizadores/"
    }
  ]
}
]

export default function TemporizadoresPage() {
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

        <SiteHeader current="/timers/" lang="es" />

        <div className="page-header">
          <h1>Un temporizador que vuelve a empezar solo</h1>
          <p className="subtitle">Ajusta la duración una vez, y sigue — además de todo lo que ya sabe hacer el temporizador de un reloj.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-loop">
            <h2 id="section-loop">Vuelve a empezar solo</h2>
            <p>Esta es la parte que el reloj de tu teléfono probablemente no sabe hacer. Abre la fila de un temporizador con la flecha y marca <strong>bucle</strong>: se convierte en un <strong>temporizador en bucle</strong>. Llega a cero, suena brevemente, y vuelve a empezar con la misma duración, hasta que detengas el bucle. Lo que ajustas una vez es el intervalo entre dos sonerías.</p>
            <p>Cada ciclo se ancla al momento en que el anterior <em>llegaba a su fin</em>, y no al momento en que lo silenciaste: dos ciclos de treinta minutos son sesenta minutos, no sesenta y uno. De lo contrario, cada sonería que se deja sonar desplazaría el resto del día entero.</p>

            <div className="highlight-box">
              <p>Por defecto, un ciclo suena durante <strong>cinco segundos</strong>, con el sonido de notificación de tu sistema en lugar de un sonido de alarma. Los dos son tuyos. No hay una opción «nunca» para esta duración: una sonería sin fin bloquearía el bucle desde su primer ciclo.</p>
            </div>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/es/timer-list"
                darkBase="/assets/screenshots/es/timer-list--dark"
                alt="Lista de temporizadores de Risetime con tres filas: 3:00 y 10:00, ambas detenidas, cada una con un botón de reproducción y un botón de reinicio atenuado, y 24:45 en curso, con un icono rosa de bucle, un botón de pausa y un botón +1:00. Las pestañas Alarmas, Temporizadores y Ajustes recorren la parte inferior de la pantalla."
                width={360}
                height={706}
              />
              <figcaption>Tres temporizadores, ordenados por duración. La pastilla rosa señala el que está configurado en bucle.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-ending">
            <h2 id="section-ending">Detener el bucle</h2>
            <p>Un bucle se detiene con un botón llamado <strong>Detener el bucle</strong>: en la pantalla de sonería, y también en la notificación de sonería, junto a <strong>Continuar</strong> y al botón que añade tiempo.</p>
            <p>Desmarcar <strong>bucle</strong> mientras un temporizador está sonando te deja un ciclo más antes de que se detenga: el ajuste se lee una vez por ciclo, en el momento en que empieza la sonería.</p>
            <p>La pantalla de sonería aparece en cada ciclo y se cierra sola al cabo de los cinco segundos — nada que tocar, nada que descartar entre dos ciclos.</p>
          </section>

          <section aria-labelledby="section-ordinary">
            <h2 id="section-ordinary">Y los temporizadores normales</h2>
            <p>El resto es lo que ya sabe hacer el temporizador de un reloj. Toca el más y obtendrás un teclado a pantalla completa en lugar de un disco: escribe los dígitos, se rellenan por la derecha, como en un microondas. Cuatro, cero, cero da cuatro minutos, y seis dígitos te llevan hasta <strong>noventa y nueve horas</strong>.</p>
            <p>Los temporizadores ocupan su lugar en una lista ordenada por la duración para la que se configuraron, el más corto primero, y no por el orden en que los creaste. Funcionan en paralelo — varias cuentas atrás independientes a la vez, repetibles o no.</p>
            <p>Cada fila lleva la pausa, y un botón <strong>+1:00</strong> que añade tiempo a lo que queda — un minuto, salvo que lo cambies en Ajustes. Pon un temporizador en pausa y ese botón se convierte en un reinicio. La flecha abre la fila sobre <strong>bucle</strong> y sobre la eliminación.</p>
          </section>

          <section aria-labelledby="section-notification">
            <h2 id="section-notification">La notificación cuenta sola</h2>
            <p>La cuenta atrás de tu panel de notificaciones la dibuja el propio Android, y no la repinta la aplicación. Sigue avanzando sin ningún proceso de Risetime en marcha.</p>
            <p>Hay una tarjeta para lo que está en marcha o en pausa, y otra para lo que está sonando — exactamente dos, nunca una por temporizador apilándose en el panel.</p>
            <p>Deslizar esa tarjeta no detiene nada: vuelve enseguida, reconstruida a partir del estado real, y un temporizador que suena sigue sonando. Detenerlo siempre pasa por un botón, deliberadamente.</p>
          </section>

          <section aria-labelledby="section-settings">
            <h2 id="section-settings">Su propio sonido, su propio volumen</h2>
            <p>Los temporizadores no toman prestados los ajustes de tus alarmas, y un temporizador en bucle tampoco toma prestados los del temporizador de una sola vez: dos perfiles, elegidos según si la casilla bucle está marcada o no. Cada uno lleva su sonido, su volumen, su duración de sonería y su aumento de volumen opcional.</p>
            <p>Las dos duraciones de sonería están en escalas deliberadamente distintas. En bucle: <strong>5, 10, 15, 30, 60 o 120 segundos</strong>. Para un temporizador de una sola vez: <strong>1, 5, 10, 15, 20 o 25 minutos, o nunca</strong>.</p>
            <p>Ningún sonido viene incluido con la aplicación: los sonidos son los de tu sistema, o un archivo propio. Dos ajustes se mantienen comunes en lugar de duplicarse — si los temporizadores vibran, y qué hacen los botones de volumen mientras un temporizador suena.</p>
          </section>

          <section aria-labelledby="section-not">
            <h2 id="section-not">Lo que no hará</h2>
            <p>Es una cuenta atrás y un bucle, nada más:</p>
            <ul>
              <li><strong>Sin alternancia trabajo/descanso.</strong> Un bucle solo tiene una duración; treinta segundos de esfuerzo y treinta de recuperación son dos, y ninguna pantalla compone un temporizador a partir de varios.</li>
              <li><strong>Sin recordatorio a mitad de una sesión</strong> — una meditación de treinta minutos no puede sonar a los diez y a los veinte.</li>
              <li><strong>Sin franja horaria, sin horas de silencio.</strong> Un bucle corre hasta que la detienes.</li>
              <li><strong>Sin sonería a la hora en punto.</strong> La cuenta empieza en el momento en que lo pusiste en marcha.</li>
            </ul>
          </section>

          <section aria-labelledby="section-setup">
            <h2 id="section-setup">Configurar uno</h2>
            <p>Abre la pestaña Temporizadores, toca el más, escribe la duración. Empieza solo — nada que nombrar, nada que clasificar. Para que vuelva a empezar solo, marca <strong>bucle</strong> tras la flecha.</p>
            <p>La <a href="/es/alarmas/" className="content-link">guía de alarmas</a> trata las alarmas, que comparten los mismos ajustes de fiabilidad.</p>
          </section>

          <section aria-labelledby="section-price">
            <h2 id="section-price" className="sr-only">Lo que cuesta</h2>
            <p>Risetime es gratis hasta tres temporizadores, con la misma cuenta que sus alarmas — para siempre. Una vez alcanzado, el botón de añadir simplemente no está: sin cuadro de diálogo, sin candado, sin aviso que nombre lo que te falta. Si tu apoyo se detiene, no se elimina nada: cada temporizador que creaste sigue funcionando, solo que ya no puedes añadir más. ¿Necesitas más de tres? Comprueba si merece tu apoyo — si no, estaré encantado de <a href="mailto:contact@risetime.app">leerte</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Ajusta la duración una vez. Mantiene el ritmo.</h2>
            <a className="play-badge" href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Consigue Risetime en Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Disponible ya</span>
            </a>
          </div>

        </main>

        <SiteFooter page="/timers/" lang="es" />
    </div>
  )
}
