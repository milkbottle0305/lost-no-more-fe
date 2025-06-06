/**
 * ApiEndpoint
 * @description 키 - 별칭, 값 - api endpoint
 * @example
 * {
 *  AUTH_GOOGLE_CODE: 'auth/oauth/google/code',
 * AUTH_GOOGLE_LOGIN: 'auth/oauth/google/login',
 * }
 */
export type Provider = 'kakao' | 'google';

export const ApiEndpoint = {
  OAUTH_URL: (provider: Provider) => `auth/oauth/${provider}/code`,
  OAUTH_TOKEN: (provider: Provider, code: string) => `auth/oauth/${provider}/login?code=${code}`,
  LOGOUT: 'auth/logout',
  WITHDRAW: (provider: Provider) => `auth/${provider}/withdraw`,
  REISSUE: 'auth/reissue',

  KEYWORD: {
    SUBSCRIBE: 'subscribe',
    SUBSCRIBE_DETAIL: (id: string) => `subscribe/${id}`,
  },

  NOTIFICATIONS: 'alarm',

  ITEMS_COUNT: 'items/count',
  ITEMS_RECENT: 'items/recent',
  ITEMS_SEARCH_MAP: 'items/search/map',
} as const;

export const getAuthHeaders = (token?: string | null): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};