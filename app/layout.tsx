import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "CARTIS — Le menu digital pour votre restaurant",
  description:
    "CARTIS transforme votre carte papier en menu digital à scanner. Simple, fiable, toujours à jour. Sans application à télécharger.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3a2a1a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr-CH"
      suppressHydrationWarning
      className={cn("antialiased bg-background", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
