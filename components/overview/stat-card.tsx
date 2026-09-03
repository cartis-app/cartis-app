import type { ComponentType } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type StatCardProps = {
  label: string
  value: string
  helpText: string
  icon: ComponentType<{ className?: string }>
  className?: string
}

export function StatCard({
  label,
  value,
  helpText,
  icon: Icon,
  className,
}: StatCardProps) {
  return (
    <Card className={cn(className)}>
      <CardContent className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
            {value}
          </span>
          <span className="text-xs text-muted-foreground">{helpText}</span>
        </div>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  )
}
