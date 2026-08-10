import type { Metadata } from "next"

import { RemoveLineBreaksTool } from "@/components/tools/remove-line-breaks-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "Remove Line Breaks Online – Free Line Break Remover"
const description =
  "Remove line breaks from text online instantly with our free Line Break Remover. Join lines into one paragraph and remove new lines cleanly, no extra spaces."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/remove-line-breaks",
  },
  openGraph: {
    title,
    description,
    url: "/tools/remove-line-breaks",
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

export default function RemoveLineBreaksPage() {
  const content = toolContent["/tools/remove-line-breaks"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="Remove Line Breaks"
        description={description}
        path="/tools/remove-line-breaks"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Remove Line Breaks
          </h1>
          <p className="mt-3 text-muted-foreground">
            Paste your text below and every line break joins into a single
            paragraph instantly, without merging your words together.
          </p>
        </div>

        <div className="mt-10">
          <RemoveLineBreaksTool />
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
