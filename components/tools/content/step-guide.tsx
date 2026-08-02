import type { ToolGuideStep } from "@/lib/tools/content"

export function StepGuide({ steps }: { steps: ToolGuideStep[] }) {
  return (
    <ol className="flex flex-col gap-6">
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {index + 1}
          </span>
          <div>
            <h3 className="font-semibold text-foreground">{step.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
