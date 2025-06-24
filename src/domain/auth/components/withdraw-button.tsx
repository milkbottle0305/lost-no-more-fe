'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/domain/auth/hooks/useAuth';
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

export const WithdrawButton = () => {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleWithdraw = async () => {
    auth.withdraw(() => {
      setIsOpen(false);
      router.push('/');
    });
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
