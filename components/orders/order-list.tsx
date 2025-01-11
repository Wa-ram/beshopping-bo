"use client";

// import { useEffect } from "react";
// import { useOrderStore } from "@/lib/stores/order-store";
import { OrderTable } from "./order-table";
import { EmptyState } from "./empty-state";
// import { mockOrders } from "@/lib/mock/orders";
import { useOrders } from "@/hooks/use-orders";
import { useState } from "react";
import { Button } from "../ui/button";

export function OrderList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, prefetchNextPage } = useOrders(page);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading orders</div>;
  }

  if (!data || data.orders.length === 0) {
    return <EmptyState />;
  }

  const { orders, pagination } = data;

  return (
    <div className="space-y-4">
      <OrderTable orders={orders} />

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing {pagination.per_page} of {pagination.total} orders
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            disabled={page >= pagination.last_page}
            onClick={() => {
              setPage((p) => p + 1);
              prefetchNextPage();
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
