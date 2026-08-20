export type HtmlOperation = "encode" | "decode"

export const OPERATION_OPTIONS: { value: HtmlOperation; label: string }[] = [
  { value: "encode", label: "Encode" },
  { value: "decode", label: "Decode" },
]

export type HtmlProcessResult = {
  output: string
  error?: string
}

// Matches an "&" that is NOT already the start of a valid-looking entity
// (named, decimal, or hex). Used so encoding "&amp;" doesn't turn it into
// "&amp;amp;" — only a bare "&" gets escaped, an "&" that already looks
// like part of an entity is left alone.
const BARE_AMPERSAND = /&(?![a-z][a-z0-9]*;|#[0-9]+;|#x[0-9a-f]+;)/gi

function encodeHtml(input: string): string {
  return input
    .replace(BARE_AMPERSAND, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

// Matches a full entity token: named (&copy;), decimal (&#169;), or hex
// (&#xA9;/&#XA9;). Requiring the trailing ";" avoids guessing at legacy
// semicolon-less entities, which keeps decoding predictable.
const ENTITY_TOKEN = /&(#x[0-9a-f]+|#[0-9]+|[a-z][a-z0-9]*);/gi

function decodeHtml(input: string): string {
  // A detached element used to decode named entities (&copy;, &nbsp;, ...)
  // via the browser's own, complete named-character-reference table
  // instead of a hand-maintained list. This is safe from any HTML/script
  // injection: the matched token can only contain letters, digits, "#",
  // and ";" (see ENTITY_TOKEN above), so it can never contain "<" or ">"
  // and therefore can never be parsed as a tag.
  const scratch = typeof document !== "undefined" ? document.createElement("span") : null

  return input.replace(ENTITY_TOKEN, (token, body: string) => {
    if (body[0] === "#") {
      const isHex = body[1] === "x" || body[1] === "X"
      const codePoint = isHex ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10)

      if (!Number.isFinite(codePoint) || codePoint < 0 || codePoint > 0x10ffff) {
        return token
      }

      try {
        return String.fromCodePoint(codePoint)
      } catch {
        return token
      }
    }

    if (!scratch) return token

    scratch.innerHTML = token
    return scratch.textContent ?? token
  })
}

// Never throws: any failure while encoding/decoding user input is caught
// so the UI always gets a result object, not an uncaught exception.
export function processHtml(input: string, operation: HtmlOperation): HtmlProcessResult {
  if (input === "") {
    return { output: "" }
  }

  try {
    return { output: operation === "encode" ? encodeHtml(input) : decodeHtml(input) }
  } catch {
    return { output: "", error: "This input couldn't be processed." }
  }
}
