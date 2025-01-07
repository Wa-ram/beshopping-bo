"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCollections } from "@/lib/api/collections";
import { mapAPICollectionToCollection } from "@/lib/utils/mapAPICollectionToCollection";

export function useCollections(page: number = 1) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["collections", page],
    queryFn: async () => {
      const response = await fetchCollections(page);
      return {
        collections: response.data.map(mapAPICollectionToCollection),
        pagination: {
          currentPage: response.current_page,
          totalPages: response.last_page,
          total: response.total,
          perPage: response.per_page,
        },
      };
    },
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });

  // Prefetch next page
  const prefetchNextPage = () => {
    const currentPage = query?.data?.pagination?.currentPage ?? 0;
    const totalPages = query?.data?.pagination?.totalPages ?? 0;

    if (currentPage < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["collections", page + 1],
        queryFn: () => fetchCollections(page + 1),
      });
    }
  };

  return {
    ...query,
    prefetchNextPage,
  };
}
