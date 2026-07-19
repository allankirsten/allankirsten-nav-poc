import type { Metadata } from "next";
import Link from "next/link";
import { getSite } from "@/lib/content";
import CopyLlmsTxt from "@/components/ui/CopyLlmsTxt";

export const metadata: Metadata = {
  title: "Allan Kirsten, for AIs",
  description:
    "Point your AI at this site and ask anything about Allan Kirsten's work, track record and how he operates.",
};

export default function AiIndex() {
  const site = getSite();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div className="w-full max-w-xl">
        <p style={{ fontSize: "0.875rem", color: "rgba(245,240,232,0.45)", letterSpacing: "0.02em", marginBottom: "2rem" }}>
          {site.name}
        </p>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-heading)",
            lineHeight: "var(--text-heading--line-height)",
            letterSpacing: "-0.01em",
            marginBottom: "1rem",
          }}
        >
          Point your AI here.
        </h1>

        <p style={{ fontSize: "var(--text-body)", lineHeight: "var(--text-body--line-height)", color: "rgba(245,240,232,0.45)", marginBottom: "2.5rem" }}>
          Give your assistant the address below and ask anything about my
          work, my track record, or how I operate.
        </p>

        <div style={{ marginBottom: "3rem" }}>
          <CopyLlmsTxt text={`allankirsten.com${basePath}/llms.txt`} />
          <Link
            href="/llms.txt"
            style={{
              display: "block",
              marginTop: "0.75rem",
              fontSize: "0.875rem",
              color: "rgba(245,240,232,0.45)",
            }}
          >
            open it directly ↗
          </Link>
        </div>

        <div className="flex gap-6" style={{ fontSize: "0.875rem" }}>
          <a href={`mailto:${site.contact.email}`} style={{ color: "var(--accent)" }}>
            {site.contact.email}
          </a>
          <Link href="/" style={{ color: "rgba(245,240,232,0.45)" }}>
            ← home
          </Link>
        </div>
      </div>
    </main>
  );
}
