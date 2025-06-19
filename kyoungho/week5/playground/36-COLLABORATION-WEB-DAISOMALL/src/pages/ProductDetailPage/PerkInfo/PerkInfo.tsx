/** @jsxImportSource @emotion/react */
import * as S from './PerkInfo.style';
import LabelColumn from './LabelColumn/LabelColumn';
import InfoColumn from './InfoColumn/InfoColumn';

const PerkInfo = () => {
  const labels = ['포인트 적립', '결제 혜택'];
  const pointInfo = '0.1% 다이소 포인트 적립';
  const benefitInfo = [
    {
      text: '다이소 삼성카드 다이소몰 이용금액의 1% 할인',
      hasIcon: true
    }
  ];

  return (
    <section css={S.container}>
      <h2 css={S.title}>혜택안내</h2>
      <article css={S.contentWrapper}>
        <LabelColumn labels={labels} />
        <InfoColumn pointInfo={pointInfo} benefitInfo={benefitInfo} />
      </article>
    </section>
  );
};

export default PerkInfo;
