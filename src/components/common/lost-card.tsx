'use client';

import Image from 'next/image';

import { Clock10Icon, MapPinIcon } from 'lucide-react';

export interface LostCardProps {
  id: number;
  name: string;
  image: string;
  category: string;
  location: string;
  acquisitionDate: string;
  onClick?: (id: number) => void;
}

export default function LostCard({
  id,
  name,
  image,
  category,
  location,
  acquisitionDate,
  onClick,
}: LostCardProps) {
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <div
      data-cid="div-bALPd0"
      className="relative box-border flex w-[274px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-solid border-border"
      onClick={handleClick}
    >
      <div
        data-cid="div-ldZOhI"
        className="absolute right-3 top-3 z-10 rounded-md bg-primary px-2.5 py-1.5 text-xs font-semibold text-background"
      >
        {category}
      </div>
      <div
        data-cid="div-7cMEXT"
        className="relative h-[165px] w-[270px]"
      >
        <Image
          data-cid="Image-5lTzOJ"
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div
        data-cid="div-TUGOiU"
        className="flex w-full flex-col border-t-2 border-solid border-border bg-background p-3"
      >
        <h1
          data-cid="h1-e2tv1Q"
          className="mb-3 truncate text-2xl font-extrabold text-foreground"
        >
          {name}
        </h1>
        <div
          data-cid="div-HpLNK7"
          className="mb-1 flex items-center gap-2"
        >
          <MapPinIcon
            data-cid="MapPinIcon-4pMwpW"
            size={16}
            color="hsl(var(--muted-foreground))"
          />
          <p
            data-cid="p-8R3WLW"
            className="truncate text-base text-muted-foreground"
          >
            {location}
          </p>
        </div>
        <div
          data-cid="div-PvM2K3"
          className="flex items-center gap-2"
        >
          <Clock10Icon
            data-cid="Clock10Icon-KoEu8o"
            size={16}
            color="hsl(var(--muted-foreground))"
          />
          <p
            data-cid="p-uZf3ev"
            className="truncate text-base text-muted-foreground"
          >
            습득일자: {acquisitionDate}
          </p>
        </div>
      </div>
    </div>
  );
}
