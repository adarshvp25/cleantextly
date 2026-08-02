export type SortMode = "alpha-asc" | "alpha-desc" | "numeric-asc" | "numeric-desc"

export type TextSorterOptions = {
  mode: SortMode
  trimWhitespace?: boolean
  removeEmptyLines?: boolean
  caseSensitive?: boolean
}

export const SORT_MODE_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "alpha-asc", label: "Alphabetical (A → Z)" },
  { value: "alpha-desc", label: "Reverse Alphabetical (Z → A)" },
  { value: "numeric-asc", label: "Numeric (Ascending)" },
  { value: "numeric-desc", label: "Numeric (Descending)" },
]

function compareStrings(a: string, b: string, caseSensitive: boolean): number {
  const left = caseSensitive ? a : a.toLowerCase()
  const right = caseSensitive ? b : b.toLowerCase()
  if (left < right) return -1
  if (left > right) return 1
  return 0
}

export function sortText(input: string, options: TextSorterOptions): string {
  const {
    mode,
    trimWhitespace = false,
    removeEmptyLines = false,
    caseSensitive = false,
  } = options

  if (input === "") {
    return ""
  }

  const lines = input
    .split(/\r\n|\r|\n/)
    .filter((line) => !removeEmptyLines || line.trim() !== "")
    .map((line) => (trimWhitespace ? line.trim() : line))

  let sorted: string[]

  if (mode === "alpha-asc" || mode === "alpha-desc") {
    const direction = mode === "alpha-asc" ? 1 : -1
    sorted = [...lines].sort((a, b) => direction * compareStrings(a, b, caseSensitive))
  } else {
    const direction = mode === "numeric-asc" ? 1 : -1
    const numeric: { value: string; num: number }[] = []
    const nonNumeric: string[] = []

    for (const line of lines) {
      const num = line.trim() === "" ? NaN : Number(line)
      if (Number.isNaN(num)) {
        nonNumeric.push(line)
      } else {
        numeric.push({ value: line, num })
      }
    }

    numeric.sort((a, b) => direction * (a.num - b.num))
    sorted = [...numeric.map((entry) => entry.value), ...nonNumeric]
  }

  return sorted.join("\n")
}
