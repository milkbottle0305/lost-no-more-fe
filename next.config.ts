import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sitem.ssgcdn.com',
      },
    ],
  },
};

export default nextConfig;
