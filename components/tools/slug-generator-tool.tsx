"use client"

import { useMemo, useState } from "react"
import { CircleAlert } from "lucide-react"

import { generateSlugs } from "@/lib/tools/slug-generator"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from "@/components/tools/copy-button"
import { PasteButton } from "@/components/tools/paste-button"

export function SlugGeneratorTool() {
  const [input, setInput] = useState("")

  const result = useMemo(() => generateSlugs(input), [input])

  const hasInput = input.trim() !== ""
  const noSlug = hasInput && result.output.trim() === ""
  const outputLabel = result.lineCount > 1 ? "Generated Slugs" : "Generated Slug"

  function handleClear() {
    setInput("")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="slug-input" className="text-sm font-medium text-foreground">
          Title or Text
        </label>
        <Textarea
          id="slug-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          aria-describedby="slug-input-hint"
          placeholder="Type or paste a title, e.g. How to Build a Website"
          className="min-h-[160px] text-sm"
        />
        <p id="slug-input-hint" className="text-sm text-muted-foreground">
          Enter one title per line to generate one slug per line.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="slug-output" className="text-sm font-medium text-foreground">
          {outputLabel}
        </label>
        <Textarea
          id="slug-output"
          value={result.output}
          readOnly
          placeholder="Your URL slug will appear here..."
          className="min-h-[120px] font-mono text-sm"
        />
        {noSlug && (
          <p role="status" className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>
              No letters or numbers were found, so there is nothing to turn into
              a slug.
            </span>
          </p>
        )}
        {!noSlug && result.emptyLineCount > 0 && (
          <p role="status" className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>
              {result.emptyLineCount === 1
                ? "1 line has no letters or numbers and was left blank."
                : `${result.emptyLineCount} lines have no letters or numbers and were left blank.`}
            </span>
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <CopyButton value={result.output} disabled={!result.output.trim()} />
        <PasteButton onPaste={setInput} />
        <Button type="button" variant="ghost" onClick={handleClear} disabled={!input}>
          Clear
        </Button>
      </div>
    </div>
  )
}
