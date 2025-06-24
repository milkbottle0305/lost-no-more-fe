import KakaotalkIcon from '@/shared/icons/kakaotalk-icon';
import { Button } from '@/shared/ui/button';

interface LoginButtonProps {
  onLogin: () => void;
}

export default function LoginButton({ onLogin }: LoginButtonProps) {
  return (
    <Button
      data-cid="Button-B8QSWL"
      className="relative flex h-11 w-full items-center bg-gray-100 text-lg font-bold text-black hover:bg-gray-200"
      onClick={onLogin}
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
  );
}
