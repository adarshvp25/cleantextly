import type { Metadata } from "next"

import { WordCounterTool } from "@/components/tools/word-counter-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "Word Counter Online – Free Word Count Tool"
const description =
  "Count words online instantly with this free Word Counter. Get live word, character, and sentence statistics — 100% private, right in your browser."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/word-counter",
  },
  openGraph: {
    title,
    description,
    url: "/tools/word-counter",
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

export default function WordCounterPage() {
  const content = toolContent["/tools/word-counter"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="Word Counter"
        description={description}
        path="/tools/word-counter"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Word Counter
          </h1>
          <p className="mt-3 text-muted-foreground">
            Paste or type your text to count words online instantly, with
            live character, sentence, and reading-time statistics.
          </p>
        </div>

        <div className="mt-10">
          <WordCounterTool />
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
