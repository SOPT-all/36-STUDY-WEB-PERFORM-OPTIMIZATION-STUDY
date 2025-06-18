import { css } from '@emotion/react';
import theme from '../../../styles/theme'; // 경로 수정

// PickupStoreSection.style.ts 와 중복되는 스타일
export const InfoRow = css`
  display: flex;
  gap: 0.4rem; 
  padding: 0 1.6rem 1.8rem 1.6rem;
`;

export const InfoLabel = css`
  ${theme.fonts['body-14R']};
  color: ${theme.colors['gray-03']};
  width: 7rem; 
  padding-left: 0.4rem;
`;

export const InfoContent = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem; 
  padding-right: 0.4rem;

  & > div,
  & > span {
    ${theme.fonts['body-14R']};
    color: ${theme.colors['gray-01']};
  }
`;

export const TextWithIcon = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  overflow: visible;
  position: relative;
`;

export const PickupInfoText = css`
  ${theme.fonts['body-14R']};
  color: ${theme.colors['gray-01']};
  white-space: pre-line;
`;

export const PickupInfoWrapper = css`
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
`;

export const PickupTomorrowContainer = css`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    height: 100%;
    width: auto;
    object-fit: contain;
  }
`;

export const QuestionCircleContainer = css`
  width: 1.6rem;
  height: 1.6rem;
  display: flex; 
  align-items: center;
  justify-content: center;
  svg {
    width: 100%; // 부모 컨테이너 크기에 맞춤
    height: 100%;
  }
`;

export const QuestionCircleAlignBottom = css`
  ${QuestionCircleContainer};
  align-self: flex-end;
`; 