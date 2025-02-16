# Lost-No-More 코드 컨벤션 가이드

## 목차
1. [TypeScript 규칙](#typescript-규칙)
2. [React 규칙](#react-규칙)
3. [Import/Export 규칙](#importexport-규칙)
4. [코드 품질 규칙](#코드-품질-규칙)
5. [테스트 규칙](#테스트-규칙)
6. [포맷팅 규칙](#포맷팅-규칙)

## TypeScript 규칙

### 1. 타입 정의
복잡한 타입의 경우 각각의 용도에 맞는 방식을 사용해 주세요:

```typescript
// Props나 함수 파라미터가 3개 초과인 경우 interface 사용
interface ButtonProps {
  onClick: () => void;
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}

// 리터럴이나 유니온 타입은 type 사용
type ButtonVariant = 'primary' | 'secondary';
type Status = 'pending' | 'success' | 'error';
```

**장점**:
- 타입의 용도가 명확해져 코드 이해도가 높아집니다
- 타입 정의 방식을 통일하여 일관성이 향상됩니다
- 유지보수가 용이해집니다

### 2. 타입 임포트
타입 전용 임포트는 반드시 `import type`을 사용해 주세요:

```typescript
// ❌ 피해야 할 방식
import { UserType } from '@/types';

// ✅ 권장하는 방식
import type { UserType } from '@/types';
```

**효과**:
- 타입과 값을 명확히 구분할 수 있습니다
- 번들 크기를 최적화할 수 있습니다
- 컴파일 성능이 향상됩니다

## React 규칙

### 1. 컴포넌트 작성
컴포넌트 작성 시 다음 규칙을 지켜주세요:

```typescript
// ✅ 권장하는 방식
const UserCard = ({ user }: UserCardProps) => {
  return (
    <div
      data-cid="user-card"
      className="card"
    >
      <Avatar
        data-cid="user-avatar"
        src={user.avatar}
      />
    </div>
  );
};
```

**규칙 사항**:
- self-closing 태그를 사용해 주세요 (코드 일관성)
- 각 속성은 한 줄에 하나씩 작성해 주세요 (가독성)
- data-cid 속성은 필수입니다 (테스트 용이성)
- 배열의 key로 인덱스 사용은 피해주세요 (성능 최적화)

### 2. Hooks 사용
useEffect의 의존성 배열을 반드시 관리해 주세요:

```typescript
// ✅ 권장하는 방식
useEffect(() => {
  setUserData(userData);
}, [userData]);
```

**장점**:
- 무한 렌더링 방지
- 메모리 누수 방지
- 사이드 이펙트 명확화

## Import/Export 규칙

### 1. 임포트 순서
아래 순서로 임포트를 정렬해 주세요:

```typescript
// 1. React/Next.js
import { useState } from 'react';

// 2. 외부 라이브러리
import { QueryClient } from '@tanstack/react-query';

// 3. 타입
import type { User } from '@/types';

// 4. 설정
import { API_URL } from '@/configs';

// 5. 내부 라이브러리
import { api } from '@/lib';

// 6. 훅
import { useUser } from '@/hooks';

// 7. 컴포넌트
import { Button } from '@/components';

// 8. 스타일
import '@/styles/main.css';

// 9. 상수
import { ROUTES } from '@/constants';

// 10. 상대 경로
import { helper } from '../utils';
```

**효과**:
- 코드 구조의 일관성 유지
- 의존성 관계 파악 용이
- 자동 정렬로 인한 충돌 방지

## 코드 품질 규칙

### 1. 함수 제한 사항
다음과 같은 제한을 준수해 주세요:

```typescript
// ❌ 피해야 할 방식 - 중첩 깊이 초과
function processData() {
  users.forEach(user => {              // 깊이 1
    if (user.isActive) {              // 깊이 2
      user.posts.forEach(post => {    // 깊이 3
        if (post.isPublished) {       // 깊이 4 - 에러!
          // ...
        }
      });
    }
  });
}

// ✅ 권장하는 방식
function processPost(post: Post) {
  if (!post.isPublished) return;
  // 로직 처리
}

function processUserPosts(user: User) {
  if (!user.isActive) return;
  user.posts.forEach(processPost);
}
```

**제한 사항**:
- 최대 중첩 깊이: 3 (가독성)
- 최대 매개변수 개수: 3 (유지보수성)
- 최대 함수 길이: 250줄 (단일 책임 원칙)

### 2. 콘솔 사용
로깅은 다음과 같이 제한적으로 사용해 주세요:

```typescript
// ❌ 피해야 할 방식
console.log('데이터:', data);

// ✅ 권장하는 방식
console.warn('잠재적 문제:', warning);
console.error('오류 발생:', error);
console.debug('디버그 정보:', debug);
```

**이유**:
- 프로덕션 코드의 깔끔함 유지
- 디버깅 용이성 향상
- 로그 레벨 구분 명확화

## 포맷팅 규칙

### 1. 기본 설정
다음 포맷팅 규칙을 준수해 주세요:

```typescript
// ✅ 권장하는 방식
const example = (param1: string, param2: number): string => {
  const result = `${param1}: ${param2}`;
  return result;
};

const obj = {
  key1: 'value1',
  key2: 'value2',
};
```

**규칙 사항**:
- 세미콜론 필수
- 작은따옴표 사용
- 한 줄 최대 길이: 100자
- 들여쓰기: 스페이스 2칸
- 객체/배열 마지막 쉼표 사용

### 2. JSX/TSX 포맷팅
JSX/TSX 파일은 다음과 같이 작성해 주세요:

```tsx
// ✅ 권장하는 방식
const Component = ({ title, children }: Props) => {
  return (
    <div
      className="container"
      data-cid="main"
    >
      <h1>{title}</h1>
      {children}
    </div>
  );
};
```

**규칙 사항**:
- JSX 속성은 큰따옴표 사용
- 다중 속성은 새 줄에 작성
- self-closing 태그 사용
- 속성 간 일관된 공백 유지

### 3. IDE 설정
VSCode에서 다음 설정을 사용해 주세요:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

**효과**:
- 자동 포맷팅으로 일관성 유지
- 코드 스타일 충돌 방지
- 생산성 향상