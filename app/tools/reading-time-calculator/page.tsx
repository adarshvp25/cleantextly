import type { Metadata } from "next"
import Link from "next/link"

import { ReadingTimeCalculatorTool } from "@/components/tools/reading-time-calculator-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "Reading Time Calculator Online – Free Reading Time Estimator"
const description =
  "Calculate reading time online with our free Reading Time Calculator. Paste your text to get estimated reading time, word count, character count, and more instantly."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/reading-time-calculator",
  },
  openGraph: {
    title,
    description,
    url: "/tools/reading-time-calculator",
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

export default function ReadingTimeCalculatorPage() {
  const content = toolContent["/tools/reading-time-calculator"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="Reading Time Calculator"
        description={description}
        path="/tools/reading-time-calculator"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Reading Time Calculator
          </h1>
          <p className="mt-3 text-muted-foreground">
            Estimate how long it takes to read your text with live
            reading-time, word-count, and text statistics.
          </p>
        </div>

        <div className="mt-10">
          <ReadingTimeCalculatorTool />
        </div>

        {content && (
          <div className="mt-16 border-t border-border pt-16">
            <ToolContentSections content={content} />
          </div>
        )}

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          Want to understand how reading time is calculated? Read our guide
          to{" "}
          <Link
            href="/blog/how-long-does-it-take-to-read-1000-words"
            className="text-primary underline-offset-4 hover:underline"
          >
            how long it takes to read 1,000 words
          </Link>
          .
        </p>
      </section>
    </main>
  )
}
