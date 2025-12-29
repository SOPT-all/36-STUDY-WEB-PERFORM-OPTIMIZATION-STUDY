import { css } from '@emotion/react';
import theme from '@styles/theme';

export const wrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const topRow = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const leftGroup = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const image = css`
  width: 3.2rem;
  height: 3.2rem;
  flex-shrink: 0;
`;

export const titleRow = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const titleDynamic = (color: string) => css`
  ${theme.fonts['heading-16B']};
  color: ${color};
`;

export const subtitle = css`
  ${theme.fonts['body-14R']};
  color: ${theme.colors['gray-03']};
`;

export const allButton = css`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  gap: 0.6rem;
  cursor: pointer;
`;

export const allText = css`
  ${theme.fonts['button-12R']};
  color: ${theme.colors['gray-01']};
`;
