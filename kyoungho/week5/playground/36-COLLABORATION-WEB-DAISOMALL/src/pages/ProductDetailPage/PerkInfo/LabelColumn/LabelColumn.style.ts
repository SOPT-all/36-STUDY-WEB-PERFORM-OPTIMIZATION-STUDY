import { css } from '@emotion/react';
import theme from '@styles/theme';

export const labelColumn = css`
  width: 7rem;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
`;

export const label = css`
  color: ${theme.colors['gray-03']};
  ${theme.fonts['body-14R']};
  word-wrap: break-word;
`; 