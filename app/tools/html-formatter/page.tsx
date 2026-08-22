import type { Metadata } from "next"

import { HtmlFormatterTool } from "@/components/tools/html-formatter-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "HTML Formatter & Beautifier Online - Free HTML Formatter"
const description =
  "Format and beautify HTML online for free. Paste minified or messy HTML and get clean, consistently indented markup instantly — entirely in your browser, no upload required."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/html-formatter",
  },
  openGraph: {
    title,
    description,
    url: "/tools/html-formatter",
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

export default function HtmlFormatterPage() {
  const content = toolContent["/tools/html-formatter"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="HTML Formatter"
        description={description}
        path="/tools/html-formatter"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            HTML Formatter
          </h1>
          <p className="mt-3 text-muted-foreground">
            Paste your HTML, pick an indentation style, and format it into
            clean, readable markup instantly.
          </p>
        </div>

        <div className="mt-10">
          <HtmlFormatterTool />
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
