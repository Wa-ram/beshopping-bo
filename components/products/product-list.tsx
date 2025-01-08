"use client";

import { useState } from "react";
import { ProductTable } from "./product-table";
import { EmptyState } from "./empty-state";
import { useProducts } from "@/hooks/use-products";
import { Button } from "../ui/button";

export function ProductList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, prefetchNextPage } = useProducts(page);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  if (!data || data.products.length === 0) {
    return <EmptyState />;
  }

  const { products, pagination } = data;

  return (
    <div className="space-y-4">
      <ProductTable products={products} />

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing {pagination.perPage} of {pagination.total} products
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
