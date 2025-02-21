'use client';

import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import SkeletonView from '@/shared/components/skeleton-view';
import useBoolean from '@/shared/hooks/useBoolean';
import type { LostLocation } from '@/shared/types/lost-property';
import { Building2Icon, CalendarIcon, ChevronLeftIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

import { useMapPanelContext } from '../contexts/map-panel-context';

interface MapDetailPanelProps {
  name: string;
  image: string;
  acquisitionLocation: LostLocation;
  acquisitionDate: string;
  storageLocation: string;
  contact: string;
  description: string;
}

export default function MapDetailPanel() {
  const { value: isLoading, setFalse: completeLoad } = useBoolean(true);
  const { currentItemId, closePanel } = useMapPanelContext();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [acquisitionLocation, setAcquisitionLocation] = useState<LostLocation | null>(null);
  const [acquisitionDate, setAcquisitionDate] = useState('');
  const [storageLocation, setStorageLocation] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');

  const fetchLostItem = useCallback(async (id: number) => {
    return new Promise<MapDetailPanelProps>((resolve) => {
      setTimeout(() => {
        resolve({
          name: `분실물 ${id}`,
          image: 'https://sitem.ssgcdn.com/26/64/85/item/1000277856426_i1_750.jpg',
          acquisitionLocation: '경기도',
          acquisitionDate: '2020-01-01',
          storageLocation: '경기도청',
          contact: '02-1234-1234',
          description:
            '경기도청 2층 민원실에서 보관중입니다. 평일 9시부터 6시까지 방문 가능합니다. 본인임을 확인할 수 있는 서류를 지참해주세요.',
        });
      }, 500);
    });
  }, []);

  useEffect(() => {
    fetchLostItem(currentItemId).then((lostItem) => {
      setName(lostItem.name);
      setImage(lostItem.image);
      setAcquisitionLocation(lostItem.acquisitionLocation);
      setAcquisitionDate(lostItem.acquisitionDate);
      setStorageLocation(lostItem.storageLocation);
      setContact(lostItem.contact);
      setDescription(lostItem.description);
      completeLoad();
    });
  }, [completeLoad, currentItemId, fetchLostItem]);

  return (
    <div
      data-cid="div-5jn1Yx"
      className="flex w-[540px] shrink-0 flex-col gap-3 bg-background"
    >
      <Header
        data-cid="Header-mGcSaV"
        name={name}
        closePanel={closePanel}
        isLoading={isLoading}
      />
      <Content
        data-cid="Content-1yIcSV"
        name={name}
        image={image}
        acquisitionDate={acquisitionDate}
        acquisitionLocation={acquisitionLocation!}
        storageLocation={storageLocation}
        contact={contact}
        description={description}
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
  storageLocation,
  contact,
  description,
  isLoading,
}: {
  name: string;
  image: string;
  acquisitionDate: string;
  acquisitionLocation: string;
  storageLocation: string;
  contact: string;
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
          <InfoItem
            data-cid="InfoItem-my57H7"
            icon={Building2Icon}
            label="보관 장소"
            content={storageLocation}
            isLoading={isLoading}
          />
          <InfoItem
            data-cid="InfoItem-OSQBvR"
            icon={PhoneIcon}
            label="연락처"
            content={contact}
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
