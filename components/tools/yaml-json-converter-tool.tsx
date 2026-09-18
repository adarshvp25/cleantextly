"use client"

import { useMemo, useRef, useState } from "react"

import {
  convert,
  DIRECTION_OPTIONS,
  type ConversionDirection,
} from "@/lib/tools/yaml-json-converter"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from "@/components/tools/copy-button"
import { PasteButton } from "@/components/tools/paste-button"
import { ValidationMessage } from "@/components/tools/validation-message"

const DIRECTION_CONTENT: Record<
  ConversionDirection,
  {
    inputLabel: string
    outputLabel: string
    inputPlaceholder: string
    outputPlaceholder: string
  }
> = {
  "yaml-to-json": {
    inputLabel: "YAML Input",
    outputLabel: "JSON Output",
    inputPlaceholder: "Paste your YAML here...",
    outputPlaceholder: "Converted JSON will appear here...",
  },
  "json-to-yaml": {
    inputLabel: "JSON Input",
    outputLabel: "YAML Output",
    inputPlaceholder: "Paste your JSON here...",
    outputPlaceholder: "Converted YAML will appear here...",
  },
}

export function YamlJsonConverterTool() {
  const [direction, setDirection] = useState<ConversionDirection>("yaml-to-json")
  const [input, setInput] = useState("")
  const outputRef = useRef<HTMLTextAreaElement>(null)

  const result = useMemo(() => convert(input, direction), [input, direction])
  const content = DIRECTION_CONTENT[direction]

  function handleDirectionChange(next: ConversionDirection) {
    setDirection(next)
  }

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
        <span className="text-sm font-medium text-foreground">Conversion Direction</span>
        <div className="inline-flex gap-1 rounded-lg border border-border p-1">
          {DIRECTION_OPTIONS.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={direction === option.value ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              aria-pressed={direction === option.value}
              onClick={() => handleDirectionChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="yaml-json-input" className="text-sm font-medium text-foreground">
            {content.inputLabel}
          </label>
          <Textarea
            id="yaml-json-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={content.inputPlaceholder}
            className="min-h-[320px] font-mono text-sm"
          />
          <ValidationMessage
            status={result.error ? "invalid" : "idle"}
            message={result.error ?? undefined}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="yaml-json-output" className="text-sm font-medium text-foreground">
            {content.outputLabel}
          </label>
          <Textarea
            id="yaml-json-output"
            ref={outputRef}
            value={result.output}
            readOnly
            placeholder={content.outputPlaceholder}
            className="min-h-[320px] font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleConvert} disabled={!input}>
          Convert
        </Button>
        <CopyButton value={result.output} disabled={!result.output || !!result.error} />
        <PasteButton onPaste={setInput} />
        <Button type="button" variant="ghost" onClick={handleClear} disabled={!input}>
          Clear
        </Button>
      </div>
    </div>
  )
}
