"use client"

import { useState } from "react"
import { Eye, QrCode } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { MenuPreviewSheet } from "@/components/restaurants/menu-preview-sheet"
import { CANTON_NAMES, restaurants as initialRestaurants } from "@/lib/data"
import type { Restaurant } from "@/lib/types"
import { cn } from "@/lib/utils"

export function RestaurantsTable() {
  const [restaurants, setRestaurants] = useState(initialRestaurants)
  const [previewRestaurant, setPreviewRestaurant] = useState<Restaurant | null>(
    null
  )
  const [sheetOpen, setSheetOpen] = useState(false)

  function toggleStatus(restaurant: Restaurant) {
    const nextStatus =
      restaurant.status === "actif" ? "en_pause" : "actif"

    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurant.id ? { ...r, status: nextStatus } : r
      )
    )

    toast(
      nextStatus === "actif"
        ? `Menu de ${restaurant.name} remis en ligne`
        : `Menu de ${restaurant.name} mis en pause`,
      {
        description:
          nextStatus === "actif"
            ? "Le QR code renvoie de nouveau vers votre carte."
            : "Le QR code affiche un message d'indisponibilité temporaire.",
      }
    )
  }

  function openPreview(restaurant: Restaurant) {
    setPreviewRestaurant(restaurant)
    setSheetOpen(true)
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Restaurant</TableHead>
              <TableHead>Canton</TableHead>
              <TableHead>Scans (30j)</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Menu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{restaurant.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {restaurant.city} · mis à jour le {restaurant.lastUpdated}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {CANTON_NAMES[restaurant.canton]}
                  </Badge>
                </TableCell>
                <TableCell className="tabular-nums text-muted-foreground">
                  {restaurant.scans30j > 0
                    ? restaurant.scans30j.toLocaleString("fr-CH")
                    : "—"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={restaurant.status === "actif"}
                      onCheckedChange={() => toggleStatus(restaurant)}
                      aria-label={
                        restaurant.status === "actif"
                          ? `Mettre en pause ${restaurant.name}`
                          : `Réactiver ${restaurant.name}`
                      }
                    />
                    <span
                      className={cn(
                        "text-sm",
                        restaurant.status === "actif"
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {restaurant.status === "actif" ? "Actif" : "En pause"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast("QR code copié", {
                          description: `Lien ${restaurant.menuUrl} prêt à être partagé avec vos équipes.`,
                        })
                      }}
                    >
                      <QrCode data-icon="inline-start" />
                      QR code
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => openPreview(restaurant)}
                    >
                      <Eye data-icon="inline-start" />
                      Voir le menu
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Activez ou mettez en pause votre menu en un clic. Partagez le QR avec
        vos équipes pour qu&apos;il soit affiché en salle.
      </p>
      <MenuPreviewSheet
        restaurant={previewRestaurant}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </>
  )
}
