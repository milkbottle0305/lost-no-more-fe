'use client';

import { useCallback, useEffect, useState } from 'react';

import { ChevronDown, ChevronUp, X } from 'lucide-react';

import { useMapPanelStore } from '../stores/map-panel-store';
import MobileMapPanelContent from './mobile-map-panel-content';

type SheetState = 'closed' | 'peek' | 'full';

export default function BottomSheetMobile() {
  const [sheetState, setSheetState] = useState<SheetState>('closed');
  const { lostItemIds, setLostItemIds } = useMapPanelStore();

  // 지도 핀/클러스터 클릭 이벤트 감지
  useEffect(() => {
    const handleOpenBottomSheet = (event: CustomEvent) => {
      const { itemIds } = event.detail;
      setLostItemIds(itemIds);
      setSheetState('peek'); // peek 모드로 시트 열기
    };

    window.addEventListener('openBottomSheet', handleOpenBottomSheet as EventListener);

    return () => {
      window.removeEventListener('openBottomSheet', handleOpenBottomSheet as EventListener);
    };
  }, [setLostItemIds]);

  const toggleSheet = useCallback(() => {
    if (sheetState === 'closed') {
      setSheetState('peek');
    } else if (sheetState === 'peek') {
      setSheetState('full');
    } else {
      setSheetState('peek');
    }
  }, [sheetState]);

  const closeSheet = useCallback(() => {
    setSheetState('closed');
  }, []);

  const getSheetStyles = () => {
    switch (sheetState) {
      case 'closed':
        return 'transform translate-y-full opacity-0 pointer-events-none';
      case 'peek':
        return 'transform translate-y-0 opacity-100';
      case 'full':
        return 'transform translate-y-0 opacity-100';
      default:
        return 'transform translate-y-full opacity-0 pointer-events-none';
    }
  };

  const getContentHeight = () => {
    switch (sheetState) {
      case 'peek':
        return 'h-32';
      case 'full':
        return 'h-96';
      default:
        return 'h-0';
    }
  };

  // 바텀시트가 닫혀있지만 분실물 데이터가 있을 때 다시 열기 버튼 표시
  if (sheetState === 'closed') {
    // 분실물이 있을 때만 다시 열기 버튼 표시
    if (lostItemIds.length > 0) {
      return (
        <div
          data-cid="div-reopener-button"
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
        >
          <button
            data-cid="button-reopen-sheet"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 flex items-center gap-2"
            onClick={() => setSheetState('peek')}
          >
            <ChevronUp
              data-cid="icon-chevron-up-reopen"
              className="w-4 h-4"
            />
            분실물 {lostItemIds.length}개 보기
          </button>
        </div>
      );
    }
    return null;
  }

  return (
    <div
      data-cid="div-mobile-bottom-sheet"
      className={`
        fixed inset-x-0 bottom-0 z-50 bg-background border-t border-border rounded-t-lg shadow-lg
        transition-all duration-300 ease-in-out
        ${getSheetStyles()}
      `}
    >
      {/* 드래그 핸들 */}
      <div
        data-cid="div-sheet-header"
        className="flex items-center justify-between p-4"
      >
        <div
          data-cid="div-drag-handle"
          className="flex-1 flex justify-center"
        >
          <div
            data-cid="div-handle-bar"
            className="w-12 h-1 bg-muted-foreground/30 rounded-full"
          />
        </div>

        {/* 토글 버튼 */}
        <button
          data-cid="button-toggle"
          className="p-2 hover:bg-muted rounded-full transition-colors"
          onClick={toggleSheet}
        >
          {sheetState === 'peek' ? (
            <ChevronUp
              data-cid="icon-chevron-up"
              className="w-5 h-5"
            />
          ) : (
            <ChevronDown
              data-cid="icon-chevron-down"
              className="w-5 h-5"
            />
          )}
        </button>

        {/* 닫기 버튼 */}
        <button
          data-cid="button-close"
          className="p-2 hover:bg-muted rounded-full transition-colors ml-2"
          onClick={closeSheet}
        >
          <X
            data-cid="icon-close"
            className="w-5 h-5"
          />
        </button>
      </div>

      {/* 시트 내용 */}
      <div
        data-cid="div-sheet-content"
        className={`
          overflow-hidden transition-all duration-200
          ${getContentHeight()}
        `}
      >
        {lostItemIds.length > 0 ? (
          <MobileMapPanelContent data-cid="component-mobile-map-panel-content" />
        ) : (
          <div
            data-cid="div-empty-state"
            className="flex items-center justify-center h-full"
          >
            <p
              data-cid="p-empty-message"
              className="text-muted-foreground"
            >
              분실물을 선택해주세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
