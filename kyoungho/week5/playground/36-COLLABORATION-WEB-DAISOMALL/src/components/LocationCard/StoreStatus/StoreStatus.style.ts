import { css } from '@emotion/react';
import theme from '@styles/theme';

export const Wrapper = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const StatusDot = (isOpen: boolean) => css`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: ${isOpen
    ? theme.colors['store-open']
    : theme.colors['gray-03']};
`;

export const StatusLabel = css`
  ${theme.fonts['caption-12R']};
  color: ${theme.colors['gray-02']};
`;
