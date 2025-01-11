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
          current_page: response.current_page,
          last_page: response.last_page,
          total: response.total,
          per_page: response.per_page,
        },
      };
    },
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });

  // Prefetch next page
  const prefetchNextPage = () => {
    if (!query.data) return;

    const { current_page, last_page } = query.data.pagination;

    if (current_page < last_page) {
      queryClient.prefetchQuery({
        queryKey: ["products", page + 1],
        queryFn: async () => {
          const response = await getProducts(page + 1);
          return {
            products: response.data.map(mapAPIProductToProduct),
            pagination: {
              current_page: response.current_page,
              last_page: response.last_page,
              total: response.total,
              per_page: response.per_page,
            },
          };
        },
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