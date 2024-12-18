import { Suspense } from "react"
import { OrderDetails } from "@/components/orders/order-details"
import { OrderDetailsSkeleton } from "@/components/orders/order-details/order-details-skeleton"
import { mockOrders } from "@/lib/mock/orders"

export function generateStaticParams() {
  return mockOrders.map((order) => ({
    id: order.id,
  }))
}

export default function OrderDetailsPage() {
  return (
    <Suspense fallback={<OrderDetailsSkeleton />}>
      <OrderDetails />
    </Suspense>
  )
}