import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/tools/content/section-heading"
import { siteConfig, ogImage } from "@/lib/site"

const title = "Privacy Policy — CleanTextly"
const description =
  "Learn how CleanTextly collects, uses, and protects your information, including what data our free browser-based text tools do and do not collect."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title,
    description,
    url: "/privacy-policy",
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

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Privacy Policy
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Learn how CleanTextly collects, uses, and protects your information.
        </p>

        <p className="mt-6 text-sm text-muted-foreground">
          Effective Date: <span className="font-medium text-foreground">{effectiveDate}</span>
        </p>
      </section>

      <section className="w-full border-t border-border py-16 sm:py-20">
        <article className="mx-auto flex max-w-3xl flex-col gap-14 px-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Introduction
            </h2>
            <div className="mt-4 flex flex-col gap-4 text-muted-foreground">
              <p>
                CleanTextly (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides free,
                browser-based text tools such as duplicate line removal, JSON
                formatting, case conversion, text sorting, CSV to JSON
                conversion, and word counting. We value your privacy and only
                collect the information that is reasonably necessary to
                operate, secure, and improve this website.
              </p>
              <p>
                Whenever possible, our tools process your text directly in
                your browser. Text you paste or type into a CleanTextly tool
                is not uploaded to our servers or stored by us as part of that
                processing.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Information We Collect
            </h2>

            <div className="mt-6 flex flex-col gap-8">
              <div>
                <h3 className="font-semibold text-foreground">
                  Information You Voluntarily Provide
                </h3>
                <p className="mt-2 text-muted-foreground">
                  When you use our{" "}
                  <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                    Contact form
                  </Link>
                  , you voluntarily provide your name, email address, subject,
                  and message. We use this information solely to respond to
                  your inquiry.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">
                  Technical Information
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Like most websites, our hosting and content-delivery
                  infrastructure may automatically log standard technical
                  information when you visit CleanTextly, such as your
                  approximate IP address, browser type, device type, referring
                  page, and the pages you visit. This information is used for
                  security, performance, and basic analytics purposes.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Cookies</h3>
                <p className="mt-2 text-muted-foreground">
                  CleanTextly&apos;s tools run entirely in your browser and do
                  not currently require cookies to function. Our hosting and
                  security provider may set limited technical cookies to help
                  protect the site. See the{" "}
                  <a href="#cookies" className="text-primary underline-offset-4 hover:underline">
                    Cookies section
                  </a>{" "}
                  below for more detail.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">
                  Usage Statistics
                </h3>
                <p className="mt-2 text-muted-foreground">
                  We may review aggregated, non-identifying usage statistics
                  (such as which pages or tools are visited most often) to
                  understand how the site is used and to prioritize
                  improvements.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              How We Use Information
            </h2>
            <p className="mt-4 text-muted-foreground">
              We use the information described above to:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Respond to messages and inquiries submitted through our Contact form</li>
              <li>Operate, maintain, and improve CleanTextly&apos;s tools and website</li>
              <li>Monitor site performance and diagnose technical issues</li>
              <li>Detect, prevent, and address abuse, fraud, or security issues</li>
              <li>Comply with applicable legal obligations</li>
            </ul>
          </div>

          <div id="cookies">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Cookies
            </h2>
            <div className="mt-4 flex flex-col gap-4 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Essential cookies:</span>{" "}
                Cookies that are strictly necessary for basic site security and
                delivery may be set by our hosting and content-delivery
                provider.
              </p>
              <p>
                <span className="font-medium text-foreground">Analytics cookies (future):</span>{" "}
                We may introduce analytics tools, such as Google Analytics, in
                the future to help us understand how visitors use CleanTextly.
                Analytics cookies are not currently active on this site.
              </p>
              <p>
                <span className="font-medium text-foreground">Advertising cookies (future):</span>{" "}
                We may introduce advertising, such as Google AdSense, in the
                future. Advertising cookies are not currently active on this
                site. See the{" "}
                <a href="#adsense" className="text-primary underline-offset-4 hover:underline">
                  Google AdSense section
                </a>{" "}
                below for more detail.
              </p>
              <p>
                You can disable or delete cookies at any time through your
                browser settings. Doing so may affect certain site features
                that rely on cookies.
              </p>
            </div>
          </div>

          <div id="adsense">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Google AdSense
            </h2>
            <div className="mt-4 flex flex-col gap-4 text-muted-foreground">
              <p>
                CleanTextly does not currently display advertisements. In the
                future, we may use Google AdSense to display ads on this
                website in order to help support its free tools.
              </p>
              <p>
                If and when AdSense is enabled, Google and its partners may
                use cookies to serve ads based on your prior visits to this
                and other websites, and may show personalized ads based on
                your interests. You can learn more about, and opt out of,
                personalized advertising by visiting Google&apos;s{" "}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Ads Settings
                </a>
                .
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Third-Party Services
            </h2>
            <p className="mt-4 text-muted-foreground">
              We work with, or plan to work with, a small number of
              third-party services to operate CleanTextly:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Cloudflare</span> —
                our hosting and content-delivery network, which helps serve
                the site quickly and securely and may process basic technical
                and connection data as part of that service.
              </li>
              <li>
                <span className="font-medium text-foreground">Google Analytics (future)</span> —
                planned for future use to help us understand aggregate site
                usage. Not currently active.
              </li>
              <li>
                <span className="font-medium text-foreground">Google Search Console</span> —
                used to monitor how CleanTextly appears in Google Search
                results and to help keep our pages properly indexed.
              </li>
              <li>
                <span className="font-medium text-foreground">Resend</span> —
                an email delivery service we use, or plan to use, to process
                messages submitted through our Contact form.
              </li>
              <li>
                <span className="font-medium text-foreground">Hosting Provider</span> —
                our infrastructure provider, which stores and serves the
                CleanTextly website.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Data Security
            </h2>
            <p className="mt-4 text-muted-foreground">
              We use reasonable technical and organizational measures to help
              protect the information we collect. However, no method of
              transmission over the internet or method of electronic storage
              is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Children&apos;s Privacy
            </h2>
            <p className="mt-4 text-muted-foreground">
              CleanTextly is not directed to, and is not intended for use by,
              children under the age of 13. We do not knowingly collect
              personal information from children under 13.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Your Rights
            </h2>
            <p className="mt-4 text-muted-foreground">
              You may request information about the data we hold about you,
              ask us to correct or delete information you have provided (such
              as a message sent through our Contact form), or ask us any
              other questions about this Privacy Policy. To do so, please{" "}
              <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                contact us
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Contact
            </h2>
            <p className="mt-4 text-muted-foreground">
              If you have any questions about this Privacy Policy, please
              reach out to us at{" "}
              <a
                href="mailto:contact@cleantextly.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                contact@cleantextly.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Updates to This Policy
            </h2>
            <p className="mt-4 text-muted-foreground">
              We may update this Privacy Policy from time to time to reflect
              changes to our practices or for other operational, legal, or
              regulatory reasons. When we do, we will revise the Effective
              Date at the top of this page.
            </p>
          </div>
        </article>
      </section>

      <section aria-labelledby="privacy-cta-heading" className="w-full border-t border-border bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            id="privacy-cta-heading"
            title="Have Questions About Your Privacy?"
            description="We're happy to answer any questions about how CleanTextly handles your information."
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
