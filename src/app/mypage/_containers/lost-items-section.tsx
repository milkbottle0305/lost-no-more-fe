'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import LostItemsGrid from '@/domain/lost-item/components/lost-item-grid';
import KeywordSelect from '@/domain/lost-item/components/lost-keyword-select';
import { useSubscribeListQuery } from '@/domain/lost-item/queries/useSubscribeListQuery';
import { useKeywords } from '@/domain/notification/hooks/useKeywordQuery';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { useVirtualizer } from '@tanstack/react-virtual';

// 키워드 타입 정의
type KeywordType = 'all' | string;

const CARD_HEIGHT = 256;
const GRID_GAP = 32;
const COLUMNS = 4;

export function LostItemsSection() {
  const [keyword, setKeyword] = useState<KeywordType>('all');

  const { keywords, isLoading: keywordsLoading } = useKeywords();

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } =
    useSubscribeListQuery({ keyword });

  const items = data?.pages.flatMap((page) => page.items) ?? [];
  const loading = isLoading || isFetchingNextPage;

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: Math.ceil(items.length / COLUMNS),
    getScrollElement: () => parentRef.current,
    estimateSize: () => CARD_HEIGHT + GRID_GAP,
    overscan: 1,
  });

  const handleLoadMore = useCallback(() => {
    if (loading || !hasNextPage) return;
    fetchNextPage();
  }, [loading, hasNextPage, fetchNextPage]);

  const handleKeywordChange = (value: KeywordType) => {
    setKeyword(value);
  };

  useEffect(() => {
    if (keyword) {
      refetch();
    }
  }, [keyword, refetch]);

  return (
    <Card
      data-cid="Card-RbTpGu"
      className="px-2"
    >
      <CardHeader data-cid="CardHeader-nX7SoJ">
        <CardTitle
          data-cid="CardTitle-94bbSD"
          className="text-xl"
        >
          분실물 알림 리스트
        </CardTitle>
        <CardDescription
          data-cid="CardDescription-b2QfGu"
          className="text-muted-foreground"
        >
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
        <div
          data-cid="div-VdaOTc"
          className="relative"
        >
          <LostItemsGrid
            data-cid="LostItemsGrid-nvNRTq"
            parentRef={parentRef}
            virtualizer={virtualizer}
            items={items}
            loading={loading}
            onLoadMore={handleLoadMore}
          />
        </div>
      </CardContent>
    </Card>
  );
}
