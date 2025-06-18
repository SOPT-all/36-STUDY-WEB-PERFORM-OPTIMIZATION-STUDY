import * as S from './PickupDetailsSection.style';
import PickupTomorrow from '@assets/svgs/PickupTomorrow';
import QuestionCircle from '@assets/svgs/QuestionCircle';
import type { ReactNode } from 'react';

interface TextWithIconProps {
  text: string;
  icon?: ReactNode;
  additionalIcon?: ReactNode;
}

const TextWithIconComponent = ({ text, icon, additionalIcon }: TextWithIconProps) => {
  return (
    <div css={S.TextWithIcon}>
      <span>{text}</span>
      {icon && icon}
      {additionalIcon && (
        <div css={S.QuestionCircleContainer}>
          {additionalIcon}
        </div>
      )}
    </div>
  );
};

interface PickupInfoProps {
  text: string;
  icon?: ReactNode;
}

const PickupInfoComponent = ({ text, icon }: PickupInfoProps) => {
  return (
    <div css={S.PickupInfoWrapper}>
      <span css={S.PickupInfoText}>{text}</span>
      {icon && (
        <div css={S.QuestionCircleAlignBottom}>
          {icon}
        </div>
      )}
    </div>
  );
};

const PickupDetailsSection = () => {
  return (
    <>
      <div css={S.InfoRow}>
        <span css={S.InfoLabel}>픽업정보</span>
        
        <div css={S.InfoContent}>

          <TextWithIconComponent 
            text="매장픽업 마감, 지금 결제하면" 
            icon={
              <div css={S.PickupTomorrowContainer}>
                <PickupTomorrow />
              </div>
            }
            additionalIcon={<QuestionCircle />}
          />

          <PickupInfoComponent 
            text="결제 후 상품준비 완료 알림톡(픽업바코드)
24시간 이내 발송, 최대 2일까지 픽업 가능"
            icon={<QuestionCircle />}
          />
          
          <TextWithIconComponent 
            text="픽업 수수료 200원" 
            additionalIcon={<QuestionCircle />}
          />
          
        </div>
      </div>
    </>
  );
};

export default PickupDetailsSection; 