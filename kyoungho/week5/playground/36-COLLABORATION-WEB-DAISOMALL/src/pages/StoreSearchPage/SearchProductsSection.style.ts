import { css } from '@emotion/react';

export const SearchWrapper = css`
  display: flex;
  width: 37.5rem;
  width: 100%;
  margin: 0 auto;
  padding: 1.6rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.4rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.6rem;
  }
`;

export const ResultWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.4rem;
  width: 100%;
`;

export const ProductsContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  width: 100%;
`;

export const ProductCardWrapper = css`
  display: flex;
  width: 34.3rem;
  height: 11.2rem;
  padding: 1.1rem 1.2rem;
  align-items: center;
  gap: 1.6rem;
  border-radius: 0.8rem;
  border: 1px solid var(--gray-05, #ebe9ee);
  background: #fff;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 0;
  }
`;

export const ProductCardContent = css`
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;
  flex: 1 0 0;
  min-width: 0;
  min-height: 0;
  max-height: 100%;
`;

export const LoadingContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10rem;
  font-size: 1.6rem;
  color: var(--gray-03, #9e9e9e);
`;

export const ErrorContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10rem;
  font-size: 1.6rem;
  color: var(--gray-03, #9e9e9e);
`;

export const SectionTitleRow = css`
  display: flex;
  width: 34.3rem;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
