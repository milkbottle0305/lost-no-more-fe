'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LostLocations, LostCategories, LostLocation, LostCategory } from '@/types/lost-property';
import { MultiSelect } from '@/components/mypage/multi-select';
import {
  ChevronLeft,
  X,
  Briefcase,
  Gem,
  Book,
  FileText,
  Package,
  ShoppingBag,
  Dumbbell,
  Music,
  DollarSign,
  Shirt,
  Car,
  Smartphone,
  Wallet,
  ScrollText,
  Monitor,
  CreditCard,
  Banknote,
  Phone,
  Box,
} from 'lucide-react';

const categoryIcons = {
  가방: Briefcase,
  귀금속: Gem,
  도서용품: Book,
  무주물: Package,
  서류: FileText,
  산업용품: Package,
  쇼핑백: ShoppingBag,
  스포츠용품: Dumbbell,
  악기: Music,
  유가증권: DollarSign,
  의류: Shirt,
  자동차: Car,
  전자기기: Smartphone,
  지갑: Wallet,
  증명서: ScrollText,
  컴퓨터: Monitor,
  카트: CreditCard,
  현금: Banknote,
  휴대폰: Phone,
  기타물품: Box,
  유류품: Box,
};

const CategoriesList = LostCategories.filter((category) => category !== '전체').map((category) => ({
  value: category,
  label: category,
  icon: categoryIcons[category],
}));

interface KeywordSettingsProps {
  keyword: string;
  onBackClick: () => void;
  updateKeyword: (oldKeyword: string, newKeyword: string) => void;
}

export default function KeywordSettings({
  keyword,
  onBackClick,
  updateKeyword,
}: KeywordSettingsProps) {
  const [keywordInput, setKeywordInput] = useState(keyword);
  const [selectedCategories, setSelectedCategories] = useState<LostCategory[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LostLocation>('전체');
  const [error, setError] = useState<string>('');

  const handleClearInput = () => {
    setKeywordInput('');
    setError('');
  };

  const handleUpdateKeyword = () => {
    if (!keywordInput.trim()) {
      setError('키워드를 입력해주세요');
      return;
    }
    updateKeyword(keyword, keywordInput);
    onBackClick();
  };

  return (
    <div data-cid="div-Wkjgj6" className="h-full w-full">
      <div data-cid="div-4ABR7F" className="mb-6 flex items-center">
        <Button
          data-cid="Button-Iz2qRm"
          variant="ghost"
          onClick={onBackClick}
          className="mr-5 px-2"
        >
          <ChevronLeft data-cid="ChevronLeft-misItb" className="h-5 w-5" />
        </Button>
        <h2 data-cid="h2-vsq2iO" className="text-xl font-semibold">
          알림 조건 설정
        </h2>
      </div>
      <div data-cid="div-nJYlvI" className="space-y-6">
        {/* 키워드 입력 */}
        <div data-cid="div-1q1MgV" className="space-y-1">
          <Label data-cid="Label-nxEyOn" htmlFor="keyword">
            키워드
          </Label>
          <div data-cid="div-GhaC4u" className="relative">
            <Input
              data-cid="Input-4TjID6"
              id="keyword"
              value={keywordInput}
              onChange={(e) => {
                setKeywordInput(e.target.value);
                if (error) setError('');
              }}
              className={`w-full border-transparent bg-secondary pr-10 text-base font-semibold text-secondary-foreground ${
                error ? 'border-red-500' : ''
              }`}
            />
            {keywordInput && (
              <Button
                data-cid="Button-7PVCjI"
                variant="ghost"
                onClick={handleClearInput}
                className="absolute right-0 top-1/2 -translate-y-1/2 transform py-2 text-secondary-foreground"
              >
                <X data-cid="X-OukHaI" className="h-4 w-4" />
              </Button>
            )}
          </div>
          {error && (
            <p data-cid="p-uo1byx" className="text-sm text-red-500">
              {error}
            </p>
          )}
        </div>
        {/* 카테고리 선택 */}
        <div data-cid="div-BRP89u" className="space-y-1">
          <Label data-cid="Label-gteKDa">카테고리 (중복 선택 가능)</Label>
          <MultiSelect
            data-cid="MultiSelect-IvwCZx"
            options={CategoriesList}
            onValueChange={(values: string[]) => setSelectedCategories(values as LostCategory[])}
            defaultValue={selectedCategories}
            placeholder="카테고리를 선택하세요."
            variant="inverted"
            maxCount={3}
          />
        </div>
        {/* 지역 선택 */}
        <div data-cid="div-WtwYbE" className="space-y-2">
          <Label data-cid="Label-bwIB6C">지역</Label>
          <Select
            data-cid="Select-vPXXWS"
            onValueChange={(value: string) => setSelectedLocation(value as LostLocation)}
            value={selectedLocation}
          >
            <SelectTrigger data-cid="SelectTrigger-cPNMqJ" className="w-60">
              <SelectValue data-cid="SelectValue-ZrQ2fG" placeholder="지역을 선택하세요." />
            </SelectTrigger>
            <SelectContent data-cid="SelectContent-w0AmLa">
              <SelectGroup data-cid="SelectGroup-EvrfT8">
                {LostLocations.map((loc) => (
                  <SelectItem data-cid="SelectItem-a6XZ00" key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div data-cid="div-aJ5mhT" className="absolute bottom-0 left-1/2 right-0 bg-background p-6">
          <Button data-cid="Button-1TvAR6" onClick={handleUpdateKeyword} className="w-full">
            키워드 업데이트
          </Button>
        </div>
      </div>
    </div>
  );
}
