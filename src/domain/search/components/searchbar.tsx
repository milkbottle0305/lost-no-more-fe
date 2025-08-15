'use client';

import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { SearchIcon } from 'lucide-react';

import useSearchStore from '../stores/search-store';

export default function Searchbar() {
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
      data-cid="div-CKhgXS"
      className="flex w-full max-w-sm md:w-80 lg:w-96 items-center gap-2 rounded-lg bg-background px-3 py-2.5"
    >
      <Button
        data-cid="button-AoeBMA"
        variant="ghost"
        className="h-5 p-0"
        onClick={handleButtonClick}
      >
        <SearchIcon
          data-cid="SearchIcon-rg3Mtd"
          size={20}
          color="hsl(var(--primary))"
        />
      </Button>
      <input
        data-cid="input-xsnCOm"
        value={localKeyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full text-start text-base"
        placeholder="분실물 검색"
      />
      <div
        data-cid="div-7UNXRe"
        className="flex items-center justify-center gap-6"
      />
    </div>
  );
}
