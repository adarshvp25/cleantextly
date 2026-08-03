import { tools } from "@/lib/tools"

export type Category = {
  slug: string
  name: string
  description: string
}

export const categories: Category[] = [
  {
    slug: "text-tools",
    name: "Text Tools",
    description: "Clean, format, convert, and analyze plain text instantly.",
  },
]

export function getToolsByCategory(slug: string) {
  return tools.filter((tool) => tool.category === slug)
}
