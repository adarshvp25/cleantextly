import type { Metadata } from "next"

import { ArticleGrid } from "@/components/blog/article-grid"
import { blogPosts } from "@/lib/blog/posts"
import { siteConfig, ogImage } from "@/lib/site"

const title = "Blog — CleanTextly"
const description =
  "Guides and practical tips on formatting, cleaning, and working with text and XML, from the team behind CleanTextly's free browser-based tools."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title,
    description,
    url: "/blog",
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

export default function BlogPage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Blog
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Guides and practical tips on formatting, cleaning, and working with
          text and XML.
        </p>
      </section>

      <section aria-labelledby="blog-posts-heading" className="w-full border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <h2 id="blog-posts-heading" className="sr-only">
            Articles
          </h2>
          <ArticleGrid posts={blogPosts} />
        </div>
      </section>
    </main>
  )
}
