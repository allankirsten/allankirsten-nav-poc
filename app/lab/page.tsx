import { ProcessDiagram } from "@/components/explain/ProcessDiagram";
import { howIWorkContent } from "@/content/how-i-work";

export default function Lab() {
  const { process } = howIWorkContent;

  return (
    <main style={{
      background: "#0D0D0D",
      color: "#F5F0E8",
      minHeight: "100vh",
      padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)",
    }}>

      {/* Header */}
      <div style={{ marginBottom: "6rem" }}>
        <p style={{
          fontSize: "0.625rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          opacity: 0.35,
          marginBottom: "0.75rem",
          fontFamily: "monospace",
        }}>
          Lab — visual experiments
        </p>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3.5rem, 10vw, 7rem)",
          lineHeight: 0.88,
          letterSpacing: "-0.02em",
          fontWeight: 400,
        }}>
          Testing<br />ground.
        </h1>
      </div>

      {/* Section: Process Diagram */}
      <section style={{ marginBottom: "8rem" }}>
        <p style={{
          fontSize: "0.625rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          opacity: 0.35,
          marginBottom: "4rem",
          fontFamily: "monospace",
        }}>
          01 — Process diagram
        </p>

        <div style={{ marginBottom: "4rem" }}>
          <ProcessDiagram />
        </div>

        {/* Step list */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "0",
          borderTop: "1px solid rgba(245,240,232,0.08)",
          maxWidth: 800,
          margin: "0 auto",
        }}>
          {process.map((s, i) => (
            <div key={s.step} style={{
              padding: "1.5rem 0",
              borderBottom: "1px solid rgba(245,240,232,0.08)",
              paddingRight: "2rem",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.5rem" }}>
                <span style={{
                  fontSize: "0.625rem",
                  fontFamily: "monospace",
                  letterSpacing: "0.15em",
                  opacity: 0.3,
                }}>
                  {s.step}
                </span>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.375rem",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                }}>
                  {s.label}
                </span>
              </div>
              <p style={{
                fontSize: "0.875rem",
                fontWeight: 300,
                lineHeight: 1.55,
                opacity: 0.45,
                maxWidth: "44ch",
              }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
