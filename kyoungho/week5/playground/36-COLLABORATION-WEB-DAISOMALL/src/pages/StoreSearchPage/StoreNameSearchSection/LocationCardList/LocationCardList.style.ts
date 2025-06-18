import { css } from '@emotion/react';
import theme from '@styles/theme';

export const cardListWrapper = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2rem;
`;

export const countResult = css`
  ${theme.fonts['heading-14B']};
  color: ${theme.colors['black']};
`;
