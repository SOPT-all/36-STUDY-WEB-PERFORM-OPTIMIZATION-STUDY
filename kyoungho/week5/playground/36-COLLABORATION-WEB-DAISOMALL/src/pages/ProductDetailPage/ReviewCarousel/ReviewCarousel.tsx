/** @jsxImportSource @emotion/react */
import * as styles from './ReviewCarousel.style';

interface ReviewCarouselProps {
  isLoading?: boolean;
  imageUrls?: string[];
  onMoreClick?: () => void;
}

const MAX_IMAGES_BEFORE_MORE = 7;
const MIN_IMAGES_FOR_MORE_BUTTON = 8;
const SKELETON_COUNT = 7;

const ReviewCarousel = ({ isLoading = false, imageUrls = [], onMoreClick }: ReviewCarouselProps) => {
  if (isLoading) {
    return (
      <div css={styles.container}>
        {Array(SKELETON_COUNT)
          .fill(0)
          .map((_, index) => (
            <div key={index} css={styles.skeletonImage} />
          ))}
        <div css={styles.skeletonMoreWrapper} />
      </div>
    );
  }

  if (imageUrls.length === 0) {
    return <div css={styles.emptyReviewText}>리뷰가 없습니다.</div>;
  }

  const showMoreButton = imageUrls.length >= MIN_IMAGES_FOR_MORE_BUTTON;
  const imagesToShow = showMoreButton ? MAX_IMAGES_BEFORE_MORE : imageUrls.length;

  return (
    <div css={styles.container}>
      {imageUrls.slice(0, imagesToShow).map((src, index) => (
        <div key={index} css={styles.imageContainer}>
          <img css={styles.image} src={src} alt={`review-${index}`} />
          {showMoreButton && index === MAX_IMAGES_BEFORE_MORE - 1 && (
            <div css={styles.moreWrapper} onClick={onMoreClick}>
              <div css={styles.moreText}>더보기</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewCarousel;

