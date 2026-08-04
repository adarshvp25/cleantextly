import type { Metadata } from "next"

import { WordCounterTool } from "@/components/tools/word-counter-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { toolContent } from "@/lib/tools/content"

export const metadata: Metadata = {
  title: "Word Counter — CleanTextly",
  description:
    "Count words, characters, sentences, paragraphs, lines and estimated reading time online for free. Fast, private and browser-based.",
  alternates: {
    canonical: "/tools/word-counter",
  },
}

export default function WordCounterPage() {
  const content = toolContent["/tools/word-counter"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Word Counter
          </h1>
          <p className="mt-3 text-muted-foreground">
            Type or paste your text below to see live word, character, and
            reading-time statistics.
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
