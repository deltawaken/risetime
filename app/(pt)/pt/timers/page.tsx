import type { Metadata } from 'next'
import { langMetadata } from '../../../../lib/metadata'
import SiteHeader from '../../../../components/SiteHeader'
import ThemedPicture from '../../../../components/ThemedPicture'
import SiteFooter from '../../../../components/SiteFooter'

// A PÁGINA DE TIMERS PORTUGUESA, ESCRITA À MÃO — decisão do porteur de
// 2026-09-27: uma página traduzida carrega TUDO o que a inglesa carrega, suas
// capturas e seus dados estruturados incluídos, do mesmo lado que ela: o JSX.
//
// ⚠️ SUAS STRINGS DE CABEÇALHO VIVEM EM content/pt/timers.md, em UM exemplar.
// `langMetadata` lê ali título, descrição e og, acrescenta o canonical
// PORTUGUÊS (/pt/timers/, derivado de `slug:`) e os hreflang. ⛔ A CHAVE
// passada aqui continua sendo a da página INGLESA, `/timers/`: é a identidade
// da página, não a sua URL.
//
// ⛔ `pt` está em `STATIC_LOCALES` (lib/pages.ts): a rota dinâmica
// `app/[lang]/` portanto NÃO produz essa URL.
//
// Vocabulário decidido, e não é negociável: a coisa se chama "timer
// em ciclo" (msgid "Loop" = "ciclo"), o que ele faz é recomeçar sozinho, e suas voltas são "ciclos". Nunca "repetição"/"repetir" (= dias do alarme). A
// locução comum que junta "timer" ao nome do intervalo de tempo é
// PROIBIDA aqui como na inglesa: ela designa no uso comum duas fases que se
// alternam, o que o aplicativo não sabe fazer. O substantivo comum sozinho,
// esse, continua correto — é exatamente o que se ajusta uma vez.
export const metadata: Metadata = langMetadata('pt', '/timers/')

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Um timer que reinicia sozinho",
  "description": "O timer em ciclo do Risetime: uma duração, reiniciada em um intervalo fixo, cujos ciclos permanecem em fase, com um botão Parar o ciclo para encerrá-lo — e os timers comuns que qualquer relógio já faz.",
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
  "mainEntityOfPage": "https://risetime.app/pt/timers/"
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
      "name": "Timers",
      "item": "https://risetime.app/pt/timers/"
    }
  ]
}
]

export default function PaginaTimers() {
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

        <SiteHeader current="/timers/" lang="pt" />

        <div className="page-header">
          <h1>Um timer que reinicia sozinho</h1>
          <p className="subtitle">Ajuste a duração uma vez, e ele continua — além de tudo que o timer de um relógio já sabe fazer.</p>
        </div>

        <main id="main-content" className="content-main">

          <section aria-labelledby="section-loop">
            <h2 id="section-loop">Ele reinicia sozinho</h2>
            <p>É a parte que o relógio do seu telefone provavelmente não sabe fazer. Abra a linha de um timer pelo ícone de seta e marque <strong>ciclo</strong>: ele vira um <strong>timer em ciclo</strong>. Ele chega a zero, toca brevemente, e recomeça pela mesma duração, até você parar o ciclo. O que você ajusta uma vez é o intervalo entre dois toques.</p>
            <p>Cada ciclo é ancorado no momento em que o anterior <em>venceu</em>, e não no momento em que você o silenciou: dois ciclos de trinta minutos dão sessenta minutos, não sessenta e um. Do contrário, cada toque deixado tocando deslocaria o resto do dia inteiro.</p>

            <div className="highlight-box">
              <p>Por padrão, um ciclo toca por <strong>cinco segundos</strong>, com o som de notificação do seu sistema em vez de um som de alarme. Os dois são seus. Não existe opção "nunca" para essa duração: um toque sem fim travaria o timer já no primeiro ciclo.</p>
            </div>

            <figure className="content-screenshot">
              <ThemedPicture
                lightBase="/assets/screenshots/pt/timer-list"
                darkBase="/assets/screenshots/pt/timer-list--dark"
                alt="Lista de timers do Risetime com três contagens regressivas: 3:00 e 10:00, ambas paradas, cada uma com um botão de play e um botão de redefinir, e um terceiro, 24:45, em andamento, com um ícone de ciclo em rosa, um botão de pausa e um botão +1:00. As abas Alarmes, Timers e Configurações ficam na parte inferior da tela."
                width={360}
                height={706}
              />
              <figcaption>Três timers, ordenados por duração. O ícone rosa sinaliza o timer ajustado em ciclo.</figcaption>
            </figure>
          </section>

          <section aria-labelledby="section-ending">
            <h2 id="section-ending">Parar o ciclo</h2>
            <p>Um ciclo para com um botão chamado <strong>Parar o ciclo</strong>: na tela de toque, e também na notificação de toque, ao lado de <strong>Continuar</strong> e do botão que adiciona tempo.</p>
            <p>Desmarcar <strong>ciclo</strong> enquanto um timer toca deixa mais um ciclo antes de parar: o ajuste é lido uma vez por ciclo, no momento em que o toque começa.</p>
            <p>A tela de toque aparece a cada ciclo e vai embora sozinha depois dos cinco segundos — nada para tocar, nada para descartar entre um ciclo e outro.</p>
          </section>

          <section aria-labelledby="section-ordinary">
            <h2 id="section-ordinary">E os timers comuns</h2>
            <p>O resto é o que o timer de um relógio já sabe fazer. Toque no mais e você obtém um teclado em tela cheia em vez de um mostrador: digite os números, eles se preenchem pela direita, como em um forno de micro-ondas. Quatro, zero, zero dá quatro minutos, e seis dígitos levam você até <strong>noventa e nove horas</strong>.</p>
            <p>Os timers ocupam um lugar em uma lista ordenada pela duração para a qual foram ajustados, o mais curto primeiro, e não na ordem em que você os criou. Eles rodam em paralelo — várias contagens independentes ao mesmo tempo, em ciclo ou não.</p>
            <p>Cada linha tem a pausa, e um botão <strong>+1:00</strong> que adiciona tempo ao que resta — um minuto, a menos que você mude isso nas Configurações. Pause um timer e esse botão vira uma redefinição. O ícone de seta abre a linha para <strong>ciclo</strong> e para a exclusão.</p>
          </section>

          <section aria-labelledby="section-notification">
            <h2 id="section-notification">A notificação faz a contagem sozinha</h2>
            <p>A contagem regressiva no seu painel de notificações é desenhada pelo próprio Android, e não repintada pelo aplicativo. Ela continua avançando sem nenhum processo do Risetime vivo.</p>
            <p>Existe um cartão para o que está rodando ou pausado, e um para o que está tocando — exatamente dois, nunca um por timer se empilhando no painel.</p>
            <p>Deslizar esse cartão não para nada: ele volta na hora, reconstruído a partir do estado real, e um timer que está tocando continua tocando. Parar sempre passa por um botão, de propósito.</p>
          </section>

          <section aria-labelledby="section-settings">
            <h2 id="section-settings">Seu próprio som, seu próprio volume</h2>
            <p>Os timers não pegam emprestados os ajustes dos seus alarmes, e um timer em ciclo também não pega emprestados os do timer de uso único: dois perfis, escolhidos conforme ciclo esteja marcado ou não. Cada um tem seu som, seu volume, sua duração de toque e seu aumento de volume opcional.</p>
            <p>As duas durações de toque estão em escalas propositalmente diferentes. Em ciclo: <strong>5, 10, 15, 30, 60 ou 120 segundos</strong>. Para um timer de uso único: <strong>1, 5, 10, 15, 20 ou 25 minutos, ou nunca</strong>.</p>
            <p>Nenhum som vem com o aplicativo: os sons são os do seu sistema, ou um arquivo seu. Dois ajustes continuam comuns em vez de duplicados — se os timers vibram, e o que as teclas de volume fazem enquanto um timer toca.</p>
          </section>

          <section aria-labelledby="section-not">
            <h2 id="section-not">O que ele não vai fazer</h2>
            <p>É uma contagem regressiva e um ciclo, nada mais:</p>
            <ul>
              <li><strong>Sem alternância de esforço/descanso.</strong> Um ciclo tem apenas uma duração; trinta segundos de esforço e depois trinta de recuperação são dois, e nenhuma tela monta um timer a partir de vários.</li>
              <li><strong>Sem lembrete no meio de uma sessão</strong> — uma sessão sentada de trinta minutos não pode tocar aos dez e depois aos vinte.</li>
              <li><strong>Sem faixa de horário, sem horas de silêncio.</strong> Um ciclo roda até você pará-lo.</li>
              <li><strong>Sem tocar na hora exata.</strong> A contagem parte do momento em que você o iniciou.</li>
            </ul>
          </section>

          <section aria-labelledby="section-setup">
            <h2 id="section-setup">Ajustar um</h2>
            <p>Abra a aba Timers, toque no mais, digite a duração. Ele parte sozinho — nada para nomear, nada para classificar. Para que ele recomece sozinho, marque <strong>ciclo</strong> atrás do ícone de seta.</p>
            <p>O <a href="/pt/alarmes/" className="content-link">guia dos alarmes</a> trata dos alarmes, que compartilham os mesmos ajustes de confiabilidade.</p>
          </section>

          <section aria-labelledby="section-price">
            <h2 id="section-price" className="sr-only">Quanto custa</h2>
            <p>O Risetime é gratuito para até três timers, a mesma contagem dos seus alarmes — para sempre. Ao atingi-la, o botão de adicionar simplesmente desaparece: sem caixa de diálogo, sem cadeado, sem faixa dizendo o que falta. Se o seu apoio parar, nada é excluído: cada timer que você criou continua funcionando, você só não pode mais adicionar outro. Precisa de mais de três? Veja se vale a pena o seu apoio — se não, terei o maior prazer em <a href="mailto:contact@risetime.app">ler o que você escrever</a>.</p>
          </section>

          <div className="cta-section">
            <h2>Ajuste a duração uma vez. Ele mantém o ritmo.</h2>
            <a className="play-badge" href="https://play.google.com/store/apps/details?id=com.deltawaken.risetime" target="_blank" rel="noopener" aria-label="Baixe o Risetime no Google Play">
              <span className="badge-main">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.593-2.302 2.593-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" /></svg>
                Google Play
              </span>
              <span className="badge-sub">Disponível agora</span>
            </a>
          </div>

        </main>

        <SiteFooter page="/timers/" lang="pt" />
    </div>
  )
}
