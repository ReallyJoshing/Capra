import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: { agentUpgrade: "security" },
};
export default nextConfig;
