import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  experimental: {
    inlineCss: true,
  },
  async redirects() {
    return [
      {
        source: '/insights/when-kids-outsmart-algorithms-and-algorithms-start-learning-back',
        destination: '/insights',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Long cache for un-hashed static assets served from public/
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  images: {
    minimumCacheTTL: 2678400, // 31 days; WP origin sends no cache headers
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
