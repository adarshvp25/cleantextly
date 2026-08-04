import type { Metadata } from "next"

import { RemoveDuplicateLinesTool } from "@/components/tools/remove-duplicate-lines-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { toolContent } from "@/lib/tools/content"

export const metadata: Metadata = {
  title: "Remove Duplicate Lines — CleanTextly",
  description:
    "Remove duplicate lines from any text online for free. Fast, private, browser-based — no sign-up required.",
  alternates: {
    canonical: "/tools/remove-duplicate-lines",
  },
}

export default function RemoveDuplicateLinesPage() {
  const content = toolContent["/tools/remove-duplicate-lines"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Remove Duplicate Lines
          </h1>
          <p className="mt-3 text-muted-foreground">
            Paste your text below and instantly remove duplicate lines while
            keeping the first occurrence of each.
          </p>
        </div>

        <div className="mt-10">
          <RemoveDuplicateLinesTool />
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
