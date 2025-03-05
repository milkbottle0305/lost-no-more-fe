import LostNoMoreMap from '@/domain/map/components/lost-no-more-map';
import MapPanelSwitch from '@/domain/map/components/map-panel-switch';
import { LostNoMoreMapProvider } from '@/domain/map/contexts/lost-no-more-map-context';
import { MapPanelProvider } from '@/domain/map/contexts/map-panel-context';
import SearchFilter from '@/domain/search/components/search-filter';
import Headerbar from '@/shared/components/headerbar';
import { QueryProvider } from '@/shared/lib/query-client';

export default function SearchPage() {
  return (
    <div
      data-cid="div-4y5gnK"
      className="flex h-screen w-full flex-col"
    >
      <Headerbar data-cid="Headerbar-C7Nhit" />
      <SearchFilter data-cid="SearchFilter-s8q90v" />
      <div
        data-cid="div-g6Hnk4"
        className="flex h-0 flex-1"
      >
        <MapPanelProvider data-cid="MapPanelProvider-IXs9xN">
          <MapPanelSwitch data-cid="MapPanelSwitch-grWpHo" />
          <LostNoMoreMapProvider data-cid="LostNoMoreMapProvider-bLJEWL">
            <QueryProvider data-cid="QueryProvider-1J9J9">
              <LostNoMoreMap data-cid="LostNoMoreMap-ue0XpN" />
            </QueryProvider>
          </LostNoMoreMapProvider>
        </MapPanelProvider>
      </div>
    </div>
  );
}
