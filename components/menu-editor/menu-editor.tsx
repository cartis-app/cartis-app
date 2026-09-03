"use client"

import { useMemo, useState } from "react"
import { AlertCircle, CheckCircle2, ClipboardPaste, Smartphone } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MenuPreview } from "@/components/menu/menu-preview"
import { PhoneFrame } from "@/components/menu/phone-frame"
import { Textarea } from "@/components/ui/textarea"
import { sampleMenuJson } from "@/lib/data"
import { parseMenuJson } from "@/lib/menu-json"

export function MenuEditor() {
  const [raw, setRaw] = useState("")

  const result = useMemo(() => parseMenuJson(raw), [raw])
  const hasContent = raw.trim().length > 0

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <CardHeader>
          <CardTitle>Collez le JSON de votre carte</CardTitle>
          <CardDescription>
            Chaque catégorie contient une liste de plats avec un nom, un prix
            et une description. Générez ce JSON avec l&apos;IA de votre choix
            à partir de votre carte actuelle, puis collez-le ici.
          </CardDescription>
          <CardAction>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRaw(JSON.stringify(sampleMenuJson, null, 2))}
            >
              <ClipboardPaste data-icon="inline-start" />
              Charger un exemple
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Textarea
            value={raw}
            onChange={(event) => setRaw(event.target.value)}
            placeholder={`{\n  "restaurant": "Nom de votre établissement",\n  "categories": [\n    {\n      "name": "Entrées",\n      "items": [\n        { "name": "Salade verte", "price": 12.5, "description": "..." }\n      ]\n    }\n  ]\n}`}
            className="h-[360px] max-h-[360px] resize-none overflow-y-auto font-mono text-xs leading-relaxed"
            spellCheck={false}
          />

          {hasContent && result.error ? (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Format non reconnu</AlertTitle>
              <AlertDescription>{result.error}</AlertDescription>
            </Alert>
          ) : null}

          {hasContent && result.data ? (
            <Alert>
              <CheckCircle2 />
              <AlertTitle>Menu valide</AlertTitle>
              <AlertDescription>
                {result.data.categories.length} catégorie
                {result.data.categories.length > 1 ? "s" : ""} détectée
                {result.data.categories.length > 1 ? "s" : ""}. L&apos;aperçu
                à droite reflète exactement ce que verront vos clients.
              </AlertDescription>
            </Alert>
          ) : null}

          <p className="text-xs text-muted-foreground">
            Format attendu : un objet avec &quot;restaurant&quot; et
            &quot;categories&quot;. Les prix s&apos;écrivent en nombre (ex.
            15.50), sans le symbole CHF.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-secondary/40">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Smartphone className="size-4 text-primary" />
            <CardTitle className="text-base">Aperçu client, en direct</CardTitle>
          </div>
          <CardDescription>
            Exactement ce qui s&apos;affiche quand un client scanne votre QR
            code.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-8">
          <PhoneFrame>
            <MenuPreview menu={result.data ?? null} />
          </PhoneFrame>
        </CardContent>
      </Card>
    </div>
  )
}
