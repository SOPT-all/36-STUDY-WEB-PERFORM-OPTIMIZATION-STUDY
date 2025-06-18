/** @jsxImportSource @emotion/react */
import * as S from './ProductHeader.style';
import { ArrowRightIcon } from '@assets/svgs';

interface ProductHeaderProps {
  brandName?: string;
  productName?: string;
  price?: string;
}

const ProductHeader = ({ brandName, productName, price }: ProductHeaderProps) => {
  // price를 숫자로 변환하고 포맷팅
  const formatPrice = (priceStr?: string) => {
    if (!priceStr) return '0';
    const numPrice = parseInt(priceStr);
    return numPrice.toLocaleString();
  };

  return (
    <header css={S.ProductBrandAndName}>
      <div css={S.Brand}>
        <span css={S.BrandText}>{brandName || ''}</span>
        <span css={S.RightArrowWrapper}>
          <ArrowRightIcon css={S.RightArrow} />
        </span>
      </div>
      <div css={S.NameAndPrice}>
        <h1 css={S.ProductName}>
          {productName || ''}
        </h1>
        <p css={S.Price}>
          <span css={S.PriceAmount}>{formatPrice(price)}</span>
          <span css={S.PriceUnit}>원</span>
        </p>
      </div>
    </header>
  );
};

export default ProductHeader; 