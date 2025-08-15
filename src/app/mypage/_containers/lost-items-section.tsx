'use client';

import { useState } from 'react';

import KeywordSelect from '@/domain/lost-item/components/lost-keyword-select';
import ResponsiveLostItemsGrid from '@/domain/lost-item/components/responsive-lost-items-grid';
import { useSubscribeListQuery } from '@/domain/lost-item/queries/useSubscribeListQuery';
import { useKeywords } from '@/domain/notification/hooks/useKeywordQuery';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

// 키워드 타입 정의
type KeywordType = 'all' | string;

export function LostItemsSection() {
  const [keyword, setKeyword] = useState<KeywordType>('all');

  const { keywords, isLoading: keywordsLoading } = useKeywords();

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useSubscribeListQuery(
    { keyword }
  );

  const items = data?.pages.flatMap((page) => page.items) ?? [];
  const loading = isLoading || isFetchingNextPage;

  const handleKeywordChange = (newKeyword: KeywordType) => {
    setKeyword(newKeyword);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Card data-cid="Card-iMaY5e">
      <CardHeader data-cid="CardHeader-EyRayg">
        <CardTitle
          data-cid="CardTitle-5fBBEE"
          className="text-xl font-bold"
        >
          관심 분실물
        </CardTitle>
        <CardDescription data-cid="CardDescription-mFYFTr">
          등록한 키워드에 해당하는 분실물 알림 리스트입니다.
        </CardDescription>
      </CardHeader>
      <CardContent
        data-cid="CardContent-WXes0R"
        className="space-y-6"
      >
        <KeywordSelect
          data-cid="KeywordSelect-uab2EA"
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          keywords={keywords}
          isLoading={keywordsLoading}
        />
        <ResponsiveLostItemsGrid
          data-cid="ResponsiveLostItemsGrid-responsive"
          items={items}
          loading={loading}
          onLoadMore={handleLoadMore}
        />
      </CardContent>
    </Card>
  );
}
