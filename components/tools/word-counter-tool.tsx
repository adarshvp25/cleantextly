"use client"

import { useMemo, useState } from "react"

import { analyzeText } from "@/lib/tools/word-counter"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from "@/components/tools/copy-button"
import { ToolStats } from "@/components/tools/tool-stats"

export function WordCounterTool() {
  const [input, setInput] = useState("")

  const stats = useMemo(() => analyzeText(input), [input])

  function handleClear() {
    setInput("")
  }

  const statItems = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.characters },
    { label: "Characters (No Spaces)", value: stats.charactersNoSpaces },
    { label: "Lines", value: stats.lines },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Sentences", value: stats.sentences },
    { label: "Reading Time", value: `${stats.readingTimeMinutes} min` },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="word-counter-input" className="text-sm font-medium text-foreground">
          Input
        </label>
        <Textarea
          id="word-counter-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Paste or type your text here..."
          className="min-h-[320px] font-mono text-sm"
        />
      </div>

      <ToolStats stats={statItems} />

      <div className="flex flex-wrap gap-3">
        <CopyButton value={input} disabled={!input} />
        <Button type="button" variant="ghost" onClick={handleClear} disabled={!input}>
          Clear
        </Button>
      </div>
    </div>
  )
}
