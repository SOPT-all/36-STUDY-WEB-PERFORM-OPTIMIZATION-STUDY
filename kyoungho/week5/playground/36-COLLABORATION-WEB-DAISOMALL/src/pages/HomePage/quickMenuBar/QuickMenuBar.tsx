import * as S from './QuickMenuBar.style';
// SVG 컴포넌트를 실제 SVG 파일로 변경

interface QuickMenuItem {
  icon: React.ReactNode;
  label: string;
}

interface QuickMenuBarProps {
  onStoreSearchClick?: () => void;
}

const QUICK_MENUS: QuickMenuItem[] = [
  { icon: <img src="/svgs/sns-icon.svg" alt="SNS" width={34} />, label: 'SNS핫템' },
  { icon: <img src="/svgs/store-search-icon.svg" alt="Store Search" />, label: '매장재고' },
  { icon: <img src="/svgs/pickup-icon.svg" alt="Pickup" />, label: '매장픽업' },
  { icon: <img src="/svgs/holiday-arrival-icon.svg" alt="Holiday Arrival" />, label: '휴일도착' },
  { icon: <img src="/svgs/delivery-icon.svg" alt="Delivery" />, label: '정기배송' },
  { icon: <img src="/svgs/delivery-sort-icon.svg" alt="Delivery Sort" width={34} />, label: '대량주문' },
  { icon: <img src="/svgs/event-icon.svg" alt="Event" width={34} />, label: '이벤트' },
  { icon: <img src="/svgs/biz-icon.svg" alt="BIZ" width={34} />, label: 'BIZ' },
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
