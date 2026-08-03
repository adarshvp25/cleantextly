import type { MetadataRoute } from "next"

// Required by `output: "export"` — this route returns fixed data with no
// request-time input, so this doesn't change its content, just confirms it
// can be fully prerendered at build time.
export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://cleantextly.com/sitemap.xml",
  }
}
