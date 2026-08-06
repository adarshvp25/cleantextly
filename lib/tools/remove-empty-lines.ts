import { analyzeText } from "@/lib/tools/word-counter"
import { countCharacters } from "@/lib/tools/text-metrics"

export type RemoveEmptyLinesResult = {
  output: string
  inputLines: number
  outputLines: number
  emptyLinesRemoved: number
  characters: number
  words: number
}

// A line counts as empty if it contains nothing, or nothing but spaces/tabs.
// Non-empty lines are kept exactly as written — only whitespace-only or
// fully blank lines are dropped, and remaining lines keep their order.
export function removeEmptyLines(input: string): RemoveEmptyLinesResult {
  if (input === "") {
    return {
      output: "",
      inputLines: 0,
      outputLines: 0,
      emptyLinesRemoved: 0,
      characters: 0,
      words: 0,
    }
  }

  const rawLines = input.split(/\r\n|\r|\n/)
  const outputLines = rawLines.filter((line) => line.trim() !== "")
  const output = outputLines.join("\n")

  return {
    output,
    inputLines: rawLines.length,
    outputLines: outputLines.length,
    emptyLinesRemoved: rawLines.length - outputLines.length,
    characters: countCharacters(output),
    words: analyzeText(output).words,
  }
}
