"use client"

import { useRef, useState, type ChangeEvent } from "react"

import {
  formatHtml,
  INDENT_OPTIONS,
  type HtmlFormatResult,
  type IndentOption,
} from "@/lib/tools/html-formatter"
import { analyzeText } from "@/lib/tools/word-counter"
import { countCharacters } from "@/lib/tools/text-metrics"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { CopyButton } from "@/components/tools/copy-button"
import { DownloadButton } from "@/components/tools/download-button"
import { ToolStats } from "@/components/tools/tool-stats"
import { ValidationMessage } from "@/components/tools/validation-message"

export function HtmlFormatterTool() {
  const [input, setInput] = useState("")
  const [indent, setIndent] = useState<IndentOption>("2")
  const [result, setResult] = useState<HtmlFormatResult>({ output: "" })
  const [hasFormatted, setHasFormatted] = useState(false)

  // Set by onPaste (which fires before the browser inserts the pasted
  // text), then read and cleared by the onChange that immediately
  // follows it — onChange is the first point where `event.target.value`
  // reflects the textarea's full content with the paste merged in, so
  // formatting there (rather than trying to read clipboard data
  // directly) naturally handles a paste into the middle of existing
  // text the same way the browser does. Plain typing never sets this
  // flag, so it never triggers formatting.
  const pastedRef = useRef(false)

  function handleFormat() {
    setResult(formatHtml(input, indent))
    setHasFormatted(true)
  }

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value
    setInput(value)

    if (pastedRef.current) {
      pastedRef.current = false
      setResult(formatHtml(value, indent))
      setHasFormatted(true)
    }
  }

  function handleInputPaste() {
    pastedRef.current = true
  }

  function handleClear() {
    setInput("")
    setResult({ output: "" })
    setHasFormatted(false)
  }

  const statItems = [
    { label: "Input Characters", value: countCharacters(input) },
    { label: "Output Characters", value: countCharacters(result.output) },
    { label: "Lines", value: analyzeText(result.output).lines },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:max-w-xs">
        <label htmlFor="html-formatter-indent" className="text-sm font-medium text-foreground">
          Indentation
        </label>
        <Select
          id="html-formatter-indent"
          value={indent}
          onChange={(event) => setIndent(event.target.value as IndentOption)}
        >
          {INDENT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="html-formatter-input" className="text-sm font-medium text-foreground">
            HTML Input
          </label>
          <Textarea
            id="html-formatter-input"
            value={input}
            onChange={handleInputChange}
            onPaste={handleInputPaste}
            placeholder="Paste your HTML here..."
            className="min-h-[320px] font-mono text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="html-formatter-output" className="text-sm font-medium text-foreground">
            Formatted HTML
          </label>
          <Textarea
            id="html-formatter-output"
            value={result.output}
            readOnly
            placeholder="Formatted HTML will appear here..."
            className="min-h-[320px] font-mono text-sm"
          />
          <ValidationMessage
            status={hasFormatted && result.error ? "invalid" : "idle"}
            message={result.error}
          />
        </div>
      </div>

      <ToolStats stats={statItems} />

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleFormat} disabled={!input}>
          Format
        </Button>
        <CopyButton value={result.output} disabled={!result.output || !!result.error} />
        <DownloadButton
          value={result.output}
          filename="formatted.html"
          disabled={!result.output || !!result.error}
        />
        <Button
          type="button"
          variant="ghost"
          onClick={handleClear}
          disabled={!input && !result.output}
        >
          Clear
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Your HTML is formatted locally in your browser and is not uploaded to a server.
      </p>
    </div>
  )
}
