"use client"

import { useId, useState, type FormEvent } from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CANTON_NAMES } from "@/lib/data"

export function AddRestaurantDialog() {
  const [open, setOpen] = useState(false)
  const nameId = useId()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = form.get("name")?.toString().trim()
    setOpen(false)
    toast.success("Restaurant ajouté", {
      description: name
        ? `${name} a été créé. Vous pouvez maintenant coller sa carte dans l'éditeur de menu.`
        : "Vous pouvez maintenant coller sa carte dans l'éditeur de menu.",
    })
    ;(event.currentTarget as HTMLFormElement).reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Plus data-icon="inline-start" />
        Ajouter un restaurant
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Ajouter un restaurant</DialogTitle>
            <DialogDescription>
              Quelques informations suffisent. Vous pourrez compléter la carte
              ensuite depuis l&apos;éditeur de menu.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-4">
            <Field>
              <FieldLabel htmlFor={nameId}>Nom du restaurant</FieldLabel>
              <Input
                id={nameId}
                name="name"
                placeholder="Ex. Café du Léman"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="canton">Canton</FieldLabel>
              <Select name="canton" defaultValue="VD">
                <SelectTrigger id="canton" className="w-full">
                  <SelectValue placeholder="Choisir un canton">
                    {(value: string) =>
                      value ? `${CANTON_NAMES[value]} (${value})` : "Choisir un canton"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.entries(CANTON_NAMES).map(([code, label]) => (
                      <SelectItem key={code} value={code}>
                        {label} ({code})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="city">Ville</FieldLabel>
              <Input id="city" name="city" placeholder="Ex. Lausanne" required />
              <FieldDescription>
                Le QR code et la page de menu sont générés automatiquement dès
                la création.
              </FieldDescription>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Annuler
            </DialogClose>
            <Button type="submit">Créer le restaurant</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
