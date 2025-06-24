import type { KeywordItem, UpdateKeywordListParams } from '@/domain/notification/types/keyword';

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 5);
};

export const createKeyword = (text: string): KeywordItem => {
  return {
    id: generateId(),
    text,
    category: '전체',
    location: '전체',
  };
};

export const updateKeywordInList = ({
  keywords,
  keywordId,
  updatedKeyword,
}: UpdateKeywordListParams): KeywordItem[] => {
  return keywords.map((kw) =>
    kw.id === keywordId
      ? {
          ...kw,
          ...updatedKeyword,
        }
      : kw
  );
};
