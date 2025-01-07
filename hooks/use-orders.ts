"use client";

import { fetchOrders } from "@/lib/api/orders";
import { mapAPIOrderToOrder } from "@/lib/utils/mapAPIOrderToOrder";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useOrders(page: number = 1) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["orders", page],
    queryFn: async () => {
      const response = await fetchOrders(page);
      return {
        orders: response.data.map(mapAPIOrderToOrder),
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
        queryKey: ["orders", page + 1],
        queryFn: () => fetchOrders(page + 1),
      });
    }
  };

  return {
    ...query,
    prefetchNextPage,
  };
}
