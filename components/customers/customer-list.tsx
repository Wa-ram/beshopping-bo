"use client";

import { useState } from "react";
import { CustomerTable } from "./customer-table";
import { EmptyState } from "./empty-state";
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

  if (!data?.customers || data.customers.length === 0) {
    return <EmptyState />;
  }

  const { customers, pagination } = data;
  const { current_page, total, per_page, last_page } = pagination;

  return (
    <div className="space-y-4">
      <CustomerTable customers={customers} />

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing {per_page} of {total} customers
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={current_page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            disabled={current_page >= last_page}
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