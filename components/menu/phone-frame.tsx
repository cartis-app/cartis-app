import type { ReactNode } from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative mx-auto flex h-[600px] w-[290px] flex-col rounded-[2.25rem] border-8 border-foreground/85 bg-card p-2 shadow-lg",
        className
      )}
    >
      <div className="absolute top-2 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-foreground/85" />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.5rem] bg-background">
        <ScrollArea className="h-full">
          <div className="px-5 pt-9 pb-6">{children}</div>
        </ScrollArea>
      </div>
    </div>
  )
}
