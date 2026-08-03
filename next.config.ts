import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    // The Workers runtime can't run Next's built-in image optimizer (no
    // native `sharp`, no filesystem access) — this was the cause of the
    // /_next/image CPU-limit errors. Serve the already-correctly-sized
    // images as-is instead of transforming them on every request.
    unoptimized: true,
  },
};

initOpenNextCloudflareForDev();

export default nextConfig;
