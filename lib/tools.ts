import type { LucideIcon } from "lucide-react"
import { ArrowDownAZ, Braces, CaseSensitive, CopyX, Eraser, FileSpreadsheet, FoldHorizontal, Hash, ReplaceAll, Type, UnfoldHorizontal } from "lucide-react"

export type Tool = {
  name: string
  description: string
  icon: LucideIcon
  href: string
  category: string
  comingSoon?: boolean
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
  },
  {
    name: "Case Converter",
    description: "Switch between upper, lower, and title case instantly.",
    icon: CaseSensitive,
    href: "/tools/case-converter",
    category: "text-tools",
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
  },
  {
    name: "Character Counter",
    description: "Count characters, letters, words, and more in real time.",
    icon: Type,
    href: "/tools/character-counter",
    category: "text-tools",
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
  },
  {
    name: "Remove Line Breaks",
    description: "Join lines into one paragraph by removing line breaks.",
    icon: UnfoldHorizontal,
    href: "/tools/remove-line-breaks",
    category: "text-tools",
  },
]
