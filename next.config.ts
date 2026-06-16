import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // This prevents Next.js from trying to pre-load static database calls during the cloud build step
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;