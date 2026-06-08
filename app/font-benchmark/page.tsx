"use client";

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Bricolage+Grotesque:wght@300;700;800&family=Space+Grotesk:wght@300;500;700&family=Unbounded:wght@400;700;900&family=Big+Shoulders+Display:wght@400;700;900&family=Barlow+Condensed:ital,wght@0,400;0,700;0,900&family=Oswald:wght@300;400;700&family=Plus+Jakarta+Sans:wght@300;700;800&family=Epilogue:wght@400;700;800&family=Familjen+Grotesk:wght@400;700&display=swap";

const fonts = [
  {
    rank: "01",
    name: "Syne",
    family: "Syne",
    weight: "800",
    tags: ["editorial", "design studios", "display"],
    why: "O favorito de design studios europeus. No peso 800, o espaçamento ótico cria presença massiva sem esforço. Comunica autoria — ideal para um portfólio que quer deixar claro que tem ponto de vista.",
  },
  {
    rank: "02",
    name: "Bricolage Grotesque",
    family: "Bricolage Grotesque",
    weight: "800",
    tags: ["variável", "editorial", "tech de ponta"],
    why: "Variável com pesos extremos e caráter editorial sem abrir mão de legibilidade. Adotada por marcas tech em 2024/25. Para um líder que transita entre design e negócio com fluidez.",
  },
  {
    rank: "03",
    name: "Space Grotesk",
    family: "Space Grotesk",
    weight: "700",
    tags: ["geométrica", "fintech", "web3"],
    why: "Geométrica com detalhes únicos (r, a, G) que aparecem nos tamanhos display. Escolha frequente de produtos fintech e web3. Comunica precisão com personalidade.",
  },
  {
    rank: "04",
    name: "Unbounded",
    family: "Unbounded",
    weight: "900",
    tags: ["sem curvas", "tech", "postura"],
    why: "Zero curvas nas extremidades — geometria absoluta. Transmite postura firme e tech de ponta. Para frases assertivas como 'Design decide.' funciona melhor do que qualquer outra.",
  },
  {
    rank: "05",
    name: "Big Shoulders Display",
    family: "Big Shoulders Display",
    weight: "900",
    tags: ["ultra condensada", "impacto", "americana"],
    why: "Ultra condensada com presença massiva em poucas palavras. Herança do design gráfico americano dos anos 40, atualizada. Ocupa pouco espaço horizontal mas domina a tela.",
  },
  {
    rank: "06",
    name: "Epilogue",
    family: "Epilogue",
    weight: "800",
    tags: ["caráter", "editorial", "diferenciada"],
    why: "Tem personalidade nos pesos extremos: o 'a' e o 'g' têm formas únicas que aparecem em display. Raramente usada — seu portfólio seria difícil de confundir com qualquer outro.",
  },
  {
    rank: "07",
    name: "Plus Jakarta Sans",
    family: "Plus Jakarta Sans",
    weight: "800",
    tags: ["moderna", "produto", "equilibrada"],
    why: "Geométrica com toques humanistas. Escolha de startups de produto de alto nível (Loom, Linear). Equilibra frieza técnica com calor humano — espelho do perfil de quem faz produto com foco em pessoa.",
  },
  {
    rank: "08",
    name: "Barlow Condensed",
    family: "Barlow Condensed",
    weight: "900",
    tags: ["condensada", "industrial", "escala"],
    why: "Industrial, limpa, forte. Vem de uma família extensa com muitos pesos e larguras. Comunica eficiência e escala — conceitos centrais na trajetória de quem levou um produto de 40k a 4M usuários.",
  },
  {
    rank: "09",
    name: "Oswald",
    family: "Oswald",
    weight: "700",
    tags: ["clássica", "condensada", "autoridade"],
    why: "Condensada clássica que nunca envelhece. Herança direta do tipo display americano. Comunica autoridade sem precisar gritar. Para senioridade, funciona melhor do que fontes que tentam parecer novas.",
  },
  {
    rank: "10",
    name: "Familjen Grotesk",
    family: "Familjen Grotesk",
    weight: "700",
    tags: ["escandinava", "minimalista", "premium"],
    why: "Minimalismo escandinavo: clean sem ser fria. Conota qualidade e atenção ao detalhe. Para um designer que entende que menos é mais — mas com intenção clara por trás de cada escolha.",
  },
];

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
  .font-card {
    padding: 2.5rem 0;
    border-bottom: 1px solid #333;
  }
  .font-card:last-child {
    border-bottom: none;
  }
  .font-headline {
    overflow-wrap: break-word;
    word-break: break-word;
    line-height: 0.9;
    letter-spacing: -0.02em;
    margin: 1.5rem 0;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .tag {
    font-size: 0.625rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border: 1px solid #fff;
    padding: 0.2rem 0.5rem;
  }
  .weights {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-top: 1.25rem;
    padding-top: 1.25rem;
    border-top: 1px dashed #333;
  }
  @media (min-width: 640px) {
    .fb-page {
      padding: 4rem 2.5rem;
    }
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
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem", color: "#666" }}>
          AK Design System
        </p>
        <h1 style={{ fontSize: "2rem", fontWeight: 300 }}>Font Benchmark</h1>
        <p style={{ fontSize: "0.875rem", marginTop: "0.5rem", color: "#666" }}>
          10 fontes Google selecionadas por perfil — produto, liderança, fintech, autoria
        </p>
      </header>

      {fonts.map((f) => (
        <div key={f.name} className="font-card">

          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "#555" }}>{f.rank}</span>
            <span style={{ fontSize: "0.875rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>{f.name}</span>
          </div>

          <div className="tags">
            {f.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <p
            className="font-headline"
            style={{ fontFamily: `'${f.family}', sans-serif`, fontWeight: Number(f.weight), fontSize: "clamp(2.5rem, 10vw, 6rem)" }}
          >
            Design decide.
          </p>

          <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "#aaa", maxWidth: "600px" }}>
            {f.why}
          </p>

          <div className="weights">
            {[["300", "Light"], ["400", "Regular"], [f.weight, "Display"]].map(([w, label]) => (
              <span
                key={w}
                style={{ fontFamily: `'${f.family}', sans-serif`, fontWeight: Number(w), fontSize: "1rem", color: "#fff" }}
              >
                {label}
              </span>
            ))}
          </div>

        </div>
      ))}
    </main>
  );
}
