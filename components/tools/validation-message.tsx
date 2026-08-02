import { Check, CircleAlert } from "lucide-react"

type ValidationStatus = "idle" | "valid" | "invalid"

export function ValidationMessage({
  status,
  message,
}: {
  status: ValidationStatus
  message?: string
}) {
  if (status === "idle") {
    return null
  }

  if (status === "valid") {
    return (
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Check aria-hidden="true" className="size-4" />
        Valid JSON
      </p>
    )
  }

  return (
    <p role="alert" className="flex items-start gap-1.5 text-sm text-destructive">
      <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
      <span>{message}</span>
    </p>
  )
}
