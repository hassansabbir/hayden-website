import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  allowedDevOrigins: ["10.10.7.47"],

  images: {
    // Bypass Next.js image optimization proxy entirely.
    // Next.js refuses to fetch-and-optimize images that resolve to private IPs
    // (localhost / 127.0.0.1), which breaks all backend-uploaded images in dev.
    // With unoptimized: true, <Image> renders a plain <img> pointing straight
    // at the source URL — no server-side proxy, no private-IP block.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

