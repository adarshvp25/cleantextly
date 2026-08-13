import type { Metadata } from "next"

import { TextReverserTool } from "@/components/tools/text-reverser-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "Text Reverser Online – Reverse Text Instantly"
const description =
  "Reverse text online instantly with our free Text Reverser. Reverse characters, words, letters, or lines with this simple, accurate text reversal tool."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/text-reverser",
  },
  openGraph: {
    title,
    description,
    url: "/tools/text-reverser",
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

export default function TextReverserPage() {
  const content = toolContent["/tools/text-reverser"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="Text Reverser"
        description={description}
        path="/tools/text-reverser"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Text Reverser
          </h1>
          <p className="mt-3 text-muted-foreground">
            Reverse text, words, letters, or lines instantly — paste your
            text, pick a mode, and see the result update live.
          </p>
        </div>

        <div className="mt-10">
          <TextReverserTool />
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
