import Link from 'next/link';
import LogoIcon from '../icons/logo-icon';
import NotificationIcon from '../icons/notification-icon';
import UserIcon from '../icons/user-icon';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Card, CardTitle } from '../ui/card';
import SearchArea from './search-area';

export default function SearchbarBanner() {
  return (
    <div className="flex w-full justify-center bg-primary">
      <div className="flex w-[890px] flex-col py-20">
        <div className="mb-4 flex w-full items-center justify-between">
          <Link href="/">
            <div className="flex items-center">
              <LogoIcon className="mr-4" width={50} height={50} fill="hsl(var(--background))" />
              <h1 className="text-xl font-bold text-background">잃.없.다</h1>
            </div>
          </Link>
          <div className="flex items-center">
            <Popover>
              <PopoverTrigger className="mr-4">
                <NotificationIcon width={36} height={36} fill="hsl(var(--background))" />
              </PopoverTrigger>
              <PopoverContent asChild>
                <Card className="w-[260px]">
                  <CardTitle className="pb-2">알림</CardTitle>
                  <ul>
                    <li>
                      <div className="border-1 border-t border-solid border-border px-1 py-3">
                        <p className="mb-1 line-clamp-2 w-full text-sm text-foreground">
                          2025.01.11 오전 6시 기준 &apos;에어팟&apos; 키워드가 포함된 물품이 18건
                          등록되었습니다.
                        </p>
                        <p className="text-sm text-secondary-foreground">01. 11. 04:00</p>
                      </div>
                      <div className="border-1 border-t border-solid border-border px-1 py-3">
                        <p className="mb-1 line-clamp-2 w-full text-sm text-foreground">
                          2025.01.11 오전 6시 기준 &apos;에어팟&apos; 키워드가 포함된 물품이 18건
                          등록되었습니다.
                        </p>
                        <p className="text-sm text-secondary-foreground">01. 11. 04:00</p>
                      </div>
                    </li>
                  </ul>
                </Card>
              </PopoverContent>
            </Popover>
            <button className="rounded-sm p-2 hover:bg-secondary">
              <UserIcon width={32} height={32} fill="hsl(var(--background))" />
            </button>
          </div>
        </div>
        <p className="mb-[60px] text-xl text-background">
          모든 분실물을 한눈에, 걱정할 일 없는 일상을 한번에
        </p>
        <SearchArea />
      </div>
    </div>
  );
}
