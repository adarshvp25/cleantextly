"use client"

import { useId, useMemo, useRef, useState } from "react"

import { removeDuplicateLines } from "@/lib/tools/remove-duplicate-lines"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { CopyButton } from "@/components/tools/copy-button"
import { ToolStats } from "@/components/tools/tool-stats"

export function RemoveDuplicateLinesTool() {
  const [input, setInput] = useState("")
  const [ignoreEmptyLines, setIgnoreEmptyLines] = useState(false)
  const [trimWhitespace, setTrimWhitespace] = useState(false)
  const outputRef = useRef<HTMLTextAreaElement>(null)

  const ignoreEmptyLinesId = useId()
  const trimWhitespaceId = useId()

  const result = useMemo(
    () => removeDuplicateLines(input, { ignoreEmptyLines, trimWhitespace }),
    [input, ignoreEmptyLines, trimWhitespace]
  )

  function handleRemoveDuplicates() {
    outputRef.current?.focus()
    outputRef.current?.select()
  }

  function handleClear() {
    setInput("")
  }

  const stats = [
    { label: "Input lines", value: result.inputLines },
    { label: "Output lines", value: result.outputLines },
    { label: "Duplicate lines removed", value: result.duplicatesRemoved },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <label
          htmlFor={ignoreEmptyLinesId}
          className="flex select-none items-center gap-2 text-sm text-muted-foreground"
        >
          <Checkbox
            id={ignoreEmptyLinesId}
            checked={ignoreEmptyLines}
            onCheckedChange={setIgnoreEmptyLines}
          />
          Ignore empty lines
        </label>

        <label
          htmlFor={trimWhitespaceId}
          className="flex select-none items-center gap-2 text-sm text-muted-foreground"
        >
          <Checkbox
            id={trimWhitespaceId}
            checked={trimWhitespace}
            onCheckedChange={setTrimWhitespace}
          />
          Trim whitespace
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="dedupe-input" className="text-sm font-medium text-foreground">
            Input
          </label>
          <Textarea
            id="dedupe-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste your text here..."
            className="min-h-[320px] font-mono text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="dedupe-output" className="text-sm font-medium text-foreground">
            Output
          </label>
          <Textarea
            id="dedupe-output"
            ref={outputRef}
            value={result.output}
            readOnly
            placeholder="Cleaned text will appear here..."
            className="min-h-[320px] font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleRemoveDuplicates} disabled={!input}>
          Remove Duplicates
        </Button>
        <CopyButton value={result.output} disabled={!result.output} />
        <Button type="button" variant="ghost" onClick={handleClear} disabled={!input}>
          Clear
        </Button>
      </div>

      <ToolStats stats={stats} />
    </div>
  )
}
