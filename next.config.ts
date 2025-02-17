import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sitem.ssgcdn.com',
      },
    ],
  },
  compiler: isProduction ? { reactRemoveProperties: { properties: ['^data-cid$'] } } : {},
};

export default nextConfig;
