import * as R from '@pages/HomePage/RankingSection/RankingSection.style';
import ProductCardRanking from '@components/ProductCard/ProductCardRanking/ProductCardRanking';
import { FIRST_RANKING_PRODUCTS } from '@pages/HomePage/mockData/rankingProducts';

const renderRankingCards = () => (
  <div css={R.cardWrapper}>
    {FIRST_RANKING_PRODUCTS.map((product) => (
      <ProductCardRanking key={product.rank} {...product} />
    ))}
  </div>
);

export const getSlideRankingProducts = () => [
  {
    id: 1,
    content: renderRankingCards(),
  },
  {
    id: 2,
    content: null,
  },
  {
    id: 3,
    content: null,
  },
];
