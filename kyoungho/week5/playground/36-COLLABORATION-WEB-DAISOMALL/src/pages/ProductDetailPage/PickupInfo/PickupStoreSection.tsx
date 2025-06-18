import * as S from './PickupStoreSection.style';

const PickupStoreSection = () => {
  return (
    <div css={S.InfoRow}>
      <span css={S.InfoLabel}>픽업매장</span>
      <div css={S.InfoContent}>
        <span>
          <a href="#" css={S.LoginLink}>로그인</a> 후 픽업 가능 매장을 확인해보세요
        </span>
      </div>
    </div>
  );
};

export default PickupStoreSection; 