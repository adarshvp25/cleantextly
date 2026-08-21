import type { Metadata } from "next"

import { RegexTesterTool } from "@/components/tools/regex-tester-tool"
import { ToolContentSections } from "@/components/tools/content/tool-content-sections"
import { ToolStructuredData } from "@/components/tools/content/tool-structured-data"
import { toolContent } from "@/lib/tools/content"
import { siteConfig, ogImage } from "@/lib/site"

const title = "Regex Tester Online - Free Regular Expression Tester"
const description =
  "Test regular expressions online for free. This JavaScript regex tester highlights matches instantly, shows capture groups, and checks your pattern for errors — all in your browser."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/regex-tester",
  },
  openGraph: {
    title,
    description,
    url: "/tools/regex-tester",
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

export default function RegexTesterPage() {
  const content = toolContent["/tools/regex-tester"]

  return (
    <main className="flex flex-1 flex-col bg-background">
      <ToolStructuredData
        name="Regex Tester"
        description={description}
        path="/tools/regex-tester"
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Regex Tester
          </h1>
          <p className="mt-3 text-muted-foreground">
            Test regular expressions instantly in your browser — enter a
            pattern, pick your flags, and see matches highlighted live.
          </p>
        </div>

        <div className="mt-10">
          <RegexTesterTool />
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
