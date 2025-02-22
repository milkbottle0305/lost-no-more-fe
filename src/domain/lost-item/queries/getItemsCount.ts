import ApiClient from '@/shared/lib/api-client';
import { ApiEndpoint } from '@/shared/types/api-endpoint';
import type { Response } from '@/shared/types/response';

const ITEMS_COUNT_REVALIDATE_MS = 60;

interface ItemsCountData {
  today: number;
  total: number;
}

export type ItemsCountResponse = Response<ItemsCountData>;

export async function getItemsCount(): Promise<ItemsCountResponse> {
  return await ApiClient.get(ApiEndpoint.ITEMS_COUNT, {
    next: {
      revalidate: ITEMS_COUNT_REVALIDATE_MS,
    },
  }).json();
}
