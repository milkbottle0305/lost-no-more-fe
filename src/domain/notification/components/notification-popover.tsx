'use client';

import { useRouter } from 'next/navigation';

import { Card, CardTitle } from '@/shared/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { BellIcon } from 'lucide-react';

import { useNotificationQuery } from '../queries/useNotificationsQuery';
import { useNotificationsReadMutation } from '../queries/useNotificationsReadMutation';

function NotificationContent() {
  const { data, isLoading } = useNotificationQuery();

  const { mutate: readNotification } = useNotificationsReadMutation();
  const router = useRouter();
  const onClickNotification = (notificationId: number) => {
    readNotification({ notificationId });
    router.push('/mypage');
  };

  const notifications = data?.data.alarms;

  if (isLoading) {
    return (
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
              로딩중입니다.
            </p>
          </div>
        </li>
      </ul>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
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
              알림이 없습니다.
            </p>
          </div>
        </li>
      </ul>
    );
  }

  return (
    <ul
      data-cid="ul-IhuuPW"
      className="h-[300px] overflow-y-auto"
    >
      {notifications?.map((notification) => (
        <li
          key={notification.alarmId}
          data-cid="li-cSLphs"
        >
          <div
            data-cid="div-j4Koln"
            onClick={() => onClickNotification(notification.alarmId)}
            className={`cursor-pointer border-1 border-t border-solid border-border px-1 py-3 ${notification.readStatus ? 'bg-background' : 'bg-notificationNew'}`}
          >
            <p
              data-cid="p-NcsEtG"
              className="mb-1 line-clamp-2 w-full text-sm text-foreground"
            >
              {notification.date.replace('-', '.')} 기준 &apos;{notification.keyword}&apos; 키워드가
              포함된 물품이 {notification.totalCounts}건 등록되었습니다.
            </p>
            <p
              data-cid="p-pQF3H8"
              className="text-sm text-secondary-foreground"
            >
              {notification.date.split('-').slice(0, 2)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

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
          <NotificationContent data-cid="NotificationContent-PX5DQa" />
        </Card>
      </PopoverContent>
    </Popover>
  );
}
