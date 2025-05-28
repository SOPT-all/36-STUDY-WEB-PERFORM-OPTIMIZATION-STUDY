# 동영상 & 폰트 최적화

## 동영상 최적화

### 1. 동영상 압축

* **화질 낮추기**: 가로, 세로 사이즈를 줄여 화질을 낮추고 용량도 줄임
* **압축 방식 변경**: 전용 툴 사용
> 추천 툴: [Media.io](https://www.media.io)

### 2. `<video>` 태그 활용 (호환성 고려)

```tsx
<video
  src={video}
  className="absolute translateX--1/2 h-screen max-w-none min-w-screen -z-1 bg-black min-w-full min-h-screen"
  autoPlay
  loop
  muted
/>
```

* 확장자: `WebM`
* 비트레이트: `512Kbps`
* 오디오: 체크 해제

### 3. 스트리밍 방식

* 동영상은 처음부터 끝까지 한 번에 다운로드되지 않음
* 앞부분부터 다운로드하며 순차적으로 로드됨

### 4. 화질 보완 방법

* **패턴 이미지 활용**
* **패턴 + Blur 필터 적용**

  ```css
  filter: blur(10px);
  ```

<br />

## 폰트 최적화

### 문제: 텍스트 깜빡임 & 레이아웃 변경

* 폰트가 로드되기 전 기본 폰트로 텍스트가 먼저 표시되거나, 아예 표시되지 않는 현상
* 사용자 경험 저하: **FOUT / FOIT**

| 용어                             | 설명                                 |
| ------------------------------ | ---------------------------------- |
| FOUT (Flash of Unstyled Text)  | 기본 폰트 → 폰트 다운로드 후 스타일 적용 (Edge 등)  |
| FOIT (Flash of Invisible Text) | 텍스트를 숨긴 채 폰트 로딩 (Chrome, Safari 등) |

### 1. `font-display` 속성 제어

```css
@font-face {
  font-family: BMYEONSUNG;
  src: url("./assets/fonts/BMYEONSUNG.woff2") format("woff2"),
       url("./assets/fonts/BMYEONSUNG.woff") format("woff"),
       url("./assets/fonts/BMYEONSUNG.ttf") format("truetype");
  font-display: block;
}
```

| 값        | 설명                        |
| -------- | ------------------------- |
| auto     | 브라우저 기본값                  |
| block    | FOIT (3초 대기)              |
| swap     | FOUT                      |
| fallback | FOIT (0.1초 대기 후 기본 폰트 유지) |
| optional | fallback과 유사, 캐싱 우선       |

#### fade-in 애니메이션 적용 예시 (FOIT 개선용)

```tsx
npm install --save fontfaceobserver
```

```tsx
const font = new FontFaceObserver("BMYEONSUNG");

useEffect(() => {
  font.load(null, 20000).then(() => {
    setIsFontLoaded(true);
  });
}, []);
```

```tsx
<div
  style={{
    opacity: isFontLoaded ? 1 : 0,
    transition: "opacity 0.3s ease",
  }}
>
  중요한 텍스트
</div>
```

<br />

### 2. 폰트 사이즈 줄이기

* **압축률 높은 포맷 사용**: EOT > TTF/OTF > WOFF > WOFF2
* **필요한 문자만 포함된 서브셋 사용**

  * 서브셋 제작 툴: [Transfonter](https://transfonter.org/)

### 3. Data-URI 방식

* 폰트를 문자열로 변환 후 CSS 파일 내 인라인 삽입
* 별도 네트워크 요청 없이 CSS와 함께 로드됨
* 단점: CSS 파일 자체의 용량 증가

<br />

## 캐시 최적화

### 캐시의 개념

* 자주 사용하는 데이터를 임시로 저장하여 빠르게 재사용

### 캐시의 종류

| 종류           | 설명                 |
| ------------ | ------------------ |
| Memory Cache | RAM에 저장, 가장 빠름     |
| Disk Cache   | 디스크에 저장, 지속적 사용 가능 |

> 브라우저가 자동으로 선택함 (개발자가 명시적으로 지정 불가)

### Cache-Control 헤더

| 속성       | 설명                 |
| -------- | ------------------ |
| no-cache | 서버 확인 후 사용         |
| no-store | 캐시 저장하지 않음         |
| public   | 모든 환경에서 캐시 허용      |
| private  | 브라우저 내에서만 캐시       |
| max-age  | 캐시 유효 시간 지정 (초 단위) |

**304 Not Modified**: 리소스가 변경되지 않아 재다운로드 불필요

### 유효 시간 설정 권장

| 리소스     | 캐시 권장 설정                     |
| ------- | ---------------------------- |
| HTML    | `no-cache`                   |
| CSS, JS | `max-age` 길게 설정 (변경 시 캐시 무시) |

<br />

## 불필요한 CSS 제거

### 도구 및 방법

* **Lighthouse**: "Reduce unused CSS" 항목 확인
* **Coverage 패널**: 사용되지 않는 CSS 코드 확인
* **PurgeCSS**: 실제 사용된 CSS만 남기고 제거


[실습 코드](https://github.com/performance-lecture/lecture-3.git)
