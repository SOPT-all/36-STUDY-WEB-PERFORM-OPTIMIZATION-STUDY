## 동영상 콘텐츠 분석

network 패널 긹에서 → 이미지처럼 하나의 요청을 모든 영상을 다운 x

파일 크기가 커서, 당장 재생이 필요한 앞부분부터 먼저 다운로드 한 뒤에 순차적으로 나머지 다운!

But 문제,, 여전히 용량이 너무 커서 다운받는 시간이 일정 이상 걸리고, 무게도 꽤 나감

## 동영상 압축

### ** 동영상 사이즈를 줄여보자! == 화질을 낮추는 작업

메인 컨텐츠가 동영상이 아닐 경우에만 추천!

### ✅ [Media.io](http://Media.io) 서비스 ⇒ 무려 1/5까지 줄일 수 있음!

- webM으로 파일 확장자 선택 (구글에서 개발한 영상 포맷)
- Bitrate는 제일 낮은 512kbps로 설정
- audio는 체크 해제

### ✅ 압축된 동영상 적용

파일이름에 _ 붙여서 assets로 넣어주기

우리 앞에서 이미지 최적화해서 webP 쓸 때 브라우저 호환성 위해 picture 태그!

마찬가지로 webM 쓸 때는 호환성을 위해 video 태그 사용! (webM지원 안하는 곳은 mp4로 알아서 재생)

### ✅ 화질을 조금이라도 개선하고 싶다면?

**** 패턴과 필터 이용하기**

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

근데 꼭 전달안해도 되는 텍스트는 →  FOUT 방식 했다가 오히려 폰트변화로 시선을 분산하는 문제

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
    import FontFaceObserver from 'fontfaceobserver'
    
    const font = new FontFaceObserver('BMYEONSUNG')
    
    function BannerVideo() {
    	useEffect (() => {
    		font.load(null,2000).then(function(){
    			console.log('BMYEONSUNG has loaded')
    			setIsFontLoaded(true)
    		})
    	},[])
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

**Transfonter 사이트 ⇒ 변환하면 됨!** 

**✅ 방법2. 서브셋 폰트 사용**

그래도 꽤 무게가 나감,, 스타일에 대한 모든 정보를 가지고 있다보니…

⇒ 근데 이 전체 정보는 필요 없. 걍 해당 문자에서만 쓰이는 폰트 정보만 가지고 있으면 됨!

![image.png](attachment:3e498487-6727-43d7-9c26-53e7cd98ab70:image.png)

서브셋 폰트는! 일부 문자의 폰트 정보만 가지고 있는 걸 말함

**Transfonter 사이트 ⇒ 여기서 또 가능함! characters에 폰트 적용할 문자를 넣으면 서브셋 폰트 추출됨**

**✅ 방법3. Data-URI형태로 css 파일에 포함**

문자열데이터 형태로, 인라인 삽입해버리기~ Data-URI상태로 만들어서 app.css에 넣어둠

Base64 encode옵션으로 Data-URI 형태로 추출! 

**transfonter로 WOFF2파일 업로드 → Formats에서 WOFF2선택 → Base64 encode를 ON**

⇒ 최종적으로 stylesheet.css 파일을 텍스트 에디터로 열어줌 ! 문자열로 들어가있는겨 이젠

## 캐시 최적화

lighthouse 검사하면 Diagnostics 섹션에서 `“Serve static assets with an efficient cache policy”`

== 리소스에 캐시 적용하란 말씀!

Cache-control이란 헤더가 없는걸 알 수 있음 (npm run start 로 실행한 건 캐시 설정 x)

### 캐시란?

자주 사용하는 데이터나 값을 미리 임시 저장 (최초에만 다운해서 캐시에 저장해두고, 그 이후는 그거 씀)

- **종류 (네트워크 패널에서 볼 수 있듬 : Disable cache 설정을 꺼야 확인 ㄱㄴ)**
    1. 메모리 캐시 : 메모리에 저장하는 방식 ex) RAM
    2. 디스크 캐시 : 파일 형태로 디스크에 저장
    
    ![image.png](attachment:f1f88498-b9bf-4230-88d2-d4e534dc8bd1:image.png)
    

### Cache-Control

리소스의 응답 헤더에 설정되는 헤더로, 어떻게 얼마나 캐시 적용하는 지 판단함!

- **조합**
1. no-cache : 캐시 사용하기 전에 서버 검사 후에 사용! (서버에 캐시된 리소스 사용 확인먼저 )
2. no-store : 캐시 사용 안함 
3. public : 모든 환경에서 캐시 사용 가능 
4. private : 브라우저 환경에서만 캐시 사용 가능 (외부 캐시 서버는 x)
5. max-age : 캐시의 유효 기간

`public` 이랑 `private` 은 max-age에서 설정한 시간만큼은 서버한테 묻지 않고, 그냥 캐시 리소스 바로 사용함! 유효 시간 지났으면 다시 서버에 묻고 그 시간 안에 또 사용

(이때, 둘의 차이는! 브라우저와 웹 서버 사이에 있는 중간 캐시 서버에서도 캐시를 적용할지 말지)

(적용하지 않으면 `private` )

(max-age는 초단위로 얼마나 오래 캐시 사용할지!)

ex) `Cache-control : max-age = 60` 

1분동안 캐시 사용하고 기본값 public으로 모든환경에서 !

ex) `Cache-control : public, max-age=0`

no-cache와 동일 상태로, 0초라는게 결국 바로 만료되는 상태니까,, 매번 서버에 캐시 사용 물어봄

### 캐시 적용

그럼 cache-control 어케 적용하냐?

리액트는 서버가 아니니까,, 캐시 설정을 위한 노드 서버 : `npm run serve` 실행

(이때, serve 스크립트 실행전에 `npm run build` 는 반드시!)

setHeaders함수에서! 지정해주면 됨!

```jsx
const header = {
	setHeaders : (res,path) => {
		res.setHeader('Cache-Control', 'max-age=10')
	}
}
```

일정 유효 시간 지나면 → 다시 서버한테 확인 받음

서비스의 리소스가 만약 변화가 없어서 그대로 사용해도 무방하다면! 서버는 `304` 코드를 응답함!

이때 리소스가 260B 찍히긴하는데, 캐시 사용해도 되는지 확인하는 네트워크 요청&응답 과정있어서!

### 적절한 캐시 유효기간은?

`31536000` 는 우선 1년을 의미

HTML : 일반적으로 변경사항 없을 떄만! no-cache를 적용함 

JS와 CSS: 파일 명에 해시를 함께 가짐! 코드가 변경되면 해시도 변경돼서 다른 파일이 됨!

그래서 얘네들은 캐시 유효시간 아무리 오래 세팅해도, 항상 최신꺼 가져옴

```jsx
const header = {
	setHeaders: (res, path) => {
		if(path.endsWith('.html')) {
			res.setHeader('Cache-Control', 'no-cache')
		} else if(path.endsWith('.js') || path.endsWith('.css') |I
			path.endsWith('.webp'))
		{
			res.setHeader('Cache-Control', 'public, max-age=31536000')
		} else {
			res.setHeader('Cache-Control', 'no-store')
	}
	},
}
```

HTML은 no-cache, JS와 CSS, WebP파일은 캐시 적용! 나머지는 no-store로 적용 x

### 불필요한 CSS 제거

lighthous에서 Opportunities섹션 `“Reduce unused CSS”`

![image.png](attachment:1325d3cf-1824-4a14-be58-45afc94ba847:image.png)

더 자세히 > Coverage 패널 활용! (실제 CSS, JS가 리소스에서 실행하는 코드 비율을 표시)

- **Coverage 패널**

![image.png](attachment:b2fac931-469d-4b2b-80c1-6c3e4931af2c:image.png)

오른쪽에 unused 바이트랑 usage visualization 보면됨! (실행되지 않는 거 보여줌)

if 문이 걸려있는 거라던가 분기 코드 등등때문일 수 있기에! 감안 필요

근데 문제는 CSS리소스 ! 분기도 없는데 뭔 ..

그래서 이거 Source패널에서 해당 코드 중 안쓰이는 거 보여줌

![image.png](attachment:88a3745f-adc1-44c4-803d-5054031896b5:image.png)

### 그럼 어떻게 제거?

### PurgeCSS 툴 사용!

: 파일에 있는 키워드를 추출하여, 해당 키워드인 이름의 css 클래스만 보존! 아닌 건 지워버림

ex) TailwindCSS라 할때

Tailwind에서 제공하는 유틸리티 클래스 이름 일치하는 거 빼고는 다 제거!

`npm install —save-dev purgecss` 로 우선 설치하기!

불필요한 클래스 제거할 CSS 지정

- - - output : 동일한 위치 지정으로, CSS 기존꺼 덮어씀
- - - content : 키워드를 추출할 파일

하고 `npm run purge` 해주면, 사용하지 않는 코드 비율 줄어듦!

** 이때, css가 일부 잘 안 먹는 문제!

이건 콜론 `:`  이 문자를 인식하지 못하고 잘라버려서 그런겨!

`lg:m-8` 을  `lg`, `m-8` 일케 따로따로 인식하게 됨

```jsx
module.exports = {
	defaultExtractor: (content) => content.match(/[\w\:\-]+/g) || []
}
```

이렇게 purgecss.config.css에서 설정 추가해주면 됨!