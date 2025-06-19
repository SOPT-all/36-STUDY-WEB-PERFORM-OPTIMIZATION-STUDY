import { css } from '@emotion/react';
import theme from '@styles/theme';

// 슬라이더 터치 스타일 재정의를 위한 유틸리티 CSS
const noTouchHighlight = css`
  outline: none;
  border: none;

  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const homeCarouselWrapper = css`
  position: relative;
  width: 100%;
  height: 24.4rem;
  overflow: hidden;

  /* 터치 시 하이라이트/테두리 제거 */
  .slick-slider {
    touch-action: pan-y;
  }

  .slick-slide,
  .slick-slide:focus,
  .slick-slide:active,
  .slick-slide div,
  .slick-slide img {
    ${noTouchHighlight}
  }
`;

export const gradientBackground = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  width: 100%;
  height: 100%;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0) 50%
  );
  pointer-events: none;
`;

export const bottomContent = css`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 20;

  width: 100%;
  padding: 0 1.6rem 1.8rem;

  pointer-events: none;
`;

export const contentWrapper = css`
  display: flex;
  flex-wrap: wrap;

  width: 34.3rem;

  justify-content: space-between;
  align-items: flex-end;
  align-content: flex-end;

  row-gap: 1.1rem;
`;

export const textContainer = css`
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  gap: 1.1rem;
`;

export const titleText = css`
  width: 22.2rem;

  color: ${theme.colors.white};
  ${theme.fonts['display-24B']};
  white-space: pre-line;
`;

export const tagsContainer = css`
  display: flex;

  height: 2.2rem;

  align-items: center;
  align-self: stretch;

  gap: 0.4rem;

  backdrop-filter: blur(0.5px);
`;

export const tagItem = css`
  display: flex;

  height: 2.2rem;
  padding: 0.2rem 0.4rem;

  justify-content: center;
  align-items: center;

  gap: 1rem;

  border-radius: 0.4rem;
  background: rgba(255, 255, 255, 0.3);

  color: ${theme.colors.white};
  ${theme.fonts['display-12M']};
`;
