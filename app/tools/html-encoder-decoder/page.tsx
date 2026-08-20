import type { Metadata } from "next"

import { HtmlEncoderDecoderTool } from "@/components/tools/html-encoder-decoder-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "HTML Encoder & Decoder - Free Online HTML Encoder"
const description =
  "Encode and decode HTML online for free. Convert HTML special characters to entities and decode HTML entities back to readable text, right in your browser."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/html-encoder-decoder",
  },
  openGraph: {
    title,
    description,
    url: "/tools/html-encoder-decoder",
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

export default function HtmlEncoderDecoderPage() {
  const content = toolContent["/tools/html-encoder-decoder"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="HTML Encoder & Decoder"
        description={description}
        path="/tools/html-encoder-decoder"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            HTML Encoder & Decoder
          </h1>
          <p className="mt-3 text-muted-foreground">
            Encode HTML special characters into entities, or decode HTML
            entities back into readable text — paste your input, choose a
            mode, and see the result update live.
          </p>
        </div>

        <div className="mt-10">
          <HtmlEncoderDecoderTool />
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
