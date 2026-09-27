import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// A PÁGINA PORTUGUESA, ESCRITA À MÃO — decisão do porteur de 2026-09-27:
// "on ne fait plus de markdown […] tu vas juste bien gentiment tout traduire
// toi-même". Uma página traduzida carrega TUDO o que a inglesa carrega, seu
// mobiliário incluído, do mesmo lado que ela: o JSX.
//
// ⚠️ SUAS STRINGS DE CABEÇALHO VIVEM EM content/pt/alarms.md, em UM exemplar,
// exatamente como a inglesa as recebe de content/en/. `langMetadata` lê ali
// título, descrição e og, acrescenta o canonical PORTUGUÊS e os hreflang, e
// define `noindex` em builds de preview.
//
// ⛔ A CHAVE DA PÁGINA CONTINUA SENDO A INGLESA, `/alarms/` — é o identificador
// da página no registro (lib/pages.ts), não uma URL. O slug português `alarmes`
// vive no cabeçalho de content/pt/alarms.md, e é ele que forma a URL.
//
// ⛔ `pt` está em `STATIC_LOCALES` (lib/pages.ts): a rota dinâmica
// `app/[lang]/` portanto NÃO produz essas URLs, senão o Next fabricaria dois
// exemplares.
//
// ⚠️ Os links para /timers/, /circadian-rhythm-alarm/, /golden-hour-alarm/ e
// /sunrise-meditation-alarm/ continuam em INGLÊS: essas páginas ainda não estão
// traduzidas, e um link para /pt/… seria um link morto.
export const metadata: Metadata = langMetadata('pt', '/alarms/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Como programar um alarme para o nascer ou o pôr do sol no Android",
  "description": "Como programar um alarme Android para o nascer do sol, o pôr do sol, o meio-dia solar ou um ângulo solar escolhido por você, com um deslocamento como \"1 hora antes do pôr do sol\", com o Risetime. O alarme acompanha o sol todos os dias, offline.",
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
  "mainEntityOfPage": "https://risetime.app/pt/alarmes/"
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
      "name": "Alarmes",
      "item": "https://risetime.app/pt/alarmes/"
    }
  ]
}
]

export default function AlarmesPage() {
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

        <SiteHeader current="/alarms/" lang="pt" />

        <div className="page-header">
          <h1>Como programar um alarme para o nascer ou o pôr do sol no Android</h1>
          <p className="subtitle">Um alarme do Risetime se ajusta como qualquer outro, em poucos segundos. O que muda é aquilo em que você pode ajustá-lo.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-intro">
            <h2 id="section-intro" className="sr-only">Alarmes que acompanham o sol</h2>
            <p>Em vez de um horário de relógio, você pode ajustar um alarme para um momento do sol — o nascer, o pôr, o meio-dia solar. O alarme então acompanha esse momento todos os dias, à medida que as estações o deslocam.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pt/alarms-list"
                darkBase="/assets/screenshots/pt/alarms-list--dark"
                alt="Lista de alarmes do Risetime com cinco alarmes: 05:10 no sábado em Aurora astronômica, uma âncora personalizada; 07:00 de segunda a sexta-feira em Absoluto, um horário fixo; 07:02 amanhã ao Nascer do sol; 17:38 de segunda a sexta-feira, 1 h antes do Pôr do sol; e 23:02 hoje, 8 h antes do Nascer do sol, desativado."
                width={360}
                height={706}
              />
              <figcaption>Alarmes comuns e alarmes solares, em uma única lista.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-regular">
            <h2 id="section-regular">Ajustar um alarme comum</h2>
            <ol>
              <li>Na aba <strong>Alarmes</strong>, toque em <strong>+</strong>.</li>
              <li>Ajuste o horário no mostrador, ou digite-o.</li>
              <li>Toque em <strong>OK</strong>.</li>
            </ol>
            <p>Pronto, um alarme comum, e ele não precisa de mais nada.</p>
          </section>

          <section aria-labelledby="section-sun">
            <h2 id="section-sun">Ajustar um alarme para o nascer ou o pôr do sol</h2>
            <p>O Risetime já conhece quatro momentos do sol de fábrica: o <strong>Nascer do sol</strong>, o <strong>Pôr do sol</strong>, <strong>Meio-dia</strong> — o meio-dia solar, quando o sol está no ponto mais alto, o que quase nunca é 12:00 — e o <strong>Nadir</strong>, o meio da noite, quando o sol está no ponto mais baixo.</p>
            <ol>
              <li>
                <strong>Na primeira vez, informe sua localização.</strong> Os horários solares dependem de onde você está. Sem localização, a caixa do alarme simplesmente mostra <em>Defina a localização em Configurações</em>.
                <details>
                  <summary>Três formas de informá-la</summary>
                  <p>Em <strong>Configurações → Localização dos eventos celestes</strong>: escolha sua cidade na lista; ou use o GPS do telefone, uma vez; ou ative a <strong>Atualização automática de localização</strong>, e ela te acompanha em viagem. Sua posição permanece no seu telefone: o Risetime não tem nenhuma permissão de internet, então não há para onde enviá-la.</p>
                  <figure className="content-screenshot">
                    <ThemedPicture
                      lightBase="/assets/screenshots/pt/alarms-location"
                      darkBase="/assets/screenshots/pt/alarms-location--dark"
                      alt="As configurações do Risetime, seção Localização dos eventos celestes aberta: London, Reino Unido selecionado, um botão de GPS, e uma caixa de seleção Atualização automática de localização desmarcada."
                      width={360}
                      height={706}
                    />
                    <figcaption>O ajuste de localização, com seu botão de GPS e sua caixa de atualização automática.</figcaption>
                  </figure>
                </details>
              </li>
              <li>Na aba <strong>Alarmes</strong>, toque em <strong>+</strong>.</li>
              <li>No menu de cima, escolha <strong>Nascer do sol</strong>, <strong>Pôr do sol</strong>, <strong>Meio-dia</strong> ou <strong>Nadir</strong>.</li>
              <li>No mostrador, ajuste quanto tempo antes ou depois o alarme deve tocar — ou deixe em <em>Sem deslocamento</em>.</li>
              <li>Toque em <strong>OK</strong>.</li>
            </ol>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pt/alarms-anchor-menu"
                darkBase="/assets/screenshots/pt/alarms-anchor-menu--dark"
                alt="A caixa de criação de alarme, com seu menu de âncoras aberto: Absoluto, Aurora astronômica, Nascer do sol, Meio-dia, Hora dourada, Pôr do sol e Nadir."
                width={360}
                height={706}
              />
              <figcaption>O menu no topo da caixa do alarme: um horário de relógio, ou um momento do sol.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-offset">
            <h2 id="section-offset">O deslocamento: "1 hora antes do pôr do sol"</h2>
            <p><strong>Uma âncora é um momento do sol que o Risetime recalcula todos os dias; seu alarme se mantém a uma distância fixa dele.</strong> Essa distância é o deslocamento, até 11 h 59 min antes ou depois. O momento solar se move um pouco a cada dia; o deslocamento que você escolheu, nunca.</p>
            <ul>
              <li><strong>Nascer do sol</strong>, sem deslocamento — com a primeira luz.</li>
              <li><strong>30 min antes do Nascer do sol</strong> — de pé antes do dia.</li>
              <li><strong>1 h antes do Pôr do sol</strong> — um alarme de fim de dia que deixa você com tempo de sair enquanto ainda há luz.</li>
              <li><strong>8 h antes do Nascer do sol</strong> — <a href="/pt/alarme-ritmo-circadiano/" className="content-link">um lembrete para dormir que acompanha o sol</a>.</li>
            </ul>
            <p>Uma linha abaixo do mostrador anuncia o próximo toque, por exemplo <em>Amanhã: 18:03</em>.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pt/alarms-offset"
                darkBase="/assets/screenshots/pt/alarms-offset--dark"
                alt="A caixa de criação de alarme ajustada para o Pôr do sol com um deslocamento de uma hora antes, o mostrador das horas em 1 e o dos minutos em 00, e a linha Hoje: 17:38."
                width={360}
                height={706}
              />
              <figcaption>Uma hora antes do pôr do sol. A linha abaixo do deslocamento diz quando ele vai tocar.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-days">
            <h2 id="section-days">Dias de repetição, som e repetição de toque</h2>
            <p>Abra o cartão do alarme na lista. Marque <strong>Repetir</strong> e escolha seus dias: o cartão então se lê como você diria — <em>Segunda a sexta-feira, 1 h antes do Pôr do sol</em>. O mesmo cartão carrega o rótulo, o som, a vibração, a duração do toque e a imagem exibida durante o toque. O interruptor tem três posições: a do meio ignora só o próximo toque — para um dia de folga — e mantém o alarme ativo.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pt/alarms-card"
                darkBase="/assets/screenshots/pt/alarms-card--dark"
                alt="Um cartão de alarme aberto para 17:38, de segunda a sexta-feira, 1 h antes do Pôr do sol: um campo Rótulo vazio, Repetir com de segunda a sexta-feira selecionado, Som ajustado para Padrão do telefone, e Vibração ativada. O cartão continua abaixo da borda da imagem."
                width={360}
                height={706}
              />
              <figcaption>Um cartão de alarme aberto: os dias de repetição, e todo o resto do alarme.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-custom">
            <h2 id="section-custom">Âncoras personalizadas: crepúsculos, ângulos do sol, sombras</h2>
            <p>O sol marca muito mais do que quatro momentos. Você pode criar os seus, de três tipos:</p>
            <ul>
              <li><strong>Um ângulo solar</strong> — o momento em que o sol atinge uma altura dada acima ou abaixo do horizonte, de manhã ou à noite. −6° é a aurora ou o crepúsculo civil; −12°, náutico; −18°, astronômico: a noite plena. +6° à noite é uma luz baixa e quente.</li>
              <li><strong>Um comprimento de sombra</strong> — o momento em que a sombra de um objeto atinge um múltiplo dado da sua altura, antes ou depois do meio-dia.</li>
              <li><strong>Uma fração do dia ou da noite</strong> — a noite (do pôr do sol ao nascer) ou o dia, divididos em partes iguais; você escolhe quantas, e qual o limite. O último sexto da noite, por exemplo, começa no mesmo ponto da noite qualquer que seja sua duração nessa estação.</li>
            </ul>
            <p>Para criar uma:</p>
            <ol>
              <li>Abra <strong>Configurações → Âncoras</strong>, e toque em <strong>+</strong>.</li>
              <li>Escolha o tipo, e ajuste seu valor.</li>
              <li>Dê um nome a ela, ou mantenha o que é sugerido.</li>
              <li>Escolha uma cor — <strong>Salvar</strong> espera uma.</li>
              <li>Toque em <strong>Salvar</strong>.</li>
            </ol>
            <p>Ela agora aparece na caixa do alarme, ao lado do nascer e do pôr do sol, e recebe um deslocamento como qualquer outra. Um interruptor na lista de âncoras remove desse menu as que você não usa.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pt/alarms-anchors"
                darkBase="/assets/screenshots/pt/alarms-anchors--dark"
                alt="As configurações, seção Âncoras: duas âncoras personalizadas, Aurora astronômica e Hora dourada, cada uma com um botão de edição e um botão de exclusão, entre as âncoras de fábrica Nascer do sol, Meio-dia, Pôr do sol e Nadir. Cada linha tem um interruptor de visibilidade, todos ativados."
                width={360}
                height={706}
              />
              <figcaption>Uma âncora personalizada ocupa seu lugar entre as outras, na ordem do dia.</figcaption>
            </figure>

            <p>Uma âncora também pode ser <strong>calibrada</strong> — deslocada em até 30 minutos, para se ajustar a um horário que você segue, como um calendário local.</p>
            <p>Longe do equador, alguns ângulos nunca são alcançados durante parte do ano. O editor mostra as datas — em Londres, o sol não desce a −18° do fim de maio ao fim de julho — e nesses dias o alarme permanece silencioso em vez de tocar em um horário inventado.</p>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pt/alarms-anchor-editor"
                darkBase="/assets/screenshots/pt/alarms-anchor-editor--dark"
                alt="O editor de âncora em Um ângulo solar, ajustado em −18,0° de manhã, chamado Aurora astronômica, com a prévia Próximo: 05:10. O sol não alcança esse ângulo aqui de 23 de maio de 2027 a 21 de julho de 2027."
                width={360}
                height={706}
              />
              <figcaption>−18° de manhã, ajustado para Londres: o editor nomeia as semanas em que isso nunca acontece.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-calculation">
            <h2 id="section-calculation">Como os horários de nascer e pôr do sol são calculados, offline</h2>
            <p>Cada horário de nascer e pôr do sol é calculado no aparelho por uma biblioteca astronômica, <a href="https://shredzone.org/maven/commons-suncalc/" className="content-link">commons-suncalc</a>, baseada no <em>Astronomical Algorithms</em> de Jean Meeus. O nascer e o pôr do sol são medidos pela borda superior do sol, refração atmosférica incluída — o que seus olhos veem; os ângulos solares, pelo centro do sol, a convenção das tabelas de crepúsculo. Nenhuma consulta na web, nenhum servidor: isso funciona no modo avião, no mar, ou em um vale sem sinal.</p>
            <p>O Risetime não roda o tempo todo. Ele recalcula depois de um toque, em uma verificação curta a cada poucas horas, ou quando o telefone reinicia, muda de horário ou de fuso; o alarme do sistema do Android — o mesmo que o relógio que já vem no seu telefone usa — faz o resto.</p>
          </section>

          <section aria-labelledby="section-reliability">
            <h2 id="section-reliability">Garantir que ele toque</h2>
            <p>Alguns telefones interrompem aplicativos em segundo plano para economizar bateria, e isso pode silenciar qualquer alarme. <strong>Configurações → Confiabilidade</strong> verifica o que o seu telefone precisa e dá um botão <strong>Corrigir</strong> para cada item que falta. Depois de uma reinicialização, os alarmes tocam mesmo antes de você desbloquear o telefone pela primeira vez.</p>
          </section>

          <section aria-labelledby="section-timers">
            <h2 id="section-timers">Temporizadores também</h2>
            <p>A aba <strong>Temporizadores</strong> reúne as contagens regressivas, incluindo as que reiniciam sozinhas para intervalos e blocos de estudo: <a href="/pt/temporizadores/" className="content-link">como funcionam os temporizadores repetíveis</a>.</p>
            <p>O Risetime é gratuito para até três alarmes e três temporizadores — para sempre. Precisa de mais? Use esses três primeiro, e veja se vale a pena o seu apoio: quem apoia tem alarmes e temporizadores sem limite, por ano ou de uma vez. Se não, terei o maior prazer em <a href="mailto:contact@risetime.app">ler o que você escrever</a>.</p>
          </section>

          <section aria-labelledby="section-guides">
            <h2 id="section-guides">Guias por uso</h2>
            <ul>
              <li><a href="/pt/alarme-ritmo-circadiano/" className="content-link">Um ritmo de acordar e dormir que acompanha o nascer do sol</a></li>
              <li><a href="/pt/hora-dourada/" className="content-link">Hora dourada, hora azul e céu noturno, para fotógrafos e astrônomos</a></li>
              {/* Add the Muslim prayer times and morning practice guides here once those pages are published. */}
            </ul>
          </section>

          <div className="cta-section">
            <h2>Ajuste uma vez. Ele acompanha o sol.</h2>
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

        <SiteFooter page="/alarms/" lang="pt" />
    </div>
  )
}
