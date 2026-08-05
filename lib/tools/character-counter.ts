import { analyzeText } from "@/lib/tools/word-counter"

export type CharacterCountStats = {
  charactersWithSpaces: number
  charactersWithoutSpaces: number
  letters: number
  numbers: number
  whitespace: number
  words: number
  sentences: number
  paragraphs: number
  lines: number
  readingTimeMinutes: number
  speakingTimeMinutes: number
  pages: number
}

const WORDS_PER_PAGE = 250
const SPEAKING_WORDS_PER_MINUTE = 130

// Split by Unicode code point rather than UTF-16 code unit, so multi-unit
// characters — most emoji, astral-plane symbols — count as one character
// each instead of two.
function toCharacters(input: string): string[] {
  return Array.from(input)
}

// \p{L} matches a Unicode letter in any script, so accented Latin letters
// and RTL scripts (Arabic, Hebrew, etc.) are counted correctly.
function countLetters(input: string): number {
  const matches = input.match(/\p{L}/gu)
  return matches ? matches.length : 0
}

// \p{Nd} matches a Unicode decimal digit in any script.
function countNumbers(input: string): number {
  const matches = input.match(/\p{Nd}/gu)
  return matches ? matches.length : 0
}

export function analyzeCharacters(input: string): CharacterCountStats {
  const base = analyzeText(input)
  const characters = toCharacters(input)
  const charactersWithSpaces = characters.length
  const charactersWithoutSpaces = characters.filter((char) => !/\s/.test(char)).length

  return {
    charactersWithSpaces,
    charactersWithoutSpaces,
    letters: countLetters(input),
    numbers: countNumbers(input),
    whitespace: charactersWithSpaces - charactersWithoutSpaces,
    words: base.words,
    sentences: base.sentences,
    paragraphs: base.paragraphs,
    lines: base.lines,
    readingTimeMinutes: base.readingTimeMinutes,
    speakingTimeMinutes: Math.ceil(base.words / SPEAKING_WORDS_PER_MINUTE),
    pages: Math.round((base.words / WORDS_PER_PAGE) * 10) / 10,
  }
}
