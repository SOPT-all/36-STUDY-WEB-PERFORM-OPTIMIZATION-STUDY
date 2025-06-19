// SVG 컴포넌트를 실제 SVG 파일로 변경
import * as S from './RenderStars.style';

interface RenderStarsProps {
  score: number;
}

const RenderStars = ({ score }: RenderStarsProps) => {
  const fullCount = Math.floor(score);
  const decimal = score - fullCount;

  return (
    <div css={S.StarRatingWrapper}>
      {[...Array(5)].map((_, i) => (
        <div key={i} css={S.StarWrapper}>
          <img src="/svgs/star-icon-gray.svg" alt="Star Gray" width={18} />
          {i < fullCount && (
            <div css={S.FullStarOverlay}>
              <img src="/svgs/star-icon-red.svg" alt="Star Red" width={18} />
            </div>
          )}
          {i === fullCount && decimal > 0 && (
            <div
              css={S.FullStarOverlay}
              style={{ width: `${decimal * 100}%`, overflow: 'hidden' }}
            >
              <img src="/svgs/star-icon-red.svg" alt="Star Red" width={18} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RenderStars;
