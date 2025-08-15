import React from 'react';

import LoadingSpinner from '@/shared/components/loading-spinner';
import type { LostItem } from '@/shared/types/lost-item';

import LostCard from './lost-card';

interface ResponsiveLostItemsGridProps {
  items: LostItem[];
  loading: boolean;
  onLoadMore?: () => void;
  'data-cid'?: string;
}

export default function ResponsiveLostItemsGrid({
  items,
  loading,
  onLoadMore,
  'data-cid': dataCid,
}: ResponsiveLostItemsGridProps) {
  if (loading && items.length === 0) {
    return (
      <div
        data-cid={`${dataCid}-loading`}
        className="flex h-64 items-center justify-center"
      >
        <LoadingSpinner
          data-cid={`${dataCid}-loader`}
          size="lg"
          color="text-muted-foreground"
        />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        data-cid={`${dataCid}-empty`}
        className="flex h-64 items-center justify-center text-center text-gray-500"
      >
        <div data-cid="div-empty-content">
          <p
            data-cid="p-empty-message"
            className="text-lg font-medium"
          >
            관심 분실물이 없습니다
          </p>
          <p
            data-cid="p-empty-description"
            className="text-sm text-muted-foreground mt-2"
          >
            키워드를 설정해서 새로운 분실물 알림을 받아보세요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-cid={`${dataCid}-container`}
      className="space-y-4"
    >
      <div
        data-cid={`${dataCid}-grid`}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
      >
        {items.map((item) => (
          <div
            data-cid={`${dataCid}-item-${item.lostItemId}`}
            key={item.lostItemId}
            className="w-full"
          >
            <LostCard
              data-cid={`${dataCid}-card-${item.lostItemId}`}
              name={item.name || '이름 없음'}
              image={item.imageUrl || ''}
              category={item.category || '기타'}
              location={item.location || '위치 정보 없음'}
              acquisitionDate={item.date || ''}
              size="md"
              id={item.lostItemId}
            />
          </div>
        ))}
      </div>

      {loading && items.length > 0 && (
        <div
          data-cid={`${dataCid}-load-more-loading`}
          className="flex justify-center py-4"
        >
          <LoadingSpinner
            data-cid={`${dataCid}-load-more-loader`}
            size="md"
            color="text-muted-foreground"
          />
        </div>
      )}

      {onLoadMore && !loading && (
        <div
          data-cid={`${dataCid}-load-more-trigger`}
          ref={(ref) => {
            if (ref) {
              const observer = new IntersectionObserver(
                (entries) => {
                  if (entries[0].isIntersecting) {
                    onLoadMore();
                  }
                },
                { threshold: 0.1 }
              );
              observer.observe(ref);
              return () => observer.disconnect();
            }
          }}
          className="h-4"
        />
      )}
    </div>
  );
}
