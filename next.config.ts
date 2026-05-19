import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  allowedDevOrigins: ["10.10.7.47"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
