import * as S from './ProductCardVertical.style';
import * as R from '../ProductCardRanking/ProductCardRanking.style';
import ProductTag from '@components/Tag/ProductTag';
import type { ProductTagData } from '@components/Tag/tagData';
import { CartIcon, SnsIcon, BoxIcon, MultipleIcon } from '@assets/svgs';

interface ProductCardVerticalProps {
  id: number;
  size: '96' | '128';
  name: string;
  totalPrice: string;
  unitPrice?: string;
  imageUrl?: string;
  tags?: ProductTagData[];
  quantityText?: string;
  isSnsHot?: boolean;
  isBoxDelivery?: boolean;
}

const ProductCardVertical = ({
  size,
  name,
  totalPrice,
  unitPrice,
  imageUrl,
  tags = [],
  quantityText,
  isSnsHot = false,
  isBoxDelivery = false,
}: ProductCardVerticalProps) => (
  <div css={S.wrapper(size)}>
    <div css={S.imageWrapper(size)}>
      <img src={imageUrl} alt={name} css={S.image} />

      {isSnsHot && (
        <div css={S.snsBadge}>
          <SnsIcon width={36} height={36} />
        </div>
      )}

      {isBoxDelivery && quantityText && (
        <div css={S.boxBadge}>
          <BoxIcon width={36} height={36} />
          <span css={S.boxText}>{quantityText}</span>
        </div>
      )}

      <button css={S.cartButton}>
        <CartIcon css={S.cartIcon} />
      </button>
    </div>

    <div css={S.infoGroup}>
      <div css={S.infoArea}>
        <div css={S.textGroup}>
          <div css={S.priceWrapper}>
            <span css={S.priceSpan}>{totalPrice}</span>
            <span css={S.StyledSpan}>원</span>
          </div>

          {isBoxDelivery && quantityText && (
            <div css={S.unitPriceRow}>
              <div css={S.priceRow}>
                <span css={S.unitPrice}>{unitPrice}</span>
                <span css={S.unitWon}>원</span>
              </div>
              <MultipleIcon width={5} />
              <div css={S.unitBadge}>
                <span css={S.unitBadgeText}>{quantityText}</span>
              </div>
            </div>
          )}

          <p css={R.rankingName}>{name}</p>
        </div>
      </div>

      <div css={S.tagList}>
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
);

export default ProductCardVertical;
