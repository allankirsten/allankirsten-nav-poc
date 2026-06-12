# Notas de sessão — Páginas de case (`/cases/*`)

## Estado atual

Hero das páginas de case (`components/CasePage.tsx`) redesenhado como dobra 100dvh,
com 4 blocos empilhados (`justify-content: space-between`):

1. `.case-title`
2. `.case-meta` (Role / Year / Sector)
3. `.case-tagline`
4. `.case-metrics` (grid de números — agora dentro do `.case-hero`, full-bleed via margin negativo)

### Animação (timeline único, loop infinito p/ ajuste)

```js
const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

tl.fromTo(".case-title",    { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0);
tl.fromTo(".case-meta-item",{ opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.08 }, 0.45);
tl.fromTo(".case-tagline",  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 1.0);

tl.fromTo(".case-metrics", { borderTopColor: "rgba(229,229,229,0)" }, { borderTopColor: "#e5e5e5", duration: 0.5, ease: "power1.out" }, 1.2);

// por cell (i = 0..3), start = 1.2 + i*0.08
tl.fromTo(cell, { opacity: 0, y: 32, borderColor: "rgba(229,229,229,0)" }, { opacity: 1, y: 0, borderColor: "#e5e5e5", duration: 0.7, ease: "power3.out" }, start);
// contador (se m.count definido), start + 0.15, duration 1.4, ease sine.out
```

- Para evitar "flick" inicial (conteúdo final aparece 1 frame antes de o GSAP esconder),
  todos os elementos animados nascem com `style={{ opacity: 0 }}` (e bordas transparentes) no JSX.
- `.metric-value` já nasce renderizando o valor "zerado" (`0×`, `$0M`, `0 yr`) quando `m.count` existe,
  evitando mostrar o valor final antes da contagem.
- Removido `border-bottom` duplicado de `.case-hero` (causava linha que não fazia fade).
- Removido "Company" redundante do `hero.meta` nos 3 cases (remessa-online, bipa, betterfly).

## Pendente / próximos passos

- **Revisar a distribuição vertical dos 4 blocos em 100dvh** — com `space-between` pode estourar
  altura em mobile (título grande + meta + tagline + grid de métricas de 2 linhas). Testar em
  viewport pequeno e ajustar tamanhos/gaps se necessário.
- Confirmar timing geral do timeline com o usuário (ainda em loop pra ajuste — `repeat: -1, repeatDelay: 1.5`).
  Quando aprovado, considerar trocar para tocar uma vez (ou manter loop só em dev).
- Replicar o ajuste de timing/"flick" para os outros cases (bipa, betterfly) — mesmo componente,
  então já se aplica automaticamente, mas vale revisar visualmente.

## Ambiente de teste

- Dev server: `npm run dev` na porta 3001 (rodando via `nohup`, log em `/tmp/nav-poc-dev.log`).
- Tunnel Cloudflare para celular: `https://perfect-considers-cotton-package.trycloudflare.com`
  (efêmero — se cair, reabrir com `cloudflared tunnel --url http://localhost:3001`).
