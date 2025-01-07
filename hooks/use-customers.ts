"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCustomers } from "@/lib/api/customers";
import { mapAPICustomerToCustomer } from "@/lib/utils/mapAPICustomerToCustomer";

export function useCustomers() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const apiCustomers = await fetchCustomers();
      return apiCustomers.map(mapAPICustomerToCustomer);
    },
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });

  const invalidateCustomers = () => {
    queryClient.invalidateQueries({ queryKey: ["customers"] });
  };

  return {
    ...query,
    invalidateCustomers,
  };
}
