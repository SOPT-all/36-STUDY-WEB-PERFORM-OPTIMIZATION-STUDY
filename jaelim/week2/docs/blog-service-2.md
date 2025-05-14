## 병목 코드 최적화

chunk.js에서 1,365밀리초나 js 실행 → 오랫동안이나 js 실행해서 느려짐

### 근데 원인이 뭐냐 어케앎?

⇒ performance 패널 활용

(1) Lighthouse에 view original Trace 버튼

(2) 직접 performance 패널로 이동해서 fast3G설정 후에 새로고침

**< 보는 법 >**

- CPU 차트 : CPU가 어떤 작업에 리소스를 사용하고 있는 지 비율 보여줌
  - 노랑 : js 실행
  - 보라 : 렌더링, 레이아웃 작업
  - 초록 : 페인팅 작업
  - 회색 : 기타
  - **빨간색 선 : 병목이 발생하는 지점!!!**
- 네트워크 차트 : 막대 형태로, 진한 막대일 수록 우선순위가 높은 리소스
- 스크린샷 리스트 : 서비스가 로드되는 과정들임
- 네트워크 차임라인 : 네트워크 요청 시간 순서에 따라 보여줌
  - 왼쪽 회색 선 : 초기 연결 시간
  - 오른쪽 회색 선 : 해당 요청에 대한 메인 스레드 작업 시간
  - 막대의 옅은 색 영역 : 요청 보낸 시점부터 응답 기다리는 시점까지의 시간
  - 막대의 짙은 색 영역 : 콘텐츠 다운로드 시간
- Frame 섹션 : 화면 변화 때마다가 스크린샷
- Timing 섹션 : 유저 타이밍 API를 통해 기록된 정보 기록, 각 컴포넌트 렌더링 시간
- Main 섹션 : 메인 스레드에서 실행되는 플레임 차트로 보여줌 (어떤게 오래걸리는지)
- 하단 탭
  - Summary : 선택 영역에서 발생한 작업시간의 총합, 각 작업 시간 비중
  - Bottom-up : 최하위~상위 작업 역순
  - Call-tree : 상위 ~ 하위 순으로 트리뷰
  - Event-log : 렌더링, 페인팅, 로딩 등의 이벤트 보여줌

### 페이지 로드 과정 분석

![image.png](attachment:5fdae9b3-58f7-4a51-9469-050fe8395011:image.png)

파란색 : 네트워크 요청, HTML 요청!

주황색 : js파일 로드 및 요청!

이때, 그림처럼 chunk.js에 대한 로드가 겁나 긺!

chunk.js를 다운받고 나서 보면, app.js를 통해서 리액트를 실행시키고 있음

Timing 섹션 상에서 컴포넌트 마운트를 하고 있는데, ArticleList 컴포넌트 경우 실행시간이 개 긺

이미 데이터는 다 준비된 상태고, 화면 그리는 거 뿐인데 꽤 걸림

그래서 파고 들어가보니 `removeSpecialCharacter` 라는 함수가 아주 오래 실행된 걸 알 수 있슴

### 병목 코드 개선

`removeSpecialCharacter` 함수! : 문자열에서 특수 문자 제거하는 함수임!

함수 분석해보면 문제가 있듬

1. 각 특수문자마다 반복문을 돌리는데, 두번이나 중첩해서 사용중
2. 문자열 제거하는 데에도 substring & concat 함수 사용

→ replace함수가 있는데 굳이? 이걸?!

그럼 어떻게 효율적으로 로직을 변경할까

1. substring & concat 대신 → replace 함수 사용!

   ```jsx
   str = str.replace("#", "");
   str = str.replace("-", "");
   ```

   막 이런 식으로 계속 특수문자 제거하면 하나하나 다 작성해야 해서 불편함

   → 정규 표현식으로 간략화 하기!

2. 작업량 줄이기 → articles API에 있는 블로그 글 데이터가 꽤 긺…이거 하나하나 확인하고 제거하는 과정이니까 당연히 느림 (거의 9만자)

   근데 서비스 상에서 사용하는 건 200자 뿐임 → 잘라서 필요 부분만 작업하자

   ```jsx
   let _str = str.substring(0, 300);
   ```

   이런식으로 잘라서 작업

## 코드 분할 & 지연 로딩

아까 chunk.js이 유난히 다운로드가 오래 걸림

화면 그리는 데에 필요한 리소스가 오래걸리게 되면 → 화면도 늦게 뜨는 문제!

그럼 이 js파일도 최적화 하자!

이 js 파일의 코드를 상세히 보려면 Webpack Bundle Analyzer 툴 사용!

이거 쓸리면, `npm run eject` 써서 create React app 된 설정 파일들을 추출 필요!

ㄴ근데 좀더 간편한 `cra-bundle-analyzer` 툴이 있듬!

`npm install —save-dev cra-bundle-analyzer`

`npx cra-bundle-analyzer`

이렇게 실행하면, 어떤 창이 뜨는데 서비스의 번들 파일 , 패키지들 모두 뜸!

파일의 실 크기에 따라서 비율대로 보여줘서, 어떤 패키지가 어느정도 용량인지 직관적 보임!

![image.png](attachment:1e75bc78-1e35-4d1c-8490-139cff53df00:image.png)

→ 오른쪽 상단에 파란 블록 이있는데, 거기에 서비스에서 작성된 코드 이름 확인 가능

⇒ 2.chunk.js보면, refractor이랑 react-dom이 가장 많이 차지함 (react-dom은 리액트 코드이고)

refractor을 더 살펴 보자면 해당 패키지 읽어보자!

⇒ react-syntax-highlighter패키지에 refractor 참조 중인데, 이건 마크다운의 코드에 스타일 입히는거

근데 해당 컴포넌트는 마크다운 표시하는거랑 상관 없고, 딱히 필요한 기능이 아님

번들 파일 하나에 너무 필요없는거까지 다같이 로드됨

그러므로! 분리하자!

### 코드 분할

Bundle.js → Listpage.chunk.js + Viewpage.chunk.js 등으로 분리

각 컴포넌트마다 필요한 번들에 맞게 분리

![image.png](attachment:6e359cda-f621-4e57-8aed-30aeeba3e70b:image.png)

목록 페이지 → listPage와 axios 등의 관련 코드만

상세 페이지 → viewPage와 chunk.js 만 로드되도록

### 코드 분할 방법

동적 import가 가장 좋은 방법임!

```jsx
import { add } from "./math";
console.log(add(1, 7));
```

이렇게 하면, 빌드시에 모듈이 함께 번들링됨

근데!

```jsx
import('add').then((module) => {
	const { add } = module
	console.log(add(1,7))
}
```

이런 식으로 하면 빌드가 아니라, 런타임에 모듈을 로드함!

동적 import 를 만나고 나면 코드 분할해서 번들링을 하는 것임

- 개 큰 문제는

동적 import는 → Promise형태로 모듈을 반환해주는 건데, import 모듈은 컴포넌트여서 promise 내부에 로드된 이 컴포넌트를 다시 밖으로 빼줘야 함

⇒ 리액트에선 lazy와 Sus-pense를 제공해줌! 그래서 이 문제 신경 안써도됨

```jsx
import React, {Suspense} from 'react'

const SomeComponent = React.lazy(() => import('./SomeComponent'))
function MyComponent() {
	return {
		<div> <Suspense>  ~  </Suspense> </div>
	}
}
```

lazy함수는 동적 import 호출해서, 그 결과 Promise를 반한하는 함수를 인자로 받음

lazy함수가 반환한 값은 Suspense안에서 헨더링

페이지 별로 코드도 분할해야하니까

```jsx
const ListPage = lazy(() => import("./pages/ListPage/index"));
const ViewPage = lazy(() => import("./pages/ViewPage/index"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>=5 ...</div>}>
        <Switch>
          <Route path="/" component={ListPage} exact />
          <Route path="/view/:id" component={ViewPage} exact />
        </Switch>
      </Suspense>
    </div>
  );
}
```

이런식으로 분리

이러면 사용자가 목록 페이지에 접근하면 모든 페이지가 아닌, 필요한 페이지만 동적 import

## 텍스트 압축

create-react-app의 경우엔, production 환경 & development환경에 차이가 있음!!

production : 웹팩에서 경량화나 난독화 같은 추가 최적화 작업 있음

`npm run build` 로 번들링하고 최종적으로 빌드

`npm run serve` 로 빌드하면, serve라이브러리는 /build 파일기준으로 서비스함

→ 얘는 최적화가 이루어짐

development : 최적화 작업 없음

![image.png](attachment:dfbc3573-eccb-4894-8782-703f60e50c63:image.png)

lighthouse Opportunities 섹션에 Enable text compression항목에서 텍스트 압축을 하면 성능과 시간 자체를 꽤 줄일 수 있음! 텍스트 압축을 해보자

(응답헤더에 Context-Encoding 항목 없는거면 텍스트 압축 적용 안되었다는거)

HTML, CSS 등도 결국 텍스트 기반의 파일이기 때문에, 텍스트 압축 기법 적용 ㄱㄴ

이런 파일을 더 작은 크기로 빨리 전송한 후, 사용하는 시점에서 다시 해제하면 됨!

그럼 리소스 전송 속도도 빨라질 거임

아까 그 serve 라이브러리에서, 패키지 옵션을 보면

u와 s 옵션이 있을 거임 → u 옵션을 제거하면 텍스트 압축 ㄱㄴ

(s옵션은 SPA 서비스 위해 매칭되지 않는 주소는 모두 index.html로 보내겠다)

(u옵션은 텍스트 압축을 하지 않겠다)

⇒ u 옵션 삭제하면 텍스트 압축 가능해지고 ! gzip으로 설정되며 성능 점수 올라감!!
