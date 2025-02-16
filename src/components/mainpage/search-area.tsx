'use client';

import { useState } from 'react';

import { MapPinIcon, SearchIcon, TagIcon } from 'lucide-react';

import { LostCategories, LostCategory, LostLocation, LostLocations } from '@/types/lost-property';

import IconInput from '@/components/common/icon-input';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function SearchArea() {
  const [keyword, setKeyword] = useState<string>('');
  const [location, setLocation] = useState<LostLocation | null>(null);
  const [category, setCategory] = useState<LostCategory | null>(null);

  return (
    <>
      <IconInput
        data-cid="IconInput-Yn5qlu"
        className="mb-4"
        slots={{
          icon: () => (
            <SearchIcon
              data-cid="SearchIcon-aPbBrs"
              size={32}
              color="hsl(var(--secondary-foreground))"
            />
          ),
          input: () => (
            <input
              data-cid="input-zGUEtG"
              className="w-full bg-background outline-none"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={'무엇을 잃어버리셨나요?'}
            />
          ),
        }}
      />
      <div
        data-cid="div-FyG2z0"
        className="flex items-center gap-6"
      >
        <DropdownMenu data-cid="DropdownMenu-g4cXl7">
          <DropdownMenuTrigger
            data-cid="DropdownMenuTrigger-Q3VmIz"
            className="w-full"
          >
            <IconInput
              data-cid="IconInput-FSS8M4"
              slots={{
                icon: () => (
                  <MapPinIcon
                    data-cid="MapPinIcon-o8GI4E"
                    size={32}
                    color="hsl(var(--secondary-foreground))"
                  ></MapPinIcon>
                ),
                input: () => (
                  <p
                    data-cid="p-VaXtRF"
                    className="w-full bg-background text-start"
                  >
                    {location || '지역'}
                  </p>
                ),
              }}
            />
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
        <DropdownMenu data-cid="DropdownMenu-mnm5vL">
          <DropdownMenuTrigger
            data-cid="DropdownMenuTrigger-WP5utb"
            className="w-full"
          >
            <IconInput
              data-cid="IconInput-eIm1t2"
              slots={{
                icon: () => (
                  <TagIcon
                    data-cid="TagIcon-MdHaZD"
                    size={32}
                    color="hsl(var(--secondary-foreground))"
                  />
                ),
                input: () => (
                  <p
                    data-cid="p-wIYMOO"
                    className="w-full bg-background text-start"
                  >
                    {category || '상품 카테고리'}
                  </p>
                ),
              }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent data-cid="DropdownMenuContent-17yADk">
            <DropdownMenuGroup
              data-cid="DropdownMenuGroup-g8UaKb"
              className="max-h-96 overflow-y-auto"
            >
              {LostCategories.map((category) => (
                <DropdownMenuItem
                  data-cid="DropdownMenuItem-oNYobI"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          data-cid="button-mlleZa"
          className="whitespace-nowrap rounded-xl bg-secondary-foreground px-8 py-[10px] text-center text-2xl font-bold text-secondary"
        >
          검색
        </button>
      </div>
    </>
  );
}
