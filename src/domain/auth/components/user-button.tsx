'use client';

import { usePathname, useRouter } from 'next/navigation';

import LoginPopup from '@/domain/auth/components/login-popup';
import { useAuth } from '@/domain/auth/hooks/useAuth';
import { UserIcon } from 'lucide-react';

import useLoginPopupStore from '../stores/login-popup-store';

export default function UserButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const { isOpen, openPopup, closePopup } = useLoginPopupStore();

  const handleClick = () => {
    if (pathname === '/mypage') {
      return;
    }

    if (isLoggedIn) {
      router.push('/mypage');
    } else {
      openPopup();
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

      <LoginPopup
        data-cid="LoginPopup-EKnj5g"
        open={isOpen}
        onClose={closePopup}
      />
    </>
  );
}
