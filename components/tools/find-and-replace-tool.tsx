"use client"

import { useId, useMemo, useState } from "react"

import { findAndReplace } from "@/lib/tools/find-and-replace"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { CopyButton } from "@/components/tools/copy-button"
import { PasteButton } from "@/components/tools/paste-button"
import { DownloadButton } from "@/components/tools/download-button"
import { ToolStats } from "@/components/tools/tool-stats"

export function FindAndReplaceTool() {
  const [input, setInput] = useState("")
  const [findText, setFindText] = useState("")
  const [replaceText, setReplaceText] = useState("")
  const [matchCase, setMatchCase] = useState(false)
  const [wholeWord, setWholeWord] = useState(false)

  const matchCaseId = useId()
  const wholeWordId = useId()

  const result = useMemo(
    () => findAndReplace(input, findText, replaceText, { matchCase, wholeWord }),
    [input, findText, replaceText, matchCase, wholeWord]
  )

  function handleClear() {
    setInput("")
    setFindText("")
    setReplaceText("")
  }

  const statItems = [
    { label: "Occurrences Found", value: result.occurrencesFound },
    { label: "Occurrences Replaced", value: result.occurrencesReplaced },
    { label: "Input Characters", value: result.inputCharacters },
    { label: "Output Characters", value: result.outputCharacters },
    { label: "Input Words", value: result.inputWords },
    { label: "Output Words", value: result.outputWords },
    { label: "Input Lines", value: result.inputLines },
    { label: "Output Lines", value: result.outputLines },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="find-text" className="text-sm font-medium text-foreground">
            Find
          </label>
          <Input
            id="find-text"
            value={findText}
            onChange={(event) => setFindText(event.target.value)}
            placeholder="Text to find..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="replace-text" className="text-sm font-medium text-foreground">
            Replace With
          </label>
          <Input
            id="replace-text"
            value={replaceText}
            onChange={(event) => setReplaceText(event.target.value)}
            placeholder="Replacement text..."
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <label
          htmlFor={matchCaseId}
          className="flex select-none items-center gap-2 text-sm text-muted-foreground"
        >
          <Checkbox id={matchCaseId} checked={matchCase} onCheckedChange={setMatchCase} />
          Match Case
        </label>

        <label
          htmlFor={wholeWordId}
          className="flex select-none items-center gap-2 text-sm text-muted-foreground"
        >
          <Checkbox id={wholeWordId} checked={wholeWord} onCheckedChange={setWholeWord} />
          Match Whole Word
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="find-replace-input" className="text-sm font-medium text-foreground">
            Input
          </label>
          <Textarea
            id="find-replace-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste your text here..."
            className="min-h-[320px] font-mono text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="find-replace-output" className="text-sm font-medium text-foreground">
            Output
          </label>
          <Textarea
            id="find-replace-output"
            value={result.output}
            readOnly
            placeholder="Updated text will appear here..."
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
          filename="find-and-replace.txt"
          disabled={!result.output}
        />
        <Button type="button" variant="ghost" onClick={handleClear} disabled={!input}>
          Clear
        </Button>
      </div>
    </div>
  )
}
