import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://main.api.floor-studios.com/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
