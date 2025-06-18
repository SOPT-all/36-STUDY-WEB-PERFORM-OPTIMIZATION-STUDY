import * as S from './SectionTitle.style';
import theme from '@styles/theme';
import { SmallArrowRightIcon } from '@assets/svgs';

interface SectionTitleProps {
  title1: string;
  title2?: string;
  subtitle?: string;
  onClickAll?: () => void;
  image?: React.ReactNode;
  title1Color?: string;
  title2Color?: string;
}

const SectionTitle = ({
  title1,
  title2,
  subtitle,
  onClickAll,
  image,
  title1Color = theme.colors['gray-01'],
  title2Color = theme.colors['gray-01'],
}: SectionTitleProps) => (
  <div css={S.wrapper}>
    <div css={S.topRow}>
      <div css={S.leftGroup}>
        {image && <div css={S.image}>{image}</div>}
        <div css={S.titleRow}>
          <span css={S.titleDynamic(title1Color)}>{title1}</span>
          {title2 && <span css={S.titleDynamic(title2Color)}>{title2}</span>}
        </div>
      </div>
      <button type="button" onClick={onClickAll} css={S.allButton}>
        <span css={S.allText}>전체보기</span>
        <SmallArrowRightIcon />
      </button>
    </div>
    {subtitle && <span css={S.subtitle}>{subtitle}</span>}
  </div>
);

export default SectionTitle;
