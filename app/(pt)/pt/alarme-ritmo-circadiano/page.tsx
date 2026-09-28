import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// A PÁGINA PORTUGUESA, ESCRITA À MÃO — decisão do porteur de 2026-09-27:
// "on ne fait plus de markdown […] tu vas juste bien gentiment tout traduire
// toi-même". Tradução de app/(en)/circadian-rhythm-alarm/page.tsx, linha a
// linha: mesmas seções, mesmos `id`, mesmas capturas, mesmos dados
// estruturados.
//
// ⚠️ SUAS STRINGS DE CABEÇALHO VIVEM EM content/pt/circadian-rhythm-alarm.md,
// em UM exemplar. A chave passada a `langMetadata` continua sendo a página
// INGLESA: é a identidade da página, não seu endereço.
//
// ⛔ NENHUMA ALEGAÇÃO DE SAÚDE. A página inglesa já foi reescrita uma vez para
// retirá-las. O ritmo circadiano se DESCREVE — o que o sol faz, o que o
// aplicativo calcula — ele não se trata.
export const metadata: Metadata = langMetadata('pt', '/circadian-rhythm-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Alarme de ritmo circadiano para Android: um alarme ancorado ao nascer do sol",
  "description": "Como programar um alarme Android para o nascer do sol, e o resto do seu dia em torno do sol, com o aplicativo despertador Risetime. O alarme se ajusta sozinho com as estações; os horários são calculados no aparelho, sem nenhuma permissão de internet.",
  "inLanguage": "pt-BR",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/pt/alarme-ritmo-circadiano/"
},
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "inLanguage": "pt-BR",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Risetime",
      "item": "https://risetime.app/pt/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Alarme de ritmo circadiano",
      "item": "https://risetime.app/pt/alarme-ritmo-circadiano/"
    }
  ]
}
]

export default function PaginaAlarmeRitmoCircadiano() {
  return (
    <div className="layout-narrow">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <a href="#main-content" className="skip-link">Ir para o conteúdo principal</a>

        <SiteHeader current="/circadian-rhythm-alarm/" lang="pt" />

        <div className="page-header">
          <h1>Alarme de ritmo circadiano para Android: um alarme ancorado ao nascer do sol</h1>
          <p className="subtitle">Ele se ajusta sozinho com as estações.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-what">
            <h2 id="section-what" className="sr-only">O que é um alarme de ritmo circadiano</h2>
            <p>"Alarme de ritmo circadiano" é como se chama um alarme ligado ao sol em vez do relógio. A palavra vem do ciclo de cerca de 24 horas do corpo; em uma loja de aplicativos, ela só quer dizer que o alarme acompanha o nascer do sol em vez de ficar em um horário fixo.</p>
            <p>No Risetime, o momento do sol que você escolhe se chama uma <strong>âncora</strong> — o nascer, o meio-dia solar, o pôr — e a distância que você mantém dela é o <strong>deslocamento</strong>.</p>
          </section>

          <section aria-labelledby="section-swing">
            <h2 id="section-swing">O quanto o nascer do sol se desloca ao longo do ano</h2>
            <table className="timing-table" aria-label="O quanto o nascer do sol se desloca entre junho e dezembro, por cidade">
              <thead>
                <tr><th>Cidade</th><th>Nascer mais cedo</th><th>Nascer mais tarde</th><th>Amplitude</th></tr>
              </thead>
              <tbody>
                <tr><td>Londres</td><td>04:43 (21 de jun.)</td><td>08:03 (21 de dez.)</td><td>3 h 20</td></tr>
                <tr><td>Paris</td><td>05:46 (21 de jun.)</td><td>08:41 (21 de dez.)</td><td>2 h 55</td></tr>
                <tr><td>Tóquio</td><td>04:25 (21 de jun.)</td><td>06:47 (21 de dez.)</td><td>2 h 20</td></tr>
                <tr><td>Chicago</td><td>05:15 (21 de jun.)</td><td>07:14 (21 de dez.)</td><td>2 h 00</td></tr>
                <tr><td>Sydney</td><td>05:41 (21 de dez.)</td><td>06:00 (21 de jun.)</td><td>1 h 20</td></tr>
              </tbody>
            </table>
            <p>Horário local, 2027, calculado com a biblioteca astronômica que o aplicativo usa.</p>
            <p>Um alarme fixo às 06:30 em Londres toca então <strong>1 h 47 depois do nascer do sol em junho</strong>, e <strong>1 h 33 antes dele em dezembro</strong>. O mesmo alarme, duas manhãs diferentes.</p>
          </section>

          <section aria-labelledby="section-how">
            <h2 id="section-how">Como ajustar um alarme para o ritmo circadiano</h2>
            <ol>
              <li>Na aba <strong>Alarmes</strong>, toque em <strong>+</strong>.</li>
              <li>No menu de cima, escolha <strong>Nascer do sol</strong>.</li>
              <li>Deixe o mostrador onde está para acordar ao nascer do sol, ou gire-o até a distância que você quiser — 30 minutos antes, uma hora antes.</li>
              <li>Toque em <strong>OK</strong>. Depois abra o alarme na lista e marque <strong>Repetir</strong> para escolher seus dias.</li>
            </ol>
            <p>A distância que você ajusta nunca muda. O nascer do sol, esse, muda, e o alarme acompanha — pelos equinócios, solstícios e mudanças de horário. <a href="/pt/alarmes/" className="content-link">Ajustar um alarme para o nascer ou o pôr do sol</a></p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pt/circadian-list"
                darkBase="/assets/screenshots/pt/circadian-list--dark"
                alt="Lista de alarmes do Risetime com três alarmes, todos repetidos todos os dias: 07:02 ao nascer do sol, 20:38 duas horas depois do pôr do sol, e 23:02 oito horas antes do nascer do sol."
                width={360}
                height={706}
              />
              <figcaption>Alarmes ancorados ao nascer e ao pôr do sol, repetidos todos os dias.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-day">
            <h2 id="section-day">Um dia que acompanha o sol — e um relógio</h2>
            <p>Este é o dia que eu realmente vivo, no meu próprio telefone:</p>
            <table className="timing-table" aria-label="Um dia feito de alarmes ancorados no sol e alarmes de relógio">
              <thead>
                <tr><th>Momento</th><th>Alarme</th><th>Dias</th></tr>
              </thead>
              <tbody>
                <tr><td>Acordar</td><td>Nascer do sol</td><td>seg.–sex.</td></tr>
                <tr><td>Início do trabalho, ou acordar no fim de semana</td><td>09:00</td><td>todos os dias</td></tr>
                <tr><td>O almoço</td><td>1 h antes de Meio-dia — o meio-dia solar, raramente 12:00</td><td>todos os dias</td></tr>
                <tr><td>Voltamos</td><td>1 h depois de Meio-dia</td><td>seg.–sex.</td></tr>
                <tr><td>Paramos</td><td>18:00</td><td>seg.–sex.</td></tr>
              </tbody>
            </table>
            <p>Há um sexto, oito horas antes do nascer do sol, para começar a desacelerar. Ele está desativado por enquanto — a posição do meio do interruptor mantém um alarme sem deixá-lo tocar.</p>
            <p>São seis alarmes, um deles desativado — mais que os três gratuitos.</p>
            <p>Os que estão ancorados no sol acompanham a luz; os de relógio mantêm o que os outros esperam de você. Os dois vivem na mesma lista, e cada cartão diz qual é qual.</p>
            <p>Até onde isso vai depende de onde você mora. Em Sydney, o nascer do sol se desloca cerca de uma hora ao longo do ano, e um dia ancorado no sol quase não se desvia ali. Em Londres, ele se desloca mais de três horas: a manhã então acompanha o sol, enquanto o horário de trabalho fica no relógio.</p>
          </section>

          <section aria-labelledby="section-late">
            <h2 id="section-late">Quando o nascer do sol chega tarde demais</h2>
            <p>No auge do inverno, o nascer do sol chega depois do início do dia de trabalho — 08:03 em Londres em 21 de dezembro. Duas formas de resolver isso:</p>
            <ul>
              <li><strong>Acorde com a primeira luz, em vez disso.</strong> A luz chega bem antes do sol. Em Configurações → Âncoras, crie sua própria âncora na <strong>aurora civil</strong> — o momento em que já há luz suficiente para ver do lado de fora sem lanterna — e ajuste seu alarme para ela. <a href="/pt/alarmes/#section-custom" className="content-link">Âncoras por ângulo solar e por crepúsculo</a></li>
              <li><strong>Mantenha os dois tipos de alarme</strong>, como acima: o relógio para os dias que começam em horário fixo, o sol para o resto.</li>
            </ul>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pt/circadian-offset"
                darkBase="/assets/screenshots/pt/circadian-offset--dark"
                alt="A caixa de diálogo de novo alarme ajustada para o nascer do sol com um deslocamento de oito horas antes, o mostrador das horas em 8 e o dos minutos em 00, e a linha Hoje: 23:02."
                width={360}
                height={706}
              />
              <figcaption>Qualquer distância em relação à âncora, antes ou depois, até 11 h 59 min.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-privacy">
            <h2 id="section-privacy">Um alarme, não um monitoramento de sono</h2>
            <p>O Risetime não monitora seu sono. Ele não registra o momento em que você descarta um alarme, não tem conta, não tem nuvem e nenhuma ferramenta de medição. Ele não tem <strong>nenhuma permissão de internet</strong>: o próprio sistema operacional o impede, portanto, de se conectar. Os horários de nascer do sol são calculados no seu telefone, e sua localização nunca o deixa. É também por isso que ele funciona no modo avião, em um vale, em um barco. <a href="/pt/privacidade/" className="content-link">Política de privacidade</a></p>
            <p>O Risetime é gratuito para até três alarmes e três timers — para sempre. Precisa de mais? Use esses três primeiro, e veja se vale a pena o seu apoio: quem apoia tem alarmes e timers sem limite, por ano ou de uma vez. Se não, terei o maior prazer em <a href="mailto:contact@risetime.app">ler o que você escrever</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Acorde com o sol. Mantenha o relógio para o resto.</h2>
            <a className="play-badge" href="https://play.google.com/apps/testing/com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Entrar no teste aberto do Risetime no Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Teste aberto</span>
            </a>
            <p className="cta-note">O Risetime está em teste aberto: você primeiro entra no teste, depois instala pela Play. Sem essa etapa, a Play pode dizer que o aplicativo não está disponível no seu país.</p>
          </div>

        </main>

        <SiteFooter page="/circadian-rhythm-alarm/" lang="pt" />
    </div>
  )
}
