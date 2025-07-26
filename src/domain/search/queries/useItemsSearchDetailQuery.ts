import { useQuery } from '@tanstack/react-query';

import {
  type ItemsSearchDetailProps,
  type ItemsSearchDetailResponse,
  fetchItemsSearchDetail,
} from './fetchItemsSearchDetail';

export function useItemsSearchDetailQuery(props: ItemsSearchDetailProps) {
  return useQuery<ItemsSearchDetailResponse>({
    queryKey: ['itemsSearchList', props],
    queryFn: () => fetchItemsSearchDetail(props),
  });
}
