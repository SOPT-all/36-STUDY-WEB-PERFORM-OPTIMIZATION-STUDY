우리는 웹 서비스에 매우 다양한 이미지를 사용한다.

- 너무 큰 사이지의 이미지는 네트워크 트래픽 증가
  👉 서비스 로딩 시간 up
- 너무 작은 사이즈의 이미지
  👉  화질 저하

# Chrome 개발자 도구

### Network 패널

![스크린샷 2025-05-07 오후 1.09.47.png](attachment:78ffde7c-9ae2-4f71-8ddb-8248c037cfcf:스크린샷_2025-05-07_오후_1.09.47.png)

- 어떤 리소스가 어떤 시점에 로드되는지 해당 리소스의 크기를 알아낼 수 있다.

### Performance 패널

![스크린샷 2025-05-07 오후 1.12.06.png](attachment:e32a4723-b09e-44ea-b46a-2e7c53bd3207:스크린샷_2025-05-07_오후_1.12.06.png)

- 웹 페이지가 로드될 때, 실행되는 모든 작업을 보여준다.
- Network 패널에서 봤던 리소스가 로드되는 타이밍, 브라우저의 메인 스레드에서 실행되는 js를 차례로 볼 수 있다.
  👉  어떤 js 가 느린지 확인할 수 있다

### Lighthouse 패널

![스크린샷 2025-05-07 오후 1.12.16.png](attachment:8eaab871-c830-4854-95ef-b357b162d5a0:스크린샷_2025-05-07_오후_1.12.16.png)

- 웹 사이트의 성능 측정, 개선 방향을 제시해주는 자동화 툴이다.

### webpack-bundle-analyzer

![스크린샷 2025-05-07 오후 2.47.07.png](attachment:d03c82e9-4c3e-465e-935b-457e1c20b907:스크린샷_2025-05-07_오후_2.47.07.png)

- 크롬 개발자 도구에 있는 툴이 아닌, 직접 설치해야 한다.
- webpack을 통해 번들링된 파일이 어떤 코드 즉 어떤 라이브러리를 담고 있는지 보여준다.
- 이 툴을 통해 어떤 번들 파일 중 불필요한 코드가 어떤 코드이고, 번들 파일에서 어느 정도의 비중을 차지하고 있는지 확인 가능하다.

# 코드 다운 및 실행

```jsx
 git clone https://github.com/performance-letcure-1.gif
```

```jsx
npm run start
npm run server
```

# Lighthouse 툴을 이용한 페이지 검사

![스크린샷 2025-05-07 오후 1.57.34.png](attachment:1e3ff07e-1da2-4b26-b400-f77805e6b3ad:스크린샷_2025-05-07_오후_1.57.34.png)

### `Mode`

- Navigation = 초기 페이지 로딩 시 발생하는 성능 문제를 분석
- Timespan = 사용자가 정의한 시간 동안 발생하는 성능 문제를 분석
- Snapshot = 현재 상태의 성능 문제를 분석

### `Category`

- Performance = 웹 페이지의 로딩 과정에서 발생하는 성능 문제를 분석
- Accessibillity = 서비스의 사용자 접근석 문제를 분석
- Best practices = 웹 사이트의 보안 측면과 웹 개발의 최신 표준에 중점을 두고 분석
- SEO = 검색 엔진에서 얼마나 잘 크롤링되고 검색 결과에 표시되는지 분석
- Progressive Web App = 서비스 워커와 오프라인 동작 등, PWA와 관련된 문제를 분석

위 이미지와 같이 선택 후, `Analyze page load` 를 클릭한다.

## Lighthouse 검사 결과

![스크린샷 2025-05-07 오후 2.11.46.png](attachment:9ed9f2c1-cc04-43c2-b577-7e4691529f76:스크린샷_2025-05-07_오후_2.11.46.png)

![스크린샷 2025-05-07 오후 2.12.02.png](attachment:176d7bdd-6452-4135-87ac-4b0c92ecd6ef:스크린샷_2025-05-07_오후_2.12.02.png)

### Web Vitals

- `First Contentful Paint(FCP)`
  - 페이지가 로드될 때 **브라우저가 DOM 콘텐츠의 첫 번째 부분을 렌더링하는데 걸리는 시간**에 관한 지표
  - 10%의 가중치를 가진다.
- `Speed Index(SI)`
  - 페이지가 로드 중 **컨텐츠가 시각적으로 표시되는 속도**를 나타내는 지표
    ![스크린샷 2025-05-07 오후 2.14.29.png](attachment:585e8833-6104-486a-800b-f23dbdc96ea4:스크린샷_2025-05-07_오후_2.14.29.png)
    - A페이지의 일부 컨텐츠가 B페이지보다 먼저 떴음을 알 수 있는데, 이런 경우 A가 B보다 전체적으로 더 빨리 로드된 것으로 계산되며, 더 높은 점수를 받는다.
  - 10%의 가중치를 가진다.
- `Largest Contentful Paint(LCP)`
  - 페이지가 화면에 로드될 때 화면 내 **가장 큰 이미지나 텍스트 요소가 렌더링 되기까지 걸리는 시간**을 나타내는 지표
  - 25%의 가중치를 가진다.
- `Time to Interactice(TTI)`
  - **사용자와 페이지가 상호 작용이 가능한 시점**까지 걸리는 시간을 나타내는 지표
  - 10%의 가중치를 가진다.
- `Total Blocking Time(TBT)`
  - FCP와 TTI 사이의 시간 동안 일어나며, **페이지가 클릭 키보드 입력 등의 사용자 입력에 응답하지 않도록 차단된 시간을 총합**한 지표
    - 메인 스레드를 독점하여 다른 동작을 방해하는 작업에 걸린 시간을 총합
  - 30%의 가중치를 가진다.
- `Cumulative Layout Shif(CLS)`
  - 페이지 로드 과정에서 발생한 **예기치 못한 레이아웃 이동**을 측정한 지표
    👉  레이아웃 이동 = 화면상에서 요소의 위치나 크기가 순간적으로 변하는 것을 말한다.
  - 15%의 가중치를 가진다.

### Opportunities /Diagnostics 섹션

![스크린샷 2025-05-07 오후 2.20.29.png](attachment:cdfbedc8-ec81-4fdc-af46-17b5a5875c10:스크린샷_2025-05-07_오후_2.20.29.png)

- Opportunities 섹션
  - 페이지를 더욱 빨리 로드하는 데 도움이 되는 제안한다.
- Diagnostics 섹션
  - 로드 속도와 직접적인 관계는 없지만 성능과 관련된 기타 정보를 보여준다.

### 검사 환경

![스크린샷 2025-05-07 오후 2.22.18.png](attachment:aeddbc19-0cda-4f6b-8c9a-4534d5edca06:스크린샷_2025-05-07_오후_2.22.18.png)

![스크린샷 2025-05-07 오후 2.22.33.png](attachment:5efbdf99-6332-4e22-b7c0-ba1be2e6086f:스크린샷_2025-05-07_오후_2.22.33.png)

`CPU throttling`

- CPU 성능을 어느 정도 제한하여 검사를 진행하였는지 나타낸다.
- 1x = CPU 성능에 제한을 두지 않았다.
- 4x = Desktop이 아닌 Mobile로 선택했다면 4x가 나왔을 것이다.

![스크린샷 2025-05-07 오후 2.22.47.png](attachment:ed155d04-ec72-4485-8f18-eaaf1f54dbee:스크린샷_2025-05-07_오후_2.22.47.png)

`Network throttling`

- 네트워크 성능을 제한하여 어느 정도 고정된 네트워크 환경에서 성능을 측정했다는 의미이다.

# 이미지 사이즈 최적화

![스크린샷 2025-05-07 오후 2.26.07.png](attachment:e9d0ff47-9cc9-47f7-965b-6564e3a31490:스크린샷_2025-05-07_오후_2.26.07.png)

- Opportunties에서 이미지를 적절한 사이즈로 사용하도록 제안하고 있다.

해당 element로 이동해보자.

![스크린샷 2025-05-07 오후 2.27.01.png](attachment:0c2083e0-a803-4787-8114-e35f8471296f:스크린샷_2025-05-07_오후_2.27.01.png)

<aside>
💡

**`Intrinsic size`** = 실제 이미지 사이즈

**`Rendered size` =** 화면에 그려지는 사이즈

</aside>

### 큰 사이즈의 이미지를 사용해도 4518 x 3388 px로 표시하지 못한다면 처음부터 `rendered size`로 만들어 사용하는 것이 적절할까?

👉 틀린 말은 아니지만 요즘 사용되는 디스플레이는 같은 공간(픽셀)에 더 많은 픽셀을 그릴 수 있기에 **너비의 두 배 정도 큰 이미지**를 사용하는 것이 적절하다.

### 그럼 어떻게 줄일까?

![스크린샷 2025-05-07 오후 2.31.18.png](attachment:31e3f1d1-6f67-463d-8805-915b7c70ff03:스크린샷_2025-05-07_오후_2.31.18.png)

- 자체적으로 가지고 있는 정적 이미지라면 사진 편집 툴을 사용해 직접 이미지 사이즈를 조절하면 된다.
- 하지만, 이렇게 api를 통해 받아오는 경우에는 **`CDN`**을 사용한다

## 이미지 CDN

<aside>
⚙️

`CDN` = client 와 가까운 곳에 컨텐츠 서버를 두는 기법

![스크린샷 2025-05-07 오후 2.32.56.png](attachment:682dd932-b8cb-440d-86dc-b7149513bc8f:스크린샷_2025-05-07_오후_2.32.56.png)

- 미국에 있는 서버를 미리 한국으로 복사해 두고, 사용자가 이미지를 다운로드 하려고 할 때 미국 서버가 아닌 한국 서버에서 다운로드 하도록 하는 것이다.
- 그러면 물리적 거리가 어느 정도 해소가 됐으니 다운로드에 걸리는 시간도 단축될 것이다.
</aside>

**`이미지 CDN`**은 기본적 `CDN`기능과 더불어 **이미지를 사용자에게 보내기 전에 특정 형태로 가공하여 전해주는 기능**이 있다.

- 예를 들어 이미지 사이즈를 줄이거나 특정 포멧으로 변경하는 등의 작업
  ![스크린샷 2025-05-07 오후 2.35.13.png](attachment:f84a81b1-5acc-4dd7-a78f-7ac07b308caf:스크린샷_2025-05-07_오후_2.35.13.png)

`이미지 CDN` 의 주소 체계

![스크린샷 2025-05-07 오후 2.36.08.png](attachment:8cc470ba-c80c-4667-9929-dece94b1e116:스크린샷_2025-05-07_오후_2.36.08.png)

이런 `이미지 CDN`을 자체적으로 만들어 사용할 수도 있지만, 하지만 이런 블로그 서비스에선 이미지 cdn 을 직접 만들지 않는다.

### 👉 **`Imgix`**와 같은 `이미지 CDN` 솔루션을 사용할 수 있다.

`Imgix의 주소`의 주소 체계

```
https://assets.imgix.net/hp/snowshoe.jpg?w=900&h=600&fit=crop
```

```jsx
//Article/index.js
import React from 'react'

import './index.css'

function zeroPad(value, len) {
..
}

/* 파라미터 참고: https://unsplash.com/documentation#supported-parameters */
function getParametersForUnsplash({width, height, quality, format}) {
  return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`
}

function removeSpecialCharacter(str) {
//
}

function Article(props) {
  const createdTime = new Date(props.createdTime)
  return (
    ,,
      <div className={'Article__thumbnail'}>
        <img src={props.image +
        getParametersForUnsplash(
	        {
		        width: 1200,
		        height: 1200,
		        quality: 80,
		        format: 'jpg'
		       }
	        )
	       } alt="thumbnail" />
      </div>
    </div>
  )
}

export default Article

```

- `getParametersForUnsplash` 의 인자를 보면 `width, height`가 1200이다. 그러니까 `props.image`는 API를 통해 전달된 이미지이고, 여기서 설정된 `width, height`를 통해 이미지의 사이즈가 결정된다고 볼 수 있다.

<aside>
⚙️

실제 API 로 전달된 props.image 값은 Unsplash 서비스의 이미지를 사용하고 있으며,

- getParametersForUnsplash 함수에서 반환하는 쿼리스트링을 붙혀

```
https://images.unsplash.com/photo-1212121-12121212f6?w=900&h=600&fm=jpg&fit=crop
```

- 위와 같은 형태로 이미지를 가공하여 전달받을 수 있게 된다.

즉 이 Unsplash가 일종의 `CDN`의 역할을 하고 있는 것이다.

</aside>

## 적절한 이미지 사이즈로 최적화

`getParametersForUnsplash` 함수로 전달되는 width, height를 적절하게 변경한다.
