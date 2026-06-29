import { BackButton } from "@/components/BackButton";

export default function About() {
  return (
    <main style={{ background: "#fff", color: "#000", minHeight: "100vh" }}>
      <section style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(1.5rem, 6vw, 6rem)",
        boxSizing: "border-box",
      }}>
        <span style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-caption)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#000",
          opacity: 0.4,
          marginBottom: "2rem",
          display: "block",
        }}>
          About
        </span>

        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-heading)",
          lineHeight: "var(--text-heading--line-height)",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          maxWidth: "22ch",
          color: "#000",
        }}>
          Work in progress.
        </h1>
      </section>

      <BackButton fallback="/" label="Home" />
    </main>
  );
}
