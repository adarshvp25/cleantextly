import type { Metadata } from "next"

import { RemoveEmptyLinesTool } from "@/components/tools/remove-empty-lines-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "Remove Empty Lines Online – Free Blank Line Remover"
const description =
  "Remove empty lines and blank lines from any text instantly with our free online Blank Line Remover. Delete empty lines fast, accurate, and 100% private."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/remove-empty-lines",
  },
  openGraph: {
    title,
    description,
    url: "/tools/remove-empty-lines",
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

export default function RemoveEmptyLinesPage() {
  const content = toolContent["/tools/remove-empty-lines"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="Remove Empty Lines"
        description={description}
        path="/tools/remove-empty-lines"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Remove Empty Lines
          </h1>
          <p className="mt-3 text-muted-foreground">
            Paste your text below and every blank or whitespace-only line is
            removed instantly, in order, with everything else left untouched.
          </p>
        </div>

        <div className="mt-10">
          <RemoveEmptyLinesTool />
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
