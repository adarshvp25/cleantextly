"use client"

import { useState } from "react"
import { Check, ClipboardPaste } from "lucide-react"

import { Button } from "@/components/ui/button"

export function PasteButton({ onPaste }: { onPaste: (text: string) => void }) {
  const [pasted, setPasted] = useState(false)

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText()
      onPaste(text)
      setPasted(true)
      setTimeout(() => setPasted(false), 1500)
    } catch {
      // Clipboard API unavailable or permission denied; nothing to recover.
    }
  }

  return (
    <Button type="button" variant="outline" onClick={handlePaste}>
      {pasted ? <Check /> : <ClipboardPaste />}
      {pasted ? "Pasted!" : "Paste"}
    </Button>
  )
}
