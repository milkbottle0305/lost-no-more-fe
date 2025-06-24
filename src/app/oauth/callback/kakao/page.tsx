'use client';

import { Suspense } from 'react';

import CallbackPageInner from '@/app/oauth/callback/kakao/CallbackPageInner';

export default function CallbackPage() {
  return (
    <Suspense data-cid="Suspense-hN2CNM">
      <CallbackPageInner data-cid="CallbackPageInner-Kfi32y" />
    </Suspense>
  );
}
