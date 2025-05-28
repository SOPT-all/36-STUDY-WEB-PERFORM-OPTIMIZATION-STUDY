### 1. 이미지 사이즈 최적화

- CDN에서 로드하기
- 서버에 저장된 정적 이미지 최적화

### 2. 폰트 최적화

### 3. 캐시 최적화

### 4. 불필요한 css 제거

## 분석툴들

### 1. 크롬 개발자 도구 Coverage패널

→ 파일의 코드가 얼마나 실행됐는지 비율로 나타냄 (퍼센티지가 낮을 수록 불필요한 코드!)

### 2. Squoosh

→ 웹에서 서비스되는 이미지 압축도구

### 3. PurgeCSS

→ 사용안하는 CSS 제거

### BannerVideo 컴포넌트 예시

→ tailwind CSS 쓰고 있기 때문에 className이 많음

```jsx
function BannerVideo() {
return (
	<div className='BannerVideo w-full h-screen overflow-hidden
	relative bg-texture'>
		<div className='absolute h-screen w-full left-1/2'>
		<video
		src={video}
		className='absolute translateX -- 1/2 h-screen max-w-none
		min-w-screen -z-1 bg-black min-w-full
		min-h-screen'

		autoPlay
		Loop
		muted

		</div>
		<div className='w-full h-full flex justify-center items-center'>
			<div className='text-white text-center'>
			<div className='text-6xl leading-none font-semibold'>
			KEEP</div>
			<div className='text-6xl leading-none font-semibold'>
			CALM</div>
			<div className='text-3xl leading-loose'>AND</div>
			<div className='text-6xl leading-none font-semibold'>
			RIDE</div>
			<div className='text-5xl leading-tight font-semibold'>
			LONGBOARD</div>
		</div>
		</div>
	</div>
)}
```

## 이미지 지연로딩

첫 화면에 당장 필요하지 않은 이미지가 먼저 로드되지 않도록 지연

### 네트워크 분석

throttling을 적용하면서 좀더 빠른 네트워크 속도로 설정 → Add 해서 6000dmfh tjfwjd

(Fast3G는 다운로드 속도 1500kb/s, 업로드 속도 750kb/s)

(Slow3G는 다운로드 속도 780kb/s, 업로드 속도 330kb/s)

설정해두고 새로고침해보면

처음엔 중요한 리소스 bundle파일이 다운로드 → 그다음 이미지와 폰트 다운 → bannerVideo파일

근데 bannerVideo파일은 당장에 유저에게 가장 먼저 보이는 컨텐츠인데

나중에 로드되면, 사용자가 첫화면 보지 못하도록 오래 머물게됨

그러니까 해당 동영상이 먼저 다운로드 되게해보자!

하단 이미지들은 페이지가 로드될 때 로드하지 않는다면 언제 할지?

즉, 그 이미지가 딱화면에 보이는 시점에 보이면 됨! 스크롤로 판단!

But 스크롤 이벤트에 로직을 넣어버리면 더 로직이 늘어남

⇒ 오히려 메인스레드에 무리가 감, 성능 악화가 됨

이걸 해결해줄 수 있는게!! **Intersection Observer임!!**

### **Intersection Observer**

브라우저가 제공하는 API로, 웹페이지 특정요소를 관찰해서 스크롤 때에 해당 요소가 화면에 들어왔는지 알림

```jsx
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};
const callback = (entries, observer) => {
  console.log("Entries", entries);
};
const observer = new IntersectionObserver(callback, options);

observer.observe(document.querySelector("#target-element1"));
observer.observe(document.querySelector("#target-element2"));
```

option과 콜백을 정의한 후에, Intersection Observer객체 생성하면 인스턴스 나오는데

이 인스턴스로 요소 관찰! → 가시성 변할 때마다 콜백실행, 요소를 배열형태로 전달 받음

```jsx
function Card(props) {
  const imgRef = useRef(null);

  useEffect(() => {
    const options = {};
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("is intersecting", entry.target.dataset.src);
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
          // 위ㅣ에꺼는 해당 요소의 observe를 해제하는거!

          const observer = new IntersectionObserver(callback, options);

          observer.observe(imgRef.current);
        }
      });
    };
    return () => observer.disconnect();
  }, []);

  return (
    <div className="Card text-center">
      <img data-src={props.image} ref={imgRef} />
      <div className="=)">{props.children}</div>
    </div>
  );
}
```

화면에 이미지가 보이는 순간, 콜백이 실행되는 순간에 이미지 로드하는 일!

이미지 로딩은 이미지 태그에 src할당되는 순간 일어남!

그러므로 img태그에 src값 할당하지 않다가 콜백실행될때 할당하면 됨!

++ data-src 넣은 이유는 나중에 이미지가 뷰포트에 들어왔을때 data-src에 있는 값을 src로 옮기기위해!

## 이미지 사이즈 최적화

### 느린 이미지 로딩 분석

이미지 사이즈 줄이기!

SVG와 같은 벡터 이미지가 아닌, 비트맵 이미지 포맷 (PNG,JPG,WebP)으로

- png는 무손실 압축방식으로 원본 훼손없이 압축해서 알파채널 지원
- jpg는 압축과정에서 정보 손실 일어남. 대신 더 작은 사이즈로 줄일 수 있음
- webP는 무손실 압축과 손실 압축 모두 제공! 엄청 효율적으로 이미지 압축!

### ⇒ Squoosh로 이미지 변환

이미지 업로드하고 webP로 변환해서 다운 받으면 됨

![image.png](attachment:d2759246-a986-4381-8205-c32304c6d9a0:image.png)

하지만 호환성 문제가 있음.. 특정 브라우저에서는 렌더링이 안될 수도 있다는겨!

그래서 img태그가 아니라 picture태그를 사용해서 가지고 오기!

![image.png](attachment:ec93c79f-8994-420e-be5d-e1fb9f11d1a6:image.png)
