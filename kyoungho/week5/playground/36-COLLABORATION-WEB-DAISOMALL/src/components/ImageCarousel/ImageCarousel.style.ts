import { css } from '@emotion/react';

export const CarouselContainer = (height?: string) => css`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: ${height || 'auto'};

  .slick-slider {
    width: 100%;
    height: ${height || 'auto'};
  }

  .slick-track {
    display: flex;
    height: ${height || 'auto'};
  }

  .slick-slide {
    height: ${height || 'auto'};
  }

  .slick-slide > div {
    height: 100%;
    width: 100%;
  }
`;

export const CarouselImage = (height?: string) => css`
  width: 100%;
  height: ${height || 'auto'};
  display: block;
  object-fit: ${height ? 'cover' : 'contain'};
`;
