import { analyzeText } from "@/lib/tools/word-counter"
import { countCharacters } from "@/lib/tools/text-metrics"

export type RemoveLineBreaksResult = {
  output: string
  inputCharacters: number
  outputCharacters: number
  inputWords: number
  outputWords: number
  lineBreaksRemoved: number
}

// Each line-break sequence (CRLF, CR, or LF) counts as exactly one, so a
// Windows CRLF is never double-counted as two.
function countLineBreaks(input: string): number {
  const matches = input.match(/\r\n|\r|\n/g)
  return matches ? matches.length : 0
}

// Only strips horizontal whitespace that was directly touching a line break
// that's being removed — a line's outer edge (the very start of the first
// line, the very end of the last line) is never touched, since there's no
// break there to justify it. That's what keeps this tool from creeping into
// Remove Extra Spaces' job.
function trimAdjacentToBreak(line: string, hasBreakBefore: boolean, hasBreakAfter: boolean): string {
  let result = line
  if (hasBreakBefore) {
    result = result.replace(/^[ \t]+/, "")
  }
  if (hasBreakAfter) {
    result = result.replace(/[ \t]+$/, "")
  }
  return result
}

// Splits on every line break (LF, CRLF, or CR, in any mix), trims only the
// whitespace that was touching a removed break, drops lines left empty by
// consecutive breaks (so "Hello\n\nWorld" collapses to one space, not two),
// then joins what remains with a single space. Spaces/tabs that were never
// adjacent to a break are left completely untouched.
export function removeLineBreaks(input: string): RemoveLineBreaksResult {
  if (input === "") {
    return {
      output: "",
      inputCharacters: 0,
      outputCharacters: 0,
      inputWords: 0,
      outputWords: 0,
      lineBreaksRemoved: 0,
    }
  }

  const lines = input.split(/\r\n|\r|\n/)
  const output = lines
    .map((line, index) => trimAdjacentToBreak(line, index > 0, index < lines.length - 1))
    .filter((line) => line !== "")
    .join(" ")

  return {
    output,
    inputCharacters: countCharacters(input),
    outputCharacters: countCharacters(output),
    inputWords: analyzeText(input).words,
    outputWords: analyzeText(output).words,
    lineBreaksRemoved: countLineBreaks(input),
  }
}
