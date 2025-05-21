
# 3장 홈페이지 최적화

## 3.1 이미지 지연 로딩 (Lazy Loading)

### 문제

초기 진입 시 모든 이미지가 불필요하게 로딩되어, 우선순위가 높은 비디오가 늦게 로딩된다.

### 목표

스크롤로 이미지가 뷰포트에 들어오는 시점에 이미지를 로드 → 비디오 우선 로딩, UX 개선

<br />


### 3.1.1 Throttle 기법

* **Throttle**: 스크롤 이벤트를 일정 시간 간격으로 제한
* 예: 200ms마다 이벤트 한 번만 처리
* 문제: 이미지가 짧게 보였다 사라질 경우 로딩을 놓칠 수 있음

<br />

### 3.1.2 Intersection Observer

#### 개요

* 요소가 뷰포트에 진입하면 콜백 호출
* 성능 좋고 정확도 높음

#### 코드 예시

```tsx
useEffect(() => {
  const options = {
    root: null,
    threshold: 1,
    rootMargin: 0,
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(imgRef.current);

  return () => observer.disconnect();
}, []);
```

```html
<img data-src="image.jpg" ref={imgRef} />
```



### 3.1.3 Native Lazy Loading

```html
<img src="image.jpg" alt="설명" loading="lazy" />
```

* `loading` 속성:

  * `auto`: 브라우저가 판단
  * `lazy`: 늦게 로딩
  * `eager`: 즉시 로딩

#### 주의

* 세부 시점 제어 불가
* SEO와 호환성 문제 있음

<br />

## 3.2 이미지 최적화

### WebP 포맷으로 압축 (e.g., [Squoosh](https://squoosh.app/))

* `picture` 태그를 사용해 호환성 확보

```tsx
<picture>
  <source data-srcset="image.webp" type="image/webp" />
  <img data-src="image.jpg" ref={imgRef} />
</picture>
```

#### 복수 포맷 예시

```tsx
<picture>
  <source class="webp-source" data-srcset="main.webp" type="image/webp" />
  <source class="png-source" data-srcset="main.png" type="image/png" />
  <img data-src="main.jpg" ref={imgEl3} />
</picture>
```

```tsx
const webpSourceEl = entry.target.parentElement.querySelector('.webp-source');
const pngSourceEl = entry.target.parentElement.querySelector('.png-source');
```

<br />

## 3.3 동영상 최적화

### WebM 포맷 압축 및 다중 `<source>`

```html
<video autoPlay loop muted>
  <source src="video.webm" type="video/webm" />
  <source src="video.mp4" type="video/mp4" />
</video>
```

### UX 보완법

* `blur` 필터나 `패턴 오버레이`로 저화질 눈속임 처리

```css
.pattern-overlay {
  background-image: url('pattern.png');
  opacity: 0.5;
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}
```

<br />

## 3.3 폰트 최적화

### 3.3.1 FOUT vs FOIT

| 방식   | 특징                    |
| ---- | --------------------- |
| FOUT | 글자 먼저, 폰트 나중 (UX 빠름)  |
| FOIT | 폰트 로드 후 표시 (시각적으로 깔끔) |

<br />

### 3.3.2 시점 제어 with `fontfaceobserver`

```tsx
import FontFaceObserver from "fontfaceobserver";
const font = new FontFaceObserver("BMYEONSUNG");

useEffect(() => {
  font.load(null, 20000).then(() => setIsFontLoaded(true));
}, []);
```

<br />

### 3.3.3 포맷 변경

| 포맷      | 특징                  |
| ------- | ------------------- |
| TTF/OTF | 데스크톱용, 용량 큼         |
| WOFF    | 웹 최적화 압축            |
| WOFF2   | WOFF보다 더 효율적 (30%↓) |

```css
@font-face {
  font-family: BMYEONSUNG;
  src: url("subset.woff2") format("woff2"),
       url("subset.woff") format("woff"),
       url("subset.ttf") format("truetype");
  font-display: block;
}
```
<br />

### 3.3.4 Data-URL 방식

```css
@font-face {
  font-family: BMYEONSUNG;
  src: url("data:font/woff2;charset=utf-8;base64,...") format("woff2");
}
```

* 장점: HTTP 요청 없음
* 단점: 유지보수 어려움, 캐싱 불가

<br />

## 3.4 캐시 최적화

### HTTP Cache-Control 헤더 설정

```js
const header = {
  setHeaders: (res, path) => {
    if (path.endsWith(".html")) {
      res.setHeader("Cache-Control", "no-cache");
    } else if (path.endsWith(".js") || path.endsWith(".css") || path.endsWith(".webp")) {
      res.setHeader("Cache-Control", "public, max-age=31536000");
    } else {
      res.setHeader("Cache-Control", "no-store");
    }
  },
};
```

<br />

### 캐시 전략 요약

| 리소스 유형     | 캐시 전략                      |
| ---------- | -------------------------- |
| HTML       | `no-cache` (서버 확인 필요)      |
| JS/CSS/이미지 | `public, max-age=31536000` |
| 민감 데이터     | `no-store`                 |

<br />

## 3.5 CSS 최적화

### 문제

배포 환경에서 사용하지 않는 CSS가 포함되어 Lighthouse 경고 발생

<br />

### 3.5.1 PurgeCSS

#### 설치

```bash
npm install --save-dev purgecss
```

#### 실행 예시

```bash
purgecss --css ./build/static/css/*.css \
         --output ./build/static/css/ \
         --content ./build/index.html ./build/static/js/*.js \
         --config ./purgecss.config.js
```

#### Tailwind 대응 extractor 설정

```js
module.exports = {
  defaultExtractor: (content) => content.match(/[\w\:\-]+/g) || [],
};
```

