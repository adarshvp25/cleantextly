import type { Metadata } from "next"

import { CsvToJsonTool } from "@/components/tools/csv-to-json-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { toolContent } from "@/lib/tools/content"

export const metadata: Metadata = {
  title: "CSV to JSON Converter — CleanTextly",
  description:
    "Convert CSV into formatted JSON online for free. Fast, private, browser-based and no sign-up required.",
  alternates: {
    canonical: "/tools/csv-to-json",
  },
}

export default function CsvToJsonPage() {
  const content = toolContent["/tools/csv-to-json"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            CSV to JSON Converter
          </h1>
          <p className="mt-3 text-muted-foreground">
            Paste your CSV below to convert it into clean, formatted JSON.
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
