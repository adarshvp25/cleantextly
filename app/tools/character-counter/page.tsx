import type { Metadata } from "next"

import { CharacterCounterTool } from "@/components/tools/character-counter-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "Character Counter - Count Characters, Words & Letters Online"
const description =
  "Count characters, words, letters, sentences, paragraphs and reading time instantly with our free online Character Counter. Fast, accurate and privacy friendly."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/character-counter",
  },
  openGraph: {
    title,
    description,
    url: "/tools/character-counter",
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

export default function CharacterCounterPage() {
  const content = toolContent["/tools/character-counter"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="Character Counter"
        description={description}
        path="/tools/character-counter"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Character Counter
          </h1>
          <p className="mt-3 text-muted-foreground">
            Type or paste your text below to see live character, word, and
            reading-time statistics.
          </p>
        </div>

        <div className="mt-10">
          <CharacterCounterTool />
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
