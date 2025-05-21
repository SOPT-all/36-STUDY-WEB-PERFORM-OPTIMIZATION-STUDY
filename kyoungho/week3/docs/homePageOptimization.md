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
