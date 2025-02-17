import React, { useRef } from 'react';
import { Virtualizer } from '@tanstack/react-virtual';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface VirtualGridProps<T> {
  parentRef: React.RefObject<HTMLDivElement | null>;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  items: T[];
  columns: number;
  rowHeight: number;
  renderItem: (item: T) => React.ReactNode;
  onLoadMore?: () => void;
  className?: string;
  containerHeight?: string | number;
  containerWidth?: string | number;
  loading?: boolean;
  LoadingComponent?: React.ReactNode;
  EmptyComponent?: React.ReactNode;
  'data-cid'?: string;
}

export function VirtualGrid<T>({
  'data-cid': dataCid,
  parentRef,
  virtualizer,
  items,
  columns,
  rowHeight,
  renderItem,
  onLoadMore,
  className = '',
  containerHeight = '550px',
  containerWidth = '100%',
  loading = false,
  LoadingComponent,
  EmptyComponent,
}: VirtualGridProps<T>) {
  const contentRef = useRef<HTMLDivElement>(null);

  const loadMoreRef = useIntersectionObserver({
    onIntersect: onLoadMore,
  });

  if (loading && items.length === 0) {
    return (
      <div data-cid={`${dataCid}-loading`} className="flex h-[550px] items-center justify-center">
        {LoadingComponent}
      </div>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <div data-cid={`${dataCid}-empty`} className="flex h-[550px] items-center justify-center">
        {EmptyComponent}
      </div>
    );
  }

  return (
    <div
      data-cid={dataCid}
      className={`relative ${className}`}
      style={{ height: containerHeight, width: containerWidth }}
    >
      <div data-cid={`${dataCid}-scroll`} ref={parentRef} className="h-full w-full overflow-auto">
        <div
          data-cid={`${dataCid}-content`}
          ref={contentRef}
          className="relative w-full"
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            background: 'transparent',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const rowIndex = virtualRow.index;
            const rowItems = items.slice(rowIndex * columns, (rowIndex + 1) * columns);

            if (rowItems.length === 0) return null;

            return (
              <div
                data-cid={`${dataCid}-row-${virtualRow.index}`}
                key={virtualRow.key}
                className={`absolute left-0 grid w-full gap-4`}
                style={{
                  top: `${virtualRow.start}px`,
                  height: `${rowHeight}px`,
                  transform: 'translateZ(0)',
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                }}
              >
                {rowItems.map((item) => renderItem(item))}
              </div>
            );
          })}
        </div>
        <div data-cid={`${dataCid}-observer`} ref={loadMoreRef} className="h-10 w-full" />
      </div>
    </div>
  );
}
