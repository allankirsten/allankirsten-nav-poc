import type { Testimonial } from "@/content/types";
import { ScrollGallery } from "@/components/ScrollGallery";

const css = `
  .testimonial-track {
    justify-content: flex-start;
    gap: clamp(2.5rem, 6vw, 8rem);
    scroll-padding-inline: clamp(2rem, 8vw, 8rem);
    padding: 0 clamp(2rem, 8vw, 8rem) 0.5rem;
  }
  .testimonial-card {
    width: clamp(260px, 65vw, 688px);
    box-sizing: border-box;
  }
`;

function splitQuote(quote: string): { lead: string; rest: string } {
  const match = quote.match(/^(.+?[.!?])\s+([\s\S]+)$/);
  if (match) return { lead: match[1], rest: match[2] };
  return { lead: quote, rest: "" };
}

export function TestimonialsFrame({
  testimonials,
  label,
  text,
}: {
  testimonials: Testimonial[];
  label: string;
  text: string;
}) {
  const items = testimonials.slice(0, 5);

  return (
    <div
      className="frame-text"
      style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
        willChange: "transform",
        gap: "2.5rem",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div style={{ paddingLeft: "var(--section-px)" }}>
        <span
          className="frame-label"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-caption)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: text,
            display: "block",
          }}
        >
          {label}
        </span>
      </div>

      <ScrollGallery
        trackClassName="testimonial-track"
        slideClassName="testimonial-card"
        dotColor={text}
        activeDotColor="var(--accent)"
        dotLabel={(i) => `Ir para depoimento ${i + 1}`}
        renderSlide={(slide, _i, active) => (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", opacity: active ? 1 : 0.35, transition: "opacity 0.35s ease" }}>
            {slide}
          </div>
        )}
        slides={items.map((t) => {
          const { lead, rest } = splitQuote(t.quote);
          return (
            <>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "3.5rem",
                  lineHeight: 1,
                  color: "var(--accent)",
                  opacity: 0.5,
                }}
              >
                &ldquo;
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "-1.5rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 2.4vw, 2.5rem)",
                    lineHeight: 1.2,
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    color: text,
                  }}
                >
                  {lead}
                </p>
                {rest && (
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(1.125rem, 1.2vw, 1.25rem)",
                      lineHeight: 1.6,
                      fontWeight: 300,
                      color: text,
                      opacity: 0.6,
                    }}
                  >
                    {rest}
                  </p>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8125rem",
                    letterSpacing: "0.04em",
                    color: text,
                  }}
                >
                  {t.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.04em",
                    color: text,
                    opacity: 0.5,
                  }}
                >
                  {t.role}, {t.company}
                </span>
              </div>
            </>
          );
        })}
      />
    </div>
  );
}
