import type { Metadata } from "next"

import { RemoveExtraSpacesTool } from "@/components/tools/remove-extra-spaces-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "Remove Extra Spaces Online – Free Text Space Remover"
const description =
  "Remove extra spaces from text online instantly with our free text space remover. Collapse multiple spaces and tabs while keeping normal word spacing and line breaks intact."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/remove-extra-spaces",
  },
  openGraph: {
    title,
    description,
    url: "/tools/remove-extra-spaces",
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

export default function RemoveExtraSpacesPage() {
  const content = toolContent["/tools/remove-extra-spaces"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="Remove Extra Spaces"
        description={description}
        path="/tools/remove-extra-spaces"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Remove Extra Spaces
          </h1>
          <p className="mt-3 text-muted-foreground">
            Remove extra spaces from text online — repeated spaces and tabs
            collapse instantly, while normal word spacing and line breaks
            stay exactly as they were.
          </p>
        </div>

        <div className="mt-10">
          <RemoveExtraSpacesTool />
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
