import * as S from './PhotoScrollList.style';

interface PhotoScrollListProps {
  isLoading?: boolean;
  imageUrls?: string[];
  onMoreClick?: () => void;
}

const MAX_IMAGES_BEFORE_MORE = 7;
const MIN_IMAGES_FOR_MORE_BUTTON = 8;

const PhotoScrollList = ({ isLoading = false, imageUrls = [], onMoreClick }: PhotoScrollListProps) => {
  if (isLoading) {
    // 로딩 상태일 때 스켈레톤 표시
    return (
      <div css={S.ScrollContainer}>
        {Array(7)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              css={S.SkeletonThumbnail}
            />
          ))}
      </div>
    );
  }

  if (imageUrls.length === 0) {
    return (
      <div css={S.ScrollContainer} style={{ justifyContent: 'center', padding: '2rem 0' }}>
        <div style={{ color: '#999', fontSize: '14px' }}>리뷰 사진이 없습니다.</div>
      </div>
    );
  }

  // ReviewCarousel과 동일한 더보기 로직
  const showMoreButton = imageUrls.length >= MIN_IMAGES_FOR_MORE_BUTTON;
  const imagesToShow = showMoreButton ? MAX_IMAGES_BEFORE_MORE : imageUrls.length;

  return (
    <div css={S.ScrollContainer}>
      {imageUrls.slice(0, imagesToShow).map((src, idx) => (
        <div key={idx} css={S.ImageContainer}>
          <img src={src} alt={`photo-${idx}`} css={S.Thumbnail} />
          {showMoreButton && idx === MAX_IMAGES_BEFORE_MORE - 1 && (
            <div css={S.MoreWrapper} onClick={onMoreClick}>
              <div css={S.MoreText}>더보기</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PhotoScrollList;
