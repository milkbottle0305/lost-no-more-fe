'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

import useBoolean from '@/shared/hooks/useBoolean';
import { buildContext } from '@/shared/utils/build-context';

/**
 * MapPanelContextProps
 * @interface
 * @property {number[]} lostItemIds - 분실물 아이템의 ID 목록
 * @property {Dispatch<SetStateAction<number[]>>} setLostItemIds - 분실물 아이템 ID 목록을 설정하는 함수
 * @property {number} currentItemId - 현재 선택된 분실물 아이템의 ID
 * @property {Dispatch<SetStateAction<number>>} setCurrentItemId - 현재 선택된 분실물 아이템의 ID를 설정하는 함수
 * @property {number} scrollPosition - 메인패널의 스크롤 위치
 * @property {Dispatch<SetStateAction<number>>) => void} setScrollPosition - 메인패널의 스크롤 위치를 설정하는 함수
 * @property {boolean} isPanelOpen - 메인패널이 열려있는지 여부
 * @property {(isOpen: boolean) => void} setPanelOpen - 메인패널의 열림 여부를 설정하는 함수
 */
interface MapPanelContextProps {
  lostItemIds: number[];
  setLostItemIds: Dispatch<SetStateAction<number[]>>;
  currentItemId: number;
  setCurrentItemId: Dispatch<SetStateAction<number>>;
  scrollPosition: number;
  setScrollPosition: Dispatch<SetStateAction<number>>;
  isPanelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
}

const [_MapPanelProvider, useMapPanelContext] = buildContext<MapPanelContextProps>('MapPanel', {
  lostItemIds: [],
  setLostItemIds: () => {},
  currentItemId: 0,
  setCurrentItemId: () => {},
  scrollPosition: 0,
  setScrollPosition: () => {},
  isPanelOpen: false,
  openPanel: () => {},
  closePanel: () => {},
});

const MapPanelProvider = ({ children }: { children: React.ReactNode }) => {
  const [lostItemIds, setLostItemIds] = useState<number[]>([]);
  const [currentItemId, setCurrentItemId] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const { value: isPanelOpen, setTrue: openPanel, setFalse: closePanel } = useBoolean();

  useEffect(() => {
    console.log(lostItemIds);
  }, [lostItemIds]);

  return (
    <_MapPanelProvider
      data-cid="_MapPanelProvider-Ryvoxw"
      lostItemIds={lostItemIds}
      setLostItemIds={setLostItemIds}
      currentItemId={currentItemId}
      setCurrentItemId={setCurrentItemId}
      scrollPosition={scrollPosition}
      setScrollPosition={setScrollPosition}
      isPanelOpen={isPanelOpen}
      openPanel={openPanel}
      closePanel={closePanel}
    >
      {children}
    </_MapPanelProvider>
  );
};

export { MapPanelProvider, useMapPanelContext };
