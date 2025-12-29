import { css } from '@emotion/react';
import theme from '@styles/theme';

export const viewMoreContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const buttonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  width: 100%;
  height: 4.8rem;
  padding: 1.5rem 11.5rem;

  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors['gray-04']};
  border-radius: 4px;

  cursor: pointer;
`;

export const textStyle = css`
  color: ${theme.colors['gray-01']};
  ${theme.fonts['button-14B']}

  white-space: nowrap;
`;

export const iconWrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.4rem;
  height: 2.4rem;
  padding: 0 0.7rem;
  flex-shrink: 0;
`;

export const iconStyle = css`
  flex-shrink: 0;
`;

export const contentStyle = css`
  width: 100%;
  padding-top: 1rem;

  color: ${theme.colors['gray-01']};
  ${theme.fonts['body-14R']}
`;
