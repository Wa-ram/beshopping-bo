'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchOrders } from '@/lib/api/orders';
import { mapAPIOrderToOrder } from '@/lib/utils/mapAPIOrderToOrder';

export function useOrders() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const apiOrders = await fetchOrders();
      return apiOrders.map(mapAPIOrderToOrder);
    },
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });

  const invalidateOrders = () => {
    queryClient.invalidateQueries({ queryKey: ['orders'] });
  };

  return {
    ...query,
    invalidateOrders,
  };
}