import type { Metadata } from "next"

import { TextSorterTool } from "@/components/tools/text-sorter-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { toolContent } from "@/lib/tools/content"

export const metadata: Metadata = {
  title: "Text Sorter — CleanTextly",
  description:
    "Sort text alphabetically, numerically, ascending or descending online for free. Fast, private and browser-based.",
}

export default function TextSorterPage() {
  const content = toolContent["/tools/text-sorter"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Text Sorter
          </h1>
          <p className="mt-3 text-muted-foreground">
            Paste your text below and sort it line-by-line, alphabetically
            or numerically.
          </p>
        </div>

        <div className="mt-10">
          <TextSorterTool />
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
