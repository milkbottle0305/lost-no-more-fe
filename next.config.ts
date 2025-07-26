import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sitem.ssgcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'www.lost112.go.kr',
      },
    ],
  },
  compiler: isProduction ? { reactRemoveProperties: { properties: ['^data-cid$'] } } : {},
};

export default nextConfig;
