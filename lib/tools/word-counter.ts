export type WordCountStats = {
  words: number
  characters: number
  charactersNoSpaces: number
  lines: number
  paragraphs: number
  sentences: number
  readingTimeMinutes: number
}

function countWords(input: string): number {
  const trimmed = input.trim()
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length
}

function countLines(input: string): number {
  return input === "" ? 0 : input.split(/\r\n|\r|\n/).length
}

// A new paragraph starts at the first non-blank line after zero or more
// blank lines, so runs of consecutive blank lines (one or more) act as a
// single separator and leading/trailing blank lines never count.
function countParagraphs(input: string): number {
  if (input.trim() === "") return 0

  let count = 0
  let inParagraph = false

  for (const line of input.split(/\r\n|\r|\n/)) {
    const isBlank = line.trim() === ""
    if (isBlank) {
      inParagraph = false
    } else if (!inParagraph) {
      count++
      inParagraph = true
    }
  }

  return count
}

// A run of one or more terminal punctuation characters (. ! ?) counts as
// a single sentence ending, so "..." or "!!!" isn't over-counted.
function countSentences(input: string): number {
  const matches = input.match(/[.!?]+/g)
  return matches ? matches.length : 0
}

export function analyzeText(input: string): WordCountStats {
  const words = countWords(input)

  return {
    words,
    characters: input.length,
    charactersNoSpaces: input.replace(/\s/g, "").length,
    lines: countLines(input),
    paragraphs: countParagraphs(input),
    sentences: countSentences(input),
    readingTimeMinutes: Math.ceil(words / 200),
  }
}
