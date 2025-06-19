import { css } from '@emotion/react';
import theme from '@styles/theme';

export const Wrapper = css`
  display: flex;
  gap: 0.8rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.8rem 1.6rem 1.6rem 1.6rem;
  background-color: ${theme.colors.white};
  border-top: 1px solid ${theme.colors['gray-05']};
`;

export const IconWrapper = css`
  display: flex;
  width: 4.8rem;
  height: 4.8rem;
  padding: 1.2rem;
  border-radius: 4px;
  border: 1px solid ${theme.colors['gray-04']};
  background-color: ${theme.colors.white};
`;

export const IconStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.4rem;
  height: 2.4rem;
`;

export const ButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4.8rem;
  padding: 1.5rem 11.5rem;
  width: 100%;
  border-style: none;
  border-radius: 4px;
  background-color: ${theme.colors['gray-01']};
  ${theme.fonts['button-14B']}
  color: ${theme.colors.white};
`;
