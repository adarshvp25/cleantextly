import type { MetadataRoute } from "next"

import { tools } from "@/lib/tools"
import { staticPages } from "@/lib/static-pages"

// Required by `output: "export"` — this route has no request-time data
// (it's derived entirely from the static `staticPages`/`tools` lists), so
// this doesn't change its content, just confirms it can be fully
// prerendered at build time.
export const dynamic = "force-static"

const baseUrl = "https://cleantextly.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // Every non-tool page (lib/static-pages.ts) plus every tool (lib/tools.ts)
  // — adding a new entry to either file is enough for it to appear here
  // automatically, with no edits required in this file.
  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [...staticRoutes, ...toolRoutes]
}
