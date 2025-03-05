import ApiClient from '@/shared/lib/api-client';
import { ApiEndpoint } from '@/shared/types/api-endpoint';
import type { Response } from '@/shared/types/response';

export interface ItemsSearchMapProps {
  keyword?: string;
  category?: string;
  region?: string;
  dateStart: string;
  dateEnd: string;
  topLeftLat: number;
  topLeftLon: number;
  bottomRightLat: number;
  bottomRightLon: number;
}
interface ItemsSearchMapData {
  lostItems: {
    lostItemId: number;
    latitude: number;
    longitude: number;
  }[];
}
export type ItemsSearchMapResponse = Response<ItemsSearchMapData>;

export async function fetchItemsSearchMap({
  keyword,
  category,
  region,
  dateStart,
  dateEnd,
  topLeftLat,
  topLeftLon,
  bottomRightLat,
  bottomRightLon,
}: ItemsSearchMapProps): Promise<ItemsSearchMapResponse> {
  const searchParams = new URLSearchParams({
    ...(keyword && { keyword }),
    ...(category && { category }),
    ...(region && { region }),
    date_start: dateStart,
    date_end: dateEnd,
    top_left_lat: topLeftLat.toString(),
    top_left_lon: topLeftLon.toString(),
    bottom_right_lat: bottomRightLat.toString(),
    bottom_right_lon: bottomRightLon.toString(),
  });

  return await ApiClient.get(ApiEndpoint.ITEMS_SEARCH_MAP, {
    searchParams: searchParams,
  }).json();
}
