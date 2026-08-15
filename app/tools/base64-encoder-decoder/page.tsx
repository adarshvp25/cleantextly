import type { Metadata } from "next"

import { Base64EncoderDecoderTool } from "@/components/tools/base64-encoder-decoder-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "Base64 Encoder & Decoder Online – Encode and Decode Base64"
const description =
  "Encode text to Base64 or decode Base64 to text online for free, right in your browser. Correctly handles Unicode and emoji, with no sign-up required."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/base64-encoder-decoder",
  },
  openGraph: {
    title,
    description,
    url: "/tools/base64-encoder-decoder",
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

export default function Base64EncoderDecoderPage() {
  const content = toolContent["/tools/base64-encoder-decoder"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="Base64 Encoder & Decoder"
        description={description}
        path="/tools/base64-encoder-decoder"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Base64 Encoder & Decoder
          </h1>
          <p className="mt-3 text-muted-foreground">
            Encode text to Base64 or decode Base64 back to text instantly —
            paste your input, choose a mode, and see the result update live.
          </p>
        </div>

        <div className="mt-10">
          <Base64EncoderDecoderTool />
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
