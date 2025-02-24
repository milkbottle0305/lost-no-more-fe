import { BASE_URL } from '@/shared/config/api-config';
import type { Provider } from '@/shared/types/api-endpoint';
import { ApiEndpoint } from '@/shared/types/api-endpoint';
import type { Response } from '@/shared/types/response';
import ky from 'ky';

type OAuthUrlData = string;
type TokenData = string;

const api = ky.create({
  prefixUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getHeaders = (token?: string): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const authApi = {
  getOAuthUrl: async (provider: Provider, token?: string) => {
    const headers = getHeaders(token);

    return api.get(ApiEndpoint.OAUTH_URL(provider), { headers }).json<Response<OAuthUrlData>>();
  },

  getToken: async (provider: Provider, code: string, token?: string) => {
    const headers = getHeaders(token);

    return api
      .post(ApiEndpoint.OAUTH_TOKEN(provider, code), {
        headers,
      })
      .json<Response<TokenData>>();
  },
};
