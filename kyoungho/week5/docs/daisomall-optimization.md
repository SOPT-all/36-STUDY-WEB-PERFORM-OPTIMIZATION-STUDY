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
- **중요**: `src/assets/svgs/index.ts`에서 사용하지 않는 SVG 컴포넌트들의 export 제거 (번들에서 완전히 제외)

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



