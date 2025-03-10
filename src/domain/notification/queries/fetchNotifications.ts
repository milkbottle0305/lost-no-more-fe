import ApiClient from '@/shared/lib/api-client';
import { ApiEndpoint } from '@/shared/types/api-endpoint';
import type { Response } from '@/shared/types/response';

interface NotificationsData {
  alarms: {
    alarmId: number;
    date: string;
    totalCounts: number;
    keyword: string;
    region: string;
    category: string;
    readStatus: boolean;
  }[];
}

export type NotificationsResponse = Response<NotificationsData>;

export async function fetchNotificaitons(): Promise<NotificationsResponse> {
  return await ApiClient.get(ApiEndpoint.NOTIFICATIONS, {}).json();
}
