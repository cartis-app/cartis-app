import { UtensilsCrossed } from "lucide-react"

import { MenuTagBadge } from "@/components/menu/menu-tag-badge"
import { Separator } from "@/components/ui/separator"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import type { MenuData } from "@/lib/types"

function formatPrice(price: number) {
  return `CHF ${price.toFixed(2).replace(".", ".")}`
}

export function MenuPreview({ menu }: { menu: MenuData | null }) {
  if (!menu || menu.categories.length === 0) {
    return (
      <Empty className="py-10">
        <EmptyMedia variant="icon">
          <UtensilsCrossed />
        </EmptyMedia>
        <EmptyTitle>Aucun menu à afficher</EmptyTitle>
        <EmptyDescription>
          Collez le JSON de votre carte pour voir l&apos;aperçu apparaître ici.
        </EmptyDescription>
      </Empty>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1 text-center">
        <h3 className="text-lg font-semibold tracking-tight text-balance">
          {menu.restaurant}
        </h3>
        {menu.subtitle ? (
          <p className="text-xs text-muted-foreground text-pretty">
            {menu.subtitle}
          </p>
        ) : null}
      </div>

      {menu.categories.map((category, index) => (
        <div key={category.name} className="flex flex-col gap-3">
          {index > 0 ? <Separator /> : null}
          <h4 className="text-xs font-semibold tracking-wide text-primary uppercase">
            {category.name}
          </h4>
          <div className="flex flex-col gap-3.5">
            {category.items.map((item) => (
              <div key={item.name} className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium text-balance">
                    {item.name}
                  </span>
                  <span className="shrink-0 text-sm font-medium tabular-nums text-muted-foreground">
                    {formatPrice(item.price)}
                  </span>
                </div>
                {item.description ? (
                  <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
                    {item.description}
                  </p>
                ) : null}
                {item.tags && item.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {item.tags.map((tag) => (
                      <MenuTagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
