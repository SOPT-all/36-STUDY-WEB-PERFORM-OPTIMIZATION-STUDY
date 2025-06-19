# 최적화 전 라이트하우스 검사 결과
검사 환경 : 
Network throttling : Fast 4G
Performance CPU throttling : 4x slowdown
Device : Mobile

---

최적화 전 점수 : 49점
FCP : 44.5s
LCP : 98.6s
TBT : 280ms
CLS : 0.028
SI : 44.5s

---

# LCP 개선을 위한 이미지 최적화 (PNG -> WebP)

- `section1Data.ts` 에서 사용되는 `home-section-1.png` ~ `home-section-5.png` 이미지들이 LCP에 큰 영향을 주는 것을 확인
- `cwebp` 도구를 사용하여 해당 이미지들을 WebP 형식으로 변환
- `section1Data.ts`의 이미지 import 경로를 `.webp`로 수정

---

# 번들 사이즈 최적화를 위한 SVG 컴포넌트 개선

## 문제점
- React SVG 컴포넌트들이 번들에 포함되어 초기 로딩 시간 증가
- 모든 SVG가 JavaScript로 렌더링되어 성능 저하

## 최적화 작업
- SVG React 컴포넌트를 실제 SVG 파일 참조로 변경
- `@assets/svgs` import를 `<img src="/svgs/파일명.svg">` 태그로 대체
- `src/assets/svgs/index.ts`에서 사용하지 않는 SVG 컴포넌트들의 export 제거 (번들에서 완전히 제외)
- JavaScript 번들 사이즈 감소
- 초기 로딩 성능 개선
- 브라우저 캐싱 활용 가능

---

최적화 중간 결과
First Contentful Paint : 20.6 s
Largest Contentful Paint : 45.7 s
Total Blocking Time : 210 ms
Cumulative Layout Shift : 0.028
Speed Index : 20.6 s

---

# 전체 이미지 최적화 (PNG → WebP 일괄 변환)

## 작업 내용
- **public 폴더**: 54개의 PNG 파일을 WebP로 변환 (품질 85%)
- **src/assets/pngs 폴더**: 10개의 PNG 파일을 WebP로 변환 (품질 85%)

## 기존 PNG 파일 삭제
- public 폴더와 assets/pngs 폴더의 모든 PNG 파일 완전 삭제

---

# 모바일 화면 고려한 WebP 추가 최적화

## 최적화 전략
- 대형 이미지 리사이즈하여 모바일 화면 크기에 맞게 50% 축소
- 85% → 60-65%로 낮춰 추가 압축

---

Performance Panel을 통해 분석을 해봤고, Evaluate Script 막대가 긴 것을 확인하였다.

- 빌드된 `index-BdkRk-uZ.js` 파일이 **3.9MB**로 과도하게 큰 번들 크기
- 일반적인 웹앱 번들 크기(100-500KB)보다 8-40배 큰 사이즈
- 브라우저가 거대한 스크립트를 파싱하고 실행하는데 상당한 시간 소요

번들 크기가 큰 이유는, 
- **무거운 SVG 컴포넌트들**: `DeliveryIcon.tsx`(756KB), `EventIcon.tsx`(611KB), `PickupIcon.tsx`(506KB) 등이 JavaScript 번들에 포함
- **코드 분할 부재**: `pageRoutes.tsx`에서 모든 페이지를 동기 import로 한 번에 로드
- **라이브러리 의존성**: `@emotion/react`, `@tanstack/react-query`, `react-slick` 등 무거운 라이브러리들
- **정적 Mock 데이터**: 모든 상품 데이터가 번들에 정적으로 포함

두 번째로 Function Call 막대가 길었으며, 원인 분석을 해보았다.

과도한 스크롤 이벤트 리스너
- `HomePage.tsx`, `ProductDetailPage.tsx`, `BottomNav.tsx`, `FloatingUpButton.tsx`에서 동시에 scroll 이벤트 감지
- 스크롤할 때마다 모든 핸들러가 동시에 실행되어 `getBoundingClientRect()` 같은 DOM 계산 반복 수행

HomeCarousel의 추적 코드
```typescript
// 500ms마다 실행되는 setInterval
const intervalId = setInterval(trackActiveSlide, 500);
// DOM 변경시마다 실행되는 MutationObserver  
const observer = new MutationObserver(trackActiveSlide);
```
이중 추적 메커니즘으로 불필요한 함수 호출이 급증하였다.

console.log가 많은 부분도 있었다.
- `ProductDetailPage.tsx`에서만 15개 이상의 console.log
- `Review.tsx`에서 반복문 내부까지 포함하여 10개 이상 추가
- 프로덕션에서도 실행되는 디버깅 코드로 CPU 시간 소모

빈번한 리렌더링도 확인할 수 있었다
- 스크롤할 때마다 여러 state가 동시에 업데이트
- `useCallback`/`useMemo` 부재로 불필요한 함수 재생성
- 의존성 배열이 자주 변경되어 effect 재실행

---




