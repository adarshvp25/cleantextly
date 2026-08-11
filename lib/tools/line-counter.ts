import { analyzeText } from "@/lib/tools/word-counter"
import { countCharacters } from "@/lib/tools/text-metrics"

export type LineCounterResult = {
  lines: number
  characters: number
  words: number
}

// Line counting is delegated entirely to the existing analyzeText() line
// logic (already shared by Word Counter, Character Counter, Remove Empty
// Lines, Remove Extra Spaces, and Remove Line Breaks) — this is the single
// source of truth for "how many lines does this text have" across the
// whole project, so it isn't reimplemented here.
export function countLinesInText(input: string): LineCounterResult {
  const { lines, words } = analyzeText(input)

  return {
    lines,
    characters: countCharacters(input),
    words,
  }
}
