'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '@/components/ui/card';
import { useVirtualizer } from '@tanstack/react-virtual';
import { fetchDummyData, KeywordType, LostItem } from '@/utils/data';
import KeywordSelect from './lost-keyword-select';
import LostItemsGrid from './lost-item-grid';

const INITIAL_ITEMS_COUNT = 20;
const ITEMS_PER_LOAD = 20;
const CARD_HEIGHT = 256;
const GRID_GAP = 32;
const COLUMNS = 4;

export function LostItemsSection() {
  const [keyword, setKeyword] = useState<KeywordType>('all');
  const [items, setItems] = useState<LostItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: Math.ceil(items.length / COLUMNS),
    getScrollElement: () => parentRef.current,
    estimateSize: () => CARD_HEIGHT + GRID_GAP,
    overscan: 1,
  });

  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  }, [loading, hasMore]);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const limit = page === 1 ? INITIAL_ITEMS_COUNT : ITEMS_PER_LOAD;
      const data = await fetchDummyData(keyword, page, limit);

      setItems((prevItems) => {
        if (page === 1) return data.items;
        return [...prevItems, ...data.items];
      });

      setHasMore(data.hasMore);
    } finally {
      setLoading(false);
    }
  }, [keyword, page]);

  const handleKeywordChange = (value: KeywordType) => {
    setKeyword(value);
  };

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [keyword]);

  useEffect(() => {
    if (keyword) {
      fetchItems();
    }
  }, [page, keyword, fetchItems]);

  return (
    <Card data-cid="Card-RbTpGu" className="px-2">
      <CardHeader data-cid="CardHeader-nX7SoJ">
        <CardTitle data-cid="CardTitle-94bbSD" className="text-xl">
          분실물 알림 리스트
        </CardTitle>
        <CardDescription data-cid="CardDescription-b2QfGu" className="text-muted-foreground">
          등록한 키워드에 해당하는 분실물 알림 리스트입니다.
        </CardDescription>
      </CardHeader>
      <CardContent data-cid="CardContent-WXes0R" className="space-y-6">
        <KeywordSelect
          data-cid="KeywordSelect-uab2EA"
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
        />
        <div data-cid="div-VdaOTc" className="relative">
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
