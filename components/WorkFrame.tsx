import Link from "next/link";
import type { WorkItem } from "@/content/types";

const css = `
  .work-row { text-decoration: none; color: inherit; transition: opacity 0.2s ease; }
  .work-row:active { opacity: 0.7; }
  .work-row-name { transition: color 0.25s ease; }
  .work-row-arrow { transition: transform 0.35s cubic-bezier(0.65, 0, 0.35, 1); flex-shrink: 0; }
  @media (hover: hover) and (pointer: fine) {
    .work-row:hover .work-row-name { color: var(--row-accent); }
    .work-row:hover .work-row-arrow { transform: translate(4px, -4px); }
  }
`;

export function WorkFrame({
  items,
  label,
  text,
  onLinkClick,
}: {
  items: WorkItem[];
  label: string;
  text: string;
  onLinkClick: () => void;
}) {
  const isLight = text === "#000";
  const rowBorder = isLight ? "rgba(0, 0, 0, 0.15)" : "rgba(245, 240, 232, 0.15)";
  const rowAccent = isLight ? "#9C7B45" : "#C8A96E";

  return (
    <div
      className="frame-text"
      style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        boxSizing: "border-box",
        willChange: "transform",
        ["--row-accent" as string]: rowAccent,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <span
        className="frame-label"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-caption)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: text,
          marginBottom: "1.5rem",
          display: "block",
        }}
      >
        {label}
      </span>

      <h2
        className="work-heading"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-heading)",
          lineHeight: "var(--text-heading--line-height)",
          fontWeight: 400,
          color: text,
          letterSpacing: "-0.01em",
          textAlign: "left",
        }}
      >
        Selected work.
      </h2>

      <p
        className="frame-sub"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-caption)",
          fontWeight: 300,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: text,
          opacity: 0.5,
          marginTop: "1.25rem",
          textAlign: "left",
        }}
      >
        From seed to scale.
      </p>

      <div style={{ width: "100%", marginTop: "clamp(2rem, 5vw, 3.5rem)" }}>
        {items.map((item, i) => (
          <Link
            key={item.slug}
            href={`/cases/${item.slug}`}
            onClick={onLinkClick}
            className="work-row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
              width: "100%",
              padding: "clamp(1.25rem, 3vw, 1.75rem) 0",
              borderBottom: i < items.length - 1 ? `1px solid ${rowBorder}` : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(1rem, 3vw, 1.75rem)", minWidth: 0 }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-caption)",
                  color: text,
                  opacity: 0.4,
                  flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", minWidth: 0 }}>
                <span
                  className="work-row-name"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)",
                    lineHeight: 1.1,
                    fontWeight: 400,
                    color: text,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-body)",
                    fontWeight: 300,
                    color: text,
                    opacity: 0.6,
                  }}
                >
                  {item.tagline}
                </span>
              </div>
            </div>
            <svg
              className="work-row-arrow"
              width="20"
              height="20"
              viewBox="0 0 14 14"
              fill="none"
              style={{ color: text }}
            >
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
