import React from 'react';

import KeywordList from '@/domain/notification/components/keyword-list';
import type { KeywordItem } from '@/domain/notification/types/keyword';

interface KeywordListContainerProps {
  isLoading: boolean;
  keywords: KeywordItem[];
  removeKeyword: (keyword: string) => void;
  handleSettingsClick: (keyword: KeywordItem) => void;
}

export function KeywordListContainer({
  isLoading,
  keywords,
  removeKeyword,
  handleSettingsClick,
}: KeywordListContainerProps) {
  if (isLoading) {
    return (
      <p
        data-cid="p-fw61Du"
        className="text-center py-4"
      >
        키워드를 불러오는 중...
      </p>
    );
  }

  if (keywords.length === 0) {
    return (
      <p
        data-cid="p-Hb9FyA"
        className="text-center text-muted-foreground py-8"
      >
        등록된 키워드가 없습니다.
      </p>
    );
  }

  return (
    <KeywordList
      data-cid="KeywordList-mjaArg"
      keywords={keywords}
      removeKeyword={removeKeyword}
      onSettingsClick={handleSettingsClick}
    />
  );
}

export default KeywordListContainer;
