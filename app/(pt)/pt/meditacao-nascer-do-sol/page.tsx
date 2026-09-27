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
// ⚠️ SUAS STRINGS DE CABEÇALHO VIVEM EM content/pt/sunrise-meditation-alarm.md,
// em UM exemplar, exatamente como a inglesa as recebe de content/en/.
// `langMetadata` lê ali título, descrição e og, acrescenta o canonical
// PORTUGUÊS e os hreflang, e define `noindex` em builds de preview.
//
// ⛔ A CHAVE CONTINUA SENDO O CAMINHO INGLÊS `/sunrise-meditation-alarm/`: é a
// identidade da página, comum a todos os idiomas. O slug português está no
// cabeçalho.
//
// ⛔ Página secular: nenhuma tradição é nomeada (decisão do porteur de
// 2026-09-24 à noite). Os rótulos do aplicativo continuam astronômicos.
export const metadata: Metadata = langMetadata('pt', '/sunrise-meditation-alarm/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "inLanguage": "pt-BR",
  "headline": "Uma prática matinal que começa com a luz",
  "description": "Como programar um alarme Android para meditação ou ioga no nascer do sol, na aurora civil ou náutica pelo ângulo solar, ou em uma fração da noite, com o aplicativo de alarmes Risetime. Calculado no aparelho, offline.",
  "author": {
    "@type": "Organization",
    "name": "A. Deltawaken"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Risetime",
    "url": "https://risetime.app/"
  },
  "mainEntityOfPage": "https://risetime.app/pt/meditacao-nascer-do-sol/"
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
      "name": "Alarme para meditação e ioga",
      "item": "https://risetime.app/pt/meditacao-nascer-do-sol/"
    }
  ]
}
]

export default function PaginaMeditacaoNascerDoSol() {
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

        <SiteHeader current="/sunrise-meditation-alarm/" lang="pt" />

        <div className="page-header">
          <h1>Uma prática que começa com a luz, não com um número</h1>
          <p className="subtitle">Ajuste o deslocamento uma vez; é a luz que se move.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="s-why">
            <h2 id="s-why" className="sr-only">Por que a primeira luz não é um horário de relógio</h2>
            <p>Uma prática que começa com a luz não começa em um número. A primeira luz se desloca ao longo do ano, e dentro do mesmo fuso horário também: em 21 de junho, o sol nasce às <strong>06:01 em Mumbai</strong> e às <strong>05:08 em Varanasi</strong>: cinquenta e três minutos de diferença, no mesmo relógio.</p>
            <p>O Risetime ajusta um alarme para um momento do sol em vez de um horário de relógio. Esse momento é uma <strong>âncora</strong>, e a distância que você mantém dela é um <strong>deslocamento</strong>.</p>
          </section>

          <section aria-labelledby="s-names">
            <h2 id="s-names">Quatro formas de nomear a primeira luz</h2>
            <table className="timing-table" aria-label="Quatro formas de nomear a primeira luz, e o que você cria no Risetime">
              <thead><tr><th>O que você busca</th><th>Onde está o sol</th><th>No Risetime</th></tr></thead>
              <tbody>
                <tr><td>O nascer do sol</td><td>o disco se solta do horizonte</td><td>a âncora de fábrica <strong>Nascer do sol</strong></td></tr>
                <tr><td>A aurora civil</td><td><strong>6° abaixo</strong> do horizonte</td><td>uma âncora por ângulo solar, <strong>−6° de manhã</strong></td></tr>
                <tr><td>A aurora náutica</td><td><strong>12° abaixo</strong></td><td><strong>−12° de manhã</strong></td></tr>
                <tr><td>Um ponto dentro da noite</td><td>uma parte do caminho do pôr ao nascer</td><td>uma âncora <strong>Divisão</strong>: Noite, em <em>N</em> partes</td></tr>
              </tbody>
            </table>
            <p>As definições variam; aqui estão as mais comuns. O aplicativo mantém a que você ajustar em qualquer latitude e qualquer estação — o que um "quarenta e cinco minutos antes do nascer do sol" fixo não consegue fazer, já que a duração da aurora muda com as duas.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pt/practice-list"
                darkBase="/assets/screenshots/pt/practice-list--dark"
                alt="Lista de alarmes do Risetime com quatro alarmes, todos repetidos todos os dias: 05:29 em Última parte da noite, 05:50 em Aurora náutica, 06:29 em Aurora civil, e 07:02 ao Nascer do sol."
                width={360}
                height={706}
              />
              <figcaption>As quatro linhas da tabela, cada uma em um alarme.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-sunrise">
            <h2 id="s-sunrise">Ajustar a prática para o nascer do sol</h2>
            <ol>
              <li>Na aba <strong>Alarmes</strong>, toque em <strong>+</strong>.</li>
              <li>No menu de cima, escolha <strong>Nascer do sol</strong>.</li>
              <li>Deixe o mostrador no centro para tocar no nascer do sol, ou gire-o até a distância que você quiser, até <strong>11 h 59 min</strong> para qualquer um dos lados.</li>
              <li>Toque em <strong>OK</strong>, depois abra o alarme na lista e ajuste a <strong>Repetir</strong>.</li>
            </ol>
            <p>E o alarme que quem madruga realmente precisa é o outro: <strong>um alarme para ir dormir</strong>, não um para acordar. Coloque-o na âncora <strong>Pôr do sol</strong> com um deslocamento, em repetição — os mesmos quatro passos. <a href="/pt/alarmes/" className="content-link">Ajustar um alarme para o nascer ou o pôr do sol</a></p>
          </section>

          <section aria-labelledby="s-angle">
            <h2 id="s-angle">Antes do sol: a aurora pelo seu ângulo</h2>
            <ol>
              <li>Abra <strong>Configurações → Âncoras</strong> e toque em <strong>+</strong> (ele aparece assim que a seção é expandida).</li>
              <li>Mantenha o tipo em <strong>Um ângulo solar</strong>. Digite <strong>−6°</strong> para a aurora civil ou <strong>−12°</strong> para a aurora náutica, direção <strong>manhã</strong>. Ele se move um décimo de grau de cada vez, entre −30° e +30°.</li>
              <li>Dê um nome a ela, <strong>escolha uma cor</strong> — sem cor, ela não será salva — e salve.</li>
              <li>Na aba <strong>Alarmes</strong>, ajuste um alarme para ela.</li>
            </ol>
            <p>Muito ao norte ou ao sul, o sol nunca desce tão baixo durante parte do ano. O editor avisa isso no momento em que você cria a âncora — <em>"O sol não alcança esse ângulo aqui, de X a Y"</em>, com as suas próprias datas — e nesses dias o alarme permanece silencioso em vez de tocar em um momento que o céu nunca produziu. Nada é inventado.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pt/practice-angle-editor"
                darkBase="/assets/screenshots/pt/practice-angle-editor--dark"
                alt="O editor de âncora em Um ângulo solar, ajustado em −6,0° de manhã, chamado Aurora civil, com a prévia: Próximo: 06:29."
                width={360}
                height={706}
              />
              <figcaption>A aurora civil como um ângulo: seis graus abaixo do horizonte, de manhã.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-night">
            <h2 id="s-night">Uma fração da noite</h2>
            <p>Você pode ajustar a manhã pela noite em vez da aurora: um ponto situado em uma parte dada da escuridão.</p>
            <ol>
              <li><strong>Configurações → Âncoras → +</strong>, e mude a forma para <strong>Uma fração do dia ou da noite</strong>.</li>
              <li>Alcance <strong>Noite</strong>, depois o <strong>Número de partes</strong> e a <strong>posição</strong> — de 2 a 48 partes, qualquer limite dentro.</li>
              <li>Dê um nome a ela, escolha uma cor, salve. Um rascunho novo se chama <strong>Noite · 1/15</strong>; ele acompanha o que você ajusta.</li>
              <li>Ajuste um alarme para ela.</li>
            </ol>
            <p>A noite, aqui, é exatamente uma coisa: <strong>de um pôr do sol ao nascer seguinte</strong>, dividida em partes iguais. Dentro dos círculos polares, uma noite dessas pode não existir; a âncora então não tem nada para dividir, e o aplicativo avisa — sem o intervalo de datas que a forma por ângulo dá, e que esta forma não tem. Você se ajusta a um horário publicado? <strong>Avançado → Deslocar em N minutos</strong> move uma âncora que você criou, em até trinta minutos para qualquer um dos lados.</p>
                        <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pt/practice-division-editor"
                darkBase="/assets/screenshots/pt/practice-division-editor--dark"
                alt="O editor de âncora em Uma fração do dia ou da noite, com Noite selecionado, Número de partes ajustado em 8 e Posição em 7/8, chamado Última parte da noite, com a prévia: Próximo: 05:29."
                width={360}
                height={706}
              />
              <figcaption>A noite dividida em oito partes, o alarme na última.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="s-not">
            <h2 id="s-not">O que o Risetime não faz</h2>
            <p>Seus próprios rótulos continuam astronômicos — <em>Nascer do sol</em>, <em>um ângulo solar</em>, <em>Noite · 1/15</em> — enquanto o nome que você digita é o seu. É um despertador, nada mais:</p>
            <ul>
              <li><strong>Nenhum sinal no meio de uma sessão</strong> — nenhuma tela monta um temporizador a partir de vários, então uma sessão sentada de trinta minutos não pode tocar aos dez e aos vinte.</li>
              <li><strong>Nenhum som de meditação, nada guiado.</strong> Ele toca; você o descarta.</li>
              <li><strong>Nada lunar</strong> — o Risetime não calcula a Lua: nem fase, nem data lunar.</li>
              <li><strong>Nenhum acompanhamento de sono, nenhuma conta, sem nuvem, nenhuma permissão de internet</strong> — sua localização nunca sai do telefone. <a href="/pt/privacidade/" className="content-link">Política de privacidade</a></li>
            </ul>
            <p><a href="/pt/alarmes/#section-custom" className="content-link">Como funcionam as âncoras e os deslocamentos</a></p>
          </section>

          <section aria-labelledby="s-price">
            <h2 id="s-price" className="sr-only">Quanto custa</h2>
            <p>O Risetime é gratuito para até três alarmes e três temporizadores — para sempre. Precisa de mais? Use esses três primeiro, e veja se vale a pena o seu apoio: quem apoia tem alarmes e temporizadores sem limite, por ano ou de uma vez. Se não, terei o maior prazer em <a href="mailto:contact@risetime.app">ler o que você escrever</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Comece com a luz.</h2>
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

        <SiteFooter page="/sunrise-meditation-alarm/" lang="pt" />
    </div>
  )
}
