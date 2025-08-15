import Link from 'next/link';

import UserButton from '@/domain/auth/components/user-button';
import SearchArea from '@/domain/search/components/search-area';
import LogoIcon from '@/shared/icons/logo-icon';

import NotificationPopoverLoader from './notification-popover-loader';

export default function MainpageBanner() {
  return (
    <div
      data-cid="div-aOTfH3"
      className="flex w-full justify-center bg-primary px-4 sm:px-6 lg:px-8"
    >
      <div
        data-cid="div-INITCj"
        className="flex w-full max-w-[890px] flex-col py-8 sm:py-12 lg:py-20"
      >
        <div
          data-cid="div-mgh27T"
          className="mb-4 flex w-full items-center justify-between"
        >
          <Link
            data-cid="Link-qQ1cKZ"
            href="/"
          >
            <div
              data-cid="div-VqwlzM"
              className="flex items-center"
            >
              <LogoIcon
                data-cid="LogoIcon-GURMLb"
                className="w-8 h-8 mr-2 sm:w-10 sm:h-10 sm:mr-3 lg:w-[50px] lg:h-[50px] lg:mr-4"
                width={40}
                height={40}
                fill="hsl(var(--background))"
              />
              <h1
                data-cid="h1-2hKwzK"
                className="text-lg sm:text-xl font-bold text-background"
              >
                잃.없.다
              </h1>
            </div>
          </Link>
          <div
            data-cid="div-6R7jNw"
            className="flex items-center gap-2 sm:gap-3 lg:gap-4"
          >
            <NotificationPopoverLoader data-cid="NotificationPopoverLoader-avHJpT" />
            <UserButton data-cid="UserButton-dmwzgv" />
          </div>
        </div>
        <p
          data-cid="p-hpNepI"
          className="mb-8 sm:mb-12 lg:mb-[60px] text-sm sm:text-lg lg:text-xl text-background px-2 sm:px-0"
        >
          모든 분실물을 한눈에, 걱정할 일 없는 일상을 한번에
        </p>
        <SearchArea data-cid="SearchArea-nhTEgC" />
      </div>
    </div>
  );
}
