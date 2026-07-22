const typeScale = [
  {
    token: "display", label: "Display", value: "clamp(5.6rem, 10vw, 9.5rem)", lh: "0.88", weight: 400, font: "display",
    use: "Hero, primary headline",
    example: "Design decides.",
  },
  {
    token: "title", label: "Title", value: "clamp(3.25rem, 7.8vw, 5.85rem)", lh: "0.95", weight: 400, font: "display",
    use: "Page title",
    example: "20 years building products that scale.",
  },
  {
    token: "heading", label: "Heading", value: "clamp(2rem, 4vw, 3rem)", lh: "1.1", weight: 400, font: "display",
    use: "Section title",
    example: "Case Studies",
  },
  {
    token: "subheading", label: "Subheading", value: "clamp(1.5rem, 2.5vw, 2rem)", lh: "1.2", weight: 400, font: "display",
    use: "Subtitle, card title. Token defined, not yet used on the site",
    example: "Remessa Online: Design Leadership",
  },
  {
    token: "lead", label: "Lead", value: "1.25rem", lh: "1.55", weight: 300, font: "sans",
    use: "Opening paragraph",
    example: "I joined when the design team was just me. I left when it was twelve.",
  },
  {
    token: "body", label: "Body", value: "1.125rem", lh: "1.6", weight: 300, font: "sans",
    use: "Standard body copy",
    example: "I mapped the onboarding journey and found 3 drop-off points. We redesigned the flow in two weeks.",
    paragraph: "I mapped the onboarding journey and found 3 drop-off points, all concentrated between signup and the first transaction. We redesigned the flow in two weeks, in parallel with the growth team, without touching the KYC backend. The result showed up in the funnel in the first week post-launch: a visible drop in abandonment and a consistent increase in 7-day activation.",
  },
  {
    token: "caption", label: "Caption", value: "0.875rem", lh: "1.4", weight: 300, font: "sans",
    use: "Captions, metadata",
    example: "Remessa Online · 2016–2020 · Design Leadership",
  },
];

const darkColors = [
  { name: "bg", hex: "#0D0D0D", css: "var(--color-bg)", label: "Bg", note: "Primary background, home, nav in dark state" },
  { name: "text", hex: "#F5F0E8", css: "var(--color-text)", label: "Text", note: "Primary text over dark background" },
  { name: "text-65", hex: "rgba(245,240,232,0.65)", label: "Text · 65%", note: "Defined, not currently used on the site" },
  { name: "text-45", hex: "rgba(245,240,232,0.45)", label: "Text · 45%", note: "Metadata, supporting links, tertiary, also the /ai body paragraph" },
  { name: "text-08", hex: "rgba(245,240,232,0.08)", label: "Text · 8%", note: "Dividers, subtle borders" },
  { name: "accent", hex: "#C8A96E", css: "var(--color-accent)", label: "Accent", note: "Gold, CTA, hover, active state" },
  { name: "accent-40", hex: "rgba(200,169,110,0.4)", label: "Accent · 40%", note: "Subtle accent, highlight borders" },
];

const lightColors = [
  { name: "ink", hex: "#000000", label: "Ink", note: "Titles, maximum emphasis (about, case hero)" },
  { name: "secondary", hex: "#555555", label: "Secondary", note: "Case metadata (case-meta-value)" },
  { name: "support", hex: "#777777", label: "Support", note: "Supporting text, secondary values" },
  { name: "muted", hex: "#888888", label: "Muted", note: "Low-emphasis supporting text" },
  { name: "subtle", hex: "#AAAAAA", label: "Subtle", note: "Captions, labels, below the AA minimum", isLimit: true },
  { name: "divider", hex: "#E5E5E5", label: "Divider", note: "Borders and dividers (case metrics)", isLimit: true },
];

const spacingScale = [
  { rem: "0.25rem", px: "4px", bar: 4, use: "Icon-to-label, tightest gaps" },
  { rem: "0.5rem", px: "8px", bar: 8, use: "Dot pagination, inline icon gaps" },
  { rem: "0.75rem", px: "12px", bar: 12, use: "Label-to-value pairs" },
  { rem: "1.25rem", px: "20px", bar: 20, use: "Card and list internal gaps" },
  { rem: "2rem", px: "32px", bar: 32, use: "Paragraph-to-paragraph, component gaps" },
  { rem: "3rem", px: "48px", bar: 48, use: "Block-to-block within a section" },
  { rem: "5–8rem", px: "80–128px", bar: 104, use: "Section-to-section, scales with viewport" },
];

const css = `
  .ds-page {
    min-height: 100vh;
    padding: 6rem 1.75rem 3.5rem;
    background: #fff;
    color: #000;
  }
  .ds-header {
    margin-bottom: 4rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #000;
  }
  .ds-section {
    margin-bottom: 5.5rem;
  }
  .type-row {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 2rem 0;
    border-bottom: 1px solid #000;
  }
  .type-row:last-child {
    border-bottom: none;
  }
  .type-preview {
    overflow-wrap: break-word;
    word-break: break-word;
  }
  .type-preview.font-display {
    font-family: var(--font-display), serif;
  }
  .type-preview.font-sans {
    font-family: var(--font-sans), sans-serif;
  }
  .type-example {
    margin-top: 1.75rem;
    padding-top: 1.75rem;
    border-top: 1px dashed rgba(0,0,0,0.15);
  }
  .space-row {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    column-gap: 1rem;
    row-gap: 0.5rem;
    padding: 1rem 0;
    border-bottom: 1px solid #000;
  }
  .space-row > div {
    grid-column: 1 / -1;
  }
  .space-row:last-child {
    border-bottom: none;
  }
  .space-bar {
    height: 8px;
    background: #000;
    border-radius: 2px;
  }
  .color-swatch {
    display: grid;
    grid-template-columns: 3rem 1fr;
    align-items: center;
    column-gap: 1.5rem;
    row-gap: 0.5rem;
    padding: 1.25rem 0;
    border-bottom: 1px solid #000;
  }
  .color-swatch:last-of-type {
    border-bottom: none;
  }
  .color-swatch p:last-child {
    grid-column: 1 / -1;
  }
  @media (min-width: 640px) {
    .space-row {
      grid-template-columns: 96px 72px 1fr;
      column-gap: 1.5rem;
    }
    .space-row > div {
      grid-column: auto;
    }
    .color-swatch {
      grid-template-columns: 3rem 180px 1fr;
    }
    .color-swatch p:last-child {
      grid-column: auto;
    }
  }
  .color-chip {
    width: 3rem;
    height: 3rem;
    border: 1px solid #000;
    border-radius: 6px;
    flex-shrink: 0;
  }
  .dark-panel .color-chip {
    border-color: rgba(245,240,232,0.3);
  }
  .dark-panel {
    background: #0D0D0D;
    border-radius: 6px;
    padding: 2rem;
    margin-bottom: 2.5rem;
  }
  .dark-panel .color-swatch {
    border-bottom: 1px solid rgba(245,240,232,0.15);
  }
  .dark-panel .color-swatch:last-child {
    border-bottom: none;
  }
  .cta-base {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.9rem 1.75rem;
    border-radius: 999px;
    font-family: var(--font-sans), sans-serif;
    font-size: 0.8125rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    transition: transform 0.15s ease;
  }
  .cta-base:active {
    transform: scale(0.96);
  }
  .cta-roll {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(200,169,110,0.4);
    color: #F5F0E8;
    background: transparent;
    transition: border-color 0.4s cubic-bezier(0.65,0,0.35,1);
  }
  .cta-roll .roll-mask {
    display: block;
    overflow: hidden;
    height: 1.4em;
  }
  .cta-roll .roll-track {
    display: flex;
    flex-direction: column;
    transition: transform 0.4s cubic-bezier(0.65,0,0.35,1);
  }
  .cta-roll .roll-track span {
    height: 1.4em;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 1px;
  }
  .cta-roll .roll-track span:last-child {
    color: #C8A96E;
  }
  .light-panel {
    background: #fff;
    border: 1px solid #E5E5E5;
    border-radius: 6px;
    padding: 2rem;
  }
  .cta-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  @media (min-width: 640px) {
    .cta-grid {
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
  }
  .cta-roll--light {
    color: #000;
  }
  .cta-roll--light .roll-track span:last-child {
    color: #9C7B45;
  }
  @media (hover: hover) and (pointer: fine) {
    .cta-roll:hover { border-color: #C8A96E; }
    .cta-roll:hover .roll-track { transform: translateY(-1.4em); }
    .cta-roll--light:hover { border-color: #9C7B45; }
  }
  @media (min-width: 640px) {
    .ds-page {
      padding: 5.5rem 3.5rem;
    }
    .ds-header {
      margin-bottom: 6rem;
    }
    .ds-section {
      margin-bottom: 8rem;
    }
    .type-row {
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 2rem;
      align-items: start;
      padding: 2.5rem 0;
    }
  }
`;

export default function DesignSystem() {
  return (
    <main className="ds-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="ds-header">
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Allan Kirsten
        </p>
        <h1 style={{ fontSize: "2rem", fontWeight: 300, marginBottom: "1.5rem" }}>Design System</h1>
        <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "#555", maxWidth: "62ch" }}>
          Less, but better. One display font for a point of view, one body font built to be read without effort, one accent, one radius. A rule survives only if it barely has exceptions.
        </p>
      </header>

      {/* TYPOGRAPHY */}
      <section className="ds-section">
        <SectionTitle>Typography</SectionTitle>
        <div style={{ marginTop: "3rem" }}>
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
                  className={`type-preview font-${t.font}`}
                  style={{ fontSize: t.value, lineHeight: t.lh, fontWeight: t.weight, letterSpacing: "-0.01em" }}
                >
                  The quick brown fox
                </p>
                <p style={{ fontSize: "0.75rem", fontFamily: "monospace", marginTop: "0.5rem" }}>
                  {t.value} / lh {t.lh} / weight {t.weight} / {t.font === "display" ? "DM Serif Display" : "Atkinson Hyperlegible"}
                </p>
                <div className="type-example">
                  <p style={{ fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                    Example
                  </p>
                  <p
                    className={`type-preview font-${t.font}`}
                    style={{ fontSize: t.value, lineHeight: t.lh, fontWeight: t.weight, letterSpacing: "-0.01em" }}
                  >
                    {t.example}
                  </p>
                </div>
                {t.paragraph && (
                  <div className="type-example">
                    <p style={{ fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                      Running paragraph
                    </p>
                    <p
                      className="type-preview font-sans"
                      style={{ fontSize: t.value, lineHeight: t.lh, fontWeight: t.weight, maxWidth: "62ch" }}
                    >
                      {t.paragraph}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COLORS */}
      <section className="ds-section">
        <SectionTitle>Colors</SectionTitle>

        <div style={{ marginTop: "3rem" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Brand: dark theme (home, /ai, nav)
          </p>

          <div className="dark-panel">
            {darkColors.map((c) => (
              <div key={c.name} className="color-swatch">
                <div className="color-chip" style={{ backgroundColor: c.hex }} />
                <div>
                  <p style={{ fontSize: "0.875rem", color: "#F5F0E8" }}>{c.label}</p>
                  <p style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "rgba(245,240,232,0.65)" }}>
                    {c.hex}{c.css ? ` · ${c.css}` : ""}
                  </p>
                </div>
                <p style={{ fontSize: "0.875rem", color: "rgba(245,240,232,0.65)" }}>{c.note}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: "3rem 0 1.5rem" }}>
            Neutrals: light theme (about, cases, this page)
          </p>

          {lightColors.map((c) => (
            <div key={c.name} className="color-swatch">
              <div className="color-chip" style={{ backgroundColor: c.hex }} />
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: c.isLimit ? 700 : 300 }}>{c.label}</p>
                <p style={{ fontSize: "0.875rem", fontFamily: "monospace" }}>{c.hex}</p>
              </div>
              <p style={{ fontSize: "0.875rem", color: c.hex }}>
                {c.note} {c.isLimit && "←"}
              </p>
            </div>
          ))}

          <p style={{ fontSize: "0.75rem", marginTop: "2rem", letterSpacing: "0.05em" }}>
            #AAAAAA and #E5E5E5 don&apos;t pass WCAG AA for normal text (4.5:1 minimum). On the site, they&apos;re restricted to large captions, borders and dividers, never running text.
          </p>
        </div>
      </section>

      {/* RADIUS */}
      <section className="ds-section">
        <SectionTitle>Radius</SectionTitle>
        <div style={{ marginTop: "3rem", display: "flex", alignItems: "center", gap: "2rem" }}>
          <div style={{ width: "3.5rem", height: "3.5rem", border: "1px solid #000", borderRadius: "6px", flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: "0.875rem" }}>One radius, used sparingly: 6px</p>
            <p style={{ fontSize: "0.875rem", color: "#555", marginTop: "0.25rem", maxWidth: "56ch" }}>
              Just enough to soften a sharp corner without pretending to be a rounded-corner app. Applied only where a genuinely sharp-cornered rectangle exists: case images, visual placeholders, color swatches. Never on full-bleed sections, buttons (already pill-shaped, 999px) or avatar/logo (circle, 50%).
            </p>
          </div>
        </div>
      </section>

      {/* SPACING */}
      <section className="ds-section">
        <SectionTitle>Spacing</SectionTitle>
        <p style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "#555", maxWidth: "62ch" }}>
          A rhythm, not a ruler pulled out for every gap. Seven values cover every distance on the site, from an icon sitting next to a label to one section ending and the next beginning.
        </p>

        <div style={{ marginTop: "2.5rem" }}>
          {spacingScale.map((s) => (
            <div key={s.rem} className="space-row">
              <p style={{ fontSize: "0.8125rem", fontFamily: "monospace" }}>{s.rem}</p>
              <p style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "#888" }}>{s.px}</p>
              <div>
                <div className="space-bar" style={{ width: `${s.bar}px` }} />
                <p style={{ fontSize: "0.8125rem", color: "#555", marginTop: "0.5rem" }}>{s.use}</p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "0.875rem", color: "#555", maxWidth: "62ch", marginTop: "2.5rem" }}>
          The last row isn&apos;t one number, it&apos;s a formula: <code style={{ fontFamily: "monospace", fontSize: "0.8125rem" }}>var(--section-px)</code>. Horizontal padding grows with the viewport like the rest of the scale, but past roughly 1600px wide it keeps growing on purpose, capping the content column at 1440px so nothing on a large monitor stretches into an unreadable line. Same variable, every section, every page.
        </p>
      </section>

      {/* COMPONENTS */}
      <section className="ds-section">
        <SectionTitle>Components</SectionTitle>

        <div style={{ marginTop: "3rem" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
            CTA: options, not a decision yet
          </p>
          <p style={{ fontSize: "0.875rem", color: "#555", maxWidth: "62ch", marginBottom: "1.5rem" }}>
            A site that never reacts to a cursor feels unfinished. No CTA anywhere on the site has a hover or active state today, the home pill, the contact links, all of it just sits there static. These two are candidates, not a final pick. Try them with a mouse and on a phone.
          </p>
          <p style={{ fontSize: "0.875rem", color: "#555", maxWidth: "62ch", marginBottom: "2.5rem" }}>
            Rule applied to both: tap always scales down to 96% (150ms) for physical, tactile feedback, no exceptions. Hover effects are wrapped in <code style={{ fontFamily: "monospace", fontSize: "0.8125rem" }}>@media (hover: hover) and (pointer: fine)</code>, so a tap on mobile can never leave a hover state &quot;stuck&quot; the way it does on so many sites. <code style={{ fontFamily: "monospace", fontSize: "0.8125rem" }}>-webkit-tap-highlight-color</code> is off, replaced by the scale.
          </p>

          <div className="cta-grid">
            <div className="dark-panel" style={{ display: "flex", flexDirection: "column", gap: "3rem", marginBottom: 0 }}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,232,0.45)" }}>
                Dark theme: home, /ai, nav
              </p>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                  <button type="button" className="cta-base cta-roll">
                    <span className="roll-mask">
                      <span className="roll-track">
                        <span>Let&apos;s talk</span>
                        <span>Let&apos;s talk</span>
                      </span>
                    </span>
                  </button>
                  <span style={{ fontSize: "0.875rem", color: "#F5F0E8" }}>A: Label roll-up</span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "rgba(245,240,232,0.65)", maxWidth: "56ch" }}>
                  A signature move, not a pattern. The label rolls up and a gold duplicate rolls in behind it, masked inside the pill. Playful and a little unexpected, so it&apos;s best kept to a single spot instead of turning into wallpaper.
                </p>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                  <button type="button" className="cta-underline">
                    See the case
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <span style={{ fontSize: "0.875rem", color: "#F5F0E8" }}>B: Underline + arrow travel</span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "rgba(245,240,232,0.65)", maxWidth: "56ch" }}>
                  Not a pill, a text link. Underline grows from the left, arrow steps diagonally, color turns gold. This is the secondary/tertiary tier: crosslinks, &quot;see the case&quot;, anything that isn&apos;t the one thing you want clicked.
                </p>
              </div>
            </div>

            <div className="light-panel" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>
                Light theme: about, cases
              </p>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                  <button type="button" className="cta-base cta-roll cta-roll--light">
                    <span className="roll-mask">
                      <span className="roll-track">
                        <span>Let&apos;s talk</span>
                        <span>Let&apos;s talk</span>
                      </span>
                    </span>
                  </button>
                  <span style={{ fontSize: "0.875rem", color: "#000" }}>A: Label roll-up</span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "#555", maxWidth: "56ch" }}>
                  Same technique, ink instead of cream. The gold accent gets a shade darker (#9C7B45) here, the brand gold reads fine as a fill, but as text on white it falls short of AA on its own.
                </p>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                  <button type="button" className="cta-underline cta-underline--light">
                    See the case
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <span style={{ fontSize: "0.875rem", color: "#000" }}>B: Underline + arrow travel</span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "#555", maxWidth: "56ch" }}>
                  Same motion, same darker gold on hover for the same contrast reason. This is the version that ships on /about and every case page.
                </p>
              </div>
            </div>
          </div>

          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "3rem", marginBottom: "1rem" }}>
            Text link: a citation, not a button
          </p>
          <p style={{ fontSize: "0.875rem", color: "#555", maxWidth: "62ch", marginBottom: "1.5rem" }}>
            For a reference dropped inside a sentence, running text and an actual button read as too much weight. No uppercase, no arrow, no pill, just an underline that shifts to gold on hover. Same family as the CTA above, quieter register.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            <div className="dark-panel" style={{ marginBottom: 0 }}>
              <p style={{ fontSize: "0.875rem", color: "rgba(245,240,232,0.65)", maxWidth: "40ch" }}>
                Talked through a version of this on{" "}
                <a href="#" className="text-link">Bipa Cast #74</a>, if podcasts are more your speed.
              </p>
            </div>
            <div className="light-panel">
              <p style={{ fontSize: "0.875rem", color: "#555", maxWidth: "40ch" }}>
                Talked through a version of this on{" "}
                <a href="#" className="text-link text-link--light">Bipa Cast #74</a>, if podcasts are more your speed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CASE SIMULADO */}
      <section>
        <SectionTitle>Type in context</SectionTitle>

        <article style={{ marginTop: "5rem", maxWidth: "720px" }}>

          {/* caption — Tertiary: metadado, não é o foco */}
          <p style={{ fontSize: "0.875rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2rem", color: "#555555" }}>
            Fintech · Design Leadership · 2016–2020
          </p>

          {/* title — Ink: ênfase máxima, maior salto do bloco */}
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.25rem, 7.8vw, 5.85rem)", lineHeight: 0.95, fontWeight: 400, letterSpacing: "-0.01em", marginBottom: "3.5rem", overflowWrap: "break-word", color: "#000000" }}>
            Remessa Online
          </h2>

          {/* lead — Primary: main text, maximum attention */}
          <p style={{ fontSize: "1.25rem", lineHeight: 1.55, fontWeight: 300, marginBottom: "2.5rem", color: "#111111" }}>
            I joined when the design team was just me. I left when it was twelve.
          </p>

          {/* body — Secondary: supporting text, continuous reading */}
          <p style={{ fontSize: "1.125rem", lineHeight: 1.6, fontWeight: 300, marginBottom: "4rem", color: "#333333" }}>
            My work was to redesign the signup, transfer and acquisition journeys, and to structure the design team from scratch as the company grew from 10 to over 300 employees.
          </p>

          {/* metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "2rem", borderTop: "1px solid #000", paddingTop: "3rem", marginBottom: "1.5rem" }}>
            {[
              { value: "12×", label: "design team growth" },
              { value: "300+", label: "company headcount" },
              { value: "$229M", label: "exit valuation" },
              { value: "4 yr", label: "of execution" },
            ].map((m) => (
              <div key={m.label}>
                {/* número — Ink: dado principal, impacto visual */}
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, fontWeight: 400, letterSpacing: "-0.01em", color: "#000000" }}>
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
