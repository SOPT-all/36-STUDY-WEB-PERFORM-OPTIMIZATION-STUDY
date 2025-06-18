import { css } from '@emotion/react';
import theme from '@styles/theme';

export const Rating = css`
  height: 1.4rem;
  justify-content: flex-start;
  align-items: center;
  gap: 0.3rem;
  display: inline-flex;
`;

export const RatingIconWrapper = css`
  width: 1.1rem;
  height: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RatingText = css`
  color: ${theme.colors['gray-03']};
  ${theme.fonts['caption-12R']};
  word-wrap: break-word;
`;

export const ReviewCount = css`
  color: ${theme.colors['gray-03']};
  ${theme.fonts['caption-12R']};
  word-wrap: break-word;
`; 