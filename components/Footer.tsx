import Link from "next/link";

export function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 2,
        background: "#000",
        padding: "1.75rem var(--section-px)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.5rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-caption)",
          letterSpacing: "0.05em",
          color: "#F5F0E8",
          opacity: 0.5,
        }}
      >
        © 2026 Allan Kirsten
      </span>
      <Link
        href="/about-this-website"
        className="text-link"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-caption)",
          letterSpacing: "0.05em",
        }}
      >
        Proudly made by me, as usual.
      </Link>
    </footer>
  );
}
