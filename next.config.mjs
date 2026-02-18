// import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "motion",
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@radix-ui/react-tooltip",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

const withMDX = createMDX({
  // customise the config file path
  configPath: "source.config.ts",
});

export default withMDX(nextConfig);
