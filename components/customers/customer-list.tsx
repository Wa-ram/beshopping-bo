"use client";

import { useState } from "react";
// import { useEffect } from "react";
// import { useCustomerStore } from "@/lib/stores/customer-store";
import { CustomerTable } from "./customer-table";
import { EmptyState } from "./empty-state";
// import { mockCustomers } from "@/lib/mock/customers";
import { useCustomers } from "@/hooks/use-customers";
import { Button } from "../ui/button";

export function CustomerList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, prefetchNextPage } = useCustomers(page);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading customers</div>;
  }

  if (!data || data.customers.length === 0) {
    return <EmptyState />;
  }

  const { customers, pagination } = data;

  return (
    <div className="space-y-4">
      <CustomerTable customers={customers} />

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing {pagination.perPage} of {pagination.total} customers
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
            disabled={page >= pagination.totalPages}
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
