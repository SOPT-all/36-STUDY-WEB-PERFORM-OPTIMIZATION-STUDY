// SVG 컴포넌트를 실제 SVG 파일로 변경
import * as S from './BuyBar.style';

const BuyBar = () => (
  <div css={S.Wrapper}>
    <div css={S.IconWrapper}>
      <img src="/svgs/like-icon.svg" alt="좋아요" css={S.IconStyle} />
    </div>
    <button css={S.ButtonStyle}>구매하기</button>
  </div>
);

export default BuyBar;
