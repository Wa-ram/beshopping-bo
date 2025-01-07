"use client";

// import { useEffect } from "react";
// import { useCollectionStore } from "@/lib/stores/collection-store";
import { CollectionTable } from "./collection-table";
import { EmptyState } from "./empty-state";
// import { mockCollections } from "@/lib/mock/collections";
import { useCollections } from "@/hooks/use-collections";

export function CollectionList() {
  const { data: collections = [], isLoading, error } = useCollections();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading collections</div>;
  }

  if (collections.length === 0) {
    return <EmptyState />;
  }

  return <CollectionTable collections={collections} />;
}
