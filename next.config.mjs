import { withNextVideo } from "next-video/process";

/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  optimizeFonts: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
    minimumCacheTTL: 1500000,
  },
};

export default withNextVideo(nextConfig);
