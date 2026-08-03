import type { Metadata } from "next";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ToolGrid } from "@/components/tools/tool-grid";
import { SectionHeading } from "@/components/tools/content/section-heading";
import { FeatureList } from "@/components/tools/content/feature-list";
import { StepGuide } from "@/components/tools/content/step-guide";
import { FaqSection } from "@/components/tools/content/faq-section";
import { tools } from "@/lib/tools";
import { siteConfig, ogImage } from "@/lib/site";
import { benefits, howItWorks, useCases, homeFaqs } from "@/lib/home-content";

const badges = ["No Login", "Privacy First", "Fast", "Browser-based"];

const title = "CleanTextly — Free Online Text Tools";
const description =
  "Free, fast, browser-based text tools: remove duplicate lines, format JSON, convert case, sort text, convert CSV to JSON, and count words. No sign-up, 100% private.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
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
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Clean, Format &amp; Transform Text Instantly
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Free browser-based text tools for developers, students, analysts
          and creators. No sign-up required.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button render={<a href="#tools" />} nativeButton={false} size="lg">
            Browse Tools
          </Button>

          <Button
            render={<a href="#tools" />}
            nativeButton={false}
            variant="secondary"
            size="lg"
          >
            View All Tools
          </Button>
        </div>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          {badges.map((badge) => (
            <li key={badge} className="flex items-center gap-1.5">
              <Check aria-hidden="true" className="size-4 text-foreground/70" />
              {badge}
            </li>
          ))}
        </ul>
      </section>

      <section
        id="tools"
        aria-labelledby="tools-heading"
        className="w-full border-t border-border bg-muted/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="tools-heading"
            title="Featured Tools"
            description="Explore all of CleanTextly's free, browser-based text tools."
          />

          <div className="mt-12">
            <ToolGrid tools={tools} />
          </div>
        </div>
      </section>

      <section aria-labelledby="why-choose-heading" className="w-full border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="why-choose-heading"
            title="Why Choose CleanTextly"
            description="Built to be the fastest, simplest way to clean up text — nothing more, nothing less."
          />

          <div className="mt-12">
            <FeatureList features={benefits} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="how-it-works-heading"
        className="w-full border-t border-border bg-muted/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="how-it-works-heading"
            title="How It Works"
            description="Paste, process, copy — that's it."
          />

          <div className="mx-auto mt-12 max-w-xl">
            <StepGuide steps={howItWorks} />
          </div>
        </div>
      </section>

      <section aria-labelledby="use-cases-heading" className="w-full border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="use-cases-heading"
            title="Popular Use Cases"
            description="CleanTextly fits naturally into all kinds of everyday text work."
          />

          <div className="mt-12">
            <FeatureList features={useCases} />
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
            <FaqSection faqs={homeFaqs} />
          </div>
        </div>
      </section>

      <section aria-labelledby="final-cta-heading" className="w-full border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="final-cta-heading"
            title="Ready to Clean Up Your Text?"
            description="Jump into any tool below — no sign-up required."
          />

          <div className="mt-8 flex justify-center">
            <Button render={<a href="#tools" />} nativeButton={false} size="lg">
              Browse All Tools
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
