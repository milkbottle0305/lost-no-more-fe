import type { CursorPaginationParams } from '@/shared/types/lost-item';
import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchSubscribeList } from './fetchSubscribeList';

interface UseSubscribeListQueryProps {
  keyword?: string;
}

export function useSubscribeListQuery({ keyword }: UseSubscribeListQueryProps = {}) {
  return useInfiniteQuery({
    queryKey: ['subscribeList', keyword],
    queryFn: async ({ pageParam }: { pageParam?: CursorPaginationParams }) => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);

      const dateStart = startDate.toISOString().split('T')[0];
      const dateEnd = endDate.toISOString().split('T')[0];

      const response = await fetchSubscribeList({
        dateStart,
        dateEnd,
        size: 20,
        keyword: keyword === 'all' ? undefined : keyword,
        cursorDate: pageParam?.cursorDate,
        cursorId: pageParam?.cursorId,
      });

      if (response.isSuccess) {
        return {
          items: response.data.lostItems,
          nextCursor:
            response.data.nextCursorDate && response.data.nextCursorId
              ? { cursorDate: response.data.nextCursorDate, cursorId: response.data.nextCursorId }
              : undefined,
        };
      } else {
        throw new Error(
          typeof response.error === 'string'
            ? response.error
            : response.error?.message || 'API 에러가 발생했습니다.'
        );
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
    enabled: !!keyword,
  });
}
