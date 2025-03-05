'use client';

import { useCallback, useMemo } from 'react';

import { useSearchMapMarker } from '@/domain/search/hooks/ussSearchMapMarker';
import useSearchStore from '@/domain/search/stores/search-store';
import { debounce } from 'lodash';
import { Map, MapMarker, MarkerClusterer, useKakaoLoader } from 'react-kakao-maps-sdk';

import { useLostNoMoreMapContext } from '../contexts/lost-no-more-map-context';
import { useMapPanelContext } from '../contexts/map-panel-context';
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
  const { center, setCenter, level } = useLostNoMoreMapContext();
  const { setLostItemIds } = useMapPanelContext();

  const updateTopLeftLat = useSearchStore((state) => state.updateTopLeftLat);
  const updateTopLeftLon = useSearchStore((state) => state.updateTopLeftLon);
  const updateBottomRightLat = useSearchStore((state) => state.updateBottomRightLat);
  const updateBottomRightLon = useSearchStore((state) => state.updateBottomRightLon);

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

  // 단일 마커 클릭 핸들러
  const handleMarkerClick = (item: { lostItemId: number; latitude: number; longitude: number }) => {
    setLostItemIds([item.lostItemId]);
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

          const matchingItem = mapMarkers.find((item) => isSamePosition(position, item));
          return matchingItem?.lostItemId;
        })
        .filter((id): id is number => id !== undefined);
      setLostItemIds(lostItemIDs);
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
    <>
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
    </>
  );
}
