import { Suspense } from "react"
import { DiscountList } from "@/components/discounts/discount-list"
import { DiscountHeader } from "@/components/discounts/discount-header"
import { DiscountTableSkeleton } from "@/components/discounts/discount-table-skeleton"

export default function DiscountsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DiscountHeader />
      <Suspense fallback={<DiscountTableSkeleton />}>
        <DiscountList />
      </Suspense>
    </div>
  )
}