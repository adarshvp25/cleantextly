export type CaseType =
  | "uppercase"
  | "lowercase"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"

export const CASE_TYPE_OPTIONS: { value: CaseType; label: string }[] = [
  { value: "uppercase", label: "UPPERCASE" },
  { value: "lowercase", label: "lowercase" },
  { value: "title", label: "Title Case" },
  { value: "sentence", label: "Sentence case" },
  { value: "camel", label: "camelCase" },
  { value: "pascal", label: "PascalCase" },
  { value: "snake", label: "snake_case" },
  { value: "kebab", label: "kebab-case" },
]

function capitalize(word: string): string {
  if (word === "") return word
  return word.charAt(0).toUpperCase() + word.slice(1)
}

// Insert a space at a lower/digit -> Upper boundary, but only when that
// uppercase letter clearly starts a new capitalized word (i.e. it is
// followed by a lowercase letter, as in "removeDuplicateLines"). This
// deliberately does not try to detect acronym runs (e.g. "HTTPServer"
// -> "HTTP Server") — that heuristic also fires on inconsistent casing
// like "hELLo", misreading it as several words instead of one.
function insertCamelCaseBoundaries(text: string): string {
  return text.replace(/([a-z0-9])([A-Z])(?=[a-z])/g, "$1 $2")
}

function toTitleCase(input: string): string {
  // Expand identifier-style input (camelCase/PascalCase/snake_case/
  // kebab-case) into separate words before capitalizing, so e.g.
  // "removeDuplicateLines" title-cases to "Remove Duplicate Lines".
  const normalized = insertCamelCaseBoundaries(input).replace(/[_-]/g, " ")
  return normalized.toLowerCase().replace(/[a-z0-9]+/g, (word) => capitalize(word))
}

function toSentenceCase(input: string): string {
  return input
    .toLowerCase()
    .replace(/(^\s*[a-z])|([.!?]\s+[a-z])|(\n\s*[a-z])/g, (match) => match.toUpperCase())
}

function splitWords(line: string): string[] {
  return insertCamelCaseBoundaries(line)
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
}

function toCamelCaseLine(line: string): string {
  return splitWords(line)
    .map((word, index) => (index === 0 ? word.toLowerCase() : capitalize(word.toLowerCase())))
    .join("")
}

function toPascalCaseLine(line: string): string {
  return splitWords(line)
    .map((word) => capitalize(word.toLowerCase()))
    .join("")
}

function toSnakeCaseLine(line: string): string {
  return splitWords(line)
    .map((word) => word.toLowerCase())
    .join("_")
}

function toKebabCaseLine(line: string): string {
  return splitWords(line)
    .map((word) => word.toLowerCase())
    .join("-")
}

function applyPerLine(input: string, fn: (line: string) => string): string {
  return input.split(/\r\n|\r|\n/).map(fn).join("\n")
}

export function convertCase(input: string, type: CaseType): string {
  switch (type) {
    case "uppercase":
      return input.toUpperCase()
    case "lowercase":
      return input.toLowerCase()
    case "title":
      return toTitleCase(input)
    case "sentence":
      return toSentenceCase(input)
    case "camel":
      return applyPerLine(input, toCamelCaseLine)
    case "pascal":
      return applyPerLine(input, toPascalCaseLine)
    case "snake":
      return applyPerLine(input, toSnakeCaseLine)
    case "kebab":
      return applyPerLine(input, toKebabCaseLine)
  }
}
