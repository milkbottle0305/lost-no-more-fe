'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

export default function CallbackPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (window.opener) {
      if (error) {
        window.opener.postMessage(
          {
            type: 'OAUTH_CALLBACK',
            error,
          },
          window.location.origin
        );
      } else if (code) {
        window.opener.postMessage(
          {
            type: 'OAUTH_CALLBACK',
            code,
          },
          window.location.origin
        );
      }

      setTimeout(() => {
        window.close();
      }, 100);
    }
  }, [searchParams]);

  return <div data-cid="div-dW3PBD">로그인 처리중...</div>;
}
