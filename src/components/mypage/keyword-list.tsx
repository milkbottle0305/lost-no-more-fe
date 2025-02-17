import React from 'react';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, Trash2 } from 'lucide-react';

interface KeywordListProps {
  keywords: string[];
  removeKeyword: (keyword: string) => void;
  onSettingsClick: (keyword: string) => void;
}

export default function KeywordList({
  keywords,
  removeKeyword,
  onSettingsClick,
}: KeywordListProps) {
  return (
    <ul data-cid="ul-opB9gt" className="max-h-64 overflow-y-auto">
      {keywords.map((kw) => (
        <li
          data-cid="li-uYkrgc"
          key={kw}
          className="mb-2 flex h-12 items-center justify-between rounded-lg bg-secondary p-2"
        >
          <span data-cid="span-zCaCkt" className="px-2 font-semibold text-secondary-foreground">
            {kw}
          </span>
          <div data-cid="div-vrHbMn" className="flex items-center">
            <Button data-cid="Button-SWGxsF" variant="ghost" onClick={() => onSettingsClick(kw)}>
              <SlidersHorizontal
                data-cid="SlidersHorizontal-goeIgC"
                className="h-5 w-5"
                color="hsl(var(--secondary-foreground))"
                strokeWidth={2.5}
              />
            </Button>
            <Button data-cid="Button-p3qOFK" variant="ghost" onClick={() => removeKeyword(kw)}>
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
