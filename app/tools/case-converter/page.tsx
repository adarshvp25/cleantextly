import type { Metadata } from "next"

import { CaseConverterTool } from "@/components/tools/case-converter-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { toolContent } from "@/lib/tools/content"

export const metadata: Metadata = {
  title: "Case Converter — CleanTextly",
  description:
    "Convert text between uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case and kebab-case online for free. Fast, private and browser-based.",
  alternates: {
    canonical: "/tools/case-converter",
  },
}

export default function CaseConverterPage() {
  const content = toolContent["/tools/case-converter"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Case Converter
          </h1>
          <p className="mt-3 text-muted-foreground">
            Paste your text below and convert it between 8 common case
            formats instantly.
          </p>
        </div>

        <div className="mt-10">
          <CaseConverterTool />
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
