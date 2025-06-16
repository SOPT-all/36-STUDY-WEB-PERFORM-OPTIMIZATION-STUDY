import * as styles from '@/pages/home/Home.css';
import Card from '@shared/components/card/Card';
import type { GetPromotionResponseTypes } from '@pages/home/types/response';
import { mockProducts } from './mockupData';

const PromotionCardList = () => {
  const data = mockProducts;
  const promotionData = data.slice(0, 5) ?? [];

  return (
    <div className={styles.forwardListWrapper}>
      {promotionData.map((cardData: GetPromotionResponseTypes) => (
        <Card
          key={cardData.productId}
          size="l"
          productId={cardData.productId}
          imageUrl={cardData.productImage}
          productName={cardData.productName}
          discountRate={cardData.discountRate}
          discountPrice={cardData.discountPrice}
        />
      ))}
    </div>
  );
};

export default PromotionCardList;
