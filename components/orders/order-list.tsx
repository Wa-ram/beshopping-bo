"use client"

import { useEffect } from "react"
import { useOrderStore } from "@/lib/stores/order-store"
import { OrderTable } from "./order-table"
import { EmptyState } from "./empty-state"
import { mockOrders } from "@/lib/mock/orders"

export function OrderList() {
  const { orders, setOrders } = useOrderStore()

  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setOrders(mockOrders)
    }
    fetchOrders()
  }, [setOrders])

  if (orders.length === 0) {
    return <EmptyState />
  }

  return <OrderTable orders={orders} />
}