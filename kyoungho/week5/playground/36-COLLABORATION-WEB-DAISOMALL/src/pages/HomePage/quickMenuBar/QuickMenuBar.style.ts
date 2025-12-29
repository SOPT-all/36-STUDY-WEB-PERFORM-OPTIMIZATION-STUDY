import { css } from '@emotion/react';
import theme from '@styles/theme';

export const wrapper = css`
  display: flex;
  overflow-x: auto;
  gap: 0.8rem;
  padding: 2rem 1.6rem;
  max-width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const menuItem = css`
  flex: 0 0 auto;
  width: 7.2rem;
  height: 7.2rem;
  background: ${theme.colors['gray-06']};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  padding-bottom: 0.9rem;
`;

export const icon = css`
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const label = css`
  color: ${theme.colors['gray-02']};
  ${theme.fonts['display-12M']};
  white-space: nowrap;
`;
