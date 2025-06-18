import { css } from '@emotion/react';
import theme from '@styles/theme';

export const wrapper = (size: '96' | '128') => css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: ${size === '96' ? '9.6rem' : '12.8rem'};
`;

export const imageWrapper = (size: '96' | '128') => css`
  width: ${size === '96' ? '9.6rem' : '12.8rem'};
  height: ${size === '96' ? '12.8rem' : '16.8rem'};
  position: relative;
  overflow: hidden;
`;

export const image = css`
  width: 100%;
  height: 100%;
  border-radius: 2px;
  object-fit: cover;
`;

export const snsBadge = css`
  position: absolute;
  top: 0.4rem;
  left: 0.4rem;
`;

export const boxBadge = css`
  position: absolute;
  bottom: 0.4rem;
  left: 0.4rem;
  width: 3.6rem;
  height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const boxText = css`
  position: absolute;
  color: ${theme.colors.white};
  ${theme.fonts['caption-12B']};
  padding: 0.7rem 0.3rem 0.3rem 0.3rem;
  text-align: center;
`;

export const textGroup = css`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const infoArea = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const tagList = css`
  display: flex;
  gap: 0.4rem;
`;

export const unitPriceRow = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const priceRow = css`
  display: flex;
  align-items: flex-start;
`;

export const unitPrice = css`
  ${theme.fonts['number-12R']}
  color: ${theme.colors['gray-01']};
`;

export const unitWon = css`
  ${theme.fonts['caption-10SB']}
  color: ${theme.colors['gray-01']};
`;

export const unitBadge = css`
  height: 1.6rem;
  padding: 0.2rem 0.3rem;
  background: ${theme.colors['gray-01']};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const unitBadgeText = css`
  ${theme.fonts['caption-10SB']}
  color: ${theme.colors.white};
`;

export const cartButton = css`
  width: 3.2rem;
  height: 3.2rem;
  background: ${theme.colors['gray-06']};
  border-radius: 8px;
  position: absolute;
  bottom: 0.4rem;
  right: 0.4rem;
  border: none;
  cursor: pointer;
`;

export const cartIcon = css`
  width: 2rem;
  height: 2rem;
`;

export const infoGroup = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const priceSpan = css`
  color: ${theme.colors['gray-01']};
  ${theme.fonts['number-16R']};
`;

export const StyledSpan = css`
  color: ${theme.colors['gray-01']};
  ${theme.fonts['heading-14B']};
  line-height: 1;
`;

export const priceWrapper = css`
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
`;
