import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/insights/when-kids-outsmart-algorithms-and-algorithms-start-learning-back',
        destination: '/insights',
        permanent: true,
      },
    ];
  },
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
