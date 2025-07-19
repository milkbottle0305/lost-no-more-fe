import ApiClient from '@/shared/lib/api-client';
import { ApiEndpoint } from '@/shared/types/api-endpoint';
import type { LostItem } from '@/shared/types/lost-item';
import type { Response } from '@/shared/types/response';

const ITEMS_COUNT_REVALIDATE_MS = 60;

interface ItemsRecentData {
  recentItems: LostItem[];
}

export type ItemsRecentResponse = Response<ItemsRecentData>;

export async function fetchItemsRecent(): Promise<ItemsRecentResponse> {
  return await ApiClient.get(ApiEndpoint.ITEMS_RECENT, {
    next: {
      revalidate: ITEMS_COUNT_REVALIDATE_MS,
    },
  }).json();
}
