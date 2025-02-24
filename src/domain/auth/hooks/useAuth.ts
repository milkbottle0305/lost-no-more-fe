import type { Provider } from '@/shared/types/api-endpoint';
import { useQuery, useQueryClient , useMutation } from '@tanstack/react-query';

import { authApi } from '../apis/auth';

export function useAuth() {
  const queryClient = useQueryClient();

  const getAuthState = () => {
    if (typeof window === 'undefined') {
      return {
        isLoggedIn: false,
        accessToken: null,
      };
    }
    
    const token = localStorage.getItem('accessToken');
    return {
      isLoggedIn: !!token,
      accessToken: token,
    };
  };

  const { data: auth = getAuthState() } = useQuery({
    queryKey: ['auth'],
    queryFn: getAuthState,
    staleTime: Infinity,
  });

  const getOAuthUrl = async (provider: Provider, token?: string) => {
    return authApi.getOAuthUrl(provider, token);
  };

  const tokenMutation = useMutation({
    mutationFn: ({
      provider,
      code,
      token,
    }: {
      provider: Provider;
      code: string;
      token?: string;
    }) => {
      return authApi.getToken(provider, code, token);
    },
    onSuccess: (response) => {
      if (response.isSuccess && response.data) {
        localStorage.setItem('accessToken', response.data);
        queryClient.setQueryData(['auth'], {
          isLoggedIn: true,
          accessToken: response.data,
        });
      }
    },
  });

  const logout = () => {
    localStorage.removeItem('accessToken');
    queryClient.setQueryData(['auth'], {
      isLoggedIn: false,
      accessToken: null,
    });
  };

  return {
    ...auth,
    getOAuthUrl,
    getToken: tokenMutation.mutate,
    isLoading: tokenMutation.isPending,
    error: tokenMutation.error,
    logout,
  };
}
