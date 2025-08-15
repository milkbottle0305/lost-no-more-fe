'use client';

import Link from 'next/link';

import UserButton from '@/domain/auth/components/user-button';
import NotificationPopover from '@/domain/notification/components/notification-popover';
import Searchbar from '@/domain/search/components/searchbar';

import LogoIcon from '../icons/logo-icon';
import MobileSearchBar from './mobile-search-bar';

export default function Headerbar() {
  return (
    <>
      <div
        data-cid="div-28DLl9"
        className="sticky flex w-full items-center justify-between bg-primary px-4 py-3 sm:px-6 sm:py-4 lg:px-10 lg:py-5"
      >
        <Link
          data-cid="Link-waa9oc"
          href="/"
        >
          <LogoIcon
            data-cid="LogoIcon-X8lHER"
            width={40}
            height={40}
            className="sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]"
            fill="hsl(var(--background))"
          />
        </Link>
        <div
          data-cid="div-searchbar-wrapper"
          className="hidden md:block"
        >
          <Searchbar data-cid="Searchbar-ESeM7f" />
        </div>
        <div
          data-cid="div-H1S0NG"
          className="flex items-center gap-2 sm:gap-3 lg:gap-4"
        >
          <NotificationPopover data-cid="NotificationPopover-i6MOOk" />
          <UserButton data-cid="UserButton-kAvj1d" />
        </div>
      </div>
      <MobileSearchBar data-cid="MobileSearchBar-mobile" />
    </>
  );
}
