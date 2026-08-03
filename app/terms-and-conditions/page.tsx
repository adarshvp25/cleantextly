import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/tools/content/section-heading"
import { siteConfig, ogImage } from "@/lib/site"

const title = "Terms & Conditions — CleanTextly"
const description =
  "Read the Terms & Conditions governing your use of CleanTextly's free browser-based text tools."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title,
    description,
    url: "/terms-and-conditions",
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

const effectiveDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

export default function TermsPage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Terms &amp; Conditions
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Please read these Terms &amp; Conditions carefully before using
          CleanTextly.
        </p>

        <p className="mt-6 text-sm text-muted-foreground">
          Effective Date: <span className="font-medium text-foreground">{effectiveDate}</span>
        </p>
      </section>

      <section className="w-full border-t border-border py-16 sm:py-20">
        <article className="mx-auto flex max-w-3xl flex-col gap-14 px-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Acceptance of Terms
            </h2>
            <p className="mt-4 text-muted-foreground">
              By accessing or using CleanTextly (&quot;we,&quot; &quot;us,&quot;
              or &quot;our&quot;), you agree to be bound by these Terms &amp;
              Conditions. If you do not agree to these terms, please do not
              use the website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Use of the Website
            </h2>
            <p className="mt-4 text-muted-foreground">By using CleanTextly, you agree to:</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Use the website only for lawful purposes</li>
              <li>Not attempt to disrupt, overload, or abuse the service</li>
              <li>Not misuse automated systems, bots, or scrapers against the website</li>
              <li>Not attempt to gain unauthorized access to any part of the website or its systems</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Intellectual Property
            </h2>
            <div className="mt-4 flex flex-col gap-4 text-muted-foreground">
              <p>
                The CleanTextly name, logo, website design, and original
                content are the property of CleanTextly and are protected by
                applicable intellectual property laws.
              </p>
              <p>
                You retain full ownership of any text you process using our
                tools. We do not claim any rights to the content you paste,
                type, or generate while using CleanTextly.
              </p>
              <p>
                You may not copy, reproduce, or redistribute the website&apos;s
                design, branding, or original content without our prior
                written permission.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Tool Usage
            </h2>
            <div className="mt-4 flex flex-col gap-4 text-muted-foreground">
              <p>
                CleanTextly&apos;s tools are provided &quot;as is,&quot;
                without warranties of any kind. While we aim for accuracy,
                results may not always be perfect or suitable for every use
                case.
              </p>
              <p>
                You should always review and verify important outputs before
                relying on them, particularly for professional, legal,
                academic, or business purposes.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Availability
            </h2>
            <p className="mt-4 text-muted-foreground">
              We may change, add, or remove features and tools at any time.
              The website may occasionally experience temporary downtime for
              maintenance, updates, or reasons outside of our control, and we
              do not guarantee uninterrupted availability.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Limitation of Liability
            </h2>
            <p className="mt-4 text-muted-foreground">
              CleanTextly is not responsible for any loss or damage resulting
              from your use of the website, or from reliance on results
              generated by our tools. Use the website and its tools at your
              own discretion and risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Third-Party Services
            </h2>
            <p className="mt-4 text-muted-foreground">
              CleanTextly relies on third-party services to operate,
              including:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Cloudflare</span> —
                for hosting and content delivery
              </li>
              <li>
                <span className="font-medium text-foreground">Google services</span> —
                such as Search Console, and potentially Analytics or AdSense
                in the future
              </li>
              <li>
                <span className="font-medium text-foreground">Resend</span> —
                for processing messages submitted through our Contact form
              </li>
              <li>
                <span className="font-medium text-foreground">Hosting providers</span> —
                for storing and serving the website
              </li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              For more detail on how these services relate to your
              information, see our{" "}
              <Link href="/privacy-policy" className="text-primary underline-offset-4 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Termination
            </h2>
            <p className="mt-4 text-muted-foreground">
              We may restrict or terminate your access to CleanTextly if we
              believe you have misused or abused the website or violated
              these Terms &amp; Conditions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Changes to Terms
            </h2>
            <p className="mt-4 text-muted-foreground">
              We may update these Terms &amp; Conditions from time to time.
              When we do, we will revise the Effective Date at the top of
              this page. Continued use of the website after changes take
              effect constitutes acceptance of the updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Governing Law
            </h2>
            <p className="mt-4 text-muted-foreground">
              These Terms &amp; Conditions are governed by the applicable laws
              of India.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Contact
            </h2>
            <p className="mt-4 text-muted-foreground">
              If you have any questions about these Terms &amp; Conditions,
              please reach out to us at{" "}
              <a
                href="mailto:contact@cleantextly.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                contact@cleantextly.com
              </a>
              .
            </p>
          </div>
        </article>
      </section>

      <section aria-labelledby="terms-cta-heading" className="w-full border-t border-border bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="terms-cta-heading"
            title="Have Questions About These Terms?"
            description="We're happy to answer any questions about how CleanTextly can be used."
          />

          <div className="mt-8 flex justify-center">
            <Button render={<Link href="/contact" />} nativeButton={false} size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
