import type { Metadata } from "next"
import Link from "next/link"

import { YamlJsonConverterTool } from "@/components/tools/yaml-json-converter-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "YAML to JSON Converter – Free Online Tool"
const description =
  "Convert YAML to JSON online for free. Paste YAML and get clean, formatted JSON instantly, or switch modes to convert JSON to YAML in your browser."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/yaml-to-json",
  },
  openGraph: {
    title,
    description,
    url: "/tools/yaml-to-json",
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

export default function YamlToJsonPage() {
  const content = toolContent["/tools/yaml-to-json"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="YAML to JSON Converter"
        description={description}
        path="/tools/yaml-to-json"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            YAML to JSON Converter
          </h1>
          <p className="mt-3 text-muted-foreground">
            Convert YAML to JSON online instantly, or switch to JSON to YAML
            with a fast, browser-based converter.
          </p>
        </div>

        <div className="mt-10">
          <YamlJsonConverterTool />
        </div>

        {content && (
          <div className="mt-16 border-t border-border pt-16">
            <ToolContentSections content={content} />
          </div>
        )}

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          New to converting between the two formats? Read our guide to{" "}
          <Link
            href="/blog/how-to-convert-yaml-to-json"
            className="text-primary underline-offset-4 hover:underline"
          >
            converting YAML to JSON
          </Link>
          .
        </p>
      </section>
    </main>
  )
}
