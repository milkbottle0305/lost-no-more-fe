import ApiClient from '@/shared/lib/api-client';
import { ApiEndpoint } from '@/shared/types/api-endpoint';
import type { Response } from '@/shared/types/response';

export interface NotificationsReadProps {
  notificationId: number;
}

export type NotificationsReadResponse = Response<null>;

export async function fetchNotificaitonsRead({
  notificationId,
}: NotificationsReadProps): Promise<NotificationsReadResponse> {
  return await ApiClient.post(`${ApiEndpoint.NOTIFICATIONS}/${notificationId}`).json();
}
