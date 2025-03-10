import { useQuery } from '@tanstack/react-query';

import { type ItemsRecentResponse, fetchItemsRecent } from './fetchItemsRecent';

export function useItemsRecentQuery() {
  return useQuery<ItemsRecentResponse>({
    queryKey: ['itemsRecent'],
    queryFn: fetchItemsRecent,
  });
}
