import { Button } from "@/components/ui/button"
import type { Category } from "@/lib/categories"
import { getToolsByCategory } from "@/lib/categories"

export function CategoryCard({ category }: { category: Category }) {
  const toolCount = getToolsByCategory(category.slug).length

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
      <h3 className="font-semibold text-card-foreground">{category.name}</h3>
      <p className="text-sm text-muted-foreground">{category.description}</p>
      <p className="text-sm text-muted-foreground">
        {toolCount} {toolCount === 1 ? "tool" : "tools"}
      </p>
      <Button
        render={<a href={`#${category.slug}`} />}
        nativeButton={false}
        className="mt-2 self-start"
      >
        Explore Category
      </Button>
    </div>
  )
}
