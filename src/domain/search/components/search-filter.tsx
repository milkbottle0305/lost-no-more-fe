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

import { useSearchContext } from '../contexts/search-context';
import { DateRangePicker } from './date-range-picker';

export default function SearchFilter() {
  const { location, setLocation, category, setCategory } = useSearchContext();

  return (
    <div
      data-cid="div-ckVaYe"
      className="absolute right-10 top-24 z-10 flex items-center gap-6"
    >
      {/* 날짜 선택 캘린더 */}
      <DateRangePicker data-cid="DateRangePicker-6FkJ4f" />
      {/* 지역 선택 드롭다운 */}
      <DropdownMenu data-cid="DropdownMenu-g4cXl7">
        <DropdownMenuTrigger
          data-cid="DropdownMenuTrigger-Q3VmIz"
          className="w-full"
        >
          <div
            data-cid="div-0Di81I"
            className="flex h-[32px] w-[196px] items-center justify-between rounded-lg border-2 border-solid border-border bg-background p-2"
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
                onClick={() => setLocation(location)}
              >
                {location}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* 카테고리 선택 드롭다운 */}
      <DropdownMenu data-cid="DropdownMenu-I9Mbik">
        <DropdownMenuTrigger
          data-cid="DropdownMenuTrigger-35zjxH"
          className="w-full"
        >
          <div
            data-cid="div-HjvR8O"
            className="flex h-[32px] w-[196px] items-center justify-between rounded-lg border-2 border-solid border-border bg-background p-2"
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
                className={`text-base leading-none text-foreground ${!location && 'text-muted-foreground'}`}
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
                onClick={() => setCategory(category)}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>{' '}
    </div>
  );
}
