import { useQuery } from '@tanstack/react-query';

import {
  type ItemsSearchListProps,
  type ItemsSearchListResponse,
  fetchItemsSearchList,
} from './fetchItemsSearchList';

export function useItemsSearchListQuery(props: ItemsSearchListProps) {
  return useQuery<ItemsSearchListResponse>({
    queryKey: ['itemsSearchList', props],
    queryFn: () => fetchItemsSearchList(props),
  });
}
