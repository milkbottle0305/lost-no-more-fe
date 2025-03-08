import { useQuery } from '@tanstack/react-query';

import { type NotificationsResponse, fetchNotificaitons } from './fetchNotifications';

export function useNotificationQuery() {
  return useQuery<NotificationsResponse>({
    queryKey: ['notification'],
    queryFn: fetchNotificaitons,
  });
}
