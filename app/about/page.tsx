import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/tools/content/section-heading"
import { FeatureList } from "@/components/tools/content/feature-list"
import { FaqSection } from "@/components/tools/content/faq-section"
import { siteConfig, ogImage } from "@/lib/site"
import type { ToolFeature, ToolFaq } from "@/lib/tools/content"

const title = "About CleanTextly — Free Online Text Tools"
const description =
  "CleanTextly is a collection of free, browser-based text tools built to help developers, writers, students, and professionals clean, format, convert, and analyze text instantly."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title,
    description,
    url: "/about",
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

const mission: ToolFeature[] = [
  {
    title: "Accessible for Everyone",
    description: "Useful text tools should be available to anyone who needs them, with nothing locked behind logins or paywalls.",
  },
  {
    title: "Fast and Simple",
    description: "Every tool is built to do one job well, with no unnecessary complexity getting in the way.",
  },
  {
    title: "No Sign-Up Required",
    description: "Start using any tool immediately — there's nothing to register for.",
  },
  {
    title: "Privacy-First Processing",
    description: "Text is processed entirely in your browser and is never uploaded or stored.",
  },
]

const differentiators: ToolFeature[] = [
  {
    title: "Free to Use",
    description: "Every tool is completely free, with no hidden fees or premium tiers.",
  },
  {
    title: "Browser-Based Processing",
    description: "No installs or plugins — everything runs directly in your browser.",
  },
  {
    title: "No Registration",
    description: "Start using any tool immediately. No sign-up and no account required.",
  },
  {
    title: "Privacy-First",
    description: "Your text never leaves your browser. Nothing is uploaded, logged, or stored.",
  },
  {
    title: "Mobile Friendly",
    description: "Every tool is fully responsive and works great on phones and tablets.",
  },
  {
    title: "Fast Performance",
    description: "Tools update live as you type, with no waiting or processing delays.",
  },
  {
    title: "Clean Interface",
    description: "A consistent, uncluttered design across every tool, with nothing to distract you.",
  },
  {
    title: "Growing Collection of Tools",
    description: "New tools are added regularly, all following the same fast, free, private approach.",
  },
]

const audiences: ToolFeature[] = [
  {
    title: "Developers",
    description: "Format JSON, convert case styles, and clean up code snippets and config files.",
  },
  {
    title: "Students",
    description: "Fix messy notes, clean up citations, and count words for assignments.",
  },
  {
    title: "Writers",
    description: "Polish drafts with case conversion, word counts, and reading-time estimates.",
  },
  {
    title: "Content Creators",
    description: "Clean up scripts, captions, and social copy before publishing.",
  },
  {
    title: "SEO Professionals",
    description: "Format meta descriptions, sort keyword lists, and check character counts.",
  },
  {
    title: "Data Analysts",
    description: "Convert CSV exports to JSON and deduplicate messy data rows.",
  },
  {
    title: "Business Users",
    description: "Clean up reports, lists, and pasted content without installing any software.",
  },
]

const values: ToolFeature[] = [
  {
    title: "Simplicity",
    description: "Every tool focuses on doing one job clearly, without unnecessary options or clutter.",
  },
  {
    title: "Accuracy",
    description: "Tools are built and tested to handle real-world text correctly, including edge cases.",
  },
  {
    title: "Privacy",
    description: "Your text and data are never uploaded, logged, or stored — everything stays in your browser.",
  },
  {
    title: "Performance",
    description: "Tools respond instantly, so you spend time on your work instead of waiting.",
  },
  {
    title: "Accessibility",
    description: "Tools are designed to be usable by everyone, on any device, with no barriers to entry.",
  },
  {
    title: "Continuous Improvement",
    description: "CleanTextly is actively maintained and improved based on real usage and feedback.",
  },
]

const aboutFaqs: ToolFaq[] = [
  {
    question: "Is CleanTextly free?",
    answer:
      "Yes. Every tool on CleanTextly is completely free to use, with no hidden fees or premium tiers.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. Every tool works immediately in your browser — no sign-up or login required.",
  },
  {
    question: "Is my data uploaded?",
    answer:
      "No. All processing happens locally in your browser. Your text is never uploaded to a server or stored.",
  },
  {
    question: "Who built CleanTextly?",
    answer:
      "CleanTextly is built and maintained as an independent project focused on making useful text tools freely available to everyone.",
  },
  {
    question: "Will more tools be added?",
    answer:
      "Yes. CleanTextly is actively growing, with new tools added regularly.",
  },
  {
    question: "How can I suggest a feature?",
    answer:
      "We're always looking to improve CleanTextly. A dedicated way to share feedback and feature requests is on the way — check the Contact page for updates.",
  },
]

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          About CleanTextly
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          CleanTextly is a collection of free online text utilities built to
          help developers, writers, students, marketers, and professionals
          clean, format, convert, and analyze text directly in their browser.
        </p>
      </section>

      <section aria-labelledby="mission-heading" className="w-full border-t border-border bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="mission-heading"
            title="Our Mission"
            description="Make useful text tools accessible for everyone, without unnecessary complexity."
          />

          <div className="mt-12">
            <FeatureList features={mission} />
          </div>
        </div>
      </section>

      <section aria-labelledby="different-heading" className="w-full border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading id="different-heading" title="What Makes CleanTextly Different" />

          <div className="mt-12">
            <FeatureList features={differentiators} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="who-its-for-heading"
        className="w-full border-t border-border bg-muted/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="who-its-for-heading"
            title="Who It's For"
            description="CleanTextly fits naturally into all kinds of everyday text work."
          />

          <div className="mt-12">
            <FeatureList features={audiences} />
          </div>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="w-full border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading id="values-heading" title="Our Values" />

          <div className="mt-12">
            <FeatureList features={values} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="about-faq-heading"
        className="w-full border-t border-border bg-muted/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading id="about-faq-heading" title="Frequently Asked Questions" />

          <div className="mx-auto mt-12 max-w-3xl">
            <FaqSection faqs={aboutFaqs} />
          </div>
        </div>
      </section>

      <section aria-labelledby="about-cta-heading" className="w-full border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="about-cta-heading"
            title="Ready to Get Started?"
            description="Explore the full collection of free CleanTextly tools."
          />

          <div className="mt-8 flex justify-center">
            <Button render={<Link href="/tools" />} nativeButton={false} size="lg">
              Browse Tools
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
