import { css } from '@emotion/react';
import theme from '@styles/theme';

export const MovableNavWrapper = (headerVisible: boolean) => css`
  padding: 1.1rem 1.6rem 0.8rem;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: ${theme.colors['white']}
    ${headerVisible &&
    css`
      position: fixed;
      top: 4.8rem;
      transition: top 0.2s ease;
      transition-delay: 0.1s;
      z-index: 1;
      background-color: white;
      max-width: 430px;
      margin: 0 auto;
      box-sizing: border-box;
    `};
`;

export const TabList = css`
  display: flex;
  justify-content: space-between;
`;

export const BasicText = css`
  position: relative;
  ${theme.fonts['heading-16B']};
  color: ${theme.colors['gray-01']};
  cursor: pointer;
`;

export const SelectedText = css`
  ${theme.fonts['heading-16B']};
  cursor: pointer;
  color: ${theme.colors.primary};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.3rem;
    left: -0.32rem;
    width: 2.2rem;
    height: 0.3rem;
    background-color: ${theme.colors.primary};
  }
`;

export const badge = css`
  position: absolute;
  top: -0.2rem;
  color: ${theme.colors.primary};
  font-family: Pretendard;
  font-size: 8px;
  font-weight: 700;
  line-height: 6px;
  letter-spacing: 0.1px;
`;
