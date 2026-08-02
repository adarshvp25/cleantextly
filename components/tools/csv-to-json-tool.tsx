"use client"

import { useMemo, useRef, useState } from "react"

import { csvToJson } from "@/lib/tools/csv-to-json"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from "@/components/tools/copy-button"
import { ValidationMessage } from "@/components/tools/validation-message"

export function CsvToJsonTool() {
  const [input, setInput] = useState("")
  const outputRef = useRef<HTMLTextAreaElement>(null)

  const result = useMemo(() => csvToJson(input), [input])

  function handleConvert() {
    outputRef.current?.focus()
    outputRef.current?.select()
  }

  function handleClear() {
    setInput("")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="csv-input" className="text-sm font-medium text-foreground">
            Input
          </label>
          <Textarea
            id="csv-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste your CSV here..."
            className="min-h-[320px] font-mono text-sm"
          />
          <ValidationMessage
            status={result.isValid ? "idle" : "invalid"}
            message={result.isValid ? undefined : result.error ?? undefined}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="csv-output" className="text-sm font-medium text-foreground">
            Output
          </label>
          <Textarea
            id="csv-output"
            ref={outputRef}
            value={result.output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            className="min-h-[320px] font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleConvert} disabled={!input}>
          Convert
        </Button>
        <CopyButton value={result.output} disabled={!result.output} />
        <Button type="button" variant="ghost" onClick={handleClear} disabled={!input}>
          Clear
        </Button>
      </div>
    </div>
  )
}
