"use client"

import { QrCode } from "lucide-react"

import { MenuPreview } from "@/components/menu/menu-preview"
import { PhoneFrame } from "@/components/menu/phone-frame"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { sampleMenuJson } from "@/lib/data"
import type { Restaurant } from "@/lib/types"

export function MenuPreviewSheet({
  restaurant,
  open,
  onOpenChange,
}: {
  restaurant: Restaurant | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const menu = restaurant
    ? { ...sampleMenuJson, restaurant: restaurant.name }
    : null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <QrCode className="size-4 text-primary" />
            Aperçu client
          </SheetTitle>
          <SheetDescription>
            {restaurant
              ? `Ce que voit un client qui scanne le QR de ${restaurant.name}.`
              : "Aperçu du menu tel que le client le voit sur son téléphone."}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-auto px-4 pb-6">
          <PhoneFrame>
            <MenuPreview menu={menu} />
          </PhoneFrame>
        </div>
      </SheetContent>
    </Sheet>
  )
}
