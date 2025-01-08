"use client";

import { getProductCollections } from "@/lib/api/collections";
import { mapCollectionToOption } from "@/lib/utils/mapCollectionToOption";
import { useQuery } from "@tanstack/react-query";

export function useProductCollections() {
  return useQuery({
    queryKey: ["product-collections"],
    queryFn: async () => {
      const collections = await getProductCollections();
      return collections.map(mapCollectionToOption);
    },
  });
}
