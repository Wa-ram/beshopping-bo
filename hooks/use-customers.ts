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
        queryKey: ["customers", page + 1],
        queryFn: () => fetchCustomers(page + 1),
      });
    }
  };

  return {
    ...query,
    prefetchNextPage,
  };
}
