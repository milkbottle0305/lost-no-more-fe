'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/domain/auth/hooks/useAuth';
import type { Provider } from '@/shared/types/api-endpoint';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';

interface WithdrawButtonProps {
  authCode?: string;
}

export const WithdrawButton = ({ authCode }: WithdrawButtonProps) => {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      const isWithdrawProcess = localStorage.getItem('withdraw_in_progress') === 'true';

      if (
        isWithdrawProcess &&
        (event.data.type === 'GOOGLE_AUTH_CALLBACK' || event.data.type === 'OAUTH_CALLBACK') &&
        event.data.code
      ) {
        localStorage.removeItem('withdraw_in_progress');

        const storedProvider = localStorage.getItem('auth_provider') as Provider;
        if (!storedProvider) {
          console.error('인증 제공자 정보를 찾을 수 없습니다.');
          return;
        }

        auth.withdraw(storedProvider, event.data.code, () => {
          setIsOpen(false);
          router.push('/');
        });
      }
    },
    [auth, router]
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  const handleWithdraw = async () => {
    const storedProvider = auth.provider || (localStorage.getItem('auth_provider') as Provider);

    if (!storedProvider) {
      console.error('인증 제공자 정보가 없습니다. 로그인이 필요합니다.');
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    if (storedProvider === 'google' && !authCode) {
      try {
        localStorage.setItem('withdraw_in_progress', 'true');

        const response = await auth.getOAuthUrl(storedProvider, undefined, 'withdrawal');

        if (response.isSuccess && response.data) {
          window.open(
            response.data,
            'Google Authorization',
            'width=500,height=700,left=400,top=200'
          );
        }
      } catch (error) {
        localStorage.removeItem('withdraw_in_progress');
        console.error('Failed to get OAuth URL:', error);
      }
    } else {
      auth.withdraw(storedProvider, authCode, () => {
        setIsOpen(false);
        router.push('/');
      });
    }
  };

  return (
    <Dialog
      data-cid="Dialog-2yOKFH"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger
        data-cid="DialogTrigger-Sp8nIy"
        asChild
      >
        <Button
          data-cid="Button-vQAJ8f"
          variant="outline"
          className="hover:bg-muted-foreground/10"
        >
          회원 탈퇴
        </Button>
      </DialogTrigger>
      <DialogContent data-cid="DialogContent-uWlFeh">
        <DialogHeader data-cid="DialogHeader-i8eAsb">
          <DialogTitle data-cid="DialogTitle-XgxcFO">회원탈퇴 확인</DialogTitle>
          <DialogDescription data-cid="DialogDescription-lsqySg">
            정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없으며 모든 데이터가 삭제됩니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter data-cid="DialogFooter-jCQaNN">
          <Button
            data-cid="Button-yFikg7"
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={auth.isWithdrawing}
          >
            취소
          </Button>
          <Button
            data-cid="Button-kSBg7k"
            variant="destructive"
            onClick={handleWithdraw}
            disabled={auth.isWithdrawing}
          >
            {auth.isWithdrawing ? '처리 중...' : '탈퇴하기'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
