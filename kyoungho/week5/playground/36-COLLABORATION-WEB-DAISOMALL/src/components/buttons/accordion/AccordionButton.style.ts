import { css } from '@emotion/react';
import theme from '@styles/theme';

export const accordionContainer = css`
  width: 100%;
  background-color: ${theme.colors.white};
`;

export const buttonStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 4.8rem;
  padding: 1.2rem 1.6rem;

  background-color: ${theme.colors.white};
  border: none;

  cursor: pointer;
`;

export const titleStyle = css`
  color: ${theme.colors['gray-01']};
  ${theme.fonts['heading-14B']}
`;

export const iconStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.4rem;
  height: 2.4rem;
  padding: 0 0.7rem;

  color: ${theme.colors['gray-02']};

  svg {
    width: 1rem;
    height: 0.5rem;
  }
`;

export const contentWrapper = (isOpen: boolean) => css`
  overflow: hidden;
  transition: max-height 0.3s ease;
  max-height: ${isOpen ? '1000px' : '0'};
`;

export const contentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;

  background-color: ${theme.colors.white};
  color: ${theme.colors['gray-01']};

  ${theme.fonts['body-14R']}
`;
