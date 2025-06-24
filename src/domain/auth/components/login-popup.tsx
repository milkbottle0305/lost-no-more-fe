import { useLogin } from '@/domain/auth/hooks/useLogin';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

import LoginProcess from './login-process';
import SocialLoginButton from './social-login-button';

interface LoginPopupProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginPopup({ open, onClose, onLoginSuccess }: LoginPopupProps) {
  const { handleLogin, error, isProcessing } = useLogin(onLoginSuccess, onClose);

  return (
    <Dialog
      data-cid="Dialog-VT0ye7"
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent
        data-cid="DialogContent-xSnJhK"
        className="max-w-xl rounded-lg p-16"
      >
        <DialogTitle
          data-cid="DialogTitle-DXApVY"
          className="text-center text-2xl font-bold"
        >
          로그인
        </DialogTitle>
        {!isProcessing ? (
          <>
            <DialogHeader
              data-cid="DialogHeader-4XqRj7"
              className="mb-4"
            >
              <DialogDescription
                data-cid="DialogDescription-UTbHBp"
                className="text-center text-sm text-muted-foreground"
              >
                소중한 물건을 찾고 계신가요? 로그인하고 맞춤 알림을 받아보세요.
              </DialogDescription>
            </DialogHeader>

            <div
              data-cid="div-4rQRwg"
              className="space-y-4"
            >
              <SocialLoginButton
                data-cid="SocialLoginButton-1BSzuD"
                onLogin={handleLogin}
              />
            </div>

            <div
              data-cid="div-sYOmbO"
              className="text-destructive text-sm text-center"
            >
              {error}
            </div>
          </>
        ) : (
          <LoginProcess data-cid="LoginProcess-SBvomE" />
        )}
      </DialogContent>
    </Dialog>
  );
}
