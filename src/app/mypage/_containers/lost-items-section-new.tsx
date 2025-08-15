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
    <>
      {/* 모바일 레이아웃 */}
      <div
        data-cid="div-mobile-layout"
        className="lg:hidden space-y-4"
      >
        <div
          data-cid="div-mobile-header"
          className="px-1"
        >
          <h2
            data-cid="h2-mobile-title"
            className="text-lg font-semibold text-gray-900 mb-2"
          >
            관심 분실물
          </h2>
          <p
            data-cid="p-mobile-description"
            className="text-sm text-gray-600 mb-4"
          >
            등록한 키워드에 해당하는 분실물 알림 리스트입니다.
          </p>
        </div>

        <div
          data-cid="div-mobile-keyword-select"
          className="px-1"
        >
          <KeywordSelect
            data-cid="KeywordSelect-mobile"
            keyword={keyword}
            onKeywordChange={handleKeywordChange}
            keywords={keywords}
            isLoading={keywordsLoading}
          />
        </div>

        <div
          data-cid="div-mobile-grid"
          className="px-1"
        >
          <ResponsiveLostItemsGrid
            data-cid="ResponsiveLostItemsGrid-mobile"
            items={items}
            loading={loading}
            onLoadMore={handleLoadMore}
          />
        </div>
      </div>

      {/* 데스크톱 레이아웃 */}
      <Card
        data-cid="Card-desktop"
        className="hidden lg:block w-full"
      >
        <CardHeader
          data-cid="CardHeader-desktop"
          className="px-4 sm:px-6 pt-4 sm:pt-6"
        >
          <CardTitle
            data-cid="CardTitle-desktop"
            className="text-lg sm:text-xl font-bold"
          >
            관심 분실물
          </CardTitle>
          <CardDescription
            data-cid="CardDescription-desktop"
            className="text-sm sm:text-base"
          >
            등록한 키워드에 해당하는 분실물 알림 리스트입니다.
          </CardDescription>
        </CardHeader>
        <CardContent
          data-cid="CardContent-desktop"
          className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6"
        >
          <KeywordSelect
            data-cid="KeywordSelect-desktop"
            keyword={keyword}
            onKeywordChange={handleKeywordChange}
            keywords={keywords}
            isLoading={keywordsLoading}
          />
          <ResponsiveLostItemsGrid
            data-cid="ResponsiveLostItemsGrid-desktop"
            items={items}
            loading={loading}
            onLoadMore={handleLoadMore}
          />
        </CardContent>
      </Card>
    </>
  );
}
