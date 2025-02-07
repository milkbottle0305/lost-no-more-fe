import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import KakaotalkIcon from '../icons/kakaotalk-icon';
import GoogleIcon from '../icons/google-icon';

interface LoginPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginPopup({ open, onClose }: LoginPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl rounded-lg p-16">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-center text-2xl font-bold">로그인</DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            소중한 물건을 찾고 계신가요? 로그인하고 맞춤 알림을 받아보세요.
          </DialogDescription>
        </DialogHeader>
        <Button className="relative flex h-11 w-full items-center bg-gray-100 text-lg font-bold text-black hover:bg-gray-200">
          <KakaotalkIcon
            className="absolute left-4"
            width={24}
            height={24}
            fill="hsl(var(--secondary-foreground))"
          />
          <span className="mx-auto text-secondary-foreground">Kakao로 로그인</span>
        </Button>
        <Button className="relative flex h-11 w-full items-center bg-gray-100 text-lg font-bold text-black hover:bg-gray-200">
          <GoogleIcon
            className="absolute left-4"
            width={24}
            height={24}
            fill="hsl(var(--secondary-foreground))"
          />
          <span className="mx-auto text-secondary-foreground">Google로 로그인</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
