"use client"

import { useMemo, useState } from "react"

import { REVERSAL_MODE_OPTIONS, reverseText, type ReversalMode } from "@/lib/tools/text-reverser"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { CopyButton } from "@/components/tools/copy-button"
import { PasteButton } from "@/components/tools/paste-button"
import { DownloadButton } from "@/components/tools/download-button"
import { ToolStats } from "@/components/tools/tool-stats"

export function TextReverserTool() {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<ReversalMode>("text")

  const result = useMemo(() => reverseText(input, mode), [input, mode])

  function handleClear() {
    setInput("")
  }

  const statItems = [
    { label: "Input Characters", value: result.inputCharacters },
    { label: "Output Characters", value: result.outputCharacters },
    { label: "Input Words", value: result.inputWords },
    { label: "Output Words", value: result.outputWords },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:max-w-xs">
        <label htmlFor="reversal-mode" className="text-sm font-medium text-foreground">
          Reversal Mode
        </label>
        <Select
          id="reversal-mode"
          value={mode}
          onChange={(event) => setMode(event.target.value as ReversalMode)}
        >
          {REVERSAL_MODE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="text-reverser-input" className="text-sm font-medium text-foreground">
            Input
          </label>
          <Textarea
            id="text-reverser-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste your text here..."
            className="min-h-[320px] font-mono text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="text-reverser-output" className="text-sm font-medium text-foreground">
            Output
          </label>
          <Textarea
            id="text-reverser-output"
            value={result.output}
            readOnly
            placeholder="Reversed text will appear here..."
            className="min-h-[320px] font-mono text-sm"
          />
        </div>
      </div>

      <ToolStats stats={statItems} />

      <div className="flex flex-wrap gap-3">
        <CopyButton value={result.output} disabled={!result.output} />
        <PasteButton onPaste={setInput} />
        <DownloadButton value={result.output} filename="text-reverser.txt" disabled={!result.output} />
        <Button type="button" variant="ghost" onClick={handleClear} disabled={!input}>
          Clear
        </Button>
      </div>
    </div>
  )
}
