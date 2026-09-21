// Latin letters that Unicode decomposition (NFKD) does not split into a
// base letter plus a combining mark, mapped to their conventional ASCII
// spelling. Keys are lowercase because input is lowercased first.
const LATIN_TRANSLITERATIONS: Record<string, string> = {
  ß: "ss",
  æ: "ae",
  œ: "oe",
  ø: "o",
  đ: "d",
  ð: "d",
  ł: "l",
  þ: "th",
  ı: "i",
}

const TRANSLITERATION_PATTERN = new RegExp(
  `[${Object.keys(LATIN_TRANSLITERATIONS).join("")}]`,
  "g",
)

// Combining marks are only stripped when they follow a Latin letter
// ("é" → "e"). Marks attached to other scripts (Devanagari vowel signs,
// Arabic diacritics, Hangul, …) are part of the letter itself, so removing
// them would corrupt the text.
const LATIN_LETTER_WITH_MARKS = /(\p{Script=Latin})\p{M}+/gu

// Apostrophes are removed without leaving a gap so "don't" becomes "dont"
// rather than "don-t".
const APOSTROPHES = /['’‘`´]/g

// Anything that is not a letter, a decimal digit, or a combining mark is a
// word separator. This covers whitespace, punctuation, symbols, underscores,
// existing hyphens, and emoji.
const SEPARATORS = /[^\p{L}\p{Nd}\p{M}]+/gu

function slugifyLine(line: string): string {
  return line
    .toLowerCase()
    .normalize("NFKD")
    .replace(LATIN_LETTER_WITH_MARKS, "$1")
    .replace(TRANSLITERATION_PATTERN, (char) => LATIN_TRANSLITERATIONS[char])
    .replace(APOSTROPHES, "")
    .replace(SEPARATORS, "-")
    .normalize("NFC")
    .replace(/^-+|-+$/g, "")
}

export type SlugResult = {
  output: string
  lineCount: number
  // Non-empty input lines that produced no slug (for example lines made
  // only of punctuation or emoji).
  emptyLineCount: number
}

// Converts each line of `input` to a URL slug: lowercase, accents removed
// from Latin letters, every run of non-letter/non-digit characters
// collapsed into a single hyphen, and no leading or trailing hyphen.
// Letters from other scripts are kept as-is (never transliterated) so
// non-Latin text does not silently turn into an empty slug. Lines map
// one-to-one: line N of the output is the slug of line N of the input, and
// blank lines stay blank.
export function generateSlugs(input: string): SlugResult {
  if (input.trim() === "") {
    return { output: "", lineCount: 0, emptyLineCount: 0 }
  }

  const lines = input.replace(/\r\n?/g, "\n").replace(/\n+$/, "").split("\n")
  let emptyLineCount = 0

  const slugs = lines.map((line) => {
    const slug = slugifyLine(line)
    if (slug === "" && line.trim() !== "") {
      emptyLineCount += 1
    }
    return slug
  })

  return {
    output: slugs.join("\n"),
    lineCount: lines.filter((line) => line.trim() !== "").length,
    emptyLineCount,
  }
}
