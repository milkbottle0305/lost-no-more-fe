'use client';

import { useRef } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { cn } from '../utils/utils';
import SkeletonView from './skeleton-view';

interface ListViewProps<T> {
  items: T[];
  itemHeight: number;
  itemWidth?: number; // 가로 방향일 때 사용
  className?: string;
  renderItem: (item: T) => React.ReactNode;
  gap: number;
  isFetching?: boolean;
  loadMore?: () => Promise<void> | void;
  isInfinite?: boolean;
  renderEmpty?: () => React.ReactNode;
  direction?: 'vertical' | 'horizontal'; // 방향 prop 추가
  height?: number; // 가로 방향일 때 컨테이너 높이
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
  itemWidth = 200, // 가로 방향 기본값
  className,
  renderItem,
  gap,
  isFetching,
  loadMore,
  isInfinite = false,
  renderEmpty,
  direction = 'vertical', // 기본값은 세로
  height = 400, // 가로 방향일 때 컨테이너 높이
}: ListViewProps<T>) {
  const isVertical = direction === 'vertical';
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isVertical ? itemHeight : itemWidth),
    gap: gap,
    overscan: 5,
    horizontal: !isVertical,
    scrollPaddingStart: 0,
    scrollPaddingEnd: 0,
  });

  const loadMoreRef = useIntersectionObserver({ onIntersect: loadMore });

  return (
    <div
      data-cid="div-zEk15H"
      ref={parentRef}
      className={cn(
        isVertical
          ? 'h-full w-full overflow-y-auto'
          : 'w-full overflow-x-auto overflow-y-hidden scrollbar-thin',
        className
      )}
      style={isVertical ? {} : { height: `${height}px` }}
    >
      {/* ✅ 데이터가 없고, 로딩 중이 아닐 때 renderEmpty 함수 실행 */}
      {!isFetching && items.length === 0 && renderEmpty?.()}

      {/* 리스트 렌더링 */}
      {items.length > 0 && (
        <div
          data-cid="div-mzA7a3"
          className="relative"
          style={
            isVertical
              ? { width: '100%', height: `${virtualizer.getTotalSize()}px` }
              : { height: '100%', width: `${virtualizer.getTotalSize()}px` }
          }
        >
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <div
              data-cid="div-hxLeDF"
              key={virtualItem.index}
              className={cn('absolute', isVertical ? 'left-0 top-0 w-full' : 'top-0 left-0 h-full')}
              style={
                isVertical
                  ? {
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }
                  : {
                      width: `${virtualItem.size}px`,
                      transform: `translateX(${virtualItem.start}px)`,
                    }
              }
            >
              {renderItem(items[virtualItem.index])}
            </div>
          ))}

          {/* 무한스크롤 트리거 - 가상화된 콘텐츠의 실제 끝에 배치 */}
          {isInfinite && loadMore && !isFetching && items.length > 0 && (
            <div
              data-cid="div-BSdtZX"
              ref={loadMoreRef}
              className="absolute"
              style={
                isVertical
                  ? {
                      bottom: '-10px', // 콘텐츠 아래쪽 끝
                      left: 0,
                      width: '100%',
                      height: '10px',
                    }
                  : {
                      right: '-10px', // 콘텐츠 오른쪽 끝
                      top: 0,
                      width: '10px',
                      height: '100%',
                    }
              }
            />
          )}
        </div>
      )}

      {/* 데이터 로딩 중일 때 로딩 스켈레톤 */}
      {isFetching && (
        <div
          data-cid="div-3pjPzm"
          className={cn('flex', isVertical ? 'flex-col' : 'flex-row')}
          style={{ gap: `${gap}px` }}
        >
          {Array.from({ length: 3 }, () => crypto.randomUUID()).map((id) => (
            <SkeletonView
              data-cid="SkeletonView-CQTjZi"
              key={id}
              height={isVertical ? `${itemHeight}px` : `${height}px`}
              width={isVertical ? '100%' : `${itemWidth}px`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
