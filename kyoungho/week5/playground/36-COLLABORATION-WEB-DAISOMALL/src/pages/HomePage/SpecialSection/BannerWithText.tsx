import * as H from '@pages/HomePage/HomeSectionCard/HomeSectionCard.style';

interface BannerWithTextProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
}

const BannerWithText = ({
  backgroundImage,
  title,
  subtitle,
}: BannerWithTextProps) => (
  <div css={H.dynamicBanner(backgroundImage)}>
    <div css={H.textGroup}>
      <div css={H.title}>{title}</div>
      <div css={H.subtitle}>{subtitle}</div>
    </div>
  </div>
);

export default BannerWithText;
