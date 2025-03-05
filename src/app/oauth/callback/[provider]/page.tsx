'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

export default function CallbackPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code) {
      if (state === 'withdrawal') {
        window.opener?.postMessage({ type: 'GOOGLE_AUTH_CALLBACK', code }, window.location.origin);
      } else {
        window.opener?.postMessage({ type: 'OAUTH_CALLBACK', code }, window.location.origin);
      }

      setTimeout(() => {
        window.close();
      }, 1000);
    }
  }, [searchParams]);

  return <div data-cid="div-dW3PBD">로그인 처리중...</div>;
}
