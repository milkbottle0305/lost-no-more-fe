import { ZoomInIcon, ZoomOutIcon } from 'lucide-react';

import { useLostNoMoreMapStore } from '../stores/lost-no-more-map-store';

export default function ZoomController() {
  const setLevel = useLostNoMoreMapStore((state) => state.setLevel);
  const zoomIn = () => {
    setLevel((prev) => prev - 1);
  };

  const zoomOut = () => {
    setLevel((prev) => prev + 1);
  };

  return (
    <div
      data-cid="div-OFXO9z"
      className="flex items-center overflow-hidden rounded-lg border-2 border-solid border-border bg-background"
    >
      <button
        data-cid="button-B1EJub"
        className="group p-2 hover:bg-foreground"
        onClick={zoomIn}
      >
        <ZoomInIcon
          data-cid="ZoomInIcon-cW1HCh"
          size={24}
          className="text-foreground group-hover:text-background"
        />
      </button>
      <button
        data-cid="button-mk4Qc9"
        className="group p-2 hover:bg-foreground"
        onClick={zoomOut}
      >
        <ZoomOutIcon
          data-cid="ZoomOutIcon-S6Dm0k"
          size={24}
          className="text-foreground group-hover:text-background"
        />
      </button>
    </div>
  );
}
