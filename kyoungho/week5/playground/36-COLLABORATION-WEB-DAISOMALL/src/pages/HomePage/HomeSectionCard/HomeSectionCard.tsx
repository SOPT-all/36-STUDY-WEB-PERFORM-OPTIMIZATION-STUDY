import * as H from './HomeSectionCard.style';
import SectionTitle from '@components/common/SectionTitle/SectionTitle';
import Divider from '@components/common/divider/Divider';
import ProductCardVertical from '@components/ProductCard/ProductCardVertical/ProductCardVertical';
import ImageCarousel from '@components/ImageCarousel/ImageCarousel';
import bannerImg1 from '/home-banner-1.png';
import bannerImg2 from '/home-banner-2.png';
import type { ProductTagData } from '@components/Tag/tagData';
const bannerImages = [bannerImg1, bannerImg2];
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
interface HomeSectionCardProps {
  title1: string;
  subtitle?: string;
  productList: ProductCardVerticalProps[];
  onClickAll?: () => void;
  hasBanner?: boolean;
}

const HomeSectionCard = ({
  title1,
  subtitle,
  productList,
  onClickAll,
  hasBanner = false,
}: HomeSectionCardProps) => (
  <div css={H.sectionWrapper(hasBanner)}>
    <div css={H.wrapper}>
      {hasBanner && (
        <>
          <ImageCarousel
            images={bannerImages}
            bottomPadding="1.1rem"
            autoSlideInterval={3000}
            autoplay={true}
          />
          <Divider />
        </>
      )}
      <SectionTitle
        title1={title1}
        subtitle={subtitle}
        onClickAll={onClickAll}
      />
      <div css={H.cardWrapper}>
        {productList.map((product) => (
          <ProductCardVertical key={product.id} {...product} />
        ))}
      </div>
    </div>
  </div>
);

export default HomeSectionCard;
