import { useCallback, useState } from 'react';

import { useAuth } from '@/domain/auth/hooks/useAuth';
import type { Provider } from '@/shared/types/api-endpoint';

export function useLogin(onLoginSuccess?: () => void, onClose?: () => void) {
  const [error, setError] = useState<string | null>(null);
  const { getOAuthUrl, getToken, isLoading } = useAuth();

  const handleLogin = useCallback(
    async (provider: Provider) => {
      try {
        setError(null);
        const response = await getOAuthUrl(provider);

        if (response.isSuccess && response.data) {
          const popup = window.open(
            response.data,
            'Login',
            'width=500,height=700,left=400,top=200'
          );

          const handleMessage = async (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;

            if (event.data.type === 'OAUTH_CALLBACK') {
              window.removeEventListener('message', handleMessage);
              popup?.close();

              await getToken({ provider, code: event.data.code });
              onLoginSuccess?.();
              onClose?.();
            }
          };

          window.addEventListener('message', handleMessage);
        }
      } catch (error) {
        console.error('Login error:', error);
        setError(error instanceof Error ? error.message : '로그인 처리 중 오류가 발생했습니다.');
      }
    },
    [getOAuthUrl, getToken, onLoginSuccess, onClose]
  );

  return {
    handleLogin,
    error,
    isProcessing: isLoading,
  };
}
