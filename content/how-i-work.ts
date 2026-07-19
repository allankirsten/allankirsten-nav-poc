import type { HowIWorkContent } from "./types";

export const howIWorkContent: HowIWorkContent = {
  tagline: "Four principles I've never shipped a good product without. Applied the same way at a seed-stage startup and a company scaling past a million users.",

  pillars: [
    {
      number: "01",
      word: "Context.",
      headline: "Context is the first deliverable, not a step before the real work.",
      body: `Before Figma, before any proposal, comes the hunt for context. Not the feature request, the real problem underneath it: who this is actually for, what the data says, what the business can't afford to get wrong.

Context on its own is just noise. My habit is to structure it into frameworks, jobs, clusters, whatever turns the shape of a problem into something legible instead of a pile of notes only I understand.

Then it gets shared. Structured context becomes what the whole team works from, not something carried around in one person's head. Gather, structure, share: that's the sequence, in that order, every time.`,
    },
    {
      number: "02",
      word: "Velocity.",
      headline: "Speed is a design principle, not a trade-off.",
      body: `Moving fast is a skill. It takes systems, not shortcuts.

My approach from day one is to build with reuse in mind, tokens, components, patterns that compound over time. A good design system turns new surfaces into hours of work instead of weeks. Get it wrong, and every new screen becomes a negotiation.

Testable assumptions beat perfect specifications, especially under uncertainty. A prototype that fails in week two is worth more than a spec that fails in production.

Teams ship faster once this is in place, not from working harder, but from less friction between idea and execution.`,
    },
    {
      number: "03",
      word: "Impact.",
      headline: "Design that doesn't move a number doesn't matter.",
      body: `My yardstick is the same one the business uses: users retained, revenue converted, support tickets not filed, decisions made faster.

That means sitting in the conversations where product strategy gets made, not as an executor, but as a co-author. The best design decisions rarely start with a wireframe. They start in a meeting, with the right question asked at the right time.

Impact also compounds. Design systems built years ago are still running products long after the handoff. Research frameworks turn into standard practice and outlive the project that produced them. Good design work has leverage, it keeps paying after you're gone.`,
    },
    {
      number: "04",
      word: "Leadership.",
      headline: "Trust comes from staying hands-on, not from a leadership deck.",
      body: `A leader who stays away from the work loses the ability to judge it. The team feels that distance long before anyone names it.

Running the interview myself when the insight needs a real conversation. Merging the PR when the fix is faster in my hands than in a ticket. Debugging the pipeline instead of asking for a status update. Small moves, but the team notices who's still doing the work.

Empathy runs both directions this way, for the team and from the team, until the hierarchy stops feeling like a wall. We're in the same boat, and everyone can see it.

The same closeness makes mentoring real. Reviewing a PR together, walking through why a research question worked, unpacking a trade-off as it happens, that teaches faster than any quarterly review. Growth compounds the same way impact does.`,
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
