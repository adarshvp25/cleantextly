import type { Metadata } from "next"

import { UrlEncoderDecoderTool } from "@/components/tools/url-encoder-decoder-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "URL Encoder & Decoder Online – Encode and Decode URLs"
const description =
  "Encode and decode URLs, query strings, and special characters online for free. Supports both encodeURI and encodeURIComponent styles, right in your browser."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/url-encoder-decoder",
  },
  openGraph: {
    title,
    description,
    url: "/tools/url-encoder-decoder",
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

export default function UrlEncoderDecoderPage() {
  const content = toolContent["/tools/url-encoder-decoder"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="URL Encoder & Decoder"
        description={description}
        path="/tools/url-encoder-decoder"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            URL Encoder & Decoder
          </h1>
          <p className="mt-3 text-muted-foreground">
            Encode or decode URLs, query parameters, and special characters
            instantly — paste your text, choose a mode, and see the result
            update live.
          </p>
        </div>

        <div className="mt-10">
          <UrlEncoderDecoderTool />
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
