import { Suspense } from "react"
import { CustomerDetails } from "@/components/customers/customer-details"
import { CustomerDetailsSkeleton } from "@/components/customers/customer-details/customer-details-skeleton"
import { mockCustomers } from "@/lib/mock/customers"

export function generateStaticParams() {
  return mockCustomers.map((customer) => ({
    id: customer.id,
  }))
}

export default function CustomerDetailsPage() {
  return (
    <Suspense fallback={<CustomerDetailsSkeleton />}>
      <CustomerDetails />
    </Suspense>
  )
}