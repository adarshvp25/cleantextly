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
    slug: "how-long-does-it-take-to-read-1000-words",
    title: "How Long Does It Take to Read 1,000 Words?",
    description:
      "Find out how long it takes to read 1,000 words at different reading speeds, plus estimates for 500, 2,000, and 3,000 words and how to calculate reading time.",
    publishedAt: "2026-09-26",
    excerpt:
      "How long 1,000 words takes to read at different speeds, plus reading time for other word counts and how to calculate it for any text.",
  },
  {
    slug: "how-to-convert-yaml-to-json",
    title: "How to Convert YAML to JSON – A Practical Guide",
    description:
      "Learn how to convert YAML to JSON with a simple example, manual steps, common conversion issues, and a free online YAML to JSON converter.",
    publishedAt: "2026-09-19",
    excerpt:
      "What YAML and JSON are, how to convert between them by hand or online, and the common mistakes that trip up a conversion.",
  },
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
