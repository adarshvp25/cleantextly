import Link from "next/link"

import type { Tool } from "@/lib/tools"
import { cn } from "@/lib/utils"

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon

  const cardClassName = cn(
    "group relative flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-foreground/15 hover:shadow-md",
    !tool.comingSoon &&
      "outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
  )

  const content = (
    <>
      {tool.comingSoon && (
        <span className="absolute top-4 right-4 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          Coming Soon
        </span>
      )}

      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
        <Icon aria-hidden="true" className="size-5" />
      </div>

      <h3 className="pr-20 font-semibold text-card-foreground">{tool.name}</h3>
      <p className="text-sm text-muted-foreground">{tool.description}</p>
    </>
  )

  if (tool.comingSoon) {
    return <div className={cardClassName}>{content}</div>
  }

  return (
    <Link href={tool.href} className={cardClassName}>
      {content}
    </Link>
  )
}
