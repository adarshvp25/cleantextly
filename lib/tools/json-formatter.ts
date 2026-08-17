export type JsonMode = "format" | "validate" | "minify"

export const JSON_MODE_OPTIONS: { value: JsonMode; label: string }[] = [
  { value: "format", label: "Format" },
  { value: "validate", label: "Validate" },
  { value: "minify", label: "Minify" },
]

const FORMAT_INDENT = 2

export type JsonProcessResult = {
  output: string
  isValid: boolean
  error?: string
}

// JSON.parse's own SyntaxError message usually already includes
// "at position N" and, in current browser engines, a "(line L column C)"
// suffix. Older engines only give the raw position, so this fills in
// line/column from it when it's missing, and leaves the message alone
// when there's no position to work from (e.g. "Unexpected token 'u' ...")
// rather than guessing.
function withLocation(input: string, message: string): string {
  if (/line \d+ column \d+/i.test(message)) {
    return message
  }

  const match = message.match(/position (\d+)/i)
  if (!match) {
    return message
  }

  const position = Number(match[1])
  const before = input.slice(0, position)
  const line = before.split("\n").length
  const column = position - before.lastIndexOf("\n")

  return `${message} (line ${line}, column ${column})`
}

// Never throws: JSON.parse's SyntaxError is caught here so malformed user
// input always produces a result object, not an uncaught exception.
export function processJson(input: string, mode: JsonMode): JsonProcessResult {
  if (input.trim() === "") {
    return { output: "", isValid: true }
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(input)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid JSON"
    return {
      output: "",
      isValid: false,
      error: `Invalid JSON: ${withLocation(input, message)}`,
    }
  }

  const output =
    mode === "minify" ? JSON.stringify(parsed) : JSON.stringify(parsed, null, FORMAT_INDENT)

  return { output, isValid: true }
}
