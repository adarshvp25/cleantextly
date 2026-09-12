import type { BlogPost } from "@/lib/blog/posts"
import { ArticleCard } from "@/components/blog/article-card"

export function ArticleGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <ArticleCard post={post} />
        </li>
      ))}
    </ul>
  )
}
