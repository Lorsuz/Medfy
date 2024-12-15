import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qcon-assets-production.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'guiadoestudante.abril.com.br',
      },
    ],
  }
};

export default nextConfig;
