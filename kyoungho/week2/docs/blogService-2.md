
## 코드 분할 & 지연 로딩
- 번들 크기를 줄여서 화면 렌더링 속도를 빠르게 만드는 방법
    - 처음 앱을 실행할 때 느리게 뜨는 문제 -> *필요한 코드만 골라서* 불러오는 전략이 효과적
- webpack으로 만든 청크 파일을 분석하고, 페이지별로 지연 로딩을 적용하는 과정을 단계별로 실행

### 번들 파일 분석
- Performance 패널을 보니 `0.chunk.js` 파일이 용량도 크고 다운로드가 오래 걸리는 것으로 보입니다
    - 리액트 코드가 한꺼번에 묶여 있어서 다운로드가 끝나야 화면이 그려짐
- 어떤 모듈이 얼마나 차지하는지 확인하려면 *Webpack Bundle Analyzer*가 유용
    - 일반적으로 webpack 설정을 건드려야 하지만, Create React App 프로젝트는 `cra-bundle-analyzer`를 쓰면 eject 없이도 분석이 가능합니다
- **설치 및 실행**
    ```bash
    npm install --save-dev cra-bundle-analyzer
    npx cra-bundle-analyzer
    ```
- 실행 후 브라우저에서 트리맵을 보면 번들 파일과 모듈별 용량 비중을 한눈에 볼 수 있습니다.
    -  `2.chunk.js`가 가장 큰 덩어리로 떠서 집중 분석하였고
    - node_modules 영역의 외부 라이브러리가 대부분을 차지하고 있었습니다
- 자세히 보니 *refractor* 패키지와 *react-dom*이 큰 비중을 차지
    - react-dom은 필수 코드라 일단 제외, refractor 쪽을 자세히 분석하기로 결정
- refractor는 `react-syntax-highlighter`가 내부에서 사용하는 라이브러리입니다
    - `package-lock.json`(또는 `yarn.lock`) 파일을 열어 `refractor`를 검색하면 출처를 확인 가능
    - `react-syntax-highlighter`는 블로그 상세 페이지의 `CodeBlock.js` 컴포넌트에서만 쓰이고 있었습니다
- 이렇게 상세 페이지에서만 필요한 모듈이라면 목록 페이지에서는 굳이 다운로드할 필요가 없습니다 따라서 페이지별로 쪼개서 필요할 때만 로드하면 초기 로딩 속도가 훨씬 빨라질 것으로 예상됩니다

### 코드 분할 적용 방안
- React의 `lazy`와 `Suspense`를 사용해 컴포넌트를 동적으로 불러옵니다
    - 다음처럼 `CodeBlock` 컴포넌트를 지연 로딩할 수 있습니다
      ```javascript
      import React, { Suspense } from 'react';

      const CodeBlock = React.lazy(() => import('./CodeBlock'));

      function PostDetail() {
          return (
              <Suspense fallback={<div>로딩 중…</div>}>
                  <CodeBlock />
              </Suspense>
          );
      }
      ```
    - 이렇게 하면 상세 페이지에 진입할 때만 `CodeBlock` 모듈을 내려받습니다
- Webpack 설정의 `splitChunks` 옵션을 조정해 벤더 코드와 서비스 코드를 분리할 수 있습니다
    - `optimization.splitChunks.cacheGroups`에 맞춤 규칙을 추가하면 됩니다
- 라우터 단위로도 동적 import를 걸어두면, 페이지별 청크가 자동 생성되어 관리하기 편해집니다
---
## 코드 분할이란
- *코드 분할*은 페이지별로 필요한 코드만 따로 로드해서 초기 로딩 속도를 개선하는 방법입니다
    - 예전에는 모든 페이지 컴포넌트를 하나의 번들로 묶었는데, 이 방식은 첫 페이지 진입 시 다운로드 시간이 오래 걸립니다.  
    - *지연 로딩*을 통해 사용자가 컴포넌트를 실제로 사용할 때 필요한 코드만 동적으로 불러옵니다
- 블로그 서비스 예시  
    - 목록 페이지에 접근할 때 ViewPage 코드까지 함께 다운로드되면 불필요한 네트워크 비용과 시간이 발생합니다 하지만 페이지별로 분리된 번들은 필요한 시점에만 내려받아 로드하므로 초기 로딩이 확실히 빨라집니다.  
- 코드 분할 패턴  
    - **페이지별 분할**: 라우트 단위로 번들을 쪼개 사용자별 맞춤 로딩이 가능합니다.  
    - **모듈별 분할**: 프로젝트 전반에서 공통으로 사용하는 라이브러리(ex: lodash, axios)만 따로 묶을 수 있습니다.  
      - 상황에 따라 여러 가지 분할 전략을 혼합해 사용하기도 합니다.  

## 코드 분할 적용하기
### 동적 import와 React.lazy, Suspense
- 동적 import  
    - 런타임에 모듈을 불러와서 초기 번들 크기를 줄이는 방법입니다
    - 코드 예시:  
        ```javascript
        import('lodash').then((module) => {
            const { debounce } = module;
            console.log(debounce);
        });
        ```  
    - Promise를 반환하기 때문에 컴포넌트 형태로 사용하려면 추가 처리가 필요합니다
- React.lazy  
    - React 컴포넌트를 동적으로 import할 때 간편하게 사용할 수 있습니다
    - **예시**
        ```typescript
        const LazyComponent = React.lazy(() => import('./LazyComponent'));
        ```  
    - 이렇게 선언하면 LazyComponent는 필요할 때 로드됩니다.  
- Suspense  
    - lazy로 감싼 컴포넌트의 로딩 상태를 관리할 수 있는 컴포넌트입니다.  
    - **예시**
        ```typescript
        <Suspense fallback={<div>로딩 중입니다...</div>}>
            <LazyComponent />
        </Suspense>
        ```  
    - Suspense 없이 사용하면 렌더링 중에 에러가 발생하니 반드시 감싸 주어야 합니다

### 번들 구조 확인 및 성능 효과
- 번들 파일 예시  
    - 0.chunk.js: axios 등 공통 외부 패키지  
    - 3.chunk.js: react-syntax-highlighter 등 ViewPage 전용 모듈  
    - 4.chunk.js: react, react-dom 등 주요 라이브러리  
    - 5.chunk.js: ListPage 컴포넌트  
    - 6.chunk.js: ViewPage 컴포넌트  
- 성능 개선 결과  
    - 목록 페이지 로딩: 4.2MB → 1.9MB, 로딩 시간 6.3초 → 3초로 감소
    - 상세 페이지 진입 시 ‘로딩 중입니다...’ 메시지가 출력되며 필요한 JS 파일만 내려받습니다
- Lighthouse나 브라우저 Performance 패널로 전후 성능 차이 비교가 가능

## 텍스트 압축
### 개발 환경과 운영 환경 차이
- Development 환경  
    - 최적화나 난독화가 적용되지 않아 번들 파일이 큽니다.  
    - `npm start`로 실행한 상태에서는 실사용 성능을 온전히 파악하기 어렵습니다.  
- Production 환경  
    - `npm run build`로 최종 번들을 경량화 및 난독화 실행
    - `npm run serve`로 빌드 결과물을 서빙하면 실제 사용자 환경과 유사하게 테스트할 수 있습니다.  

### 텍스트 압축 개념과 확인 방법
- 텍스트 압축이란  
    - HTML, CSS, JavaScript 같은 텍스트 기반 리소스를 gzip 또는 brotli 방식으로 압축해 전송하는 기법
    - 압축된 리소스를 받으면 클라이언트에서 압축을 해제하여 사용합니다
    - 이를 통해 네트워크 전송 시간을 크게 줄일 수 있습니다
- 확인 방법  
    - 브라우저 Network 패널의 Response Header에서 `Content-Encoding` 항목을 확인
    - API 응답은 gzip 압축이 적용되어 있지만, 메인 번들 파일에는 적용되지 않은 것을 확인할 수 있습니다

### 텍스트 압축 적용 방법
- Serve 라이브러리 설정  
    - 기본 serve 옵션: `-s build` (SPA 라우팅 매핑, gzip 압축 활성화 포함)  
    - 기존 설정에서 `-S`(압축 비활성화) 옵션을 제거하면 텍스트 압축이 자동으로 적용됩니다
    - package.json 수정 예시
        ```json
        {
            "scripts": {
                "serve": "npm run build && node ./node_modules/serve/bin/serve.js -s build"
            }
        }
        ```  
- 기타 서버 설정
    - Nginx  
        ```nginx
        gzip on;
        gzip_types text/plain application/javascript text/css;
        ```  
    - Apache  
        ```apache
        AddOutputFilterByType DEFLATE text/html text/css application/javascript
        ```  
    - 공통 게이트웨이 레벨에서 설정하면 여러 서버에 일괄 적용 가능
- 번들 파일 크기가 줄어든 것 확인 가능
- Network 패널에서 `Content-Encoding: gzip` 또는 `br`이 표시
- Lighthouse 검사 시 'Enable text compression' 경고가 사라집니다

