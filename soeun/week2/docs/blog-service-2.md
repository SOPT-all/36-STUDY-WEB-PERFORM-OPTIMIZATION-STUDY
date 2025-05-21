
# 블로그 성능 최적화
병목 코드, 코드 분할 & 지연로딩, 텍스트 압축

## 1.4 병목 코드 식별과 개선

### Lighthouse + Performance 탭 확인

* CPU 그래프의 **빨간색 영역** = 병목 발생 지점
* "Timings" 섹션: **각 컴포넌트의 렌더링 시간** 시각화

### 개선 방법

* **정규식**을 사용하여 불필요한 **특수문자 제거**
* 병목 지점을 분석 → 해당 위치에서 성능을 개선

> 정규식 엔진은 효율적인 알고리즘 기반 → 입력이 커져도 비교적 빠르게 동작

<br />

## 1.5 코드 분할 (Code Splitting)

### 문제 상황

* `node_modules/react-syntax-highlighter` 내부의 `refractor` 패키지 크기가 큼
* 모든 코드가 하나로 번들링되어 → **사용하지 않는 페이지에서도 함께 로드됨**

```json
"dependencies": {
  ...
  "refractor": "^2.4.1"
}
```

* `react-syntax-highlighter`: 코드 블록 하이라이팅 라이브러리
* 하지만 실제로는 **일부 페이지에서만 사용**

### 해결 방법: 코드 분할

> 코드 분할이란?<br />
> 하나의 번들 파일을 여러 개로 나눠 → 필요한 곳에서만 \*\*지연 로딩(Lazy Loading)\*\*하는 기법


<br />

### 1.5.1 지연 로딩 (Lazy Loading)

```tsx
const ListPage = lazy(() => import('./pages/ListPage/index'));
const ViewPage = lazy(() => import('./pages/ViewPage/index'));

<Suspense fallback={<div>로딩 중...</div>}>
  <Switch>
    <Route path="/" component={ListPage} exact />
    <Route path="/view/:id" component={ViewPage} exact />
  </Switch>
</Suspense>
```

>결과: 기존 하나의 큰 chunk → 각 경로에 필요한 시점에 개별 chunk 로드됨


<br />

#### Chunk란?

> Webpack이 코드를 **작은 파일 단위로 분할**할 때 만들어지는 개별 파일.
> `chunk` 파일은 사용자의 특정 액션에 따라 로드됨.


<br />

### 지연 로딩 무분별 사용의 문제점

1. 네트워크 요청 증가 - 각 chunk는 개별 네트워크 요청 필요
2. 로딩 지연 - 너무 많은 지연 로딩은 사용자 경험 저하 |
3. 코드 복잡도 증가 - 유지보수 부담 상승

> **페이지 단위**로 lazy 로딩 적용이 가장 효과적이다!!

<br />

## 1.6 텍스트 압축 (Text Compression)

### 개념

| 항목    | 설명                        |
| ----- | ------------------------- |
| 대상  | HTML, CSS, JS 등 텍스트 기반 파일 |
| 효과 | 전송 시간 단축, 용량 절감, 로딩 속도 개선 |
| 처리 | 대부분의 빌드 도구가 자동 처리         |

#### 압축 전후 비교하기

* 압축 전: **156kB**
* 압축 후: **49.6kB**


<br />

### 1.6.1 Gzip 압축

> HTML, CSS, JS 등에 효과적인 압축 알고리즘. 거의 모든 브라우저가 지원!

#### 동작 흐름 요약

1. 브라우저가 요청을 보냄 → `Accept-Encoding: gzip, deflate` 포함
2. 서버는 이를 확인하고 **gzip 압축**된 응답 반환 → `Content-Encoding: gzip`
3. 브라우저는 압축 해제 후 화면을 렌더링한다.


<br />

### 텍스트 압축의 단점?

1. 서버 부하 - 압축 과정에서 CPU 사용
2. 시간 지연 - 압축/해제 과정의 미세한 시간 소모 
3. 호환성 - 거의 모든 최신 브라우저에서 문제 없음


<br />

### Gzip vs Deflate vs Brotli 비교

| 알고리즘        | 장점                    | 단점                        |
| ----------- | --------------------- | ------------------------- |
| **Gzip**    | 가장 널리 사용됨             | 기본 압축률                    |
| **Deflate** | 빠른 처리 속도              | Gzip보다 호환성 낮음             |
| **Brotli**  | 압축률 가장 높음 (20\~30% ↑) | CPU 사용량 큼, 일부 브라우저 호환성 문제 |

- 최신 브라우저: **Brotli** 사용
- 구형 브라우저 또는 호환성 이슈: **Gzip**이 안전


<br />

### 빌드시 발생

| 작업              | 설명                         |
| --------------- | -------------------------- |
| Minification | 줄바꿈, 공백, 주석 제거 + 변수명 축소    |
| Tree Shaking | 사용하지 않는 모듈 제거              |
| 난독화          | 코드 흐름 및 변수명을 무작위화 → 보안성 향상 |

> React는 `Webpack`, `Babel`, `Terser` 등을 통해 빌드 과정에서 자동으로 수행


