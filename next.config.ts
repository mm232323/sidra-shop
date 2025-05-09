import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  }, 
  images: {
    remotePatterns: [
      {
        protocol:'https',
        hostname:'plum-major-crow-269.mypinata.cloud',
        port:'',
        pathname:'/**',
      }
      ,
      {
        protocol:'https',
        hostname:'res.cloudinary.com',
        port:'',
        pathname:'/**'
      }
    ]
  }
};

export default nextConfig;
