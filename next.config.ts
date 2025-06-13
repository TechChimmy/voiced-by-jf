import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  // This is important to prevent the pages directory from being scanned
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;