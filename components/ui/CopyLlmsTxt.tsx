"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const ACCENT = "#C8A96E";
const SUCCESS = "#4ADE80";

export default function CopyLlmsTxt({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const clipboardRef = useRef<SVGSVGElement>(null);
  const checkRef = useRef<SVGSVGElement>(null);

  const handleCopy = async () => {
    if (buttonRef.current) {
      gsap
        .timeline()
        .to(buttonRef.current, { scale: 0.94, duration: 0.18, ease: "power2.out" })
        .to(buttonRef.current, { scale: 1, duration: 0.5, ease: "power3.out" });
    }

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  useEffect(() => {
    const clipboard = clipboardRef.current;
    const check = checkRef.current;
    if (!clipboard || !check) return;

    if (copied) {
      gsap.to(clipboard, { opacity: 0, scale: 0.6, duration: 0.2, ease: "power2.in" });
      gsap.set(check, { color: SUCCESS });
      gsap.fromTo(
        check,
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(2)",
          onComplete: () => {
            gsap.to(check, { color: ACCENT, duration: 0.9, delay: 0.25, ease: "power1.inOut" });
          },
        }
      );
    } else {
      gsap.to(check, { opacity: 0, scale: 0.6, duration: 0.2, ease: "power2.in" });
      gsap.to(clipboard, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" });
    }
  }, [copied]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 transition-colors"
      style={{
        fontFamily: "var(--font-mono, monospace)",
        fontSize: "0.9375rem",
        color: "var(--accent)",
        background: "none",
        border: "none",
        borderBottom: "1px solid rgba(200,169,110,0.4)",
        paddingBottom: "4px",
        cursor: "pointer",
      }}
    >
      <span>{text}</span>
      <span style={{ position: "relative", display: "inline-flex", width: 16, height: 16 }}>
        <svg
          ref={clipboardRef}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ position: "absolute", inset: 0 }}
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg
          ref={checkRef}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ position: "absolute", inset: 0, opacity: 0 }}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    </button>
  );
}
