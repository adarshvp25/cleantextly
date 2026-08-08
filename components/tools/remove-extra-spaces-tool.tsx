"use client"

import { useMemo, useState } from "react"

import { removeExtraSpaces } from "@/lib/tools/remove-extra-spaces"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from "@/components/tools/copy-button"
import { PasteButton } from "@/components/tools/paste-button"
import { DownloadButton } from "@/components/tools/download-button"
import { ToolStats } from "@/components/tools/tool-stats"

export function RemoveExtraSpacesTool() {
  const [input, setInput] = useState("")

  const result = useMemo(() => removeExtraSpaces(input), [input])

  function handleClear() {
    setInput("")
  }

  const statItems = [
    { label: "Input Characters", value: result.inputCharacters },
    { label: "Output Characters", value: result.outputCharacters },
    { label: "Spaces Removed", value: result.spacesRemoved },
    { label: "Input Words", value: result.inputWords },
    { label: "Output Words", value: result.outputWords },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="remove-extra-spaces-input" className="text-sm font-medium text-foreground">
            Input
          </label>
          <Textarea
            id="remove-extra-spaces-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste your text here..."
            className="min-h-[320px] font-mono text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="remove-extra-spaces-output" className="text-sm font-medium text-foreground">
            Output
          </label>
          <Textarea
            id="remove-extra-spaces-output"
            value={result.output}
            readOnly
            placeholder="Cleaned text will appear here..."
            className="min-h-[320px] font-mono text-sm"
          />
        </div>
      </div>

      <ToolStats stats={statItems} />

      <div className="flex flex-wrap gap-3">
        <CopyButton value={result.output} disabled={!result.output} />
        <PasteButton onPaste={setInput} />
        <DownloadButton
          value={result.output}
          filename="remove-extra-spaces.txt"
          disabled={!result.output}
        />
        <Button type="button" variant="ghost" onClick={handleClear} disabled={!input}>
          Clear
        </Button>
      </div>
    </div>
  )
}
