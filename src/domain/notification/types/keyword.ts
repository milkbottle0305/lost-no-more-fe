import type { LostCategory, LostLocationForKeyword } from '@/shared/types/lost-property';

export interface KeywordItem {
  id: string;
  text: string;
  category: LostCategory;
  location: LostLocationForKeyword;
}

export interface UpdateKeywordListParams {
  keywords: KeywordItem[];
  keywordId: string;
  updatedKeyword: Omit<KeywordItem, 'id'>;
}