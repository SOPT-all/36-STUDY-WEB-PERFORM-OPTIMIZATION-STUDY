import { css, keyframes } from '@emotion/react';
import theme from '@styles/theme';

export const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.6rem;
  overflow-x: auto;
  padding: 0 1.6rem 3.2rem 1.6rem;

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
`;

export const imageContainer = css`
  position: relative;
  width: 5.8rem;
  height: 5.8rem;
  flex-shrink: 0;
`;

export const image = css`
  width: 5.8rem;
  height: 5.8rem;
  border-radius: 4px;
  flex-shrink: 0;
`;

export const moreWrapper = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%);
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  cursor: pointer;
`;

export const moreText = css`
  color: ${theme.colors.white};
  ${theme.fonts['body-12R']}
  word-wrap: break-word;
  text-align: center;
`;

const pulse = keyframes`
  0% {
    background-color: ${theme.colors['gray-05']};
  }
  50% {
    background-color: ${theme.colors['gray-04']};
  }
  100% {
    background-color: ${theme.colors['gray-05']};
  }
`;

const skeletonBase = css`
  width: 5.8rem;
  height: 5.8rem;
  border-radius: 4px;
  flex-shrink: 0;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const skeletonImage = css`
  ${skeletonBase}
`;

export const skeletonMoreWrapper = css`
  ${skeletonBase}
`;

export const emptyReviewText = css`
  width: 100%;
  padding: 2rem 0;
  text-align: center;
  ${theme.fonts['body-14M']};
  color: ${theme.colors['gray-03']};
`;
