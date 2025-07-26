// map-store.ts
import { create } from 'zustand';

interface LostNoMoreMapState {
  center: { lat: number; lng: number };
  level: number;
  setCenter: (center: { lat: number; lng: number }) => void;
  setLevel: (level: number | ((prev: number) => number)) => void;
}

export const useLostNoMoreMapStore = create<LostNoMoreMapState>((set) => ({
  center: { lat: 37.5665, lng: 126.978 },
  level: 3,

  setCenter: (center) => set({ center }),

  setLevel: (levelOrFn) =>
    set((state) => {
      const newLevel = typeof levelOrFn === 'function' ? levelOrFn(state.level) : levelOrFn;

      if (newLevel >= 1 && newLevel <= 7) {
        return { level: newLevel };
      }
      return state;
    }),
}));
