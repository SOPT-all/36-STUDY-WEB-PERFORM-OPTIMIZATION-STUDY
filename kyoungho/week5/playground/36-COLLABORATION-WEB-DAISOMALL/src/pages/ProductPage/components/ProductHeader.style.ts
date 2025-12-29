import { css } from '@emotion/react';
import theme from '@styles/theme';

export const ProductBrandAndName = css`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.8rem;
  display: flex;
`;

export const Brand = css`
  justify-content: flex-start;
  align-items: center;
  display: inline-flex;
`;

export const BrandText = css`
  color: ${theme.colors['gray-01']};
  ${theme.fonts['button-14R']};
`;

export const RightArrowWrapper = css`
  width: 2.4rem;
  height: 2.4rem;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const RightArrow = css`
  width: 1.2rem;
  height: 2.4rem;
  path {
    stroke: ${theme.colors['gray-02']};
    stroke-width: 0.1rem;
  }
`;

export const NameAndPrice = css`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  display: flex;
`;

export const ProductName = css`
  width: 29.3rem;
  color: ${theme.colors['gray-01']};
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 400;
  line-height: 145%;
  word-wrap: break-word;
`;

export const Price = css`
  justify-content: flex-start;
  align-items: center;
  gap: 0.1rem;
  height: 3rem;
  display: inline-flex;
`;

export const PriceAmount = css`
  color: ${theme.colors.black};
  ${theme.fonts['number-24R']};
  word-wrap: break-word;
  padding-right: 0.1rem;
`;

export const PriceUnit = css`
  color: ${theme.colors.black};
  font-size: 22px;
  font-family: Pretendard;
  font-weight: 800;
  word-wrap: break-word;
  padding-bottom: 0.3rem;
`; 