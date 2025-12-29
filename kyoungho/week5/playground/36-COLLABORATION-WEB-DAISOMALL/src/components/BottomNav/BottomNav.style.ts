import { css } from '@emotion/react';
import theme from '@styles/theme';

export const Wrapper = css`
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5.6rem;
  z-index: 100;
  border-top: 1px solid ${theme.colors['gray-05']};
  background: #fff;
  transition: transform 0.3s ease-in-out;
`;

export const Container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.9rem 1rem;
  width: 7.2rem;
  cursor: pointer;
`;

export const BasicIcon = css`
  width: 2.4rem;
`;

export const HomeIcon = css`
  width: 2.4rem;
`;

export const CenterContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0.9rem 1rem;
  width: 8.6rem;
  cursor: pointer;
`;

export const CircleButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -3rem;
  padding: 1.2rem 1.3rem;
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 30px;
  background-color: ${theme.colors['gray-01']};
`;

export const OfflineSearchIcon = css`
  width: 3.36rem;
  height: 3.36rem;
`;

export const OfflineSearchIconActive = css`
  width: 2.4rem;
  height: 2.4rem;
`;

export const Caption = css`
  ${theme.fonts['caption-10SB']}
  color: ${theme.colors['gray-01']};
`;

export const CenterCaption = (isActive: boolean) => css`
  ${theme.fonts['caption-10SB']}
  color: ${theme.colors['gray-01']};
  margin-top: ${isActive ? '0.4rem' : '2.25rem'};
`;
