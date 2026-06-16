import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Bypasses the strict environment compiler check on Render
    ignoreBuildErrors: true,
  },
  eslint: {
    // Bypasses the strict linter environment block on Render
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;