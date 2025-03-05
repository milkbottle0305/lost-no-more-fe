export function decodeJwt(token: string): { exp?: number } | null {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return null;
      
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
  
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('JWT 디코딩 실패:', error);
      return null;
    }
  }
  
  export function isTokenExpired(token: string | null): boolean {
    if (!token) return true;
    
    try {
      const payload = decodeJwt(token);
      if (!payload || !payload.exp) return true;
      
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      console.error('토큰 만료 확인 실패:', error);
      return true;
    }
  }