export interface LostItem {
  lostItemId: number;
  name: string;
  date: string;
  location: string;
  category: string;
  imageUrl: string;
}

export interface LostItemListResponse<T = LostItem[]> {
  totalCount: number;
  lostItems: T;
  nextCursorDate?: string;
  nextCursorId?: number;
}

export interface CursorPaginationParams {
  cursorDate?: string;
  cursorId?: number;
}

export interface DateRangeParams {
  dateStart: string;
  dateEnd: string;
}

export interface SearchFilterParams {
  keyword?: string;
  category?: string;
  region?: string;
}

export interface PaginationParams {
  size: number;
}
