import { css, keyframes } from '@emotion/react';
import theme from '@styles/theme';

const pulse = keyframes`
  0% {
    background-color: #f0f0f0;
  }
  50% {
    background-color: #e0e0e0;
  }
  100% {
    background-color: #f0f0f0;
  }
`;

export const ScrollContainer = css`
  display: flex;
  gap: 0.8rem;
  padding: 0 1.6rem 1.6rem 1.6rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ImageContainer = css`
  position: relative;
  width: 5.8rem;
  height: 5.8rem;
  flex-shrink: 0;
`;

export const Thumbnail = css`
  width: 5.8rem;
  height: 5.8rem;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const MoreWrapper = css`
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

export const MoreText = css`
  color: ${theme.colors.white};
  ${theme.fonts['body-12R']}
  word-wrap: break-word;
  text-align: center;
`;

export const SkeletonThumbnail = css`
  width: 5.8rem;
  height: 5.8rem;
  border-radius: 4px;
  flex-shrink: 0;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;
