import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ❌ Skip ESLint checks during production builds
    ignoreDuringBuilds: true,
  },

  };

export default nextConfig;