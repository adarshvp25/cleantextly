import { analyzeText } from "@/lib/tools/word-counter"
import { countCharacters } from "@/lib/tools/text-metrics"

export type ReadingSpeedPreset = {
  label: string
  wpm: number
}

// Matches the "Slow / Average / Fast" framing readers already recognize,
// with Average kept at the same 200 WPM baseline used elsewhere on the
// site (Word Counter, Character Counter) so estimates stay consistent
// across tools.
export const READING_SPEED_PRESETS: ReadingSpeedPreset[] = [
  { label: "Slow", wpm: 150 },
  { label: "Average", wpm: 200 },
  { label: "Fast", wpm: 300 },
]

export const DEFAULT_READING_WPM = 200
export const DEFAULT_SPEAKING_WPM = 130

export const MIN_WPM = 1
export const MAX_WPM = 1000

export type ReadingTimeStats = {
  words: number
  characters: number
  sentences: number
  paragraphs: number
}

// Word, sentence, and paragraph counting is delegated entirely to the
// existing analyzeText() logic already shared by Word Counter, Character
// Counter, and Line Counter — this keeps every tool agreeing on what
// counts as a word, sentence, or paragraph instead of drifting apart.
export function analyzeReadingTime(input: string): ReadingTimeStats {
  const { words, sentences, paragraphs } = analyzeText(input)

  return {
    words,
    characters: countCharacters(input),
    sentences,
    paragraphs,
  }
}

// Rounded rather than truncated so a duration that's a fraction of a
// second short of a boundary (e.g. 59.6s) reads as "1 min" instead of
// "59 sec".
export function calculateDurationSeconds(words: number, wpm: number): number {
  if (words <= 0 || wpm <= 0) return 0
  return Math.round((words / wpm) * 60)
}

// Formats a duration in seconds into a short, human-readable string:
// seconds alone under a minute, minutes (+ seconds when non-zero) under an
// hour, and hours (+ minutes when non-zero) beyond that — so a long
// document never shows an unwieldy value like "127 min 45 sec" and a
// clean multiple of a minute never shows a redundant "5 min 0 sec".
export function formatDuration(totalSeconds: number): string {
  if (totalSeconds <= 0) return "0 sec"

  if (totalSeconds < 60) {
    return `${totalSeconds} sec`
  }

  if (totalSeconds < 3600) {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return seconds === 0 ? `${minutes} min` : `${minutes} min ${seconds} sec`
  }

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  return minutes === 0 ? `${hours} hr` : `${hours} hr ${minutes} min`
}

// Clamps and falls back to a default for empty/invalid custom WPM input,
// so a cleared or malformed field never produces a division by zero or an
// unreasonably large estimate.
export function normalizeWpm(rawValue: string, fallback: number): number {
  const parsed = Number(rawValue)
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback
  return Math.min(MAX_WPM, Math.max(MIN_WPM, parsed))
}
