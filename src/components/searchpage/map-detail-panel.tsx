'use client';

import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import { useMapPanelContext } from '@/contexts/map-panel-context';
import { Building2Icon, CalendarIcon, ChevronLeftIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

import { LostLocation } from '@/types/lost-property';

import useBoolean from '@/hooks/useBoolean';

import SkeletonView from '../common/skeleton-view';

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
      <div
        data-cid="div-m4rC32"
        className="h-full overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar]:w-1.5"
        style={{ scrollbarGutter: 'stable' }}
      >
        <div
          data-cid="div-LLgC7p"
          className="flex flex-col gap-3 p-5 pr-3.5 pt-0"
        >
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
            <div
              data-cid="div-2xf1Yr"
              className="flex items-center gap-2"
            >
              <MapPinIcon
                data-cid="MapPinIcon-MZ4lNL"
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
                  습득 장소
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
                    {acquisitionLocation}
                  </p>
                )}
              </div>
            </div>
            <div
              data-cid="div-IPVN8G"
              className="flex items-center gap-2"
            >
              <CalendarIcon
                data-cid="CalendarIcon-DUj1kg"
                size={18}
                color="hsl(var(--foreground))"
              />
              <div
                data-cid="div-bNsMZt"
                className="flex flex-col gap-1"
              >
                <p
                  data-cid="p-VYnVyy"
                  className="text-base font-semibold"
                >
                  습득 일자
                </p>
                {isLoading ? (
                  <SkeletonView
                    data-cid="SkeletonView-sX9gAR"
                    width="100%"
                    height="24px"
                  />
                ) : (
                  <p
                    data-cid="p-4n1AWK"
                    className="text-base"
                  >
                    {acquisitionDate}
                  </p>
                )}
              </div>
            </div>
            <div
              data-cid="div-qQLohe"
              className="flex items-center gap-2"
            >
              <Building2Icon
                data-cid="Building2Icon-PBlNW3"
                size={18}
                color="hsl(var(--foreground))"
              />
              <div
                data-cid="div-oAmZss"
                className="flex flex-col gap-1"
              >
                <p
                  data-cid="p-MkwTnC"
                  className="text-base font-semibold"
                >
                  보관 장소
                </p>
                {isLoading ? (
                  <SkeletonView
                    data-cid="SkeletonView-zF3TW5"
                    width="100%"
                    height="24px"
                  />
                ) : (
                  <p
                    data-cid="p-ptY807"
                    className="text-base"
                  >
                    {storageLocation}
                  </p>
                )}
              </div>
            </div>
            <div
              data-cid="div-bTXy1y"
              className="flex items-center gap-2"
            >
              <PhoneIcon
                data-cid="PhoneIcon-Ghmhx1"
                size={18}
                color="hsl(var(--foreground))"
              />
              <div
                data-cid="div-YxjUTP"
                className="flex flex-col gap-1"
              >
                <p
                  data-cid="p-6z3j7J"
                  className="text-base font-semibold"
                >
                  연락처
                </p>
                {isLoading ? (
                  <SkeletonView
                    data-cid="SkeletonView-LrLKWm"
                    width="100%"
                    height="24px"
                  />
                ) : (
                  <p
                    data-cid="p-bg8tVu"
                    className="text-base"
                  >
                    {contact}
                  </p>
                )}
              </div>
            </div>
          </div>
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
    </div>
  );
}
