'use client';

import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/domain/auth/hooks/useAuth';

export function useLogin(onLoginSuccess?: () => void, onClose?: () => void) {
  const [error, setError] = useState<string | null>(null);
  const { getOAuthUrl, getToken, isLoading } = useAuth();

  const handleMessage = useCallback(
    async (event: MessageEvent) => {
      if (event.data.type === 'OAUTH_CALLBACK' && event.data.code) {
        try {
          await getToken({ code: event.data.code });
          onLoginSuccess?.();
          onClose?.();
        } catch (err) {
          console.error('토큰 획득 오류:', err);
          setError(err instanceof Error ? err.message : '로그인 처리 중 오류가 발생했습니다.');
        }
      }
    },
    [getToken, onLoginSuccess, onClose]
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  const handleLogin = useCallback(async () => {
    try {
      setError(null);

      const response = await getOAuthUrl();

      if (response.isSuccess && response.data) {
        window.open(response.data, 'Login', 'width=500,height=700,left=400,top=200');
      } else {
        setError('인증 URL을 가져오는데 실패했습니다.');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '로그인 처리 중 오류가 발생했습니다.');
    }
  }, [getOAuthUrl]);

  return {
    handleLogin,
    error,
    isProcessing: isLoading,
  };
}
