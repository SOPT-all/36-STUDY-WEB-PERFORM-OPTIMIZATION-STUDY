# 레이아웃 이동 피하기

## 레이아웃 이동이란?

화면상의 요소 변화로 레이아웃이 갑자기 밀리는 현상이다.

이미지가 로드될 시, 아래 이미지보다 위 이미지가 늦게 로드되는 경우 뒤늦게 아래 이미지를 밀어내면서 화면에 그린다.

Lighthouse에서는 웹 페이지에서 레이아웃 이동이 얼마나 발생하는지를 CLS(cumulative Layout Shift)라는 항목을 두고 성능 점수에 포함한다.

- CLS 값은 0\~1 사이이다. (0 = 레이아웃 이동이 전혀 발생하지 않음)
- 언제 레이아웃 이동이 발생하는지 Performance Experience 섹션에서 확인할 수 있다.

## 레이아웃 이동의 원인

- 사이즈가 미리 정의되지 않은 이미지 요소이다. 브라우저는 이미지를 다운로드하기 전까지 이미지 사이즈를 알 수 없으므로, 해당 영역을 확보할 수 없다.
- 사이즈가 미리 정의되지 않은 광고 요소이다.
- 동적으로 삽입된 콘텐츠이다. 새로운 요소가 추가되면서 다른 요소를 밀어내는 경우이다.
- 웹 폰트이다. 폰트에 따라 글자의 크기가 달라질 수 있어 위치에 영향을 준다.

이미지 갤러리 서비스에서는 "사이즈가 미리 정의되지 않은 이미지 요소" 때문에 레이아웃 이동이 발생한다.

## 레이아웃 이동 해결

레이아웃 이동을 일으키는 요소의 사이즈를 지정하면 된다. 즉, 해당 요소의 사이즈를 미리 예측할 수 있거나 알고 있다면 해당 사이즈만큼 공간을 확보해 놓아야 한다.

이미지 갤러리의 이미지 사이즈는 브라우저의 가로 사이즈에 따라 변하므로, 단순히 너비와 높이를 고정하는 것이 아닌, 이미지의 너비/높이 비율로 공간을 잡아두어야 한다.

### 이미지 크기를 비율로 설정하는 방법

1. padding을 이용해 박스를 만들고, 그 안에 이미지를 absolute로 띄운다.

   - padding 퍼센트를 매번 계산해야 하며 코드가 직관적이지 않다.

2. css 속성: aspect-ratio를 사용하는 방법이다.

## 이미지 지연 로딩

Intersection Observer API 대신 react-lazyload 라이브러리를 사용할 수 있다.

```bash
npm install --save react-lazyload
```

### 사용 방법

LazyLoad의 자식으로 들어간 요소들은 화면에 표시되기 전까지는 렌더링 되지 않다가, 스크롤을 통해 화면에 들어오는 순간 로드된다.

이미지뿐 아니라 일반 컴포넌트도 이 안에 넣어 지연 로드할 수 있다.

하지만 지연 로드 특성상, 스크롤을 내려 화면에 이미지가 들어올 때 이미지를 로드하게 되므로 처음에는 이미지가 보이지 않는 문제가 있다.

이를 해결하기 위해 offset 옵션을 사용할 수 있다. offset을 100으로 설정하면 이미지가 화면에 들어오기 100px 전에 로드된다.

## 리덕스 렌더링 최적화

React Developer Tools를 설치하면, 요소 테두리가 나타나는 것을 통해 해당 요소의 컴포넌트가 리렌더링 되었는지 확인할 수 있다.

리덕스에서 관리하는 이미지 리스트, 헤더 카테고리, 모달 정보 등은 상태 변화에 따라 리렌더링을 유발할 수 있다.

### useSelector 최적화 방법

1. 객체를 새로 만들지 않도록 반환 값을 나눈다.

   - 객체로 묶어서 한 번에 반환하던 것을 단일 값으로 나눠 반환한다.

2. 새로운 Equality Function 사용

   - useSelector의 두 번째 옵션으로 이전 반환 값과 현재 반환 값을 비교하는 함수를 제공한다.

## 병목 코드 최적화

getAverageColorOfImage 함수는 이미지의 평균 픽셀 값을 계산하는 함수이다. 캔버스에 이미지를 올리고, 픽셀 정보를 불러온 뒤 평균을 낸다.

이 함수를 메모이제이션하면 성능을 향상시킬 수 있다.

### 메모이제이션이란?

한 번 실행된 함수에 대해 반환 값을 기억해 두고 있다가 같은 조건으로 다시 실행되었을 때 기존 값을 재사용하는 기술이다.

- 두 번째 실행부터는 성능이 대폭 향상된다.
- 하지만 항상 새로운 인자가 들어오는 경우라면 메모리만 낭비할 수 있다.

## React Compiler

### React의 메모이제이션 API

- useCallback: 함수를 메모이제이션한다.
- useMemo: 연산 결과를 메모이제이션한다.
- React.memo: 컴포넌트를 메모이제이션한다.

### React Forget: 자동 메모이제이션

React Forget은 컴파일 시 자동으로 메모이제이션을 적용하는 실험적 도구이다. 개발자가 직접 useMemo, useCallback 등을 사용할 필요 없이 컴파일러가 적절히 최적화를 수행한다.

예:

```jsx
function TodoList({ visibility, themeColor }) {
  const [todos, setTodos] = useState(initialTodos);
  const handleChange = (todo) => setTodos((todos) => getUpdated(todos, todo));
  const filtered = getFiltered(todos, visibility);
  return (
    <div>
      <ul>
        {filtered.map((todo) => (
          <Todo key={todo.id} todo={todo} onChange={handleChange} />
        ))}
      </ul>
      <AddTodo setTodos={setTodos} themeColor={themeColor} />
    </div>
  );
}
```

React Forget은 memoCache를 활용해 변수의 변경 여부를 판단하고, 불필요한 연산을 방지한다.

이로써 useMemo/useCallback과 동일한 수준의 최적화를 개발자의 수동 설정 없이 달성할 수 있다.
