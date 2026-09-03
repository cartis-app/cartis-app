"use client"

import { useEffect, useMemo, useState } from "react"
import { Lightbulb, QrCode, Store, TrendingUp } from "lucide-react"

import { CantonHeatmap } from "@/components/overview/canton-heatmap"
import { StatCard } from "@/components/overview/stat-card"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  periodCantonScans,
  periodHeatmapDescriptions,
  periodLabels,
  periodStatLabels,
  restaurants,
} from "@/lib/data"
import type { CantonScan, Period } from "@/lib/types"

const PERIOD_ORDER: Period[] = ["today", "7d", "30d", "all"]

const PERIOD_HELP_TEXT: Record<Period, string> = {
  today: "Depuis l'ouverture, actualisé toutes les 5 secondes",
  "7d": "Tous vos établissements confondus",
  "30d": "Tous vos établissements confondus",
  all: "Tous vos établissements confondus",
}

function sumScans(cantons: CantonScan[]) {
  return cantons.reduce((sum, c) => sum + c.scans, 0)
}

export function OverviewDashboard() {
  const [period, setPeriod] = useState<Period>("today")
  const [liveCantons, setLiveCantons] = useState<CantonScan[]>(
    () => periodCantonScans.today
  )

  useEffect(() => {
    if (period !== "today") return

    const baseline = periodCantonScans.today
    const baselineTotal = sumScans(baseline)

    const interval = setInterval(() => {
      setLiveCantons((current) =>
        current.map((canton) => {
          const base = baseline.find((b) => b.code === canton.code)
          const weight = base
            ? base.scans / baselineTotal
            : 1 / current.length
          const skip = Math.random() < 0.15
          const bump = skip
            ? 0
            : Math.max(1, Math.round(weight * (5 + Math.random() * 9)))
          return { ...canton, scans: canton.scans + bump }
        })
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [period])

  const displayedCantons =
    period === "today" ? liveCantons : periodCantonScans[period]

  const totalDisplayed = useMemo(
    () => sumScans(displayedCantons),
    [displayedCantons]
  )

  const topCanton = useMemo(
    () => [...displayedCantons].sort((a, b) => b.scans - a.scans)[0],
    [displayedCantons]
  )

  const topCantonShare = Math.round(
    (topCanton.scans / totalDisplayed) * 100
  )

  const activeCount = restaurants.filter((r) => r.status === "actif").length

  function handlePeriodChange(value: string[]) {
    const next = value[0] as Period | undefined
    if (!next) return
    setPeriod(next)
    if (next === "today") {
      setLiveCantons(periodCantonScans.today)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label={periodStatLabels[period]}
            value={totalDisplayed.toLocaleString("fr-CH")}
            helpText={PERIOD_HELP_TEXT[period]}
            icon={QrCode}
            live={period === "today"}
          />
          <StatCard
            label="Restaurants actifs"
            value={`${activeCount} / ${restaurants.length}`}
            helpText="Menus en ligne actuellement"
            icon={Store}
          />
          <StatCard
            label="Canton le plus actif"
            value={topCanton.name}
            helpText={`${topCantonShare}% des scans sur la période`}
            icon={TrendingUp}
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Période
          </span>
          <ToggleGroup
            value={[period]}
            onValueChange={handlePeriodChange}
            variant="outline"
            className="flex-wrap"
          >
            {PERIOD_ORDER.map((p) => (
              <ToggleGroupItem key={p} value={p}>
                {periodLabels[p]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Scans par canton</CardTitle>
            <CardDescription>
              {periodHeatmapDescriptions[period]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CantonHeatmap cantons={displayedCantons} total={totalDisplayed} />
          </CardContent>
        </Card>

        <Card className="bg-secondary/60">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
                <Lightbulb className="size-4" />
              </span>
              <CardTitle className="text-base">
                Ce que cela signifie pour vous
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {topCanton.name} concentre {topCantonShare}% des scans sur
              cette période : c&apos;est probablement là que se trouve votre
              clientèle la plus régulière. Les pics se produisent en général
              entre midi et 13h30, puis en début de soirée. Utilisez ces
              repères pour savoir quand votre carte doit être irréprochable —
              le reste du temps, vous pouvez vous concentrer sur le service.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
