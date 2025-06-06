# 성능 최적화란 무엇인가?

## 개요

성능 최적화는 웹 페이지 및 애플리케이션의 로딩 속도, 반응성, 시각적 안정성을 개선하여 사용자의 경험을 향상시키는 과정입니다. 

빠르고 부드러운 인터랙션은 사용자 만족도를 높이고 이탈률을 낮추며 비즈니스 성과에 직결됩니다.

프론트엔드 기술이 발전하면서, 단순히 새로운 기능을 빠르게 도입하는 것뿐만 아니라 '성능' 자체가 사용자 경험과 비즈니스 성과에 미치는 영향이 매우 커졌습니다. 

실제로 구글은 "성능이 저하되면 사용자가 떠나고 매출이 감소한다"고 강조합니다. 

예를 들어, 페이지 표시 시간이 1초에서 3초로 늘어나면 사용자 이탈률이 32% 증가하고, 10초까지 늘어나면 123%까지 증가합니다. **반대로 핀터레스트는 로딩 시간을 40% 줄여 가입자 수를 15% 늘렸고**, **COOK은 평균 페이지 로드를 850ms로 줄여 이탈률을 7% 감소시켰습니다.**

즉, 성능 최적화는 단순한 기술적 개선을 넘어, 서비스의 성공과 직결되는 핵심 전략입니다.

## 1. 사용자 경험과 성능의 관계

웹 성능은 사용자가 콘텐츠에 도달하고 상호작용하는 속도와 품질을 결정합니다.

첫 화면 노출 지연은 곧바로 이탈률 증가로 이어집니다. 실제로 페이지 표시 시간(**로딩 시간**)이 1초에서 5초로 늘어나면 이탈률이 90%까지 증가합니다.

버튼 클릭, 스크롤 등 사용자 액션에 즉각적(**반응성**)으로 반응해야 합니다. 느린 반응은 사용자의 불만족을 유발합니다.

레이아웃 이동 없이 콘텐츠가 예측 가능(**시각 안정성**)하게 표시되어야 합니다. 즉, 예기치 않은 레이아웃 이동은 신뢰도를 떨어뜨립니다.

이처럼 웹 성능은 UX(사용자 경험), 전환율, 이탈률 등 서비스의 핵심 지표와 밀접하게 연결되어 있습니다.

## 2. Core Web Vitals 및 주요 성능 지표

Google이 제시한 주요 웹 성능 지표는 실제 사용자 환경을 기반으로 측정됩니다. 이는 단순한 속도만이 아니라 사용자가 페이지를 '**얼마나 빨리 볼 수 있고**', '**얼마나 빨리 조작할 수 있으며**', '**얼마나 안정적으로 보이는가**'를 종합적으로 평가합니다. 

Lighthouse 등에서 측정하는 대표적인 지표들을 알아보겠습니다.

아래 여섯 가지 지표(metrics)에 가중치를 적용해 평균 낸 점수로 종합 성능을 측정하며, 이러한 지표를 웹 바이탈(Web Vitals)이라고 부릅니다.

- **FCP (First Contentful Paint, 첫 콘텐츠 표시)**  
     페이지가 로드될 때 브라우저가 DOM 콘텐츠의 첫 번째 부분을 렌더링하는 데 걸리는 시간입니다. 
     FCP가 1.4초라면, 사용자가 페이지에 진입해 첫 텍스트나 이미지를 1.4초 만에 볼 수 있다는 의미입니다. (가중치 10%)

- **SI (Speed Index, 속도 지수)**  
  페이지가 시각적으로 얼마나 빠르게 표시되는지를 나타냅니다. 
  예를 들어 A페이지와 B페이지가 모두 4초 만에 완전히 로드되더라도, A페이지가 더 빨리 일부 콘텐츠를 보여주면 SI 점수가 더 높아집니다. (가중치 10%)

- **LCP (Largest Contentful Paint, 최대 콘텐츠 표시)**  
  화면 내에서 가장 큰 이미지나 텍스트 요소가 렌더링될 때까지 걸리는 시간입니다. 
  LCP가 2.1초라면, 가장 중요한 콘텐츠가 2.1초 만에 사용자에게 표시된다는 뜻입니다. (가중치 25%)

- **TTI (Time to Interactive, 상호작용 가능 시점)**  
  사용자가 페이지와 상호작용(클릭, 키보드 입력 등)할 수 있을 때까지 걸리는 시간입니다. 이 시점 전에는 화면이 보이더라도 버튼 클릭 등이 동작하지 않을 수 있습니다. (가중치 10%)

- **TBT (Total Blocking Time, 총 차단 시간)**  
  페이지가 사용자 입력에 응답하지 못한 시간의 총합입니다. 
  FCP와 TTI 사이에 메인 스레드가 자바스크립트 실행 등으로 막혀 있을 때의 누적 시간입니다. (가중치 30%)

- **CLS (Cumulative Layout Shift, 누적 레이아웃 이동)**  
  페이지가 로드되는 과정에서 발생하는 예기치 못한 레이아웃 이동의 누적 값입니다. 
  예를 들어 이미지나 광고가 늦게 로드되어 버튼 위치가 갑자기 바뀌는 현상이 대표적입니다. (가중치 15%)

해당 지표들은 실제 서비스에서 다음과 같이 활용됩니다.

- **LCP, FCP**가 느리면 사용자는 "페이지가 안 뜬다"고 느끼고 이탈률이 급증

- **TBT, TTI**가 높으면 버튼 클릭, 입력 등 상호작용이 느려져 불만족 증가

- **CLS**가 높으면 사용자가 잘못된 버튼을 누르는 등 UX가 심각하게 저하

## 3. 성능 측정 및 분석 도구

웹 성능을 측정하고 분석하기 위한 다양한 도구가 있습니다.

- **Chrome DevTools**
  - *Network 패널*
    - 리소스 로드 타이밍, 크기, 요청 순서 등 네트워크 트래픽을 상세하게 분석합니다.
  - *Performance 패널*
    - 페이지 로드 및 자바스크립트 실행 과정을 타임라인으로 시각화하여 병목 구간을 파악할 수 있습니다.

  - *Lighthouse 패널*
    - 성능, 접근성, SEO 등 종합 리포트를 자동으로 생성하며, 개선 가이드도 함께 제공합니다.

- **WebPageTest**
  - 다양한 위치와 브라우저 환경에서 웹 페이지의 성능을 측정할 수 있습니다.

- **webpack-bundle-analyzer**
  - 번들 파일 내 불필요한 코드와 라이브러리의 비중을 시각화하여 코드 분할 및 최적화에 도움을 줍니다.

#### 최적화 실습
- **이미지 사이즈 최적화**
  -  불필요하게 큰 이미지를 적정 크기로 줄이고, WebP 등 최신 포맷 활용

- **코드 분할**
  - React 등 SPA에서 필요 시점에만 코드를 로드하도록 분할

- **텍스트 압축**
  -  HTML, CSS, JS 파일을 서버에서 압축하여 전송
  - 원래 사이즈보다 더 작은 사이즈로 다운로드할 수 있어 웹 페이지 로딩 시간을 단축 가능

- **병목 코드 최적화**
  - Performance 패널로 느린 자바스크립트 코드 탐지 및 개선

---

## 4. Lighthouse 툴을 이용한 페이지 검사

- Lighthouse의 사용법 
  - Mode는 기본 값인 'Navigation'으로 설정
  - Categories 항목에서 원하는 검사 주제를 선택
  - Device 항목은 모바일 환경으로 검사할지, 데스크톱 환경으로 검사할지 결정
  - 'Mobile'을 선택하면, Lighthouse는 모바일 사이즈의 화면에서 좀 더 느린 CPU와 네트워크 환경으로 검사를 진행(PC 환경에서의  분석은 'Desktop'을 선택)

---

## View Original Trace

UI가 변경되었다..

- Lighthouse 12.0.0(Chrome 126)부터 레포트 하단이 아니라 상단 우측의 더보기(⋮) 메뉴(Topbar dropdown)로 버튼이 이동
- 메뉴 이름도 “View Original Trace”에서 “View Unthrottled Trace” 변경
