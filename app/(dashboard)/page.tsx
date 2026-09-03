import { QrCode, Store, TrendingUp, Lightbulb } from "lucide-react"

import { CantonHeatmap } from "@/components/overview/canton-heatmap"
import { StatCard } from "@/components/overview/stat-card"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cantonScans, restaurants, totalScans } from "@/lib/data"

export default function OverviewPage() {
  const activeCount = restaurants.filter((r) => r.status === "actif").length
  const topCanton = [...cantonScans].sort((a, b) => b.scans - a.scans)[0]
  const topCantonShare = Math.round((topCanton.scans / totalScans) * 100)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Scans depuis le lancement"
          value={totalScans.toLocaleString("fr-CH")}
          helpText="Tous vos établissements confondus"
          icon={QrCode}
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
          helpText={`${topCantonShare}% des scans totaux`}
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Scans par canton</CardTitle>
            <CardDescription>
              Répartition des lectures de QR code sur les 30 derniers jours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CantonHeatmap />
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
              {topCanton.name} concentre {topCantonShare}% des scans : c&apos;est
              probablement là que se trouve votre clientèle la plus régulière.
              Les pics se produisent en général entre midi et 13h30, puis en
              début de soirée. Utilisez ces repères pour savoir quand votre
              carte doit être irréprochable — le reste du temps, vous pouvez
              vous concentrer sur le service.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
