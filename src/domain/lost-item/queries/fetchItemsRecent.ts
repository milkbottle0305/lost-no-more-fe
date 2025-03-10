import ApiClient from '@/shared/lib/api-client';
import { ApiEndpoint } from '@/shared/types/api-endpoint';
import type { Response } from '@/shared/types/response';

const ITEMS_COUNT_REVALIDATE_MS = 60;

interface ItemsRecentData {
  recentItems: {
    lostItemId: number;
    name: string;
    date: string;
    location: string;
    category: string;
    imageUrl: string;
  }[];
}

export type ItemsRecentResponse = Response<ItemsRecentData>;

export async function fetchItemsRecent(): Promise<ItemsRecentResponse> {
  return await ApiClient.get(ApiEndpoint.ITEMS_RECENT, {
    next: {
      revalidate: ITEMS_COUNT_REVALIDATE_MS,
    },
  }).json();
}
