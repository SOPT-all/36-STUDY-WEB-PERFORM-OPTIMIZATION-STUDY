/** @jsxImportSource @emotion/react */
import {
  IndicatorContainer,
  IndicatorItemStyle,
  Divider,
} from './OrderIndicator.style';

interface OrderIndicatorProps {
  currentIndex: number;
  totalItems: number;
  isHome?: boolean;
}

const OrderIndicator = ({
  currentIndex,
  totalItems,
  isHome = false,
}: OrderIndicatorProps) => (
  <div css={IndicatorContainer(isHome)}>
    <div css={IndicatorItemStyle(true)}>{currentIndex + 1}</div>
    <div css={Divider}>|</div>
    <div css={IndicatorItemStyle(false)}>{totalItems}</div>
  </div>
);

export default OrderIndicator;
