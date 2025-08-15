'use client';

import { useState } from 'react';

import LostCard from '@/domain/lost-item/components/lost-card';
import ListView from '@/shared/components/list-view';
import LoadingSpinner from '@/shared/components/loading-spinner';
import type { LostItem } from '@/shared/types/lost-item';

import useItemsSearchListByChunk from '../hooks/useItemsSearchListByChunk';
import { useMapPanelStore } from '../stores/map-panel-store';
import LostItemDetail from './lost-item-detail';

export default function MobileMapPanelContent() {
  const { lostItemIds, isMapPanelLoading } = useMapPanelStore();
  const [selectedItem, setSelectedItem] = useState<LostItem | null>(null);

  const {
    lostItems: items,
    isFethcingLostItems,
    loadMoreLostItems,
  } = useItemsSearchListByChunk(lostItemIds);

  const isInitialLoading = isMapPanelLoading || (isFethcingLostItems && items.length === 0);

  const handleItemClick = (item: LostItem) => {
    setSelectedItem(item);
  };

  const handleBackToList = () => {
    setSelectedItem(null);
  };

  if (isInitialLoading) {
    return (
      <div
        data-cid="div-loading"
        className="flex items-center justify-center h-full"
      >
        <LoadingSpinner
          data-cid="spinner-loading"
          size="md"
        />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div
        data-cid="div-empty"
        className="flex items-center justify-center h-full"
      >
        <p
          data-cid="p-empty-message"
          className="text-muted-foreground"
        >
          선택된 분실물이 없습니다.
        </p>
      </div>
    );
  }

  if (selectedItem) {
    return (
      <LostItemDetail
        data-cid="component-lost-item-detail"
        item={selectedItem}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div
      data-cid="div-mobile-panel-content"
      className="p-4"
    >
      <div
        data-cid="div-header"
        className="mb-4"
      >
        <h3
          data-cid="h3-title"
          className="text-lg font-semibold"
        >
          이 지역의 분실물
        </h3>
        <p
          data-cid="p-count"
          className="text-sm text-muted-foreground"
        >
          총 {items.length}개의 분실물이 있습니다
        </p>
      </div>

      <ListView
        data-cid="horizontal-list-view"
        items={items}
        itemWidth={208}
        itemHeight={240}
        direction="horizontal"
        gap={16}
        height={240}
        isInfinite
        isFetching={isFethcingLostItems}
        loadMore={loadMoreLostItems}
        renderItem={(item) => {
          const lostItem = item as LostItem;
          return (
            <div
              data-cid={`div-item-${lostItem.lostItemId}`}
              className="h-full cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
              onClick={() => handleItemClick(lostItem)}
            >
              <LostCard
                data-cid={`card-${lostItem.lostItemId}`}
                id={lostItem.lostItemId}
                name={lostItem.name || '이름 없음'}
                image={lostItem.imageUrl || ''}
                category={lostItem.category || '기타'}
                location={lostItem.location || '위치 정보 없음'}
                acquisitionDate={lostItem.date || ''}
                size="sm"
              />
            </div>
          );
        }}
        renderEmpty={() => (
          <div
            data-cid="div-empty-horizontal"
            className="flex items-center justify-center h-full w-full"
          >
            <p
              data-cid="p-empty-message-horizontal"
              className="text-muted-foreground"
            >
              선택된 분실물이 없습니다.
            </p>
          </div>
        )}
      />
    </div>
  );
}
