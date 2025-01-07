'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCollections } from '@/lib/api/collections';
import { mapAPICollectionToCollection } from '@/lib/utils/mapAPICollectionToCollection';

export function useCollections() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const apiCollections = await fetchCollections();
      return apiCollections.map(mapAPICollectionToCollection);
    },
  });

  const invalidateCollections = () => {
    queryClient.invalidateQueries({ queryKey: ['collections'] });
  };

  return {
    ...query,
    invalidateCollections,
  };
}