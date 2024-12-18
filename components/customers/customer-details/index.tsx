"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useCustomerStore } from "@/lib/stores/customer-store"
import { Customer } from "@/lib/types/customer"
import { CustomerInfo } from "./customer-info"
import { CustomerStats } from "./customer-stats"
import { CustomerTabs } from "./customer-tabs"

export function CustomerDetails() {
  const router = useRouter()
  const params = useParams()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const { customers } = useCustomerStore()

  useEffect(() => {
    // Simulate API call
    const fetchCustomer = async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      const found = customers.find(c => c.id === params.id)
      setCustomer(found || null)
    }
    fetchCustomer()
  }, [customers, params.id])

  if (!customer) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">
          {customer.firstName} {customer.lastName}
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <CustomerInfo customer={customer} />
        <CustomerStats customer={customer} />
      </div>

      <CustomerTabs customer={customer} />
    </div>
  )
}