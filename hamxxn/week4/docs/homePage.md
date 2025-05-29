# 이미지 지연 로딩

첫 화면에서 당장 필요하지 않은 이미지가 먼저 로드되지 않도록 지연시키는 기법

👉 사용자에게 가장 먼저 보이는 콘텐츠를 더 빠르게 로드할 수 있다.

네트워크를 확인할 때는 명확한 흐름을 파악할 수 있도록 네트워크에 throttling을 적용한다.

## Custom Throttling 설정

Network 패널 → Throttling 옵션 → Add... → 적절한 커스텀 속도 설정 (예: 다운로드 1.5Mbps, 업로드 750Kbps, Latency 40ms)

---

## 문제: 동영상이 사용자에게 가장 먼저 보여야 하는데 지연됨

👉 이미지가 먼저 로드되면서 banner-video가 뒤로 밀리는 문제 발생

### 해결: 이미지 **지연 로딩** 적용

- 이미지가 **뷰포트에 진입했을 때**만 로드되도록 설정
- 기존의 `scroll` 이벤트 대신 `IntersectionObserver` 사용

### 예제 코드

```jsx
import React, { useEffect, useRef } from "react";

function Card(props) {
  const imgRef = useRef(null);

  useEffect(() => {
    const options = {};
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sourceEl = entry.target.previousSibling;
          sourceEl.srcset = sourceEl.dataset.srcset;
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="Card text-center">
      <picture>
        <source data-srcset={props.webp} type="image/webp" />
        <img data-src={props.image} ref={imgRef} />
      </picture>
      <div className="p-5">{props.children}</div>
    </div>
  );
}
```
