import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  allowedDevOrigins: ["192.168.15.8", "192.168.15.13", "192.168.15.14", "172.21.13.73", "*.trycloudflare.com"],
  // Staging preview at /2026 — keep it out of search indexes until it's
  // promoted to the root domain. Remove this once that decision is made.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
