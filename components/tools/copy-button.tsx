"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CopyButton({
  value,
  disabled,
}: {
  value: string
  disabled?: boolean
}) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API unavailable or permission denied; nothing to recover.
    }
  }

  return (
    <Button type="button" variant="outline" onClick={handleCopy} disabled={disabled}>
      {copied ? <Check /> : <Copy />}
      {copied ? "Copied!" : "Copy Output"}
    </Button>
  )
}
