'use client';

import { useState } from 'react';

export function useNotificationSettings() {
  const [emailNotification, setEmailNotification] = useState(false);

  return {
    emailNotification,
    setEmailNotification,
  };
}
