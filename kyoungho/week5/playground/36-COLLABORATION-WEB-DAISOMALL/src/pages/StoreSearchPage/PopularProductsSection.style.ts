import { css } from '@emotion/react';
import theme from '@styles/theme';

export const PopularWrapper = css`
  display: flex;
  padding: 1.6rem;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  align-self: stretch;
`;

export const ResultWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  align-self: stretch;
  width: 100%;
`;

export const Title = css`
  height: 2.4rem;
  align-self: stretch;
  color: ${theme.colors.black};
  ${theme.fonts['heading-14B']};
`;

export const ProductRow = css`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  align-self: stretch;
  cursor: pointer;
  width: 100%;
`;

export const PaginationWrapper = css`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.8rem;
`;
