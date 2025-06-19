import { css } from '@emotion/react';
import theme from '@styles/theme';

export const storeSectionWrapper = css`
  display: flex;
  padding: 1.6rem;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  align-self: stretch;
`;

export const productWrapper = css`
  width: 34.3rem;
  max-width: 100%;
  box-sizing: border-box;
  padding: 1.1rem 1.2rem;
  border-radius: 8px;
  border: 1px solid ${theme.colors['gray-05']};

  @media (max-width: 768px) {
    width: 100%;
    min-width: 0;
  }
`;

export const filterTabWrapper = css`
  overflow-x: auto;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
`;
