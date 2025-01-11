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
        queryKey: ["orders", page + 1],
        queryFn: async () => fetchOrders(page + 1),
      });
    }
  };

  return {
    ...query,
    prefetchNextPage,
  };
}