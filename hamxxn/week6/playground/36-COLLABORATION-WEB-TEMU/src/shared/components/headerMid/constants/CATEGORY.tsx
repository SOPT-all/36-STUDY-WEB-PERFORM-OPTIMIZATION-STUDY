import type { CategoryTitleTypes } from '@shared/components/headerMid/types/category';
import { SocialSVG } from '@shared/components/socialSVG/SocialSVG';

export const CATEGORY_TITLE: CategoryTitleTypes[] = [
  {
    id: 'fashion',
    iconBlack: () => <SocialSVG id="ic-goods-black" width="2.4rem" height="2.4rem" />,
    iconWhite: () => <SocialSVG id="ic-goods-white" width="2.4rem" height="2.4rem" />,
    title: '의류·잡화·뷰티',
  },
  {
    id: 'baby',
    iconBlack: () => <SocialSVG id="ic-baby-black" width="2.4rem" height="2.4rem" />,
    iconWhite: () => <SocialSVG id="ic-baby-white" width="2.4rem" height="2.4rem" />,
    title: '유아동',
  },
  {
    id: 'life',
    iconBlack: () => <SocialSVG id="ic-goods-black" width="2.4rem" height="2.4rem" />,
    iconWhite: () => <SocialSVG id="ic-goods-white" width="2.4rem" height="2.4rem" />,
    title: '생필품',
  },
  {
    id: 'kitchen',
    iconBlack: () => <SocialSVG id="ic-kitchen-black" width="2.4rem" height="2.4rem" />,
    iconWhite: () => <SocialSVG id="ic-kitchen-white" width="2.4rem" height="2.4rem" />,
    title: '홈·주방',
  },
  {
    id: 'digital',
    iconBlack: () => <SocialSVG id="ic-digital-black" width="2.4rem" height="2.4rem" />,
    iconWhite: () => <SocialSVG id="ic-digital-white" width="2.4rem" height="2.4rem" />,
    title: '디지털·가전',
  },
  {
    id: 'sports',
    iconBlack: () => <SocialSVG id="ic-sport-black" width="2.4rem" height="2.4rem" />,
    iconWhite: () => <SocialSVG id="ic-sport-white" width="2.4rem" height="2.4rem" />,
    title: '스포츠·건강',
  },
  {
    id: 'car',
    iconBlack: () => <SocialSVG id="ic-car-black" width="2.4rem" height="2.4rem" />,
    iconWhite: () => <SocialSVG id="ic-car-white" width="2.4rem" height="2.4rem" />,
    title: '자동차·공구',
  },
  {
    id: 'book',
    iconBlack: () => <SocialSVG id="ic-book-black" width="2.4rem" height="2.4rem" />,
    iconWhite: () => <SocialSVG id="ic-book-white" width="2.4rem" height="2.4rem" />,
    title: '도서',
  },
];

export const CATEGORY_DETAIL_MAP = {
  fashion: [
    {
      title: '의류',
      category: [
        { id: 'woman', title: '여성의류' },
        { id: 'man', title: '남성의류' },
        { id: 'underwear', title: '언더웨어' },
      ],
    },
    {
      title: '잡화',
      category: [
        { id: 'shoes', title: '신발' },
        { id: 'bag', title: '가방/잡화' },
        { id: 'accessory', title: '쥬얼리/시계' },
      ],
    },
    {
      title: '뷰티',
      category: [
        { id: 'skincare', title: '스킨케어' },
        { id: 'makeup', title: '메이크업' },
        { id: 'body/hair', title: '바디/헤어' },
        { id: 'mens-makeup', title: '남성용 화장품' },
        { id: 'perfume', title: '향수' },
        { id: 'tool', title: '미용소품/기기' },
      ],
    },
  ],
  // 나머지 카테고리들도 동일한 방식으로 구성하세요.
};
