import { StatusDot, StatusLabel, Wrapper } from './StoreStatus.style';

interface StoreStatusProps {
  isOpen: boolean;
}

const StoreStatus = ({ isOpen }: StoreStatusProps) => (
  <div css={Wrapper}>
    <span css={StatusDot(isOpen)} />
    <span css={StatusLabel}>{isOpen ? '영업중' : '영업전'}</span>
  </div>
);

export default StoreStatus;
