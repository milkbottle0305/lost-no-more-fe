'use client';

import React, { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

interface KeywordInputProps {
  addKeyword: (keyword: string) => void;
}

export default function KeywordInput({ addKeyword }: KeywordInputProps) {
  const [keyword, setKeyword] = useState('');

  const handleAdd = () => {
    if (keyword.trim()) {
      addKeyword(keyword);
      setKeyword('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      handleAdd();
    }
  };

  return (
    <div
      data-cid="div-LYA5VH"
      className="my-4 flex"
    >
      <Input
        data-cid="Input-3tuxxd"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="키워드 입력"
        className="mr-4 h-12 flex-1"
      />
      <Button
        data-cid="Button-7b5cof"
        className="h-12 w-20 text-base font-semibold"
        onClick={handleAdd}
      >
        등록
      </Button>
    </div>
  );
}
