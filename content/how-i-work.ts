import type { HowIWorkContent } from "./types";

export const howIWorkContent: HowIWorkContent = {
  tagline: "Three principles I've never shipped a good product without. Applied the same way at a seed-stage startup and a company with four million users.",

  pillars: [
    {
      number: "01",
      word: "Clarity.",
      headline: "The most expensive thing in product is building the wrong thing clearly.",
      body: `Before I open Figma, I need to understand the actual problem. Not the symptom, not the feature request — the underlying gap between where the business is and where it needs to be.

This means asking uncomfortable questions early. Who is this for, really? What does success look like in numbers? What happens if we do nothing? Most projects skip this phase because it feels slow. It's the opposite: it's the only thing that makes everything else fast.

Clarity also means alignment. Design decisions made without shared understanding get revisited, revised, and relitigated. I work to make the problem legible to everyone in the room before any solution is proposed.`,
    },
    {
      number: "02",
      word: "Velocity.",
      headline: "Speed is a design principle, not a trade-off.",
      body: `Moving fast is a skill. It requires systems, not shortcuts.

I build with reuse in mind from day one — tokens, components, patterns that compound over time. When the design system is right, new surfaces take hours instead of weeks. When it's wrong, every new screen is a negotiation.

Velocity also means making decisions under uncertainty without freezing. I default to testable assumptions over perfect specifications. A prototype that fails in week two is worth more than a spec that fails in production.

The teams I work with ship faster after I join — not because I work harder, but because I reduce the friction between idea and execution.`,
    },
    {
      number: "03",
      word: "Impact.",
      headline: "Design that doesn't move a number doesn't matter.",
      body: `I measure my work the way the business measures its work: users retained, revenue converted, support tickets not filed, decisions made faster.

This means being present in the conversations where product strategy is made — not as an executor, but as a co-author. The best design decisions I've made happened before any wireframe existed, in a meeting where I asked the right question at the right time.

Impact also accumulates. The design systems I've built are still running products I left years ago. The research frameworks I established became standard practice. Good design work has leverage — it keeps paying after you're gone.`,
    },
  ],

  process: [
    { step: "01", label: "Diagnose", desc: "Understand the real problem. Audit the existing product. Align on what success looks like." },
    { step: "02", label: "Frame",    desc: "Define scope and principles. What are we building and, as importantly, what aren't we." },
    { step: "03", label: "System",   desc: "Establish the design foundation before building surfaces. Tokens, components, patterns." },
    { step: "04", label: "Build",    desc: "Design, prototype, test. Iterate fast. Keep the feedback loop tight." },
    { step: "05", label: "Ship",     desc: "Handoff with precision. QA the implementation. The design isn't done until it's live correctly." },
    { step: "06", label: "Learn",    desc: "Measure against the original hypothesis. Feed learning into the next cycle." },
  ],

  cta: "Want to see this in practice?",
};
