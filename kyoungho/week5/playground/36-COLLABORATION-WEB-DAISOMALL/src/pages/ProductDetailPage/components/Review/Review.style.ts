import { css } from '@emotion/react';
import theme from '@styles/theme';

export const Wrapper = css``;

export const UpperContainer = css`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 1.6rem 1.6rem 3.2rem 1.6rem;
`;

export const RatingContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
`;

export const averageRating = css`
  ${theme.fonts['number-40R']}
  color: ${theme.colors['gray-01']};
`;

export const KeywordContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

export const MiddleContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem;
`;

export const LowerContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem;
`;

export const FilteringContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonContainer = css`
  display: flex;
  gap: 0.8rem;
`;

export const AllBtn = css`
  display: flex;
  padding: 0.8rem 1.2rem;

  border-radius: 16px;
  border: none;
  background: ${theme.colors['gray-01']};

  ${theme.fonts['button-14B']}
  color: ${theme.colors.white};
`;

export const RepurchaseBtn = css`
  display: flex;
  padding: 0.8rem 1.2rem;

  border-radius: 16px;
  border: 1px solid ${theme.colors['gray-05']};
  background: ${theme.colors.white};

  ${theme.fonts['button-14R']}
  color: ${theme.colors['gray-01']};
`;

export const DropdownContainer = css`
  display: flex;
  align-items: center;
`;

export const Recommendation = css`
  ${theme.fonts['button-14R']}
  color: ${theme.colors['gray-01']};
`;

export const ArrowIcon = css`
  width: 2.4rem;
  height: 2.4rem;
  padding: 0 0.7rem;
`;
