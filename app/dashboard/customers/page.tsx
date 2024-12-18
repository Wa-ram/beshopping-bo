import { Suspense } from "react"
import { CustomerList } from "@/components/customers/customer-list"
import { CustomerHeader } from "@/components/customers/customer-header"
import { CustomerTableSkeleton } from "@/components/customers/customer-table-skeleton"

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <CustomerHeader />
      <Suspense fallback={<CustomerTableSkeleton />}>
        <CustomerList />
      </Suspense>
    </div>
  )
}