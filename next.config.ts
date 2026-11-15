import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: { qualities: [75, 90] },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
