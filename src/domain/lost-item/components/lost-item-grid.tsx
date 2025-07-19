import React from 'react';

import LoadingSpinner from '@/shared/components/loading-spinner';
import { VirtualGrid } from '@/shared/components/virtual-grid';
import type { LostItem } from '@/shared/types/lost-item';
import type { Virtualizer } from '@tanstack/react-virtual';

import LostCard from './lost-card';

interface LostItemsGridProps {
  parentRef: React.RefObject<HTMLDivElement | null>;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  items: LostItem[];
  loading: boolean;
  onLoadMore: () => void;
  'data-cid'?: string;
}

const CARD_HEIGHT = 256;
const COLUMNS = 4;

export default function LostItemsGrid({
  parentRef,
  virtualizer,
  items,
  loading,
  onLoadMore,
  'data-cid': dataCid,
}: LostItemsGridProps) {
  const renderLostItem = (item: LostItem) => (
    <div
      data-cid={`${dataCid}-item-${item.lostItemId}`}
      key={item.lostItemId}
      className="h-64 w-full"
    >
      <LostCard
        data-cid={`${dataCid}-card-${item.lostItemId}`}
        name={item.name || '이름 없음'}
        image={item.imageUrl || ''}
        category={item.category || '기타'}
        location={item.location || '위치 정보 없음'}
        acquisitionDate={item.date || ''}
        size="md"
        id={0}
      />
    </div>
  );

  const LoadingComponent = (
    <LoadingSpinner
      data-cid={`${dataCid}-loader`}
      size="lg"
      color="text-muted-foreground"
    />
  );

  const EmptyComponent = (
    <div
      data-cid={`${dataCid}-empty`}
      className="text-center text-gray-500"
    >
      검색 결과가 없습니다.
    </div>
  );

  return (
    <VirtualGrid
      data-cid={dataCid}
      parentRef={parentRef}
      virtualizer={virtualizer}
      items={items}
      columns={COLUMNS}
      rowHeight={CARD_HEIGHT}
      renderItem={renderLostItem}
      onLoadMore={onLoadMore}
      loading={loading}
      LoadingComponent={LoadingComponent}
      EmptyComponent={EmptyComponent}
      containerWidth="1200px"
      containerHeight="550px"
    />
  );
}
