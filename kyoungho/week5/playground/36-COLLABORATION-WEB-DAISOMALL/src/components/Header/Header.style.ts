import { css, keyframes } from '@emotion/react';
import theme from '@styles/theme';

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

export const AnimatedWrapper = (visible: boolean) => css`
  position: fixed;
  top: 0;
  max-width: 430px;
  width: 100%;
  z-index: 100;
  background-color: white;
  padding: 0 1.6rem;
  height: 4.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: ${visible ? slideDown : slideUp} 0.25s ease forwards;
  animation-delay: ${visible ? '0s' : '0.1s'};
  max-width: 430px;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const Wrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.6rem;
  height: 4.8rem;
`;

export const LeftContainer = css`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

export const Title = css`
  width: 18.3rem;
  ${theme.fonts['heading-16B']}
  color: ${theme.colors.black};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NavIcons = css`
  margin: 1.2rem 0.5rem 1.2rem 0.6rem;
  cursor: pointer;
  width: 2.4rem;
`;

export const RightContainer = css`
  display: flex;
  gap: 0.4rem;
`;
