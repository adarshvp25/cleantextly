import { analyzeText } from "@/lib/tools/word-counter"
import { countCharacters } from "@/lib/tools/text-metrics"

export type FindReplaceOptions = {
  matchCase?: boolean
  wholeWord?: boolean
}

export type FindReplaceResult = {
  output: string
  occurrencesFound: number
  occurrencesReplaced: number
  inputCharacters: number
  outputCharacters: number
  inputWords: number
  outputWords: number
  inputLines: number
  outputLines: number
}

// Escapes regex-special characters so `findText` always matches as a literal
// string. This is the one place regex mode would plug in later — skipping
// this escape step for a "use regex" option would let `findText` be used as
// a pattern directly, with the rest of the pipeline unchanged.
function escapeForLiteralMatch(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function buildFindPattern(findText: string, options: FindReplaceOptions): RegExp | null {
  if (findText === "") {
    return null
  }

  let pattern = escapeForLiteralMatch(findText)

  if (options.wholeWord) {
    // \b is ASCII-only and misses accented letters, Arabic, etc., so word
    // boundaries are built from Unicode letter/number/underscore lookaround
    // instead of relying on \b.
    pattern = `(?<![\\p{L}\\p{N}_])${pattern}(?![\\p{L}\\p{N}_])`
  }

  const flags = options.matchCase ? "gu" : "giu"
  return new RegExp(pattern, flags)
}

// Never mutates `input` — strings are immutable in JS, and this always
// returns a new string for `output`.
export function findAndReplace(
  input: string,
  findText: string,
  replaceText: string,
  options: FindReplaceOptions = {}
): FindReplaceResult {
  const pattern = buildFindPattern(findText, options)

  let output = input
  let occurrences = 0

  if (pattern) {
    output = input.replace(pattern, () => {
      occurrences++
      return replaceText
    })
  }

  return {
    output,
    occurrencesFound: occurrences,
    occurrencesReplaced: occurrences,
    inputCharacters: countCharacters(input),
    outputCharacters: countCharacters(output),
    inputWords: analyzeText(input).words,
    outputWords: analyzeText(output).words,
    inputLines: analyzeText(input).lines,
    outputLines: analyzeText(output).lines,
  }
}
