import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

/**
 * /llms.txt and /ai/* are force-static, so nothing runs per-request in
 * production and GA4 (client-side JS) never fires for raw-markdown fetchers
 * (bots, curl, LLM tools). This proxy is the only place that sees every
 * real hit to those paths, so it fires a fire-and-forget log call before
 * letting the static response through.
 *
 * Logs to the same sheet as the root site (allankirsten-site) — the "/2026"
 * prefix here is what tells the two apart in there, since NextRequest's
 * pathname is basePath-stripped and would otherwise collide with root's
 * identically-named /ai paths.
 */
export function proxy(request: NextRequest, event: NextFetchEvent) {
  const logPromise = fetch(new URL("/api/log-hit", request.nextUrl.origin), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      path: "/2026" + request.nextUrl.pathname,
      user_agent: request.headers.get("user-agent") || "",
      referer: request.headers.get("referer") || "",
      ip: request.headers.get("x-forwarded-for") || "",
    }),
  }).catch(() => {});

  event.waitUntil(logPromise);

  return NextResponse.next();
}

// basePath isn't auto-prefixed onto the matcher in this Next.js version (or
// at least not reliably — confirmed empirically: /api/log-hit itself works
// fine hit directly, but the proxy never fired on /2026/ai/* in production).
// Building the matcher from the same env var next.config.ts uses.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const config = {
  matcher: [`${BASE_PATH}/llms.txt`, `${BASE_PATH}/ai/:path*`],
};
