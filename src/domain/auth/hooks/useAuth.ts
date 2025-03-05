import { useRouter } from 'next/navigation';

import type { Provider } from '@/shared/types/api-endpoint';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authApi } from '../apis/auth';
import { isTokenExpired } from '@/shared/utils/jwt-utils';

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const getAuthState = () => {
    if (typeof window === 'undefined') {
      return {
        isLoggedIn: false,
        accessToken: null,
        provider: null,
      };
    }

    const token = localStorage.getItem('accessToken');
    const provider = localStorage.getItem('auth_provider');

    const isExpired = isTokenExpired(token);

    if (token && isExpired) {
      authApi.reissueToken()
        .then(response => {
          if (response.isSuccess && response.data) {
            localStorage.setItem('accessToken', response.data);
            queryClient.invalidateQueries({ queryKey: ['auth'] });
          } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('auth_provider');
            queryClient.setQueryData(['auth'], {
              isLoggedIn: false,
              accessToken: null,
              provider: null,
            });
            router.push('/');
          }
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('auth_provider');
          queryClient.setQueryData(['auth'], {
            isLoggedIn: false,
            accessToken: null,
            provider: null,
          });
          router.push('/');
        });
    }

    return {
      isLoggedIn: !!token,
      accessToken: token,
      provider: provider as Provider,
      isTokenExpired: isExpired,
    };
  };

  const { data: auth = getAuthState() } = useQuery({
    queryKey: ['auth'],
    queryFn: getAuthState,
    staleTime: Infinity,
  });

  const getOAuthUrl = async (provider: Provider, token?: string, state?: string) => {
    return authApi.getOAuthUrl(provider, token, state);
  };

  const tokenMutation = useMutation({
    mutationFn: ({
      provider,
      code,
      options,
    }: {
      provider: Provider;
      code: string;
      options?: { token?: string; state?: string };
    }) => {
      return authApi.getToken(provider, code, options);
    },
    onSuccess: (response, variables) => {
      if (response.isSuccess && response.data) {
        localStorage.setItem('accessToken', response.data);
        localStorage.setItem('auth_provider', variables.provider);
        queryClient.setQueryData(['auth'], {
          isLoggedIn: true,
          accessToken: response.data,
          provider: variables.provider,
          isTokenExpired: false,
        });
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return Promise.resolve({ isSuccess: true, data: null, error: null });
      return authApi.logout(token);
    },
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('auth_provider');
      queryClient.setQueryData(['auth'], {
        isLoggedIn: false,
        accessToken: null,
        provider: null,
        isTokenExpired: true,
      });
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error('Logout error:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('auth_provider');
      queryClient.setQueryData(['auth'], {
        isLoggedIn: false,
        accessToken: null,
        provider: null,
        isTokenExpired: true,
      });
    },
  });

  const logout = (callback?: () => void) => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        if (callback) {
          callback();
        } else {
          router.push('/');
        }
      },
    });
  };

  const withdrawMutation = useMutation({
    mutationFn: async ({ provider, code }: { provider: Provider; code?: string }) => {

      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('액세스 토큰이 없습니다.');
      }

      if (isTokenExpired(token)) {
        const reissueResponse = await authApi.reissueToken();
        if (!reissueResponse.isSuccess || !reissueResponse.data) {
          throw new Error('토큰 재발급에 실패했습니다. 다시 로그인해주세요.');
        }
        localStorage.setItem('accessToken', reissueResponse.data);
        return await authApi.withdraw(provider, reissueResponse.data, code);
      }

      return await authApi.withdraw(provider, token, code);
    },
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('auth_provider');

      queryClient.setQueryData(['auth'], {
        isLoggedIn: false,
        accessToken: null,
        provider: null,
        isTokenExpired: true,
      });

      queryClient.clear();
    },
    onError: (error) => {
      console.error('회원탈퇴 실패:', error);
    },
  });

  const withdraw = (provider: Provider, code?: string, callback?: () => void) => {
    if (provider === 'google' && !code) {
      getOAuthUrl(provider, undefined, 'withdrawal')
        .then((response) => {
          if (response.isSuccess && response.data) {
            window.open(response.data, 'googleAuth', 'width=500,height=600');
            
            const handleMessage = (event: MessageEvent) => {
              if (
                event.origin === window.location.origin &&
                event.data.type === 'GOOGLE_AUTH_CALLBACK' &&
                event.data.code
              ) {
                window.removeEventListener('message', handleMessage);
                
                withdraw(provider, event.data.code, callback);
              }
            };
            
            window.addEventListener('message', handleMessage);
          }
        });
      
      return;
    }
    withdrawMutation.mutate(
      { provider, code },
      {
        onSuccess: () => {
          if (callback) {
            callback();
          } else {
            router.push('/');
          }
        },
        onError: (error: any) => {
          console.error('회원탈퇴 오류:', error);

          const errorMessage = error?.message || '회원탈퇴 중 오류가 발생했습니다.';

          if (errorMessage.includes('필수 쿠키가 누락되었습니다.')) {
            alert('로그인 정보가 만료되었습니다. 다시 로그인해주세요.');

            router.push('/');
          } else {
            alert(`회원탈퇴 실패: ${errorMessage}`);
          }
        },
      }
    );
  };

  return {
    ...auth,
    getOAuthUrl,
    getToken: tokenMutation.mutate,
    isLoading: tokenMutation.isPending || logoutMutation.isPending || withdrawMutation.isPending,
    error: tokenMutation.error || logoutMutation.error || withdrawMutation.error,
    logout,
    withdraw,
    isWithdrawing: withdrawMutation.isPending,
  };
}
