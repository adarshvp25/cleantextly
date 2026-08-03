import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

// Matches the official OpenNext Cloudflare production template: an R2-backed
// incremental cache so prerendered pages (and RSC/Flight payloads) are served
// from cache instead of being re-rendered on every request, including the
// automatic background RSC prefetches Next.js fires for every visible <Link>.
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
