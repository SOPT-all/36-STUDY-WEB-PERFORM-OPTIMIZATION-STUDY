# 이미지 갤러리 서비스 성능 최적화
## 1. 개요
이번 실습에서 다룰 서비스는 다양한 주제의 이미지를 격자 형태로 보여주는 이미지 갤러리이며,
사용자는 헤더의 카테고리 버튼(Random, Animals, Food, Fashion, Travel)을 클릭하여 원하는 주제의 이미지만 필터링하여 볼 수 있습니다.

또한 특정 이미지를 클릭하면 해당 이미지가 확대되어 화면 중앙에 표시되며, 이때 배경색은 클릭된 이미지의 주요 색상과 유사하게 동적으로 변경됩니다.

### 1.1. 성능 문제점 및 최적화 목표
* **느린 초기 로딩**
	* 페이지 첫 로딩 시 모든 이미지를 한 번에 불러오려 하여 초기 화면 표시가 지연됩니다.
* **레이아웃 이동 (Layout Shift)**
	* 이미지 로딩 과정에서 이미지 크기에 따라 다른 요소들의 위치가 갑자기 변경되는 현상이 발생하여 사용자 경험을 해칩니다.
* **배경색 변경 지연**
	* 이미지 클릭 시 배경색이 이미지의 평균 색상으로 변경되는 기능이 있으나, 이 과정이 오래 걸려 사용자가 변화를 즉각적으로 인지하기 어렵습니다.
* **불필요한 리렌더링**
	* 특정 동작(예를 들어 모달 창 열기)와 관계없는 컴포넌트들까지 다시 렌더링되어 시스템 리소스를 낭비합니다.

본 실습의 목표는 이러한 문제점들을 해결하여 서비스의 전반적인 성능과 사용자 경험을 향상시키는 것입니다.

### 1.2. 사용할 최적화 기법
* **이미지 지연 로딩 (Image Lazy Loading)**
	* 화면에 실제로 보여질 필요가 있는 이미지만 로드하여 초기 로딩 속도를 개선합니다.
	* 3장에서는 Intersection Observer API를 이용했다면 이번에는 npm에 있는 이미지 지연 로딩 라이브러리를 이용하여 이미지 지연 로딩을 구현합니다.
* **레이아웃 이동 방지 (Avoiding Layout Shifts)**
	* 이미지 로딩 전후로 발생하는 레이아웃 변경을 최소화하여 시각적 안정성을 확보합니다.
* **리덕스 렌더링 최적화 (Redux Rendering Optimization)**
	* Redux 상태 관리 시 발생하는 불필요한 컴포넌트 리렌더링을 방지합니다.
* **병목 코드 최적화 (Optimizing Bottleneck Code)**
	* 성능 저하의 주범이 되는 특정 코드 구간을 찾아 로직 개선 및 메모이제이션 기법을 적용합니다.

## 2. 실습 준비 및 분석 도구

### 2.1. 서비스 코드 다운로드 및 실행

* Git 저장소에서 코드를 복제
```bash
$ git clone https://github.com/performance-lecture/Lecture-4.git
```
* 의존성 모듈 설치
```bash
$ npm install
```
* 서비스 실행
```bash
$ npm run start
```
* 이미지 데이터 제공을 위한 API 서버를 실행(이미지 정보는 `db.json` 파일에 저장)
```bash
$ npm run server
```

### 2.2. 분석 도구 소개

* **기존 도구**
    * **Chrome Network 패널**
	    * 네트워크 요청 상태, 리소스 로딩 시간 등을 확인
    * **Chrome Performance 패널**
	    * 코드 실행 과정, CPU 사용량, 렌더링 병목 등을 분석
    * **Lighthouse 패널**
	    * 웹 페이지의 전반적인 품질(성능, 접근성 등)을 측정
	    * 특히 CLS(Cumulative Layout Shift) 지표 확인 유용
* **React Developer Tools (Profiler)**
    * **설치**
	    * Chrome 웹 스토어에서 "React Developer Tools" 확장 프로그램을 설치합니다. 
	    * 설치 후에는 개발자 도구에 "Components"와 "Profiler" 탭이 추가됩니다.
    * **Components 패널**
	    * React 컴포넌트 계층 구조를 보여주며, 각 컴포넌트의 props, state 등을 확인할 수 있습니다. 
	    * 설정에서 "Highlight updates when components render." 옵션을 활성화하면 리렌더링되는 컴포넌트를 시각적으로 파악할 수 있습니다.
    * **Profiler 패널**
	    * React 애플리케이션의 렌더링 성능을 분석합니다. 
	    * 어떤 컴포넌트가 몇 번 렌더링되었는지, 렌더링에 소요된 시간 등을 플레임 차트 형태로 제공하여 성능 병목 지점을 찾는 데 도움을 줍니다.
		    - **플레임 그래프란?**
			    * **성능 프로파일링 데이터를 시각화하는 도구**
				    * 주로 소프트웨어의 성능 병목지점을 찾고 분석하는 데 사용됩니다.
					    * 세로축은 호출 스택의 깊이
					    * 가로축은 샘플링된 시간의 비율
					    * 각 블록의 너비가 해당 함수가 CPU를 사용한 시간에 비례
					    * 보통 "뜨거운" 색상(빨간색, 주황색)일수록 더 많은 CPU 시간을 소비
			* React Developer Tools에서의 Flame Chart는
				* **컴포넌트 렌더링 시간**을 측정하고 시각화
				- React 컴포넌트 트리 구조를 그대로 반영
				- 각 컴포넌트의 렌더링 소요 시간을 블록의 너비로 표시
			- 하며, 다음을 중점적으로 분석합니다.
				- props/state 변경이 미치는 영향 범위
				- Virtual DOM 작업 시간
				- 컴포넌트별 렌더링 성능

## 3. 이미지 갤러리 성능 최적화
### 3.1. 레이아웃 이동 (Layout Shift) 최적화

#### 3.1.1. 이미지 로딩으로 인한 화면 밀림
레이아웃 이동은 웹 페이지의 요소가 동적으로 변경되면서 화면 레이아웃이 예기치 않게 변하는 현상입니다. 

이미지 갤러리 서비스에서는 이미지가 로드되면서 해당 이미지의 공간이 확보될 때, 이미 로드되었거나 아직 로드 중인 다른 이미지들의 위치를 밀어내는 현상이 관찰됩니다. 

이는 사용자에게 불편함을 주고, 의도치 않은 클릭을 유발할 수 있습니다.

#### 3.1.2. 진단
* **Lighthouse**
	* CLS(Cumulative Layout Shift) 점수를 통해 정량적으로 측정
	* 실제 측정 시 초기 서비스의 CLS 점수는 0.391로, 권장 기준인 0.1 이하에 비해 매우 높은 수치입니다.
* **Performance 패널**
	* "Experience" 섹션에서 "Layout Shift" 이벤트를 통해 레이아웃 이동 발생 시점과 원인 요소를 시각적으로 확인 가능합니다.

#### 3.1.3. 원인 분석
레이아웃 이동에는 아래와 같이 다양한 원인이 있는데, 우리의 실습 서비스에서는 첫 번째 원인 때문이었습니다.

* **사이즈가 미리 정의되지 않은 이미지 요소**
	* 브라우저는 이미지를 다운로드하기 전까지는 실제 크기를 알 수 없습니다.
	* 따라서 해당 공간을 미리 확보하지 못합니다. 
	* 결과적으로 이미지가 로드된 후에 실제 크기만큼 공간을 차지하면서 주변 요소들을 밀어냅니다.
* 사이즈가 미리 정의되지 않은 광고 요소
* 동적으로 삽입된 콘텐츠
* 웹 폰트 로딩 (FOIT/FOUT)

#### 3.1.4. 해결
이미지 로딩 전에 해당 공간의 크기를 미리 지정해주면 레이아웃 이동을 방지할 수 있습니다. 

이미지 갤러리의 이미지는 브라우저 너비에 따라 크기가 변하므로, 고정된 픽셀 크기 대신 이미지의 가로세로 비율(예: 16:9)을 유지하도록 공간을 할당합니다.

* **방법 1: `padding-top`을 이용한 방식 =  전통적**
    1. 부모 요소에 `width`를 설정 
    2. `padding-top`에 비율에 따른 퍼센트 값 (예: 16:9 비율일 경우 `(9/16)*100% = 56.25%`)을 설정
    3. 자식 이미지 요소는 `position: absolute`와 `width: 100%`, `height: 100%`로 설정하여 부모 요소에 채워지도록 설정

    ```css
    .image-wrapper {
      position: relative;
      width: 160px; /* 예시 너비 */
      padding-top: 56.25%; /* 16:9 비율 */
    }

    .image-wrapper img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover; /* 이미지가 비율을 유지하며 채워지도록 */
    }
    ```

* **방법 2: `aspect-ratio` CSS 속성 = 최신 방식**
    - `aspect-ratio` 속성에 원하는 비율 값(예: `16 / 9`)을 직접 명시하여 간편하게 비율 유지 가능
	    - 단, 구형 브라우저 호환성 문제가 있을 수 있으므로, 사용 전 지원 범위를 확인해야 합니다.

    ```css
    .image-container {
      aspect-ratio: 16 / 9;
    }

    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    ```

#### 3.1.5. 적용 및 결과 (`PhotoItem` 컴포넌트)
본 실습에서는 `padding-top` 방식을 사용했습니다. 

`PhotoItem` 컴포넌트의 `styled-components` 코드를 수정하여 이미지 컨테이너에 스타일을 적용합니다.

```javascript
// PhotoItem.style.js (수정 예시)
// li 요소 스타일
export const Item = styled.li`
  position: relative;
  width: 100%; // 또는 그리드 시스템에 따른 너비
  padding-top: 56.25%; // 16:9 비율 (이미지 비율에 맞게 조정)

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
```

* **Lighthouse**
	* CLS 점수가 0으로 개선 
	* 레이아웃 이동이 발생하지 않음을 의미합니다.
* **Performance 패널**
	* 이미지 로딩 시점에서 발생하던 "Layout Shift" 이벤트가 사라진 것을 확인할 수 있습니다. 

---
### 3.2. 이미지 지연 로딩 (Lazy Loading) 적용

#### 3.2.1. 효과

이미지 지연 로딩은 웹 페이지의 초기 로딩 속도를 개선하는 중요한 최적화 기법입니다. 

사용자가 실제로 보고 있는 화면 영역(viewport)에 이미지가 나타나기 직전에 해당 이미지를 로드하고, 화면 밖에 있는 이미지는 로딩을 지연시킵니다. 

이를 통해 불필요한 데이터 전송을 줄이고 초기 렌더링 시간을 단축할 수 있습니다.

#### 3.2.2. 라이브러리 활용: `react-lazyload`

이전 실습(3장)에서는 `Intersection Observer API`를 직접 사용하여 이미지 지연 로딩을 구현했지만, 이번에는 `react-lazyload` 라이브러리를 사용하여 보다 간편하게 적용합니다.

* **설치**
    ```bash
    $ npm install react-lazyload
    ```

* **사용법**
	* 지연 로딩을 적용하고자 하는 컴포넌트(또는 이미지 태그)를 `LazyLoad` 컴포넌트로 감싸줍니다.

    ```javascript
    import LazyLoad from 'react-lazyload';

    // ...
    <LazyLoad>
      <img src={imageUrl} alt="description" />
    </LazyLoad>
    ```
    - `LazyLoad`로 감싼 요소는 화면에 보이기 전까지 렌더링되지 않다가, 스크롤을 통해 화면에 진입하는 순간 로드됩니다. 
    - 이미지뿐만 아니라 일반 컴포넌트에도 적용 가능합니다.

#### 3.2.3. 적용 (`PhotoItem` 컴포넌트)

이미지를 포함하고 있는 `PhotoItem` 컴포넌트에 지연 로딩을 적용합니다.

```javascript
// PhotoListContainer.js 또는 PhotoItem을 사용하는 부모 컴포넌트
import LazyLoad from 'react-lazyload';
import PhotoItem from '../components/PhotoItem'; // PhotoItem 경로에 맞게 수정

// ...
{photos.map(photo => (
  <LazyLoad key={photo.id} height={200} /* placeholder 높이, 실제 이미지 높이와 유사하게 */ once>
    <PhotoItem photo={photo} />
  </LazyLoad>
))}
// ...
```

#### 3.2.4. `offset` 옵션으로 사용자 경험 향상

이미지가 화면에 나타나는 순간 로드되면 사용자는 잠시 빈 공간을 보거나 로딩 과정을 목격하게 됩니다. 

이를 개선하기 위해 `offset` 옵션을 사용하여 이미지가 화면에 나타나기 일정 픽셀(px) 이전에 미리 로드하도록 설정할 수 있습니다.

```javascript
// ...
<LazyLoad key={photo.id} height={200} offset={1000} once>
  <PhotoItem photo={photo} />
</LazyLoad>
// ...
```
- 이미지가 뷰포트로부터 1000px 아래에 있을 때 미리 로드를 시작하도록 설정

#### 3.2.5. 적용 및 결과
* **Network 패널**
	* 페이지 초기 로딩 시 모든 이미지가 한 번에 로드되지 않고, 스크롤 시점에 맞춰 순차적으로 로드되는 것을 확인할 수 있습니다.
* **사용자 경험**
	* `offset` 값을 적절히 설정하면, 스크롤 시 이미지가 끊김 없이 미리 준비되어 부드럽게 표시됩니다.

---
### 3.3. 리덕스 (Redux) 렌더링 최적화

#### 3.3.1. 불필요한 컴포넌트 리렌더링
React 애플리케이션에서 상태 변경은 연관된 컴포넌트의 리렌더링을 유발합니다. 

하지만 때로는 상태 변경과 직접적인 관련이 없는 컴포넌트까지 불필요하게 리렌더링되어 성능 저하의 원인이 될 수 있습니다. 

이미지 갤러리 서비스에서는 이미지 모달을 띄우거나 닫을 때, 모달과 무관한 헤더나 이미지 리스트 컴포넌트까지 리렌더링되는 현상이 발견됩니다.

#### 3.3.2. 현상 진단 (React Developer Tools)
* React Developer Tools의 "Components" 패널 설정에서 "Highlight updates when components render." 옵션을 활성화
	* 이미지 클릭하여 모달을 띄우거나 닫는 등의 액션을 취했을 때, 화면에 나타나는 테두리를 통해 어떤 컴포넌트가 리렌더링되는지 시각적으로 확인합니다.
	* 모달을 띄우는 순간, 모달 이미지가 로드된 후 배경색이 바뀌는 순간, 모달을 닫는 순간 등 총 세 번의 주요 시점에서 불필요한 리렌더링이 관찰됩니다.

#### 3.3.3. 원인 분석
- **`useSelector`의 동작 방식과 참조 동등성**
	- 리덕스 상태를 구독하는 컴포넌트는 `useSelector` 훅을 통해 상태 값을 가져옵니다. 
	- `useSelector`는 리덕스 상태가 변경될 때마다 인자로 전달된 선택자 함수(selector function)를 실행하고, 이전 반환 값과 현재 반환 값을 비교하여 리렌더링 여부를 결정합니다.

문제는 선택자 함수가 **객체나 배열을 반환할 때** 발생합니다. 

JavaScript에서 객체나 배열은 참조 타입이므로, 내부 값이 동일하더라도 함수가 호출될 때마다 새로운 참조 값을 가진 객체/배열이 생성되어 반환됩니다.

`useSelector`는 기본적으로 참조 동등성(strict equality, `===`) 비교를 사용하므로, 반환된 객체/배열의 참조가 이전과 다르면 해당 컴포넌트는 불필요하게 리렌더링됩니다.

예를 들어, `PhotoListContainer`의 `useSelector` 코드가 다음과 같다면:

```javascript
const { photos, loading } = useSelector(state => ({
  photos: state.photos.items,
  loading: state.photos.loading
}));
```
매번 새로운 `{ photos: ..., loading: ... }` 객체가 생성되어 반환되므로, `photos`나 `loading` 상태와 관련 없는 다른 리덕스 상태(예: 모달 상태) 변경 시에도 `PhotoListContainer`가 리렌더링됩니다.

#### 3.3.4. 해결
* **방법 1: `useSelector` 반환 값 분리**
    - 객체나 배열 대신 개별 원시 값을 반환하도록 `useSelector`를 여러 번 호출합니다. 
	    - 원시 값은 값으로 비교되므로 불필요한 리렌더링을 방지할 수 있습니다.

    ```javascript
    // ImageModalContainer 수정 예시
    const modalVisible = useSelector(state => state.imageModal.modalVisible);
    const bgColor = useSelector(state => state.imageModal.bgColor);
    const src = useSelector(state => state.imageModal.src);
    const alt = useSelector(state => state.imageModal.alt);

    // Header 수정 예시 (이미 단일 값을 반환하고 있지만, 객체로 감싸지 않도록)
    const category = useSelector(state => state.category.category);
    ```

* **방법 2: `shallowEqual` Equality Function 사용**
    - `useSelector`의 두 번째 인자로 비교 함수(equality function)를 전달하여 리렌더링 조건을 커스터마이징할 수 있습니다. 
		- `react-redux`에서 제공하는 `shallowEqual` 함수를 사용하면 객체의 1단계 깊이까지 값을 비교하여 리렌더링 여부를 결정합니다.

    ```javascript
    import { useSelector, shallowEqual } from 'react-redux';

    // ImageModalContainer 수정 예시
    const { modalVisible, bgColor, src, alt } = useSelector(state => ({
      modalVisible: state.imageModal.modalVisible,
      bgColor: state.imageModal.bgColor,
      src: state.imageModal.src,
      alt: state.imageModal.alt,
    }), shallowEqual);
    ```

* **배열 반환 시 주의사항 (`filter` 등)**
    - `filter`, `map`과 같이 항상 새로운 배열을 반환하는 메서드를 `useSelector` 내부에서 사용하면 `shallowEqual`로도 최적화가 어렵습니다. 
	    - 이 경우, 필요한 원본 데이터와 필터링 조건을 각각 `useSelector`로 가져온 후, 컴포넌트 내부 또는 `useMemo` 등을 사용하여 필터링된 배열을 생성해야 합니다.

    ```javascript
    // PhotoListContainer 수정 예시 (filter 로직 분리)
    const photosData = useSelector(state => state.photos.data, shallowEqual); // 혹은 개별 photos.data
    const currentCategory = useSelector(state => state.category.category);

    const filteredPhotos = useMemo(() => {
      if (currentCategory === 'all') {
        return photosData;
      }
      return photosData.filter(photo => photo.category === currentCategory);
    }, [photosData, currentCategory]);
    ```

#### 3.3.5. 적용 및 결과
`useSelector`를 사용하는 컴포넌트들에 위 해결 방안들을 적절히 적용합니다. 

- **적용 지점**
	- ImageModalContainer.js
		- `useSelector` 반환 값 분리
			- 기존의 객체 반환 `useSelector(state => ({ ... }))`에서 
			- 개별 원시 값 반환 `useSelector(state => state.imageModal.modalVisible)` 4개로 분리하는 개선 사항 적용
	- Header.js
		- `useSelector` 반환 값 분리
			- 기존의 객체 반환 `useSelector(state => ({ category: ... }))`에서
			- 단일 원시 값 반환 `useSelector(state => state.category.category)`으로 개선
	- PhotoListContainer.js
		- `shallowEqual` 사용 + 필터링 로직 분리
			- `shallowEqual` import 추가
			- `useMemo` import 추가
			- `useSelector`에 `shallowEqual` 비교 함수 적용
			- `filter` 로직을 `useMemo`로 분리하여 메모이제이션

- **적용 결과**
	- 불필요한 리렌더링 제거
		- 모달 상태 변경 시 `Header`, `PhotoListContainer`까지 리렌더링되는 문제를 해결하고 각 컴포넌트가 관련 없는 상태 변경에는 리렌더링되지 않습니다.
		- React Developer Tools에서 관찰되던 불필요한 테두리 표시가 더 이상 나오지 않습니다.
	- 참조 동등성 문제 해결
		- 객체/배열 반환으로 인한 매번 새로운 참조가 생성되었는데, 이젠 원시 값 반환 또는 `shallowEqual`로 1단계 깊이 비교를 합니다.
		- 결과적으로 실제 값이 변경될 때만 리렌더링이 발생합니다.
	- 필터링 성능 최적화
		- 매번 `filter` 연산으로 새로운 배열을 생성하는 문제가 있었는데 `useMemo`로 메모이제이션하여 의존성 변경 시에만 재계산 되도록 변경되었습니다.
		- 결과적으로 불필요한 필터링 연산이 제거되었습니다.

수정 후 React Developer Tools의 "Highlight updates" 기능을 통해 모달을 띄우거나 카테고리를 변경할 때, 관련 없는 컴포넌트들의 불필요한 리렌더링이 현저히 줄어들거나 사라진 것을 확인할 수 있습니다.

최적화 전에는 무관한 컴포넌트들도 함께 리렌더링되었지만, 최적화 후에는 해당 상태와 직접 관련된 컴포넌트만 리렌더링됩니다.

---
### 3.4. 병목 코드 최적화 (`getAverageColorOfImage` 함수)

#### 3.4.1. 이미지 모달 배경색 계산 지연

이미지를 클릭하여 모달을 띄울 때, 배경색이 해당 이미지의 평균 색상으로 변경되는 기능이 있습니다. 

이 배경색 계산을 담당하는 `getAverageColorOfImage` 함수의 실행 시간이 길어, 사용자는 이미지 모달이 뜬 후 한참 뒤에야 배경색이 변경되는 것을 경험하게 됩니다.

#### 3.4.2. 진단 (Performance 패널)
* Performance 패널에서 "기록" 버튼을 누른 후, 이미지를 클릭하여 모달을 띄우는 과정을 기록합니다.
	* 기록 결과에서 `getAverageColorOfImage` 함수의 실행 구간을 찾아보면, 이 함수가 상당한 시간을 소요하며 전체 프로세스를 지연시키는 병목 지점임을 확인할 수 있습니다. 
	* 특히 "Image Decode" 작업과 연관되어 이미지 처리 부담이 큰 것을 알 수 있습니다.

#### 3.4.3. 분석
`getAverageColorOfImage` 함수는 다음과 같은 이유로 느리게 동작합니다.

1.  **큰 원본 이미지 사용**
	- 모달에 표시되는 고해상도 원본 이미지를 `canvas`에 직접 그려 픽셀 정보를 추출합니다. 
	- 이미지 크기가 클수록 처리해야 할 픽셀 수가 많아져 연산량이 증가합니다.
2.  **모든 픽셀 순회**
	- 이미지의 모든 픽셀 데이터를 가져와 각 픽셀의 RGB 값을 더한 후 평균을 계산하는 방식은 픽셀 수가 많을수록 비효율적입니다.

#### 3.4.4. 해결

* **방법 1: 메모이제이션 (Memoization) 적용**
    * **개념**
	    * 메모이제이션은 함수의 실행 결과를 캐싱(caching)해두었다가, 동일한 입력 값으로 함수가 다시 호출될 때 실제 연산을 수행하지 않고 캐시된 결과를 즉시 반환하는 최적화 기법입니다.
    * **적용**
	    * `getAverageColorOfImage` 함수에 메모이제이션을 적용합니다. 
	    * 이때, 함수의 인자가 이미지 객체(또는 이미지 URL)이므로, 이미지의 고유 식별자(예: `src` URL)를 캐시의 키(key)로 사용합니다.

        ```javascript
        // utils/getAverageColorOfImage.js (메모이제이션 적용 예시)
        const colorCache = new Map();

        export const getAverageColorOfImage = (imgElement) => {
          const imgSrc = imgElement.src;
          if (colorCache.has(imgSrc)) {
            return colorCache.get(imgSrc);
          }

          // ... (기존 색상 계산 로직) ...
          // const rgb = { r: ..., g: ..., b: ... };
          // const resultColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;

          // colorCache.set(imgSrc, resultColor);
          // return resultColor;
        };
        ```
    * **효과**
	    * 동일한 이미지를 여러 번 클릭하여 모달을 띄울 경우, 두 번째부터는 배경색이 매우 빠르게 적용됩니다.
    * **단점**
        * **첫 실행은 여전히 느림**
	        * 처음 호출될 때는 캐시된 결과가 없으므로 기존과 동일한 시간이 소요됩니다.
        * **재활용성**
	        * 항상 새로운 이미지가 로드되는 경우(예: 매번 다른 이미지) 메모이제이션의 효과가 없으며, 오히려 캐시를 위한 메모리만 소비하게 됩니다. 
	        * 따라서 동일한 조건에서 반복 실행될 가능성이 높은 함수에 적용하는 것이 좋습니다.

* **방법 2: 함수 로직 개선 - 섬네일 이미지 활용 및 계산 시점 변경**
    * **아이디어**
	    * 배경색 계산에 반드시 고해상도 원본 이미지가 필요한 것은 아닙니다. 
	    * 저해상도의 섬네일 이미지로도 충분히 유사한 평균 색상을 추출할 수 있으며, 이는 계산량을 대폭 줄여줍니다.
    * **변경 사항**
        1.  **섬네일 이미지 사용**
	        - `photos` API는 원본 이미지와 함께 섬네일 이미지를 제공합니다. 
		        - 배경색 계산 시 이 섬네일 이미지를 사용합니다.
        2.  **계산 시점 및 주체 변경**
	        - 기존에는 `ImageModal` 컴포넌트에서 원본 이미지가 로드된 후(`onLoad` 이벤트) 배경색을 계산했습니다. 
		        - 이를 `PhotoItem` 컴포넌트에서 이미지가 클릭되는 시점(`openModal` 함수 내)에 해당 `PhotoItem`의 섬네일 이미지를 대상으로 `getAverageColorOfImage` 함수를 호출하도록 변경합니다.
        3.  계산된 배경색은 `ImageModal`을 열 때 props로 전달하거나 Redux 스토어를 통해 전달합니다.

    ```javascript
    // PhotoItem.js (수정 예시)
    import { getAverageColorOfImage } from '../utils/color'; // 경로 수정

    const PhotoItem = ({ photo, onClick }) => {
      const handleClick = async (e) => {
        // e.target이 img 태그라고 가정
        const avgColor = await getAverageColorOfImage(e.target); // 비동기 처리 고려
        onClick(photo, avgColor); // photo 정보와 함께 계산된 색상 전달
      };

      return (
        <Item onClick={handleClick}>
          <img src={photo.thumbnailUrl} alt={photo.alt_description} />
        </Item>
      );
    };

    // ImageModalContainer.js (또는 관련 Redux 로직)
    // openModal 액션 디스패치 시 배경색 정보도 함께 전달받아 스토어 업데이트
    // ImageModal 컴포넌트는 스토어에서 배경색을 받아 사용 (onLoad 로직 제거)
    ```
    * **효과**
        * **계산 속도 향상**
	        * 작은 섬네일 이미지로 계산하므로 `drawImage`, `getImageData` 및 픽셀 반복문 처리 속도가 매우 빨라집니다.
        * **배경색 즉시 적용 가능**
	        * 원본 이미지가 완전히 다운로드되기 전에도 섬네일 이미지를 기반으로 배경색을 계산하고 적용할 수 있어, 사용자는 배경색 변화를 거의 즉각적으로 느낄 수 있습니다.

#### 3.4.5. 적용 및 결과
메모이제이션과 함수 로직 개선을 순차적으로 또는 선택적으로 적용합니다. 
특히 함수 로직 개선(섬네일 이미지 활용)은 첫 실행 성능까지 크게 향상시킵니다.

- 메모이제이션 적용
	- `getAverageColorOfImage` 함수에 `colorCache` Map을 추가하여 이미지 URL을 키로 사용하는 캐시 시스템 구현
	- 동일한 이미지에 대해서는 두 번째 호출부터 즉시 캐시된 결과 반환
- 함수 로직 개선 (섬네일 이미지 활용 및 계산 시점 변경)
	- **계산 시점 변경**
		- `ImageModal`의 `onLoad` 이벤트에서 → `PhotoItem`의 `onClick` 이벤트로 이동
	- **섬네일 이미지 사용**
		- 고해상도 원본 이미지 대신 작은 섬네일 이미지(`urls.small`)를 사용하여 배경색 계산
	- **즉시 적용**
		- 원본 이미지 로딩 완료를 기다리지 않고 섬네일 기반으로 배경색을 즉시 설정

Performance 패널을 통해 다음과 같은 개선점들이 있음을 확인할 수 있습니다.

1. **첫 실행 성능 향상**
	섬네일 이미지 사용으로 픽셀 수가 크게 줄어 계산 속도 대폭 향상
2. **반복 실행 성능**
	메모이제이션으로 동일 이미지 재클릭 시 즉시 배경색 적용
3. **사용자 경험 개선**
	모달 열림과 동시에 배경색이 즉시 적용되어 지연 현상 해결

## 4. 결론
지금까지 이미지 갤러리 서비스의 성능 개선을 위해 레이아웃 이동 방지, 이미지 지연 로딩, 리덕스 렌더링 최적화, 병목 코드 최적화 등 다양한 기법을 적용해보았습니다. 

각 최적화 단계마다 문제점을 정확히 진단하고, 적절한 해결 방안을 적용함으로써 서비스의 초기 로딩 속도, 렌더링 효율, 사용자 인터랙션 반응성 등이 크게 향상되었음을 확인할 수 있었습니다.