import ApiClient from '@/shared/lib/api-client';
import { ApiEndpoint, getAuthHeaders } from '@/shared/types/api-endpoint';
import type { Response } from '@/shared/types/response';
import { isTokenExpired } from '@/shared/utils/jwt-utils';

type OAuthUrlData = string;
type TokenData = string;

const getHeaders = (token?: string): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

async function attemptTokenReissue(): Promise<string | null> {
  try {
    const result = await authApi.reissueToken();
    if (result.isSuccess && result.data) {
      localStorage.setItem('accessToken', result.data);
      return result.data;
    }
    return null;
  } catch (reissueError) {
    console.error('토큰 재발급 실패:', reissueError);
    return null;
  }
}

async function authenticatedRequest<T>(
  requestFn: (token: string) => Promise<Response<T>>,
  token: string
): Promise<Response<T>> {
  try {
    if (isTokenExpired(token)) {
      const newToken = await attemptTokenReissue();
      if (!newToken) {
        throw new Error('토큰 재발급에 실패했습니다.');
      }
      return await requestFn(newToken);
    }

    return await requestFn(token);
  } catch (error: any) {
    throw error;
  }
}

export const authApi = {
  getOAuthUrl: async (token?: string) => {
    const headers = getAuthHeaders(token);
    return ApiClient.get(ApiEndpoint.OAUTH_URL, { headers }).json<Response<OAuthUrlData>>();
  },

  getToken: async (code: string, options?: { token?: string }) => {
    const headers = getAuthHeaders(options?.token);

    return ApiClient.post(ApiEndpoint.OAUTH_TOKEN(code), {
      headers,
    }).json<Response<TokenData>>();
  },

  logout: async (token: string) => {
    return authenticatedRequest((currentToken) => {
      const headers = getHeaders(currentToken);
      return ApiClient.delete(ApiEndpoint.LOGOUT, {
        headers,
      }).json<Response<null>>();
    }, token);
  },

  reissueToken: async () => {
    try {
      return await ApiClient.post(ApiEndpoint.REISSUE, {}).json<Response<TokenData>>();
    } catch (error) {
      console.error(':', error);
      throw error;
    }
  },

  withdraw: async (token: string) => {
    return authenticatedRequest((currentToken) => {
      const headers = getHeaders(currentToken);
      return ApiClient.delete(ApiEndpoint.WITHDRAW, {
        headers,
      }).json<Response<null>>();
    }, token);
  },
};
