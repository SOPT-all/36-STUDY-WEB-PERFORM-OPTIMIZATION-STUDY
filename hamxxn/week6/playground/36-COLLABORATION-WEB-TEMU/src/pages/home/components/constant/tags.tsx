import { SocialSVG } from '@shared/components/socialSVG/SocialSVG';
import { Category } from '@/pages/home/components/constant/categorys';

export const TAG = [
  {
    id: Category.RECOMMEND,
    text: '추천',
    icon: () => <SocialSVG id="ic-recommend-black" width="3.2rem" height="3.2rem" />,
  },
  {
    id: Category.GOODS,
    text: '의류·잡화·뷰티',
    icon: () => <SocialSVG id="ic-goods-black" width="3.2rem" height="3.2rem" />,
  },
  {
    id: Category.BABY,
    text: '유·아동',
    icon: () => <SocialSVG id="ic-baby-black" width="3.2rem" height="3.2rem" />,
  },
  {
    id: Category.NECESSITY,
    text: '생활/생필품',
    icon: () => <SocialSVG id="ic-necessity-black" width="3.2rem" height="3.2rem" />,
  },
  {
    id: Category.KITCHEN,
    text: '홈·주방',
    icon: () => <SocialSVG id="ic-kitchen-black" width="3.2rem" height="3.2rem" />,
  },
  {
    id: Category.DIGITAL,
    text: '디지털·가전',
    icon: () => <SocialSVG id="ic-digital-black" width="3.2rem" height="3.2rem" />,
  },
  {
    id: Category.SPORT,
    text: '스포츠·건강',
    icon: () => <SocialSVG id="ic-sport-black" width="3.2rem" height="3.2rem" />,
  },
  {
    id: Category.CAR,
    text: '자동차·공구',
    icon: () => <SocialSVG id="ic-car-black" width="3.2rem" height="3.2rem" />,
  },
  {
    id: Category.BOOK,
    text: '도서',
    icon: () => <SocialSVG id="ic-book-black" width="3.2rem" height="3.2rem" />,
  },
];
