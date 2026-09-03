import type { Metadata } from "next"

import { CaseConverterTool } from "@/components/tools/case-converter-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "Case Converter Online – Uppercase, Lowercase & Title Case"
const description =
  "Free online text case converter. Instantly change text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case and more, right in your browser."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/case-converter",
  },
  openGraph: {
    title,
    description,
    url: "/tools/case-converter",
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

export default function CaseConverterPage() {
  const content = toolContent["/tools/case-converter"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="Case Converter"
        description={description}
        path="/tools/case-converter"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Case Converter
          </h1>
          <p className="mt-3 text-muted-foreground">
            Convert text between uppercase, lowercase, title case, sentence
            case and 4 more formats online — the result updates instantly as
            you type.
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
