export type BlogPost = {
  slug: string
  title: string
  description: string
  publishedAt: string
  excerpt: string
}

// Single source of truth for every published article — consumed by the
// blog index and the sitemap. Publishing another article means adding one
// entry here plus its own app/blog/<slug>/page.tsx.
export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-beautify-xml-online",
    title: "How to Beautify XML Online – Step-by-Step Guide",
    description:
      "Learn how to beautify XML step by step, see a before-and-after example, and find out when a free online XML formatter is the right tool for the job.",
    publishedAt: "2026-09-13",
    excerpt:
      "A quick, practical guide to formatting messy or minified XML — plus when to use an online XML formatter instead of doing it by hand.",
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

// For use in an article's own page.tsx, where the post is known to exist —
// throws at build time instead of forcing every caller to handle undefined.
export function getRequiredBlogPost(slug: string): BlogPost {
  const post = getBlogPostBySlug(slug)
  if (!post) {
    throw new Error(`Missing blog post data for slug: ${slug}`)
  }
  return post
}
