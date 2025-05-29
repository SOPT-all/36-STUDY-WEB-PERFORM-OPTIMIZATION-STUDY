# 트러블슈팅: Node.js 호환성 문제

## 🚨 문제 상황

### 발생한 오류
```
Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:79:19)
    at Object.createHash (node:crypto:139:10)
    at module.exports (/Users/kyoungho/Repositories/Areas/SOPT/36-STUDY-WEB-PERFORM-OPTIMIZATION-STUDY/kyoungho/week3/playground/week3-task2/lecture-3/node_modules/webpack/lib/util/createHash.js:135:53)
```

### 문제 발생 시점
- **프로젝트**: `week3-task2/lecture-3`
- **상황**: `npm start` 명령어로 React 개발 서버 시작 시
- **환경**: Node.js v22.16.0

## 🔍 원인 분석

### 근본 원인
- **구버전 webpack과 최신 Node.js 간의 호환성 문제**
- Node.js v17부터 OpenSSL 3.0을 사용하면서 기존의 legacy hash 알고리즘들이 기본적으로 비활성화됨
- 구버전 webpack(프로젝트에서 사용 중인 react-scripts 3.3.0)이 이러한 legacy hash 알고리즘에 의존

### 기술적 세부사항
- **오류 코드**: `ERR_OSSL_EVP_UNSUPPORTED`
- **관련 모듈**: `webpack/lib/util/createHash.js`
- **Node.js 버전**: v22.16.0 (OpenSSL 3.0 기반)
- **Webpack 버전**: react-scripts 3.3.0에 포함된 구버전

## ✅ 해결 방법

### 1. 임시 해결책
legacy OpenSSL provider를 활성화하여 기존 코드와의 호환성 유지

```bash
NODE_OPTIONS="--openssl-legacy-provider" npm start
```

### 2. 환경변수 설정
`.env` 파일에 환경변수 추가:

```bash
# .env 파일에 추가
NODE_OPTIONS=--openssl-legacy-provider
```

### 3. package.json 스크립트 수정
```json
{
  "scripts": {
    "start": "NODE_OPTIONS='--openssl-legacy-provider' npm run build:style && react-scripts start",
    "build": "NODE_OPTIONS='--openssl-legacy-provider' npm run build:style && react-scripts build"
  }
}
```

## 🔧 적용된 해결책

프로젝트에서는 **방법 1**을 사용하여 문제를 해결했습니다

```bash
cd /Users/kyoungho/Repositories/Areas/SOPT/36-STUDY-WEB-PERFORM-OPTIMIZATION-STUDY/kyoungho/week3/playground/week3-task2/lecture-3
NODE_OPTIONS="--openssl-legacy-provider" npm start
```

### 결과
- ✅ React 개발 서버 정상 시작
- ✅ 컴파일 성공 (일부 접근성 경고는 있으나 정상 동작)
- ✅ 브라우저에서 애플리케이션 접근 가능

