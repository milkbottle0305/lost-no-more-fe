import { useEffect, useState } from 'react';

import { useItemsSearchListQuery } from '@/domain/search/queries/useItemsSearchListQuery';

const CHUNK_SIZE = 15;

export default function useItemsSearchListByChunk(lostItemIds: number[]) {
  const [cursor, setCursor] = useState(0);
  const [allItems, setAllItems] = useState<any[]>([]);

  useEffect(() => {
    setCursor(0);
    setAllItems([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lostItemIds.join(',')]);

  const { data: lostItems, isFetching: isFethcingLostItems } = useItemsSearchListQuery({
    lostItemIds: lostItemIds.slice(cursor, cursor + CHUNK_SIZE),
  });

  useEffect(() => {
    if (lostItems?.data.lostItemList) {
      setAllItems((prev) => [...prev, ...lostItems.data.lostItemList]);
    }
  }, [lostItems]);

  const loadMoreLostItems = () => {
    if (cursor + CHUNK_SIZE >= lostItemIds.length) return;
    setCursor((prev) => prev + CHUNK_SIZE);
  };

  return {
    lostItems: allItems,
    isFethcingLostItems,
    loadMoreLostItems,
  };
}
