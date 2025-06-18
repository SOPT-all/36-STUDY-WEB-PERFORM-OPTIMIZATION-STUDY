import theme from '@styles/theme';

import sectionImg1 from '/home-section-1.png';
import sectionImg2 from '/home-section-2.png';
import sectionImg3 from '/home-section-3.png';
import sectionImg4 from '/home-section-4.png';
import sectionImg5 from '/home-section-5.png';

import type { ProductCardVerticalProps } from '@app-types/productCard';

export const FIRST_PRODUCTS: ProductCardVerticalProps[] = [
  {
    id: 1,
    size: '128',
    imageUrl: sectionImg1,
    name: '[재출시] 입큰 퍼스널 톤 코렉팅 블렌딩',
    totalPrice: '3,000',
    tags: [
      { label: 'BEST', bg: theme.colors.primary, color: theme.colors.white },
    ],
  },
  {
    id: 2,
    size: '128',
    imageUrl: sectionImg2,
    name: '비즈 크로스백 동물 키링',
    totalPrice: '2,000',
    tags: [
      { label: 'BEST', bg: theme.colors.primary, color: theme.colors.white },
    ],
  },
  {
    id: 3,
    size: '128',
    imageUrl: sectionImg3,
    name: '치약걸이 3개입',
    totalPrice: '1,000',
    tags: [
      { label: 'BEST', bg: theme.colors.primary, color: theme.colors.white },
    ],
  },
  {
    id: 4,
    size: '128',
    imageUrl: sectionImg4,
    name: '템바보드 멀티탭 정리함',
    totalPrice: '3,000',
    tags: [
      { label: 'BEST', bg: theme.colors.primary, color: theme.colors.white },
    ],
  },
  {
    id: 5,
    size: '128',
    imageUrl: sectionImg5,
    name: '요뽀끼 매콤달콤 떡볶이 140g',
    totalPrice: '2,000',
    tags: [
      { label: 'BEST', bg: theme.colors.primary, color: theme.colors.white },
    ],
  },
];
