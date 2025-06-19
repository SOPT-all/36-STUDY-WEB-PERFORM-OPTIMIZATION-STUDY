/** @jsxImportSource @emotion/react */
import * as S from './Rating.style';
// SVG 컴포넌트를 실제 SVG 파일로 변경

interface RatingProps {
  ratingAvg?: string;
  reviewCount?: string;
}

const Rating = ({ ratingAvg, reviewCount }: RatingProps) => {
  // reviewCount를 숫자로 변환하고 포맷팅
  const formatReviewCount = (countStr?: string) => {
    if (!countStr) return '(0)';
    const numCount = parseInt(countStr);
    if (numCount >= 10000) {
      return `(${(numCount / 10000).toFixed(1)}만)`;
    }
    return `(${numCount.toLocaleString()})`;
  };

  return (
    <div css={S.Rating}>
      <div css={S.RatingIconWrapper}>
                  <img src="/svgs/star-icon.svg" alt="별점" />
      </div>
      <span css={S.RatingText}>{ratingAvg || '0'}점</span>
      <span css={S.ReviewCount}>{formatReviewCount(reviewCount)}</span>
    </div>
  );
};

export default Rating; 