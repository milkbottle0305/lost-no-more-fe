import { LostNoMoreMapProvider } from '@/contexts/lost-no-more-map-context';
import { MapPanelProvider } from '@/contexts/map-panel-context';
import { SearchProvider } from '@/contexts/search-context';

import Headerbar from '@/components/common/headerbar';
import LostNoMoreMap from '@/components/searchpage/lost-no-more-map';
import MapPanelSwitch from '@/components/searchpage/map-panel-switch';
import SearchFilter from '@/components/searchpage/search-filter';

export default function SearchPage() {
  return (
    <div
      data-cid="div-4y5gnK"
      className="flex h-screen w-full flex-col"
    >
      <SearchProvider data-cid="SearchProvider-XJRJNN">
        <Headerbar data-cid="Headerbar-C7Nhit" />
        <SearchFilter data-cid="SearchFilter-s8q90v" />
      </SearchProvider>
      <div
        data-cid="div-g6Hnk4"
        className="flex h-0 flex-1"
      >
        <MapPanelProvider data-cid="MapPanelProvider-IXs9xN">
          <MapPanelSwitch data-cid="MapPanelSwitch-grWpHo" />
          <LostNoMoreMapProvider data-cid="LostNoMoreMapProvider-bLJEWL">
            <LostNoMoreMap data-cid="LostNoMoreMap-ue0XpN" />
          </LostNoMoreMapProvider>
        </MapPanelProvider>
      </div>
    </div>
  );
}
