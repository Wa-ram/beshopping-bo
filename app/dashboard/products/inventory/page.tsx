import { Suspense } from "react"
import { InventoryList } from "@/components/inventory/inventory-list"
import { InventoryHeader } from "@/components/inventory/inventory-header"
import { InventoryTableSkeleton } from "@/components/inventory/inventory-table-skeleton"

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <InventoryHeader />
      <Suspense fallback={<InventoryTableSkeleton />}>
        <InventoryList />
      </Suspense>
    </div>
  )
}