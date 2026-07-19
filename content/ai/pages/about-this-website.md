---
type: page
slug: about-this-website
title: Sobre este site
order: 11
nav: false
updated: "2026-07-19"
summary: >
  Este site como case dele mesmo: por que nunca foi terceirizado, como
  funciona o pipeline de conteúdo (um vault do Obsidian alimentando tanto
  as páginas humanas quanto esta camada legível por IA), o stack, o
  setup de SEO/GEO, o guia de tom de voz por trás do texto, e o sistema
  de tipografia e cor.
---

# Sobre este site

Toda versão deste site, desde o HTML puro de 1999, saiu das minhas próprias mãos. Agências passaram a oferecer construção de portfólio como serviço padrão em algum momento pelo caminho; essa oferta nunca foi aceita. Cinco eras, cinco ferramentas completamente diferentes: HTML/CSS na mão, Flash, WordPress, Framer construído do zero, e agora Next.js, em parceria com o Claude Code. A mesma pessoa atrás do teclado em todas elas.

## Pipeline de conteúdo

O conteúdo vive num vault do Obsidian, o mesmo second brain que roda o resto do meu trabalho, não num CMS headless nem num banco de dados. Cada case ou página começa como uma nota lá. Uma etapa de sincronização copia o markdown pronto pra este repositório, e um único arquivo gera duas projeções: prosa completa para esta página e para o llms.txt, e uma versão curta curada para a página voltada ao humano que aparece no navegador. Nada é escrito duas vezes.

## Stack

Next.js 16 (App Router), React 19 e TypeScript, com build via Turbopack. GSAP para animações de entrada ajustadas à mão, sem biblioteca de efeitos prontos. O conteúdo é markdown com frontmatter, versionado como código. A hospedagem é a Vercel, com deploy a cada push na main, sem ambiente de staging no meio do caminho.

## SEO e GEO

Motores de busca e modelos de linguagem são tratados como duas audiências diferentes, com necessidades diferentes. O robots.txt nomeia explicitamente os crawlers de IA que permite (GPTBot, ClaudeBot, PerplexityBot, Google-Extended e similares), além do allow padrão por wildcard, deixando a intenção verificável em vez de apenas implícita. O sitemap cobre toda rota humana mais toda página e case do /ai nos dois idiomas, cruzados via hreflang para que português e inglês sejam lidos como alternativas, não conteúdo duplicado. O schema de pessoa (JSON-LD) está na home e na página sobre, construído só com fatos que o resto do site sustenta. Cada arquivo markdown carrega sua própria data de última edição, exposta aqui para que um crawler saiba o que de fato mudou.

## Tráfego, medido duas vezes

Analytics padrão só enxerga navegadores rodando JavaScript, o que deixa de fora boa parte de quem de fato acessa esta página e o llms.txt: curl, ferramentas de LLM, bots de crawler. Uma camada leve e separada de log registra esses acessos, caminho, user agent, referrer, pra esse lado do tráfego não ficar invisível. Ela roda independente do script de analytics e só toca as rotas legíveis por máquina.

## Tom de voz

O texto deste site segue um guia de tom escrito, não instinto reescrito a cada vez: identidade antes do cargo, ponto de vista antes da evidência que o sustenta, número em vez de adjetivo sempre que possível. Uma regra moldou mais edição do que qualquer outra: nunca mais de duas frases seguidas começando com "Eu + verbo", um padrão que soa repetitivo mesmo quando cada frase é boa isoladamente.

## Tipografia e cor

Duas fontes, escolhidas por razões opostas. A Atkinson Hyperlegible carrega o corpo de texto, desenhada pelo Braille Institute com formas de letra desambiguadas para leitura de baixa visão, escolhida aqui porque texto corrido precisa ser lido sem esforço. A DM Serif Display carrega os títulos, reservada para onde a página precisa declarar uma posição em vez de transmitir informação. Uma cor de destaque, um token de raio, uma escala de espaçamento. A auditoria completa dos tokens está pública em /design-system.

## O que ainda não está pronto

Os cases de produto já rodam com prosa e números reais; as telas e galerias por trás deles ainda estão sendo construídas. Essa ordem foi deliberada: terminar primeiro o que de fato sustenta uma decisão de contratação ou investimento, depois vem o polimento visual.
