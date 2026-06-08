"use client";

const FONTS_URL = [
  "https://fonts.googleapis.com/css2?",
  "family=Syne:wght@400;700;800&",
  "family=Bricolage+Grotesque:wght@300;700;800&",
  "family=Space+Grotesk:wght@300;500;700&",
  "family=Unbounded:wght@400;700;900&",
  "family=Big+Shoulders+Display:wght@400;700;900&",
  "family=Epilogue:wght@400;700;800&",
  "family=Plus+Jakarta+Sans:wght@300;700;800&",
  "family=Barlow+Condensed:wght@400;700;900&",
  "family=Oswald:wght@300;400;700&",
  "family=Familjen+Grotesk:wght@400;700&",
  "family=Bebas+Neue&",
  "family=Anton&",
  "family=Raleway:wght@300;700;900&",
  "family=Darker+Grotesque:wght@300;700;900&",
  "family=Urbanist:wght@300;700;800&",
  "family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,700&",
  "family=DM+Serif+Display:ital@0;1&",
  "family=Instrument+Sans:wght@400;700&",
  "family=Exo+2:wght@300;700;800&",
  "family=Pathway+Extreme:opsz,wght@8..144,300;8..144,700;8..144,900&",
  "display=swap",
].join("");

type Font = {
  rank: string;
  name: string;
  family: string;
  weight: number;
  category: string;
  tags: string[];
  why: string;
  italic?: boolean;
};

const fonts: Font[] = [
  // GEOMÉTRICAS EDITORIAIS
  {
    rank: "01", name: "Syne", family: "Syne", weight: 800, category: "Geométrica editorial",
    tags: ["design studios", "display", "autoral"],
    why: "O favorito de design studios europeus. No 800, o espaçamento ótico cria presença massiva sem esforço. Comunica autoria — portfólio com ponto de vista.",
  },
  {
    rank: "02", name: "Bricolage Grotesque", family: "Bricolage Grotesque", weight: 800, category: "Geométrica editorial",
    tags: ["variável", "editorial", "tech 2024/25"],
    why: "Variável com pesos extremos e caráter editorial. Adotada por marcas tech de ponta. Para quem transita entre design e negócio com fluidez.",
  },
  {
    rank: "03", name: "Epilogue", family: "Epilogue", weight: 800, category: "Geométrica editorial",
    tags: ["incomum", "autoral", "display"],
    why: "Raramente usada. O 'a' e o 'g' têm formas únicas que aparecem em display. Portfólio difícil de confundir com qualquer outro.",
  },
  {
    rank: "04", name: "Familjen Grotesk", family: "Familjen Grotesk", weight: 700, category: "Geométrica editorial",
    tags: ["escandinava", "minimalista", "premium"],
    why: "Minimalismo escandinavo: clean sem ser fria. Conota qualidade e atenção ao detalhe. Menos é mais — mas com intenção clara.",
  },
  {
    rank: "05", name: "Darker Grotesque", family: "Darker Grotesque", weight: 900, category: "Geométrica editorial",
    tags: ["tight", "moderna", "compacta"],
    why: "Letra-spacing naturalmente apertado em pesos altos. Cria densidade visual poderosa sem precisar de ajuste manual. Funciona muito bem em frases curtas.",
  },
  // GEOMÉTRICAS TECH
  {
    rank: "06", name: "Space Grotesk", family: "Space Grotesk", weight: 700, category: "Geométrica tech",
    tags: ["fintech", "web3", "detalhes únicos"],
    why: "Detalhes únicos nas letras (r, a, G) que aparecem nos tamanhos display. Escolha frequente de produtos fintech e web3.",
  },
  {
    rank: "07", name: "Unbounded", family: "Unbounded", weight: 900, category: "Geométrica tech",
    tags: ["sem curvas", "absoluta", "postura"],
    why: "Zero curvas nas extremidades. Geometria absoluta. Para frases assertivas como 'Design decide.' é difícil bater.",
  },
  {
    rank: "08", name: "Plus Jakarta Sans", family: "Plus Jakarta Sans", weight: 800, category: "Geométrica tech",
    tags: ["produto", "equilibrada", "Loom/Linear"],
    why: "Geométrica com toque humanista. Usada por Loom, Linear e startups de produto premium. Equilibra frieza técnica com calor humano.",
  },
  {
    rank: "09", name: "Urbanist", family: "Urbanist", weight: 800, category: "Geométrica tech",
    tags: ["limpa", "moderna", "versátil"],
    why: "Circular e limpa, mas com personalidade nos pesos altos. Muito legível em mobile — bom sinal para um portfólio mobile-first.",
  },
  {
    rank: "10", name: "Exo 2", family: "Exo 2", weight: 800, category: "Geométrica tech",
    tags: ["futurista", "precisa", "técnica"],
    why: "Toques levemente futuristas sem virar sci-fi. Comunica precisão técnica. Para um designer de produto com foco em sistemas e escala.",
  },
  // CONDENSADAS
  {
    rank: "11", name: "Big Shoulders Display", family: "Big Shoulders Display", weight: 900, category: "Condensada",
    tags: ["ultra condensada", "impacto", "americana"],
    why: "Ultra condensada com presença massiva em poucas palavras. Ocupa pouco espaço horizontal mas domina a tela. Para frases de impacto.",
  },
  {
    rank: "12", name: "Barlow Condensed", family: "Barlow Condensed", weight: 900, category: "Condensada",
    tags: ["industrial", "escala", "versátil"],
    why: "Industrial e limpa. Vem de família extensa com muitos pesos. Comunica eficiência e escala — conceitos centrais em quem levou produto de 40k a 4M usuários.",
  },
  {
    rank: "13", name: "Oswald", family: "Oswald", weight: 700, category: "Condensada",
    tags: ["clássica", "autoridade", "atemporal"],
    why: "Condensada clássica que nunca envelhece. Herança do design gráfico americano. Autoridade sem precisar gritar. Para senioridade real.",
  },
  {
    rank: "14", name: "Bebas Neue", family: "Bebas Neue", weight: 400, category: "Condensada",
    tags: ["all-caps", "impacto máximo", "bruta"],
    why: "All-caps por natureza. Bruta e direta. Usada em capas de revistas e cartazes. Para um portfólio que quer entrar como um soco — risco calculado.",
  },
  {
    rank: "15", name: "Anton", family: "Anton", weight: 400, category: "Condensada",
    tags: ["heavy", "direta", "sem desculpa"],
    why: "Sem sutileza. Peso máximo, condensada, all-caps. Para quem tem 20 anos de mercado e não precisa se explicar. Funciona melhor em frases de 2-3 palavras.",
  },
  {
    rank: "16", name: "Pathway Extreme", family: "Pathway Extreme", weight: 900, category: "Condensada",
    tags: ["variável", "extrema", "flexível"],
    why: "Variável com eixo de largura: muda de condensada a expandida numa única família. Flexibilidade máxima para layouts distintos dentro do mesmo portfólio.",
  },
  // ELEGANTES
  {
    rank: "17", name: "Raleway", family: "Raleway", weight: 900, category: "Elegante",
    tags: ["clássica", "W distinto", "premium"],
    why: "O 'W' é inconfundível — cria uma assinatura visual. Elegante em pesos altos. Para um portfólio que quer ser lembrado por sofisticação.",
  },
  {
    rank: "18", name: "Instrument Sans", family: "Instrument Sans", weight: 700, category: "Elegante",
    tags: ["clean", "contemporânea", "neutra forte"],
    why: "Usada pelo Stripe. Neutra mas com caráter nos detalhes. Para um portfólio que quer comunicar confiança e competência sem chamar atenção para a fonte.",
  },
  // SERIFA
  {
    rank: "19", name: "DM Serif Display", family: "DM Serif Display", weight: 400, category: "Serifa",
    tags: ["serifa", "editorial", "contraste"],
    why: "Serifa de alta qualidade com personalidade editorial. Contrasta bem com body em sans-serif. Para um portfólio que quer romper a monotonia da geométrica.",
  },
  {
    rank: "20", name: "Fraunces", family: "Fraunces", weight: 700, category: "Serifa",
    tags: ["variável", "soft serifa", "incomum"],
    why: "Soft serif variável com eixo de 'wonkiness'. Raramente vista em portfólios tech. Escolha de quem quer se posicionar como criativo com substância — não só executor.",
  },
];

const categories = [...new Set(fonts.map((f) => f.category))];

const css = `
  .fb-page {
    min-height: 100vh;
    background: #000;
    color: #fff;
    padding: 2.5rem 1.25rem;
  }
  .fb-header {
    margin-bottom: 4rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #fff;
  }
  .category-label {
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #555;
    margin: 3rem 0 0;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #222;
  }
  .font-card {
    padding: 2rem 0;
    border-bottom: 1px solid #1a1a1a;
  }
  .font-card:last-child {
    border-bottom: none;
  }
  .font-headline {
    overflow-wrap: break-word;
    word-break: break-word;
    line-height: 0.9;
    letter-spacing: -0.02em;
    margin: 1rem 0 0.75rem;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.5rem;
  }
  .tag {
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: 1px solid #333;
    color: #666;
    padding: 0.15rem 0.4rem;
  }
  .why {
    font-size: 0.875rem;
    line-height: 1.6;
    color: #666;
    max-width: 560px;
    margin-top: 0.75rem;
  }
  @media (min-width: 640px) {
    .fb-page { padding: 4rem 2.5rem; }
  }
`;

export default function FontBenchmark() {
  return (
    <main className="fb-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={FONTS_URL} rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="fb-header">
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem", color: "#555" }}>
          AK Design System
        </p>
        <h1 style={{ fontSize: "2rem", fontWeight: 300 }}>Font Benchmark</h1>
        <p style={{ fontSize: "0.875rem", marginTop: "0.5rem", color: "#555" }}>
          20 fontes Google — geométricas, condensadas, editoriais, serifas
        </p>
      </header>

      {categories.map((cat) => (
        <div key={cat}>
          <p className="category-label">{cat}</p>
          {fonts.filter((f) => f.category === cat).map((f) => (
            <div key={f.name} className="font-card">
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.625rem", fontFamily: "monospace", color: "#444" }}>{f.rank}</span>
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "#888" }}>{f.name}</span>
                <span style={{ fontSize: "0.625rem", color: "#444" }}>{f.category}</span>
              </div>

              <div className="tags">
                {f.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>

              <p
                className="font-headline"
                style={{
                  fontFamily: `'${f.family}', sans-serif`,
                  fontWeight: f.weight,
                  fontStyle: f.italic ? "italic" : "normal",
                  fontSize: "clamp(2.25rem, 9vw, 5.5rem)",
                  color: "#fff",
                }}
              >
                Design decide.
              </p>

              <p className="why">{f.why}</p>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}
