'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // ✅ QueryClient 인스턴스를 상태로 관리 (Hydration 대비)
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider
      data-cid="QueryClientProvider-PTspDT"
      client={queryClient}
    >
      {children}
    </QueryClientProvider>
  );
}
