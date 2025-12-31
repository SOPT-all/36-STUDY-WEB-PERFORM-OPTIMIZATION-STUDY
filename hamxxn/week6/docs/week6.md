# ⚡ Web Performance Optimization Summary

## 1. Reduce Unused CSS

- PurgeCSS는 사용되지 않은 CSS를 제거해 파일 크기를 줄이지만,
- **vanilla-extract / CSS-in-TS 사용 시 PurgeCSS는 필요 없음**:

  - 사용되지 않은 class 자체가 코드에 존재하지 않음
  - 컴파일 타임에 **tree-shaking**으로 제거됨

## 2. Enable Text Compression

- HTML, JS, CSS, WOFF2 등 **텍스트 기반 자원은 gzip/brotli 압축 대상**
- \*\*로컬 환경(vite dev, preview 등)\*\*에서는 압축 적용되지 않음
- 배포 서버 (Nginx, Vercel 등)에서만 의미 있음

### 👉 신경 안 써도 되는 이유

Lighthouse는 로컬 환경에서 압축 미적용 상태로 판단할 뿐, 실제 서비스 배포 시엔 압축이 적용됨

---

## 3. Font 최적화

기존:

```html
<link rel="stylesheet" href="pretendard-dynamic-subset.css" />
```

➡ **직접 호스팅 방식으로 변경 (woff2)**:

1. Pretendard woff2 파일 다운로드 → `/public/fonts/` 저장
2. `globalFontFace()` 사용하여 선언:

```ts
globalFontFace("Pretendard", {
  src: 'url("/assets/fonts/PretendardVariable.woff2") format("woff2-variations")',
  fontDisplay: "block",
});
```

### @font-face 장점:

- CSS-in-JS 시스템과 통합 가능
- 서브셋 + 필요한 weight만 포함 가능
- 글로벌 스타일과 결합 용이
- 코드 스플리팅과 궁합이 좋음

---

## 4. SVG 최적화: SVG Sprite

**문제:**

- 수많은 SVG 파일을 React Component로 import → JS 번들 크기 증가

**해결:** SVG Sprite + `<symbol>` 활용

### 예시:

```tsx
<svg aria-hidden="true">
  <use href="/sprite-sheet.svg#ic-cart-black" />
</svg>
```

### Sprite 제작 도구: [Spritebot](https://github.com/thomasjbradley/spritebot)

### 컴포넌트:

```tsx
export const SocialSVG = ({ id, width, height }) => (
  <svg style={{ width, height }}>
    <use href={`${SpriteSVG}#${id}`} />
  </svg>
);
```

---

## 5. Footer Lazy Loading

**문제:**

- `<Footer />`에 많은 리소스 포함됨 (SocialSVG 등)
- `<Outlet />` Suspense 대기 중에도 Footer 렌더링되어 초기 렌더링 지연

**해결:** React lazy + Suspense로 지연 렌더링 처리

```tsx
const LazyFooter = lazy(() => import("@/components/footer/Footer"));

<Suspense fallback={null}>
  <LazyFooter />
</Suspense>;
```

---

## 6. 정적 이미지 렌더링 지연 (LCP 개선)

**문제:**

- 이미지에 `width: 100%` 적용 시, 부모 요소의 layout 확정 전까지 렌더링 지연됨

### 해결 방법:

- `aspectRatio`, `width` 등을 명시적으로 선언해 레이아웃을 미리 확보

```ts
export const imgBanner = style({
  width: "100%",
  aspectRatio: "4.27 / 1",
  marginBottom: "6.6rem",
});
```

---

## 7. Minify JavaScript

**정의:** JS 파일의 공백, 주석, 긴 변수명 등을 제거해 **파일 크기 최소화**

### 예시:

```tsx
// Before
function sayHello(name) {
  console.log("Hello, " + name);
}

// After
function a(b) {
  console.log("Hello, " + b);
}
```

- Vite는 dev/preview 모드에서는 미적용
- build 시 자동 적용됨

### 코드 골프 팁:

```tsx
// 전
const promotionData =
  mockProducts.length > 5 ? mockProducts.slice(0, 5) : mockProducts;

// 후
const promotionData = mockProducts[5] ? mockProducts.slice(0, 5) : mockProducts;
```

---

## 8. SVG 최적화 이슈 (fill="none" 사라짐)

**원인:** svgo 같은 SVG 최적화 도구가 의미 없다고 판단해 제거함

예:

```html
<path d="..." fill="none" />
```

→ build 시 제거될 수 있음 (의미 있는 경우 stroke 설정 등 명시 필요)

---

## 9. `<use href="#id">`가 동작하는 이유

SVG Sprite는 `<symbol>`을 정의하고 `<use href="#id">`로 해당 심볼을 참조해서 렌더링함 → 브라우저가 내부적으로 `inline`처럼 삽입해줌
