import { useCallback } from 'react';

import { cn } from '@/shared/utils/utils';
import { NavigationIcon } from 'lucide-react';

import { useLostNoMoreMapStore } from '../stores/lost-no-more-map-store';

export default function MoveMyPosButton({ className }: { className?: string }) {
  const setCenter = useLostNoMoreMapStore((state) => state.setCenter);
  const handleClick = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCenter({ lat: latitude, lng: longitude });
    });
  }, [setCenter]);

  return (
    <button
      data-cid="button-vhigTc"
      onClick={handleClick}
      className={cn(
        'border-1 group rounded-lg border-2 border-solid border-border bg-background p-2 hover:border-background hover:bg-foreground',
        className
      )}
    >
      <NavigationIcon
        data-cid="NavigationIcon-aJeze8"
        size={24}
        className="text-foreground group-hover:text-background"
      />
    </button>
  );
}
