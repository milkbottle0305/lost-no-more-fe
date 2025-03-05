import { BASE_URL } from '@/shared/config/api-config';
import type { Provider } from '@/shared/types/api-endpoint';
import { ApiEndpoint } from '@/shared/types/api-endpoint';
import type { Response } from '@/shared/types/response';
import { isTokenExpired } from '@/shared/utils/jwt-utils';
import ky from 'ky';

type OAuthUrlData = string;
type TokenData = string;

const api = ky.create({
  prefixUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

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
  getOAuthUrl: async (provider: Provider, token?: string, state?: string) => {
    const headers = getHeaders(token);
    let url = ApiEndpoint.OAUTH_URL(provider);

    if (state) {
      url = `${url}?state=${state}`;
    }

    return api.get(url, { headers }).json<Response<OAuthUrlData>>();
  },

  getToken: async (
    provider: Provider,
    code: string,
    options?: { token?: string; state?: string }
  ) => {
    if (
      options?.state === 'withdrawal' ||
      localStorage.getItem('withdraw_in_progress') === 'true'
    ) {
      return {
        isSuccess: false,
        data: null,
        error: {
          code: 409,
          message: '회원탈퇴 진행 중입니다.',
        },
      };
    }

    const headers = getHeaders(options?.token);

    return api
      .post(ApiEndpoint.OAUTH_TOKEN(provider, code), {
        headers,
      })
      .json<Response<TokenData>>();
  },

  logout: async (token: string) => {
    return authenticatedRequest((currentToken) => {
      const headers = getHeaders(currentToken);
      return api
        .delete(ApiEndpoint.LOGOUT, {
          headers,
        })
        .json<Response<null>>();
    }, token);
  },

  reissueToken: async () => {
    try {
      return await api.post(ApiEndpoint.REISSUE, {}).json<Response<TokenData>>();
    } catch (error) {
      console.error(':', error);
      throw error;
    }
  },

  withdraw: async (provider: Provider, token: string, code?: string) => {
    const endpoint =
      code && provider === 'google'
        ? `${ApiEndpoint.WITHDRAW(provider)}?code=${code}`
        : ApiEndpoint.WITHDRAW(provider);

    return authenticatedRequest((currentToken) => {
      const headers = getHeaders(currentToken);
      return api
        .delete(endpoint, {
          headers,
        })
        .json<Response<null>>();
    }, token);
  },
};
