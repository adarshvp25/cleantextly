import type { LucideIcon } from "lucide-react"
import { ArrowDownAZ, Braces, CaseSensitive, CopyX, Eraser, FileSpreadsheet, FlipHorizontal, FoldHorizontal, Hash, ListOrdered, ReplaceAll, Type, UnfoldHorizontal } from "lucide-react"

export type Tool = {
  name: string
  description: string
  icon: LucideIcon
  href: string
  category: string
  comingSoon?: boolean
  // Homepage "Featured Tools" display order. Undefined = not featured.
  // Adding a tool to `tools` below does NOT put it on the homepage —
  // it only appears in the /tools catalogue unless this is set.
  featured?: number
}

export const tools: Tool[] = [
  {
    name: "Remove Duplicate Lines",
    description: "Delete repeated lines from any block of text.",
    icon: CopyX,
    href: "/tools/remove-duplicate-lines",
    category: "text-tools",
  },
  {
    name: "JSON Formatter",
    description: "Beautify and validate JSON right in your browser.",
    icon: Braces,
    href: "/tools/json-formatter",
    category: "text-tools",
    featured: 4,
  },
  {
    name: "Case Converter",
    description: "Switch between upper, lower, and title case instantly.",
    icon: CaseSensitive,
    href: "/tools/case-converter",
    category: "text-tools",
    featured: 3,
  },
  {
    name: "Text Sorter",
    description: "Sort lines alphabetically or numerically.",
    icon: ArrowDownAZ,
    href: "/tools/text-sorter",
    category: "text-tools",
  },
  {
    name: "CSV to JSON",
    description: "Convert CSV data into clean, structured JSON.",
    icon: FileSpreadsheet,
    href: "/tools/csv-to-json",
    category: "text-tools",
  },
  {
    name: "Word Counter",
    description: "Count words, characters, and sentences fast.",
    icon: Hash,
    href: "/tools/word-counter",
    category: "text-tools",
    featured: 1,
  },
  {
    name: "Character Counter",
    description: "Count characters, letters, words, and more in real time.",
    icon: Type,
    href: "/tools/character-counter",
    category: "text-tools",
    featured: 2,
  },
  {
    name: "Remove Empty Lines",
    description: "Delete blank and whitespace-only lines from any text.",
    icon: Eraser,
    href: "/tools/remove-empty-lines",
    category: "text-tools",
  },
  {
    name: "Find and Replace",
    description: "Find and replace every occurrence of text instantly.",
    icon: ReplaceAll,
    href: "/tools/find-and-replace",
    category: "text-tools",
  },
  {
    name: "Remove Extra Spaces",
    description: "Collapse extra spaces and tabs while keeping line breaks.",
    icon: FoldHorizontal,
    href: "/tools/remove-extra-spaces",
    category: "text-tools",
    featured: 5,
  },
  {
    name: "Remove Line Breaks",
    description: "Join lines into one paragraph by removing line breaks.",
    icon: UnfoldHorizontal,
    href: "/tools/remove-line-breaks",
    category: "text-tools",
  },
  {
    name: "Line Counter",
    description: "Count lines, characters, and words in text instantly.",
    icon: ListOrdered,
    href: "/tools/line-counter",
    category: "text-tools",
  },
  {
    name: "Text Reverser",
    description: "Reverse text, words, letters, or lines instantly.",
    icon: FlipHorizontal,
    href: "/tools/text-reverser",
    category: "text-tools",
    featured: 6,
  },
]

// The curated set shown in the homepage "Featured Tools" section, in
// display order. New tools are never included automatically — set
// `featured` on a tool above to add it here.
export function getFeaturedTools(): Tool[] {
  return tools
    .filter((tool) => tool.featured !== undefined)
    .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0))
}
