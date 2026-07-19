import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  allowedDevOrigins: ["192.168.15.8", "192.168.15.13", "192.168.15.14", "172.21.13.73", "*.trycloudflare.com"],
};

export default nextConfig;
