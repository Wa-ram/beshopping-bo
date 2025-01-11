"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCustomers } from "@/lib/api/customers";
import { mapAPICustomerToCustomer } from "@/lib/utils/mapAPICustomerToCustomer";

export function useCustomers(page: number = 1) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["customers", page],
    queryFn: async () => {
      const response = await fetchCustomers(page);
      return {
        customers: response.data.map(mapAPICustomerToCustomer),
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
        queryKey: ["customers", page + 1],
        queryFn: async () => fetchCustomers(page + 1),
      });
    }
  };

  return {
    ...query,
    prefetchNextPage,
  };
}