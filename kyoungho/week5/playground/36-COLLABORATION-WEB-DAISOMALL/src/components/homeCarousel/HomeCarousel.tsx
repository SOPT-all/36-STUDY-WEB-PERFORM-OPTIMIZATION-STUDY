/** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback, useMemo } from 'react';
import ImageCarousel from '@components/ImageCarousel/ImageCarousel';
import OrderIndicator from '@components/OrderIndicator/OrderIndicator';
import * as S from './HomeCarousel.style';

interface HomeCarouselItemProps {
  imageUrl: string;
  title: string;
  tags: string[];
}

interface HomeCarouselProps {
  items?: HomeCarouselItemProps[];
  autoplay?: boolean;
  autoplaySpeed?: number;
}

// 기본 캐러셀 아이템 데이터
const DEFAULT_CAROUSEL_ITEMS = [
  {
    imageUrl: '/home-carousel-1.webp',
    title: '정리가 쉬워지는\n냉장고 수납',
    tags: ['#저장용기', '#바구니', '#정리함'],
  },
  {
    imageUrl: '/home-carousel-2.webp',
    title: '마음을 꾹 담아 전하는\n편지 & 카드 모음전',
    tags: ['#문구용품', '#편지', '#엽서'],
  },
  {
    imageUrl: '/home-carousel-3.webp',
    title: '손쉽고 깔끔한\n뚜껑 수납용품',
    tags: ['#수납용품', '#정리함', '#바구니'],
  },
];

const HomeCarousel = ({
  items = DEFAULT_CAROUSEL_ITEMS,
  autoplay = true,
  autoplaySpeed = 5000,
}: HomeCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ImageCarousel에 전달할 이미지 URL 배열 - useMemo로 최적화
  const imageUrls = useMemo(() => items.map((item) => item.imageUrl), [items]);

  // 인덱스 추적 함수를 useCallback으로 최적화
  const trackActiveSlide = useCallback(() => {
    const activeSlide = document.querySelector('.slick-slide.slick-active');
    if (!activeSlide) return;

    const dataIndex = activeSlide.getAttribute('data-index');
    if (!dataIndex) return;

    const index = parseInt(dataIndex, 10);
    if (!isNaN(index) && index !== currentIndex) {
      setCurrentIndex(index);
    }
  }, [currentIndex]);

  // 슬라이드 인덱스 추적
  useEffect(() => {
    trackActiveSlide();

    const intervalId = setInterval(trackActiveSlide, 1000); // 500ms에서 1000ms로 변경하여 성능 개선

    // MutationObserver 설정 최적화
    const observer = new MutationObserver(trackActiveSlide);
    const slickTrack = document.querySelector('.slick-track');

    if (slickTrack) {
      observer.observe(slickTrack, {
        attributes: true,
        attributeFilter: ['class'],
        subtree: true,
      });
    }

    return () => {
      clearInterval(intervalId);
      observer.disconnect();
    };
  }, [trackActiveSlide]);

  return (
    <div css={S.homeCarouselWrapper}>
      {/* ImageCarousel 컴포넌트 */}
      <ImageCarousel
        images={imageUrls}
        autoplay={autoplay}
        autoSlideInterval={autoplaySpeed}
        bottomPadding="200rem"
      />

      {/* 그라데이션 배경 */}
      <div css={S.gradientBackground} />

      {/* 피그마 디자인에 맞는 콘텐츠 래퍼 */}
      <div css={S.bottomContent}>
        <div css={S.contentWrapper}>
          <div css={S.textContainer}>
            <h2 css={S.titleText}>{items[currentIndex].title}</h2>
            <div css={S.tagsContainer}>
              {items[currentIndex].tags.map((tag, tagIndex) => (
                <span key={`tag-${currentIndex}-${tagIndex}`} css={S.tagItem}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* OrderIndicator 컴포넌트 */}
          <OrderIndicator
            currentIndex={currentIndex}
            totalItems={items.length}
            isHome={true}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
