import React, { useEffect, useRef } from 'react'
import BannerVideo from '../components/BannerVideo'
import ThreeColumns from '../components/ThreeColumns'
import TwoColumns from '../components/TwoColumns'
import Card from '../components/Card'
import Meta from '../components/Meta'
import main1 from '../assets/main1.webp'
import main2 from '../assets/main2.webp'
import main3 from '../assets/main3.webp'
import main_items from '../assets/main-items.webp'
import main_parts from '../assets/main-parts.webp'
import main_styles from '../assets/main-styles.webp'

const LazyLoadImage = ({ webpSrc, jpgSrc, altText }) => {
	const pictureRef = useRef(null)

	useEffect(() => {
		const options = {}
		const callback = (entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const pictureElement = entry.target
					const sourceElements = pictureElement.querySelectorAll('source')
					const imgElement = pictureElement.querySelector('img')

					sourceElements.forEach(source => {
						source.srcset = source.dataset.srcset
					})
					if (imgElement) {
						imgElement.src = imgElement.dataset.src
					}
					observer.unobserve(pictureElement)
				}
			})
		}

		const observer = new IntersectionObserver(callback, options)
		if (pictureRef.current) {
			observer.observe(pictureRef.current)
		}

		return () => {
			if (pictureRef.current) {
				observer.unobserve(pictureRef.current)
			}
		}
	}, [])

	return (
		<picture ref={pictureRef}>
			<source data-srcset={webpSrc} type="image/webp" />
			<img data-src={jpgSrc} alt={altText} />
		</picture>
	)
}

function MainPage(props) {
	return (
		<div className="MainPage -mt-16">
			<BannerVideo/>
			<div className="mx-auto">
				<ThreeColumns
					columns={[
						<Card image={main1_jpg} webp={main1}>롱보드는 아주 재밌습니다.</Card>,
						<Card image={main2_jpg} webp={main2}>롱보드를 타면 아주 신납니다.</Card>,
						<Card image={main3_jpg} webp={main3}>롱보드는 굉장히 재밌습니다.</Card>
					]}
				/>
				<TwoColumns
					bgColor={'#f4f4f4'}
					columns={[
						<LazyLoadImage webpSrc={main_items} jpgSrc={main_items_jpg} altText="롱보드 아이템" />,
						<Meta
							title={'Items'}
							content={'롱보드는 기본적으로 데크가 크기 때문에 입맛에 따라 정말 여러가지로 변형된 형태가 나올수 있습니다. 실제로 데크마다 가지는 모양, 재질, 무게는 천차만별인데, 본인의 라이딩 스타일에 맞춰 롱보드를 구매하시는게 좋습니다.'}
							btnLink={'/items'}
						/>
					]}
				/>
				<TwoColumns
					bgColor={'#fafafa'}
					columns={[
						<Meta
							title={'Parts of Longboard'}
							content={'롱보드는 데크, 트럭, 휠, 킹핀, 베어링 등 여러 부품들로 구성됩니다. 롱보드를 타다보면 조금씩 고장나는 부품이 있기 마련인데, 이럴때를 위해 롱보들의 부품들에 대해서 알고 있으면 큰 도움이 됩니다.'}
							btnLink={'/part'}
						/>,
						<LazyLoadImage webpSrc={main_parts} jpgSrc={main_parts_jpg} altText="롱보드 부품" />
					]}
					mobileReverse={true}
				/>
				<TwoColumns
					bgColor={'#f4f4f4'}
					columns={[
						<LazyLoadImage webpSrc={main_styles} jpgSrc={main_styles_jpg} altText="롱보드 라이딩 스타일" />,
						<Meta
							title={'Riding Styles'}
							content={'롱보드 라이딩 스타일에는 크게 프리스타일, 다운힐, 프리라이딩, 댄싱이 있습니다. 보통 롱보드는 라이딩 스타일에 따라 데크의 모양이 조금씩 달라집니다. 많은 롱보드 매니아들이 각 쓰임새에 맞는 보드들을 소유하고 있습니다.'}
							btnLink={'/riding-styles'}
						/>
					]}
				/>
			</div>
		</div>
	)
}

export default MainPage
