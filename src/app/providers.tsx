'use client';

import { useState } from 'react';

import { API_CONFIG } from '@/shared/config/api-config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: API_CONFIG.RETRY_COUNT,
            retryDelay: API_CONFIG.RETRY_DELAY,
            staleTime: Infinity,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return <QueryClientProvider data-cid="QueryClientProvider-0CCqS6" client={queryClient}>{children}</QueryClientProvider>;
}
