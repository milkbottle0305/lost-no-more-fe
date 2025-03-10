import { useMutation } from '@tanstack/react-query';

import {
  type NotificationsReadProps,
  type NotificationsReadResponse,
  fetchNotificaitonsRead,
} from './fetchNotificationsRead';

export function useNotificationsReadMutation() {
  return useMutation<NotificationsReadResponse, unknown, NotificationsReadProps>({
    mutationKey: ['notification'],
    mutationFn: ({ notificationId }) => fetchNotificaitonsRead({ notificationId }),
  });
}
