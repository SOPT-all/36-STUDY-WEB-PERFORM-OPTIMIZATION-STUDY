# 올림픽 통계 서비스 최적화

## 목차

1. CSS 애니메이션 최적화
2. 컴포넌트 지연 로딩
3. 컴포넌트 사전 로딩
4. 이미지 사전 로딩

> 참고 툴

* Network 패널
* Performance 패널
* Webpack Bundle Analyzer
* [실습 코드 보기](https://github.com/performance-lecture/lecture-2)


## 1. CSS 애니메이션 최적화

### 브라우저 렌더링 과정

```
DOM + CSSOM → Render Tree → Layout → Paint → Composite
```

* **리플로우(Reflow)**: 전체 렌더링 경로를 다시 실행 → 리소스 소모 많음
* **리페인트(Repaint)**: CSSOM만 새로 생성, Layout은 다시 하지 않음 → 비교적 효율적

<br />

## 2. 하드웨어 가속 (GPU 가속)

### 개념

* **하드웨어 가속**: 작업 일부를 CPU 대신 GPU에 위임하여 성능 향상
* CSS 속성 중 `transform`, `opacity`는 GPU 가속 대상
* 렌더 트리 생성, 레이아웃, 페인트 단계를 건너뛸 수 있음

<br />

### 예시) 막대 그래프 개선

#### 기존 코드 (리플로우 유발)

```tsx
const BarGraph = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: ${({ width }) => width}%;
  transition: width 1.5s ease;
  height: 100%;
  background: ${({ isSelected }) =>
    isSelected ? "rgba(126, 198, 81, 0.7)" : "rgb(198, 198, 198)"};
  z-index: 1;
`;
```

#### 개선 코드 (GPU 가속 적용)

```tsx
const BarGraph = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transform: scaleX(${({ width }) => width / 100});
  transform-origin: center left;
  transition: transform 1.5s ease;
  height: 100%;
  background: ${({ isSelected }) =>
    isSelected ? "rgba(126, 198, 81, 0.7)" : "rgb(198, 198, 198)"};
  z-index: 1;
`;
```

### transform은 만능인가?

* **장점**: 애니메이션 성능 향상
* **주의**: 레이아웃에 영향을 주지 않으므로, 정적 요소에는 불필요할 수 있음
* 애니메이션에만 **선택적으로 적용**

<br />

## 3. 컴포넌트 지연 로딩

### 문제점

* 사용자가 요청한 시점에 **비동기 로딩** → **지연 발생**
* 모달창 예시에서 `ImageModal` 컴포넌트를 `lazy()`로 분리

```tsx
const LazyImageModal = lazy(() => import("./components/ImageModal"));
```

### 분석 도구

```bash
npm install --save-dev cra-bundle-analyzer
npx cra-bundle-analyzer
```

* 불필요한 컴포넌트가 초기 번들에 포함되어 있는지 확인 가능

<br />

## 4. 컴포넌트 사전 로딩

### 해결 방법: **사전 로딩**

* **사용자 인터랙션 직전** (ex. hover)
* **초기 마운트 이후** (useEffect)

```tsx
const handleMouseEnter = () => {
  import("./components/ImageModal").catch();
};

<ButtonModal onMouseEnter={handleMouseEnter} ... />
```

```tsx
useEffect(() => {
  import("./components/ImageModal").catch();
}, []);
```

> 이미 캐시된 모듈은 재요청 없이 재사용됨!

<br />

## 5. 이미지 사전 로딩

### 이미지 로딩 방식

* `import`만으로는 이미지가 **사전 로딩되지 않음**
* `<img src="">` 로 DOM에 나타나야 로딩됨

### 사전 로딩 코드 예시

```tsx
useEffect(() => {
  const img = new Image();
  img.src = "https://stillmed.olympic.org/media/Photos/2016/08/20/part-1/20-08-2016-Football-Men-01.jpg";
}, []);
```

### 서버에서 이미지 URL을 받아오는 경우?

- 먼저 API 요청 → URL 응답 수신 → 이미지 사전 로딩 수행 가능
- 단, **API 응답 시간 + 이미지 로딩 시간** 고려해야 함
- 네트워크 요청이 2번 발생할 수 있음

<br />

## 정리

- `transform`, `opacity`는 GPU 가속을 활용해 애니메이션 성능을 향상시킴
- 초기 번들 크기 줄이려면 **지연 로딩** + **사전 로딩**을 전략적으로 활용
- 이미지는 JS로 객체 생성 후 `src` 할당을 통해 사전 로딩 가능

