export type Base64Operation = "encode" | "decode"

export const OPERATION_OPTIONS: { value: Base64Operation; label: string }[] = [
  { value: "encode", label: "Encode" },
  { value: "decode", label: "Decode" },
]

export type Base64ProcessResult = {
  output: string
  error?: string
}

// atob()/btoa() operate on UTF-16 code units, not UTF-8 bytes, so they throw
// (or silently mangle) on any character outside Latin1 — emoji, CJK,
// Cyrillic, even accented letters. Converting through TextEncoder/
// TextDecoder first means the Base64 output represents the actual UTF-8
// byte sequence, so any Unicode text round-trips correctly.
function encodeBase64(input: string): string {
  const bytes = new TextEncoder().encode(input)
  let binary = ""
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }
  return btoa(binary)
}

function decodeBase64(input: string): string {
  // Base64 is often wrapped across lines (e.g. copied from email/MIME
  // output), so whitespace is stripped before decoding rather than
  // treated as invalid input.
  const cleaned = input.replace(/\s+/g, "")
  const binary = atob(cleaned)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  // `fatal: true` rejects byte sequences that aren't valid UTF-8 instead of
  // silently replacing them with the U+FFFD replacement character — a
  // valid-looking Base64 string that doesn't decode to real text should
  // surface as an error, not garbage output.
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes)
}

export function processBase64(input: string, operation: Base64Operation): Base64ProcessResult {
  if (input === "") {
    return { output: "" }
  }

  try {
    return { output: operation === "encode" ? encodeBase64(input) : decodeBase64(input) }
  } catch {
    return {
      output: "",
      error:
        operation === "decode"
          ? "Invalid input: this isn't a valid Base64 string, so it can't be decoded."
          : "Invalid input: it contains a character that can't be encoded.",
    }
  }
}
