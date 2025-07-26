'use client';

import { useEffect } from 'react';

import Image from 'next/image';

import { useItemsSearchDetailQuery } from '@/domain/search/queries/useItemsSearchDetailQuery';
import SkeletonView from '@/shared/components/skeleton-view';
import useBoolean from '@/shared/hooks/useBoolean';
import { CalendarIcon, ChevronLeftIcon, MapPinIcon } from 'lucide-react';

import { useMapPanelStore } from '../stores/map-panel-store';

export default function MapDetailPanel() {
  const { value: isLoading, setFalse: completeLoad } = useBoolean(true);
  const currentItemId = useMapPanelStore((state) => state.currentItemId);
  const closePanel = useMapPanelStore((state) => state.closePanel);

  // API 연동: useItemsSearchDetailQuery 사용
  const { data, isLoading: queryLoading } = useItemsSearchDetailQuery({
    lostItemId: currentItemId,
  });
  const detail = data?.data;

  useEffect(() => {
    if (!queryLoading) {
      completeLoad();
    }
  }, [queryLoading, completeLoad]);

  return (
    <div
      data-cid="div-5jn1Yx"
      className="flex w-[540px] shrink-0 flex-col gap-3 bg-background"
    >
      <Header
        data-cid="Header-mGcSaV"
        name={detail?.name ?? ''}
        closePanel={closePanel}
        isLoading={isLoading}
      />
      <Content
        data-cid="Content-1yIcSV"
        name={detail?.name ?? ''}
        image={detail?.imageUrl ?? ''}
        acquisitionDate={detail?.date ?? ''}
        acquisitionLocation={detail?.location ?? ''}
        description={''}
        isLoading={isLoading}
      />
    </div>
  );
}

function Header({
  name,
  closePanel,
  isLoading,
}: {
  name: string;
  closePanel: () => void;
  isLoading: boolean;
}) {
  return (
    <div
      data-cid="div-GUmcM8"
      className="flex items-center gap-4 p-5 pb-0"
    >
      <button
        data-cid="button-VEsfFl"
        onClick={closePanel}
      >
        <ChevronLeftIcon
          data-cid="ChevronLeftIcon-KyIyn4"
          size={24}
          color="hsl(var(--foreground))"
        />
      </button>
      {isLoading ? (
        <SkeletonView
          data-cid="SkeletonView-ulSGZB"
          width="100%"
          height="32px"
        />
      ) : (
        <p
          data-cid="p-cH7HOE"
          className="text-2xl font-extrabold"
        >
          {name}
        </p>
      )}
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  content,
  isLoading,
}: {
  icon: typeof MapPinIcon;
  label: string;
  content: string;
  isLoading: boolean;
}) {
  return (
    <div
      data-cid="div-2xf1Yr"
      className="flex items-center gap-2"
    >
      <Icon
        data-cid={`${Icon.name}-MZ4lNL`}
        size={18}
        color="hsl(var(--foreground))"
      />
      <div
        data-cid="div-IpfA5w"
        className="flex flex-col gap-1"
      >
        <p
          data-cid="p-Rhua38"
          className="text-base font-semibold"
        >
          {label}
        </p>
        {isLoading ? (
          <SkeletonView
            data-cid="SkeletonView-JLz5sR"
            width="100%"
            height="24px"
          />
        ) : (
          <p
            data-cid="p-hHcKN9"
            className="text-base"
          >
            {content}
          </p>
        )}
      </div>
    </div>
  );
}

function Content({
  name,
  image,
  acquisitionDate,
  acquisitionLocation,
  description,
  isLoading,
}: {
  name: string;
  image: string;
  acquisitionDate: string;
  acquisitionLocation: string;
  description: string;
  isLoading: boolean;
}) {
  return (
    <div
      data-cid="div-m4rC32"
      className="h-full overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar]:w-1.5"
      style={{ scrollbarGutter: 'stable' }}
    >
      <div
        data-cid="div-LLgC7p"
        className="flex flex-col gap-3 p-5 pr-3.5 pt-0"
      >
        {/* 이미지 섹션 */}
        {isLoading ? (
          <SkeletonView
            data-cid="SkeletonView-ESfADW"
            width="500px"
            height="285px"
          />
        ) : (
          <Image
            data-cid="Image-LvEZdu"
            className="h-[285px] w-[500px] rounded-xl object-cover"
            src={image}
            alt={name}
            width={500}
            height={285}
            priority
          />
        )}

        {/* 정보 섹션 */}
        <div
          data-cid="div-y4NWco"
          className="flex flex-col gap-1 rounded-xl border-2 border-solid border-border bg-background p-3"
        >
          <p
            data-cid="p-sPCAjr"
            className="text-lg font-bold"
          >
            습득물 정보
          </p>
          <InfoItem
            data-cid="InfoItem-PNQFRF"
            icon={MapPinIcon}
            label="습득 장소"
            content={acquisitionLocation}
            isLoading={isLoading}
          />
          <InfoItem
            data-cid="InfoItem-rXp3i1"
            icon={CalendarIcon}
            label="습득 일자"
            content={acquisitionDate}
            isLoading={isLoading}
          />
        </div>

        {/* 설명 섹션 */}
        <div
          data-cid="div-nKMRFC"
          className="flex flex-col gap-1 rounded-xl border-2 border-solid border-border bg-background p-3"
        >
          <p
            data-cid="p-SJrU9l"
            className="text-lg font-bold"
          >
            습득물 설명
          </p>
          {isLoading ? (
            <SkeletonView
              data-cid="SkeletonView-8wvXzT"
              width="100%"
              height="24px"
            />
          ) : (
            <p
              data-cid="p-tLssjW"
              className="text-base"
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
