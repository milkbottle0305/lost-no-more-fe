import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { isTokenExpired } from '@/shared/utils/jwt-utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authApi } from '../apis/auth';

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const getAuthState = () => {
    if (typeof window === 'undefined') {
      return {
        isLoggedIn: false,
        accessToken: null,
      };
    }

    const token = localStorage.getItem('accessToken');
    const isExpired = isTokenExpired(token);

    if (token && isExpired) {
      authApi
        .reissueToken()
        .then((response) => {
          if (response.isSuccess && response.data) {
            localStorage.setItem('accessToken', response.data);
            queryClient.invalidateQueries({ queryKey: ['auth'] });
          } else {
            localStorage.removeItem('accessToken');
            queryClient.setQueryData(['auth'], {
              isLoggedIn: false,
              accessToken: null,
            });
            router.push('/');
          }
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          queryClient.setQueryData(['auth'], {
            isLoggedIn: false,
            accessToken: null,
          });
          router.push('/');
        });
    }

    return {
      isLoggedIn: !!token,
      accessToken: token,
      isTokenExpired: isExpired,
    };
  };

  const { data: auth = getAuthState(), isLoading: isLoadingAuth } = useQuery({
    queryKey: ['auth'],
    queryFn: getAuthState,
    staleTime: Infinity,
  });

  const tokenMutation = useMutation({
    mutationFn: ({
      code,
      options,
    }: {
      code: string;
      options?: { token?: string };
    }) => {
      return authApi.getToken(code, options);
    },
    onSuccess: (response) => {
      if (response.isSuccess && response.data) {
        localStorage.setItem('accessToken', response.data);
        queryClient.setQueryData(['auth'], {
          isLoggedIn: true,
          accessToken: response.data,
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
      queryClient.setQueryData(['auth'], {
        isLoggedIn: false,
        accessToken: null,
        isTokenExpired: true,
      });
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error('Logout error:', error);
      localStorage.removeItem('accessToken');
      queryClient.setQueryData(['auth'], {
        isLoggedIn: false,
        accessToken: null,
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
    mutationFn: async () => {
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
        return await authApi.withdraw(reissueResponse.data);
      }

      return await authApi.withdraw(token);
    },
    onSuccess: () => {
      localStorage.removeItem('accessToken');

      queryClient.setQueryData(['auth'], {
        isLoggedIn: false,
        accessToken: null,
        isTokenExpired: true,
      });

      queryClient.clear();
    },
    onError: (error) => {
      console.error('회원탈퇴 실패:', error);
    },
  });

  const withdraw = (callback?: () => void) => {
    withdrawMutation.mutate(undefined, {
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
    });
  };

  if (!isHydrated) {
    return {
      isLoggedIn: false,
      accessToken: null,
      getOAuthUrl: authApi.getOAuthUrl,
      getToken: tokenMutation.mutate,
      isLoadingAuth: true,
      isLoading: true,
      error: null,
      logout,
      withdraw,
      isWithdrawing: false,
    };
  }

  return {
    ...auth,
    getOAuthUrl: authApi.getOAuthUrl,
    getToken: tokenMutation.mutate,
    isLoadingAuth,
    isLoading: tokenMutation.isPending || logoutMutation.isPending || withdrawMutation.isPending,
    error: tokenMutation.error || logoutMutation.error || withdrawMutation.error,
    logout,
    withdraw,
    isWithdrawing: withdrawMutation.isPending,
  };
}
