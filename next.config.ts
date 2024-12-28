import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "mighty.tools" },
    ],
  },
};

export default nextConfig;
