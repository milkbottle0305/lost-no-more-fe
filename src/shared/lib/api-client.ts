import ky from 'ky';

const ApiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // 요청 전에 실행할 인터셉터
        // TODO: 토큰을 로컬 스토리지에서 가져오거나, 다른 방법으로 토큰을 가져와서 설정
        const token = 'test-token';
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
        console.debug('Request:', request);
      },
    ],
    afterResponse: [
      (request, options, response) => {
        // 응답 후에 실행할 인터셉터
        console.debug('Response:', response);
      },
    ],
  },
});

export default ApiClient;
