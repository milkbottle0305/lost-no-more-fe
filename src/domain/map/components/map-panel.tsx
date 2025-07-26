'use client';

import { useCallback } from 'react';

import LostCard from '@/domain/lost-item/components/lost-card';
import ListView from '@/shared/components/list-view';

import useItemsSearchListByChunk from '../hooks/useItemsSearchListByChunk';
import { useMapPanelStore } from '../stores/map-panel-store';

export default function MapPanel() {
  const openPanel = useMapPanelStore((state) => state.openPanel);
  const lostItemIds = useMapPanelStore((state) => state.lostItemIds);
  const setCurrentItemId = useMapPanelStore((state) => state.setCurrentItemId);

  const { lostItems, isFethcingLostItems, loadMoreLostItems } =
    useItemsSearchListByChunk(lostItemIds);

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
        items={lostItems}
        isInfinite
        itemHeight={291}
        renderItem={(item) => (
          <LostCard
            id={item.lostItemId}
            image={item.imageUrl}
            acquisitionDate={item.date}
            data-cid="LostCard-4Ro1Tz"
            onClick={() => onClickLostCard(item.lostItemId)}
            key={item.lostItemId}
            name={item.name}
            category={item.category}
            location={item.location}
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
        loadMore={loadMoreLostItems}
        isFetching={isFethcingLostItems}
      />
    </div>
  );
}
