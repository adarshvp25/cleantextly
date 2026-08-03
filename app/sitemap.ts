import type { MetadataRoute } from "next"

import { tools } from "@/lib/tools"

// Required by `output: "export"` — this route has no request-time data
// (it's derived entirely from the static `tools` list), so this doesn't
// change its content, just confirms it can be fully prerendered at build time.
export const dynamic = "force-static"

const baseUrl = "https://cleantextly.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...toolRoutes,
  ]
}
