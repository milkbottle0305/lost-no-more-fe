'use client';

import { useRef } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { cn } from '../utils/utils';
import SkeletonView from './skeleton-view';

interface ListViewProps<T> {
  items: T[];
  itemHeight: number;
  className?: string;
  renderItem: (item: T) => React.ReactNode;
  gap: number;
  isFetching?: boolean;
  loadMore?: () => Promise<void>;
  isInfinite?: boolean;
  renderEmpty?: () => React.ReactNode;
}

/**
 * 가상화된 무한스크롤을 지원하는 리스트뷰
 * @param {T[]} items - 리스트 아이템 목록
 * @param {number} itemHeight - 리스트 아이템 높이
 * @param {string} className - 커스텀 클래스명
 * @param {(item: T) => React.ReactNode} renderItem - 리스트 아이템 렌더링 함수
 * @param {number} gap - 리스트 아이템 간격
 * @param {boolean} isFetching - 데이터 로딩 중 여부
 * @param {() => Promise<void>} loadMore - 더 불러오기 함수
 * @param {boolean} isInfinite - 무한스크롤 여부
 * @param {() => React.ReactNode} renderEmpty - 데이터가 없을 때 렌더링할 함수
 * @returns {React.ReactNode} 리스트뷰 컴포넌트
 */
export default function ListView<T>({
  items,
  itemHeight,
  className,
  renderItem,
  gap,
  isFetching,
  loadMore,
  isInfinite = false,
  renderEmpty,
}: ListViewProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useIntersectionObserver({ onIntersect: loadMore });
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    gap: gap,
    overscan: 2,
  });

  return (
    <div
      data-cid="div-zEk15H"
      ref={parentRef}
      className={cn('h-full w-full overflow-y-auto', className)}
    >
      {/* ✅ 데이터가 없고, 로딩 중이 아닐 때 renderEmpty 함수 실행 */}
      {!isFetching && items.length === 0 && renderEmpty?.()}

      {/* 리스트 렌더링 */}
      {items.length > 0 && (
        <div
          data-cid="div-mzA7a3"
          className="relative w-full"
          style={{ height: `${virtualizer.getTotalSize()}px` }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <div
              data-cid="div-hxLeDF"
              key={virtualItem.index}
              className="absolute left-0 top-0 w-full"
              style={{
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {renderItem(items[virtualItem.index])}
            </div>
          ))}
        </div>
      )}

      {/* 데이터 로딩 중일 때 로딩 스켈레톤 */}
      {isFetching && (
        <div
          data-cid="div-3pjPzm"
          className="flex flex-col"
          style={{ gap: `${gap}px` }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonView
              data-cid="SkeletonView-CQTjZi"
              key={i}
              height={`${itemHeight}px`}
              width="100%"
            />
          ))}
        </div>
      )}
      {/* 리스트뷰 끝에 도달했을 때 더 불러오기 */}
      {isInfinite && loadMore && !isFetching && (
        <div
          data-cid="div-BSdtZX"
          ref={loadMoreRef}
        />
      )}
    </div>
  );
}
