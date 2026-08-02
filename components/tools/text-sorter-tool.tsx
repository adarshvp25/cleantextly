"use client"

import { useId, useMemo, useRef, useState } from "react"

import { SORT_MODE_OPTIONS, sortText, type SortMode } from "@/lib/tools/text-sorter"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CopyButton } from "@/components/tools/copy-button"

export function TextSorterTool() {
  const [input, setInput] = useState("")
  const [sortMode, setSortMode] = useState<SortMode>("alpha-asc")
  const [trimWhitespace, setTrimWhitespace] = useState(false)
  const [removeEmptyLines, setRemoveEmptyLines] = useState(false)
  const [caseSensitive, setCaseSensitive] = useState(false)
  const outputRef = useRef<HTMLTextAreaElement>(null)

  const trimWhitespaceId = useId()
  const removeEmptyLinesId = useId()
  const caseSensitiveId = useId()

  const output = useMemo(
    () =>
      sortText(input, {
        mode: sortMode,
        trimWhitespace,
        removeEmptyLines,
        caseSensitive,
      }),
    [input, sortMode, trimWhitespace, removeEmptyLines, caseSensitive]
  )

  function handleSort() {
    outputRef.current?.focus()
    outputRef.current?.select()
  }

  function handleClear() {
    setInput("")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:max-w-xs">
        <label htmlFor="sort-mode" className="text-sm font-medium text-foreground">
          Sort Mode
        </label>
        <Select
          id="sort-mode"
          value={sortMode}
          onChange={(event) => setSortMode(event.target.value as SortMode)}
        >
          {SORT_MODE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <label
          htmlFor={removeEmptyLinesId}
          className="flex select-none items-center gap-2 text-sm text-muted-foreground"
        >
          <Checkbox
            id={removeEmptyLinesId}
            checked={removeEmptyLines}
            onCheckedChange={setRemoveEmptyLines}
          />
          Remove empty lines
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
          Trim whitespace before sorting
        </label>

        <label
          htmlFor={caseSensitiveId}
          className="flex select-none items-center gap-2 text-sm text-muted-foreground"
        >
          <Checkbox
            id={caseSensitiveId}
            checked={caseSensitive}
            onCheckedChange={setCaseSensitive}
          />
          Case sensitive
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="sorter-input" className="text-sm font-medium text-foreground">
            Input
          </label>
          <Textarea
            id="sorter-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste your text here..."
            className="min-h-[320px] font-mono text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="sorter-output" className="text-sm font-medium text-foreground">
            Output
          </label>
          <Textarea
            id="sorter-output"
            ref={outputRef}
            value={output}
            readOnly
            placeholder="Sorted text will appear here..."
            className="min-h-[320px] font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleSort} disabled={!input}>
          Sort
        </Button>
        <CopyButton value={output} disabled={!output} />
        <Button type="button" variant="ghost" onClick={handleClear} disabled={!input}>
          Clear
        </Button>
      </div>
    </div>
  )
}
