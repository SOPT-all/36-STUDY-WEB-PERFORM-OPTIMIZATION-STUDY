import { StarIconGray, StarIconRed } from '@assets/svgs';
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
          <StarIconGray width={18} />
          {i < fullCount && (
            <div css={S.FullStarOverlay}>
              <StarIconRed width={18} />
            </div>
          )}
          {i === fullCount && decimal > 0 && (
            <div
              css={S.FullStarOverlay}
              style={{ width: `${decimal * 100}%`, overflow: 'hidden' }}
            >
              <StarIconRed width={18} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RenderStars;
