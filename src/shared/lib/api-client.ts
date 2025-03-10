import ky from 'ky';

const ApiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // 요청 전에 실행할 인터셉터
        if (typeof window === 'undefined') return;
        const token = localStorage.getItem('accessToken');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
        console.debug('Request:', request);
      },
    ],
  },
});

export default ApiClient;
