import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// CleanTextly is fully statically prerendered (no ISR/revalidation), so the
// default in-memory incremental cache is sufficient — no R2 bucket needed.
export default defineCloudflareConfig();
