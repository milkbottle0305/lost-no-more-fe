import React from 'react';
import { Loader2 } from 'lucide-react';
import { VirtualGrid } from '@/components/common/virtual-grid';
import LostCard from '@/components/common/lost-card';
import { LostItem } from '@/utils/data';
import { Virtualizer } from '@tanstack/react-virtual';

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
    <div data-cid={`${dataCid}-item-${item.id}`} key={item.id} className="h-64 w-full">
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
    <Loader2 data-cid={`${dataCid}-loader`} className="h-12 w-12 animate-spin text-gray-500" />
  );

  const EmptyComponent = (
    <div data-cid={`${dataCid}-empty`} className="text-center text-gray-500">
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
