"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/products";
import { mapAPIProductToProduct } from "@/lib/utils/mapAPIProductToProduct";

export function useProducts(page: number = 1) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const response = await getProducts(page);
      return {
        products: response.data.map(mapAPIProductToProduct),
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
    const currentPage = query.data?.pagination.currentPage ?? 0;
    const totalPages = query?.data?.pagination?.totalPages ?? 0;

    if (currentPage < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["products", page + 1],
        queryFn: () => getProducts(page + 1),
      });
    }
  };

  const invalidateProducts = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  return {
    ...query,
    prefetchNextPage,
    invalidateProducts,
  };
}
