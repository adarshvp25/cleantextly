import { analyzeText } from "@/lib/tools/word-counter"
import { countCharacters } from "@/lib/tools/text-metrics"

export type RemoveExtraSpacesResult = {
  output: string
  inputCharacters: number
  outputCharacters: number
  inputWords: number
  outputWords: number
  spacesRemoved: number
}

// Only ASCII space and tab are treated as collapsible horizontal
// whitespace — other Unicode whitespace (non-breaking space, etc.) is left
// untouched since it can carry formatting intent. Line-ending characters
// are never part of this pattern, since lines are processed individually.
function cleanLine(line: string): string {
  return line
    .replace(/^[ \t]+/, "")
    .replace(/[ \t]+$/, "")
    .replace(/[ \t]+/g, " ")
}

function countSpacesAndTabs(input: string): number {
  const matches = input.match(/[ \t]/g)
  return matches ? matches.length : 0
}

// Collapses runs of spaces/tabs within each line into a single space and
// trims each line's leading/trailing space/tab. Line breaks themselves are
// never touched, so blank lines and paragraph structure are preserved
// exactly — "Hello\n\nWorld" stays two paragraphs, not one flattened line.
export function removeExtraSpaces(input: string): RemoveExtraSpacesResult {
  if (input === "") {
    return {
      output: "",
      inputCharacters: 0,
      outputCharacters: 0,
      inputWords: 0,
      outputWords: 0,
      spacesRemoved: 0,
    }
  }

  const output = input.split(/\r\n|\r|\n/).map(cleanLine).join("\n")

  return {
    output,
    inputCharacters: countCharacters(input),
    outputCharacters: countCharacters(output),
    inputWords: analyzeText(input).words,
    outputWords: analyzeText(output).words,
    spacesRemoved: countSpacesAndTabs(input) - countSpacesAndTabs(output),
  }
}
