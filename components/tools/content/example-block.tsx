import type { ToolExample } from "@/lib/tools/content"

export function ExampleBlock({ example }: { example: ToolExample }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      {example.title && (
        <h3 className="font-semibold text-card-foreground">{example.title}</h3>
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            {example.inputLabel ?? "Input"}
          </p>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-lg border border-input bg-background p-3 text-sm text-foreground">
            {example.input}
          </pre>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            {example.outputLabel ?? "Output"}
          </p>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-lg border border-input bg-background p-3 text-sm text-foreground">
            {example.output}
          </pre>
        </div>
      </div>
    </div>
  )
}
