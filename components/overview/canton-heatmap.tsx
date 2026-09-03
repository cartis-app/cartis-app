import type { CantonScan } from "@/lib/types"
import { cn } from "@/lib/utils"

const intensitySteps = [
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
]

function getIntensityClass(ratio: number) {
  const index = Math.min(
    intensitySteps.length - 1,
    Math.floor(ratio * intensitySteps.length)
  )
  return intensitySteps[index]
}

type CantonHeatmapProps = {
  cantons: CantonScan[]
  total: number
}

export function CantonHeatmap({ cantons, total }: CantonHeatmapProps) {
  const max = Math.max(...cantons.map((c) => c.scans))
  const sorted = [...cantons].sort((a, b) => b.scans - a.scans)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {sorted.map((canton) => {
          const ratio = canton.scans / max
          const percentOfTotal = Math.round((canton.scans / total) * 100)
          return (
            <div key={canton.code} className="flex items-center gap-3">
              <div className="flex w-24 shrink-0 flex-col leading-tight sm:w-28">
                <span className="text-sm font-medium">{canton.name}</span>
                <span className="text-xs text-muted-foreground">
                  {canton.code}
                </span>
              </div>
              <div className="relative h-8 flex-1 overflow-hidden rounded-md bg-muted">
                <div
                  className={cn(
                    "h-full rounded-md transition-[width]",
                    getIntensityClass(ratio)
                  )}
                  style={{ width: `${Math.max(ratio * 100, 6)}%` }}
                />
              </div>
              <div className="w-20 shrink-0 text-right leading-tight sm:w-24">
                <span className="text-sm font-semibold tabular-nums">
                  {canton.scans.toLocaleString("fr-CH")}
                </span>
                <span className="ml-1 text-xs text-muted-foreground">
                  ({percentOfTotal}%)
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="inline-flex h-2.5 w-16 overflow-hidden rounded-full">
          {intensitySteps.map((step) => (
            <span key={step} className={cn("h-full flex-1", step)} />
          ))}
        </span>
        <span>Moins scanné → plus scanné</span>
      </div>
    </div>
  )
}
