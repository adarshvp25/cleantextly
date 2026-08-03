import type { MetadataRoute } from "next"

import { tools } from "@/lib/tools"

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
