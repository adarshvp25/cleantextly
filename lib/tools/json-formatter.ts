export type JsonFormatterOptions = {
  indent?: number
}

export type JsonFormatterResult =
  | { isValid: true; output: string; error: null }
  | { isValid: false; output: string; error: string }

export function formatJson(
  input: string,
  options: JsonFormatterOptions = {}
): JsonFormatterResult {
  const { indent = 2 } = options

  if (input.trim() === "") {
    return { isValid: true, output: "", error: null }
  }

  try {
    const parsed = JSON.parse(input)
    return { isValid: true, output: JSON.stringify(parsed, null, indent), error: null }
  } catch (error) {
    return {
      isValid: false,
      output: "",
      error: error instanceof Error ? error.message : "Invalid JSON",
    }
  }
}
