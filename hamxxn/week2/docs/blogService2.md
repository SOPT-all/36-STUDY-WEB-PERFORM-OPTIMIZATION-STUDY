# 병목 코드 최적화

js 코드 때문에 서비스가 너무 느리게 다운로드 또는 실행되는 경우가 있다.

이 때 서비스를 느리게 만드는 코드를 `병목코드`라고 한다.

그런 병목 코드를 어떻게 찾아내고, 어떤 방법으로 최적화 할 수 있는지 알아보자!

`Diagnostics 섹션의 “Reduce JS execution time” 항목`

![스크린샷 2025-05-13 오전 11.01.33.png](attachment:c9b49273-a769-4ed2-92e2-16069cff5c3b:스크린샷_2025-05-13_오전_11.01.33.png)

- chunck.js 파일이 1.365밀리초 동안 js가 실행되었음을 알 수 있다.

👉 오랫동안 js가 실행되었고 그 때문에 서비스가 느려진 것이다.

메인 스레드의 작업을 살펴보고 느린 작업이 무엇인지 확인하기 위해 `Perfomance 패널`을 활용한다.

`Performance 패널 왼쪽 상단 새로고침 버튼`

![스크린샷 2025-05-13 오전 11.04.31.png](attachment:ea30c3f6-b360-4b98-8ff8-92fdbedf6c7a:스크린샷_2025-05-13_오전_11.04.31.png)

1. CPU 차트, Network차트
   - CPU 차트는 시간에 따라 CPU가 어떤 작업에 리소스를 사용하고 있는지 비율로 보여준다.
     - 노: JS 실행작업
     - 보: 렌더링/ 레이아웃 작업
     - 초: 페인팅 작업
     - 회: 기타
     👉 이를 통해 어느 타이밍에 어떤 작업들이 주로 진행되고 있는지 파악할 수 있다.
     👉 그 위 빨간색 선은 병목이 발생하는 지점을 의미한다. ⇒ 특정 작업이 메인 스레드를 오랫동안 잡아 두고 있다는 뜻이다.
   - 네트워크 차트
     - CPU 차트 아래 막대 형태로 표시하며, 대략적인 네트워크 상태를 보여준다.
     - 위쪽 찐한 막대는 우선순위가 높은 네트워크 리소스를, 아래는 우선 순위가 낮은 네트워크 리소스를 나타낸다.
     - 그 아래 리스트는 서비스가 로드되는 과정을 보여준다
       ![스크린샷 2025-05-13 오전 11.10.17.png](attachment:54523339-baf1-430c-b959-f7bb7479ce45:스크린샷_2025-05-13_오전_11.10.17.png)
2. 네트워크 타임라인

   ![스크린샷 2025-05-13 오전 11.13.54.png](attachment:45c01733-c7e9-49ff-84e8-d5a6bbeb9c70:스크린샷_2025-05-13_오전_11.13.54.png)

   - network 패널과 유사하게 서비스 로드 과정에서의 네트워크 요청을 시간 순서에 따라 보여준다.
     - 회색 초기선: 초기 연결 시간
     - 막대의 옅은 색 영역: 요청을 보낸 시점부터 응답을 기다리는 시점까지의 시간
     - 짙은 영역: 콘텐츠 다운로드 시간
     - 얇은 선: 해당 요청에 대한 메인 스레드의 작업 시간

3. Frame, Timimgs, Main
   - Frame = 화면의 변화가 있을 때마다 스크린샷을 찍어 보여준다.
     ![스크린샷 2025-05-13 오전 11.17.12.png](attachment:6d9468f3-b5c0-49a1-beb1-7e42600bbf64:스크린샷_2025-05-13_오전_11.17.12.png)
   - Timings = User Timing API를 통해 기록된 정보를 기록
     - 막대들은 리엑트에서 각 컴포넌트 렌더링 시간을 측정한 것이다.
       - 17 ver 이후로 지원 종료
       ![스크린샷 2025-05-13 오전 11.17.19.png](attachment:eacddb1c-faf6-488c-93f8-bb9fcdb692ec:스크린샷_2025-05-13_오전_11.17.19.png)
   - Main
     - 브라우저의 메인 스레드에서 진행되는 작업을 플레임 차트로 보여준다
       👉 이를 통해 어떤 작업이 오래걸리는지 파악할 수 있다.
     ![스크린샷 2025-05-13 오전 11.19.25.png](attachment:e675266d-c5ef-44b3-8e14-ad186c16364c:스크린샷_2025-05-13_오전_11.19.25.png)

![스크린샷 2025-05-13 오전 11.20.16.png](attachment:49b3aa4e-5c1e-46ce-be1f-8298c7ef553a:스크린샷_2025-05-13_오전_11.20.16.png)

1. 하단 탭

   ![스크린샷 2025-05-13 오전 11.20.41.png](attachment:2e77a5fe-5ba6-4770-b2c1-3838b8b15670:스크린샷_2025-05-13_오전_11.20.41.png)

   - summary
     - 선택 영역에서 발생한 작업 시간의 총 합, 각 작업이 차지하는 비중
   - Bottom-Up
     - 가장 최하위에 있는 작업부터 상위 작업까지 역순으로 보여준다
   - Call tree
     - 가장 상위 작업부터 하위 작업 순으로 작업 내용을 트리뷰로 보여준다
   - Event Log
     - 발생한 이벤트를 보여준다.
       - loading, experience, scripting, rendering, painting

### 페이지 로드 과정 살펴보기

![스크린샷 2025-05-13 오전 11.23.08.png](attachment:3e99bb7a-5e69-4f97-8a7e-7601d7c3950e:스크린샷_2025-05-13_오전_11.23.08.png)

![스크린샷 2025-05-13 오전 11.25.15.png](attachment:55c2dd88-0b22-41e7-b08f-019a7435a389:스크린샷_2025-05-13_오전_11.25.15.png)

- [localhost](http://localhost) 네트워크 요청: html 파일에 대한 요청
- 주황색 막대는 js 파일에 대한 요청
  - chunck.js의 로드시간이 매우 길다는 것을 확인할 수 있다.
  - 물론 지금 환경이 development 환경이라 번들 파일이 경량화 되어 있지 않기 더욱 크다.

![스크린샷 2025-05-13 오전 11.26.42.png](attachment:565b3d6c-5941-47de-82bd-98f39a249696:스크린샷_2025-05-13_오전_11.26.42.png)

- html이 다운된 시점에 메인스레드에서는 parsehtml 작업을 하고 있다.
  ![스크린샷 2025-05-13 오전 11.27.24.png](attachment:ee09648e-bd3d-40b2-8be6-8c83db83b704:스크린샷_2025-05-13_오전_11.27.24.png)
- chunck가 다운이 끝난 시점을 보면 , 이어서 js 작업이 실행되고 잇다.
- 위에서 app.js는 react 코드를 실행하는 작업이라고 볼 수 있다.
  ![스크린샷 2025-05-13 오전 11.28.59.png](attachment:e6a67ff2-07db-4702-8d43-2c7156df9c5e:스크린샷_2025-05-13_오전_11.28.59.png)
- timing 섹션에서도 메인스레드의 js가 끝ㄴ나는 시점에서 컴포넌트에 대한 렌더링 작업이 기록되어 있음을 확인할 수 있다.
- 그렇게 컴포넌트가 마운트가 되면 ArticleList 컴포넌트에서 블로그 글 데이터를 네트워크를 통해 요청하는데, 그 정보가 articles 라는 이름으로 기록되어 있다.
- 모두 다운된 이후 메인 스레드에서는 해당 컴포넌트를 렌더링하기 위해 js 를 실행시키는 것을 timing 섹션에서 확인할 수 있다.

여기서 ArticleList 항목에 커서를 두면 실행시간이 1.4초 인 것을 확인할 수 있는데, 네트워크 시간을 포함한 시간이 아닌 모든 데이터가 준비된 상태에서 단순히 데이터를 화면에 렌더링 하는 시간인데 너무 긴 것을 확인할 수 있다.

메인 스레드의 해당 구간을 따라 내려가다보면 aticle이라는 작업이 있는데 그 아래 removespecialcharacter도 확인할 수 있다.

→ 이 작업이 렌터링을 길어지게 했다는 이야기인데,

src/Article/index.js 안에 있는 함수 이름이다.

👉 그럼 이 함수를 최적화 하면 렌더링 시간도 단축될 것이다.

![스크린샷 2025-05-13 오전 11.34.18.png](attachment:4214a1ff-3251-4d1d-a4bf-7b0a27647752:스크린샷_2025-05-13_오전_11.34.18.png)

### 병목코드 개선

![스크린샷 2025-05-13 오전 11.37.01.png](attachment:382eccf7-329d-435d-9271-4a545172ac69:스크린샷_2025-05-13_오전_11.37.01.png)

❌ 문제: 각 특수 문자마다 반복문을 돌려 본문에 일치하는 내용을 탐색하고 제거하는데 이 때 반복문을 두 번 중첩, 문자열을 제거하는 데도 substring, concate를 사용하고 있다.

👉 `특수문자 효율적으로 제거하기`

js에는 일피하는 문자를 찾아 제거하는 replace 함수를 사용한다.

![스크린샷 2025-05-13 오전 11.40.08.png](attachment:6d4bad90-163b-461d-9f31-a5516a622451:스크린샷_2025-05-13_오전_11.40.08.png)

👉 `작업량 줄이기`

articles API에 있는 블로그 글 데이터는 굉장히 긴 문자열이지만, 실제 사용되는건 대략 200자이다. 그럼 굳이 9만 자나 되는 문자열을 모두 탐색할 필요는 없다.

![스크린샷 2025-05-13 오전 11.40.16.png](attachment:6023c5bc-cf51-4ee0-967a-d07b1a65379d:스크린샷_2025-05-13_오전_11.40.16.png)

# 코드 분할&지연로딩

### 번들 파일 분석

webpack을 통해 번들링된 파일을 분석하고 최적화 해보자

![스크린샷 2025-05-13 오전 11.52.40.png](attachment:4808e391-3573-48fd-a274-a7ca00bb644f:스크린샷_2025-05-13_오전_11.52.40.png)

화면을 그리는데 필요한 리소스의 다운이 느려지면 다운로드가 완료된 후에나 화면을 그릴 수 있기에 다운로드가 느려지면 롸면도 늦게 뜬다는 문제가 있다.

### 이 때 js 파일을 어떻게 최적화할 수 있을까?

npm에 등록되어 있는 `webpack bundle analyzer`라는 툴을 사용하자

![스크린샷 2025-05-13 오전 11.54.43.png](attachment:2c4c0e22-b336-4e8a-95cd-4f904448d7e9:스크린샷_2025-05-13_오전_11.54.43.png)

![스크린샷 2025-05-13 오전 11.54.52.png](attachment:8e55277c-1516-4f23-ba8d-538b467b7fb6:스크린샷_2025-05-13_오전_11.54.52.png)

이 툴을 사용하려면 webpack 설정을 직업 수정해야 한다. 하지만 CRA로 생성된 프로적트는 wabpack에 대한 설정이 숨겨져 있다.

그래서 webpack 설정을 작접 변경하려면 npm run ejecr 스크립트를 통해 설정 파일들을 추출해야한다.

👉  더 간편하게 번들 사이즈를 분석할 수 있게 도와주는 `cra-bundle-analyzer`라는 툴을 사용하자.

![스크린샷 2025-05-13 오전 11.57.24.png](attachment:8df4ba93-6e87-45c0-8a31-722784b636c9:스크린샷_2025-05-13_오전_11.57.24.png)

![스크린샷 2025-05-13 오전 11.57.43.png](attachment:7cab13c7-a305-4f2f-a298-2b2738b71252:스크린샷_2025-05-13_오전_11.57.43.png)

![스크린샷 2025-05-13 오전 11.58.21.png](attachment:20aa0190-c758-4084-bd6c-65dd45e0f60b:스크린샷_2025-05-13_오전_11.58.21.png)

![스크린샷 2025-05-13 오전 11.58.44.png](attachment:115103f9-6c41-47e2-82af-11aa6a5fcb4e:스크린샷_2025-05-13_오전_11.58.44.png)

👉 위 이미지를 확인해보면 직접 작성한 서비스 코드는 main.chunck .js

- 하위가 module ⇒ npm 을 통해 설치한 외부 라이브러
  - 2.chunck.js라는 이름으로 번들링 됨
  - 내부를 살펴보면 크게 refactor와 react-dom이 매우 큰 비중을 차지하고 있다.
    ![스크린샷 2025-05-13 오후 1.33.26.png](attachment:411398d2-d59d-40a0-9358-7860d342faf1:스크린샷_2025-05-13_오후_1.33.26.png)
    - package.json 을 확인해보면
    - react-syntax-highlighter하는 패키지에서 refactor를 참조하고 있다.
      - 이 패키지는 마크 다운 블록에 스타일을 입히는 데 사용되는 라이브러리이다.
    - src/components/markdown.CodeBlock.js에서 사용하고 있는데, 생각해보면 블로그 글 상세 페이지에서만 필요할 뿐 글 목록 페이지에서는 필요하지 않다.
    👉 사용자가 처음 진입하는 목록 페이지에서 굳이 이 패키지를 다운 받는 것이 아닌, 하나로 합쳐져 있는 이 번들 파일을 페이지 별로 필요한 내용만 분리하여 필요할 때만 따로따로 로드하면 된다.

그렇다면 코드분할 기법을 사용하여 페이지 별로 코드를 분할해 페이지에서 필요한 코드만 따로 로드하도록 하자.

# 코드 분할

하나의 번들 파일을 여러 개의 파일로 쪼개는 방법

![스크린샷 2025-05-13 오후 1.38.08.png](attachment:644cae3f-20ef-4c94-9deb-0453ac230b94:스크린샷_2025-05-13_오후_1.38.08.png)

코드 분할 기법에는 여러 가지 패턴이 있다.

위 예시 처럼 페이지 별로 코드를 분할할 수도 있는 반면, 각 페이지가 공통으로 사용하는 모듈이 많고 그 사이즈가 큰 경우에는 페이지별 분할이 아닌 모듈별 분할을 택한다.

![스크린샷 2025-05-13 오후 1.39.36.png](attachment:b92a2875-9341-4cff-ab70-5921db85ee25:스크린샷_2025-05-13_오후_1.39.36.png)

### 코드 분할 적용하기

👉  가장 좋은 방법은 동적 import를 사용하는 것이다.

![스크린샷 2025-05-13 오후 1.40.24.png](attachment:3f18f998-ab04-4c7f-84be-069b34010dad:스크린샷_2025-05-13_오후_1.40.24.png)

- 이렇게 했을 때 해당 모듈은 빌드시에 함께 번들링된다.

![스크린샷 2025-05-13 오후 1.40.32.png](attachment:6b67eb23-daa7-41b1-a21d-e7a22d4a6c0b:스크린샷_2025-05-13_오후_1.40.32.png)

하지만, 위와 같이 import 문을 사용하면 빌드 때가 아닌 런타임에 해당 모듈을 로드한다

👉 이를 `동적 import` 라고 한다

webpack은 이 `동적 import` 구문을 만나면 코드를 분할하여 번들링한다.

이 `동적 import` 구문은 Promise 형태로 모듈을 반환해 주는데 import 하려는 모듈은 컴포넌트이기에 Promise 밖으로 빼야한다.

👉  **lazy와 Suspense**를 사용해 빼보자.

![스크린샷 2025-05-13 오후 1.42.59.png](attachment:e756d660-4ad6-4982-86e4-a2ba21f197d2:스크린샷_2025-05-13_오후_1.42.59.png)

![스크린샷 2025-05-13 오후 1.43.09.png](attachment:f92bff31-03e3-439d-8ad1-707973809ae6:스크린샷_2025-05-13_오후_1.43.09.png)

- `lazy`는 `동적 import` 의 결과를 인자로 받는다.
- 그렇게 `lazy`가 반환한 값, 즉 import한 컴포넌트는 `Suspense`안에서 렌더링한다.

**_여기서는 페이지 별로 코드를 분할할 예정이므로 Router쪽에서 이 코드를 적용한다._**

![스크린샷 2025-05-13 오후 1.44.47.png](attachment:d703b6fa-09fc-47a3-976f-d4114ab36745:스크린샷_2025-05-13_오후_1.44.47.png)

위와같이 쪼개진 것을 확인할 수 있다.

![스크린샷 2025-05-13 오후 1.45.40.png](attachment:bbdc6a8a-9823-4397-8722-b659c2d29463:스크린샷_2025-05-13_오후_1.45.40.png)

- 0.chunck.js = Listpage에서 사용하는 외부 패키지를 모아 둔 번들 파일(axios)
- 3.chunck.js = ViewPage에서 사용하는 위부 패키지를 모아 둔 번들 파일(react-syntax-highlighter)
- 4.chunck.js = 리엑트 공통 패키지를 모아 둔 번들 파일(react-dom)
- 5.chunck.js = ListPage 컴포넌트 번들 파일
- 6.chunck.js = ViewPage 컴포넌트 번들 파일

# 텍스트 압축

![스크린샷 2025-05-13 오후 3.12.28.png](attachment:9cf11328-8e79-436f-a073-1d1c433c1625:스크린샷_2025-05-13_오후_3.12.28.png)

html, css js 등을 **다운 받기 전 서버에서 미리 압축하여 원래 사이즈보다 더 작은 사이즈로 다운로드하여 웹 페이지를 보다 빠르게 로드시킨다**

압축 여부를 확인하려면 `HTTP 헤더`를 살펴보면 된다.

![스크린샷 2025-05-13 오후 3.14.31.png](attachment:6ef13c64-4bba-447c-a82c-6ea73fdc6f68:스크린샷_2025-05-13_오후_3.14.31.png)

Network article API 항목을 확인해 보면, 응답 헤더에 `Content-Encoding: gzip`라고 되어 있는 것을 볼 수 있는데

👉 **이 리소스가 gzip이라는 방식으로 압축되어 전송되었다는 의미**이다.

그의 반해 응답헤더에 `Content-Encoding: gzip`이 없다면 텍스트 항목이 적용되지 않았다는 의미이다.

![스크린샷 2025-05-13 오후 3.15.08.png](attachment:9013a801-496b-47fc-a03e-e9a6b5fe5a29:스크린샷_2025-05-13_오후_3.15.08.png)

### 텍스트 압축 적용

텍스트 압축은 이 리소스를 제공하는 서버에서 설정해야 한다.

실습에서는 serve라는 라이브러리였는데 해당 명령어를 확인해보면 두가지 옵션이 붙은 것을 볼 수 있다.

![스크린샷 2025-05-13 오후 3.15.55.png](attachment:cc085c08-d5ef-47f3-887b-1bc8b1418743:스크린샷_2025-05-13_오후_3.15.55.png)

![스크린샷 2025-05-13 오후 3.16.39.png](attachment:f1458991-5a7b-484f-b4b2-3b33554bea14:스크린샷_2025-05-13_오후_3.16.39.png)

- help 명령어를 입력해 보면, u/ s옵션 설명을 볼 수 있다.
  - `s`= SPA 서비스를 위해 매칭되지 않은 주소 모두 index.html로 보내겠다는 옵션
  - `u`= 텍스트 압축을 하지 않겠다는 옵션
    👉  이 옵션을 제거하면 텍스트 압축이 적용된다.

# 컴포넌트 지연 로딩

페이지 코드 자체를 분할하는 **대신 단일 넘포넌트를 분할해 컴포넌트가 쓰이는 순간 불러오도록 한다**

# 컴포넌트 사전 로딩

컴포넌트 코드를 분할해 지연 로딩을 적용하면, 첫 화면 진입 시 분할된 코드 중 당장 필요한 코드만 다운로드하기에 첫 화면을 더 빠르게 그릴 수 있게 된다.

하지만 서비스 이용 과정에서 분할 된 컴포넌트를 사용하려고 할 때, **_다운로드 되어 있지 않은 코드를 추가로 다운로드 하는 시간만큼 서비스 이용에 지연이 발생하게 된다._**

👉 이 문제를 해결하기 위해, 코드를 분할해 첫 화면 진입 시에는 다운로드 하지 않지만, 이후 해당 코드가 필요한 시점보다 먼저 코드를 로드해 지연없이 사용할 수 있도록 하는 기법을 `컴포넌트 사전 로딩`이라고 한다.

# 이미지 사전 로딩

이미지도 컴포넌트와 마찬가지로 필요한 시점보다 먼저 다운로드해두고, 필요할 때 바로 이미지를 보여줄 수 있도록 한다.

# 실습

```
https://github.com/oxboxx/frontend-optimization.git

lecture-2

npm run start
npm run server

```

❌ 문제 1

![스크린샷 2025-05-13 오후 3.32.25.png](attachment:4e175134-58d6-452f-95a8-180fb8764b42:스크린샷_2025-05-13_오후_3.32.25.png)

- 이미지가 로드되기 전 이렇게 깨지는 것을 확인할수 있다.
  👉 이미지가 너무 커서 늦게 로드되는 것으로 추측랑 수 있다,

❌ 문제 2

![스크린샷 2025-05-13 오후 3.33.16.png](attachment:f59fa22c-8a87-4663-9277-0a29dfd12d9a:스크린샷_2025-05-13_오후_3.33.16.png)

- 아래 컨텐츠에서 새로운 결과를 보여줄 때 막대가 애니메이션을 통해 변하는데 어딘가 뚝뚝 끊기는 느낌이 난다.

### 👉 이 두 개를 해결해보자.

```
import React, { useState, useEffect, Suspense, lazy } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import InfoTable from "./components/InfoTable";
import SurveyChart from "./components/SurveyChart";
import Footer from "./components/Footer";
// import ImageModal from './components/ImageModal'

// const LazyImageModal = lazy(() => import("./components/ImageModal"));

function App() {
  const [showModal, setShowModal] = useState(false);
  const [LazyImageModal, setLazyImageModal] = useState(null);

  useEffect(() => {
    import("./components/ImageModal").then((ImageModal) => {
      setLazyImageModal(() => ImageModal.default);
    });

    const img = new Image();
    img.src =
      "https://stillmed.olympic.org/media/Photos/2016/08/20/part-1/20-08-2016-Football-Men-01.jpg?interpolation=lanczos-none&resize=*:800";
  }, []);

  return (
    <div className="App">
      <Header />
      <InfoTable />
      <ButtonModal
        onClick={() => {
          setShowModal(true);
        }}
      >
        올림픽 사진 보기
      </ButtonModal>
      <SurveyChart />
      <Footer />
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

const ButtonModal = styled.button`
  border-radius: 30px;
  border: 1px solid #999;
  padding: 12px 30px;
  background: none;
  font-size: 1.1em;
  color: #555;
  outline: none;
  cursor: pointer;
`;

export default App;

```

app 컴포넌트를 보면 화면의 각 영역이 각자의 개별 컴포넌트로 분리되어 있는 것을 볼 수 있다

여기서 확인해야 하는 부분은 imageModal 이다.

처음 showmodal 이라는 state가 false 이기에 화면에 보이지 않지만 true가 되면서 화면에 보이게 된다.

```
import React from 'react'
import styled from 'styled-components'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import btnClose from '../assets/btn-close.png'

const ImageModal = (props) => {
    const images = [
        {
            original: 'https://stillmed.olympic.org/media/Photos/2016/08/20/part-1/20-08-2016-Football-Men-01.jpg?interpolation=lanczos-none&resize=*:800',
            thumbnail: 'https://stillmed.olympic.org/media/Photos/2016/08/20/part-1/20-08-2016-Football-Men-01.jpg?interpolation=lanczos-none&resize=*:150',
        },
        {
            original: 'https://stillmed.olympic.org/media/Photos/2016/08/12/12-08-2016-archery-individual-men-03.jpg?interpolation=lanczos-none&resize=*:800',
            thumbnail: 'https://stillmed.olympic.org/media/Photos/2016/08/12/12-08-2016-archery-individual-men-03.jpg?interpolation=lanczos-none&resize=*:150',
        },
        {
            original: 'https://stillmed.olympic.org/media/Photos/2016/08/20/part-1/20-08-2016-Football-Men-02.jpg?interpolation=lanczos-none&resize=*:800',
            thumbnail: 'https://stillmed.olympic.org/media/Photos/2016/08/20/part-1/20-08-2016-Football-Men-02.jpg?interpolation=lanczos-none&resize=*:150',
        },
        {
            original: 'https://stillmed.olympic.org/media/Photos/2016/08/20/part-2/20-08-2016-Golf-Women-02.jpg?interpolation=lanczos-none&resize=*:800',
            thumbnail: 'https://stillmed.olympic.org/media/Photos/2016/08/20/part-2/20-08-2016-Golf-Women-02.jpg?interpolation=lanczos-none&resize=*:150',
        },
        {
            original: 'https://stillmed.olympic.org/media/Photos/2016/08/14/part-1/14-08-2016-Golf-Individual-Stroke-Play-Men-05.jpg?interpolation=lanczos-none&resize=*:800',
            thumbnail: 'https://stillmed.olympic.org/media/Photos/2016/08/14/part-1/14-08-2016-Golf-Individual-Stroke-Play-Men-05.jpg?interpolation=lanczos-none&resize=*:150',
        },
        {
            original: 'https://stillmed.olympic.org/media/Photos/2016/08/12/12-08-2016-archery-individual-men-02.jpg?interpolation=lanczos-none&resize=*:800',
            thumbnail: 'https://stillmed.olympic.org/media/Photos/2016/08/12/12-08-2016-archery-individual-men-02.jpg?interpolation=lanczos-none&resize=*:150',
        },
        {
            original: 'https://stillmed.olympic.org/media/Photos/2016/08/12/12-08-2016-archery-individual-men-01.jpg?interpolation=lanczos-none&resize=*:800',
            thumbnail: 'https://stillmed.olympic.org/media/Photos/2016/08/12/12-08-2016-archery-individual-men-01.jpg?interpolation=lanczos-none&resize=*:150',
        },
        {
            original: 'https://stillmed.olympic.org/media/Photos/2016/08/20/part-1/20-08-2016-Football-Men-03.jpg?interpolation=lanczos-none&resize=*:800',
            thumbnail: 'https://stillmed.olympic.org/media/Photos/2016/08/20/part-1/20-08-2016-Football-Men-03.jpg?interpolation=lanczos-none&resize=*:150',
        },
    ]

    return (
        <ImageModalWrapper>
            <ImageModalContainer>
                <BtnClose src={btnClose} onClick={props.closeModal} />
                <ModalHeader>올림픽 사진</ModalHeader>
                <Modalbody>
                    <ImageGallery items={images} />
                </Modalbody>
            </ImageModalContainer>
        </ImageModalWrapper>
    )
}

const ImageModalWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    z-index: 200;
`
const ImageModalContainer = styled.div`
    width: 100%;
    max-width: 700px;
    margin: auto;
    overflow: auto;
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    position: relative;
`
const BtnClose = styled.img`
    cursor: pointer;
    position: absolute;
    z-index: 250;
    width: 25px;
    top: 18px;
    right: 15px;
`
const ModalHeader = styled.div`
    width: 100%;
    padding: 20px 10px;
    border-bottom: 1px solid #dddddd;
    color: #333;
    font-size: 1.05em;
    font-weight: 500;
    box-sizing: border-box;
`
const Modalbody = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`

export default ImageModal
```

1. react-image-gallery라는 외부 라이브러리를 사용하고 있다.
   1. 외부 라이브러리를 사용한다는 것은 해당 라이브러리의 사이즈만큼 최종 번들링 된 자바스크립트의 사이즈도 커진다는 것을 의미하고 이는 js를 로드하는데 시간이 오래 걸린다는 뜻입니다.
2. 해당 라이브러리에 이미지 데이터를 넘겨 화면에 표시하고 있다.

```
import React from "react";
import styled from "styled-components";

const Bar = (props) => {
  return (
    <BarWrapper onClick={props.handleClickBar} isSelected={props.isSelected}>
      <BarInfo>
        <Percent>{props.percent}%</Percent>
        <ItemVaue>{props.itemValue}</ItemVaue>
        <Count>{props.count}</Count>
      </BarInfo>
      <BarGraph width={props.percent} isSelected={props.isSelected}></BarGraph>
    </BarWrapper>
  );
};

const BarWrapper = styled.div`
  position: relative;
  margin-bottom: 3px;
  padding: 8px 0;
  background: ${({ isSelected }) => (isSelected ? "#dddddd" : "#f3f3f3")};
`;
const BarInfo = styled.div`
  width: 100%;
  display: flex;
  z-index: 2;
  position: relative;
`;
const Percent = styled.span`
  text-align: right;
  min-width: 70px;
  flex: 0 0 auto;
`;
const ItemVaue = styled.span`
  padding-left: 60px;
  flex: 1 1 0%;
`;
const Count = styled.span`
  padding-right: 20px;
  flex: 0 0 auto;
`;
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

export default Bar;

```

1. styled-components를 이용해 구현한 width/ transition 속성
   1. percent prop에 따라 막대 그래프의 가로 길이를 조절하고 있는데 만약 이 prop이 바뀌면 tranisition 속성에 의해 애니메이션이 일어날 것이다.

# 애니메이션 최적화

위 막대에서 가로길이가 늘어날 때 부드럽게 늘어나는 것이 아닌, 살짝 끊기는 느낌이 있다.

Performance 패널 CPU 설정 ⇒ “6x slowdown”으로 설정하면 더 잘 확인할 수 있다.

![스크린샷 2025-05-14 오전 9.58.32.png](attachment:263be1a7-aa19-4365-aeca-7f39fd0e80c5:스크린샷_2025-05-14_오전_9.58.32.png)

이런 끊김을 `쟁크`라고 한다.

### 애니메이션의 원리

애니메이션은 여러 장의 이미지를 빠르게 전화해 연속된 이미지가 움직이는 것처럼 느껴지게 하는 것이다.

일반적으로 사용하는 디스플레이의 주사율은 60Hz이다. 즉, 1초에 60장의 정지된 화면을 빠르게 보여 준다는 의미이다.

따라서 브라우저도 이에 맞춰 최대 60FPS로 1초에 60장의 화면을 새로 그린다.

그렇다면 막대 그래프 에니메이션에서 `쟁크` 현상이 발생하는 이유도 브라우저가 정상적으로 60FPS로 화면을 그리지 못했기 때문이라 생각해볼 수 있다.

### 리플로우와 리페인트

<aside>
⚙️

`리플로우`

처음 화면이 모두 그려진 후, js로 인해 화면 내 어떤 요소의 너비와 높이가 변경되었다고 하자.

브라우저는 해당 요소의 가로와 세로를 다시 계산하여 변경된 사이즈로 화면을 다시 그릴 것이다.

먼저 요소의 스타일이 변했으므로 CSSOM을 다시 만들어야한다

이후, 변경된 CSSOM을 사용해 새로운 렌더트리를 만든다.

그리고 요소의 가로와 세로가 변경되었으니 레이아웃 단계에서 당연히 요소의 크기와 위치를 다시 고려해야 한다.

그 다음 변경된 화면 구성에 알맞는 색을 칠하고(페인트), 분할된 레이어를 하나로 합성한다(컴포지트)

![스크린샷 2025-05-14 오전 10.06.05.png](attachment:3fb868e0-4d26-4735-b8ad-805074f85005:스크린샷_2025-05-14_오전_10.06.05.png)

</aside>

![스크린샷 2025-05-14 오전 10.06.15.png](attachment:6575553a-9509-4f1f-b4f1-6471eb2a80a9:스크린샷_2025-05-14_오전_10.06.15.png)

<aside>
⚙️

`리페인트`

레이아웃 관련 속성이 아닌 글자색이 변경되었다고 가정하자.

스타일이 변경되었음으로 CSSOM이 생성되고, render tree도 새로 만들어진다.

하지만 레이아웃 단계는 실행되지 않는다. 이후 페인트 단계, 컴포지트 단계를 거치는데 이를 리페인트라고 한다.

![스크린샷 2025-05-14 오전 10.07.47.png](attachment:4eea1f78-6779-417a-ac20-430028745805:스크린샷_2025-05-14_오전_10.07.47.png)

</aside>

### 리플로우와 리페인트를 피하는 방법

👉 `transform/ opacity 속성`을 사용한다.

이런 속성은 별도의 레이어로 분리하고 작업을 GPU에게 위임하여 처리하기에 레이아웃, 페인트 단계를 건너뛰게 된다.

이를 `하드웨어 가속`이라고 한다

### 하드웨어 가속( GPU 가속)

GPU는 그래픽 작업을 하기 위해 만들어진 것으로 화면을 그릴 때 굉장히 빠르다

특정 요소에 하드웨어 가속을 사용하려면 요소를 별도의 레이어로 분리하여 GPU로 보내야한다.

- transform: translate()
  - 처음부터 레이어를 분리하는 것이 아닌 변화가 일어나는 순간 레이어를 분리한다.
- transform: translate3d(), scale3d()
  - 처음부터 레이어를 분리하에 변화에 더욱 빠르게 대처할 수 있다.

![스크린샷 2025-05-14 오전 10.12.40.png](attachment:68f18846-8aa8-471b-a959-92b335155494:스크린샷_2025-05-14_오전_10.12.40.png)

화면을 1/60초 안에 그려서 보여 줘야 하는데 리플로우가 발생해 모든 단계를 다시 밟느라 필요한 화면을 제때 그려내지 못하고 있다

**_그렇다면 어떻게 해야 화면이 갱신되기 전 모든 작업을 마칠 수 있을까?_**

👉 GPU를 활용해 레이아웃, 페인트 단계를 건너뛸 수 있는 transform 속성을 사용한다.

# 컴포넌트 지연로딩

cra-bundle-analyzer 사용해 번들 파일을 분석해보자

```
npm install --save-dev cra-bundle-analyzer
npx cra-bundle-analyer
```

![스크린샷 2025-05-14 오후 12.05.30.png](attachment:84656f2c-32c3-4246-9e32-d5de16a15b9f:스크린샷_2025-05-14_오후_12.05.30.png)

- 2.chunck.js는 react-dom, styled-components 뿐 아니라 react-image-gallery 라이브러리가 담겨 있는 것을 알 수 있다.

### 모달 코드 분리하기

![스크린샷 2025-05-14 오후 12.07.36.png](attachment:ccafca09-d19f-424d-a151-31001ed603e1:스크린샷_2025-05-14_오후_12.07.36.png)

이렇게 하면 정적으로 import 되어서 번들 파일에 함께 포함되었던 ImageModal 컴포넌트와 그 안에서 사용하고 있는 react-image-gallery 라이브러리가 청크 파일에서 분리된다.

![스크린샷 2025-05-14 오후 12.08.58.png](attachment:576b1f2e-ef8a-45ec-b89b-51e8be224f1b:스크린샷_2025-05-14_오후_12.08.58.png)

![스크린샷 2025-05-14 오후 12.09.26.png](attachment:96cf2fd9-0d15-4e54-b265-fe8a084d0cf6:스크린샷_2025-05-14_오후_12.09.26.png)

# 컴포넌트 사전 로딩

지연로딩을 사용하면 모달이 뜨기까지 약간의 지연이 발생하는 것을 확인할 수 있다.

![스크린샷 2025-05-14 오후 12.09.55.png](attachment:088cdf76-347d-46b6-a512-8c106584ce89:스크린샷_2025-05-14_오후_12.09.55.png)

![스크린샷 2025-05-14 오후 12.10.08.png](attachment:c74d0cd8-42a9-43e4-ba2b-86cb65e91e0e:스크린샷_2025-05-14_오후_12.10.08.png)

👉 `사전 로딩 기법`을 사용해 이를 해결하자

![스크린샷 2025-05-14 오후 12.11.30.png](attachment:a8285992-070b-477a-9cdb-7d247d2897bd:스크린샷_2025-05-14_오후_12.11.30.png)

사용자가 버튼을 클릭하기 전에 미리 모달 코드를 로드해두면 빠르게 모달을 띄울 수 있을 것이다.

하지만, 사용자가 버튼을 언제 클릭할지 모르니 모달 코드를 언제 미리 로드해 둘지 정하기 애매해진다.

### 컴포넌트 사전 로딩 타이밍

1. 버튼을 클릭하기 위해선 선행적으로 마우스를 버튼 위에 올려 두어야 한다

   ![스크린샷 2025-05-14 오후 12.14.03.png](attachment:e4a4cbee-2cc8-4af4-baad-17475b334e0e:스크린샷_2025-05-14_오후_12.14.03.png)

2. 모든 컴포넌트가 마운트된 후

   ![스크린샷 2025-05-14 오후 12.15.09.png](attachment:206ad891-1de6-4b39-af3f-d636066f1815:스크린샷_2025-05-14_오후_12.15.09.png)

# 이미지 사전 로딩

컴포넌트는 import 를 사용해 로드했는데, 이미지는 이미지가 화면에 그려지는 시점, 즉 HTML/CSS에서 이미지를 사용하는 시점에 로드된다.

👉 이런 경우 `JS로 이미지를 직접 로드하는 방법`을 사용한다.

![스크린샷 2025-05-14 오후 12.17.23.png](attachment:f42c6f62-f223-4283-98e5-53e66c8a3757:스크린샷_2025-05-14_오후_12.17.23.png)

이 때 주의해야할 점은 이 테스트를 할 때 “Disable cache” 옵션을 체크 해제해야한다.

이미지 사전 로딩이 가능한 이유는 이미지를 로드할 때 브라우저가 해당 이미지를 캐싱해 두기 때문이다. 하지만 이 옵션이 체크되어 있으면 이미지 리소스에 대해 캐시를 하지 않아 매번 새로 불러오게 된다. 하지만, 캐시를 활성화하면 다른 리소스도 캐시를 사용하므로 정확한 분석이 어려워질 수 있다. 따라서 새로고침시 일반 새로고침이 아닌 캐시 비우기 새로 고침을 해야 한다

![스크린샷 2025-05-14 오후 12.20.30.png](attachment:c2e3bd48-4ba3-451c-90e0-a936f86a84d9:스크린샷_2025-05-14_오후_12.20.30.png)

`이미지를 사전 로딩할 때, 몇장의 이미지를 사전 로드해 둘 것인가도 고민해보아야 한다.`
