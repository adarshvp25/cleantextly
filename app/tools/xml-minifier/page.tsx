import type { Metadata } from "next"

import { XmlMinifierTool } from "@/components/tools/xml-minifier-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "XML Minifier & Compressor Online - Free XML Minify Tool"
const description =
  "Minify XML online for free. Paste pretty-printed or messy XML and get a compact, single-line XML compressor result instantly — entirely in your browser, no upload required."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/xml-minifier",
  },
  openGraph: {
    title,
    description,
    url: "/tools/xml-minifier",
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

export default function XmlMinifierPage() {
  const content = toolContent["/tools/xml-minifier"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="XML Minifier"
        description={description}
        path="/tools/xml-minifier"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            XML Minifier
          </h1>
          <p className="mt-3 text-muted-foreground">
            Paste your XML and compress it into compact, minified markup
            instantly — removing formatting whitespace without changing its
            structure or data.
          </p>
        </div>

        <div className="mt-10">
          <XmlMinifierTool />
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
