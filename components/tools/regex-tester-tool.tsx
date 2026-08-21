"use client"

import { useId, useMemo, useState, type ReactNode } from "react"

import {
  FLAG_OPTIONS,
  processRegex,
  REGEX_PRESETS,
  type RegexFlag,
  type RegexMatch,
} from "@/lib/tools/regex-tester"
import { countCharacters } from "@/lib/tools/text-metrics"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { CopyButton } from "@/components/tools/copy-button"
import { PasteButton } from "@/components/tools/paste-button"
import { DownloadButton } from "@/components/tools/download-button"
import { ToolStats } from "@/components/tools/tool-stats"
import { ValidationMessage } from "@/components/tools/validation-message"

// Renders the test string with matches wrapped in <mark>, using plain text
// nodes for every segment — never dangerouslySetInnerHTML — so the test
// string is always displayed as literal text and can never be parsed or
// executed as HTML, no matter what it contains.
function renderHighlightedText(testString: string, matches: RegexMatch[]): ReactNode {
  if (matches.length === 0) {
    return testString
  }

  const segments: ReactNode[] = []
  let cursor = 0

  matches.forEach((match, i) => {
    if (match.start > cursor) {
      segments.push(testString.slice(cursor, match.start))
    }

    segments.push(
      <mark
        key={i}
        className="rounded-sm bg-primary/20 font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-2"
      >
        {match.text === "" ? "​" : match.text}
      </mark>
    )

    cursor = Math.max(cursor, match.end)
  })

  if (cursor < testString.length) {
    segments.push(testString.slice(cursor))
  }

  return segments
}

function formatGroupLabel(index: number): string {
  return `Group ${index + 1}`
}

export function RegexTesterTool() {
  const [pattern, setPattern] = useState("")
  const [testString, setTestString] = useState("")
  const [flags, setFlags] = useState<RegexFlag[]>(["g"])

  const flagIdGlobal = useId()
  const flagIdIgnoreCase = useId()
  const flagIdMultiline = useId()
  const flagIdDotAll = useId()
  const flagIdUnicode = useId()
  const flagIds: Record<RegexFlag, string> = {
    g: flagIdGlobal,
    i: flagIdIgnoreCase,
    m: flagIdMultiline,
    s: flagIdDotAll,
    u: flagIdUnicode,
  }

  const result = useMemo(
    () => processRegex(pattern, testString, flags),
    [pattern, testString, flags]
  )

  function toggleFlag(flag: RegexFlag, checked: boolean) {
    setFlags((current) =>
      checked ? [...current, flag] : current.filter((value) => value !== flag)
    )
  }

  function applyPreset(preset: (typeof REGEX_PRESETS)[number]) {
    setPattern(preset.pattern)
    setFlags(preset.flags)
  }

  function handleClear() {
    setPattern("")
    setTestString("")
  }

  const matchesText = result.matches.map((match) => match.text).join("\n")

  const summary =
    pattern === ""
      ? null
      : !result.isValid
        ? null
        : result.matches.length === 0
          ? "No matches found"
          : result.isGlobal
            ? `${result.matches.length} match${result.matches.length === 1 ? "" : "es"} found${
                result.truncated ? ` (showing first ${result.matches.length})` : ""
              }`
            : "1 match found — showing the first match only. Enable the g flag to find all matches."

  const statItems = [
    { label: "Test String Characters", value: countCharacters(testString) },
    { label: "Match Count", value: result.matches.length },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="regex-pattern" className="text-sm font-medium text-foreground">
          Regex Pattern
        </label>
        <Input
          id="regex-pattern"
          value={pattern}
          onChange={(event) => setPattern(event.target.value)}
          placeholder="Enter your regular expression..."
          aria-invalid={pattern !== "" && !result.isValid}
          className="font-mono text-sm"
        />
        <ValidationMessage
          status={pattern === "" ? "idle" : result.isValid ? "idle" : "invalid"}
          message={result.error}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-foreground">Flags</span>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {FLAG_OPTIONS.map((option) => (
            <label
              key={option.value}
              htmlFor={flagIds[option.value]}
              className="flex select-none items-center gap-2 text-sm text-muted-foreground"
              title={option.description}
            >
              <Checkbox
                id={flagIds[option.value]}
                checked={flags.includes(option.value)}
                onCheckedChange={(checked) => toggleFlag(option.value, checked === true)}
              />
              <span>
                <span className="font-mono text-foreground">{option.label}</span> —{" "}
                {option.description}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="regex-test-string" className="text-sm font-medium text-foreground">
            Test String
          </label>
          <Textarea
            id="regex-test-string"
            value={testString}
            onChange={(event) => setTestString(event.target.value)}
            placeholder="Enter text to test against your regular expression..."
            className="min-h-[320px] font-mono text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">Highlighted Matches</span>
          <div className="min-h-[320px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-input bg-background px-3 py-2 font-mono text-sm text-foreground">
            {testString === "" ? (
              <span className="text-muted-foreground">
                Matches will be highlighted here...
              </span>
            ) : (
              renderHighlightedText(testString, result.isValid ? result.matches : [])
            )}
          </div>
        </div>
      </div>

      {summary && (
        <p role="status" className="text-sm font-medium text-foreground">
          {summary}
        </p>
      )}

      <ToolStats stats={statItems} />

      {result.matches.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-foreground">Match Details</h3>
          <ul className="flex flex-col gap-3">
            {result.matches.map((match, i) => (
              <li
                key={i}
                className="rounded-lg border border-border bg-card p-4 text-sm"
              >
                <p className="font-medium text-card-foreground">Match {i + 1}</p>
                <p className="mt-1 break-words font-mono text-muted-foreground">
                  Text: {match.text === "" ? "(empty match)" : match.text}
                </p>
                <p className="mt-1 text-muted-foreground">
                  Position: {match.start}–{match.end}
                </p>

                {match.groups.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-muted-foreground">Capture Groups</p>
                    <ul className="mt-1 flex flex-col gap-0.5">
                      {match.groups.map((group, groupIndex) => (
                        <li key={groupIndex} className="break-words font-mono text-muted-foreground">
                          {formatGroupLabel(groupIndex)}:{" "}
                          {group === null ? "(no match)" : group}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {match.namedGroups && Object.keys(match.namedGroups).length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-muted-foreground">Named Groups</p>
                    <ul className="mt-1 flex flex-col gap-0.5">
                      {Object.entries(match.namedGroups).map(([name, value]) => (
                        <li key={name} className="break-words font-mono text-muted-foreground">
                          {name}: {value === null ? "(no match)" : value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-foreground">Common Regex Patterns</h3>
        <div className="flex flex-wrap gap-2">
          {REGEX_PRESETS.map((preset) => (
            <Button
              key={preset.name}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => applyPreset(preset)}
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <CopyButton value={matchesText} disabled={!matchesText} />
        <PasteButton onPaste={setTestString} />
        <DownloadButton
          value={matchesText}
          filename="regex-matches.txt"
          disabled={!matchesText}
        />
        <Button
          type="button"
          variant="ghost"
          onClick={handleClear}
          disabled={!pattern && !testString}
        >
          Clear
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Your regex and test data are processed locally in your browser and never uploaded
        or sent to a server.
      </p>
    </div>
  )
}
