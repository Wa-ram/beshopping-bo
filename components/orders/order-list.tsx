"use client";

// import { useEffect } from "react";
// import { useOrderStore } from "@/lib/stores/order-store";
import { OrderTable } from "./order-table";
import { EmptyState } from "./empty-state";
// import { mockOrders } from "@/lib/mock/orders";
import { useOrders } from "@/hooks/use-orders";

export function OrderList() {
  const { data: orders = [], isLoading, error } = useOrders();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading orders</div>;
  }

  if (orders.length === 0) {
    return <EmptyState />;
  }

  return <OrderTable orders={orders} />;
}
