import { css } from '@emotion/react';
import theme from '@styles/theme';

export const buttonStyle = css`
  position: fixed;
  bottom: 7.4rem;
  right: 1.6rem;
  z-index: 1;

  display: flex;
  width: 3.8rem;
  height: 3.8rem;
  padding: 0.7rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  border-radius: 20px;
  background-color: ${theme.colors['red-02']};
  box-shadow: ${theme.shadows.floatingButton};
  border: none;

  cursor: pointer;
`;

export const iconStyle = css`
  width: 2.4rem;
  height: 2.4rem;

  path {
    stroke: ${theme.colors.primary};
  }
`;
