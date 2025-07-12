import { dateToString } from '@/shared/utils/date-to-string';

import { useItemsSearchMapQuery } from '../queries/useItemsSearchMapQuery';
import useSearchStore from '../stores/search-store';

export function useSearchMapMarker() {
  const {
    keyword,
    category,
    location,
    dateStart,
    dateEnd,
    topLeftLat,
    topLeftLon,
    bottomRightLat,
    bottomRightLon,
  } = useSearchStore();

  const enabled = [topLeftLat, topLeftLon, bottomRightLat, bottomRightLon].every(
    (coord) => coord !== 0
  );
  // 전체인 경우는 쿼리스트링에 넣지 않아야하므로 undefined로 처리
  const { data, isFetching } = useItemsSearchMapQuery(
    {
      keyword,
      category: category === '전체' ? undefined : category?.toString(),
      region: location === '전체' ? undefined : location?.toString(),
      dateStart: dateToString(dateStart),
      dateEnd: dateToString(dateEnd),
      topLeftLat,
      topLeftLon,
      bottomRightLat,
      bottomRightLon,
    },
    enabled
  );

  return {
    data: data?.data.lostItems ?? [],
    isFetching: enabled ? isFetching : true,
  };
}
