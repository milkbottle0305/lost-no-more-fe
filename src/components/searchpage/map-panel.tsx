'use client';

import { useCallback, useEffect, useState } from 'react';

import { useMapPanelContext } from '@/contexts/map-panel-context';

import LostCard, { LostCardProps } from '@/components/common/lost-card';
import ListView from '@/components/ui/list-view';

const CHUNK_SIZE = 15;

async function fetchLostItems(ids: number[]): Promise<LostCardProps[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        ids.map((id) => ({
          id,
          name: `분실물 ${id}`,
          image: 'https://sitem.ssgcdn.com/26/64/85/item/1000277856426_i1_750.jpg',
          category: '카테고리',
          location: '습득 장소',
          acquisitionDate: '습득 일자',
        }))
      );
    }, 500);
  });
}

export default function MapPanel() {
  const { openPanel, lostItemIds, setCurrentItemId } = useMapPanelContext();
  const [items, setItems] = useState<LostCardProps[]>([]);
  const [cursor, setCursor] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setItems([]);
    setCursor(0);
  }, [lostItemIds]);

  const loadMore = useCallback(async () => {
    if (isFetching || cursor >= lostItemIds.length) return;
    setIsFetching(true);

    const nextIds = lostItemIds.slice(cursor, cursor + CHUNK_SIZE);
    const newItems = await fetchLostItems(nextIds);

    setItems((prev) => [...prev, ...newItems]);
    setCursor((prev) => prev + CHUNK_SIZE);
    setIsFetching(false);
  }, [cursor, isFetching, lostItemIds]);

  const onClickLostCard = useCallback(
    (id: number) => {
      openPanel();
      setCurrentItemId(id);
    },
    [openPanel, setCurrentItemId]
  );

  return (
    <div
      data-cid="div-PqiLON"
      className="flex h-full flex-col bg-background"
    >
      <p
        data-cid="p-xY5Jma"
        className="w-full border-b border-solid border-border py-3.5 text-center text-base font-extrabold text-foreground"
      >
        분실물 목록
      </p>
      <ListView
        data-cid="ListView-Me66Iy"
        className="w-[314px] py-3 pl-5 pr-3.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar]:w-1.5"
        items={items}
        itemHeight={291}
        renderItem={(item) => (
          <LostCard
            data-cid="LostCard-4Ro1Tz"
            {...item}
            onClick={() => onClickLostCard(item.id)}
            key={item.id}
          />
        )}
        renderEmpty={() => (
          <p
            data-cid="p-YSUxFT"
            className="flex h-full w-full items-center justify-center text-sm text-foreground"
          >
            분실물이 없습니다.
          </p>
        )}
        gap={16}
        loadMore={loadMore}
        isFetching={isFetching}
        isInfinite={true}
      />
    </div>
  );
}
