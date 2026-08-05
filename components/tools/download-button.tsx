"use client"

import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { downloadTextFile } from "@/lib/download-text-file"

export function DownloadButton({
  value,
  filename,
  disabled,
}: {
  value: string
  filename: string
  disabled?: boolean
}) {
  function handleDownload() {
    downloadTextFile(filename, value)
  }

  return (
    <Button type="button" variant="outline" onClick={handleDownload} disabled={disabled}>
      <Download />
      Download TXT
    </Button>
  )
}
