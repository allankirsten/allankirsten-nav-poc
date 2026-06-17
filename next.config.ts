import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.15.8", "192.168.15.13", "172.21.13.73", "*.trycloudflare.com"],
};

export default nextConfig;
