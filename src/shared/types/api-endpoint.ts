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

  ITEMS_COUNT: 'items/count',
} as const;
