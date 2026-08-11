"use client"

import { useMemo, useState } from "react"

import { countLinesInText } from "@/lib/tools/line-counter"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from "@/components/tools/copy-button"
import { PasteButton } from "@/components/tools/paste-button"
import { DownloadButton } from "@/components/tools/download-button"
import { ToolStats } from "@/components/tools/tool-stats"

export function LineCounterTool() {
  const [input, setInput] = useState("")

  const stats = useMemo(() => countLinesInText(input), [input])

  function handleClear() {
    setInput("")
  }

  const statItems = [
    { label: "Lines", value: stats.lines },
    { label: "Characters", value: stats.characters },
    { label: "Words", value: stats.words },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="line-counter-input" className="text-sm font-medium text-foreground">
          Input
        </label>
        <Textarea
          id="line-counter-input"
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
        <DownloadButton value={input} filename="line-counter.txt" disabled={!input} />
        <Button type="button" variant="ghost" onClick={handleClear} disabled={!input}>
          Clear
        </Button>
      </div>
    </div>
  )
}
