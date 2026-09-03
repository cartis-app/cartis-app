"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutGrid, Store, UtensilsCrossed, LifeBuoy } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Vue d'ensemble",
    subtitle: "Le Hall",
    url: "/",
    icon: LayoutGrid,
  },
  {
    title: "Mes restaurants",
    subtitle: "Le Registre",
    url: "/restaurants",
    icon: Store,
  },
  {
    title: "Éditeur de menu",
    subtitle: "La Suite Royale",
    url: "/editeur-de-menu",
    icon: UtensilsCrossed,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/" />}
              className="hover:bg-transparent active:bg-transparent"
            >
              <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-sidebar-accent">
                <Image
                  src="/images/cartis-logo.png"
                  alt=""
                  width={32}
                  height={32}
                  className="size-6 object-contain"
                />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold tracking-tight">CARTIS</span>
                <span className="text-xs text-sidebar-foreground/60">
                  L&apos;hôtel des menus
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Votre espace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      size="lg"
                      isActive={isActive}
                      tooltip={item.title}
                      render={<Link href={item.url} />}
                    >
                      <item.icon />
                      <div className="flex flex-col leading-tight">
                        <span>{item.title}</span>
                        <span className="text-xs text-sidebar-foreground/55 group-data-[collapsible=icon]:hidden">
                          {item.subtitle}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Besoin d'aide ?">
              <LifeBuoy />
              <span>Besoin d&apos;aide ?</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
