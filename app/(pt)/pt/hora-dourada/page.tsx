import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// A PÁGINA PORTUGUESA, ESCRITA À MÃO — decisão do porteur de 2026-09-27:
// "on ne fait plus de markdown […] tu vas juste bien gentiment tout traduire
// toi-même". Uma página traduzida carrega TUDO o que a inglesa carrega, seu
// mobiliário incluído, do mesmo lado que ela: o JSX — capturas com direção de
// arte e dados estruturados incluídos.
//
// ⚠️ SUAS STRINGS DE CABEÇALHO VIVEM EM content/pt/golden-hour-alarm.md, em UM
// exemplar, exatamente como a inglesa as recebe de content/en/. `langMetadata`
// lê ali título, descrição e og, acrescenta o canonical PORTUGUÊS e os
// hreflang, e define `noindex` em builds de preview.
//
// ⛔ A CHAVE CONTINUA SENDO A DA PÁGINA INGLESA (`/golden-hour-alarm/`): é o
// registro `PAGES` (lib/pages.ts) que a nomeia, e a URL portuguesa é DERIVADA
// do `slug:` do cabeçalho. Escrever aqui "/hora-dourada/" faria procurar uma
// página que não está no registro.
//
// ⛔ `pt` está em `STATIC_LOCALES` (lib/pages.ts): a rota dinâmica
// `app/[lang]/` portanto NÃO produz essas URLs, senão o Next fabricaria dois
// exemplares.
export const metadata: Metadata = langMetadata('pt', '/golden-hour-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "A hora dourada, a hora azul e o céu noturno, em um alarme",
  "description": "Como programar alarmes para a hora dourada, a hora azul e a noite astronômica no Android, pelo ângulo solar em vez de um horário de relógio, com o aplicativo de alarmes Risetime. Calculado no aparelho, offline.",
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
  "mainEntityOfPage": "https://risetime.app/pt/hora-dourada/"
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
      "name": "Alarme de hora dourada",
      "item": "https://risetime.app/pt/hora-dourada/"
    }
  ]
}
]

export default function PaginaHoraDourada() {
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

        <SiteHeader current="/golden-hour-alarm/" lang="pt" />

        <div className="page-header">
          <h1>A hora dourada, a hora azul e o céu noturno, em um alarme</h1>
          <p className="subtitle">Ajuste o ângulo uma vez. O alarme acompanha a luz o ano todo.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="s-why">
            <h2 id="s-why" className="sr-only">Por que um alarme de horário fixo perde a luz</h2>
            <p>Você sabe quando a luz fica bonita. O problema é que ela se move: em Nova York, o pôr do sol vai de <strong>16:31 em 21 de dezembro</strong> a <strong>20:30 em 21 de junho</strong>. Um alarme de horário fixo para a hora dourada fica errado em duas semanas, e inútil em um mês.</p>
            <p>O Risetime ajusta um alarme pelo <strong>ângulo solar</strong> em vez de um horário de relógio — e é o ângulo que realmente define essas janelas.</p>
          </section>

          <section aria-labelledby="s-angles">
            <h2 id="s-angles">A luz, pelo ângulo</h2>
            <table className="timing-table" aria-label="A hora dourada, a hora azul e a noite astronômica, pelo ângulo solar">
              <thead><tr><th>O que você procura</th><th>O sol está…</th><th>No Risetime</th></tr></thead>
              <tbody>
                <tr><td>Hora dourada, à noite</td><td>abaixo de cerca de <strong>6° acima</strong> do horizonte</td><td>uma âncora de ângulo solar, <strong>+6° à noite</strong></td></tr>
                <tr><td>Hora azul, à noite</td><td>entre cerca de <strong>4° e 6° abaixo do horizonte</strong></td><td><strong>−4° à noite</strong>, com a janela seguindo até −6°</td></tr>
                <tr><td>Hora dourada, de manhã</td><td>a mesma coisa, ao contrário</td><td><strong>+6° de manhã</strong></td></tr>
                <tr><td>Noite astronômica</td><td><strong>18° abaixo do horizonte</strong></td><td><strong>−18° à noite</strong>, e −18° de manhã para saber quando ela termina</td></tr>
              </tbody>
            </table>
            <p>As definições variam de um fotógrafo para outro; aqui estão as mais comuns. Ajuste o ângulo com o qual você trabalha, e o aplicativo o mantém em qualquer latitude e qualquer estação — o que uma regra pronta, "30 minutos antes do pôr do sol", não sabe fazer, porque a duração do crepúsculo muda com as duas. Em Londres, em 21 de junho, +6° cai às 20:27 e o pôr do sol às 21:21: quase uma hora de diferença. Em Nova York na mesma noite, 19:49 e 20:30: quarenta minutos.</p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pt/sky-menu"
                darkBase="/assets/screenshots/pt/sky-menu--dark"
                alt="A caixa de criação de alarme, com seu menu de âncoras aberto, listando Absoluto, Nascer do sol, Meio-dia, Hora dourada, Pôr do sol, Hora azul, Céu noturno e Nadir."
                width={360}
                height={706}
              />
              <figcaption>Suas próprias âncoras ocupam um lugar ao lado do nascer e do pôr do sol, na ordem do dia.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-make">
            <h2 id="s-make">A âncora, de uma vez por todas</h2>
            <ol>
              <li>Abra <strong>Configurações → Âncoras</strong> e toque em <strong>+</strong>.</li>
              <li>Mantenha o tipo em <strong>Um ângulo solar</strong> e ajuste seu ângulo — um toque no valor para digitá-lo, e escolha <strong>manhã</strong> ou <strong>noite</strong>.</li>
              <li>Dê um nome a ela — <em>Hora dourada</em>, <em>Hora azul</em>, <em>Céu noturno</em> —, escolha uma cor e salve.</li>
              <li>Na aba <strong>Alarmes</strong>, ajuste um alarme para ela: na âncora, ou trinta minutos antes para chegar ao local.</li>
            </ol>
            <p><a href="/pt/alarmes/#section-custom" className="content-link">Como funcionam as âncoras e os deslocamentos</a></p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pt/sky-list"
                darkBase="/assets/screenshots/pt/sky-list--dark"
                alt="A lista de alarmes do Risetime com cinco alarmes: 06:45 e 08:10 de segunda a sexta-feira em Absoluto; 17:21 no domingo e no sábado, 30 min antes de Hora dourada; 18:58 no domingo e no sábado em Hora azul; e 20:30 na sexta-feira e no sábado em Céu noturno."
                width={360}
                height={706}
              />
              <figcaption>Alarmes de relógio para a semana, alarmes solares para a luz.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-week">
            <h2 id="s-week">Uma semana de trabalho, e a luz no fim de semana</h2>
            <p>A maioria de nós não vive de fotografia:</p>
            <table className="timing-table" aria-label="Uma semana de alarmes de relógio, e alarmes de fim de semana ancorados na luz">
              <thead><tr><th>Momento</th><th>Alarme</th><th>Dias</th></tr></thead>
              <tbody>
                <tr><td>Acordar</td><td>06:45</td><td>Seg–sex</td></tr>
                <tr><td>Sair para a escola</td><td>08:10</td><td>Seg–sex</td></tr>
                <tr><td>Preparar a mochila</td><td>30 min antes de Hora dourada</td><td>Sáb e dom</td></tr>
                <tr><td>Hora azul</td><td>Hora azul</td><td>Sáb e dom</td></tr>
                <tr><td>As estrelas</td><td>Céu noturno</td><td>Sex e sáb</td></tr>
              </tbody>
            </table>
            <p>Alarmes de relógio para a semana, alarmes solares para a luz — a mesma lista, o mesmo aplicativo.</p>
          </section>

          <section aria-labelledby="s-road">
            <h2 id="s-road">Em viagem, e longe de qualquer rede</h2>
            <ul>
              <li><strong>Viajando?</strong> Ative a <strong>Atualização automática de localização</strong> nas Configurações, e seus alarmes te acompanham — um deslocamento, uma nova cidade, um litoral.</li>
              <li><strong>Sem rede por lá?</strong> O Risetime calcula a posição do sol no telefone, com uma biblioteca astronômica. Ele não tem <strong>nenhuma permissão de internet</strong>, então não pode depender de uma conexão: modo avião, um cânion, um barco — o alarme sempre sabe quando a luz chega.</li>
              <li><strong>Nenhum rastreamento, nenhuma conta, nenhum anúncio.</strong> Sua localização nunca sai do telefone. <a href="/pt/privacidade/" className="content-link">Política de privacidade</a></li>
            </ul>
          </section>

          <section aria-labelledby="s-night">
            <h2 id="s-night">Para o céu noturno</h2>
            <p>A noite astronômica é a janela entre o momento da noite e o momento da manhã em que o sol está a 18° abaixo do horizonte. Coloque uma âncora em cada um dos dois, e você tem as duas pontas da escuridão.</p>
            <p>Muito ao norte ou muito ao sul, essa janela se fecha durante parte do ano: em Londres, o sol não atinge −18° <strong>de 23 de maio a 21 de julho</strong>. O Risetime avisa isso no momento em que você cria a âncora, com as datas do seu próprio local, e nessas noites o alarme permanece silencioso em vez de tocar em um horário que o céu nunca produz.</p>
            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pt/sky-night-editor"
                darkBase="/assets/screenshots/pt/sky-night-editor--dark"
                alt="O editor de âncora em Um ângulo solar, ajustado em −18,0° à noite, chamado Céu noturno, com a prévia: Próximo: 20:30. O sol não alcança esse ângulo aqui de 23 de maio de 2027 a 21 de julho de 2027."
                width={360}
                height={706}
              />
              <figcaption>Um ângulo de −18° à noite, e as semanas em que ele nunca acontece.</figcaption>
            </figure>
            <p><strong>O que o Risetime não faz: a Lua.</strong> Sem nascer da lua, sem fase, sem calendário lunar — o aplicativo não vai te dizer quando uma lua cheia apaga a Via Láctea. Ele faz o sol, e faz isso offline.</p>
          </section>

          <section aria-labelledby="s-price">
            <h2 id="s-price" className="sr-only">Quanto custa</h2>
            <p>O Risetime é gratuito para até três alarmes e três timers — para sempre. Precisa de mais? Use esses três primeiro, e veja se vale a pena o seu apoio: quem apoia tem alarmes e timers sem limite, por ano ou de uma vez. Se não, terei o maior prazer em <a href="mailto:contact@risetime.app">ler o que você escrever</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Nunca mais perca a luz.</h2>
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

        <SiteFooter page="/golden-hour-alarm/" lang="pt" />
    </div>
  )
}
