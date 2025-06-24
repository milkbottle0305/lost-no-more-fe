'use client';

import React, { useState } from 'react';

import { GenericSelect } from '@/shared/components/generic-select';
import type { KeywordItem } from '@/domain/notification/types/keyword';
import type { LostCategory, LostLocationForKeyword } from '@/shared/types/lost-property';
import { LostCategories, LostLocationsForKeywords } from '@/shared/types/lost-property';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { ChevronLeft, X } from 'lucide-react';

interface KeywordSettingsProps {
  keyword: KeywordItem;
  onBackClick: () => void;
  updateKeyword: (keywordId: string, updatedKeyword: Omit<KeywordItem, 'id'>) => void;
}

export default function KeywordSettings({
  keyword,
  onBackClick,
  updateKeyword,
}: KeywordSettingsProps) {
  const [keywordText, setKeywordText] = useState(keyword.text);
  const [selectedCategory, setSelectedCategory] = useState<LostCategory>(
    keyword.category || '전체'
  );
  const [selectedLocation, setSelectedLocation] = useState<LostLocationForKeyword>(
    keyword.location || '전체'
  );
  const [error, setError] = useState<string>('');

  const handleClearInput = () => {
    setKeywordText('');
    setError('');
  };

  const handleUpdateKeyword = () => {
    if (!keywordText.trim()) {
      setError('키워드를 입력해주세요');
      return;
    }

    updateKeyword(keyword.id, {
      text: keywordText,
      category: selectedCategory,
      location: selectedLocation,
    });

    onBackClick();
  };

  return (
    <div
      data-cid="div-Wkjgj6"
      className="h-full w-full"
    >
      <div
        data-cid="div-4ABR7F"
        className="mb-6 flex items-center"
      >
        <Button
          data-cid="Button-Iz2qRm"
          variant="ghost"
          onClick={onBackClick}
          className="mr-5 px-2"
        >
          <ChevronLeft
            data-cid="ChevronLeft-misItb"
            className="h-5 w-5"
          />
        </Button>
        <h2
          data-cid="h2-vsq2iO"
          className="text-xl font-semibold"
        >
          알림 조건 설정
        </h2>
      </div>
      <div
        data-cid="div-nJYlvI"
        className="space-y-6"
      >
        {/* 키워드 입력 */}
        <div
          data-cid="div-1q1MgV"
          className="space-y-1"
        >
          <Label
            data-cid="Label-nxEyOn"
            htmlFor="keyword"
          >
            키워드
          </Label>
          <div
            data-cid="div-GhaC4u"
            className="relative"
          >
            <Input
              data-cid="Input-4TjID6"
              id="keyword"
              value={keywordText}
              onChange={(e) => {
                setKeywordText(e.target.value);
                if (error) setError('');
              }}
              className={`w-full border-transparent bg-secondary pr-10 text-base font-semibold text-secondary-foreground ${
                error ? 'border-destructive' : ''
              }`}
            />
            {keywordText && (
              <Button
                data-cid="Button-7PVCjI"
                variant="ghost"
                onClick={handleClearInput}
                className="absolute right-0 top-1/2 -translate-y-1/2 transform py-2 text-secondary-foreground"
              >
                <X
                  data-cid="X-OukHaI"
                  className="h-4 w-4"
                />
              </Button>
            )}
          </div>
          {error && (
            <p
              data-cid="p-uo1byx"
              className="text-sm text-destructive"
            >
              {error}
            </p>
          )}
        </div>
        {/* 카테고리 선택 */}
        <div
          data-cid="div-BRP89u"
          className="space-y-1"
        >
          <GenericSelect
            data-cid="GenericSelect-SibZvc"
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={[...LostCategories]}
            width="w-60"
            label="카테고리"
            placeholder="카테고리를 선택하세요"
          />
        </div>
        {/* 지역 선택 */}
        <div
          data-cid="div-WtwYbE"
          className="space-y-2"
        >
          <GenericSelect
            data-cid="GenericSelect-EXfUuk"
            value={selectedLocation}
            onChange={setSelectedLocation}
            options={[...LostLocationsForKeywords]}
            width="w-60"
            label="지역"
            placeholder="지역을 선택하세요"
          />
        </div>
        <div
          data-cid="div-aJ5mhT"
          className="absolute bottom-0 left-1/2 right-0 bg-background p-6"
        >
          <Button
            data-cid="Button-1TvAR6"
            onClick={handleUpdateKeyword}
            className="w-full"
          >
            키워드 업데이트
          </Button>
        </div>
      </div>
    </div>
  );
}
