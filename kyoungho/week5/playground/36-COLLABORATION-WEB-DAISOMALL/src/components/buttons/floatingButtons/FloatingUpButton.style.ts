// FloatingUpButton.style.ts
import { css } from '@emotion/react';
import theme from '@styles/theme';

export const buttonStyle = (isVisible: boolean) => css`
  position: fixed;
  bottom: 12.6rem;
  right: 1.6rem;
  z-index: 1;

  width: 3.8rem;
  height: 3.8rem;
  border-radius: 20px;

  background-color: ${theme.colors.white};
  box-shadow: ${theme.shadows.floatingButton};
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${isVisible ? '1' : '0'};
  visibility: ${isVisible ? 'visible' : 'hidden'};
  transition:
    opacity 0.3s,
    visibility 0.3s;

  cursor: pointer;
`;

export const iconStyle = css`
  width: 1.3rem;
  height: 1.3rem;
  flex-shrink: 0;

  path {
    fill: ${theme.colors.white};
    stroke: ${theme.colors['gray-01']};
  }
`;
