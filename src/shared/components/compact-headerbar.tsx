'use client';

import Link from 'next/link';

import UserButton from '@/domain/auth/components/user-button';
import NotificationPopover from '@/domain/notification/components/notification-popover';

import LogoIcon from '../icons/logo-icon';

export default function CompactHeaderbar() {
  return (
    <div
      data-cid="div-compact-header"
      className="sticky flex w-full items-center justify-between bg-primary px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3"
    >
      <Link
        data-cid="Link-compact-logo"
        href="/"
      >
        <div
          data-cid="div-logo-with-title"
          className="flex items-center gap-2"
        >
          <LogoIcon
            data-cid="LogoIcon-compact"
            width={32}
            height={32}
            className="sm:w-[36px] sm:h-[36px] lg:w-[40px] lg:h-[40px]"
            fill="hsl(var(--background))"
          />
          <span
            data-cid="span-title"
            className="text-sm sm:text-base lg:text-lg font-bold text-background"
          >
            잃.없.다
          </span>
        </div>
      </Link>
      <div
        data-cid="div-actions"
        className="flex items-center gap-2 sm:gap-3"
      >
        <NotificationPopover data-cid="NotificationPopover-compact" />
        <UserButton data-cid="UserButton-compact" />
      </div>
    </div>
  );
}
