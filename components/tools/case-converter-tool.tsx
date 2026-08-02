"use client"

import { useMemo, useRef, useState } from "react"

import { CASE_TYPE_OPTIONS, convertCase, type CaseType } from "@/lib/tools/case-converter"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { CopyButton } from "@/components/tools/copy-button"

export function CaseConverterTool() {
  const [input, setInput] = useState("")
  const [caseType, setCaseType] = useState<CaseType>("uppercase")
  const outputRef = useRef<HTMLTextAreaElement>(null)

  const output = useMemo(() => convertCase(input, caseType), [input, caseType])

  function handleConvert() {
    outputRef.current?.focus()
    outputRef.current?.select()
  }

  function handleClear() {
    setInput("")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:max-w-xs">
        <label htmlFor="case-type" className="text-sm font-medium text-foreground">
          Conversion Mode
        </label>
        <Select
          id="case-type"
          value={caseType}
          onChange={(event) => setCaseType(event.target.value as CaseType)}
        >
          {CASE_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="case-input" className="text-sm font-medium text-foreground">
            Input
          </label>
          <Textarea
            id="case-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste your text here..."
            className="min-h-[320px] font-mono text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="case-output" className="text-sm font-medium text-foreground">
            Output
          </label>
          <Textarea
            id="case-output"
            ref={outputRef}
            value={output}
            readOnly
            placeholder="Converted text will appear here..."
            className="min-h-[320px] font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleConvert} disabled={!input}>
          Convert
        </Button>
        <CopyButton value={output} disabled={!output} />
        <Button type="button" variant="ghost" onClick={handleClear} disabled={!input}>
          Clear
        </Button>
      </div>
    </div>
  )
}
