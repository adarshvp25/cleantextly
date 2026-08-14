"use client"

import { useMemo, useState } from "react"
import { ArrowLeftRight } from "lucide-react"

import {
  ENCODING_TYPE_OPTIONS,
  OPERATION_OPTIONS,
  processUrl,
  type UrlEncodingType,
  type UrlOperation,
} from "@/lib/tools/url-encoder-decoder"
import { countCharacters } from "@/lib/tools/text-metrics"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { CopyButton } from "@/components/tools/copy-button"
import { PasteButton } from "@/components/tools/paste-button"
import { DownloadButton } from "@/components/tools/download-button"
import { ToolStats } from "@/components/tools/tool-stats"
import { ValidationMessage } from "@/components/tools/validation-message"

export function UrlEncoderDecoderTool() {
  const [input, setInput] = useState("")
  const [operation, setOperation] = useState<UrlOperation>("encode")
  const [encodingType, setEncodingType] = useState<UrlEncodingType>("component")

  const result = useMemo(
    () => processUrl(input, operation, encodingType),
    [input, operation, encodingType]
  )

  function handleClear() {
    setInput("")
  }

  function handleSwap() {
    if (result.error || !result.output) return
    setInput(result.output)
    setOperation(operation === "encode" ? "decode" : "encode")
  }

  const statItems = [
    { label: "Input Characters", value: countCharacters(input) },
    { label: "Output Characters", value: countCharacters(result.output) },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:max-w-md sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="url-operation" className="text-sm font-medium text-foreground">
            Mode
          </label>
          <Select
            id="url-operation"
            value={operation}
            onChange={(event) => setOperation(event.target.value as UrlOperation)}
          >
            {OPERATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="url-encoding-type" className="text-sm font-medium text-foreground">
            Encoding Type
          </label>
          <Select
            id="url-encoding-type"
            value={encodingType}
            onChange={(event) => setEncodingType(event.target.value as UrlEncodingType)}
          >
            {ENCODING_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="url-input" className="text-sm font-medium text-foreground">
            Input
          </label>
          <Textarea
            id="url-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={
              operation === "encode"
                ? "Paste a URL or text to encode..."
                : "Paste a URL-encoded string to decode..."
            }
            className="min-h-[320px] font-mono text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="url-output" className="text-sm font-medium text-foreground">
            Output
          </label>
          <Textarea
            id="url-output"
            value={result.output}
            readOnly
            placeholder={
              operation === "encode"
                ? "Encoded output will appear here..."
                : "Decoded output will appear here..."
            }
            className="min-h-[320px] font-mono text-sm"
          />
          <ValidationMessage status={result.error ? "invalid" : "idle"} message={result.error} />
        </div>
      </div>

      <ToolStats stats={statItems} />

      <div className="flex flex-wrap gap-3">
        <CopyButton value={result.output} disabled={!result.output || !!result.error} />
        <PasteButton onPaste={setInput} />
        <Button
          type="button"
          variant="outline"
          onClick={handleSwap}
          disabled={!result.output || !!result.error}
        >
          <ArrowLeftRight />
          Swap
        </Button>
        <DownloadButton
          value={result.output}
          filename="url-encoder-decoder.txt"
          disabled={!result.output || !!result.error}
        />
        <Button type="button" variant="ghost" onClick={handleClear} disabled={!input}>
          Clear
        </Button>
      </div>
    </div>
  )
}
