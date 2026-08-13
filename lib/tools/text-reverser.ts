import { analyzeText } from "@/lib/tools/word-counter"
import { countCharacters, toCharacters } from "@/lib/tools/text-metrics"

export type ReversalMode = "text" | "words" | "each-word" | "lines"

export const REVERSAL_MODE_OPTIONS: { value: ReversalMode; label: string }[] = [
  { value: "text", label: "Reverse Text" },
  { value: "words", label: "Reverse Words" },
  { value: "each-word", label: "Reverse Each Word" },
  { value: "lines", label: "Reverse Lines" },
]

export type ReverseTextResult = {
  output: string
  inputCharacters: number
  outputCharacters: number
  inputWords: number
  outputWords: number
}

// Same code-point splitting as toCharacters(), except a CRLF pair is kept
// together as one atomic unit instead of two separate entries. Without
// this, reversing the array would flip "\r\n" into "\n\r" — a different,
// non-standard line ending that renders in a <textarea> as an extra blank
// line. A lone "\r" or "\n" is already a single code point, so it's
// unaffected and needs no special handling.
function toReversalUnits(input: string): string[] {
  const codePoints = toCharacters(input)
  const units: string[] = []

  for (let i = 0; i < codePoints.length; i++) {
    if (codePoints[i] === "\r" && codePoints[i + 1] === "\n") {
      units.push("\r\n")
      i++
    } else {
      units.push(codePoints[i])
    }
  }

  return units
}

// Reverses by Unicode code point (via toReversalUnits, built on the shared
// toCharacters splitter), not UTF-16 code unit, so a surrogate-pair emoji
// stays intact as one character instead of having its two halves swapped —
// and a CRLF line ending stays intact as "\r\n" instead of becoming "\n\r".
function reverseCharacters(text: string): string {
  return toReversalUnits(text).reverse().join("")
}

function reverseWordsInLine(line: string): string {
  const words = line.split(/\s+/).filter((word) => word !== "")
  return words.reverse().join(" ")
}

// Only the non-whitespace runs are replaced in place, so every space, tab,
// and line ending stays exactly where it was — this is the one mode that
// preserves the input's original whitespace byte-for-byte.
function reverseEachWord(input: string): string {
  return input.replace(/\S+/g, (word) => reverseCharacters(word))
}

function reverseLines(input: string): string {
  return input.split(/\r\n|\r|\n/).reverse().join("\n")
}

// Operates per line so paragraph/line structure survives — reversing word
// order across an entire multi-line document (treating line breaks as just
// another separator) would scramble that structure, which is what the
// separate Reverse Lines mode is for. Runs of whitespace between words are
// normalized to a single space, since there's no single correct way to
// redistribute irregular spacing once the words around it have swapped
// places.
function reverseWords(input: string): string {
  return input.split(/\r\n|\r|\n/).map(reverseWordsInLine).join("\n")
}

export function reverseText(input: string, mode: ReversalMode): ReverseTextResult {
  let output: string

  if (input === "") {
    output = ""
  } else {
    switch (mode) {
      case "text":
        output = reverseCharacters(input)
        break
      case "words":
        output = reverseWords(input)
        break
      case "each-word":
        output = reverseEachWord(input)
        break
      case "lines":
        output = reverseLines(input)
        break
    }
  }

  return {
    output,
    inputCharacters: countCharacters(input),
    outputCharacters: countCharacters(output),
    inputWords: analyzeText(input).words,
    outputWords: analyzeText(output).words,
  }
}
