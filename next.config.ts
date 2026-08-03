import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export has no server to run Next's built-in image optimizer,
    // so optimization must be disabled — the original images are already
    // correctly sized and served as-is.
    unoptimized: true,
  },
};

export default nextConfig;
