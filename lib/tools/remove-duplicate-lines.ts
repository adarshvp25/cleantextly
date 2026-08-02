export type RemoveDuplicateLinesOptions = {
  ignoreEmptyLines?: boolean
  trimWhitespace?: boolean
}

export type RemoveDuplicateLinesResult = {
  output: string
  inputLines: number
  outputLines: number
  duplicatesRemoved: number
}

export function removeDuplicateLines(
  input: string,
  options: RemoveDuplicateLinesOptions = {}
): RemoveDuplicateLinesResult {
  const { ignoreEmptyLines = false, trimWhitespace = false } = options

  if (input === "") {
    return { output: "", inputLines: 0, outputLines: 0, duplicatesRemoved: 0 }
  }

  const rawLines = input.split(/\r\n|\r|\n/)
  const seen = new Set<string>()
  const result: string[] = []
  let duplicatesRemoved = 0

  for (const rawLine of rawLines) {
    const line = trimWhitespace ? rawLine.trim() : rawLine

    if (ignoreEmptyLines && line.trim() === "") {
      continue
    }

    if (seen.has(line)) {
      duplicatesRemoved++
      continue
    }

    seen.add(line)
    result.push(line)
  }

  return {
    output: result.join("\n"),
    inputLines: rawLines.length,
    outputLines: result.length,
    duplicatesRemoved,
  }
}
