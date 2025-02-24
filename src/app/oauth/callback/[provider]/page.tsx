'use client';

import { useEffect } from 'react';

export default function CallbackPage() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      window.opener?.postMessage({ type: 'OAUTH_CALLBACK', code }, window.location.origin);
    }
  }, []);

  return <div data-cid="div-dW3PBD">로그인 처리중...</div>;
}
