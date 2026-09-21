import type { Metadata } from "next"

import { SlugGeneratorTool } from "@/components/tools/slug-generator-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "Slug Generator – Free URL Slug Generator Online"
const description =
  "Create clean, SEO-friendly URL slugs online for free. Enter a title or text to generate lowercase, URL-ready slugs instantly in your browser."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/slug-generator",
  },
  openGraph: {
    title,
    description,
    url: "/tools/slug-generator",
    siteName: siteConfig.name,
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
}

export default function SlugGeneratorPage() {
  const content = toolContent["/tools/slug-generator"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="Slug Generator"
        description={description}
        path="/tools/slug-generator"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Slug Generator
          </h1>
          <p className="mt-3 text-muted-foreground">
            Turn titles or text into clean, lowercase, URL-ready slugs
            instantly in your browser.
          </p>
        </div>

        <div className="mt-10">
          <SlugGeneratorTool />
        </div>

        {content && (
          <div className="mt-16 border-t border-border pt-16">
            <ToolContentSections content={content} />
          </div>
        )}
      </section>
    </main>
  )
}
