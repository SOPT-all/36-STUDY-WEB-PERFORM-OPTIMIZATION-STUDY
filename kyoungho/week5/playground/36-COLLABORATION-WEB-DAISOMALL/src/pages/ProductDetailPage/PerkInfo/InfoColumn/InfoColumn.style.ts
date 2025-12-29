import { css } from '@emotion/react';
import theme from '@styles/theme';

export const infoColumn = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
`;

export const infoText = css`
  color: ${theme.colors['gray-01']};
  ${theme.fonts['body-14R']};
  overflow-wrap: break-word;
`;

export const benefitInfoText = css`
  ${infoText};
  width: 25.6rem;
`;

export const benefitWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.1rem;
`;

export const benefitContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.4rem;
  height: 4.5rem;
`;

export const iconContainer = css`
  width: 1.6rem;
  height: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`; 