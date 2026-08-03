import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ToolGrid } from "@/components/tools/tool-grid"
import { SectionHeading } from "@/components/tools/content/section-heading"
import { FeatureList } from "@/components/tools/content/feature-list"
import { FaqSection } from "@/components/tools/content/faq-section"
import { tools } from "@/lib/tools"
import { siteConfig, ogImage } from "@/lib/site"
import { benefits } from "@/lib/home-content"
import type { ToolFaq } from "@/lib/tools/content"

const title = "Free Online Text Tools — CleanTextly"
const description =
  "Browse every free, browser-based text tool from CleanTextly: remove duplicate lines, format JSON, convert case, sort text, convert CSV to JSON, and count words. No sign-up required."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title,
    description,
    url: "/tools",
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

const toolsPageFaqs: ToolFaq[] = [
  {
    question: "How many tools does CleanTextly offer?",
    answer: `CleanTextly currently offers ${tools.length} free tools, with more added regularly.`,
  },
  {
    question: "Are all the tools on this page completely free?",
    answer:
      "Yes. Every tool listed here is completely free to use, with no hidden fees or premium tiers.",
  },
  {
    question: "Do I need to create an account to use these tools?",
    answer:
      "No. Every tool works immediately in your browser — no sign-up or login required.",
  },
  {
    question: "Can I use multiple tools together?",
    answer:
      "Yes. Many tools pair well together — for example, convert CSV to JSON and then format the result, or remove duplicates before sorting a list.",
  },
  {
    question: "Will more tools be added to this page?",
    answer:
      "Yes. CleanTextly is actively adding new free tools, so check back for more or explore the full collection above.",
  },
  {
    question: "Is my data safe when using these tools?",
    answer:
      "Yes. Every tool runs entirely in your browser. Your text and data are never uploaded to a server or stored.",
  },
]

export default function ToolsPage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Free Online Text Tools
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          CleanTextly provides free, browser-based text processing utilities
          for cleaning, formatting, converting, and analyzing text. No
          sign-up required — everything runs instantly in your browser.
        </p>
      </section>

      <section
        id="tools"
        aria-labelledby="tools-heading"
        className="w-full border-t border-border bg-muted/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="tools-heading"
            title="All Tools"
            description="Every tool CleanTextly offers, ready to use instantly."
          />

          <div className="mt-12">
            <ToolGrid tools={tools} />
          </div>
        </div>
      </section>

      <section aria-labelledby="why-use-heading" className="w-full border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="why-use-heading"
            title="Why Use CleanTextly"
            description="Built to be the fastest, simplest way to clean up text — nothing more, nothing less."
          />

          <div className="mt-12">
            <FeatureList features={benefits} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="w-full border-t border-border bg-muted/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading id="faq-heading" title="Frequently Asked Questions" />

          <div className="mx-auto mt-12 max-w-3xl">
            <FaqSection faqs={toolsPageFaqs} />
          </div>
        </div>
      </section>

      <section aria-labelledby="tools-cta-heading" className="w-full border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="tools-cta-heading"
            title="Ready to Get Started?"
            description="Pick any tool above and start cleaning up your text instantly."
          />

          <div className="mt-8 flex justify-center">
            <Button render={<Link href="#tools" />} nativeButton={false} size="lg">
              Browse Tools
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
