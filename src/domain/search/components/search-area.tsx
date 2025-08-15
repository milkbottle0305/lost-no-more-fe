'use client';

import { useMemo } from 'react';

import { useRouter } from 'next/navigation';

import IconInput from '@/shared/components/icon-input';
import { LostCategories, LostLocations } from '@/shared/types/lost-property';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { MapPinIcon, SearchIcon, TagIcon } from 'lucide-react';

import useSearchStore from '../stores/search-store';

function Searchbar() {
  const keyword = useSearchStore((state) => state.keyword);
  const updateKeyword = useSearchStore((state) => state.updateKeyword);
  const router = useRouter();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && keyword) {
      router.push('/search');
    }
  };

  return (
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
            onKeyDown={handleKeyDown}
            onChange={(e) => updateKeyword(e.target.value)}
            placeholder={'무엇을 잃어버리셨나요?'}
          />
        ),
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
        <IconInput
          data-cid="IconInput-FSS8M4"
          slots={{
            icon: () => (
              <MapPinIcon
                data-cid="MapPinIcon-o8GI4E"
                size={32}
                color="hsl(var(--secondary-foreground))"
              />
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

function SearchButton() {
  const keyword = useSearchStore((state) => state.keyword);
  const location = useSearchStore((state) => state.location);
  const category = useSearchStore((state) => state.category);

  const router = useRouter();

  const isEnabled = useMemo(() => {
    return keyword || location || category;
  }, [keyword, location, category]);

  return (
    <Button
      data-cid="button-mlleZa"
      disabled={!isEnabled}
      onClick={() => router.push('/search')}
      className="whitespace-nowrap rounded-xl bg-secondary-foreground px-4 sm:px-6 lg:px-8 h-12 sm:h-13 lg:h-14 text-center text-lg sm:text-xl lg:text-2xl font-bold text-secondary w-full sm:w-auto"
    >
      검색
    </Button>
  );
}

export default function SearchArea() {
  return (
    <>
      <Searchbar data-cid="Searchbar-6qPgfD" />
      <div
        data-cid="div-FyG2z0"
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 lg:gap-6"
      >
        <div
          data-cid="div-pickers"
          className="flex flex-1 gap-3 sm:gap-4 lg:gap-6"
        >
          <div
            data-cid="div-location"
            className="flex-1"
          >
            <LocationPicker data-cid="LocationPicker-1rZw5k" />
          </div>
          <div
            data-cid="div-category"
            className="flex-1"
          >
            <CategoryPicker data-cid="CategoryPicker-575k2U" />
          </div>
        </div>
        <div
          data-cid="div-search-button"
          className="sm:flex-shrink-0"
        >
          <SearchButton data-cid="SearchButton-1xrH5c" />
        </div>
      </div>
    </>
  );
}
