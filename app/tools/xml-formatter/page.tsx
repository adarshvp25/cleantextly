import type { Metadata } from "next"
import Link from "next/link"

import { XmlFormatterTool } from "@/components/tools/xml-formatter-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "XML Formatter & Beautifier Online – Free XML Pretty Printer"
const description =
  "Beautify and pretty-print XML online for free. Paste messy or minified XML and get clean, consistently indented markup instantly — right in your browser."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/xml-formatter",
  },
  openGraph: {
    title,
    description,
    url: "/tools/xml-formatter",
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

export default function XmlFormatterPage() {
  const content = toolContent["/tools/xml-formatter"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="XML Formatter & Beautifier"
        description={description}
        path="/tools/xml-formatter"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            XML Formatter & Beautifier
          </h1>
          <p className="mt-3 text-muted-foreground">
            Beautify and pretty-print XML online — paste your markup, choose
            2-space, 4-space, or tab indentation, and get clean, readable
            output instantly.
          </p>
        </div>

        <div className="mt-10">
          <XmlFormatterTool />
        </div>

        {content && (
          <div className="mt-16 border-t border-border pt-16">
            <ToolContentSections content={content} />
          </div>
        )}

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          Want to learn how XML beautification works? Read our guide to{" "}
          <Link
            href="/blog/how-to-beautify-xml-online"
            className="text-primary underline-offset-4 hover:underline"
          >
            beautifying XML online
          </Link>
          .
        </p>
      </section>
    </main>
  )
}
