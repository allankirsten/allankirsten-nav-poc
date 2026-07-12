"use client";

const FONTS_URL = [
  "https://fonts.googleapis.com/css2?",
  "family=Inter:wght@400;500;600&",
  "family=Source+Sans+3:wght@400;600&",
  "family=IBM+Plex+Sans:wght@400;500;600&",
  "family=Work+Sans:wght@400;500&",
  "family=Public+Sans:wght@400;600&",
  "family=Karla:wght@400;500&",
  "family=Archivo:wght@400;500;600&",
  "family=Manrope:wght@400;500&",
  "family=Atkinson+Hyperlegible:wght@400;700&",
  "family=Newsreader:ital,wght@0,400;0,500;1,400&",
  "family=Lora:ital,wght@0,400;0,500;1,400&",
  "family=Source+Serif+4:opsz,wght@8..60,400;8..60,500&",
  "family=Spectral:wght@400;500&",
  "family=Crimson+Pro:wght@400;500&",
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
  // SANS NEUTRAS
  {
    rank: "01", name: "Inter", family: "Inter", weight: 400, category: "Sans neutra",
    tags: ["padrão de interface", "testada", "neutra"],
    why: "Padrão de interface moderna, extremamente neutra e testada em tela. Deixa todo o protagonismo para o DM Serif Display nos títulos.",
  },
  {
    rank: "02", name: "Source Sans 3", family: "Source Sans 3", weight: 400, category: "Sans neutra",
    tags: ["Adobe", "x-height generosa", "texto longo"],
    why: "Workhorse open-source da Adobe. x-height generosa, ótima para blocos longos de texto, com leve calor humanista.",
  },
  {
    rank: "03", name: "Public Sans", family: "Public Sans", weight: 400, category: "Sans neutra",
    tags: ["USWDS", "máxima legibilidade", "invisível"],
    why: "Desenhada para máxima legibilidade (USWDS). Praticamente invisível — funciona bem quando o display já carrega toda a personalidade.",
  },
  {
    rank: "04", name: "Atkinson Hyperlegible", family: "Atkinson Hyperlegible", weight: 400, category: "Sans neutra",
    tags: ["acessibilidade", "formas distintas", "legibilidade"],
    why: "Desenhada para acessibilidade máxima — formas de letra distintas mesmo em tamanhos pequenos. Prioriza leitura sobre estilo.",
  },
  // SANS HUMANISTAS
  {
    rank: "05", name: "IBM Plex Sans", family: "IBM Plex Sans", weight: 400, category: "Sans humanista",
    tags: ["personalidade própria", "solidez técnica"],
    why: "Tem personalidade própria sem competir com a serifa do título. Usada pela IBM em todo o design system — comunica solidez técnica.",
  },
  {
    rank: "06", name: "Work Sans", family: "Work Sans", weight: 400, category: "Sans humanista",
    tags: ["morna", "editorial", "consistência"],
    why: "Humanista e morna. Aproxima o tom do corpo de texto do calor editorial do DM Serif Display, criando consistência entre título e parágrafo.",
  },
  {
    rank: "07", name: "Karla", family: "Karla", weight: 400, category: "Sans humanista",
    tags: ["discreta", "terminais humanistas"],
    why: "Geométrica com leves toques humanistas nos terminais. Discreta, mas não genérica — boa opção para textos médios.",
  },
  {
    rank: "08", name: "Archivo", family: "Archivo", weight: 400, category: "Sans humanista",
    tags: ["versátil", "família extensa", "hierarquia"],
    why: "Versátil e neutra, com família extensa de pesos. Boa para hierarquias (legendas, captions, corpo) sem trocar de família.",
  },
  {
    rank: "09", name: "Manrope", family: "Manrope", weight: 400, category: "Sans humanista",
    tags: ["semi-arredondada", "fintech", "leveza"],
    why: "Semi-arredondada e moderna. Aproxima o tom do produto (fintech/tech) mantendo leveza no texto longo.",
  },
  // SERIFAS EDITORIAIS
  {
    rank: "10", name: "Newsreader", family: "Newsreader", weight: 400, category: "Serifa editorial",
    tags: ["leitura longa", "harmonia tonal"],
    why: "Serifa editorial do Google, pensada para leitura longa em tela. Cria harmonia tonal com o DM Serif Display sem repetir a mesma fonte.",
  },
  {
    rank: "11", name: "Lora", family: "Lora", weight: 400, category: "Serifa editorial",
    tags: ["calorosa", "itálicos elegantes"],
    why: "Serifa contemporânea e calorosa, com itálicos elegantes. Reforça o tom editorial do título sem competir em peso visual.",
  },
  {
    rank: "12", name: "Source Serif 4", family: "Source Serif 4", weight: 400, category: "Serifa editorial",
    tags: ["Adobe", "texto corrido", "técnica"],
    why: "Serifa irmã da Source Sans, desenhada para texto corrido longo. Combina tecnicamente bem com qualquer sans no resto do sistema.",
  },
  {
    rank: "13", name: "Spectral", family: "Spectral", weight: 400, category: "Serifa editorial",
    tags: ["alto contraste", "presença sutil", "destaque"],
    why: "Serifa de alto contraste com presença sutil. Para blocos de texto que merecem destaque (intros, citações) sem virar display.",
  },
  {
    rank: "14", name: "Crimson Pro", family: "Crimson Pro", weight: 400, category: "Serifa editorial",
    tags: ["livro clássico", "literário", "case studies"],
    why: "Inspirada em serifas de livro clássicas. Traz peso literário ao corpo de texto — bom para textos longos tipo case studies.",
  },
];

const categories = [...new Set(fonts.map((f) => f.category))];

const SAMPLE_PARAGRAPH =
  "Passei os últimos 20 anos na interseção entre design, produto e operação — de startups que saíram do zero a empresas que escalaram para milhões de usuários. Hoje, como Head of Product na Bipa, trago essa experiência para o ecossistema Bitcoin, traduzindo complexidade técnica em produtos que qualquer pessoa consegue usar.";

const SAMPLE_META = "Head of Product · Bipa · 2025–hoje";

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
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin: 1rem 0 1rem;
  }
  .font-meta {
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
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
    margin-top: 1rem;
  }
  @media (min-width: 640px) {
    .fb-page { padding: 4rem 2.5rem; }
  }
`;

export default function FontBenchmarkBody() {
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
        <h1 style={{ fontSize: "2rem", fontWeight: 300 }}>Paragraph Font Benchmark</h1>
        <p style={{ fontSize: "0.875rem", marginTop: "0.5rem", color: "#555" }}>
          14 fontes de corpo, pareadas com DM Serif Display (título já escolhido para o site)
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

              {/* Título de referência, sempre em DM Serif Display via --font-display do layout */}
              <h2
                className="font-headline"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem, 5vw, 3rem)",
                  color: "#fff",
                }}
              >
                Allan Kirsten
              </h2>

              <p
                className="font-meta"
                style={{
                  fontFamily: `'${f.family}', sans-serif`,
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  color: "#888",
                }}
              >
                {SAMPLE_META}
              </p>

              <p
                style={{
                  fontFamily: `'${f.family}', sans-serif`,
                  fontWeight: f.weight,
                  fontStyle: f.italic ? "italic" : "normal",
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  maxWidth: "620px",
                  color: "#ddd",
                }}
              >
                {SAMPLE_PARAGRAPH}
              </p>

              <p className="why">{f.why}</p>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}
