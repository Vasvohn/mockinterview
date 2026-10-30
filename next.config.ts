import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Hébergement statique GitHub Pages : https://vasvohn.github.io/mockinterview */
  output: "export",
  basePath: "/mockinterview",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
