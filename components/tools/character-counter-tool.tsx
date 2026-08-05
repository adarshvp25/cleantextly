"use client"

import { useMemo, useState } from "react"

import { analyzeCharacters } from "@/lib/tools/character-counter"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from "@/components/tools/copy-button"
import { PasteButton } from "@/components/tools/paste-button"
import { DownloadButton } from "@/components/tools/download-button"
import { ToolStats } from "@/components/tools/tool-stats"

export function CharacterCounterTool() {
  const [input, setInput] = useState("")

  const stats = useMemo(() => analyzeCharacters(input), [input])

  function handleClear() {
    setInput("")
  }

  const statItems = [
    { label: "Characters (With Spaces)", value: stats.charactersWithSpaces },
    { label: "Characters (No Spaces)", value: stats.charactersWithoutSpaces },
    { label: "Letters", value: stats.letters },
    { label: "Numbers", value: stats.numbers },
    { label: "Whitespace", value: stats.whitespace },
    { label: "Words", value: stats.words },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Lines", value: stats.lines },
    { label: "Reading Time", value: `${stats.readingTimeMinutes} min` },
    { label: "Speaking Time", value: `${stats.speakingTimeMinutes} min` },
    { label: "Estimated Pages", value: stats.pages },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="character-counter-input" className="text-sm font-medium text-foreground">
          Input
        </label>
        <Textarea
          id="character-counter-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Paste or type your text here..."
          className="min-h-[320px] font-mono text-sm"
        />
      </div>

      <ToolStats stats={statItems} />

      <div className="flex flex-wrap gap-3">
        <CopyButton value={input} disabled={!input} />
        <PasteButton onPaste={setInput} />
        <DownloadButton value={input} filename="character-counter.txt" disabled={!input} />
        <Button type="button" variant="ghost" onClick={handleClear} disabled={!input}>
          Clear
        </Button>
      </div>
    </div>
  )
}
