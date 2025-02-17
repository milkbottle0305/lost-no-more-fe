'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import { buildContext } from '@/lib/build-context';

type LostNoMoreMapContextType = {
  center: { lat: number; lng: number };
  setCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
};

const [_LostNoMoreMapProvider, useLostNoMoreMapContext] = buildContext<LostNoMoreMapContextType>(
  'LostNoMoreMap',
  {
    center: { lat: 37.5665, lng: 126.978 },
    setCenter: () => {},
    level: 3,
    setLevel: () => {},
  }
);

const LostNoMoreMapProvider = ({ children }: { children: React.ReactNode }) => {
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const [level, setLevel] = useState(3);

  const handleSetLevel: Dispatch<SetStateAction<number>> = (value) => {
    setLevel((prevLevel) => {
      const newLevel = typeof value === 'function' ? value(prevLevel) : value;
      if (newLevel >= 1 && newLevel <= 7) {
        return newLevel;
      }
      return prevLevel;
    });
  };

  return (
    <_LostNoMoreMapProvider
      data-cid="_LostNoMoreMapProvider-q5NXTY"
      center={center}
      setCenter={setCenter}
      level={level}
      setLevel={handleSetLevel}
    >
      {children}
    </_LostNoMoreMapProvider>
  );
};

export { LostNoMoreMapProvider, useLostNoMoreMapContext };
