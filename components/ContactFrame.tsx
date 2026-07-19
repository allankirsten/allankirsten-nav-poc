"use client";

import { useState } from "react";
import { contact } from "@/content/contact";

// navigator.clipboard requires a secure context (HTTPS or localhost);
// the LAN preview runs over plain HTTP, so fall back to execCommand there.
async function copyToClipboard(value: string) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // fall through to legacy fallback
    }
  }
  const ta = document.createElement("textarea");
  ta.value = value;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

export function ContactFrame({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);

  const ctaClass = `contact-pill cta-underline${text === "#000" ? " cta-underline--light" : ""}`;

  const handleCopy = async () => {
    await copyToClipboard(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

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
        maxWidth: "80ch",
        boxSizing: "border-box",
        willChange: "transform",
        gap: "2rem",
      }}
    >
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

      <h2
        className="contact-heading"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-heading)",
          lineHeight: "var(--text-heading--line-height)",
          fontWeight: 400,
          color: text,
          letterSpacing: "-0.01em",
          maxWidth: "18ch",
          textAlign: "left",
        }}
      >
        No forms. Just reach out.
      </h2>

      <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
        <a
          href={contact.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={ctaClass}
        >
          LinkedIn
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <button type="button" className={ctaClass} onClick={handleCopy}>
          {copied ? "Copied!" : "Copy email"} ⧉
        </button>
      </div>
    </div>
  );
}
