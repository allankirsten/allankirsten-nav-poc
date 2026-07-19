import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Receives hit events from proxy.ts (for /llms.txt and /ai/* — routes
 * that are force-static, so this is the only durable record of who/what
 * actually fetched them, including AI-crawler bots that never run GA4's JS).
 * Appends a row to a Google Sheet using the service account's own signed
 * JWT (no googleapis package — keeps the function small and dependency-free).
 */

let cachedToken: { token: string; exp: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.exp - Date.now() / 1000 > 300) {
    return cachedToken.token;
  }

  const email = process.env.GOOGLE_SA_EMAIL;
  const privateKey = process.env.GOOGLE_SA_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !privateKey) throw new Error("Missing GOOGLE_SA_EMAIL/GOOGLE_SA_PRIVATE_KEY");

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64url(
    JSON.stringify({
      iss: email,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );
  const signingInput = `${header}.${payload}`;
  const signature = crypto.sign("RSA-SHA256", Buffer.from(signingInput), privateKey);
  const jwt = `${signingInput}.${base64url(signature)}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) throw new Error(`Token exchange failed: ${await res.text()}`);
  const data = await res.json();
  cachedToken = { token: data.access_token, exp: now + data.expires_in };
  return data.access_token;
}

function base64url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function POST(request: NextRequest) {
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID_MD_LOG;
    if (!sheetId) return NextResponse.json({ skipped: true }, { status: 200 });

    const body = await request.json();
    const row = [
      new Date().toISOString(),
      body.path || "",
      body.user_agent || "",
      body.referer || "",
      body.ip || "",
    ];

    const token = await getAccessToken();
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:E:append?valueInputOption=RAW`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ values: [row] }),
      }
    );
    if (!res.ok) {
      console.error("log-hit sheets append failed", await res.text());
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("log-hit error", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
