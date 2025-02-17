import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { KeywordType } from '@/utils/data';

interface KeywordSelectProps {
  keyword: KeywordType;
  onKeywordChange: (value: KeywordType) => void;
}

export default function KeywordSelect({ keyword, onKeywordChange }: KeywordSelectProps) {
  return (
    <Select data-cid="Select-IgJdMr" onValueChange={onKeywordChange} value={keyword}>
      <SelectTrigger data-cid="SelectTrigger-ALC1hC" className="w-[200px]">
        <SelectValue data-cid="SelectValue-wByxLw" placeholder="키워드를 선택하세요" />
      </SelectTrigger>
      <SelectContent data-cid="SelectContent-VRCjBf">
        <SelectGroup data-cid="SelectGroup-KmFMt7">
          <SelectItem data-cid="SelectItem-8ox5a8" value="all">
            전체
          </SelectItem>
          <SelectItem data-cid="SelectItem-UywRJ5" value="airpods">
            에어팟
          </SelectItem>
          <SelectItem data-cid="SelectItem-H6nbI7" value="freitag">
            프라이탁 가방
          </SelectItem>
          <SelectItem data-cid="SelectItem-TghTdz" value="football">
            축구공
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
