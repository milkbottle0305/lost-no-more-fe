import React from 'react';

import type { KeywordItem } from '@/domain/notification/types/keyword';
import { Button } from '@/shared/ui/button';
import { SlidersHorizontal, Trash2 } from 'lucide-react';

interface KeywordListProps {
  keywords: KeywordItem[];
  removeKeyword: (keywordId: string) => void;
  onSettingsClick: (keyword: KeywordItem) => void;
}

export default function KeywordList({
  keywords,
  removeKeyword,
  onSettingsClick,
}: KeywordListProps) {
  return (
    <ul
      data-cid="ul-opB9gt"
      className="max-h-64 overflow-y-auto"
    >
      {keywords.map((keyword) => (
        <li
          data-cid="li-uYkrgc"
          key={keyword.id}
          className="mb-2 flex h-12 items-center justify-between rounded-lg bg-secondary p-2"
        >
          <span
            data-cid="span-zCaCkt"
            className="px-2 font-semibold text-secondary-foreground"
          >
            {keyword.text}
          </span>
          <div
            data-cid="div-vrHbMn"
            className="flex items-center"
          >
            <Button
              data-cid="Button-SWGxsF"
              variant="ghost"
              onClick={() => onSettingsClick(keyword)}
            >
              <SlidersHorizontal
                data-cid="SlidersHorizontal-goeIgC"
                className="h-5 w-5"
                color="hsl(var(--secondary-foreground))"
                strokeWidth={2.5}
              />
            </Button>
            <Button
              data-cid="Button-p3qOFK"
              variant="ghost"
              onClick={() => removeKeyword(keyword.id)}
            >
              <Trash2
                data-cid="Trash2-3lCa0y"
                className="h-5 w-5"
                color="hsl(var(--secondary-foreground))"
                strokeWidth={2.5}
              />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
