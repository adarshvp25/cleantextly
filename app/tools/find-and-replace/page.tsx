import type { Metadata } from "next"

import { FindAndReplaceTool } from "@/components/tools/find-and-replace-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "Find and Replace Online – Free Text Replacer Tool"
const description =
  "Find and replace text online instantly with our free Text Replacer tool. Replace every occurrence with match case or whole word options, previewed live."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/find-and-replace",
  },
  openGraph: {
    title,
    description,
    url: "/tools/find-and-replace",
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

export default function FindAndReplacePage() {
  const content = toolContent["/tools/find-and-replace"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="Find and Replace"
        description={description}
        path="/tools/find-and-replace"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Find and Replace
          </h1>
          <p className="mt-3 text-muted-foreground">
            Enter text to find and what to replace it with, and every
            occurrence updates instantly below.
          </p>
        </div>

        <div className="mt-10">
          <FindAndReplaceTool />
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
