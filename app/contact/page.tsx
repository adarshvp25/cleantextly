import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/tools/content/section-heading"
import { FeatureList } from "@/components/tools/content/feature-list"
import { FaqSection } from "@/components/tools/content/faq-section"
import { ContactForm } from "@/components/contact/contact-form"
import { siteConfig, ogImage } from "@/lib/site"
import type { ToolFeature, ToolFaq } from "@/lib/tools/content"

const title = "Contact CleanTextly — Free Online Text Tools"
const description =
  "Get in touch with CleanTextly for bug reports, feature requests, feedback, or general questions about our free browser-based text tools."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title,
    description,
    url: "/contact",
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

const contactReasons: ToolFeature[] = [
  {
    title: "Bug Reports",
    description: "Run into something broken or unexpected? Let us know so we can fix it.",
  },
  {
    title: "Feature Requests",
    description: "Have an idea for a new tool or an improvement to an existing one? We'd love to hear it.",
  },
  {
    title: "General Questions",
    description: "Not sure how something works? Ask away.",
  },
  {
    title: "Business Inquiries",
    description: "Reach out for anything related to business use of CleanTextly.",
  },
  {
    title: "Feedback",
    description: "Good or bad, your feedback helps make CleanTextly better.",
  },
  {
    title: "Partnership Opportunities",
    description: "Interested in partnering with CleanTextly? Get in touch.",
  },
]

const contactFaqs: ToolFaq[] = [
  {
    question: "How long does it take to receive a reply?",
    answer: "Usually within 24–48 hours.",
  },
  {
    question: "Can I request a new tool?",
    answer:
      "Yes. Use the contact form above to suggest a new tool, and we'll take a look.",
  },
  {
    question: "Is technical support free?",
    answer:
      "Yes. Support for every CleanTextly tool is completely free, just like the tools themselves.",
  },
  {
    question: "Can I report a bug?",
    answer:
      "Yes, please do. Use the contact form above and describe what happened so we can fix it.",
  },
  {
    question: "Do you accept partnerships?",
    answer:
      "Yes. Reach out through the contact form with details and we'll get back to you.",
  },
  {
    question: "Will my information remain private?",
    answer:
      "Yes. Information you submit through this form is only used to respond to your message and is never sold or shared.",
  },
]

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Contact CleanTextly
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Have a question, found a bug, or want to suggest a new tool? We&apos;d
          love to hear from you.
        </p>
      </section>

      <section aria-labelledby="contact-form-heading" className="w-full border-t border-border bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <h2 id="contact-form-heading" className="sr-only">
            Send us a message
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-card-foreground">Email Support</h3>
              <a
                href="mailto:contact@cleantextly.com"
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                contact@cleantextly.com
              </a>
              <p className="text-sm text-muted-foreground">
                Usually within 24–48 hours.
              </p>
              <p className="text-sm text-muted-foreground">
                Please do not send passwords or sensitive personal information
                through this form.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-reasons-heading" className="w-full border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading id="contact-reasons-heading" title="What You Can Contact Us About" />

          <div className="mt-12">
            <FeatureList features={contactReasons} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="contact-faq-heading"
        className="w-full border-t border-border bg-muted/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading id="contact-faq-heading" title="Frequently Asked Questions" />

          <div className="mx-auto mt-12 max-w-3xl">
            <FaqSection faqs={contactFaqs} />
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-cta-heading" className="w-full border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="contact-cta-heading"
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
