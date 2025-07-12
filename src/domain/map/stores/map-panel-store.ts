import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * 애플리케이션에서 맵 패널을 관리하기 위한 상태와 동작을 나타냅니다.
 * @interface MapPanelState
 *
 * @property {number[]} lostItemIds - 분실물 아이템의 ID 배열.
 * @property {number} currentItemId - 현재 선택된 분실물 아이템의 ID.
 * @property {number} scrollPosition - 맵 패널의 스크롤 위치.
 * @property {boolean} isPanelOpen - 맵 패널이 열려 있는지 여부.
 * @property {boolean} isLoadingMapPanel - 맵 패널이 로딩 중인지 여부.
 *
 * @property {(ids: number[]) => void} setLostItemIds - 분실물 아이템 ID 목록을 설정하는 함수.
 * @property {(id: number) => void} setCurrentItemId - 현재 선택된 분실물 아이템 ID를 설정하는 함수.
 * @property {(position: number) => void} setScrollPosition - 맵 패널의 스크롤 위치를 설정하는 함수.
 * @property {() => void} openPanel - 맵 패널을 여는 함수.
 * @property {() => void} closePanel - 맵 패널을 닫는 함수.
 * @property {(isLoading: boolean) => void} setIsLoadingMapPanel - 맵 패널의 로딩 상태를 설정하는 함수.
 */
interface MapPanelState {
  lostItemIds: number[];
  currentItemId: number;
  scrollPosition: number;
  isPanelOpen: boolean;
  isMapPanelLoading: boolean;

  setLostItemIds: (ids: number[]) => void;
  setCurrentItemId: (id: number) => void;
  setScrollPosition: (position: number) => void;
  openPanel: () => void;
  closePanel: () => void;
  setIsMapPanelLoading: (isLoading: boolean) => void;
}

export const useMapPanelStore = create<MapPanelState>()(
  devtools((set) => ({
    lostItemIds: [],
    currentItemId: 0,
    scrollPosition: 0,
    isPanelOpen: false,
    isMapPanelLoading: false,

    setLostItemIds: (ids) =>
      set((state) => ({
        ...state,
        lostItemIds: [...ids],
      })),

    setCurrentItemId: (id) =>
      set(() => ({
        currentItemId: id,
      })),

    setScrollPosition: (position) =>
      set(() => ({
        scrollPosition: position,
      })),

    openPanel: () =>
      set(() => ({
        isPanelOpen: true,
      })),

    closePanel: () =>
      set(() => ({
        isPanelOpen: false,
      })),

    setIsMapPanelLoading: (isLoading) =>
      set(() => ({
        isMapPanelLoading: isLoading,
      })),
  }))
);
