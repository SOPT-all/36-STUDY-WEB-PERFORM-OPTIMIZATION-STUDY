import theme from '@styles/theme';
import sectionImg1 from '/home-rank-1.png';
import sectionImg2 from '/home-rank-2.png';
import sectionImg3 from '/home-rank-3.png';
import sectionImg4 from '/home-rank-4.png';
import sectionImg5 from '/home-rank-5.png';
import type { ProductCardRankingProps } from '@app-types/productCard';

export const FIRST_RANKING_PRODUCTS: ProductCardRankingProps[] = [
  {
    rank: 1,
    imageUrl: sectionImg1,
    name: 'VT 리들샷 100 페이셜 부스팅 퍼스트 앰플 2ml*6개입',
    price: '3,000',
    tags: [
      { label: 'BEST', bg: theme.colors.primary, color: theme.colors.white },
      {
        label: '최다리뷰상품',
        bg: theme.colors['gray-05'],
        color: theme.colors.primary,
      },
    ],
  },
  {
    rank: 2,
    imageUrl: sectionImg2,
    name: 'VT 리들샷 300 페이셜 부스팅 퍼스트 앰플 2ml*6개입',
    price: '3,000',
    tags: [
      { label: 'BEST', bg: theme.colors.primary, color: theme.colors.white },
    ],
  },
  {
    rank: 3,
    imageUrl: sectionImg3,
    name: '에끌라 깨끗한 물티슈 150매 (캡형)',
    price: '3,000',
    tags: [
      { label: 'BEST', bg: theme.colors.primary, color: theme.colors.white },
    ],
  },
  {
    rank: 4,
    imageUrl: sectionImg4,
    name: '헬로 데일리 미용티슈 280매',
    price: '3,000',
    tags: [
      { label: 'BEST', bg: theme.colors.primary, color: theme.colors.white },
    ],
  },
  {
    rank: 5,
    imageUrl: sectionImg5,
    name: '리빙 뽑아쓰는 키친타월 150매입',
    price: '3,000',
    tags: [
      { label: 'BEST', bg: theme.colors.primary, color: theme.colors.white },
    ],
  },
];
