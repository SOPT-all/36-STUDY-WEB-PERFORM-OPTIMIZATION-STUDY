import * as H from '@pages/HomePage/HomeSectionCard/HomeSectionCard.style';
import SectionTitle from '@components/common/SectionTitle/SectionTitle';
import BannerWithText from '@pages/HomePage/SpecialSection/BannerWithText';
import { SPECIAL_BANNERS } from '@pages/HomePage/mockData/specialBannerData';

interface SpecialSectionProps {
  title1: string;
  subtitle?: string;
  onClickAll?: () => void;
}

const SpecialSection = ({
  title1,
  subtitle,
  onClickAll,
}: SpecialSectionProps) => (
  <div css={H.wrapper}>
    <SectionTitle title1={title1} subtitle={subtitle} onClickAll={onClickAll} />
    <div css={H.imageWrapper}>
      {SPECIAL_BANNERS.map((banner, index) => (
        <BannerWithText
          key={index}
          backgroundImage={banner.backgroundImage}
          title={banner.title}
          subtitle={banner.subtitle}
        />
      ))}
    </div>
  </div>
);

export default SpecialSection;
