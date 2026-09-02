import type { Metadata } from "next"

import { JsonFormatterTool } from "@/components/tools/json-formatter-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "JSON Formatter Online – Free JSON Beautifier"
const description =
  "Format, beautify, and pretty-print JSON online for free with this JSON formatter. Validate syntax and minify JSON too — all instantly, right in your browser."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/json-formatter",
  },
  openGraph: {
    title,
    description,
    url: "/tools/json-formatter",
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

export default function JsonFormatterPage() {
  const content = toolContent["/tools/json-formatter"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="JSON Formatter"
        description={description}
        path="/tools/json-formatter"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            JSON Formatter
          </h1>
          <p className="mt-3 text-muted-foreground">
            Format, validate, or minify JSON online instantly — paste your
            data, pick a mode, and see the result update live.
          </p>
        </div>

        <div className="mt-10">
          <JsonFormatterTool />
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
