export type CantonCode = "VD" | "GE" | "VS" | "FR" | "NE" | "BE"

export type RestaurantStatus = "actif" | "en_pause"

export type Restaurant = {
  id: string
  name: string
  canton: CantonCode
  city: string
  status: RestaurantStatus
  scans30j: number
  lastUpdated: string
  menuUrl: string
}

export type CantonScan = {
  code: CantonCode
  name: string
  scans: number
}

export type Period = "today" | "7d" | "30d" | "all"

export type MenuItem = {
  name: string
  price: number
  description?: string
  tags?: Array<"plat_du_jour" | "vegetarien" | "vegan" | "sans_gluten">
}

export type MenuCategory = {
  name: string
  items: MenuItem[]
}

export type MenuData = {
  restaurant: string
  subtitle?: string
  categories: MenuCategory[]
}
