'use client';

import { SearchIcon } from 'lucide-react';

import { useSearchContext } from '../contexts/search-context';

export default function Searchbar() {
  const { keyword, setKeyword } = useSearchContext();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  return (
    <div
      data-cid="div-CKhgXS"
      className="flex w-96 items-center gap-2 rounded-lg bg-background px-3 py-2.5"
    >
      <button data-cid="button-AoeBMA">
        <SearchIcon
          data-cid="SearchIcon-rg3Mtd"
          size={20}
          color="hsl(var(--primary))"
        />
      </button>
      <input
        data-cid="input-xsnCOm"
        value={keyword}
        onChange={handleInputChange}
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
