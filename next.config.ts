import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['pg', 'node-pg-migrate'],
};

export default nextConfig;
