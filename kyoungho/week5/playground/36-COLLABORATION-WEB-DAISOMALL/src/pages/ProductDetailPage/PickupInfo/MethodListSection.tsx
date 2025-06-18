import * as S from './MethodListSection.style';
import DeliveryIconTruck from '@assets/svgs/DeliveryIconTruck';
import DeliveryIconCycle from '@assets/svgs/DeliveryIconCycle';
import StoreIcon from '@assets/svgs/StoreIcon';
import BetaMark from '@assets/svgs/BetaMark';
import BoxIcon from '@assets/svgs/BoxIcon';
import type { ReactNode } from 'react';

interface MethodItemProps {
  icon: ReactNode;
  name: string;
  date: string;
  isStore?: boolean;
  isBeta?: boolean;
}

const MethodItem = ({ icon, name, date, isStore = false, isBeta = false }: MethodItemProps) => {
  return (
    <li css={[S.MethodItem, isStore && S.StoreMethodItem]}>
      {isBeta && <BetaMark css={S.BetaIconStyle} />}
      <div css={S.MethodItemContent}>
        <div css={S.IconWrapper}>
          {icon}
        </div>
        <span css={S.MethodName} className={isStore ? "method-name" : ""}>
          {name}
        </span>
        <span css={S.MethodDate} className={isStore ? "method-date" : ""}>
          {date}
        </span>
      </div>
    </li>
  );
};

const MethodListSection = () => { 
  const methodItems: MethodItemProps[] = [
    {
      icon: <DeliveryIconTruck />,
      name: '택배배송',
      date: '4/29(화)\n도착예정',
    },
    {
      icon: <StoreIcon />,
      name: '매장픽업',
      date: '4/28(월)\n픽업가능',
      isStore: true,
    },
    {
      icon: <DeliveryIconCycle />,
      name: '오늘배송',
      date: '4/28(월)\n도착예정',
      isBeta: true,
    },
    {
      icon: <BoxIcon />,
      name: '대량주문',
      date: '7일 이내\n도착예정',
    },
  ];

  return (
    <ul css={S.MethodList}>
      {methodItems.map((item, index) => (
        <MethodItem
          key={index}
          icon={item.icon}
          name={item.name}
          date={item.date}
          isStore={item.isStore}
          isBeta={item.isBeta}
        />
      ))}
    </ul>
  );
};

export default MethodListSection; 