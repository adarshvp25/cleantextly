import type { Category } from "@/lib/categories"
import { CategoryCard } from "@/components/categories/category-card"

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <li key={category.slug}>
          <CategoryCard category={category} />
        </li>
      ))}
    </ul>
  )
}
