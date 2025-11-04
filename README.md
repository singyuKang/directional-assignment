# Directional 과제 - 게시판 & 데이터 시각화 시스템

## 프로젝트 소개
React와 TypeScript를 활용한 게시판 관리 시스템 및 데이터 시각화 대시보드입니다.

## 프로젝트 실행 방법

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

## 기술 스택

### Core
- **React** 19.1.1
- **TypeScript** 5.9.3
- **Vite** 7.1.7

### 상태 관리 & 데이터 페칭
- **TanStack Query** (React Query) 5.90.6

### 라우팅
- **React Router DOM** 7.9.5

### HTTP 클라이언트
- **Axios** 1.13.1

### 스타일링
- **Tailwind CSS** 3.4.18

### 데이터 시각화
- **Recharts** 3.3.0

## 주요 구현 기능

### 1. 게시판 기능
- ✅ CRUD (작성, 조회, 수정, 삭제)
- ✅ 검색 (제목/본문)
- ✅ 커서 기반 페이지네이션
- ✅ 정렬 (제목/날짜 기준 오름차순/내림차순)
- ✅ 카테고리 필터링 (공지사항/질문답변/자유게시판)
- ✅ 태그 시스템 (최대 5개, 각 24자 이내)
- ✅ 금칙어 필터링 (캄보디아, 프놈펜, 불법체류, 텔레그램)

### 2. 데이터 시각화
- ✅ 인기 커피 브랜드 (바 차트, 도넛 차트)
- ✅ 주간 무드 트렌드 (스택형 바 차트, 스택형 면적 차트)
- ✅ 팀별 커피 소비량 vs 버그/생산성 (멀티라인 차트)

### 3. 인증
- ✅ JWT 기반 로그인
- ✅ Protected Routes

## 아키텍처 설계

### 폴더 구조
```
src/
├── components/           # 재사용 가능한 컴포넌트
│   ├── auth/            # 로그인 관련
│   ├── charts/          # 차트 컴포넌트
│   ├── common/          # 공통 컴포넌트
│   └── posts/           # 게시글 관련
├── contexts/            # Context API
├── hooks/               # Custom Hooks
│   └── queries/         # React Query Hooks
├── lib/                 # 라이브러리 설정
├── models/              # 데이터 모델 (타입 정의)
├── pages/               # 페이지 컴포넌트
├── services/            # API 서비스
├── types/               # 기타 타입
└── utils/               # 유틸리티 함수
```

### 핵심 설계 원칙

#### 1. React Query를 통한 서버 상태 관리
- 자동 캐싱 및 리페칭
- Optimistic Updates
- 무효화 관리 (Invalidation)
- 로딩/에러 상태 자동 관리

**예시:**
```typescript
// hooks/queries/usePostQueries.ts
export function usePosts(params: GetPostsParams) {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => PostService.getPosts(params),
  });
}
```

#### 2. Custom Hooks를 통한 비즈니스 로직 분리
- UI와 로직 완전 분리
- 재사용성 향상
- 테스트 용이성

**예시:**
```typescript
// hooks/usePostList.ts
export function usePostList() {
  const { data, isLoading } = usePosts(params);
  // 비즈니스 로직...
  return { posts, loading, handleSearch, ... };
}
```

#### 3. 컴포넌트 분리 원칙
- Atomic Design 패턴 적용
- 단일 책임 원칙 (SRP)
- Props를 통한 데이터 전달

**구조:**
```
Page (로직 + 조합)
  ├── Custom Hook (비즈니스 로직)
  ├── Header Component (프레젠테이션)
  ├── Form Component (프레젠테이션)
  └── List Component (프레젠테이션)
```

#### 4. 계층 분리
- **Models**: 데이터 타입 정의
- **Services**: API 호출
- **Hooks**: 비즈니스 로직 + React Query
- **Components**: UI 렌더링
- **Pages**: 조합 및 라우팅

#### 5. 퍼포먼스 최적화

React.memo를 적용해 불필요한 리렌더링을 방지했습니다.

컴포넌트(LoginHeader, LoginLayout)에 React memo를 적용하여, 상위 컴포넌트 상태 변경 시에도 불필요한 렌더링이 발생하지 않도록 최적화했습니다.

```typescript
import { memo } from "react";

function LoginHeader() {
  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Directional 과제
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">게시판 시스템</p>
    </div>
  );
}

export default memo(LoginHeader);
```

```typescript
import { memo } from "react";
import type { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
}

function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">{children}</div>
    </div>
  );
}

export default memo(LoginLayout);
```
<img width="619" height="70" alt="스크린샷 2025-11-04 오후 4 45 18" src="https://github.com/user-attachments/assets/3357bcfa-7616-415c-b492-fb0aa4381334" />



## 📂 주요 파일 설명

### API & 서비스
```typescript
// services/postService.ts - 게시글 API
// services/mockService.ts - Mock 데이터 API
// lib/axios.ts - Axios 인터셉터 설정
```

### Custom Hooks
```typescript
// hooks/usePostList.ts - 게시글 목록 로직
// hooks/usePostForm.ts - 게시글 작성/수정 로직
// hooks/usePostDetail.ts - 게시글 상세 로직
// hooks/queries/usePostQueries.ts - 게시글 React Query
// hooks/queries/useChartQueries.ts - 차트 React Query
```

### 컴포넌트
```typescript
// components/posts/* - 게시글 관련 컴포넌트
// components/charts/* - 차트 컴포넌트
// components/common/* - 공통 컴포넌트 (로딩, 에러)
```


## 배포
- **플랫폼**: Vercel
- **배포 링크**: [https://directional-assignment.vercel.app/login]

