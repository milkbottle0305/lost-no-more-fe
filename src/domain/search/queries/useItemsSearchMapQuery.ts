import { useQuery } from '@tanstack/react-query';

import {
  type ItemsSearchMapProps,
  type ItemsSearchMapResponse,
  fetchItemsSearchMap,
} from './fetchItemsSearchMap';

export function useItemsSearchMapQuery(props: ItemsSearchMapProps, enabled: boolean) {
  return useQuery<ItemsSearchMapResponse>({
    queryKey: ['itemsSearchMap', props],
    queryFn: () => fetchItemsSearchMap(props),
    enabled,
  });
}
