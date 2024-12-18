"use client"

import { useEffect } from "react"
import { useCustomerStore } from "@/lib/stores/customer-store"
import { CustomerTable } from "./customer-table"
import { EmptyState } from "./empty-state"
import { mockCustomers } from "@/lib/mock/customers"

export function CustomerList() {
  const { customers, setCustomers } = useCustomerStore()

  useEffect(() => {
    // Simulate API call
    const fetchCustomers = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCustomers(mockCustomers)
    }
    fetchCustomers()
  }, [setCustomers])

  if (customers.length === 0) {
    return <EmptyState />
  }

  return <CustomerTable customers={customers} />
}