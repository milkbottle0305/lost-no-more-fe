import BottomSheetMobile from '@/domain/map/components/bottom-sheet-mobile';
import LostNoMoreMap from '@/domain/map/components/lost-no-more-map';
import MapPanelSwitch from '@/domain/map/components/map-panel-switch';
import SearchFilter from '@/domain/search/components/search-filter';
import CompactHeaderbar from '@/shared/components/compact-headerbar';
import { QueryProvider } from '@/shared/lib/query-client';

export default function SearchPage() {
  return (
    <div
      data-cid="div-4y5gnK"
      className="flex h-screen w-full flex-col"
    >
      <CompactHeaderbar data-cid="CompactHeaderbar-search" />
      <SearchFilter data-cid="SearchFilter-s8q90v" />
      <div
        data-cid="div-g6Hnk4"
        className="flex h-0 flex-1 relative"
      >
        <MapPanelSwitch data-cid="MapPanelSwitch-grWpHo" />
        <BottomSheetMobile data-cid="BottomSheetMobile-map" />
        <QueryProvider data-cid="QueryProvider-1J9J9">
          <LostNoMoreMap data-cid="LostNoMoreMap-ue0XpN" />
        </QueryProvider>
      </div>
    </div>
  );
}
