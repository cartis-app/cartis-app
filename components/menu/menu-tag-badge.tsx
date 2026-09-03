import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { MenuItem } from "@/lib/types"

const tagLabels: Record<NonNullable<MenuItem["tags"]>[number], string> = {
  plat_du_jour: "Plat du jour",
  vegetarien: "Végétarien",
  vegan: "Vegan",
  sans_gluten: "Sans gluten",
}

export function MenuTagBadge({
  tag,
}: {
  tag: NonNullable<MenuItem["tags"]>[number]
}) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "text-[11px]",
        tag === "plat_du_jour" && "bg-primary/15 text-primary"
      )}
    >
      {tagLabels[tag]}
    </Badge>
  )
}
