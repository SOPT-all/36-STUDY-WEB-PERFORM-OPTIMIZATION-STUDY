import { css } from '@emotion/react';
import theme from '@styles/theme';

export const container = css`
  width: 100%;
  height: 100%;
  padding: 3.2rem 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
`;

export const title = css`
  text-align: center;
  color: ${theme.colors['gray-01']};
  ${theme.fonts['heading-14B']};
  word-wrap: break-word;
`;

export const contentWrapper = css`
  padding: 0 0.4rem;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.6rem;
`;