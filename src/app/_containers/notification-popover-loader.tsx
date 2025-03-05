'use client';

import { useAuth } from '@/domain/auth/hooks/useAuth';
import NotificationPopover from '@/domain/notification/components/notification-popover';

export default function NotificationPopoverLoader() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <NotificationPopover data-cid="NotificationPopover-xXfQVw" /> : null;
}
