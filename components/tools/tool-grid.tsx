import type { Tool } from "@/lib/tools"
import { ToolCard } from "@/components/tools/tool-card"

export function ToolGrid({ tools }: { tools: Tool[] }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <li key={tool.href}>
          <ToolCard tool={tool} />
        </li>
      ))}
    </ul>
  )
}
