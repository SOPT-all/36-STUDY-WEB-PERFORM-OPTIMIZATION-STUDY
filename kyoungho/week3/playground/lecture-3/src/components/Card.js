import React, { useEffect, useRef } from 'react'

function Card(props) {
	const pictureRef = useRef(null);

	useEffect(() => {
		const options = {};
		const callback = (entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const pictureElement = entry.target;
					const sourceElements = pictureElement.querySelectorAll('source');
					const imgElement = pictureElement.querySelector('img');

					sourceElements.forEach(source => {
						source.srcset = source.dataset.srcset;
					});
					if (imgElement) {
						imgElement.src = imgElement.dataset.src;
					}
					observer.unobserve(pictureElement);
				}
			});
		};

		const observer = new IntersectionObserver(callback, options);
		if (pictureRef.current) {
			observer.observe(pictureRef.current);
		}

		return () => {
			if (pictureRef.current) {
				observer.unobserve(pictureRef.current);
			}
		};
	}, []);

	return (
		<div className="Card text-center">
			<picture ref={pictureRef}>
				<source data-srcset={props.webp} type="image/webp" />
				<img data-src={props.image} alt={props.children} />
			</picture>
			<div className="p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all">
				{props.children}
			</div>
		</div>
	)
}

export default Card
