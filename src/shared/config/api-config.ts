export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
} as const;
