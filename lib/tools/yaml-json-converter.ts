import { parse as parseYaml, stringify as stringifyYaml, YAMLParseError } from "yaml"

export type ConversionDirection = "yaml-to-json" | "json-to-yaml"

export const DIRECTION_OPTIONS: { value: ConversionDirection; label: string }[] = [
  { value: "yaml-to-json", label: "YAML → JSON" },
  { value: "json-to-yaml", label: "JSON → YAML" },
]

export type ConversionResult = {
  output: string
  error: string | null
}

// yaml's YAMLParseError messages include a multi-line source snippet with
// a "^" pointer underneath — useful in a terminal, but too much for a
// single-line UI error. Only the first line (which already names the
// problem and its line/column) is surfaced.
function firstLine(message: string): string {
  return message.split("\n")[0]
}

export function convertYamlToJson(input: string): ConversionResult {
  if (input.trim() === "") {
    return { output: "", error: null }
  }

  let parsed: unknown
  try {
    parsed = parseYaml(input)
  } catch (error) {
    return {
      output: "",
      error:
        error instanceof YAMLParseError
          ? `Invalid YAML: ${firstLine(error.message)}`
          : "Invalid YAML: the input couldn't be parsed.",
    }
  }

  if (parsed === undefined) {
    return { output: "", error: null }
  }

  return { output: JSON.stringify(parsed, null, 2), error: null }
}

export function convertJsonToYaml(input: string): ConversionResult {
  if (input.trim() === "") {
    return { output: "", error: null }
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(input)
  } catch (error) {
    return {
      output: "",
      error:
        error instanceof Error
          ? `Invalid JSON: ${error.message}`
          : "Invalid JSON: the input couldn't be parsed.",
    }
  }

  try {
    return { output: stringifyYaml(parsed, { indent: 2 }), error: null }
  } catch {
    return { output: "", error: "This JSON couldn't be converted to YAML." }
  }
}

export function convert(input: string, direction: ConversionDirection): ConversionResult {
  return direction === "yaml-to-json" ? convertYamlToJson(input) : convertJsonToYaml(input)
}
