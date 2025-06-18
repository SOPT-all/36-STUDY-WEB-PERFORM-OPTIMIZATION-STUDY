import { LikeIcon } from '@assets/svgs';
import * as S from './BuyBar.style';

const BuyBar = () => (
  <div css={S.Wrapper}>
    <div css={S.IconWrapper}>
      <LikeIcon css={S.IconStyle} />
    </div>
    <button css={S.ButtonStyle}>구매하기</button>
  </div>
);

export default BuyBar;
