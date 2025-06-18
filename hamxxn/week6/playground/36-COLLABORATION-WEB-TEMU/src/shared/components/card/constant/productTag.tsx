import type { JSX } from 'react';
import { SocialSVG } from '@shared/components/socialSVG/SocialSVG';

export const PRODUCT_TAGS: Record<string, { text: string; icon: () => JSX.Element }> = {
  HIGH_REPURCHASE: {
    text: '재구매 고객이 많은 스토어',
    icon: () => <SocialSVG id="ic-regular-customer" height="1.6rem" width="1.6rem" />,
  },
  LOW_RETURN: {
    text: '상품 반품률이 낮은 스토어',
    icon: () => <SocialSVG id="ic-return-green" height="1.6rem" width="1.6rem" />,
  },
  ESTABLISHED_YEAR_AGO: {
    text: '1년 전 설립된 판매자',
    icon: () => <SocialSVG id="ic-day" height="1.6rem" width="1.6rem" />,
  },
  NONE: {
    text: '',
    icon: () => <></>,
  },
};
