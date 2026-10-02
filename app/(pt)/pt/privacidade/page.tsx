import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import SiteFooter from '../../../../components/SiteFooter'

// A PÁGINA PORTUGUESA, ESCRITA À MÃO — decisão do porteur de 2026-09-27:
// "on ne fait plus de markdown […] tu vas juste bien gentiment tout traduire
// toi-même". Uma página traduzida carrega TUDO o que a inglesa carrega, seu
// mobiliário incluído, do mesmo lado que ela: o JSX.
//
// ⚠️ SUAS STRINGS DE CABEÇALHO VIVEM EM content/pt/privacy.md, em UM exemplar,
// exatamente como a inglesa as recebe de content/en/. `langMetadata` lê ali
// título, descrição e og, acrescenta o canonical PORTUGUÊS e os hreflang, e
// define `noindex` em builds de preview.
//
// ⛔ `pt` está em `STATIC_LOCALES` (lib/pages.ts): a rota dinâmica
// `app/[lang]/` portanto NÃO produz essas URLs, senão o Next fabricaria dois
// exemplares.
export const metadata: Metadata = langMetadata('pt', '/privacy/')

export default function PaginaPrivacidade() {
  return (
    <div className="layout-narrow">
      <a href="#main-content" className="skip-link">Ir para o conteúdo principal</a>

        <SiteHeader current="/privacy/" lang="pt" />

        <div className="page-header">
          <h1>Política de privacidade</h1>
          <p className="meta">Data de vigência: 2026-09-13 &middot; Editor: A. Deltawaken</p>
        </div>

        <main id="main-content" className="content-main">

          <div className="highlight-box">
            <p>O Risetime não coleta, não transmite e não compartilha nenhum dado pessoal. Suas informações nunca saem do seu aparelho.</p>
          </div>

          <section aria-labelledby="section-not-do">
            <h2 id="section-not-do">O que o Risetime não faz</h2>
            <ul>
              <li>Não coleta nenhum dado pessoal</li>
              <li>Não se conecta à internet</li>
              <li>Não transmite sua localização a nenhum servidor</li>
              <li>Não usa estatísticas de uso, relatórios de falhas nem telemetria</li>
              <li>Não contém nenhum anúncio</li>
              <li>Não rastreia você entre aplicativos, nem entre sites</li>
              <li>Não compartilha nenhum dado com terceiros</li>
            </ul>
          </section>

          <section aria-labelledby="section-local-data">
            <h2 id="section-local-data">Os dados mantidos no seu aparelho</h2>
            <p>O Risetime mantém os seguintes dados <strong>exclusivamente no seu aparelho</strong>, sem jamais transmiti-los:</p>
            <ul>
              <li><strong>A configuração dos seus alarmes</strong> — horários, rótulos, recorrência e tipo de âncora (nascer do sol, pôr do sol etc.). Mantida em um banco de dados Room local.</li>
              <li><strong>A localização</strong> — a cidade ou as coordenadas de GPS que você escolhe para os cálculos celestes (horários de nascer e pôr do sol). Usada apenas para o cálculo local. Nunca transmitida.</li>
              <li><strong>As preferências do aplicativo</strong> — ajustes, incluindo o estado da sua assinatura. Mantidas em um DataStore local.</li>
            </ul>
            <p>Todos esses dados desaparecem quando você desinstala o aplicativo.</p>
          </section>

          <section aria-labelledby="section-location">
            <h2 id="section-location">A permissão de localização</h2>
            <p>O Risetime solicita a permissão de <strong>localização aproximada</strong> (<code>ACCESS_COARSE_LOCATION</code>) com o único objetivo de calcular os horários locais de nascer e pôr do sol. Sua posição é processada no aparelho por um mecanismo de efemérides, e nunca é enviada a um serviço ou servidor externo.</p>
            <p>Você também pode digitar sua cidade manualmente nas Configurações: o GPS não é usado nesse caso.</p>
          </section>

          <section aria-labelledby="section-internet">
            <h2 id="section-internet">A permissão de internet</h2>
            <p>O Risetime <strong>não declara</strong> a permissão <code>INTERNET</code> e não realiza nenhuma requisição de rede. O aplicativo funciona inteiramente offline.</p>
            <p>A assinatura opcional passa pelo Google Play Billing, que se comunica com os serviços do Google Play por uma troca entre processos no seu aparelho — e não por uma chamada de rede feita pelo Risetime. Essa troca está sujeita à <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">política de privacidade do Google</a>.</p>
          </section>

          <section aria-labelledby="section-subscriptions">
            <h2 id="section-subscriptions">As assinaturas</h2>
            <p>O Risetime oferece uma assinatura opcional, "Risetime Supporter". As compras são processadas inteiramente pelo Google Play. O Risetime não recebe, não armazena e não processa nenhuma informação de pagamento. O estado da assinatura é mantido apenas no seu aparelho.</p>
          </section>

          <section aria-labelledby="section-children">
            <h2 id="section-children">A privacidade das crianças</h2>
            <p>O Risetime não coleta conscientemente nenhuma informação de ninguém, incluindo crianças menores de treze anos. Como nenhum dado é coletado, o Risetime respeita o COPPA e regulamentações comparáveis por construção.</p>
          </section>

          <section aria-labelledby="section-changes">
            <h2 id="section-changes">As mudanças nesta política</h2>
            <p>Se esta política de privacidade mudar, a versão atualizada será publicada neste endereço, com uma nova data de vigência. Como nenhum dado é coletado, uma mudança tem poucas chances de afetar sua privacidade na prática.</p>
          </section>

          <section aria-labelledby="section-contact">
            <h2 id="section-contact">Fale conosco</h2>
            <p>Qualquer pergunta sobre esta política de privacidade pode ser enviada ao editor, em <a href="mailto:contact@risetime.app">contact@risetime.app</a>, ou pela ficha do Risetime na Google Play.</p>
          </section>

        </main>

        <SiteFooter page="/privacy/" lang="pt" />
    </div>
  )
}
