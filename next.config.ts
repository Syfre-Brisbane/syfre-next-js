import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.syfre.ai',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
