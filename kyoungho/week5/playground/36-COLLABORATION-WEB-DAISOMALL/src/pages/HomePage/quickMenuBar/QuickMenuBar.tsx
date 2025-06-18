import * as S from './QuickMenuBar.style';
import {
  SnsIcon,
  StoreSearchIcon,
  PickupIcon,
  HolidayArrivalIcon,
  DeliveryIcon,
  DeliverySortIcon,
  EventIcon,
  BizIcon,
} from '@assets/svgs';

interface QuickMenuItem {
  icon: React.ReactNode;
  label: string;
}

interface QuickMenuBarProps {
  onStoreSearchClick?: () => void;
}

const QUICK_MENUS: QuickMenuItem[] = [
  { icon: <SnsIcon width={34} />, label: 'SNS핫템' },
  { icon: <StoreSearchIcon />, label: '매장재고' },
  { icon: <PickupIcon />, label: '매장픽업' },
  { icon: <HolidayArrivalIcon />, label: '휴일도착' },
  { icon: <DeliveryIcon />, label: '정기배송' },
  { icon: <DeliverySortIcon width={34} />, label: '대량주문' },
  { icon: <EventIcon width={34} />, label: '이벤트' },
  { icon: <BizIcon width={34} />, label: 'BIZ' },
];

const QuickMenuBar = ({ onStoreSearchClick }: QuickMenuBarProps) => (
  <div css={S.wrapper}>
    {QUICK_MENUS.map((item, idx) => {
      const isStoreSearch = item.label === '매장재고';

      return (
        <button
          key={idx}
          css={S.menuItem}
          type="button"
          onClick={isStoreSearch ? onStoreSearchClick : undefined}
        >
          <div css={S.icon}>{item.icon}</div>
          <span css={S.label}>{item.label}</span>
        </button>
      );
    })}
  </div>
);

export default QuickMenuBar;
