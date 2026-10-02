import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/surf/boards/carbon-tail",
        destination: "/surf/boards/monks-shield",
        permanent: true,
      },
      {
        source: "/surf/boards/two-zero",
        destination: "/surf/boards/disco-diamond",
        permanent: true,
      },
    ];
  },
  images: {
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
