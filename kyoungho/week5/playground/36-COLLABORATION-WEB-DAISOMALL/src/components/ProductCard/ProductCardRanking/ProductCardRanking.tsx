import * as R from '@components/ProductCard/ProductCardRanking/ProductCardRanking.style';
import ProductTag from '@components/Tag/ProductTag';
// SVG 컴포넌트를 실제 SVG 파일로 변경
import type { ProductTagData } from '@components/Tag/tagData';
import { memo } from 'react';
import LazyImage from './LazyImage';

interface ProductCardRankingProps {
  rank?: number;
  imageUrl: string;
  name: string;
  price: string;
  tags?: ProductTagData[];
  code?: string;
  showCartIcon?: boolean;
  onClick?: () => void;
}

const ProductCardRanking = ({
  rank,
  imageUrl,
  name,
  price,
  tags = [],
  code,
  showCartIcon = true,
  onClick,
}: ProductCardRankingProps) => (
  <div onClick={onClick} css={R.rankingWrapper(!!code)}>
    <div css={R.rankingContent(!!code)}>
      {rank && <div css={R.rankingNumber}>{rank}</div>}

      <div css={R.rankingImageWrapper}>
        <LazyImage src={imageUrl} alt={name} />
      </div>

      <div css={R.rankingInfoArea(!!code)}>
        <div css={R.rankingTextGroup(!!code)}>
          <div css={R.priceRow}>
            <span css={R.rankingPrice}>{price}</span>
            <span css={R.rankingWon}>원</span>
          </div>
          <p css={R.rankingName}>{name}</p>
        </div>

        {code ? <p css={R.code}>품번: {code}</p> : null}
        <div css={R.tagList}>
          {tags.map((tag) => (
            <ProductTag
              key={tag.label}
              label={tag.label}
              bg={tag.bg}
              color={tag.color}
              icon={tag.icon}
            />
          ))}
        </div>
      </div>
    </div>

    {showCartIcon && (
      <div css={R.cartButton}>
        <img src="/svgs/cart-icon.svg" alt="Cart" css={R.cartIcon} />
      </div>
    )}
  </div>
);

export default memo(ProductCardRanking);
