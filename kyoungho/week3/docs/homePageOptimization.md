# 홈페이지 최적화 (105~143)

## 1. 이미지 지연 로딩
- 첫 화면에 필요 없는 이미지를 나중에 로드하여 초기 페인트 시간 단축  
- Intersection Observer API를 사용해 뷰포트 진입 시점에만 이미지 로드  
- 구현
  1. `<img>` 태그에 `src` 대신 `data-src` 속성에 원본 URL 저장  
  2. Hook 혹은 `useEffect`에서 Observer 인스턴스 생성  
  3. `isIntersecting === true`일 때 `entry.target.src = entry.target.dataset.src`로 할당  
  4. 로드 후 `observer.unobserve(entry.target)`으로 관찰 해제  

## 2. 이미지 사이즈 최적화
- 고해상도 원본 이미지(예: 3946×3946px)가 브라우저에 그대로 로드되어 느린 렌더링이 발생하는 문제를 어떻게 해결할까
- 이미지 포맷 비교
  - PNG: 무손실, 알파 채널 지원, 용량 큼  
  - JPG: 손실 압축, 용량 중간, 호환성 높음  
  - WebP: 손실·무손실 모두 지원, 용량 최적, 일부 구형 브라우저 미지원  
- 문제 해결 워크플로우
  1. Squoosh로 원본 이미지 업로드  
  2. Resize: width/height → 600px (화면 최대 렌더링 300×300px 대비 2배)  
  3. Compress: 포맷 → WebP, Quality → 75, Effort → 기본(4)  
  4. 다운로드한 WebP 파일을 `assets`에 배치  
     — Intersection Observer 콜백에서 `dataset.srcset` → `srcset`, `dataset.src` → `src`로 이동  
- 이렇게 최적화하면 이미지 데이터 다운로드 시간이 최대 수십 초 → 수백 밀리초로 줄어듦

## 분석 도구
-   **크롬 개발자 도구의 Coverage 패널** -> 웹 페이지 렌더링 시 실행된 코드와 그 비율을 보여줌, 실행 비율이 낮은 파일 => 불필요한 코드 존재 가능성을 보여주며 어느 부분을 중점으로 확인해야 하는지 고려 가능
-   **Squoosh**  -> 구글에서 만든 웹 기반 이미지 압축 도구, 이미지 포맷 및 사이즈 변경이 용이하다
-   **PurgeCSS** -> 사용하지 않는 CSS를 제거하는 도구, CLI 또는 Webpack 플러그인 형태로 사용 가능
  
## 4. 실습 환경 준비 및 서비스 분석
### 4.1. 코드 다운로드 및 실행
-   **코드 다운로드**:
    ```bash
    $ git clone https://github.com/performance-lecture/Lecture-3.git
    ```
    URL: `https://github.com/performance-lecture/lecture-3`
-   **모듈 설치 및 서비스 실행**:
    ```bash
    $ npm install
    $ npm run start # 개발 서버 실행
    ```
-   **API 서버 실행 (선택 사항)**: 상품 리스트 정보 제공
    ```bash
    $ npm run server
    ```
-   **빌드 및 프로덕션 서버 실행**:
    ```bash
    $ npm run build # 서비스 코드 빌드
    $ npm run serve # 빌드된 파일 서비스 (Node.js, Express.js 기반)
    ```
    -   `npm run build:style`: Tailwind CSS를 사용하여 `src/styles.css` 생성.

### 4.2. 홈페이지 서비스 구조 분석
-   상단 헤더
-   메인 페이지: 대형 동영상 배너 + 문구
-   롱보드 소개 및 다른 페이지(Items, Part of Board, Riding Styles)로 이동하는 버튼 

#### 4.3 주요 컴포넌트
-   **`MainPage.js` (src/pages/MainPage.js)**
    -   상단에 `BannerVideo` 컴포넌트, 하단에 `ThreeColumns`, `TwoColumns`를 통해 텍스트와 다수의 이미지 렌더링
-   **`BannerVideo.js` (src/components/BannerVideo.js)**
    -   Tailwind CSS란? 
        -   Utility-First CSS 프레임워크이며 미리 정의된 CSS 클래스를 조합하여 스타일링이 가능
-   **`Server.js` (src/server/server.js)**
    -   Express.js

## 5. 이미지 지연 로딩 (*Image Lazy Loading*)
### 5.1. 초기 로딩에 병목 현상이 발생하는 문제점을 해결하는 방법
-   **네트워크 분석 환경 설정**:
    -   크롬 개발자 도구 Network 패널 Throttling: 'Add custom profile...'
    -   다운로드/업로드: 6000 kb/s, Fast 4G
-   **분석 결과**
    -   초기에는 `bundle` 파일 등 중요 리소스를 다운로드하며
    -   이후에는 `main1, 2, 3` 이미지, 폰트 다운로드
    -   이때 문제는 `banner-video` (페이지 최상단 콘텐츠)가 다른 이미지(`main-items.jpg` 등) 다운로드 완료 후 지연되어 로드된다 이는 사용자 경험 저하로 이어질 수 있다

### 5.2. 위 문제 해결을 위해서는 ==뷰포트 기반 이미지 로딩==을 적용
- 당장 보이지 않는 이미지(배너 아래 6개)의 로딩을 지연시켜서 중요한 `banner-video`가 먼저 로드되도록 함
- 이미지가 화면(뷰포트)에 보이거나 그 직전에 로드되도록 설정

### 5.3. `Intersection Observer` API 활용
-   **기존 `scroll` 이벤트의 한계**: 스크롤 시마다 이벤트가 과도하게 발생하여 무거운 로직 실행 시 성능 저하가 우려됨 (lodash `throttle` 등으로 완화 가능하나 근본적 해결책 아니다)
-   **`Intersection Observer`**:
    -  Intersection Observer는 브라우저 제공 API이며 특정 요소가 화면에 들어왔는지 아닌지 관찰이 가능하다
    -   ==만약 요소가 화면에 들어오거나 나갈 때만 콜백 함수 실행 -> 성능 효율이 우수하다==
    -   **주요 옵션 (`options`)**:
        -   `root`: 뷰포트 요소 (기본값: `null` - 브라우저 뷰포트)
        -   `rootMargin`: `root` 요소의 가시 범위 확장/축소 (CSS argin과 유사)
        -   `threshold`: 콜백 실행을 위한 가시성 퍼센티지 (0: 1px이라도 보일 때, 1.0: 전체가 보일 때)
    -   **콜백 함수 (`callback`)** 가시성 변경 시 실행되며 `entries` (교차 정보 배열)를 인자로 받는다

#### 5.3.1. `Intersection Observer` 적용하기 (Card 컴포넌트 예시)
-   `ThreeColumns` 내 3개의 `Card` 컴포넌트 이미지에 적용
-   **구현 (`Card.js`)**
    1.  **`useEffect` 활용**: 컴포넌트 마운트 시 Observer 생성, 언마운트 시 `observer.disconnect()`로 정리한다 (이러면 중복 생성 및 리소스 낭비 방지가 가능)
        ```javascript
        useEffect(() => {
            const observer = new IntersectionObserver(callback, options);
            // imgRef.current 등 관찰 대상 등록
            // observer.observe(imgRef.current);
            return () => observer.disconnect();
        }, []);
        ```
    2.  **콜백 함수 로직**:
        -   `entries` 배열 순회
        -   각 `entry`의 `isIntersecting` 값 (boolean, 뷰포트 내 진입 여부) 확인
        -   **이미지 로딩**:
            -   최초 HTML
            -    `<img data-src="image_path.jpg" ... />`
            -   `isIntersecting`이 `true`일 때
                -   `entry.target.src = entry.target.dataset.src;`
        -   **관찰 해제** -> 한번 로드된 이미지는 더 이상 관찰이 불필요하므로 `observer.unobserve(entry.target);`
-   **적용 결과**
    -   초기 페이지 로딩 시 `main1, 2, 3.jpg` 로드되지 않음
    -   스크롤하여 해당 이미지 영역 도달 시 콘솔 로그 출력과 함께 이미지 로드 시작
    -   ==초기 로딩 시 보이지 않는 이미지가 우선순위 높은 콘텐츠(동영상)의 로딩을 방해하지 않는다==

## 6. 이미지 사이즈 최적화
### 6.1. 지연 로딩 후에도 느린 이미지 표시가 발생하는 문제점 해결
-   이미지 지연 로딩 적용 후, 스크롤 시 이미지가 로드되지만 그 속도가 매우 느리다 (너무 천천히 표시됨)
-   해당 문제의 원인은 이미지 파일 자체의 크기가 매우 크기 떄문 이는 다운로드 시간을 증가시키고 사용자 경험 저하시킬 수 있다

### 6.2. 이미지 포맷
-   *비트맵 이미지 포맷* 비교

    | 포맷      | 압축 방식   | 알파 채널 (투명도) | 주요 특징                                    | 일반적 사용                               |
    | :-------- | :---------- | :----------------- | :------------------------------------------- | :---------------------------------------- |
    | **PNG**   | 무손실      | 지원               | 원본 훼손 없음, 투명 배경 가능               | 로고, 아이콘, 투명도 필요한 그래픽       |
    | **JPG/JPEG** | 손실        | 미지원             | 정보 손실 발생, 파일 크기 작게 압축 가능       | 사진, 일반 웹 이미지 (투명도 불필요)       |
    | **WebP**  | 무손실/손실 | 지원               | ==PNG/JPG 대비 높은 압축 효율== | 최신 브라우저에서 고화질/저용량 이미지 제공 |

-   **파일 크기 비교**: WebP < JPG < PNG (일반적 경향)
-   **화질 (동일 압축률 가정 시) 비교**: PNG ≈ WebP (무손실) > JPG (손실)
-   **브라우저 호환성**: PNG = JPG > WebP (WebP는 최신 포맷으로 일부 구형 브라우저 미지원)
    -   WebP 공식 문서: `https://developers.google.com/speed/webp` (PNG 대비 26%, JPG 대비 25~34% 효율 향상)

### 6.3. `Squoosh`를 이용한 이미지 변환 및 적용
-   **`Squoosh`**: 구글에서 개발한 웹 기반 이미지 변환/압축 도구이다
-   **변환 과정 (`main1.jpg` -> `_main1.webp`)**:
    1.  Squoosh 웹사이트에서 이미지 업로드
    2.  **이미지 리사이즈 (Edit 섹션)**
        -   `Resize` 옵션 활성화
        -   `Width` 및 `Height`
            -   예시에서는 **600px**로 설정 (실제 화면 표시 크기 300x300px의 2배, 레티나 디스플레이 등 고려)
    3.  **이미지 압축 (Compress 섹션)**
        -   포맷
            -   **MozJPEG (JPG 최적화) 또는 WebP** 선택 (여기서는 WebP)
        -   `Quality`
            -   **75** (일반적으로 70-80 권장되며 너무 낮으면 화질 저하, 높으면 용량 증가)
        -   `Effort`
            -   CPU 사용량 설정 (기본값 4)
    4.  변환된 이미지 다운로드 (`_main1.webp`로 저장), `src/assets/` 폴더로 이동시킴
    5.  다른 이미지들도 동일하게 WebP로 변환 및 최적화된 JPG 생성

#### 6.3.1. `<picture>` 태그를 사용한 호환성 확보
-   **문제 상황** -> WebP 포맷은 일부 브라우저에서 지원되지 않을 수 있음
-   **해결** -> `<picture>` HTML5 태그 사용
    -   브라우저가 지원하는 최적의 이미지 소스를 선택적으로 로드
-   **코드 (`Card.js`)**:
    ```html
    // Intersection Observer 콜백에서 data-src, data-srcset을 src, srcset으로 변경하는 로직은 유지
    <picture>
      {/* ① props.webp 추가 가정: <Card image={main1Jpg} webp={main1Webp} /> */}
      <source data-srcset={props.webp} type="image/webp" /> {/* WebP 우선 로드 시도 */}
      <img data-src={props.image} alt="롱보드 이미지" /> {/* WebP 미지원 시 JPG 로드 (최적화된 JPG 권장) */}
    </picture>
    ```
    -   `①` `Card` 컴포넌트에 WebP 이미지 경로를 위한 `webp` prop 추가
    -   `②` `<source>` 태그의 `type="image/webp"`로 WebP 명시
        -   `data-srcset`으로 지연 로딩
    -   `<img>` 태그는 폴백(fallback) 역할
        -   `data-src`로 지연 로딩
    -   크롬 개발자 도구에서 첫 번째 `<source>` 타입을 미지원 타입(예를 들어 `image/avif` 만약 미지원이라면)으로 변경 시, 폴백 `<img>`의 JPG가 로드되는지를 확인해야 함
    -   (MainPage 컴포넌트의 다른 이미지에도 유사하게 `<picture>` 태그 적용)
    -   ==결과적으로 브라우저가 WebP를 지원하지 않더라도 최적화된 JPG 이미지가 렌더링되도록 준비하는 것이 중요==

### 6.4. 최적화 전후 비교
-   **측정 환경**: 이전과 동일한 Throttling 설정 (6000kb/s.
-   **결과**:
    -   최적화 전
        -   이미지 다운로드 약 **30초** 소요
    -   최적화 후
        -   이미지 다운로드 약 **100밀리초** 소요
    -   ==이미지 사이즈 최적화를 통해 로딩 속도 대폭 개선됨이 확인 가능하다==

---

- Intersection Observer 기반 지연 로딩
``` typescript
useEffect(()=>{
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src!;
        observer.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img=>observer.observe(img));
  return ()=>observer.disconnect();
},[]);
```

- picture 태그로 WebP/JPG 호환 처리
``` typescript
<picture>
  <source data-srcset="image.webp" type="image/webp">
  <img data-src="image.jpg" alt="…" />
</picture>
```
