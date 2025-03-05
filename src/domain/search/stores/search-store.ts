import type { LostCategory, LostLocation } from '@/shared/types/lost-property';
import { subDays } from 'date-fns';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

interface SearchState {
  keyword: string;
  category: LostCategory | null;
  location: LostLocation | null;
  dateStart: Date;
  dateEnd: Date;
  topLeftLat: number;
  topLeftLon: number;
  bottomRightLat: number;
  bottomRightLon: number;
}

interface SearchActions {
  updateKeyword: (keyword: string) => void;
  updateCategory: (category: LostCategory) => void;
  updateLocation: (location: LostLocation) => void;
  updateDateStart: (dateStart: Date) => void;
  updateDateEnd: (dateEnd: Date) => void;
  updateTopLeftLat: (topLeftLat: number) => void;
  updateTopLeftLon: (topLeftLon: number) => void;
  updateBottomRightLat: (bottomRightLat: number) => void;
  updateBottomRightLon: (bottomRightLon: number) => void;
}

const useSearchStore = create(
  combine<SearchState, SearchActions>(
    {
      keyword: '',
      category: null,
      location: null,
      dateStart: subDays(new Date(), 7),
      dateEnd: new Date(),
      topLeftLat: 0,
      topLeftLon: 0,
      bottomRightLat: 0,
      bottomRightLon: 0,
    },
    (set) => ({
      updateKeyword: (keyword) => set({ keyword }),
      updateCategory: (category) => set({ category }),
      updateLocation: (location) => set({ location }),
      updateDateStart: (dateStart) => set({ dateStart }),
      updateDateEnd: (dateEnd) => set({ dateEnd }),
      updateTopLeftLat: (topLeftLat) => set({ topLeftLat }),
      updateTopLeftLon: (topLeftLon) => set({ topLeftLon }),
      updateBottomRightLat: (bottomRightLat) => set({ bottomRightLat }),
      updateBottomRightLon: (bottomRightLon) => set({ bottomRightLon }),
    })
  )
);

export default useSearchStore;
