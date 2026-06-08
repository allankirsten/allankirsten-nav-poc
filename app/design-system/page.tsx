const typeScale = [
  {
    token: "display", label: "Display", value: "clamp(5.6rem, 14.4vw, 12rem)", lh: "0.88", weight: 700,
    use: "Hero, manchete principal",
    example: "Design decide.",
  },
  {
    token: "title", label: "Title", value: "clamp(3.25rem, 7.8vw, 5.85rem)", lh: "0.95", weight: 700,
    use: "Título de página",
    example: "20 anos criando produtos que escalam.",
  },
  {
    token: "heading", label: "Heading", value: "clamp(2rem, 4vw, 3rem)", lh: "1.1", weight: 300,
    use: "Título de seção",
    example: "Case Studies",
  },
  {
    token: "subheading", label: "Subheading", value: "clamp(1.5rem, 2.5vw, 2rem)", lh: "1.2", weight: 300,
    use: "Subtítulo, card title",
    example: "Remessa Online — Growth & Design System",
  },
  {
    token: "lead", label: "Lead", value: "1.25rem", lh: "1.55", weight: 300,
    use: "Parágrafo de abertura",
    example: "Entrei quando o produto tinha 40k usuários. Saí quando tinha 4 milhões.",
  },
  {
    token: "body", label: "Body", value: "1.125rem", lh: "1.6", weight: 300,
    use: "Texto corrido padrão",
    example: "Mapeei a jornada de onboarding e identifiquei 3 pontos de abandono. Redesenhamos o fluxo em duas semanas.",
  },
  {
    token: "caption", label: "Caption", value: "0.875rem", lh: "1.4", weight: 300,
    use: "Legendas, metadados",
    example: "Remessa Online · 2021–2022 · Growth, Design System",
  },
];

const css = `
  .ds-page {
    min-height: 100vh;
    padding: 2.5rem 1.25rem;
    background: #fff;
    color: #000;
  }
  .ds-header {
    margin-bottom: 3rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #000;
  }
  .ds-section {
    margin-bottom: 4rem;
  }
  .type-row {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem 0;
    border-bottom: 1px solid #000;
  }
  .type-row:last-child {
    border-bottom: none;
  }
  .type-preview {
    overflow-wrap: break-word;
    word-break: break-word;
  }
  .type-example {
    margin-top: 1.25rem;
    padding-top: 1.25rem;
    border-top: 1px dashed #000;
  }
  @media (min-width: 640px) {
    .ds-page {
      padding: 4rem 2.5rem;
    }
    .ds-header {
      margin-bottom: 4rem;
    }
    .type-row {
      display: grid;
      grid-template-columns: 160px 1fr;
      gap: 1.5rem;
      align-items: start;
      padding: 1.5rem 0;
    }
  }
`;

export default function DesignSystem() {
  return (
    <main className="ds-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="ds-header">
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          AK Design System
        </p>
        <h1 style={{ fontSize: "2rem", fontWeight: 300 }}>Design System</h1>
      </header>

      {/* TYPOGRAPHY */}
      <section className="ds-section">
        <SectionTitle>Typography</SectionTitle>
        <div style={{ marginTop: "2rem" }}>
          {typeScale.map((t) => (
            <div key={t.token} className="type-row">
              <div>
                <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>
                  {t.label}
                </p>
                <p style={{ fontSize: "0.75rem", fontFamily: "monospace", marginBottom: "0.25rem" }}>
                  text-{t.token}
                </p>
                <p style={{ fontSize: "0.75rem" }}>{t.use}</p>
              </div>
              <div>
                <p
                  className="type-preview"
                  style={{ fontSize: t.value, lineHeight: t.lh, fontWeight: t.weight, letterSpacing: "-0.01em" }}
                >
                  The quick brown fox
                </p>
                <p style={{ fontSize: "0.75rem", fontFamily: "monospace", marginTop: "0.5rem" }}>
                  {t.value} / lh {t.lh}
                </p>
                <div className="type-example">
                  <p style={{ fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                    Exemplo
                  </p>
                  <p
                    className="type-preview"
                    style={{ fontSize: t.value, lineHeight: t.lh, fontWeight: t.weight, letterSpacing: "-0.01em" }}
                  >
                    {t.example}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COLORS */}
      <section className="ds-section">
        <SectionTitle>Colors</SectionTitle>

        <div style={{ marginTop: "2rem" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Grays — texto sobre fundo branco
          </p>

          {[
            { name: "ink",       hex: "#000000", label: "Ink",       note: "Títulos, ênfase máxima" },
            { name: "primary",   hex: "#111111", label: "Primary",   note: "Texto corrido principal" },
            { name: "secondary", hex: "#333333", label: "Secondary", note: "Texto de suporte" },
            { name: "tertiary",  hex: "#555555", label: "Tertiary",  note: "Labels, metadados" },
            { name: "limit",     hex: "#767676", label: "Limit",     note: "Mínimo WCAG AA (4.5:1)", isLimit: true },
          ].map((c) => (
            <div
              key={c.name}
              style={{
                display: "grid",
                gridTemplateColumns: "2.5rem 140px 1fr",
                alignItems: "center",
                gap: "1rem",
                padding: "0.75rem 0",
                borderBottom: "1px solid #000",
              }}
            >
              <div style={{ width: "2.5rem", height: "2.5rem", background: c.hex, border: "1px solid #000", flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: c.isLimit ? 700 : 300 }}>{c.label}</p>
                <p style={{ fontSize: "0.875rem", fontFamily: "monospace" }}>{c.hex}</p>
              </div>
              <p style={{ fontSize: "0.875rem", color: c.hex }}>
                {c.note} {c.isLimit && "←"}
              </p>
            </div>
          ))}

          <p style={{ fontSize: "0.75rem", marginTop: "1.25rem", letterSpacing: "0.05em" }}>
            Cinzas acima de #767676 não passam em WCAG AA para texto normal. Usar apenas em elementos decorativos ou texto grande (+24px).
          </p>
        </div>
      </section>

      {/* SPACING */}
      <section className="ds-section">
        <SectionTitle>Spacing</SectionTitle>
        <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>Em breve.</p>
      </section>

      {/* COMPONENTS */}
      <section className="ds-section">
        <SectionTitle>Components</SectionTitle>
        <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>Em breve.</p>
      </section>

      {/* CASE SIMULADO */}
      <section>
        <SectionTitle>Type in context</SectionTitle>

        <article style={{ marginTop: "3rem", maxWidth: "720px" }}>

          {/* caption — Tertiary: metadado, não é o foco */}
          <p style={{ fontSize: "0.875rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem", color: "#555555" }}>
            Fintech · Growth · Design System · 2021–2022
          </p>

          {/* title — Ink: ênfase máxima */}
          <h2 style={{ fontSize: "clamp(3.25rem, 7.8vw, 5.85rem)", lineHeight: 0.95, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "2rem", overflowWrap: "break-word", color: "#000000" }}>
            Remessa Online
          </h2>

          {/* lead — Primary: texto principal, máxima atenção */}
          <p style={{ fontSize: "1.25rem", lineHeight: 1.55, fontWeight: 300, marginBottom: "2rem", color: "#111111" }}>
            Entrei quando o produto tinha 40 mil usuários ativos. Saí quando tinha 4 milhões.
          </p>

          {/* body — Secondary: texto de suporte, leitura contínua */}
          <p style={{ fontSize: "1.125rem", lineHeight: 1.6, fontWeight: 300, marginBottom: "3rem", color: "#333333" }}>
            Meu trabalho foi mapear os pontos de abandono no fluxo de onboarding e redesenhar a experiência de ponta a ponta. Em paralelo, estruturei o primeiro Design System da empresa, reduzindo o tempo de entrega de novas interfaces em 60%.
          </p>

          {/* métricas */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1.5rem", borderTop: "1px solid #000", paddingTop: "2rem", marginBottom: "1.5rem" }}>
            {[
              { value: "100×", label: "crescimento de base" },
              { value: "−60%", label: "tempo de entrega" },
              { value: "$229M", label: "valuation no exit" },
              { value: "1 ano", label: "de execução" },
            ].map((m) => (
              <div key={m.label}>
                {/* número — Ink: dado principal, impacto visual */}
                <p style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, fontWeight: 300, letterSpacing: "-0.02em", color: "#000000" }}>
                  {m.value}
                </p>
                {/* label — Tertiary: contexto, segundo plano */}
                <p style={{ fontSize: "0.875rem", lineHeight: 1.4, marginTop: "0.25rem", color: "#555555" }}>
                  {m.label}
                </p>
              </div>
            ))}
          </div>

        </article>
      </section>
    </main>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <h2 style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
        {children}
      </h2>
      <div style={{ flex: 1, height: 1, background: "#000" }} />
    </div>
  );
}
