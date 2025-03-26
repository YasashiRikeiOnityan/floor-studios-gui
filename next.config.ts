import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  basePath: "",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://main.api.floor-studios.com/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
