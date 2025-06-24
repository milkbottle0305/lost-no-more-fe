'use client';

import { useState } from 'react';

import type { KeywordItem } from '@/domain/notification/types/keyword';

import { useKeywords } from './useKeywordQuery';


export const useKeywordManagement = () => {
  const {
    keywords,
    isLoading,
    error,
    addKeyword,
    removeKeyword,
    updateKeyword: apiUpdateKeyword,
  } = useKeywords();

  const [selectedKeyword, setSelectedKeyword] = useState<KeywordItem | null>(null);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const handleSettingsClick = (keyword: KeywordItem) => {
    setSelectedKeyword(keyword);
    setIsSettingsVisible(true);
  };

  const handleBackClick = () => {
    setIsSettingsVisible(false);
    setSelectedKeyword(null);
  };

  const updateKeyword = (keywordId: string, updatedKeyword: Omit<KeywordItem, 'id'>) => {
    apiUpdateKeyword({
      keywordId,
      keyword: updatedKeyword.text,
      category: updatedKeyword.category,
      location: updatedKeyword.location,
    });

    if (selectedKeyword && selectedKeyword.id === keywordId) {
      setSelectedKeyword({
        ...selectedKeyword,
        ...updatedKeyword,
      });
    }
  };

  return {
    keywords,
    selectedKeyword,
    isSettingsVisible,
    isLoading,
    error,
    addKeyword,
    removeKeyword,
    handleSettingsClick,
    handleBackClick,
    updateKeyword,
  };
};