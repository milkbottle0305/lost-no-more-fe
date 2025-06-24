/**
 * ApiEndpoint
 * @description 키 - 별칭, 값 - api endpoint
 * @example
 * {
 *  AUTH_CODE: 'auth/code',
 *  AUTH_LOGIN: 'auth/login',
 * }
 */
export const ApiEndpoint = {
  OAUTH_URL: 'auth/code',
  OAUTH_TOKEN: (code: string) => `auth/login?code=${code}`,
  LOGOUT: 'auth/logout',
  WITHDRAW: 'auth/withdraw',
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