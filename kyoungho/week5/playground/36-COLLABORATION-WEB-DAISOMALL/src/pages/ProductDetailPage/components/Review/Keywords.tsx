/** @jsxImportSource @emotion/react */
import * as S from './Keywords.style';

interface KeywordsProps {
  label: string;
  description: string;
  percent: number;
}

const Keywords = ({ label, description, percent }: KeywordsProps) => (
  <div css={S.Container}>
    <div css={S.Label}>{label}</div>

    <div css={S.Content}>
      <div css={S.Description}>{description}</div>
      <div css={S.Line} />
      <div css={S.Percent}>{percent}%</div>
    </div>

    <img src="/svgs/small-arrow-down-icon.svg" alt="Arrow Down" css={S.ArrowIcon} />
  </div>
);

export default Keywords;
