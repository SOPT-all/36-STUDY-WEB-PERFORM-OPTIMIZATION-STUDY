import { css, keyframes } from '@emotion/react';
import theme from '@styles/theme';

// 스켈레톤 UI를 위한 애니메이션 추가
const skeletonAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const container = css`
  width: 100%;
  min-height: 20rem;
  position: relative;
  padding: 0 2.4rem;
  display: flex;
  align-items: center;
`;

export const contentWrapper = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1.6rem;
  width: 100%;
`;

export const imageContainer = css`
  width: 7rem;
  height: 7rem;
  position: relative;
  flex-shrink: 0;
`;

export const brandImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.4rem;
`;

export const infoContainer = css`
  width: 100%;
  max-width: 24.1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.9rem;
`;

export const brandName = css`
  width: 100%;
  color: ${theme.colors['gray-01']};
  ${theme.fonts['heading-14B']};
  word-wrap: break-word;
`;

export const brandDescription = css`
  width: 100%;
  color: ${theme.colors['gray-01']};
  ${theme.fonts['body-14R']};
  word-wrap: break-word;
`;

// 스켈레톤 UI 스타일 추가
export const skeletonBase = css`
  background: linear-gradient(90deg, ${theme.colors['gray-05']} 25%, ${theme.colors['gray-06']} 37%, ${theme.colors['gray-05']} 63%);
  background-size: 400% 100%;
  animation: ${skeletonAnimation} 1.4s ease infinite;
`;

export const skeletonImageContainer = css`
  ${imageContainer}
  border-radius: 0.4rem;
  overflow: hidden;
  ${skeletonBase}
`;

export const skeletonBrandName = css`
  width: 50%;
  height: 1.6rem;
  border-radius: 0.2rem;
  ${skeletonBase}
`;

export const skeletonBrandDescription = css`
  width: 100%;
  height: 4.2rem;
  border-radius: 0.2rem;
  ${skeletonBase}
`;
