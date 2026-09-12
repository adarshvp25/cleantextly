import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/tools/content/section-heading"
import { StepGuide } from "@/components/tools/content/step-guide"
import { ExampleBlock } from "@/components/tools/content/example-block"
import { FeatureList } from "@/components/tools/content/feature-list"
import { ArticleStructuredData } from "@/components/blog/article-structured-data"
import { getRequiredBlogPost } from "@/lib/blog/posts"
import { siteConfig, ogImage } from "@/lib/site"
import type { ToolGuideStep, ToolExample, ToolFeature } from "@/lib/tools/content"

const post = getRequiredBlogPost("how-to-beautify-xml-online")

const title = "How to Beautify XML Online – Step-by-Step Guide"
const description =
  "Learn how to beautify XML step by step, see a before-and-after example, and find out when a free online XML formatter is the right tool for the job."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog/how-to-beautify-xml-online",
  },
  openGraph: {
    title,
    description,
    url: "/blog/how-to-beautify-xml-online",
    siteName: siteConfig.name,
    type: "article",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
}

const steps: ToolGuideStep[] = [
  {
    title: "Paste the XML",
    description:
      "Add your minified or messy XML into the XML Input box on CleanTextly's XML Formatter.",
  },
  {
    title: "Choose the indentation style",
    description:
      "Pick 2 spaces, 4 spaces, or a tab, depending on how you like nested elements indented.",
  },
  {
    title: "Format the XML",
    description:
      "Click Format. The XML declaration, comments, and CDATA sections are preserved exactly as written, and a specific error is shown instead if the markup isn't well-formed.",
  },
  {
    title: "Copy or download the result",
    description:
      "Copy the beautified XML to your clipboard, or download it as an .xml file.",
  },
]

const beforeAfterExample: ToolExample = {
  title: "Minified XML Before and After Beautifying",
  inputLabel: "Before",
  outputLabel: "After",
  input:
    "<order><id>1042</id><item><name>Widget</name><qty>3</qty></item></order>",
  output:
    "<order>\n  <id>1042</id>\n  <item>\n    <name>Widget</name>\n    <qty>3</qty>\n  </item>\n</order>",
}

const useCases: ToolFeature[] = [
  {
    title: "Reading Minified XML",
    description:
      "See the actual structure of a config file or export instead of one long, unreadable line.",
  },
  {
    title: "Inspecting API Responses",
    description:
      "Format an XML API response so its nesting is easy to follow while you debug.",
  },
  {
    title: "Reviewing Feeds & Configs",
    description:
      "Beautify an RSS/Atom feed, SOAP payload, or config file before reading through it.",
  },
  {
    title: "Checking Structure Before Reuse",
    description:
      "Confirm an element's structure is what you expect before copying XML elsewhere.",
  },
]

export default function HowToBeautifyXmlOnlinePage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <ArticleStructuredData
        headline="How to Beautify XML Online"
        description={description}
        path="/blog/how-to-beautify-xml-online"
        datePublished={post.publishedAt}
      />

      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How to Beautify XML Online
          </h1>
          <p className="mt-3 text-muted-foreground">
            A quick, practical guide to formatting messy or minified XML —
            plus when to use an online XML formatter instead of doing it by
            hand.
          </p>
        </div>

        <article className="mt-16 flex flex-col gap-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              What XML Beautification Means
            </h2>
            <p className="mt-4 text-muted-foreground">
              Beautifying XML means adding line breaks and indentation so
              that nested elements line up visually, making the document&apos;s
              structure easy to follow at a glance. It&apos;s a purely visual
              change — the elements, attributes, and text your XML contains
              stay exactly the same; only the whitespace around them
              changes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Why Formatted XML Is Easier to Read
            </h2>
            <p className="mt-4 text-muted-foreground">
              Minified or hand-edited XML often arrives as one long line, or
              with inconsistent indentation that makes nested elements hard
              to tell apart. Once it&apos;s formatted, you can see at a glance
              which elements sit inside which, making it much faster to
              review a configuration file, debug an API response, or scan a
              feed or export for the value you&apos;re looking for.
            </p>
          </div>

          <div>
            <SectionHeading title="How to Beautify XML Online" />
            <div className="mt-8">
              <StepGuide steps={steps} />
            </div>
            <p className="mt-6 text-muted-foreground">
              CleanTextly&apos;s{" "}
              <Link
                href="/tools/xml-formatter"
                className="text-primary underline-offset-4 hover:underline"
              >
                XML Formatter &amp; Beautifier
              </Link>{" "}
              does exactly this in your browser, with nothing uploaded to a
              server.
            </p>
          </div>

          <div>
            <SectionHeading title="Before and After Example" />
            <div className="mt-8">
              <ExampleBlock example={beforeAfterExample} />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              What Happens if the XML Is Malformed
            </h2>
            <p className="mt-4 text-muted-foreground">
              XML is stricter than HTML, so a formatter can&apos;t always guess
              what you meant. If a tag is mismatched, an attribute value is
              left unterminated, or the XML declaration appears more than
              once, CleanTextly&apos;s formatter reports a specific error instead
              of silently repairing the markup or guessing at a result.
              You&apos;ll need to fix the underlying issue in the XML itself
              before it can be formatted.
            </p>
          </div>

          <div>
            <SectionHeading title="When an Online XML Formatter Is Useful" />
            <div className="mt-8">
              <FeatureList features={useCases} />
            </div>
            <p className="mt-6 text-muted-foreground">
              Need to go the other way — compacting readable XML back down
              for storage or transmission? CleanTextly&apos;s{" "}
              <Link
                href="/tools/xml-minifier"
                className="text-primary underline-offset-4 hover:underline"
              >
                XML Minifier
              </Link>{" "}
              handles that instead.
            </p>
          </div>
        </article>
      </section>

      <section
        aria-labelledby="beautify-xml-cta-heading"
        className="w-full border-t border-border bg-muted/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="beautify-xml-cta-heading"
            title="Ready to Beautify Your XML?"
            description="Paste your XML into CleanTextly's free formatter and get clean, readable markup instantly."
          />

          <div className="mt-8 flex justify-center">
            <Button render={<Link href="/tools/xml-formatter" />} nativeButton={false} size="lg">
              Beautify XML Online
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
