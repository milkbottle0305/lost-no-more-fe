import { BellIcon } from 'lucide-react';
import { Card, CardTitle } from '../ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export default function NotificationPopover() {
  return (
    <Popover data-cid="Popover-NBpDGw">
      <PopoverTrigger data-cid="PopoverTrigger-LcqyuX">
        <BellIcon
          data-cid="BellIcon-0tGUVs"
          size={32}
          color="hsl(var(--background))"
        />
      </PopoverTrigger>
      <PopoverContent
        data-cid="PopoverContent-etI4F0"
        asChild
      >
        <Card
          data-cid="Card-mmQd7Q"
          className="w-[260px]"
        >
          <CardTitle
            data-cid="CardTitle-8hCzmg"
            className="pb-2"
          >
            알림
          </CardTitle>
          <ul data-cid="ul-IhuuPW">
            <li data-cid="li-cSLphs">
              <div
                data-cid="div-j4Koln"
                className="border-1 border-t border-solid border-border px-1 py-3"
              >
                <p
                  data-cid="p-NcsEtG"
                  className="mb-1 line-clamp-2 w-full text-sm text-foreground"
                >
                  2025.01.11 오전 6시 기준 &apos;에어팟&apos; 키워드가 포함된 물품이 18건
                  등록되었습니다.
                </p>
                <p
                  data-cid="p-pQF3H8"
                  className="text-sm text-secondary-foreground"
                >
                  01. 11. 04:00
                </p>
              </div>
              <div
                data-cid="div-MgQ7Ja"
                className="border-1 border-t border-solid border-border px-1 py-3"
              >
                <p
                  data-cid="p-6hmWFg"
                  className="mb-1 line-clamp-2 w-full text-sm text-foreground"
                >
                  2025.01.11 오전 6시 기준 &apos;에어팟&apos; 키워드가 포함된 물품이 18건
                  등록되었습니다.
                </p>
                <p
                  data-cid="p-9Mn8fO"
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
  );
}
