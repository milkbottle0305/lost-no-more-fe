'use client';

import { useCallback, useMemo, useRef, useState } from 'react';

import { useLostNoMoreMapContext } from '@/contexts/lost-no-more-map-context';
import { useMapPanelContext } from '@/contexts/map-panel-context';
import { debounce } from 'lodash';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';

import { LOSTITEMS_LOCATION } from '@/constants/lost-items';

import MoveMyPosButton from './move-mypos-button';
import ZoomController from './zoom-controller';

const MAP_REFRESH_DELAY = 500;

export default function LostNoMoreMap() {
  const { center, setCenter, level } = useLostNoMoreMapContext();
  const { setLostItemIds } = useMapPanelContext();
  const mapRef = useRef<kakao.maps.Map>(null);

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

  const getVisibleItems = useCallback(() => {
    if (!mapRef.current) return [];

    const bounds = mapRef.current.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    const visibleItems = LOSTITEMS_LOCATION.filter(
      (item) =>
        item.latitude >= sw.getLat() &&
        item.latitude <= ne.getLat() &&
        item.longitude >= sw.getLng() &&
        item.longitude <= ne.getLng()
    );

    return visibleItems;
  }, []);

  const [visibleItems, setVisibleItems] = useState<typeof LOSTITEMS_LOCATION>([]);

  const handleBoundsChanged = useMemo(
    () =>
      debounce(() => {
        setVisibleItems(getVisibleItems());
        setLostItemIds(getVisibleItems().map((item) => item.lostItemID));
      }, MAP_REFRESH_DELAY),
    [getVisibleItems, setLostItemIds]
  );

  // 단일 마커 클릭 핸들러
  const handleMarkerClick = (item: (typeof LOSTITEMS_LOCATION)[0]) => {
    setLostItemIds([item.lostItemID]);
  };

  // 클러스터 클릭 핸들러
  const handleClusterClick = (_target: kakao.maps.MarkerClusterer, cluster: kakao.maps.Cluster) => {
    const markers = cluster.getMarkers();
    const EPSILON = 0.0000001; // 허용 오차 범위

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

        const matchingItem = visibleItems.find((item) => isSamePosition(position, item));

        return matchingItem?.lostItemID;
      })
      .filter((id): id is number => id !== undefined);
    setLostItemIds(lostItemIDs);
  };

  return (
    <Map
      data-cid="Map-zPKA6l"
      center={center}
      level={level}
      isPanto={true}
      zoomable={false}
      onCenterChanged={handleCenterChanged}
      onBoundsChanged={handleBoundsChanged}
      onCreate={(map) => (mapRef.current = map)}
      className="h-full w-full"
    >
      <MarkerClusterer
        data-cid="MarkerClusterer-tCcELZ"
        gridSize={250}
        onClusterclick={handleClusterClick}
        disableClickZoom={true}
      >
        {visibleItems.map((item) => (
          <MapMarker
            data-cid="MapMarker-PiXtl2"
            key={item.lostItemID}
            position={{ lat: item.latitude, lng: item.longitude }}
            onClick={() => handleMarkerClick(item)}
          />
        ))}
      </MarkerClusterer>
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
