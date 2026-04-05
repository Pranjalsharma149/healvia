import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. Image Optimization 
     Allows Next.js to safely render images from Unsplash for your Blog.
  */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Allows all paths from Unsplash
      },
    ],
  },

  /* 2. Compiler Options
     Ensures smooth builds even with Turbopack enabled.
  */
  experimental: {
    // Note: serverActions: true is removed because it is now stable by default 
    // in Next.js 14, 15, and 16.
  },

  /* 3. Optional: React Strict Mode 
     Highly recommended for catching common bugs during development.
  */
  reactStrictMode: true,
};

export default nextConfig;