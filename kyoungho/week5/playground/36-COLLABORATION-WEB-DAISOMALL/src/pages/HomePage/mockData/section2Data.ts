import theme from '@styles/theme';

import sectionImg1 from '/home-section-6.webp';
import sectionImg2 from '/home-section-7.webp';
import sectionImg3 from '/home-section-8.webp';
import sectionImg4 from '/home-section-9.webp';
import sectionImg5 from '/home-section-10.webp';

import type { ProductCardVerticalProps } from '@app-types/productCard';

export const SECOND_PRODUCTS: ProductCardVerticalProps[] = [
  {
    id: 1,
    size: '128',
    imageUrl: sectionImg1,
    name: '랭킹용 앰플',
    totalPrice: '3,000',
    tags: [
      {
        label: '신상',
        bg: theme.colors['gray-05'],
        color: theme.colors.primary,
      },
    ],
  },
  {
    id: 2,
    size: '128',
    imageUrl: sectionImg2,
    name: '랭킹용 앰플',
    totalPrice: '3,000',
    tags: [
      {
        label: '신상',
        bg: theme.colors['gray-05'],
        color: theme.colors.primary,
      },
      {
        label: '픽업전용',
        bg: theme.colors['gray-05'],
        color: theme.colors['gray-03'],
      },
    ],
  },
  {
    id: 3,
    size: '128',
    imageUrl: sectionImg3,
    name: '랭킹용 앰플',
    totalPrice: '3,000',
    tags: [
      {
        label: '신상',
        bg: theme.colors['gray-05'],
        color: theme.colors.primary,
      },
    ],
  },
  {
    id: 4,
    size: '128',
    imageUrl: sectionImg4,
    name: '랭킹용 앰플',
    totalPrice: '3,000',
    tags: [
      {
        label: '신상',
        bg: theme.colors['gray-05'],
        color: theme.colors.primary,
      },
      {
        label: '픽업전용',
        bg: theme.colors['gray-05'],
        color: theme.colors['gray-03'],
      },
    ],
  },
  {
    id: 5,
    size: '128',
    imageUrl: sectionImg5,
    name: '랭킹용 앰플',
    totalPrice: '3,000',
    tags: [
      {
        label: '신상',
        bg: theme.colors['gray-05'],
        color: theme.colors.primary,
      },
      {
        label: '픽업전용',
        bg: theme.colors['gray-05'],
        color: theme.colors['gray-03'],
      },
    ],
  },
];
