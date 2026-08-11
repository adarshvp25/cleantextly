import type { Metadata } from "next"

import { LineCounterTool } from "@/components/tools/line-counter-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "Line Counter Online – Count Lines in Text"
const description =
  "Count lines in text instantly with our free online Line Counter. Paste your text to count lines online and get accurate line, word, and character stats."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/line-counter",
  },
  openGraph: {
    title,
    description,
    url: "/tools/line-counter",
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

export default function LineCounterPage() {
  const content = toolContent["/tools/line-counter"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="Line Counter"
        description={description}
        path="/tools/line-counter"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Line Counter
          </h1>
          <p className="mt-3 text-muted-foreground">
            Type or paste your text below to see a live line count, along
            with character and word statistics.
          </p>
        </div>

        <div className="mt-10">
          <LineCounterTool />
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
