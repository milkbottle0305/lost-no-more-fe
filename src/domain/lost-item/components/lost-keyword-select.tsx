import React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

// 키워드 타입 정의
type KeywordType = 'all' | string;

interface KeywordItem {
  id: string;
  text: string;
  category: string;
  location: string;
}

interface KeywordSelectProps {
  keyword: KeywordType;
  onKeywordChange: (value: KeywordType) => void;
  keywords?: KeywordItem[];
  isLoading?: boolean;
}

export default function KeywordSelect({
  keyword,
  onKeywordChange,
  keywords = [],
  isLoading = false,
}: KeywordSelectProps) {
  return (
    <Select
      data-cid="Select-IgJdMr"
      onValueChange={onKeywordChange}
      value={keyword}
      disabled={isLoading}
    >
      <SelectTrigger
        data-cid="SelectTrigger-ALC1hC"
        className="w-[200px]"
      >
        <SelectValue
          data-cid="SelectValue-wByxLw"
          placeholder={isLoading ? '키워드를 불러오는 중...' : '키워드를 선택하세요'}
        />
      </SelectTrigger>
      <SelectContent data-cid="SelectContent-VRCjBf">
        <SelectGroup data-cid="SelectGroup-KmFMt7">
          <SelectItem
            data-cid="SelectItem-8ox5a8"
            value="all"
          >
            전체
          </SelectItem>
          {keywords.map((keywordItem) => (
            <SelectItem
              key={keywordItem.id}
              data-cid={`SelectItem-${keywordItem.id}`}
              value={keywordItem.text}
            >
              {keywordItem.text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
