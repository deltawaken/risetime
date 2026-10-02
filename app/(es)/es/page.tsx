import type { Metadata } from 'next'
import { langMetadata } from '../../../lib/metadata'
import SiteHeader from '../../../components/SiteHeader'
import ThemedPicture from '../../../components/ThemedPicture'
import SiteFooter from '../../../components/SiteFooter'

// LA PÁGINA DE INICIO ESPAÑOLA, escrita a mano como la francesa (decisión del
// porteur, 2026-09-27). ⚠️ Las cadenas de cabecera viven en content/es/home.md, en
// un solo ejemplar.
export const metadata: Metadata = langMetadata('es', '/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Risetime",
  "alternateName": "Risetime Alarma al amanecer",
  "operatingSystem": "Android",
  "applicationCategory": "UtilitiesApplication",
  "inLanguage": "es",
  "url": "https://risetime.app/es/",
  "description": "Aplicación de alarma al amanecer para Android. Configura tu alarma con el amanecer, el atardecer o el mediodía solar: se desplaza sola, cada día. Sin conexión, sin publicidad.",
  "screenshot": [
    "https://risetime.app/assets/screenshots/alarm-list.png",
    "https://risetime.app/assets/screenshots/alarm-picker.png",
    "https://risetime.app/assets/screenshots/dismiss-screen.png",
    "https://risetime.app/assets/screenshots/settings-screen.png"
  ],
  "featureList": [
    "Alarmas ancladas al amanecer, al atardecer, al mediodía solar o al nadir",
    "Anclas personalizadas: un ángulo solar, una longitud de sombra, una fracción del día o de la noche",
    "Calibración de un ancla, para ajustarse a un horario publicado",
    "Recálculo automático cada día, a medida que las horas del sol se desplazan",
    "Funciona completamente sin conexión — sin permiso de Internet",
    "Ninguna estadística de uso, ningún rastreo, ninguna recopilación de datos",
    "Alarmas celestes y alarmas a hora fija, compatibles juntas",
    "La API de alarma del sistema — sobrevive al modo Doze y a los reinicios",
    "Temporizadores con ciclos en bucle que se mantienen en fase"
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
  "inLanguage": "es",
  "mainEntity": [
    { "@type": "Question", "name": "¿Qué hace Risetime exactamente?",
      "acceptedAnswer": { "@type": "Answer", "text": "Risetime es un despertador que puede atar una alarma a un momento del sol. Configura «30 minutos antes del amanecer» una vez, y la alarma se recalcula cada día para tu ubicación: sigue al sol durante todo el año. También hace las alarmas normales a hora fija, y los temporizadores." } },
    { "@type": "Question", "name": "¿Necesita Risetime una conexión a Internet?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Risetime no tiene ningún permiso de Internet — no puede conectarse, aunque quisiera. Las horas de amanecer y atardecer se calculan en tu dispositivo. Funciona en modo avión, sobre el terreno, en cualquier lugar." } },
    { "@type": "Question", "name": "¿También hace las alarmas normales, a hora fija?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sí. Las alarmas de reloj y las alarmas ancladas al sol viven en la misma lista, y los temporizadores tienen su propia pestaña, con su propio sonido y volumen." } },
    { "@type": "Question", "name": "¿Puedo poner una alarma al alba, a la hora dorada o en plena noche?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sí, por el ángulo solar. Crea un ancla a −6° para el alba civil, +6° por la tarde para la hora dorada, −18° para la noche astronómica, y pon tus alarmas sobre ellas. Donde un ángulo nunca se alcanza durante parte del año, la aplicación lo indica, y la alarma se salta esos días en lugar de sonar a una hora inventada." } },
    { "@type": "Question", "name": "¿Suena la alarma incluso en modo Doze o en ahorro de batería?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sí. Risetime usa la API setAlarmClock de Android — el mismo mecanismo del sistema que el reloj integrado en tu teléfono — y una pantalla de fiabilidad comprueba los permisos que tu teléfono necesita. Las alarmas suenan incluso antes del primer desbloqueo tras un reinicio." } },
    { "@type": "Question", "name": "¿Es gratis Risetime?",
      "acceptedAnswer": { "@type": "Answer", "text": "Gratis hasta tres alarmas y tres temporizadores, para siempre. ¿Necesitas más? Usa primero esos tres, y comprueba si merece tu apoyo: quienes apoyan tienen alarmas y temporizadores ilimitados, al año o de una vez." } }
  ]
}
]

const PLAY = "https://play.google.com/store/apps/details?id=com.deltawaken.risetime"
const PlayBadge = () => (
  <a className="play-badge" href={PLAY} target="_blank" rel="noopener" aria-label="Consigue Risetime en Google Play">
    <span className="badge-main">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
      Google Play
    </span>
    <span className="badge-sub">Disponible ya</span>
  </a>
)

export default function InicioPage() {
  return (
    <div className="landing">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <a href="#main-content" className="skip-link">Ir al contenido principal</a>

        <SiteHeader current="/" lang="es" />

        <main id="main-content">

          <section className="hero" aria-labelledby="hero-heading">
            <h1 id="hero-heading"><span className="hero-brand">Risetime</span> <span className="hero-sep" aria-hidden="true">&mdash;</span> alarmas y temporizadores.</h1>
            <p className="hero-celestial">Puede seguir al sol.</p>
            <p className="hero-sub">Alarmas al amanecer y al atardecer donde estés, que se desplazan con las estaciones — o a una hora fija. Y temporizadores que pueden funcionar en bucle.</p>
            <div className="hero-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/es/alarm-list"
                darkBase="/assets/screenshots/es/alarm-list--dark"
                alt="Lista de alarmas de Risetime con cinco alarmas: 5:10 el sábado en Alba astronómica, un ancla personalizada; 7:00 de lunes a viernes, una hora fija; 7:02 mañana en Amanecer; 17:38 de lunes a viernes, 1 h antes de Atardecer; y 23:02 hoy, 8 h antes de Amanecer, apagada."
                width={360}
                height={706}
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="cta-group">
              <PlayBadge />
            </div>
          </section>

          <section className="how-it-works" aria-labelledby="how-heading">
            <h2 id="how-heading">Cómo funciona la alarma al amanecer</h2>
            <ol className="steps" role="list">
              <li><strong>Elige tu ancla</strong><span>Un evento celeste: amanecer, mediodía solar, atardecer o nadir. Es el punto de referencia que seguirá tu alarma.</span></li>
              <li><strong>Ajusta tu desplazamiento</strong><span>Cuánto tiempo antes, o después. Treinta minutos antes del amanecer. Una hora después del atardecer. Y los días en que se repite.</span></li>
              <li><strong>Eso es todo</strong><span>Risetime recalcula la hora exacta cada día. El amanecer se desliza con las estaciones — tu alarma lo sigue. No vuelves a tocarla nunca más.</span></li>
            </ol>
          </section>

          <section className="features" aria-labelledby="features-heading">
            <h2 id="features-heading">Qué hace la aplicación Risetime</h2>
            <div className="feature-grid">
              <article className="feature-card">
                <h3>Anclada al día</h3>
                <p>Configura tus alarmas en relación con el amanecer, el mediodía solar, el atardecer o el nadir, con el desplazamiento que quieras. La hora se recalcula cada día para mantenerse en fase con el cielo real. Configurada una vez, simplemente correcta todo el año.</p>
              </article>
              <article className="feature-card">
                <h3>Sin conexión, y privada por diseño</h3>
                <p>Risetime no tiene el permiso de Internet. No desactivado: ausente. Las horas de amanecer se calculan en tu dispositivo, mediante algoritmos astronómicos integrados. Ningún servidor, ninguna cuenta, ningún dato que salga de tu teléfono.</p>
              </article>
              <article className="feature-card">
                <h3>Configúrala, y olvídate</h3>
                <p>La aplicación recalcula tus horas en segundo plano, cada día. La mayor parte del tiempo, ni siquiera la abres. Es intencional: Risetime está en su mejor momento cuando te olvidas de que existe.</p>
              </article>
              <article className="feature-card">
                <h3>Alarmas de verdad, no notificaciones</h3>
                <p>Risetime usa la misma API del sistema que el reloj integrado en Android. Tu alarma sobrevive al modo Doze, a la optimización de batería y a los reinicios. A la hora prevista, el teléfono suena.</p>
              </article>
              <article className="feature-card">
                <h3>Temporizadores, en la misma aplicación</h3>
                <p>Un teclado, una lista ordenada por duración, y un bucle cuyos ciclos se mantienen en fase — para intervalos, sesiones de entrenamiento y bloques de estudio. <a href="/es/temporizadores/">La guía de los temporizadores</a></p>
              </article>
            </div>
          </section>

          <section className="use-cases" id="uses" aria-labelledby="use-cases-heading">
            <h2 id="use-cases-heading">Qué más puedes hacer con Risetime</h2>
            <p>Quién usa un despertador solar, y qué configura:</p>
            <ul className="use-case-list">
              <li><strong>Un día que sigue al sol</strong> — levantarte con el amanecer, bajar el ritmo antes del atardecer, y mantener alarmas a hora fija para las horas que los demás esperan de ti. <a href="/es/alarma-ritmo-circadiano/">Alarma de ritmo circadiano para Android</a></li>
              <li><strong>Fotógrafos y astrónomos</strong> — la hora dorada, la hora azul y la noche astronómica son ángulos del sol, no horas fijas. Fija el ángulo una vez: se mantiene válido en cualquier latitud y estación, sin conexión, sobre el terreno. <a href="/es/hora-dorada/">Hora dorada, hora azul y alarmas de cielo nocturno</a></li>
              <li><strong>Meditación, yoga y una práctica con la primera luz</strong> — el saludo al sol cuando llega la luz, o una sesión antes de ella. Ancla la alarma al amanecer, al alba civil por su ángulo, o a una fracción de la noche. <a href="/es/meditacion-amanecer/">Alarma de meditación y yoga al amanecer</a></li>
              <li><strong>Salir al agua antes de que amanezca</strong> — en el agua antes de la luz, con una alarma que se mueve con la primera luz en lugar de una hora que hay que reajustar cada pocas semanas.</li>
              <li><strong>Madrugadores</strong> — configura tu desplazamiento antes del amanecer una vez, y sigue al amanecer cada día. Consulta tu propio horario para el momento exacto; la alarma es la parte que nunca se desvía.</li>
              <li><strong>Trabajo al aire libre, paseos de perros, granjas</strong> — si tu día empieza con la luz del día, tu alarma también debería.</li>
              <li><strong>Intervalos, sesiones de entrenamiento, bloques de estudio</strong> — temporizadores que se reinician solos, en la misma aplicación. <a href="/es/temporizadores/">Temporizadores de cuenta atrás repetible</a></li>
              <li><strong>Cualquiera cansado de reajustar durante todo el año</strong> — configúrala una vez. Se mantiene correcta. <a href="/es/alarmas/">Cómo poner una alarma al amanecer o al atardecer en Android</a></li>
            </ul>
          </section>

          <section className="screenshots" aria-labelledby="screenshots-heading">
            <h2 id="screenshots-heading">Capturas de pantalla — la aplicación de alarmas solares para Android</h2>
            <div className="screenshot-row">
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/es/alarm-picker"
                  darkBase="/assets/screenshots/es/alarm-picker--dark"
                  alt="El cuadro de creación de alarma de Risetime, abierto sobre la lista de alarmas: el botón de ancla con el icono de Mediodía, un desplazamiento de menos 1 hora y 00 minutos con el campo de las horas seleccionado, y la línea Mañana: 11:49. Un disco de horas circular con el 1 seleccionado ocupa la mitad inferior, con Cancelar y OK debajo."
                  width={360}
                  height={706}
                />
                <figcaption>Elige el ancla y el desplazamiento</figcaption>
              </figure>
              <figure>
                {/* ⛔ UN <picture> ORDINAIRE, PAS <ThemedPicture> — et c'est la vérité du
                                  produit, pas une simplification : DANS L'APP, L'ÉCRAN D'ARRÊT NE SUIT
                                  PAS LE THÈME (porteur, 2026-09-28). Son fond est calculé depuis la
                                  couleur solaire de l'instant, en clair comme en sombre.
                                  ⚠️ Il a porté une fausse variante `--dark` jusqu'au 2026-09-28 : les
                                     deux fichiers différaient, mais la SEULE différence était l'encart
                                     système « Viewing full screen » qui polluait les captures — donc le
                                     bug lui-même. Sans lui, ils sont identiques, comme ils le sont
                                     déjà en anglais. */}
                <picture>
                  <source srcSet={`/assets/screenshots/es/dismiss-screen.webp 1x, /assets/screenshots/es/dismiss-screen@2x.webp 2x`} type="image/webp" />
                  <img src="/assets/screenshots/es/dismiss-screen.png" alt="La pantalla de descarte de Risetime para una alarma que está sonando, llena de borde a borde de un rosa viejo tomado de la posición del sol: la hora 17:30, la fecha jueves, 1 de octubre, la palabra Alarma, un gran botón circular POSPONER, y DESCARTAR debajo." width={360} height={706} loading="lazy" decoding="async" />
                </picture>
                <figcaption>Un despertar suave</figcaption>
              </figure>
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/es/settings-screen"
                  darkBase="/assets/screenshots/es/settings-screen--dark"
                  alt="La pantalla de ajustes de Risetime, con las líneas Alarmas, Anclas, Temporizadores, Ajustes del teléfono, y Ubicación de eventos celestiales, que indica London, Reino Unido. La línea Fiabilidad indica (8/8) y está desplegada, con las filas plegadas Todo correcto (8) y Comprobaciones sin efecto en este teléfono. Apoyando Risetime figura debajo, y el pie de página indica Risetime."
                  width={360}
                  height={706}
                />
                <figcaption>Una fiabilidad que puedes comprobar</figcaption>
              </figure>
            </div>
          </section>

          <section className="privacy-callout" aria-labelledby="privacy-heading">
            <h2 id="privacy-heading">Sin conexión, sin Internet, sin rastreo</h2>
            <div className="callout-box">
              <p>Risetime no solicita el permiso de Internet. No hay servidor. No hay ninguna cuenta que crear. No hay ninguna herramienta de medición que observe cómo usas la aplicación.</p>
              <ul>
                <li>Sin permiso <code>INTERNET</code> — la aplicación no puede conectarse</li>
                <li>Ninguna estadística de uso, ningún informe de fallos, ninguna telemetría</li>
                <li>Ninguna cuenta, ninguna sincronización, ninguna conexión</li>
                <li>La ubicación permanece en tu dispositivo — solo se usa para el cálculo solar</li>
                <li>Ninguna publicidad, ningún rastreo, ningún dato compartido con nadie</li>
              </ul>
              <a href="/es/privacidad/" className="privacy-link">Leer la política de privacidad</a>
            </div>
          </section>

          <section className="support" aria-labelledby="support-heading">
            <h2 id="support-heading">Gratis hasta tres alarmas. Ilimitada apoyando.</h2>
            <div className="callout-box" style={{"borderInlineStartColor": "var(--muted)"}}>
              <p>Risetime es gratis hasta tres alarmas y tres temporizadores — para siempre. <br />¿Necesitas más? Usa primero esos tres, y comprueba si merece tu apoyo: quienes apoyan tienen alarmas y temporizadores ilimitados, al año o de una vez. Si no, estaré encantado de <a href="mailto:contact@risetime.app">leerte</a>. Lo encuentras en Ajustes.</p>
              <p style={{"marginBottom": "0"}}>Ninguna pantalla de insistencia, ninguna cuenta atrás, ningún «mejora para continuar». Solo una propuesta honesta, cuando estés listo.</p>
            </div>
          </section>

          <section className="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading">Preguntas frecuentes</h2>
            <dl className="faq-list">
              <dt>¿Qué hace Risetime exactamente?</dt>
              <dd>Risetime es un despertador que puede atar una alarma a un momento del sol. Configura «30 minutos antes del amanecer» una vez, y la alarma se recalcula cada día para tu ubicación: sigue al sol durante todo el año. También hace las alarmas normales a hora fija, y los temporizadores.</dd>
              <dt>¿Necesita Risetime una conexión a Internet?</dt>
              <dd>No. Risetime no tiene ningún permiso de Internet — no puede conectarse, aunque quisiera. Las horas de amanecer y atardecer se calculan en tu dispositivo. Funciona en modo avión, sobre el terreno, en cualquier lugar.</dd>
              <dt>¿También hace las alarmas normales, a hora fija?</dt>
              <dd>Sí. Las alarmas de reloj y las alarmas ancladas al sol viven en la misma lista, y los temporizadores tienen su propia pestaña, con su propio sonido y volumen.</dd>
              <dt>¿Puedo poner una alarma al alba, a la hora dorada o en plena noche?</dt>
              <dd>Sí, por el ángulo solar. Crea un ancla a −6° para el alba civil, +6° por la tarde para la hora dorada, −18° para la noche astronómica, y pon tus alarmas sobre ellas. Donde un ángulo nunca se alcanza durante parte del año, la aplicación lo indica, y la alarma se salta esos días en lugar de sonar a una hora inventada.</dd>
              <dt>¿Suena la alarma incluso en modo Doze o en ahorro de batería?</dt>
              <dd>Sí. Risetime usa la API <code>setAlarmClock</code> de Android — el mismo mecanismo del sistema que el reloj integrado en tu teléfono — y una pantalla de fiabilidad comprueba los permisos que tu teléfono necesita. Las alarmas suenan incluso antes del primer desbloqueo tras un reinicio.</dd>
              <dt>¿Es gratis Risetime?</dt>
              <dd>Gratis hasta tres alarmas y tres temporizadores, para siempre. ¿Necesitas más? Usa primero esos tres, y comprueba si merece tu apoyo: quienes apoyan tienen alarmas y temporizadores ilimitados, al año o de una vez.</dd>
            </dl>
          </section>

          <section className="final-cta" aria-labelledby="cta-heading">
            <h2 id="cta-heading">¿Listo para levantarte con el sol?</h2>
            <PlayBadge />
          </section>

        </main>

        <SiteFooter page="/" lang="es" />
    </div>
  )
}
