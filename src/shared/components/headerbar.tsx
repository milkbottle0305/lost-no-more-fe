'use client';

import Link from 'next/link';

import UserButton from '@/domain/auth/components/user-button';
import NotificationPopover from '@/domain/notification/components/notification-popover';
import Searchbar from '@/domain/search/components/searchbar';

import LogoIcon from '../icons/logo-icon';

export default function Headerbar() {
  return (
    <div
      data-cid="div-28DLl9"
      className="sticky flex w-full items-center justify-between bg-primary px-10 py-5"
    >
      <Link
        data-cid="Link-waa9oc"
        href="/"
      >
        <LogoIcon
          data-cid="LogoIcon-X8lHER"
          width={50}
          height={50}
          fill="hsl(var(--background))"
        />
      </Link>
      <Searchbar data-cid="Searchbar-ESeM7f" />
      <div
        data-cid="div-H1S0NG"
        className="flex items-center gap-4"
      >
        <NotificationPopover data-cid="NotificationPopover-i6MOOk" />
        <UserButton data-cid="UserButton-kAvj1d" />
      </div>
    </div>
  );
}
