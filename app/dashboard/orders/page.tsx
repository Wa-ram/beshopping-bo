import { Suspense } from "react"
import { OrderList } from "@/components/orders/order-list"
import { OrderHeader } from "@/components/orders/order-header"
import { OrderTableSkeleton } from "@/components/orders/order-table-skeleton"

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <OrderHeader />
      <Suspense fallback={<OrderTableSkeleton />}>
        <OrderList />
      </Suspense>
    </div>
  )
}