import React from 'react';

import type { LostItem } from '@/domain/lost-item/mocks/data';
import LoadingSpinner from '@/shared/components/loading-spinner';
import { VirtualGrid } from '@/shared/components/virtual-grid';
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
      data-cid={`${dataCid}-item-${item.id}`}
      key={item.id}
      className="h-64 w-full"
    >
      <LostCard
        data-cid={`${dataCid}-card-${item.id}`}
        name={item.name}
        image={item.image}
        category={item.category}
        location={item.location}
        acquisitionDate={item.acquisitionDate}
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
