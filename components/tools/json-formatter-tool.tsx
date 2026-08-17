"use client"

import { useMemo, useState } from "react"

import { JSON_MODE_OPTIONS, processJson, type JsonMode } from "@/lib/tools/json-formatter"
import { countCharacters } from "@/lib/tools/text-metrics"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { CopyButton } from "@/components/tools/copy-button"
import { PasteButton } from "@/components/tools/paste-button"
import { DownloadButton } from "@/components/tools/download-button"
import { ToolStats } from "@/components/tools/tool-stats"
import { ValidationMessage } from "@/components/tools/validation-message"

const OUTPUT_PLACEHOLDER: Record<JsonMode, string> = {
  format: "Formatted JSON will appear here...",
  validate: "Validated JSON will appear here...",
  minify: "Minified JSON will appear here...",
}

export function JsonFormatterTool() {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<JsonMode>("format")

  const result = useMemo(() => processJson(input, mode), [input, mode])

  function handleClear() {
    setInput("")
  }

  const statItems = [
    { label: "Input Characters", value: countCharacters(input) },
    { label: "Output Characters", value: countCharacters(result.output) },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:max-w-xs">
        <label htmlFor="json-mode" className="text-sm font-medium text-foreground">
          Mode
        </label>
        <Select
          id="json-mode"
          value={mode}
          onChange={(event) => setMode(event.target.value as JsonMode)}
        >
          {JSON_MODE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="json-input" className="text-sm font-medium text-foreground">
            Input
          </label>
          <Textarea
            id="json-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste your JSON here..."
            className="min-h-[320px] font-mono text-sm"
          />
          <ValidationMessage
            status={!input ? "idle" : result.isValid ? "valid" : "invalid"}
            message={result.isValid ? undefined : result.error}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="json-output" className="text-sm font-medium text-foreground">
            Output
          </label>
          <Textarea
            id="json-output"
            value={result.output}
            readOnly
            placeholder={OUTPUT_PLACEHOLDER[mode]}
            className="min-h-[320px] font-mono text-sm"
          />
        </div>
      </div>

      <ToolStats stats={statItems} />

      <div className="flex flex-wrap gap-3">
        <CopyButton value={result.output} disabled={!result.output || !result.isValid} />
        <PasteButton onPaste={setInput} />
        <DownloadButton
          value={result.output}
          filename="json-formatter.txt"
          disabled={!result.output || !result.isValid}
        />
        <Button type="button" variant="ghost" onClick={handleClear} disabled={!input}>
          Clear
        </Button>
      </div>
    </div>
  )
}
