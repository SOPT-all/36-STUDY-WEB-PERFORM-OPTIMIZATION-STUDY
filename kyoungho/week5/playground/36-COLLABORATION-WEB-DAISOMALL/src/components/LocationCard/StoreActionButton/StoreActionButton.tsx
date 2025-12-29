// SVG 컴포넌트를 실제 SVG 파일로 변경
import * as S from '@components/LocationCard/LocationCard.style';

interface StoreActionButtonProps {
  isSoldOut?: boolean;
}

const StoreActionButton = ({ isSoldOut = false }: StoreActionButtonProps) => (
  <button css={S.actionButton}>
    <span>{isSoldOut ? '재입고 알림' : '매장 픽업하기'}</span>
    {!isSoldOut && <img src="/svgs/arrow-right-icon.svg" alt="Arrow Right" width={12} height={12} />}
  </button>
);

export default StoreActionButton;
