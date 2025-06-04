## 동영상 콘텐츠 분석

network 패널 긹에서 → 이미지처럼 하나의 요청을 모든 영상을 다운 x

파일 크기가 커서, 당장 재생이 필요한 앞부분부터 먼저 다운로드 한 뒤에 순차적으로 나머지 다운!

But 문제,, 여전히 용량이 너무 커서 다운받는 시간이 일정 이상 걸리고, 무게도 꽤 나감

## 동영상 압축

### \*\* 동영상 사이즈를 줄여보자! == 화질을 낮추는 작업

메인 컨텐츠가 동영상이 아닐 경우에만 추천!

### ✅ [Media.io](http://Media.io) 서비스 ⇒ 무려 1/5까지 줄일 수 있음!

- webM으로 파일 확장자 선택 (구글에서 개발한 영상 포맷)
- Bitrate는 제일 낮은 512kbps로 설정
- audio는 체크 해제

### ✅ 압축된 동영상 적용

파일이름에 \_ 붙여서 assets로 넣어주기

우리 앞에서 이미지 최적화해서 webP 쓸 때 브라우저 호환성 위해 picture 태그!

마찬가지로 webM 쓸 때는 호환성을 위해 video 태그 사용! (webM지원 안하는 곳은 mp4로 알아서 재생)

### ✅ 화질을 조금이라도 개선하고 싶다면?

\***\* 패턴과 필터 이용하기**

동영상 위해 패턴이나 필터 넣으면 → 그거에 가려져서 동영상 화질 저하를 눈치채지 못함ㅋㅋ

- blur 효과!
  `filter : blur(10px)` 처리해주면 영상이 흐려지면서, 배경으로 가볍게 사용 ㄱㄴ

## 폰트 최적화

fast3G로 새로고침해보면 → 텍스트가 나중에야 뒤늦게 변함

텍스트가 보이는 시점에 다운로드가 완료되지 않아서 생기는 문제!

어떻게 해결할까?

### ✅ FOUT, FOIT

폰트의 변화로 발생하는 이 현상을 FOUT, FOIT라고 함!

- **FOUT**
  먼저 텍스트를 보여준 후에 다운로드 다 되면 그제서야 적용! (엣지)
- **FOIT**
  폰트가 완전히 다운로드 될때까지 텍스트를 보여주지 않음 (사파리, 크롬)
  - 3초 FOIT도 있음 ㅋㅋ
    3초 동안 텍스트 없이 폰트 다운 기다리다가, 3초 넘어가면 그냥 우선 기본 포트로 보여줌!

![image.png](attachment:1fe876d3-49b8-459c-bf16-c2b4e2f5db30:image.png)

### ✅ 폰트 최적화 방법

### 1. 폰트 적용 시점 제어하기

중요한 텍스트 (뉴스 제목) 이면 → FOIT 방식은 안 좋을 수 있음

근데 꼭 전달안해도 되는 텍스트는 → FOUT 방식 했다가 오히려 폰트변화로 시선을 분산하는 문제

- CSS 속성 사용하기 : `font-display` 속성

  - auto : 브라우저 기본 동작
  - block : FOIT (timeout = 3s)
  - swap : FOUT 방식
  - fallback : FOIT (timeout = 0.1s) (3초 지나면 기본 폰트로 유지하다가 그냥 냅둠)
  - optional : FOIT (timeout = 0.1s) (네트워크 상태에 따라 기본 폰트로 유지하다가 이후에 캐시)

  fallback과 optional 차이 : 그냥 몇 초까지 기다리냐 차이, 근데 fallback은 3초후에도 다운안되면 이후에 다운로드 되더라고 폰트 적용 x

- 해당 실습의 텍스트 특징 : 중요한게 아님, 빠르게 보여줄 필요도 없음
  ⇒ FOIT 방식으로 나중에 적용해서 한번에 보여주자~!
  ⇒ 근데 갑자기 나타나서 좀 어색할 수 있듬
  ⇒ 이건 그럼? Fade-In 효과 처리해버리자~~
  ⇒ 그럼 폰트 적용된 시점을 알아야지 fadeIn 처리 가능
- **폰트 적용시점 : fontfaceobserver 활용!**
  폰트 BMYEONSUNG을 observe 하자
  ```jsx
  import FontFaceObserver from "fontfaceobserver";

  const font = new FontFaceObserver("BMYEONSUNG");

  function BannerVideo() {
    useEffect(() => {
      font.load(null, 2000).then(function () {
        console.log("BMYEONSUNG has loaded");
        setIsFontLoaded(true);
      });
    }, []);
  }
  // isFonted가 true이면 이제 다 로드된거임!
  ```
  로드 상태에 따라서 transition과 opacity 조절해주면 됨

### 2. 폰트 파일 크기 줄이기

파일 크기 자체를 줄여서! 다운로드 시간을 단축하면 됨

**✅ 방법1. 압축률 좋은 포맷 사용하기**

흔히 주로 TTF, OTF 포맷을 사용함! 현재 홈피에 적용되어 있는 폰트도 TTF 포맷

TTF ⇒ 얘 근데 파일 크기 개큼 (매번 리소스 다운 받아야 하는 웹에선 안 좋음)

WOFF ⇒ 웹을 위한 폰트, TTF를 압축하여 웹에서 더욱 빠르게 로드될 수 있도록 만듦

![image.png](attachment:4c6963de-0ede-40fa-8803-0d5d44ab3791:image.png)

WOFF와 WOFF2에도 호환성 문제가 있으니까

WOFF2 우선 적용하고 → WOFF → TTF 순으로 적용

**✅ 방법2. 폰트 파일 크기**

### 방법2.
