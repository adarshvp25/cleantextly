type Stat = {
  label: string
  value: number | string
}

export function ToolStats({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-border bg-card px-4 py-3 text-center"
        >
          <dt className="text-xs text-muted-foreground">{stat.label}</dt>
          <dd className="mt-1 text-2xl font-semibold text-card-foreground">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
