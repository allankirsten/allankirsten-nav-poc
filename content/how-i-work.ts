import type { HowIWorkContent } from "./types";

export const howIWorkContent: HowIWorkContent = {
  tagline: "Four principles I never ship a product without, from seed-stage startups to companies past a million users.",

  pillars: [
    {
      number: "01",
      word: "Context.",
      headline: "Context is the first deliverable, not a step before the real work.",
      body: "Before any screen, I map who it's for, what the data says, what the business can't get wrong, then hand that map to the whole team, so no decision depends on one head.",
    },
    {
      number: "02",
      word: "Velocity.",
      headline: "Speed is a design principle, not a trade-off.",
      body: "I build for reuse, so the third surface costs hours, not the weeks the first one took. Under uncertainty, a testable assumption beats a perfect spec.",
    },
    {
      number: "03",
      word: "Impact.",
      headline: "Design that doesn't move a number doesn't matter.",
      body: "My yardstick is the business's: users retained, revenue converted, decisions made faster. The best design decisions start in a meeting, not a wireframe.",
    },
    {
      number: "04",
      word: "Leadership.",
      headline: "Trust comes from staying hands-on, not from a leadership deck.",
      body: "I run the interview, merge the PR, debug the pipeline myself when it's faster than a ticket. The team notices who's still doing the work.",
    },
  ],

  processIntro: "One intention drives every project: generate benefit for the customer in a way that generates benefit for the business. Stripped to the minimum, that's a loop, and the six steps below are what fills it in.",

  processLoop: "Data → Initiative → Data",

  process: [
    { step: "01", label: "Diagnose", desc: "Find the real problem, and the business opportunity inside it, not just the result people ask for.", phase: "Data" },
    { step: "02", label: "Frame",    desc: "Define scope with stakeholders, not against them — what we build, what we don't, with the judgment of someone who's run the room before.", phase: "Initiative" },
    { step: "03", label: "System",   desc: "Foundation before surfaces: tokens, components, patterns.", phase: "Initiative" },
    { step: "04", label: "Build",    desc: "Design, prototype, test. Keep the feedback loop tight.", phase: "Initiative" },
    { step: "05", label: "Ship",     desc: "Handoff with precision. Live means live, correctly.", phase: "Initiative" },
    { step: "06", label: "Learn",    desc: "Measure against the hypothesis. Feed the next cycle.", phase: "Data" },
  ],
};
