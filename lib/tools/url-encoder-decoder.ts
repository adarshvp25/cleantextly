export type UrlOperation = "encode" | "decode"
export type UrlEncodingType = "uri" | "component"

export const OPERATION_OPTIONS: { value: UrlOperation; label: string }[] = [
  { value: "encode", label: "Encode" },
  { value: "decode", label: "Decode" },
]

export const ENCODING_TYPE_OPTIONS: { value: UrlEncodingType; label: string }[] = [
  { value: "component", label: "URI Component" },
  { value: "uri", label: "Full URI" },
]

export type UrlProcessResult = {
  output: string
  error?: string
}

// encodeURI/decodeURI leave URL-structure characters (: / ? # & = + and a
// few others) untouched so a whole URL stays valid, while
// encodeURIComponent/decodeURIComponent escape those same characters too,
// since a single query value or arbitrary piece of text shouldn't be
// interpreted as URL structure. Both directions are wrapped in try/catch:
// decoding a malformed percent-encoded sequence (e.g. a lone "%" or a cut
// off multi-byte Unicode escape) throws a URIError, and encoding can throw
// on an unpaired surrogate — neither should crash the page.
export function processUrl(
  input: string,
  operation: UrlOperation,
  encodingType: UrlEncodingType
): UrlProcessResult {
  try {
    if (operation === "encode") {
      return {
        output: encodingType === "uri" ? encodeURI(input) : encodeURIComponent(input),
      }
    }

    return {
      output: encodingType === "uri" ? decodeURI(input) : decodeURIComponent(input),
    }
  } catch {
    return {
      output: "",
      error:
        operation === "decode"
          ? "Invalid input: this isn't a validly percent-encoded string, so it can't be decoded."
          : "Invalid input: it contains a character that can't be encoded.",
    }
  }
}
