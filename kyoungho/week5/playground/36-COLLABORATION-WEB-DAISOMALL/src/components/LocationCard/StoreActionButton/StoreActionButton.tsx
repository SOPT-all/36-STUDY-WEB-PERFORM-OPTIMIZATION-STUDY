import { ArrowRightIcon } from '@assets/svgs';
import * as S from '@components/LocationCard/LocationCard.style';

interface StoreActionButtonProps {
  isSoldOut?: boolean;
}

const StoreActionButton = ({ isSoldOut = false }: StoreActionButtonProps) => (
  <button css={S.actionButton}>
    <span>{isSoldOut ? '재입고 알림' : '매장 픽업하기'}</span>
    {!isSoldOut && <ArrowRightIcon width={12} height={12} />}
  </button>
);

export default StoreActionButton;
