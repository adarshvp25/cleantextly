import { tools } from "@/lib/tools"
import { ToolGrid } from "@/components/tools/tool-grid"

export function RelatedTools({ hrefs }: { hrefs: string[] }) {
  const relatedTools = tools.filter((tool) => hrefs.includes(tool.href))

  if (relatedTools.length === 0) {
    return null
  }

  return <ToolGrid tools={relatedTools} />
}
