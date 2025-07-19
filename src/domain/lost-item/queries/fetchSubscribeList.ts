import ApiClient from '@/shared/lib/api-client';
import { ApiEndpoint, getAuthHeaders } from '@/shared/types/api-endpoint';
import type {
  CursorPaginationParams,
  DateRangeParams,
  LostItemListResponse,
  PaginationParams,
  SearchFilterParams,
} from '@/shared/types/lost-item';
import type { Response } from '@/shared/types/response';

export type SubscribeListResponse = Response<LostItemListResponse>;

export interface SubscribeListParams
  extends DateRangeParams,
    SearchFilterParams,
    PaginationParams,
    CursorPaginationParams {}

export async function fetchSubscribeList(
  params: SubscribeListParams
): Promise<SubscribeListResponse> {
  const token = localStorage.getItem('accessToken');
  const headers = getAuthHeaders(token);

  const searchParams = new URLSearchParams();
  searchParams.append('date_start', params.dateStart);
  searchParams.append('date_end', params.dateEnd);
  searchParams.append('size', params.size.toString());

  if (params.keyword) {
    searchParams.append('keyword', params.keyword);
  }
  if (params.category) {
    searchParams.append('category', params.category);
  }
  if (params.region) {
    searchParams.append('region', params.region);
  }
  if (params.cursorDate) {
    searchParams.append('cursorDate', params.cursorDate);
  }
  if (params.cursorId) {
    searchParams.append('cursorId', params.cursorId.toString());
  }

  return await ApiClient.get(ApiEndpoint.SUBSCRIBE_LIST, {
    headers,
    searchParams,
  }).json();
}
