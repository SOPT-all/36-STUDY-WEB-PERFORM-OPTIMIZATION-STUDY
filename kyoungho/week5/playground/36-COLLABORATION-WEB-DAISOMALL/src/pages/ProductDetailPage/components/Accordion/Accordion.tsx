import AccordionButton from '@components/buttons/accordion/AccordionButton';
import * as S from './Accordion.style';
import theme from '@styles/theme';
import Divider from '@components/common/divider/Divider';
// SVG 컴포넌트를 실제 SVG 파일로 변경

const Accordion = () => (
  <div css={S.Wrapper}>
    <AccordionButton title="상품정보 제공 고시">
      <ul css={S.InfoList}>
        <li css={S.Info}>
          <div css={S.InfoTitle}>1. 내용물의 용량 또는 중량</div>
          <div css={S.InfoContent}>상세페이지 참조</div>
        </li>
        <li css={S.Info}>
          <div css={S.InfoTitle}>2. 제품 주요 사양</div>
          <div css={S.InfoContent}>상세페이지 참조</div>
        </li>
        <li css={S.Info}>
          <div css={S.InfoTitle}>3. 사용기한 또는 개봉 후 사용기간</div>
          <div css={S.InfoContent}>상세페이지 참조</div>
        </li>
        <li css={S.Info}>
          <div css={S.InfoTitle}>4. 사용방법</div>
          <div css={S.InfoContent}>상세페이지 참조</div>
        </li>
      </ul>
    </AccordionButton>
    <Divider height="8px" color={theme.colors['gray-06']} />
    <AccordionButton title="반품/교환/환불 안내">
      <ul css={S.InfoList}>
        <li css={S.Info}>
          <div css={S.InfoTitle}>주문 취소</div>
          <div css={S.InfoContent}>
            <p>상품 준비가 시작되면 주문 취소가 불가합니다.</p>
            <br />
            <span>(※ 배송준비중/픽업준비중인 주문은 취소 불가)</span>
          </div>
        </li>
        <li css={S.Info}>
          <div css={S.InfoTitle}>교환/반품 유의사항</div>
          <div css={S.InfoContent}>
            교환/반품에 관한 일반적인 사항은 다이소몰의 개별 기준보다 관계법령이
            우선합니다. 다만, 다이소몰의 교환/반품 정책이 관계법령보다
            소비자에게 유리한 경우에는 다이소몰 기준으로 적용됩니다.
          </div>
        </li>
      </ul>
    </AccordionButton>
    <Divider height="8px" color={theme.colors['gray-06']} />
    <AccordionButton title="고객센터" defaultOpen={true}>
      <div css={S.ContactWrapper}>
        <div css={S.ContactSection}>
          <img src="/svgs/contact-icon.svg" alt="문의" width={24} />

          <div css={S.ContentSection}>
            <p css={S.ContactTitle}>다이소몰(온라인) / 모바일 상품권 문의</p>
            <p css={S.ContactContent}>1599-2211</p>
          </div>
        </div>

        <div css={S.ContactSection}>
          <img src="/svgs/contact-icon.svg" alt="문의" width={24} />

          <div css={S.ContentSection}>
            <p css={S.ContactTitle}>기타 오프라인 매장 문의</p>
            <p css={S.ContactContent}>1522-4400</p>
          </div>
        </div>
      </div>
    </AccordionButton>
  </div>
);

export default Accordion;
