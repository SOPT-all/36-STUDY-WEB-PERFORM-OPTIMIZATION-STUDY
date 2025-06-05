\*\*\* 실습 사이트 기능

```jsx
$ git clone https://github.com/performance-lecture/lecture-4.git
```

![image.png](attachment:d701067c-c504-4c4d-a94e-d441141d74ce:image.png)

![image.png](attachment:dc6ae040-46cf-46ba-9a0f-6188908635df:image.png)

갤러리 속에 이미지들이 있고 → 클릭하면 그 이미지가 큰 화면으로 → 뒤에 배경은 비슷한 색

- utils > getAverageColorOfImage 함수 : 이미지의 전체 평균 색 뽑아서 배경색으로!
  `context.getImageData().data` 로 ImageData 받아서 평균값 냄
  ```jsx
  ب

  export function getAverageColorOfImage(imgElement) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext && canvas.getContext('2d');
  const averageColor = {
  	r: 0,
  	g: 0,
  	b: 0,
  };
  if (!context) {
  	return averageColor;
  }
  const width = (canvas.width =
  	imgElement.naturalWidth | | imgElement.offsetWidth | |
  	imgElement.width);
  const height = (canvas.height =
  	imgElement.naturalHeight | | imgElement.offsetHeight ||
  	imgElement.height);

  context.drawImage(imgElement, 0, 0);

  const imageData = context.getImageData(0, 0, width, height).data;
  const length = imageData. length;

  for (let i = 0; i < length; i += 4) {
  	averageColor.r += imageData[i];
  	averageColor.g += imageData[i + 1];
  	averageColor.b += imageData[i + 2];
  }
  ```
- **containers > PhotoListContainer 함수**
  dispatch(fetchPhotos()) 로 이미지 리스트들을 서버로 받아옴 → redux/photos.js에 저장
  useSelector로 이 저장된 정보 가져오고, 카테고리에 맞는 걸 필터링해서 불러옴
  그 후에 PhotoList 컴포넌트로 전달해서 화면에 그림
- **components > PhotoItem**
  하나의 이미지를 그리는 컴포넌트로, 여기 내의 openModal 함수로 모달 뜸. showModal함수는 액션 생성자로, 리듀서에서 특정 동작으로 전달
-

**[적용할 최적화 기법]**

1. **이미지 지연 로딩**

   그 전에 다룬거 : 이미지가 화면에 보이는 타이밍에 맞춰서 이미지 지연 로딩

   ⇒ Intersection Observer 사용했듬

   근데 이번에는 npm에 등록되어있는 라이브러리 이용해보자!

2. **레이아웃 이동 피하기**

   화면상의 요소 변화로 갑자기 레이아웃 밀리는 현상 → 해결해보자

3. **리덕스 렌더링 최적화**

   recoil이나 contextAPI 등의 상태관리 라이브러리가 있지만, 그럼에도 **Redux**

   redux에 useSelector라는 훅으로 손쉽게 리덕스에 저장된 데이터 가져옴

   좀더 효율적으로 사용되도록 해보자

4. **병목 코드 최적화**

   병목코드를 찾아서 최적화할 뿐 아니라 메모이제이션으로 적용해보자

### ⇒ 이번엔 React Developer Tools 활용!

: profiler 패널과 Components 패널

## 레이아웃 이동 피하기

이미지가 뒤늦게 뜨는 경우, 밀려나게 됨. 위치를 순간적으로 밀리게 하고, 클릭 잘못 유발도 함

Lighthouse에서 레이아웃 이동이 얼마나 발생하는 지 지표 == CLS

CLS 점수가 0에 가까우면, 레이아웃 이동이 안 일어난 거임. 이거 실습 사이트는 0.438임..안좋음

좀더 직접적으로 확인 → Experience 섹션 보면 Layout Shift 빨간 막대 표시!

이 빨간 막대 표시 해당 시간에! 레이아웃 이동이 발생했다는 뜻! 막대에 커서 올리면, 해당 문제 요소 뜸

- 레이아웃 이동 원인
  1. 사이즈가 미리 정의되어 있지 않은 이미지 / 광고 요소 : 브라우저는 그 영역 정보 모르니..
  2. 동적으로 삽입된 컨텐츠
  3. 웹폰트

### 해결 방법?

레이아웃 이동 요소의 사이즈를 미리 정의해두면 됨!

근데 가로 사이즈에 따라 반응형으로 이미지 영역이 바뀔 텐데? ⇒ 단순 고정이 아니라 가로x높이 비율로 지정

- 이미지 크기를 비율로 설정 방법

1. **padding을 이용해서 박스 만들고, 그 안에 이미지를 absolute로 띄우기**

   ⇒ 이렇게 되면 wrapper 너비 160px 만큼 상단 여백이 설정됨 (160px x 90px)

   이 상태에서 이미지 absolute 처리되면 자동으로 그 사이즈에 맞춰져짐!

   (만약에 1:1 비율이면 padding-top : 100%)

![image.png](attachment:5219f67b-2c9a-4b4d-a122-7e0e12345064:image.png)

1. **아예 aspect-ratio 속성에 비율만 명시해줘도 됨**

   근데 이거 아마 일부 브라우저는 호환 안되니까 확인 필요

## 이미지 지연 로딩

Intersection Observer API 사용 x ⇒ react-lazyload 사용해보기!

```jsx
import LazyLoad from "react-lazyload";
function Component() {
  return (
    <div>
      <LazyLoad>
        <img src="" />
      </LazyLoad>
    </div>
  );
}
```

LazyLoad의 자식으로 들어간 요소들은 화면에 표시되기 전까지는 렌더링 안되다가,

화면에 들어온 순간 렌더링! 이건 이미지 말고 일반 컴포넌트도 가능

이거 지연해주는걸로 초기 화면 리소스 절약은 너무 좋은데, 이게 나중에야 뜨는 이걸 화면에 보임

그래서, 화면에 보이는 시점보다 조금만 더 미리 땡겨서 준비해주는게 좋음!!

**⇒ 이게 offset이라는 옵션!!**

offset 을 100으로 설정하면, 화면에 들어오기 100px 전에 이미지 로드됨

`<LazyLoad offset={1000}></LazyLoad>` 이런 식으로 설정해두면 됨!

## 리덕스 렌더링 최적화

리액트는 렌더링 사이클을 가짐. 서비스의 상태가 변경되면, 화면이 리렌더링이 되는데, 불필요한 리렌더링은 메인 스레드의 리소스를 차지하면서 성능 악화..!

**⇒ React Developer Tools 사용**

(이건 크롬 웹스토어 상에서 깔아 주면됨..!)

설정 버튼 클릭하면 `Highlight upadates when Components render` 이라는 항목이 뜨는데 이거 체크!

여기에 테두리 표시되는게 == 리렌더링 되었음을 의미

실행해보면, 실습 사이트 상에서 모달이 뜨는 작업을 했을 때, 이거랑 상관없는 요소나 헤더도 리렌더링됨;;

1. 모달이 뜨는순간 2. 모달의 이미지가 로드되며 배경색 생기는 순간 3. 모달 닫는 순간

일케 총 3번이나 리렌더링 됨!! 불필요함!!

### 원인

⇒ 리덕스 때문임.. 서비스에서 사용하는 이미지 리스트, 헤더 카테고리, 모달 정보 등등은 리덕스가 관리

그래서, 각 컴포넌트들은 리덕스의 상태를 구독해놨다가, 상태 변했을 때 리렌더링

그래서, 이 상태를 구독하고 있는 모든 컴포넌트들이 같이 리렌더링됨!

실습 사이트 상에서도,,

PhotoItem 컴포넌트에서 dispatch로 imageModal 스토어 상태 변경 → 리덕스 전체 상태 변함 → 그럼 이 useSelector 사용하고 있는 다른 컴포넌트들도 리렌더링

**useSelector 동작방식**

서로 다른 상태 참조할때는 리렌더링 안하도록 구현되어 있긴 한데, 그 판단 기준이 useSelector에 인자로 넣은 함수의 반환 값임.! 반환값이 이전과 같으면 리렌더링 안하는데, 다르면 무조건 리렌더링

그래서 헤더든 PhotoListContainer든 반환값이 새로운 참조값을 만든 객체향태라서, 계속 변했다고 판단됨

### 문제 해결

1. 반환값에 객체를 새로 만들지 않도록 나누는 방법

   객체로 묶어서 반환한걸 단일 값으로 반환 → 참조값이 바뀌는건 아니니까 리렌더링 x

   헤더에선 그냥 객체 형태를 걷어내주고 한 값만 내주기

2. Equality Function 사용 방법

   useSelector 옵션으로 넣어주는 함수로, useSelector에 반환하는 값에도 영향을 미치는지 비교하는 함수

   두번째 인자로 shallowEqual이라는 값을 반환해서, 객체 내부의 값들을 비교하게 함

   ```jsx
   const { category, allPhotos, loading } = useSelector(
   state => (
   	category: state.category.category,
   	allPhotos: state.photos.data,
   	loading: state.photos. loading,
   	}),
   	shallowEqual
   );

   const photos =
   	category === 'all"
   	? allPhotos
   	: allPhotos.filter(photo => photo.category === category);

   ```

## 병목코드 최적화

getAverageColorOfImage 함수가 굉장히 느림을 알 수 있음

→ 이미지의 평균 픽셀값을 계산하는 함수로, 하나하나 평균 내는것에 느림..

→ 메모이제이션 기법으로 개선해보자!

### 메모이제이션

메모이제이션 == 한번 실행한 함수에 대해 해당 반환값을 기억해두고 있다가 똑같은 조건으로 실행되면 바로 전에 값을 반환하는 기법!

![image.png](attachment:3cf9afd2-60b7-4aef-8d88-a61cdf153b78:image.png)

cache[n]=result넣어두고,

if (cache[n]) 이면 바로 result를 리턴해버리기

그럼 얘도 아까 그 함수에 적용해보면

![image.png](attachment:3a1f6e8b-ec1c-4774-bceb-3e5aac03c621:image.png)

하지만, 메모이제이션의 단점 = 여전히 첫 실행시에는 변화가 없음..여전히 계산해야하므로

**그럼, `getAverageColorOfImage` 함수 로직 자체를 수정해보자**

픽셀 정보 불러오는 drawImage와 getImageDate 함수, 그리고 반복문 떄문임!

또, 이걸 처리하는 이미지에 따라도 다름. 이미지가 사이즈 작으면 더 픽셀도 적으니까 반복문도 적음

- 그럼 우선 이미지 사이즈부터 줄이자!’
  ⇒ 원본 이미지가 아니라, 섬네일 배경 이미지로 계산하게 하자, 그럼, 원본 다운 후에 배경색 계산하는게 아니라 썸네일만으로 가능해지니까 오히려 더 빠르기도 함

![image.png](attachment:eb5971aa-86e7-4162-9fba-581d4ff1832a:image.png)
