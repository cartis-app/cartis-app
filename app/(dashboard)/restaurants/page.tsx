import { AddRestaurantDialog } from "@/components/restaurants/add-restaurant-dialog"
import { RestaurantsTable } from "@/components/restaurants/restaurants-table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function RestaurantsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <CardTitle>Vos établissements</CardTitle>
            <CardDescription>
              Un menu à jour, un QR code, et le serveur qui garde la main sur
              la commande.
            </CardDescription>
          </div>
          <AddRestaurantDialog />
        </CardHeader>
        <CardContent>
          <RestaurantsTable />
        </CardContent>
      </Card>
    </div>
  )
}
