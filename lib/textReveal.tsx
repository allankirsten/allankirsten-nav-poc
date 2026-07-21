/**
 * Text-splitting helpers behind the home hero's entrance (word-by-word title,
 * char-by-char subtext with natural pauses at spaces/commas/periods). Shared
 * so /about and /how-i-work can reuse the exact same reveal, not a variant.
 */

/** Splits text into word spans for a staggered word-by-word reveal. */
export function renderWords(text: string) {
  const words = text.split(" ");
  return words.map((w, i) => (
    <span key={i} className="word" style={{ display: "inline-block", whiteSpace: "pre" }}>
      {i < words.length - 1 ? w + " " : w}
    </span>
  ));
}

/**
 * Splits text into char spans for a per-character reveal. Each word's letters
 * are grouped in a no-wrap wrapper so the line can only break between words,
 * never mid-word — plain char-by-char spans have no notion of "word" and let
 * the browser wrap anywhere once the text needs more than one line.
 */
export function renderChars(text: string) {
  const words = text.split(" ");
  let i = 0;
  const nodes: React.ReactNode[] = [];

  words.forEach((word, wi) => {
    const chars = word.split("").map((ch) => {
      const span = (
        <span key={i} className="sub-char" style={{ display: "inline-block", whiteSpace: "pre" }}>
          {ch}
        </span>
      );
      i++;
      return span;
    });
    nodes.push(
      <span key={`w${wi}`} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
        {chars}
      </span>
    );
    if (wi < words.length - 1) {
      nodes.push(
        <span key={`s${wi}`} className="sub-char" style={{ display: "inline-block", whiteSpace: "pre" }}>
          {" "}
        </span>
      );
      i++;
    }
  });

  return nodes;
}

/** Per-character entry delays so the reveal pauses naturally at spaces, commas, and periods. */
export function getSubCharDelays(text: string) {
  const BASE = 0.045;
  const SPACE_PAUSE = 0.09;
  const COMMA_PAUSE = 0.28;
  const PERIOD_PAUSE = 0.45;
  const delays: number[] = [];
  let t = 0;
  for (let i = 0; i < text.length; i++) {
    delays.push(t);
    const ch = text[i];
    let gap = BASE;
    if (ch === ",") gap += COMMA_PAUSE;
    else if (ch === ".") gap += PERIOD_PAUSE;
    else if (ch === " ") gap += SPACE_PAUSE;
    t += gap;
  }
  return delays;
}

/**
 * The house char-reveal tween, as a {from, to} pair instead of a live tween:
 * every caller positions it differently (a bare `delay`, a spot in someone
 * else's GSAP timeline), so this stays agnostic to how it gets played.
 * `extra` merges into `to` — pass `{ delay }` or a timeline `position`, etc.
 * For a short line only (home frame sub, case tagline) — the letter-by-letter
 * pace is itself part of the effect. For paragraph-length subtext, that same
 * pace reads as frantic; use `wordRevealVars` instead.
 */
export function charRevealVars(text: string, extra?: gsap.TweenVars) {
  const delays = getSubCharDelays(text);
  return {
    from: { opacity: 0, y: 12 } as gsap.TweenVars,
    to: {
      opacity: 1,
      y: 0,
      stagger: (i: number) => delays[i],
      duration: 0.6,
      ease: "power2.out",
      ...extra,
    } as gsap.TweenVars,
  };
}

/**
 * A calm, word-by-word fade for paragraph-length subtext (/about,
 * /how-i-work) — pairs with `renderWords`, not `renderChars`. A plain,
 * even stagger reads as settled; no per-word pause logic, no y-jump or
 * scale like the title reveal, just opacity easing in one word at a time.
 */
export function wordRevealVars(extra?: gsap.TweenVars) {
  return {
    from: { opacity: 0, y: 6 } as gsap.TweenVars,
    to: {
      opacity: 1,
      y: 0,
      stagger: 0.09,
      duration: 0.8,
      ease: "power1.out",
      ...extra,
    } as gsap.TweenVars,
  };
}
