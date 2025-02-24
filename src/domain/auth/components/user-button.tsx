'use client';

import { useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useAuth } from '@/domain/auth/hooks/useAuth';
import { UserIcon } from 'lucide-react';

import LoginPopup from '@/domain/auth/components/login-popup';

export default function UserButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const handleClick = () => {
    if (pathname === '/mypage') {
      return;
    }

    if (isLoggedIn) {
      router.push('/mypage');
    } else {
      setIsLoginPopupOpen(true);
    }
  };

  return (
    <>
      <button
        data-cid="button-SwoZgP"
        onClick={handleClick}
        className="group rounded-sm p-2 hover:bg-background hover:text-primary"
      >
        <UserIcon
          data-cid="UserIcon-fcDn0w"
          size={32}
          className="text-background group-hover:text-primary"
        />
      </button>

      <LoginPopup data-cid="LoginPopup-EKnj5g"
        open={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
      />
    </>
  );
}
