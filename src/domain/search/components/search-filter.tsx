'use client';

import { LostCategories, LostLocations } from '@/shared/types/lost-property';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { ChevronDownIcon, MapPinIcon, TagIcon } from 'lucide-react';

import useSearchStore from '../stores/search-store';
import { DateRangePicker as _DateRangePicker } from './date-range-picker';

function DateRangePicker() {
  const updateDateStart = useSearchStore((state) => state.updateDateStart);
  const updateDateEnd = useSearchStore((state) => state.updateDateEnd);

  return (
    <_DateRangePicker
      data-cid="_DateRangePicker-8BdiMf"
      onChange={(range) => {
        if (range && range.from && range.to) {
          updateDateStart(range.from);
          updateDateEnd(range.to);
        }
      }}
    />
  );
}

function LocationPicker() {
  const location = useSearchStore((state) => state.location);
  const updateLocation = useSearchStore((state) => state.updateLocation);

  return (
    <DropdownMenu data-cid="DropdownMenu-g4cXl7">
      <DropdownMenuTrigger
        data-cid="DropdownMenuTrigger-Q3VmIz"
        className="w-full"
      >
        <div
          data-cid="div-0Di81I"
          className="flex h-[32px] w-full sm:w-[140px] md:w-[160px] lg:w-[196px] items-center justify-between rounded-lg border-2 border-solid border-border bg-background p-2"
        >
          <div
            data-cid="div-yhnWMZ"
            className="flex items-center gap-3"
          >
            <MapPinIcon
              data-cid="MapPinIcon-1ZQ6ZT"
              size={18}
              color="hsl(var(--foreground))"
            />
            <p
              data-cid="p-4xA4Gu"
              className={`text-base leading-none text-foreground ${!location && 'text-muted-foreground'}`}
            >
              {location || '지역'}
            </p>
          </div>
          <ChevronDownIcon
            data-cid="ChevronDownIcon-1ZQ6ZT"
            size={18}
            color="hsl(var(--accent-foreground))"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent data-cid="DropdownMenuContent-YzX7tS">
        <DropdownMenuGroup
          data-cid="DropdownMenuGroup-rkXFkb"
          className="max-h-96 overflow-y-auto"
        >
          {LostLocations.map((location) => (
            <DropdownMenuItem
              data-cid="DropdownMenuItem-Rx9GKy"
              key={location}
              onClick={() => updateLocation(location)}
            >
              {location}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CategoryPicker() {
  const category = useSearchStore((state) => state.category);
  const updateCategory = useSearchStore((state) => state.updateCategory);

  return (
    <DropdownMenu data-cid="DropdownMenu-I9Mbik">
      <DropdownMenuTrigger
        data-cid="DropdownMenuTrigger-35zjxH"
        className="w-full"
      >
        <div
          data-cid="div-HjvR8O"
          className="flex h-[32px] w-full sm:w-[140px] md:w-[160px] lg:w-[196px] items-center justify-between rounded-lg border-2 border-solid border-border bg-background p-2"
        >
          <div
            data-cid="div-gVDBb1"
            className="flex items-center gap-3"
          >
            <TagIcon
              data-cid="TagIcon-xsB7sR"
              size={18}
              color="hsl(var(--foreground))"
            />
            <p
              data-cid="p-WCBVss"
              className={`text-base leading-none text-foreground ${!category && 'text-muted-foreground'}`}
            >
              {category || '카테고리'}
            </p>
          </div>
          <ChevronDownIcon
            data-cid="ChevronDownIcon-cTspGC"
            size={18}
            color="hsl(var(--accent-foreground))"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent data-cid="DropdownMenuContent-GGxi5R">
        <DropdownMenuGroup
          data-cid="DropdownMenuGroup-BGOOsT"
          className="max-h-96 overflow-y-auto"
        >
          {LostCategories.map((category) => (
            <DropdownMenuItem
              data-cid="DropdownMenuItem-A7Rdxz"
              key={category}
              onClick={() => updateCategory(category)}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function SearchFilter() {
  return (
    <div
      data-cid="div-ckVaYe"
      className="absolute right-2 top-16 sm:right-4 sm:top-20 lg:right-10 lg:top-24 z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 lg:gap-6 w-auto"
    >
      {/* 날짜 선택 캘린더 */}
      <div
        data-cid="div-date-wrapper"
        className="order-1"
      >
        <DateRangePicker data-cid="DateRangePicker-6FkJ4f" />
      </div>
      {/* 지역 선택 드롭다운 */}
      <div
        data-cid="div-location-wrapper"
        className="order-2"
      >
        <LocationPicker data-cid="LocationPicker-YUsS7W" />
      </div>
      {/* 카테고리 선택 드롭다운 */}
      <div
        data-cid="div-category-wrapper"
        className="order-3"
      >
        <CategoryPicker data-cid="CategoryPicker-6FkJ4f" />
      </div>
    </div>
  );
}
