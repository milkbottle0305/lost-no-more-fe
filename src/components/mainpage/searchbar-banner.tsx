import Link from 'next/link';

import LogoIcon from '../icons/logo-icon';
import NotificationIcon from '../icons/notification-icon';
import UserIcon from '../icons/user-icon';
import { Card, CardTitle } from '../ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import SearchArea from './search-area';

export default function SearchbarBanner() {
  return (
    <div
      data-cid="div-aOTfH3"
      className="flex w-full justify-center bg-primary"
    >
      <div
        data-cid="div-INITCj"
        className="flex w-[890px] flex-col py-20"
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
                className="mr-4"
                width={50}
                height={50}
                fill="hsl(var(--background))"
              />
              <h1
                data-cid="h1-2hKwzK"
                className="text-xl font-bold text-background"
              >
                잃.없.다
              </h1>
            </div>
          </Link>
          <div
            data-cid="div-Bdc7vW"
            className="flex items-center"
          >
            <Popover data-cid="Popover-134msZ">
              <PopoverTrigger
                data-cid="PopoverTrigger-EQ7xQI"
                className="mr-4"
              >
                <NotificationIcon
                  data-cid="NotificationIcon-tM92Oy"
                  width={36}
                  height={36}
                  fill="hsl(var(--background))"
                />
              </PopoverTrigger>
              <PopoverContent
                data-cid="PopoverContent-AWPvgE"
                asChild
              >
                <Card
                  data-cid="Card-AABAAF"
                  className="w-[260px]"
                >
                  <CardTitle
                    data-cid="CardTitle-bOjrvh"
                    className="pb-2"
                  >
                    알림
                  </CardTitle>
                  <ul data-cid="ul-ONjPUZ">
                    <li data-cid="li-Phy968">
                      <div
                        data-cid="div-y38hvE"
                        className="border-1 border-t border-solid border-border px-1 py-3"
                      >
                        <p
                          data-cid="p-jM6s7P"
                          className="mb-1 line-clamp-2 w-full text-sm text-foreground"
                        >
                          2025.01.11 오전 6시 기준 &apos;에어팟&apos; 키워드가 포함된 물품이 18건
                          등록되었습니다.
                        </p>
                        <p
                          data-cid="p-UZP4Ty"
                          className="text-sm text-secondary-foreground"
                        >
                          01. 11. 04:00
                        </p>
                      </div>
                      <div
                        data-cid="div-StE3Ta"
                        className="border-1 border-t border-solid border-border px-1 py-3"
                      >
                        <p
                          data-cid="p-GZJ3FG"
                          className="mb-1 line-clamp-2 w-full text-sm text-foreground"
                        >
                          2025.01.11 오전 6시 기준 &apos;에어팟&apos; 키워드가 포함된 물품이 18건
                          등록되었습니다.
                        </p>
                        <p
                          data-cid="p-fxoi9e"
                          className="text-sm text-secondary-foreground"
                        >
                          01. 11. 04:00
                        </p>
                      </div>
                    </li>
                  </ul>
                </Card>
              </PopoverContent>
            </Popover>
            <button
              data-cid="button-Ai24xL"
              className="rounded-sm p-2 hover:bg-secondary"
            >
              <UserIcon
                data-cid="UserIcon-OdJ36E"
                width={32}
                height={32}
                fill="hsl(var(--background))"
              />
            </button>
          </div>
        </div>
        <p
          data-cid="p-hpNepI"
          className="mb-[60px] text-xl text-background"
        >
          모든 분실물을 한눈에, 걱정할 일 없는 일상을 한번에
        </p>
        <SearchArea data-cid="SearchArea-nhTEgC" />
      </div>
    </div>
  );
}
