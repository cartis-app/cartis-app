import type { MenuData } from "@/lib/types"

type ParseResult =
  | { data: MenuData; error?: undefined }
  | { data?: undefined; error: string }

export function parseMenuJson(raw: string): ParseResult {
  if (!raw.trim()) {
    return { error: "Le champ est vide. Collez le JSON de votre menu pour voir l'aperçu." }
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return {
      error:
        "Ce texte n'est pas un JSON valide. Vérifiez les virgules et les accolades.",
    }
  }

  if (typeof parsed !== "object" || parsed === null) {
    return { error: "Le JSON doit être un objet contenant votre menu." }
  }

  const obj = parsed as Record<string, unknown>

  if (typeof obj.restaurant !== "string" || obj.restaurant.trim() === "") {
    return {
      error: "Le champ \"restaurant\" (texte) est manquant ou vide.",
    }
  }

  if (!Array.isArray(obj.categories)) {
    return {
      error: "Le champ \"categories\" doit être une liste de catégories.",
    }
  }

  for (const [index, category] of obj.categories.entries()) {
    if (typeof category !== "object" || category === null) {
      return {
        error: `La catégorie n°${index + 1} doit être un objet avec "name" et "items".`,
      }
    }

    const cat = category as Record<string, unknown>

    if (typeof cat.name !== "string" || cat.name.trim() === "") {
      return {
        error: `La catégorie n°${index + 1} doit avoir un champ "name" (texte).`,
      }
    }

    if (!Array.isArray(cat.items)) {
      return {
        error: `La catégorie "${cat.name}" doit contenir une liste "items".`,
      }
    }

    for (const [itemIndex, item] of cat.items.entries()) {
      if (typeof item !== "object" || item === null) {
        return {
          error: `Un plat de la catégorie "${cat.name}" (n°${itemIndex + 1}) est invalide.`,
        }
      }

      const menuItem = item as Record<string, unknown>

      if (typeof menuItem.name !== "string" || menuItem.name.trim() === "") {
        return {
          error: `Chaque plat doit avoir un "name" (texte). Vérifiez la catégorie "${cat.name}".`,
        }
      }

      if (typeof menuItem.price !== "number") {
        return {
          error: `Le plat "${menuItem.name}" doit avoir un "price" (nombre), sans le symbole CHF.`,
        }
      }
    }
  }

  return { data: obj as unknown as MenuData }
}
