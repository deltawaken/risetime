import type { Metadata } from 'next'
import { langMetadata } from '../../../lib/metadata'
import SiteHeader from '../../../components/SiteHeader'
import ThemedPicture from '../../../components/ThemedPicture'
import SiteFooter from '../../../components/SiteFooter'

// A PÁGINA INICIAL PORTUGUESA, escrita à mão como a inglesa (porteur, 2026-09-27).
// ⚠️ As strings de cabeçalho vivem em content/pt/home.md, em um único exemplar.
export const metadata: Metadata = langMetadata('pt', '/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Risetime",
  "alternateName": "Risetime Despertador de nascer do sol",
  "operatingSystem": "Android",
  "applicationCategory": "UtilitiesApplication",
  "inLanguage": "pt-BR",
  "url": "https://risetime.app/pt/",
  "description": "Despertador de nascer do sol para Android. Ajuste seu alarme para o nascer do sol, o pôr do sol ou o meio-dia solar: ele se ajusta sozinho, todos os dias. Offline, sem anúncios.",
  /* ⛔ As mesmas quatro capturas de tela da inglesa, e são as que esta página JÁ
     EXIBE no corpo. Elas mostram o app em inglês: o banco de capturas ainda não
     sabe produzir uma série por idioma. No dia em que souber, essas quatro URLs
     mudam aqui E no corpo. */
  "screenshot": [
    "https://risetime.app/assets/screenshots/alarm-list.png",
    "https://risetime.app/assets/screenshots/alarm-picker.png",
    "https://risetime.app/assets/screenshots/dismiss-screen.png",
    "https://risetime.app/assets/screenshots/settings-screen.png"
  ],
  /* As nove entradas da inglesa, na mesma ordem. ⛔ Os nomes dos ajustes vêm do
     .po e de nenhum outro lugar — "Um ângulo solar", "Um comprimento de sombra",
     "Uma fração do dia ou da noite", "Meio-dia solar", "Nadir", "Calibração" —
     e "ciclos" para o timer que recomeça sozinho.
     ⚠️ Nunca "repetição"/"repetível" aqui: no app, "Repetir" é o mesmo termo usado para os
     dias de recorrência de um alarme. */
  "featureList": [
    "Alarmes ancorados ao nascer do sol, ao pôr do sol, ao meio-dia solar ou ao nadir",
    "Âncoras sob medida: um ângulo solar, um comprimento de sombra, uma fração do dia ou da noite",
    "A calibração de uma âncora, para se ajustar a um horário publicado",
    "Um recálculo automático todos os dias, à medida que os horários do sol mudam",
    "Funciona totalmente offline — nenhuma permissão de internet",
    "Nenhuma medição de audiência, nenhum rastreamento, nenhuma coleta de dados",
    "Alarmes celestes e alarmes de horário fixo, tratados juntos",
    "A API de alarme do sistema — ela sobrevive ao modo Doze e a reinicializações",
    "Timers de contagem regressiva cujos ciclos permanecem em fase"
  ],
  /* ⛔ "Deltawaken", palavra por palavra como a inglesa, e a URL junto: dois nomes
     para uma única organização quebram a reconciliação de entidade.
     ⚠️ O rodapé mantém "A. Deltawaken" — é uma assinatura humana, não um
     identificador de editor. */
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
  "inLanguage": "pt-BR",
  "mainEntity": [
    { "@type": "Question", "name": "O que o Risetime faz, exatamente?",
      "acceptedAnswer": { "@type": "Answer", "text": "O Risetime é um despertador que pode vincular um alarme a um momento do sol. Ajuste \"30 minutos antes do nascer do sol\" uma vez, e o alarme se recalcula todos os dias para o seu local: ele acompanha o sol o ano todo. Ele também faz os alarmes comuns de horário fixo, e os timers." } },
    { "@type": "Question", "name": "O Risetime precisa de conexão com a internet?",
      "acceptedAnswer": { "@type": "Answer", "text": "Não. O Risetime não tem nenhuma permissão de internet — ele não consegue se conectar, mesmo que quisesse. Os horários de nascer e pôr do sol são calculados no seu aparelho. Ele funciona no modo avião, em campo, em qualquer lugar." } },
    { "@type": "Question", "name": "Ele também faz os alarmes comuns, de horário fixo?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sim. Os alarmes de relógio e os alarmes ancorados ao sol vivem na mesma lista, e os timers têm sua própria aba, com seu som e volume." } },
    { "@type": "Question", "name": "Posso ajustar um alarme para a aurora, a hora dourada ou a noite escura?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sim, pelo ângulo solar. Crie uma âncora a −6° para a aurora civil, +6° à noite para a hora dourada, −18° para a noite astronômica, e ajuste seus alarmes nelas. Onde um ângulo nunca é alcançado durante parte do ano, o aplicativo avisa, e o alarme pula esses dias em vez de tocar em um horário inventado." } },
    { "@type": "Question", "name": "O alarme ainda toca no modo Doze ou na economia de bateria?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sim. O Risetime usa a API setAlarmClock do Android — o mesmo mecanismo do sistema usado pelo relógio que já vem no seu telefone — e uma tela de Confiabilidade verifica as permissões que o seu telefone precisa. Os alarmes tocam mesmo antes do primeiro desbloqueio depois de uma reinicialização." } },
    { "@type": "Question", "name": "O Risetime é gratuito?",
      "acceptedAnswer": { "@type": "Answer", "text": "Gratuito para até três alarmes e três timers, para sempre. Precisa de mais? Use esses três primeiro, e veja se vale a pena o seu apoio: quem apoia tem alarmes e timers sem limite, por ano ou de uma vez." } }
  ]
}
]

const PLAY = "https://play.google.com/store/apps/details?id=com.deltawaken.risetime"
const PlayBadge = () => (
  <a className="play-badge" href={PLAY} target="_blank" rel="noopener" aria-label="Baixe o Risetime no Google Play">
    <span className="badge-main">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
      Google Play
    </span>
    <span className="badge-sub">Disponível agora</span>
  </a>
)

export default function PaginaInicial() {
  return (
    <div className="landing">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <a href="#main-content" className="skip-link">Ir para o conteúdo principal</a>

        <SiteHeader current="/" lang="pt" />

        <main id="main-content">

          <section className="hero" aria-labelledby="hero-heading">
            <h1 id="hero-heading"><span className="hero-brand">Risetime</span> <span className="hero-sep" aria-hidden="true">&mdash;</span> alarmes e timers.</h1>
            <p className="hero-celestial">Ele pode acompanhar o sol.</p>
            <p className="hero-sub">Alarmes no nascer e no pôr do sol onde você estiver, acompanhando as estações — ou em horário fixo. E timers que podem rodar em ciclo.</p>
            <div className="hero-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pt/alarm-list"
                darkBase="/assets/screenshots/pt/alarm-list--dark"
                alt="Lista de alarmes do Risetime com cinco alarmes: 05:10 no sábado, Aurora astronômica; 07:00 de segunda-feira a sexta-feira, um horário fixo; 07:02 amanhã, Nascer do sol; 17:38 de seg a sex, 1 h antes de Pôr do sol; e 23:02 hoje, 8 h antes de Nascer do sol, desativado. As abas Alarmes, Timers e Configurações ficam na parte inferior."
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
            <h2 id="how-heading">Como funciona o alarme de nascer do sol</h2>
            <ol className="steps" role="list">
              <li><strong>Escolha sua âncora</strong><span>Um evento celeste: nascer do sol, meio-dia solar, pôr do sol ou nadir. É o ponto de referência que seu alarme vai acompanhar.</span></li>
              <li><strong>Ajuste seu deslocamento</strong><span>Quanto tempo antes, ou depois. Trinta minutos antes do nascer do sol. Uma hora depois do pôr do sol. E os dias em que ele se repete.</span></li>
              <li><strong>É só isso</strong><span>O Risetime recalcula o horário exato todos os dias. O nascer do sol muda com as estações — seu alarme acompanha. Você nunca mais mexe nele.</span></li>
            </ol>
          </section>

          <section className="features" aria-labelledby="features-heading">
            <h2 id="features-heading">O que o aplicativo Risetime faz</h2>
            <div className="feature-grid">
              <article className="feature-card">
                <h3>Ancorado ao dia</h3>
                <p>Ajuste seus alarmes em relação ao nascer do sol, ao meio-dia solar, ao pôr do sol ou ao nadir, com o deslocamento que você quiser. O horário se recalcula todos os dias para ficar em fase com o céu real. Ajustado uma vez, certo o ano todo.</p>
              </article>
              <article className="feature-card">
                <h3>Offline, e privado por construção</h3>
                <p>O Risetime não tem permissão de internet. Não desativada: ausente. Os horários de nascer do sol são calculados no seu aparelho, por algoritmos astronômicos embutidos. Nenhum servidor, nenhuma conta, nenhum dado sai do seu telefone.</p>
              </article>
              <article className="feature-card">
                <h3>Ajuste e esqueça</h3>
                <p>O aplicativo recalcula seus horários em segundo plano, todos os dias. Na maior parte do tempo, você nem o abre. É proposital: o Risetime funciona melhor quando você esquece que ele existe.</p>
              </article>
              <article className="feature-card">
                <h3>Alarmes de verdade, não notificações</h3>
                <p>O Risetime usa a mesma API do sistema que o relógio que já vem com o Android. Seu alarme sobrevive ao modo Doze, à otimização de bateria e a reinicializações. No horário certo, o telefone toca.</p>
              </article>
              <article className="feature-card">
                <h3>Timers, no mesmo aplicativo</h3>
                <p>Um teclado, uma lista ordenada por duração, e um timer em ciclo cujos ciclos permanecem em fase — para intervalos, sessões, blocos de estudo. <a href="/pt/timers/">O guia dos timers</a></p>
              </article>
            </div>
          </section>

          <section className="use-cases" id="uses" aria-labelledby="use-cases-heading">
            <h2 id="use-cases-heading">O que você pode fazer com ele</h2>
            <p>Quem usa um despertador solar, e o que ajusta:</p>
            <ul className="use-case-list">
              <li><strong>Um dia que acompanha o sol</strong> — levantar ao nascer do sol, desacelerar antes do pôr do sol, e manter alarmes de horário fixo para os horários que os outros esperam de você. <a href="/pt/alarme-ritmo-circadiano/">Alarme de ritmo circadiano</a></li>
              <li><strong>Fotógrafos e astrônomos</strong> — a hora dourada, a hora azul e a noite astronômica são ângulos do sol, não horários fixos. Ajuste o ângulo uma vez: ele vale em qualquer latitude e em qualquer estação, offline, em campo. <a href="/pt/hora-dourada/">Hora dourada, hora azul e céu noturno</a></li>
              <li><strong>Meditação, ioga, uma prática à primeira luz</strong> — a saudação ao sol quando a luz chega, ou uma sessão sentada antes dela. Ancore ao nascer do sol, à aurora civil pelo seu ângulo, ou a uma fração da noite. <a href="/pt/meditacao-nascer-do-sol/">Alarme para meditação e ioga</a></li>
              <li><strong>Sair antes da luz</strong> — na água antes do dia, com um alarme que se move com a primeira luz em vez de um horário que se reajusta a cada poucas semanas.</li>
              <li><strong>Acordar antes do amanhecer</strong> — ajuste seu deslocamento antes do nascer do sol uma vez: ele acompanha o nascer do sol todos os dias. Para o horário exato, consulte seu próprio calendário; o alarme, esse, nunca desvia.</li>
              <li><strong>Trabalho ao ar livre, caminhadas, criação de animais</strong> — se o seu dia começa com o dia, seu alarme também.</li>
              <li><strong>Intervalos, sessões, blocos de estudo</strong> — timers que reiniciam sozinhos, no mesmo aplicativo. <a href="/pt/timers/">Timers em ciclo</a></li>
              <li><strong>Quem está cansado de reajustar o ano todo</strong> — ajuste uma vez, continua certo. <a href="/pt/alarmes/">Ajustar um alarme para o nascer ou o pôr do sol</a></li>
            </ul>
          </section>

          <section className="screenshots" aria-labelledby="screenshots-heading">
            <h2 id="screenshots-heading">Capturas de tela — o aplicativo de alarmes solares para Android</h2>
            <div className="screenshot-row">
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/pt/alarm-picker"
                  darkBase="/assets/screenshots/pt/alarm-picker--dark"
                  alt="A caixa de criação de alarme do Risetime, aberta sobre a lista: o ícone da âncora Meio-dia, um deslocamento de −1:00 com o campo das horas selecionado, e a linha Amanhã: 11:49. Um mostrador circular de horas com o 1 selecionado ocupa a metade inferior, com Cancelar e OK abaixo."
                  width={360}
                  height={706}
                />
                <figcaption>Escolha a âncora e o deslocamento</figcaption>
              </figure>
              <figure>
                {/* ⛔ UM <picture> COMUM, NÃO <ThemedPicture> — e é a verdade do
                                  produto, não uma simplificação: NO APP, A TELA DE PARAR NÃO
                                  SEGUE O TEMA (porteur, 2026-09-28). Seu fundo é calculado a partir
                                  da cor solar do instante, tanto no claro quanto no escuro.
                                  ⚠️ Ela carregou uma falsa variante `--dark` até 2026-09-28: os
                                     dois arquivos eram diferentes, mas a ÚNICA diferença era o aviso
                                     do sistema "Viewing full screen" que poluía as capturas — ou seja,
                                     o próprio bug. Sem ele, são idênticas, como já são
                                     em inglês. */}
                <picture>
                  <source srcSet={`/assets/screenshots/pt/dismiss-screen.webp 1x, /assets/screenshots/pt/dismiss-screen@2x.webp 2x`} type="image/webp" />
                  <img src="/assets/screenshots/pt/dismiss-screen.png" alt="A tela de descarte do Risetime para um alarme tocando, preenchida de ponta a ponta com um rosa antigo tirado da posição do sol: o horário 17:30, a data quinta-feira, 1 de outubro, a palavra Alarme, um grande botão circular SONECA, e ENCERRAR abaixo." width={360} height={706} loading="lazy" decoding="async" />
                </picture>
                <figcaption>Um despertar suave</figcaption>
              </figure>
              <figure>
                <ThemedPicture
                  lightBase="/assets/screenshots/pt/settings-screen"
                  darkBase="/assets/screenshots/pt/settings-screen--dark"
                  alt="A tela de configurações do Risetime, com as linhas Alarmes, Âncoras, Timers, Configurações do telefone e Localização dos eventos celestes, esta em London, Reino Unido. A linha Confiabilidade, aberta, mostra (8/8) e as duas linhas Tudo certo (8) e Verificações que este telefone não tem. Apoiando o Risetime aparece abaixo, e o rodapé mostra Risetime."
                  width={360}
                  height={706}
                />
                <figcaption>Uma confiabilidade que você pode verificar</figcaption>
              </figure>
            </div>
          </section>

          <section className="privacy-callout" aria-labelledby="privacy-heading">
            <h2 id="privacy-heading">Offline, sem internet, sem rastreamento</h2>
            <div className="callout-box">
              <p>O Risetime não pede a permissão de internet. Não existe servidor. Não existe conta para criar. Não existe nenhuma ferramenta de medição que observe como você usa o aplicativo.</p>
              <ul>
                <li>Sem permissão de <code>INTERNET</code> — o aplicativo não consegue se conectar</li>
                <li>Nenhuma estatística de uso, nenhum relatório de falhas, nenhuma telemetria</li>
                <li>Nenhuma conta, nenhuma sincronização, nenhuma conexão</li>
                <li>A localização permanece no seu aparelho — ela só serve ao cálculo solar</li>
                <li>Nenhum anúncio, nenhum rastreamento, nenhum dado compartilhado com quem quer que seja</li>
              </ul>
              <a href="/pt/privacidade/" className="privacy-link">Ler a política de privacidade</a>
            </div>
          </section>

          <section className="support" aria-labelledby="support-heading">
            <h2 id="support-heading">Gratuito para até três alarmes. Ilimitado ao apoiar.</h2>
            <div className="callout-box" style={{"borderInlineStartColor": "var(--muted)"}}>
              <p>O Risetime é gratuito para até três alarmes e três timers — para sempre. <br />Precisa de mais? Use esses três primeiro, e veja se vale a pena o seu apoio: quem apoia tem alarmes e timers sem limite, por ano ou de uma vez. Se não, terei o maior prazer em <a href="mailto:contact@risetime.app">ler o que você escrever</a>. Isso está nas Configurações.</p>
              <p style={{"marginBottom": "0"}}>Nenhuma tela de cobrança, nenhuma contagem regressiva, nenhum "faça upgrade". Só uma proposta honesta, quando você estiver pronto.</p>
            </div>
          </section>

          <section className="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading">Perguntas frequentes</h2>
            <dl className="faq-list">
              <dt>O que o Risetime faz, exatamente?</dt>
              <dd>O Risetime é um despertador que pode vincular um alarme a um momento do sol. Ajuste "30 minutos antes do nascer do sol" uma vez, e o alarme se recalcula todos os dias para o seu local: ele acompanha o sol o ano todo. Ele também faz os alarmes comuns de horário fixo, e os timers.</dd>
              <dt>O Risetime precisa de conexão com a internet?</dt>
              <dd>Não. O Risetime não tem nenhuma permissão de internet — ele não consegue se conectar, mesmo que quisesse. Os horários de nascer e pôr do sol são calculados no seu aparelho. Ele funciona no modo avião, em campo, em qualquer lugar.</dd>
              <dt>Ele também faz os alarmes comuns, de horário fixo?</dt>
              <dd>Sim. Os alarmes de relógio e os alarmes ancorados ao sol vivem na mesma lista, e os timers têm sua própria aba, com seu som e volume.</dd>
              <dt>Posso ajustar um alarme para a aurora, a hora dourada ou a noite escura?</dt>
              <dd>Sim, pelo ângulo solar. Crie uma âncora a −6° para a aurora civil, +6° à noite para a hora dourada, −18° para a noite astronômica, e ajuste seus alarmes nelas. Onde um ângulo nunca é alcançado durante parte do ano, o aplicativo avisa, e o alarme pula esses dias em vez de tocar em um horário inventado.</dd>
              <dt>O alarme ainda toca no modo Doze ou na economia de bateria?</dt>
              <dd>Sim. O Risetime usa a API <code>setAlarmClock</code> do Android — o mesmo mecanismo do sistema usado pelo relógio que já vem no seu telefone — e uma tela de Confiabilidade verifica as permissões que o seu telefone precisa. Os alarmes tocam mesmo antes do primeiro desbloqueio depois de uma reinicialização.</dd>
              <dt>O Risetime é gratuito?</dt>
              <dd>Gratuito para até três alarmes e três timers, para sempre. Precisa de mais? Use esses três primeiro, e veja se vale a pena o seu apoio: quem apoia tem alarmes e timers sem limite, por ano ou de uma vez.</dd>
            </dl>
          </section>

          <section className="final-cta" aria-labelledby="cta-heading">
            <h2 id="cta-heading">Pronto para acordar com o sol?</h2>
            <PlayBadge />
          </section>

        </main>

        <SiteFooter page="/" lang="pt" />
    </div>
  )
}
