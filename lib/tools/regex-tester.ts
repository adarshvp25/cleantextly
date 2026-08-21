export type RegexFlag = "g" | "i" | "m" | "s" | "u"

export const FLAG_OPTIONS: { value: RegexFlag; label: string; description: string }[] = [
  { value: "g", label: "g", description: "Global — find all matches" },
  { value: "i", label: "i", description: "Case insensitive" },
  { value: "m", label: "m", description: "Multiline — ^ and $ match line starts/ends" },
  { value: "s", label: "s", description: "Dot All — . also matches newlines" },
  { value: "u", label: "u", description: "Unicode — treats the pattern as full Unicode" },
]

export type RegexPreset = {
  name: string
  pattern: string
  flags: RegexFlag[]
}

// Practical, commonly-useful patterns — not claimed to be a fully correct
// match for every edge case (e.g. the email pattern doesn't implement the
// full RFC 5322 grammar), just a reasonable starting point to test against.
export const REGEX_PRESETS: RegexPreset[] = [
  { name: "Email", pattern: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}", flags: ["g"] },
  { name: "URL", pattern: "https?:\\/\\/[^\\s]+", flags: ["g"] },
  { name: "IPv4 Address", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", flags: ["g"] },
  { name: "Phone Number", pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}", flags: ["g"] },
  { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}", flags: ["g"] },
  { name: "Time (HH:MM)", pattern: "\\d{1,2}:\\d{2}(:\\d{2})?", flags: ["g"] },
  {
    name: "UUID",
    pattern: "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
    flags: ["g", "i"],
  },
  { name: "Hex Color", pattern: "#[0-9a-fA-F]{3,6}\\b", flags: ["g"] },
  { name: "Username", pattern: "^[A-Za-z0-9_]{3,16}$", flags: [] },
  { name: "Numbers", pattern: "-?\\d+(\\.\\d+)?", flags: ["g"] },
  { name: "HTML Tags", pattern: "<[^>]+>", flags: ["g"] },
  { name: "Whitespace", pattern: "\\s+", flags: ["g"] },
]

export type RegexMatch = {
  text: string
  start: number
  end: number
  groups: (string | null)[]
  namedGroups: Record<string, string | null> | null
}

export type RegexProcessResult = {
  isValid: boolean
  error?: string
  matches: RegexMatch[]
  isGlobal: boolean
  truncated: boolean
}

// Collecting matches is bounded so a pattern like "" or "\d?" against a
// huge test string can't generate an unbounded number of matches — which
// would otherwise both loop for a long time and force React to render an
// enormous number of highlight spans.
const MAX_MATCHES = 1000

function toRegexMatch(match: RegExpExecArray): RegexMatch {
  const start = match.index
  const text = match[0]
  const groups = match.slice(1).map((group) => group ?? null)
  const namedGroups = match.groups
    ? Object.fromEntries(Object.entries(match.groups).map(([name, value]) => [name, value ?? null]))
    : null

  return { text, start, end: start + text.length, groups, namedGroups }
}

// Whether the code unit at `index` is the high surrogate of a surrogate
// pair, so a zero-length match can be stepped over one whole code point
// at a time instead of splitting it in half when the "u" flag is set.
function codePointWidth(text: string, index: number): number {
  const code = text.charCodeAt(index)
  if (code >= 0xd800 && code <= 0xdbff && index + 1 < text.length) {
    const next = text.charCodeAt(index + 1)
    if (next >= 0xdc00 && next <= 0xdfff) return 2
  }
  return 1
}

function formatSyntaxError(message: string): string {
  // V8's own message is "Invalid regular expression: /pattern/flags: reason"
  // — this keeps just the reason so the pattern/flags aren't shown twice.
  const parts = message.split(": ")
  const reason = parts.length > 1 ? parts[parts.length - 1] : message
  return `Invalid regular expression: ${reason}`
}

// Never throws: an invalid pattern is caught and reported in the result
// instead of escaping as an exception.
export function processRegex(
  pattern: string,
  testString: string,
  flags: RegexFlag[]
): RegexProcessResult {
  const flagString = [...new Set(flags)].join("")
  const isGlobal = flagString.includes("g")

  if (pattern === "") {
    return { isValid: true, matches: [], isGlobal, truncated: false }
  }

  let regex: RegExp
  try {
    regex = new RegExp(pattern, flagString)
  } catch (error) {
    return {
      isValid: false,
      error: formatSyntaxError(error instanceof Error ? error.message : "Invalid pattern"),
      matches: [],
      isGlobal,
      truncated: false,
    }
  }

  if (testString === "") {
    return { isValid: true, matches: [], isGlobal, truncated: false }
  }

  const matches: RegexMatch[] = []
  let truncated = false

  if (isGlobal) {
    let match: RegExpExecArray | null
    while ((match = regex.exec(testString)) !== null) {
      matches.push(toRegexMatch(match))

      if (matches.length >= MAX_MATCHES) {
        truncated = regex.lastIndex < testString.length
        break
      }

      // A zero-length match (e.g. from "^" or "a*") leaves lastIndex
      // unchanged, which would make exec() return the same match forever.
      // Manually stepping forward by one code point breaks that loop.
      if (match[0] === "") {
        regex.lastIndex += flagString.includes("u") ? codePointWidth(testString, regex.lastIndex) : 1
      }
    }
  } else {
    const match = regex.exec(testString)
    if (match) matches.push(toRegexMatch(match))
  }

  return { isValid: true, matches, isGlobal, truncated }
}
