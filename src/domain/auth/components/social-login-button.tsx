import GoogleIcon from '@/shared/icons/google-icon';
import KakaotalkIcon from '@/shared/icons/kakaotalk-icon';
import { Button } from '@/shared/ui/button';

interface LoginButtonProps {
  provider: 'kakao' | 'google';
  onLogin: () => void;
}

export default function LoginButton({ provider, onLogin }: LoginButtonProps) {
  return (
    <Button
      data-cid="Button-B8QSWL"
      className="relative flex h-11 w-full items-center bg-gray-100 text-lg font-bold text-black hover:bg-gray-200"
      onClick={onLogin}
    >
      {provider === 'kakao' ? (
        <>
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
        </>
      ) : (
        <>
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
        </>
      )}
    </Button>
  );
}
