

# 4장 이미지 갤러리 최적화

## 4.1 레이아웃 이동

### 문제 상황
- 이미지가 뚝뚝 끊기며 밀려나는 현상이 발생
- CLS(Cumulative Layout Shift) 점수: 0.43 (권장: 0.1 이하)


### 목표
- 이미지 크기를 미리 설정하여 공간을 확보하고, 밀어내는 현상을 방지

<br />

### 4.1.1 이미지 크기 설정

#### 1) 패딩 비율로 공간 확보 (16:9 비율 예시)
```tsx
const ImageWrap = styled.div`
  width: 100%;
  padding-bottom: 56.25%; // 16:9 비율
  position: relative;
`;

const Image = styled.img`
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
````

<br />

#### 2) `aspect-ratio` 사용

```css
.wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.image {
  width: 100%;
  height: 100%;
}
```

> 단, `aspect-ratio`는 일부 구형 브라우저에서 호환성 문제가 있을 수 있음

### 결과

* 이미지의 높이가 로딩에 따라 변하지 않음
* CLS 점수: 0 (레이아웃 이동 없음)


<br />

## 4.2 이미지 지연로딩 (Lazy Loading)

### 방식

* `react-lazyload` 라이브러리를 사용하여 이미지가 화면에 진입할 때 로드

```tsx
import LazyLoad from "react-lazyload";

<LazyLoad offset={1000}>
  <img src={imageUrl} alt="이미지" />
</LazyLoad>
```

<br />

### LazyLoad vs Intersection Observer API

| 항목       | LazyLoad                   | Intersection Observer |
| -------- | -------------------------- | --------------------- |
| 브라우저 호환성 | 좋음                         | 최신 브라우저 중심            |
| 사용성      | 다양한 콘텐츠 타입 지원 (이미지, 비디오 등) | 네이티브 지원, 유연한 설정 가능    |
| 단점       | 의존성 추가                     | 구형 브라우저 미지원 가능성       |

> 상황에 따라 적절한 도구를 선택할 것

<br />

## 4.3 Redux 최적화

### 문제 상황

* 모달을 열거나 닫을 때, 관련 없는 이미지까지 리렌더링됨

<br />

### 원인 분석

* `useSelector`로 가져오는 값이 "객체"나 "배열"일 경우, 참조값이 바뀌면 항상 리렌더링 발생

```tsx
const { photos, loading } = useSelector((state) => ({
  photos: state.photos.data,
  loading: state.photos.loading,
}));
```

→ 이 경우 매 렌더링마다 새로운 객체를 생성하기 때문에 `===` 비교가 false

<br />

### 해결 방법

#### 1) 단일 값만 `useSelector`로 가져오기

```tsx
const modalVisible = useSelector(state => state.modal.visible);
const bgColor = useSelector(state => state.modal.bgColor);
```

<br />

#### 2) `shallowEqual` 사용

```tsx
import { useSelector, shallowEqual } from 'react-redux';

const { modalVisible, bgColor } = useSelector(
  state => ({
    modalVisible: state.modal.visible,
    bgColor: state.modal.bgColor,
  }),
  shallowEqual
);
```

<br />

#### 3) 필터링 로직 분리

* 전 (잘못된 방식):

```tsx
const { photos } = useSelector((state) => ({
  photos: state.photos.data.filter(photo => photo.category === category),
}));
```

* 후 (리렌더링 최소화):

```tsx
const { category, allPhotos } = useSelector(state => ({
  category: state.category,
  allPhotos: state.photos.data,
}));

const photos = category === "all"
  ? allPhotos
  : allPhotos.filter(photo => photo.category === category);
```

<br />

### 다른 상태관리 라이브러리에서도?

* Zustand / Recoil 역시 동일한 객체 참조 문제가 존재
* 동일한 방식으로 최적화 필요

<br />

## 4.4 메모리제이션 (Memoization)

### 문제 상황

* 모달이 열릴 때, 배경색 계산 함수(`getAverageColorOfImage`)가 너무 느림

<br />

### 원인

* 모든 픽셀을 분석하여 평균 색상을 계산하는 고비용 연산 발생

<br />

### 해결 방법: 메모리제이션

```ts
const averageColorCache = {};

export const getAverageColorOfImage = (imgUrl) => {
  if (averageColorCache[imgUrl]) {
    return averageColorCache[imgUrl];
  }

  const averageColor = calculateAverageColor(imgUrl); // 고비용 연산
  averageColorCache[imgUrl] = averageColor;

  return averageColor;
};
```

> 동일한 인풋에 대해 반복 연산을 피하고 캐시된 결과를 재사용

<br />

### 유의사항

메모리 사용량이 증가할 수 있으므로 반복 호출이 예상되는 고비용 함수에만 적용

