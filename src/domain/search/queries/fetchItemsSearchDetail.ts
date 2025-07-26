import ApiClient from '@/shared/lib/api-client';
import { ApiEndpoint } from '@/shared/types/api-endpoint';
import type { Response } from '@/shared/types/response';

const ITEMS_SEARCH_DETAIL_REVALIDATE_MS = 60;

export type ItemsSearchDetailProps = {
  lostItemId: number;
};

interface ItemsSearchDetailData {
  lostItemId: number;
  name: string;
  date: string;
  location: string;
  category: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
}

export type ItemsSearchDetailResponse = Response<ItemsSearchDetailData>;

export async function fetchItemsSearchDetail({
  lostItemId,
}: ItemsSearchDetailProps): Promise<ItemsSearchDetailResponse> {
  return await ApiClient.get(`${ApiEndpoint.ITEMS_SEARCH_DETAIL}/${lostItemId}`, {
    next: {
      revalidate: ITEMS_SEARCH_DETAIL_REVALIDATE_MS,
    },
  }).json();
}
