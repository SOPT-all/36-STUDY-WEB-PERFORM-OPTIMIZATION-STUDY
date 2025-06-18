/** @jsxImportSource @emotion/react */
import * as S from './ProductPageInfo.style';
import { ShareIcon } from '@assets/svgs';
import ProductHeader from './ProductHeader';
import Rating from './Rating';

interface ProductPageInfoProps {
  brandName?: string;
  productName?: string;
  price?: string;
  ratingAvg?: string;
  reviewCount?: string;
}

const ProductPageInfo = ({ 
  brandName, 
  productName, 
  price, 
  ratingAvg, 
  reviewCount 
}: ProductPageInfoProps) => {
  return (
    <article css={S.ProductInfoWrapper}>
      <section css={S.ProductDetails}>
        <ProductHeader 
          brandName={brandName}
          productName={productName}
          price={price}
        />
        <Rating 
          ratingAvg={ratingAvg}
          reviewCount={reviewCount}
        />
      </section>
      <button type='button' css={S.ShareButton}>
        <ShareIcon css={S.ShareIcon} />
      </button>
    </article>
  );
};

export default ProductPageInfo; 