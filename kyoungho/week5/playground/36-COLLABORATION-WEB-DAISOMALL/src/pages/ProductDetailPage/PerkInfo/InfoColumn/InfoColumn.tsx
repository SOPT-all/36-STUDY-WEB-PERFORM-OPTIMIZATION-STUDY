/** @jsxImportSource @emotion/react */
import * as S from './InfoColumn.style';
// SVG 컴포넌트를 실제 SVG 파일로 변경

interface BenefitInfo {
  text: string;
  hasIcon?: boolean;
}

interface InfoColumnProps {
  pointInfo: string;
  benefitInfo: BenefitInfo[];
}

const InfoColumn = ({ pointInfo, benefitInfo }: InfoColumnProps) => {
  return (
    <main css={S.infoColumn}>
      <p css={S.infoText}>{pointInfo}</p>
      <ul css={S.benefitWrapper}>
        {benefitInfo.map((benefit, index) => (
          <li key={index} css={S.benefitContainer}>
            <p css={S.benefitInfoText}>{benefit.text}</p>
            {benefit.hasIcon && (
              <figure css={S.iconContainer}>
                <img src="/svgs/QuestionCircle.svg" alt="문의" />
              </figure>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default InfoColumn; 