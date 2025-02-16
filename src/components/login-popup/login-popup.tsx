import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import GoogleIcon from '../icons/google-icon';
import KakaotalkIcon from '../icons/kakaotalk-icon';
import { Button } from '../ui/button';

interface LoginPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginPopup({ open, onClose }: LoginPopupProps) {
  return (
    <Dialog
      data-cid="Dialog-s6KaCg"
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent
        data-cid="DialogContent-UNt3ec"
        className="max-w-xl rounded-lg p-16"
      >
        <DialogHeader
          data-cid="DialogHeader-Np1au7"
          className="mb-4"
        >
          <DialogTitle
            data-cid="DialogTitle-igxSdH"
            className="text-center text-2xl font-bold"
          >
            로그인
          </DialogTitle>
          <DialogDescription
            data-cid="DialogDescription-7LSZuk"
            className="text-center text-sm text-muted-foreground"
          >
            소중한 물건을 찾고 계신가요? 로그인하고 맞춤 알림을 받아보세요.
          </DialogDescription>
        </DialogHeader>
        <Button
          data-cid="Button-B8QSWL"
          className="relative flex h-11 w-full items-center bg-gray-100 text-lg font-bold text-black hover:bg-gray-200"
        >
          <KakaotalkIcon
            data-cid="KakaotalkIcon-2X4EVZ"
            className="absolute left-4"
            width={24}
            height={24}
            fill="hsl(var(--secondary-foreground))"
          />
          <span
            data-cid="span-REL7mu"
            className="mx-auto text-secondary-foreground"
          >
            Kakao로 로그인
          </span>
        </Button>
        <Button
          data-cid="Button-qtTxhE"
          className="relative flex h-11 w-full items-center bg-gray-100 text-lg font-bold text-black hover:bg-gray-200"
        >
          <GoogleIcon
            data-cid="GoogleIcon-lXtxIS"
            className="absolute left-4"
            width={24}
            height={24}
            fill="hsl(var(--secondary-foreground))"
          />
          <span
            data-cid="span-M3ltR4"
            className="mx-auto text-secondary-foreground"
          >
            Google로 로그인
          </span>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
