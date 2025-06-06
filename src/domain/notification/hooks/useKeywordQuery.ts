import { useAuth } from '@/domain/auth/hooks/useAuth';
import type { LostCategory, LostLocationForKeyword } from '@/shared/types/lost-property';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { keywordApi } from '../apis/keyword-api';


export function useKeywords() {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuth();

  const {
    data,
    isLoading: isLoadingKeywords,
    error: keywordsError,
    refetch,
  } = useQuery({
    queryKey: ['keywords', isLoggedIn],
    queryFn: async () => {

      const response = await keywordApi.getSubscriptions();

      if (!response.isSuccess) {
        throw new Error(response.error?.message || '키워드 조회에 실패했습니다.');
      }

      const keywords = response.data.subscribes.map((item) => ({
        id: String(item.subscribeId),
        text: item.keyword,
        category: item.category as LostCategory,
        location: item.region as LostLocationForKeyword,
      }));

      return keywords;
    },
    enabled: isLoggedIn,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  const addKeywordMutation = useMutation({
    mutationFn: async (text: string) => {

      const response = await keywordApi.subscribe(text);

      if (!response.isSuccess) {
        throw new Error(response.error?.message || '키워드 추가에 실패했습니다.');
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keywords'] });
    },
  });

  const removeKeywordMutation = useMutation({
    mutationFn: async (keywordId: string) => {
      const response = await keywordApi.unsubscribe(keywordId);

      if (!response.isSuccess) {
        throw new Error(response.error?.message || '키워드 삭제에 실패했습니다.');
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keywords'] });
    },
  });

  const updateKeywordMutation = useMutation({
    mutationFn: async ({
      keywordId,
      keyword,
      category,
      location,
    }: {
      keywordId: string;
      keyword?: string;
      category?: string;
      location?: string;
    }) => {

      const response = await keywordApi.updateSubscription(keywordId, {
        keyword,
        category,
        region: location,
      });

      if (!response.isSuccess) {
        throw new Error(response.error?.message || '키워드 업데이트에 실패했습니다.');
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keywords'] });
    },
  });

  return {
    keywords: data || [],
    isLoading:
      isLoadingKeywords ||
      addKeywordMutation.isPending ||
      removeKeywordMutation.isPending ||
      updateKeywordMutation.isPending,
    error:
      keywordsError ||
      addKeywordMutation.error ||
      removeKeywordMutation.error ||
      updateKeywordMutation.error,
    addKeyword: async (text: string) => {
      if (!text.trim()) return;
      return addKeywordMutation.mutateAsync(text);
    },
    removeKeyword: async (keywordId: string) => removeKeywordMutation.mutateAsync(keywordId),
    updateKeyword: async (params: {
      keywordId: string;
      keyword: string;
      category?: string;
      location?: string;
    }) => updateKeywordMutation.mutateAsync(params),
    refreshKeywords: refetch,
  };
}