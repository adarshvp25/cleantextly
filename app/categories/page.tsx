import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ToolGrid } from "@/components/tools/tool-grid"
import { SectionHeading } from "@/components/tools/content/section-heading"
import { FeatureList } from "@/components/tools/content/feature-list"
import { FaqSection } from "@/components/tools/content/faq-section"
import { CategoryGrid } from "@/components/categories/category-grid"
import { categories, getToolsByCategory } from "@/lib/categories"
import { siteConfig, ogImage } from "@/lib/site"
import type { ToolFeature, ToolFaq } from "@/lib/tools/content"

const title = "Browse Tool Categories — CleanTextly"
const description =
  "Browse CleanTextly's free browser-based text tools by category, organized to make them easier to discover as the collection grows."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/categories",
  },
  openGraph: {
    title,
    description,
    url: "/categories",
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

const whyCategoriesMatter: ToolFeature[] = [
  {
    title: "Easier Discovery",
    description: "Find the right tool faster by browsing tools grouped by what they're used for.",
  },
  {
    title: "Better Organization",
    description: "Related tools are kept together instead of scattered across one long list.",
  },
  {
    title: "Faster Navigation",
    description: "Jump straight to the category you need instead of scanning every tool.",
  },
  {
    title: "Future Scalability",
    description: "As CleanTextly adds more tools, categories keep the collection easy to navigate.",
  },
  {
    title: "Improved Browsing",
    description: "See how many tools are available in a category before diving in.",
  },
  {
    title: "Clear Grouping",
    description: "Each tool belongs to a category that reflects how it's actually used.",
  },
]

const textToolsCount = getToolsByCategory("text-tools").length

const categoriesFaqs: ToolFaq[] = [
  {
    question: "What are tool categories?",
    answer:
      "Categories group CleanTextly's tools by what they're used for, making it easier to find the right tool as the collection grows.",
  },
  {
    question: "How many categories does CleanTextly have?",
    answer: `CleanTextly currently has ${categories.length} ${categories.length === 1 ? "category" : "categories"} — ${categories.map((category) => category.name).join(", ")} — with more planned as new types of tools are added.`,
  },
  {
    question: "What's in the Text Tools category?",
    answer: `Text Tools currently includes ${textToolsCount} tools for cleaning, formatting, converting, sorting, and analyzing text.`,
  },
  {
    question: "Will more categories be added?",
    answer:
      "Yes. As CleanTextly grows beyond text utilities, new categories will be added to keep tools organized and easy to find.",
  },
  {
    question: "Do I need to browse by category?",
    answer:
      "No. You can also browse every tool at once on the Tools page, or use any tool directly from its own page.",
  },
  {
    question: "Are tools ever moved between categories?",
    answer:
      "Tools are placed in the category that best fits how they're used, and may be reorganized as new categories are introduced.",
  },
]

export default function CategoriesPage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Browse Tool Categories
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          CleanTextly organizes its tools into categories to make them easier
          to discover as the collection grows.
        </p>
      </section>

      <section
        aria-labelledby="categories-heading"
        className="w-full border-t border-border bg-muted/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="categories-heading"
            title="Categories"
            description="Explore tools grouped by what they're used for."
          />

          <div className="mt-12">
            <CategoryGrid categories={categories} />
          </div>
        </div>
      </section>

      <section id="text-tools" aria-labelledby="text-tools-heading" className="w-full border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="text-tools-heading"
            title="Text Tools"
            description="Clean, format, convert, and analyze plain text instantly."
          />

          <div className="mt-12">
            <ToolGrid tools={getToolsByCategory("text-tools")} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="why-categories-heading"
        className="w-full border-t border-border bg-muted/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading id="why-categories-heading" title="Why Categories Matter" />

          <div className="mt-12">
            <FeatureList features={whyCategoriesMatter} />
          </div>
        </div>
      </section>

      <section aria-labelledby="categories-faq-heading" className="w-full border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading id="categories-faq-heading" title="Frequently Asked Questions" />

          <div className="mx-auto mt-12 max-w-3xl">
            <FaqSection faqs={categoriesFaqs} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="categories-cta-heading"
        className="w-full border-t border-border bg-muted/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="categories-cta-heading"
            title="Ready to Get Started?"
            description="Explore the full collection of free CleanTextly tools."
          />

          <div className="mt-8 flex justify-center">
            <Button render={<Link href="/tools" />} nativeButton={false} size="lg">
              Browse All Tools
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
