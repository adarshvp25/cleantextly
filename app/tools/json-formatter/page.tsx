import type { Metadata } from "next"

import { JsonFormatterTool } from "@/components/tools/json-formatter-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { toolContent } from "@/lib/tools/content"

export const metadata: Metadata = {
  title: "JSON Formatter — CleanTextly",
  description:
    "Format, validate, and pretty-print JSON online for free. Fast, private, browser-based — no sign-up required.",
  alternates: {
    canonical: "/tools/json-formatter",
  },
}

export default function JsonFormatterPage() {
  const content = toolContent["/tools/json-formatter"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            JSON Formatter
          </h1>
          <p className="mt-3 text-muted-foreground">
            Paste your JSON below to validate and pretty-print it with
            2-space indentation.
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
