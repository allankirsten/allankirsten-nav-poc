---
type: case
slug: bipa
title: Bipa
tagline: "Do site institucional à plataforma de aquisição."
company: Bipa
role: "Design Lead"
period: "2025-hoje"
category: "Product & Growth"
order: 5
featured: true
status: active
heroImage: "/images/cases/bipa-cover.png"
heroImageMobile: "/images/cases/bipa-cover-mobile.png"
gallery:
  - "/images/cases/bipa-gallery-1.png"
  - "/images/cases/bipa-gallery-2.png"
  - "/images/cases/bipa-gallery-3.png"
summary: >
  Fintech Bitcoin-native, 300 mil usuários. Virei um site institucional
  em plataforma de aquisição: 93 PRs em 4 meses, cadastro web com 29,9%
  de aprovação orgânica contra 12,8% do fluxo pago, e 40 entrevistas
  JTBD que viraram a base de decisão do time.
metrics:
  - label: "Cadastro web"
    value: "29,9% aprovação orgânica (2,3x o pago)"
  - label: "Entrega"
    value: "93 PRs merged em 4 meses"
  - label: "GEO"
    value: "live antes dos 10 concorrentes"
  - label: "Pesquisa"
    value: "40 entrevistas JTBD, 5 clusters"
tags: [fintech, bitcoin, growth, jtbd, seo]
sections:
  - heading: "O impacto primeiro"
    summary: >
      93 pull requests em 4 meses. Cadastro web convertendo 2,3x mais que o
      fluxo antigo. GEO no ar antes de qualquer concorrente. Um site que só
      existia agora adquire.
    visual: "Cadastro web da Bipa: landing e formulário de criação de conta"
    visualSrc: "/images/cases/bipa-impact.png"
  - heading: "A decisão que mais importou"
    summary: >
      A suposição era mandar o lead pro app. Desenhei um fluxo de cadastro
      web de 9 steps do zero pra testar: 29,9% de aprovação contra 12,8% do
      app, 2,3x, prova de que a decisão de design bateu a suposição.
      Orgânico fica no web, pago no app.
    visual: "Tela inicial do app Bipa, modo claro e escuro"
    visualSrc: "/images/cases/bipa-decision.png"
  - heading: "O que estava invisível"
    summary: >
      70% das sessões não eram gravadas, o QR code levava pro lugar errado, o
      site foi flagado como phishing, o blog era invisível pro Googlebot.
      Arrumei o tracking na raiz, Ortto sem "source not set", GA4 de 4 para
      14 key events, e reconstruí o blog em 51 artigos indexáveis via SSR,
      Core Web Vitals otimizado, GEO no ar antes dos 10 concorrentes.
    visual: "Fluxo de compra de Bitcoin: valor, confirmação, parcelamento, pagamento e sucesso"
    visualSrc: "/images/cases/bipa-invisible.png"
  - heading: "Pesquisa como infraestrutura de decisão"
    summary: >
      40 entrevistas de JTBD conduzidas pessoalmente, síntese com AI. Viraram
      5 clusters e um ICP definido por dado real, hoje contexto permanente de
      um agente interno usado em toda RFC do time. Também usamos os agentes
      pra validar jornadas e UX writing das telas.
    visual: "Perfil de cluster JTBD: Apostadores do Hype"
    visualSrc: "/images/cases/bipa-research.png"
  - heading: "Resultado"
    summary: >
      93 PRs, cadastro web 2,3x mais eficiente, tracking de 30% para 100% de
      cobertura, pesquisa que virou decisão permanente. Trabalho equivalente
      a um squad de 5 a 6 pessoas, feito por uma.
---

# Bipa

O site tinha páginas. Não tinha funil. Não tinha dado confiável. Não havia um experimento sequer rodando.

Era uma vitrine sem caixa registradora.

A Bipa é uma fintech Bitcoin-native no Brasil: 300 mil usuários, R$4 bilhões processados, conta PJ e PF com Bitcoin, USDT e cartão Mastercard com cashback em BTC. Entrei como Design Lead e o papel virou outra coisa: builder de infraestrutura de produto operando ao mesmo tempo em pesquisa, estratégia, dados, código, CRM e design.

## O impacto primeiro

Em 4 meses, 93 pull requests merged. Cadastro web completo convertendo 2,3x mais que o fluxo antigo. GEO no ar antes de qualquer um dos 10 concorrentes. FullStory saltando de 30% para 100% das sessões gravadas. 40 entrevistas de pesquisa viradas em contexto permanente de decisão do time.

Um site que só existia agora adquire.

## A decisão que mais importou

Havia uma suposição não testada: a de que o melhor era capturar o lead e mandar pro app. Testamos.

O que descobrimos? Usuário orgânico completando o cadastro no browser: 29,9% de aprovação. Usuário pago redirecionado pro app: 12,8%.

Premissas erradas podem matar uma oportunidade.

Desenhei o fluxo completo de 9 steps do zero, do CPF à aprovação, com A/B de 9 iterações e split determinístico por canal. Decisão final: orgânico vai 100% pro cadastro web, pago fica no app, prova de que a decisão de design bateu a suposição.

## O que estava invisível

70% das sessões não eram gravadas. O QR code mandava pra URL errada. O site foi flagado como phishing no Google Safe Browsing. 25 leads por mês sumiam num timeout silencioso da API. 162 artigos ficavam invisíveis quando o CMS caía.

Onde aparecia tudo isso? Em nenhum dashboard. Só quando alguém olhava de perto.

Arrumei o tracking na raiz: Ortto sem "source-not-set", 40 eventos catalogados, GA4 de 4 para 14 key events, UTMs de 2 para 5 parâmetros. Sem medir certo, não dá pra decidir certo.

## SEO e GEO do zero

Blog de client-side invisível pro Googlebot para 51 artigos indexáveis em SSR. Core Web Vitals de 56% "Poor" para otimizado. Gap de 2.094 keywords e 2,28 milhões de buscas mensais atacado. E GEO antes de todo mundo: llms.txt, schema speakable, parágrafo citável. Nenhum dos 10 concorrentes tinha feito.

## Pesquisa como infraestrutura de decisão

Havia alta ambiguidade sobre quem é o usuário da Bipa e por que ele escolhe a plataforma. Sem pesquisa, produto decidia por suposição de mercado.

Conduzi 40 entrevistas de Jobs-to-be-Done pessoalmente. Escolha deliberada: o contexto e a empatia de uma conversa real não se delegam. Síntese feita com AI, o que levaria semanas levou dias sem perder profundidade. Somei a isso segmentação comportamental sobre dezenas de variáveis transacionais e socioeconômicas, chegando em 5 clusters e num ICP definido por dado real.

A estrutura de jobs virou contexto permanente de um agente interno. Hoje o time usa pra validar hipótese em tempo real, entender trade-off antes de comprometer recurso e definir aposta de quarter. Toda RFC do time usa os jobs como referência estrutural obrigatória.

## Resultado

93 PRs em 4 meses. Cadastro web 2,3x mais eficiente no orgânico. SEO e GEO do zero, com GEO na frente do mercado. Tracking de 30% para 100% de cobertura. 40 entrevistas que deixaram de ser arquivo e viraram decisão.

O trabalho equivale a um squad sênior de 5 a 6 pessoas operando em paralelo. Foi uma pessoa, operando em cada camada porque o problema pedia.
