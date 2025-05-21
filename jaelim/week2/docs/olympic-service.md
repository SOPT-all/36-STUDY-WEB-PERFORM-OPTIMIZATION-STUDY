## 올림픽 통계 서비스 최적화

## 1. CSS 애니메이션 최적화

### 브라우저 렌더링 과정

웹 페이지 렌더링은 여러 단계로 나뉘고, 이를 **Critical Rendering Path** 또는 **Pixel Pipeline**이라고 함. 주요 단계는 다음과 같음:

- **DOM + CSSOM**: HTML과 CSS를 브라우저가 이해할 수 있는 형태로 변환하여 **DOM**(Document Object Model)과 **CSSOM**(CSS Object Model) 트리 구조를 생성함.
- **렌더 트리(Render Tree)**: DOM과 CSSOM을 결합하여 화면에 표시될 요소들의 레이아웃을 계산하는 데 사용됨.
- **레이아웃(Layout)**: 각 요소의 위치와 크기를 계산하여 화면에 배치함.
- **페인트(Paint)**: 요소에 색을 채워넣는 작업임.
- **컴포지트(Composite)**: 여러 레이어로 나뉘어진 화면을 하나로 합성하는 작업임.

### 리플로우(Reflow)와 리페인트(Repaint)

- **Reflow**: 화면을 새로 그릴 때, 요소의 위치나 크기가 변경되면 DOM과 CSSOM을 재구성하고 레이아웃을 다시 계산해야 하므로 리소스를 많이 소모함.
- **Repaint**: 요소의 크기나 위치는 변경되지 않았지만, 색상이나 배경 등의 스타일 속성이 변경되면 리페인트가 발생함. 리플로우보다는 리소스를 적게 소모함.

### 해결 방법 → 하드웨어 가속(GPU 가속)

하드웨어 가속을 활용하면 CPU 대신 GPU가 그래픽 작업을 효율적으로 처리함. **transform**과 **opacity** 속성은 GPU 가속을 활용할 수 있는 CSS 속성임. 이 속성들을 사용하면 **reflow**나 **repaint**를 피할 수 있음.

### ex: 막대 그래프 개선

기존 코드에서 애니메이션은 `width` 속성을 이용해 진행됨. 하지만 `width` 속성을 변경하면 리플로우가 발생하고, 이로 인해 성능 저하와 **jank**(끊김 현상)가 발생할 수 있음.

**기존 코드 (리플로우 유발)**

```css

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

**개선 코드 (GPU 가속 적용)**

```css

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

이 코드에서는 `transform` 속성을 사용해 `scaleX`를 적용하여 **GPU 가속**을 활용해 성능을 향상시킬 수 있음.

## 2. 컴포넌트 지연 로딩

### 문제점

기존에 **비동기 로딩**으로 인해 사용자가 요청한 시점에 컴포넌트를 로드하느라 지연이 발생할 수 있음. 예를 들어, **모달 창**이 필요할 때까지 해당 컴포넌트를 미리 로드하지 않으면 사용자가 모달을 열 때 약간의 지연이 생길 수 있음.

### 해결 방법 → 지연 로딩 (Lazy Loading)

React에서는 `lazy()`와 `Suspense`를 사용하여 컴포넌트를 지연 로딩할 수 있음. 예를 들어, **ImageModal**을 처음에 로드하지 않고, 사용자가 해당 컴포넌트를 요청할 때 로드하도록 설정할 수 있음.

```jsx
const LazyImageModal = lazy(() => import("./components/ImageModal"));

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="App">
      <Suspense fallback={null}>
        {showModal ? (
          <LazyImageModal
            closeModal={() => {
              setShowModal(false);
            }}
          />
        ) : null}
      </Suspense>
    </div>
  );
}
```

`Suspense`는 `fallback`을 설정하여 로딩 중에 표시할 내용이나 UI를 설정할 수 있음.

### 분석 도구: Webpack Bundle Analyzer

컴포넌트를 지연 로딩하려면 번들 파일을 분석하여, 초기 번들에 포함될 필요 없는 컴포넌트들을 찾아내는 것이 중요함. `cr-bundle-analyzer`를 설치하여 이를 분석할 수 있음.

```bash

npm install --save-dev cra-bundle-analyzer
npx cra-bundle-analyze

```

이를 통해 초기 번들에서 불필요한 컴포넌트를 제거하여 성능을 개선할 수 있음.

## 3. 컴포넌트 사전 로딩 (Preloading)

### 해결 방법 → 사전 로딩

사전 로딩은 사용자가 실제로 인터랙션을 하기 전에 미리 필요한 모듈을 로드하는 기법임. 이 방식은 **지연 로딩**의 단점을 보완할 수 있음. 예를 들어, **모달**이 필요한 시점에 미리 로드하는 방법을 생각해 볼 수 있음.

**예시 1: hover 이벤트로 사전 로딩**

```jsx

const handleMouseEnter = () => {
  import("./components/ImageModal").catch();
};

<ButtonModal onMouseEnter={handleMouseEnter} ... />

```

**예시 2: useEffect를 활용한 사전 로딩**

```jsx
useEffect(() => {
  import("./components/ImageModal").catch();
}, []);
```

`useEffect`를 활용하여 페이지가 로드된 후 즉시 컴포넌트를 로드할 수 있으며, **캐시된 모듈은 재요청 없이 재사용**됨.

## 4. 이미지 사전 로딩

### 이미지 로딩 방식

이미지 파일은 `img` 태그로 DOM에 추가되기 전까지 로딩되지 않으므로, 이를 미리 로드하려면 **JavaScript**를 사용하여 객체를 생성하고 `src` 속성을 설정해야 함.

```jsx
useEffect(() => {
  const img = new Image();
  img.src =
    "https://stillmed.olympic.org/media/Photos/2016/08/20/part-1/20-08-2016-Football-Men-01.jpg";
}, []);
```

### 서버에서 이미지 URL을 받아오는 경우

서버에서 이미지를 로드하는 경우, API 요청 후 응답을 받아 이미지 로딩을 수행해야 함. 이때 **네트워크 요청**이 2번 발생할 수 있음을 고려해야 함. API 요청 시간을 고려하여 적절한 타이밍에 이미지를 로드하는 것이 중요함.

### 즉!

- **애니메이션 성능 향상할때는** **transform**과 **opacity**를 활용하여 **GPU 가속**을 사용하고, **reflow**를 피하기
- **컴포넌트 지연 로딩**과 **사전 로딩**을 통해 초기 로딩 속도를 개선하고, **이미지 사전 로딩**을 활용하여 더 빠른 사용자 경험을 제공 ㄱㄴ
- 최적화된 방법을 통해 **첫 화면의 빠른 로딩**과 **인터랙션 시 지연 최소화**를 구현 ㄱㄴ
