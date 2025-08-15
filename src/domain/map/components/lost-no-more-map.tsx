'use client';

import { useCallback, useEffect, useMemo } from 'react';

import { useSearchMapMarker } from '@/domain/search/hooks/ussSearchMapMarker';
import useSearchStore from '@/domain/search/stores/search-store';
import type { LostLocation } from '@/shared/types/lost-property';
import { debounce } from 'lodash';
import { Map, MapMarker, MarkerClusterer, useKakaoLoader } from 'react-kakao-maps-sdk';

import { useLostNoMoreMapStore } from '../stores/lost-no-more-map-store';
import { useMapPanelStore } from '../stores/map-panel-store';
import MoveMyPosButton from './move-mypos-button';
import ZoomController from './zoom-controller';

const MAP_REFRESH_DELAY = 500;

export default function LostNoMoreMap() {
  /**
   * kakao sdk 자체에서 loading, error을 관찰함
   *@ref: https://react-kakao-maps-sdk.jaeseokim.dev/docs/setup/withHook
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY ?? '',
    libraries: ['clusterer'],
  });
  const center = useLostNoMoreMapStore((state) => state.center);
  const setCenter = useLostNoMoreMapStore((state) => state.setCenter);
  const level = useLostNoMoreMapStore((state) => state.level);
  const setLostItemIds = useMapPanelStore((state) => state.setLostItemIds);
  const setIsMapPanelLoading = useMapPanelStore((state) => state.setIsMapPanelLoading);

  const updateTopLeftLat = useSearchStore((state) => state.updateTopLeftLat);
  const updateTopLeftLon = useSearchStore((state) => state.updateTopLeftLon);
  const updateBottomRightLat = useSearchStore((state) => state.updateBottomRightLat);
  const updateBottomRightLon = useSearchStore((state) => state.updateBottomRightLon);

  const location = useSearchStore((state) => state.location);

  useEffect(() => {
    const cities: Partial<Record<LostLocation, { lat: number; lng: number }>> = {
      서울특별시: { lat: 37.5665, lng: 126.978 },
      강원도: { lat: 37.8852, lng: 127.7299 },
      경기도: { lat: 37.2888, lng: 127.0535 },
      경상남도: { lat: 35.2377, lng: 128.6918 },
      경상북도: { lat: 36.5759, lng: 128.5055 },
      광주광역시: { lat: 35.1595, lng: 126.8526 },
      대구광역시: { lat: 35.8714, lng: 128.6014 },
      대전광역시: { lat: 36.3504, lng: 127.3845 },
      부산광역시: { lat: 35.1796, lng: 129.0756 },
      울산광역시: { lat: 35.5384, lng: 129.3114 },
      인천광역시: { lat: 37.4563, lng: 126.7052 },
      전라남도: { lat: 34.816, lng: 126.4627 },
      전라북도: { lat: 35.8202, lng: 127.1088 },
      충청남도: { lat: 36.6588, lng: 126.6725 },
      충청북도: { lat: 36.6353, lng: 127.4915 },
      제주특별자치도: { lat: 33.4996, lng: 126.5312 },
      세종특별자치시: { lat: 36.4801, lng: 127.289 },
    };
    if (location && cities[location]) {
      const target = cities[location];
      if (center.lat !== target.lat || center.lng !== target.lng) {
        setCenter(target);
      }
    }
    const unsubscribe = useSearchStore.subscribe(
      (state) => state.location,
      (newLocation) => {
        if (newLocation && cities[newLocation]) setCenter(cities[newLocation]);
      }
    );
    return () => unsubscribe();
  }, [location, setCenter, center]);

  const { data: mapMarkers, isFetching: isMapMarkerFetching } = useSearchMapMarker();

  const handleCenterChanged = useMemo(
    () =>
      debounce((map: kakao.maps.Map) => {
        setCenter({
          lat: map.getCenter().getLat(),
          lng: map.getCenter().getLng(),
        });
      }, MAP_REFRESH_DELAY),
    [setCenter]
  );

  const handleBoundsChanged = useMemo(
    () =>
      debounce((map: kakao.maps.Map) => {
        const bounds = map.getBounds();
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        updateTopLeftLat(ne.getLat());
        updateTopLeftLon(sw.getLng());
        updateBottomRightLat(sw.getLat());
        updateBottomRightLon(ne.getLng());
      }, MAP_REFRESH_DELAY),
    [updateBottomRightLat, updateBottomRightLon, updateTopLeftLat, updateTopLeftLon]
  );

  useEffect(() => {
    setIsMapPanelLoading(isMapMarkerFetching);
    if (isMapMarkerFetching) return;
    setLostItemIds(mapMarkers.map((item) => item.lostItemId));
  }, [mapMarkers, isMapMarkerFetching, setLostItemIds, setIsMapPanelLoading]);

  // 단일 마커 클릭 핸들러
  const handleMarkerClick = (item: { lostItemId: number; latitude: number; longitude: number }) => {
    setLostItemIds([item.lostItemId]);
    // 모바일에서는 바텀시트 열기
    if (window.innerWidth <= 768) {
      const bottomSheetEvent = new CustomEvent('openBottomSheet', {
        detail: { itemIds: [item.lostItemId] },
      });
      window.dispatchEvent(bottomSheetEvent);
    }
  };

  // 클러스터 클릭 핸들러
  const handleClusterClick = useCallback(
    (_target: kakao.maps.MarkerClusterer, cluster: kakao.maps.Cluster) => {
      const markers = cluster.getMarkers();
      const EPSILON = 0.000001; // 허용 오차 범위

      // 위치 비교 함수
      const isSamePosition = (
        pos1: { lat: number; lng: number },
        pos2: { latitude: number; longitude: number }
      ) => {
        return (
          Math.abs(pos1.lat - pos2.latitude) < EPSILON &&
          Math.abs(pos1.lng - pos2.longitude) < EPSILON
        );
      };

      const lostItemIDs = markers
        .map((marker: kakao.maps.Marker | kakao.maps.CustomOverlay) => {
          const position = {
            lat: Number(marker.getPosition().getLat().toFixed(6)),
            lng: Number(marker.getPosition().getLng().toFixed(6)),
          };
          return mapMarkers
            .filter((item) => isSamePosition(position, item))
            .map((item) => item.lostItemId);
        })
        .flat()
        .filter((id, idx, arr) => arr.indexOf(id) === idx); // 중복 제거
      setLostItemIds(lostItemIDs);

      // 모바일에서는 바텀시트 열기
      if (window.innerWidth <= 768) {
        const bottomSheetEvent = new CustomEvent('openBottomSheet', {
          detail: { itemIds: lostItemIDs },
        });
        window.dispatchEvent(bottomSheetEvent);
      }
    },
    [mapMarkers, setLostItemIds]
  );

  // callback ref로 맵 생성 시 초기 마커 로드
  const mapRef = useCallback(
    (map: kakao.maps.Map) => {
      if (map) {
        handleCenterChanged(map);
        handleBoundsChanged(map);
      }
    },
    [handleBoundsChanged, handleCenterChanged]
  );

  return (
    <Map
      ref={mapRef}
      data-cid="Map-zPKA6l"
      center={center}
      level={level}
      isPanto={true}
      zoomable={false}
      onCenterChanged={handleCenterChanged}
      onBoundsChanged={handleBoundsChanged}
      className="h-full w-full"
    >
      {!isMapMarkerFetching && (
        <MarkerClusterer
          data-cid="MarkerClusterer-tCcELZ"
          gridSize={50}
          onClusterclick={handleClusterClick}
          disableClickZoom={true}
        >
          {mapMarkers.map((item) => (
            <MapMarker
              data-cid="MapMarker-PiXtl2"
              key={item.lostItemId}
              position={{ lat: item.latitude, lng: item.longitude }}
              onClick={() => handleMarkerClick(item)}
            />
          ))}
        </MarkerClusterer>
      )}
      <div
        data-cid="div-HXF63W"
        className="absolute bottom-10 right-10 z-10 flex items-center gap-2"
      >
        <MoveMyPosButton data-cid="MoveMyPosButton-zxAiyB" />
        <ZoomController data-cid="ZoomController-UIJLBM" />
      </div>
    </Map>
  );
}
