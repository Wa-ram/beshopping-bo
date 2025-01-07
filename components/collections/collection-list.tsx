"use client";

import { useState } from "react";
// import { useEffect } from "react";
// import { useCollectionStore } from "@/lib/stores/collection-store";
import { CollectionTable } from "./collection-table";
import { EmptyState } from "./empty-state";
// import { mockCollections } from "@/lib/mock/collections";
import { useCollections } from "@/hooks/use-collections";
import { Button } from "../ui/button";

export function CollectionList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, prefetchNextPage } = useCollections(page);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading collections</div>;
  }

  if (!data || data.collections.length === 0) {
    return <EmptyState />;
  }

  const { collections, pagination } = data;

  return (
    <div className="space-y-4">
      <CollectionTable collections={collections} />

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing {pagination.perPage} of {pagination.total} collections
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
