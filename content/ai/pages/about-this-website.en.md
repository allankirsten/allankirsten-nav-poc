---
type: page
slug: about-this-website
title: About this site
order: 11
nav: false
updated: "2026-07-19"
lang: en
summary: >
  This site as its own case study: why it's never been outsourced, how the
  content pipeline works (one Obsidian vault feeding both the human pages
  and this AI-readable layer), the stack, the SEO/GEO setup, the voice
  guide behind the copy, and the type/color system.
---

# About this site

Every version of this site, back to 1999's raw HTML, came out of my own hands. Agencies started offering portfolio-building as standard work somewhere along the way; that offer never got taken up. Five eras, five completely different tools: HTML/CSS by hand, Flash, WordPress, Framer built from the ground up, and now Next.js, paired with Claude Code. Same person behind the keyboard in every one of them.

## Content pipeline

The content lives in an Obsidian vault, the same second brain that runs the rest of my work, not in a headless CMS or a database. Each case study or page starts as a note there. A sync step copies the finished markdown into this repo, and a single file generates two projections: full prose for this page and for llms.txt, and a curated short version for the human-facing page you'd see in a browser. Nothing gets written twice.

## Stack

Next.js 16 (App Router), React 19 and TypeScript, built with Turbopack. GSAP for hand-tuned entrance animations, no pre-baked effect library. Content is markdown with frontmatter, versioned like code. Hosting is Vercel, deployed on every push to main, no staging environment in between.

## SEO and GEO

Search engines and language models are treated as two different audiences with different needs. robots.txt explicitly names the AI crawlers it allows (GPTBot, ClaudeBot, PerplexityBot, Google-Extended and similar), on top of the default wildcard allow, so the intent is checkable rather than implied. The sitemap covers every human route plus every /ai page and case in both languages, cross-linked with hreflang so English and Portuguese read as alternates, not duplicate content. Person schema (JSON-LD) sits on the home and about pages, built only from facts the rest of the site can back up. Every markdown file carries its own last-edited date, surfaced here so a crawler can tell what actually changed.

## Traffic, measured twice

Standard analytics only sees browsers running JavaScript, which misses most of what actually requests this page and llms.txt: curl, LLM tools, crawler bots. A separate lightweight logging layer records those hits, path, user agent, referrer, so that side of the traffic isn't invisible. It runs independently of the analytics script and only touches the machine-readable routes.

## Voice

The copy across this site follows a written tone guide, not instinct rewritten each time: identity before job title, a point of view before the evidence that backs it, a number wherever an adjective would otherwise do the work. One rule shaped more editing than any other, never more than two consecutive sentences opening with "I + verb," a pattern that reads as repetitive even when each sentence is fine on its own.

## Type and color

Two typefaces, chosen for opposite reasons. Atkinson Hyperlegible carries the body copy, designed by the Braille Institute with letterforms disambiguated for low-vision reading, picked because running text has to be read without effort. DM Serif Display carries headlines, reserved for wherever the page needs to state a position rather than transmit information. One accent color, one radius token, one spacing scale. The full token audit is public at /design-system.

## What isn't finished

The product case studies run on real prose and real numbers already; the screens and galleries behind them are still being built. That ordering was deliberate, finish what actually carries a hiring or investment decision first, then layer in the visual polish.
