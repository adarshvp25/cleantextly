import Link from "next/link"

import type { BlogPost } from "@/lib/blog/posts"

export function ArticleCard({ post }: { post: BlogPost }) {
  const publishedLabel = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-6 text-left shadow-sm transition-all duration-200 outline-none hover:-translate-y-1 hover:border-foreground/15 hover:shadow-md focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <p className="text-xs font-medium text-muted-foreground">{publishedLabel}</p>
      <h3 className="font-semibold text-card-foreground">{post.title}</h3>
      <p className="text-sm text-muted-foreground">{post.excerpt}</p>
    </Link>
  )
}
