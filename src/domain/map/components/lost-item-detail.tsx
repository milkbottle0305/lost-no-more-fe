'use client';

import Image from 'next/image';

import type { LostItem } from '@/shared/types/lost-item';
import { Button } from '@/shared/ui/button';
import { ArrowLeft, Calendar, MapPin, Tag } from 'lucide-react';

interface LostItemDetailProps {
  item: LostItem;
  onBack: () => void;
}

export default function LostItemDetail({ item, onBack }: LostItemDetailProps) {
  return (
    <div
      data-cid="div-lost-item-detail"
      className="p-4 h-full"
    >
      {/* 헤더 */}
      <div
        data-cid="div-detail-header"
        className="flex items-center gap-3 mb-4"
      >
        <button
          data-cid="button-back"
          onClick={onBack}
          className="p-2 hover:bg-muted rounded-full transition-colors"
        >
          <ArrowLeft
            data-cid="icon-arrow-left"
            className="w-5 h-5"
          />
        </button>
        <h2
          data-cid="h2-item-name"
          className="text-lg font-semibold"
        >
          {item.name}
        </h2>
      </div>

      {/* 분실물 이미지 */}
      <div
        data-cid="div-image-container"
        className="mb-4"
      >
        <div
          data-cid="div-image-wrapper"
          className="relative w-full h-48 bg-muted rounded-lg overflow-hidden"
        >
          <Image
            data-cid="img-lost-item"
            src={item.imageUrl || '/images/placeholder-item.jpg'}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* 분실물 정보 */}
      <div
        data-cid="div-item-info"
        className="space-y-4"
      >
        <div
          data-cid="div-category"
          className="flex items-center gap-2"
        >
          <Tag
            data-cid="icon-tag"
            className="w-4 h-4 text-muted-foreground"
          />
          <span
            data-cid="span-category"
            className="text-sm text-muted-foreground"
          >
            카테고리
          </span>
          <span
            data-cid="span-category-value"
            className="text-sm font-medium"
          >
            {item.category}
          </span>
        </div>

        <div
          data-cid="div-location"
          className="flex items-center gap-2"
        >
          <MapPin
            data-cid="icon-map-pin"
            className="w-4 h-4 text-muted-foreground"
          />
          <span
            data-cid="span-location"
            className="text-sm text-muted-foreground"
          >
            발견 장소
          </span>
          <span
            data-cid="span-location-value"
            className="text-sm font-medium"
          >
            {item.location}
          </span>
        </div>

        <div
          data-cid="div-date"
          className="flex items-center gap-2"
        >
          <Calendar
            data-cid="icon-calendar"
            className="w-4 h-4 text-muted-foreground"
          />
          <span
            data-cid="span-date"
            className="text-sm text-muted-foreground"
          >
            습득 일자
          </span>
          <span
            data-cid="span-date-value"
            className="text-sm font-medium"
          >
            {item.date}
          </span>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div
        data-cid="div-actions"
        className="mt-6"
      >
        <Button
          data-cid="button-contact"
          className="w-full"
          size="lg"
        >
          문의하기
        </Button>
      </div>
    </div>
  );
}
