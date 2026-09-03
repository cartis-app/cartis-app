"use client"

import { usePathname } from "next/navigation"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/": {
    title: "Vue d'ensemble",
    subtitle: "Le Hall — l'activité de vos menus, en un coup d'œil",
  },
  "/restaurants": {
    title: "Mes restaurants",
    subtitle: "Le Registre — gérez vos établissements et leurs menus",
  },
  "/editeur-de-menu": {
    title: "Éditeur de menu",
    subtitle: "La Suite Royale — mettez votre carte à jour en quelques minutes",
  },
}

export function SiteHeader() {
  const pathname = usePathname()
  const meta = pageMeta[pathname] ?? pageMeta["/"]

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80 sm:px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-6" />
      <div className="flex min-w-0 flex-col leading-tight">
        <h1 className="truncate text-sm font-semibold sm:text-base">{meta.title}</h1>
        <p className="hidden truncate text-xs text-muted-foreground sm:block">
          {meta.subtitle}
        </p>
      </div>
    </header>
  )
}
