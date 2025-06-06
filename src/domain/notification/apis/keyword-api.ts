import ApiClient from '@/shared/lib/api-client';
import { ApiEndpoint, getAuthHeaders } from '@/shared/types/api-endpoint';
import type { Response } from '@/shared/types/response';

export interface SubscribeResponse {
  totalCount: number;
  subscribes: Array<{
    subscribeId: number;
    keyword: string;
    category: string;
    region: string;
  }>;
}

export const keywordApi = {
  subscribe: async (
    keyword: string,
    category?: string,
    region?: string
  ): Promise<Response<null>> => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = getAuthHeaders(token);

      return ApiClient
        .post(ApiEndpoint.KEYWORD.SUBSCRIBE, {
          headers,
          json: {
            keyword,
            category,
            region,
          },
        })
        .json<Response<null>>();
    } catch (error) {
      console.error('키워드 구독 요청 실패:', error);

      return {
        isSuccess: false,
        data: null,
        error: {
          code: 50000,
          message: error instanceof Error ? error.message : '키워드 구독 중 오류가 발생했습니다.',
        },
      };
    }
  },

  getSubscriptions: async (): Promise<Response<SubscribeResponse>> => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = getAuthHeaders(token);

      return ApiClient
        .get(ApiEndpoint.KEYWORD.SUBSCRIBE, {
          headers,
        })
        .json<Response<SubscribeResponse>>();
    } catch (error) {
      console.error('키워드 조회 요청 실패:', error);

      return {
        isSuccess: false,
        data: { totalCount: 0, subscribes: [] },
        error: {
          code: 50000,
          message: error instanceof Error ? error.message : '키워드 조회 중 오류가 발생했습니다.',
        },
      };
    }
  },

  unsubscribe: async (subscribeId: string): Promise<Response<null>> => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = getAuthHeaders(token);

      return ApiClient
        .delete(ApiEndpoint.KEYWORD.SUBSCRIBE_DETAIL(subscribeId), {
          headers,
        })
        .json<Response<null>>();
    } catch (error) {
      console.error('키워드 삭제 요청 실패:', error);

      return {
        isSuccess: false,
        data: null,
        error: {
          code: 50000,
          message: error instanceof Error ? error.message : '키워드 삭제 중 오류가 발생했습니다.',
        },
      };
    }
  },

  updateSubscription: async (
    subscribeId: string,
    updateData: {
      keyword?: string;
      category?: string;
      region?: string;
    }
  ): Promise<Response<null>> => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = getAuthHeaders(token);

      const requestBody: Record<string, string> = {};

      if (updateData.keyword) {
        requestBody.keyword = updateData.keyword;
      }

      if (updateData.category) {
        requestBody.category = updateData.category;
      }

      if (updateData.region) {
        requestBody.region = updateData.region;
      }

      return ApiClient
        .put(ApiEndpoint.KEYWORD.SUBSCRIBE_DETAIL(subscribeId), {
          headers,
          json: requestBody,
        })
        .json<Response<null>>();
    } catch (error) {
      console.error('키워드 업데이트 요청 실패:', error);

      return {
        isSuccess: false,
        data: null,
        error: {
          code: 50000,
          message:
            error instanceof Error ? error.message : '키워드 업데이트 중 오류가 발생했습니다.',
        },
      };
    }
  },
};
