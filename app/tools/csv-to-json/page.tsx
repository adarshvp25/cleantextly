import type { Metadata } from "next"

import { CsvToJsonTool } from "@/components/tools/csv-to-json-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "CSV to JSON Converter Online – Free Tool"
const description =
  "Convert CSV to JSON online instantly, free, and right in your browser. Paste CSV data and get clean, accurately structured JSON with headers as keys."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/csv-to-json",
  },
  openGraph: {
    title,
    description,
    url: "/tools/csv-to-json",
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

export default function CsvToJsonPage() {
  const content = toolContent["/tools/csv-to-json"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="CSV to JSON Converter"
        description={description}
        path="/tools/csv-to-json"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            CSV to JSON Converter
          </h1>
          <p className="mt-3 text-muted-foreground">
            Paste your CSV below to convert it to JSON online instantly —
            clean, formatted output with your headers as keys.
          </p>
        </div>

        <div className="mt-10">
          <CsvToJsonTool />
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
