import type { CantonScan, MenuData, Restaurant } from "@/lib/types"

export const CANTON_NAMES: Record<string, string> = {
  VD: "Vaud",
  GE: "Genève",
  VS: "Valais",
  FR: "Fribourg",
  NE: "Neuchâtel",
  BE: "Berne",
}

export const cantonScans: CantonScan[] = [
  { code: "VD", name: "Vaud", scans: 1284 },
  { code: "GE", name: "Genève", scans: 968 },
  { code: "VS", name: "Valais", scans: 742 },
  { code: "BE", name: "Berne", scans: 511 },
  { code: "FR", name: "Fribourg", scans: 398 },
  { code: "NE", name: "Neuchâtel", scans: 233 },
]

export const totalScans = cantonScans.reduce((sum, c) => sum + c.scans, 0)

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Café du Léman",
    canton: "VD",
    city: "Lausanne",
    status: "actif",
    scans30j: 412,
    lastUpdated: "28 août 2026",
    menuUrl: "cartis.ch/m/cafe-du-leman",
  },
  {
    id: "r2",
    name: "Brasserie des Alpes",
    canton: "VS",
    city: "Sion",
    status: "actif",
    scans30j: 298,
    lastUpdated: "31 août 2026",
    menuUrl: "cartis.ch/m/brasserie-des-alpes",
  },
  {
    id: "r3",
    name: "Le Vieux Genève",
    canton: "GE",
    city: "Genève",
    status: "en_pause",
    scans30j: 0,
    lastUpdated: "12 juillet 2026",
    menuUrl: "cartis.ch/m/le-vieux-geneve",
  },
  {
    id: "r4",
    name: "Auberge du Lac",
    canton: "NE",
    city: "Neuchâtel",
    status: "actif",
    scans30j: 156,
    lastUpdated: "2 septembre 2026",
    menuUrl: "cartis.ch/m/auberge-du-lac",
  },
  {
    id: "r5",
    name: "Restaurant Bärengraben",
    canton: "BE",
    city: "Berne",
    status: "actif",
    scans30j: 221,
    lastUpdated: "30 août 2026",
    menuUrl: "cartis.ch/m/barengraben",
  },
  {
    id: "r6",
    name: "Table Gruyérienne",
    canton: "FR",
    city: "Gruyères",
    status: "en_pause",
    scans30j: 0,
    lastUpdated: "5 juin 2026",
    menuUrl: "cartis.ch/m/table-gruyerienne",
  },
]

export const sampleMenuJson: MenuData = {
  restaurant: "Café du Léman",
  subtitle: "Cuisine de saison, produits du lac et du terroir vaudois",
  categories: [
    {
      name: "Entrées",
      items: [
        {
          name: "Salade de chèvre chaud",
          price: 15.5,
          description: "Salade verte, chèvre pané, miel de la région, noix",
          tags: ["vegetarien"],
        },
        {
          name: "Filets de perche du lac",
          price: 19.0,
          description: "Filets de perche meunière, sauce tartare maison",
        },
        {
          name: "Velouté de courge",
          price: 12.0,
          description: "Courge butternut, crème, graines de courge torréfiées",
          tags: ["vegetarien", "vegan"],
        },
      ],
    },
    {
      name: "Plats",
      items: [
        {
          name: "Filets de perche, sauce au vin blanc",
          price: 32.0,
          description: "Servis avec pommes vapeur et légumes du marché",
          tags: ["plat_du_jour"],
        },
        {
          name: "Entrecôte de bœuf suisse",
          price: 38.5,
          description: "200g, sauce aux morilles, frites maison",
        },
        {
          name: "Risotto aux champignons des bois",
          price: 26.0,
          description: "Riz carnaroli, champignons de saison, parmesan",
          tags: ["vegetarien", "sans_gluten"],
        },
      ],
    },
    {
      name: "Desserts",
      items: [
        {
          name: "Tarte aux abricots du Valais",
          price: 9.5,
          description: "Pâte maison, crème vanille",
          tags: ["vegetarien"],
        },
        {
          name: "Mousse au chocolat noir",
          price: 8.5,
          description: "Chocolat 70%, éclats de noisettes",
          tags: ["vegetarien", "sans_gluten"],
        },
      ],
    },
  ],
}
