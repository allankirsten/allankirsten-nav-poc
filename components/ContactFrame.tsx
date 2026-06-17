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

  const borderColor = text === "#000" ? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.25)";

  const pillStyle = {
    fontFamily: "var(--font-sans)",
    fontSize: "0.875rem",
    letterSpacing: "0.04em",
    color: text,
    border: `1px solid ${borderColor}`,
    borderRadius: "999px",
    padding: "0.75rem 1.75rem",
    background: "transparent",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
  };

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

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <a
          href={contact.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-pill"
          style={pillStyle}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          LinkedIn ↗
        </a>
        <button
          type="button"
          className="contact-pill"
          style={pillStyle}
          onClick={handleCopy}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          {copied ? "Copied!" : "Copy email"} ⧉
        </button>
      </div>
    </div>
  );
}
