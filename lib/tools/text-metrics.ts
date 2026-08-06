// Split by Unicode code point rather than UTF-16 code unit, so multi-unit
// characters — most emoji, astral-plane symbols — are treated as one
// character each instead of two. Shared by any tool that needs an accurate
// character count.
export function toCharacters(input: string): string[] {
  return Array.from(input)
}

export function countCharacters(input: string): number {
  return toCharacters(input).length
}
