import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ToolGrid } from "@/components/tools/tool-grid"
import { SectionHeading } from "@/components/tools/content/section-heading"
import { tools } from "@/lib/tools"

export const metadata: Metadata = {
  title: "404 – Page Not Found | CleanTextly",
  description:
    "The page you're looking for doesn't exist. Browse CleanTextly's free online text tools.",
  robots: {
    index: false,
    follow: true,
  },
}

const popularTools = tools.slice(0, 3)

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:py-32">
        <h1 className="text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Page Not Found
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button render={<Link href="/" />} nativeButton={false} size="lg">
            Back to Home
          </Button>

          <Button
            render={<Link href="/tools" />}
            nativeButton={false}
            variant="secondary"
            size="lg"
          >
            Browse All Tools
          </Button>
        </div>
      </section>

      <section
        aria-labelledby="popular-tools-heading"
        className="w-full border-t border-border bg-muted/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading id="popular-tools-heading" title="Popular Tools" />

          <div className="mt-12">
            <ToolGrid tools={popularTools} />
          </div>
        </div>
      </section>
    </main>
  )
}
