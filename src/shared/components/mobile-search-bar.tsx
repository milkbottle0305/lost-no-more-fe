'use client';

import { useState } from 'react';

import useSearchStore from '@/domain/search/stores/search-store';
import { Button } from '@/shared/ui/button';
import { SearchIcon } from 'lucide-react';

export default function MobileSearchBar() {
  const [localKeyword, setLocalKeyword] = useState('');
  const updateKeyword = useSearchStore((state) => state.updateKeyword);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalKeyword(event.target.value);
  };

  const handleButtonClick = () => {
    updateKeyword(localKeyword);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <div
      data-cid="div-mobile-search"
      className="md:hidden w-full px-4 py-3 bg-primary"
    >
      <div
        data-cid="div-search-input"
        className="flex w-full items-center gap-2 rounded-lg bg-background px-3 py-2"
      >
        <Button
          data-cid="button-search"
          variant="ghost"
          className="h-5 p-0"
          onClick={handleButtonClick}
        >
          <SearchIcon
            data-cid="SearchIcon-mobile"
            size={20}
            color="hsl(var(--primary))"
          />
        </Button>
        <input
          data-cid="input-mobile-search"
          value={localKeyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full text-start text-base bg-transparent outline-none"
          placeholder="분실물 검색"
        />
      </div>
    </div>
  );
}
