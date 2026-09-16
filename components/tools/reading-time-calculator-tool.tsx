"use client"

import { useMemo, useState } from "react"

import {
  READING_SPEED_PRESETS,
  DEFAULT_READING_WPM,
  DEFAULT_SPEAKING_WPM,
  MIN_WPM,
  MAX_WPM,
  analyzeReadingTime,
  calculateDurationSeconds,
  formatDuration,
  normalizeWpm,
} from "@/lib/tools/reading-time-calculator"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { CopyButton } from "@/components/tools/copy-button"
import { PasteButton } from "@/components/tools/paste-button"
import { ToolStats } from "@/components/tools/tool-stats"

export function ReadingTimeCalculatorTool() {
  const [input, setInput] = useState("")
  const [wpmInput, setWpmInput] = useState(String(DEFAULT_READING_WPM))
  const [speakingWpmInput, setSpeakingWpmInput] = useState(String(DEFAULT_SPEAKING_WPM))

  const stats = useMemo(() => analyzeReadingTime(input), [input])
  const wpm = useMemo(() => normalizeWpm(wpmInput, DEFAULT_READING_WPM), [wpmInput])
  const speakingWpm = useMemo(
    () => normalizeWpm(speakingWpmInput, DEFAULT_SPEAKING_WPM),
    [speakingWpmInput]
  )

  const readingSeconds = calculateDurationSeconds(stats.words, wpm)
  const speakingSeconds = calculateDurationSeconds(stats.words, speakingWpm)

  function handleClear() {
    setInput("")
  }

  const statItems = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.characters },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="reading-time-input" className="text-sm font-medium text-foreground">
          Input
        </label>
        <Textarea
          id="reading-time-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Paste or type your text here..."
          className="min-h-[320px] font-mono text-sm"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-foreground">Reading Speed</label>
        <div className="flex flex-wrap items-center gap-2">
          {READING_SPEED_PRESETS.map((preset) => (
            <Button
              key={preset.label}
              type="button"
              variant={wpm === preset.wpm ? "default" : "outline"}
              size="sm"
              onClick={() => setWpmInput(String(preset.wpm))}
            >
              {preset.label} ({preset.wpm} WPM)
            </Button>
          ))}

          <div className="flex items-center gap-2">
            <Input
              type="number"
              inputMode="numeric"
              min={MIN_WPM}
              max={MAX_WPM}
              value={wpmInput}
              onChange={(event) => setWpmInput(event.target.value)}
              onBlur={() => setWpmInput(String(wpm))}
              className="w-24"
              aria-label="Custom reading speed in words per minute"
            />
            <span className="text-sm text-muted-foreground">WPM</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">Estimated Reading Time</p>
        <p className="mt-2 text-4xl font-bold text-card-foreground">
          {formatDuration(readingSeconds)}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Based on {wpm} words per minute
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Estimated Speaking Time</p>
          <p className="text-2xl font-semibold text-card-foreground">
            {formatDuration(speakingSeconds)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            inputMode="numeric"
            min={MIN_WPM}
            max={MAX_WPM}
            value={speakingWpmInput}
            onChange={(event) => setSpeakingWpmInput(event.target.value)}
            onBlur={() => setSpeakingWpmInput(String(speakingWpm))}
            className="w-24"
            aria-label="Speaking speed in words per minute"
          />
          <span className="text-sm text-muted-foreground">WPM</span>
        </div>
      </div>

      <ToolStats stats={statItems} />

      <div className="flex flex-wrap gap-3">
        <CopyButton value={input} disabled={!input} />
        <PasteButton onPaste={setInput} />
        <Button type="button" variant="ghost" onClick={handleClear} disabled={!input}>
          Clear
        </Button>
      </div>
    </div>
  )
}
