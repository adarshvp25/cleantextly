import type { ToolFeature } from "@/lib/tools/content"

export function FeatureList({ features }: { features: ToolFeature[] }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <li
          key={feature.title}
          className="rounded-xl border border-border bg-card p-6"
        >
          <h3 className="font-semibold text-card-foreground">{feature.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
        </li>
      ))}
    </ul>
  )
}
